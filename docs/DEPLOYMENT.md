# Deployment

## Cloudflare Pages
1. Create a Pages project connected to `OpenGGF/OpenGGF-WebZone`. Build command:
   `npm run build`. Output dir: `dist`. Set `NODE_VERSION=24`.
   Pages auto-deploys on push to `master`.
2. Add custom domain `openggf.com` (Cloudflare DNS preferred; otherwise CNAME to `*.pages.dev`).

## Vanity redirects
`/discord` → the Discord invite is a **302 Redirect Rule configured in the Cloudflare
dashboard** (zone level), not a file in this repo. The nav and footer link to `/discord` so the
invite can be rotated in the dashboard without a site rebuild.

Two consequences: the rule is not honoured by `astro dev` or `astro preview`, so `/discord`
404s locally — that is expected, verify against production. And don't add a `public/_redirects`
entry for it; keeping the target in one place is the point.

## Release-triggered refresh (the "latest" promise)
The engine release workflow must notify the website directly after successful
publication. A separate workflow listening for `release: published` will not run
for a release created with the engine's `GITHUB_TOKEN`.
The engine's `notify-website` job belongs in `.github/workflows/release.yml`:

```yaml
jobs:
  # Other jobs, including release, are defined in the engine workflow.
  notify-website:
    needs: release
    runs-on: ubuntu-latest
    permissions: {}
    steps:
      - name: Notify website
        env:
          GH_TOKEN: ${{ secrets.WEBZONE_DISPATCH_PAT }}
        run: |
          if [ -z "$GH_TOKEN" ]; then
            echo "::error ::WEBZONE_DISPATCH_PAT is missing. Configure it and rerun this failed job."
            exit 1
          fi
          gh api --method POST repos/OpenGGF/OpenGGF-WebZone/dispatches \
            -H 'Accept: application/vnd.github+json' \
            -f event_type=engine-release
```

Store `WEBZONE_DISPATCH_PAT` as an Actions secret in **`OpenGGF/OpenGGF`**.
Use a fine-grained PAT with resource owner `OpenGGF`, scoped to
`OpenGGF-WebZone` with **Contents: write** and **Metadata: read**. Complete any
organization approval required for the token. GitHub's "Create a repository dispatch event"
REST endpoint requires *Contents: write* for fine-grained tokens — `contents: read` is not
sufficient and the dispatch call will 403. The webzone `refresh-on-release.yml` then refreshes
the cache, commits, and pushes — which triggers the Pages build. The engine job
becomes active when its workflow change reaches the release branch, `master`.

If notification fails, the engine release is already published. Fix the secret
and rerun only the failed notification job; rerunning publication would collide
with the existing release tag. For an immediate website refresh, run:

```bash
gh workflow run refresh-on-release.yml --repo OpenGGF/OpenGGF-WebZone
```

The website workflow also runs daily as a backstop; scheduled execution may be
delayed. Verify its run, the resulting cache commit's Cloudflare Pages check,
and the version and download links on `https://openggf.com`.
