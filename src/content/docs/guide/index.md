---
title: "OpenGGF User Guide"
group: "Reference"
order: 1
---

# OpenGGF User Guide

OpenGGF is an open-source, Java-based engine that reimplements classic Mega Drive / Genesis
Sonic the Hedgehog games. It is not an emulator: it reads data from original ROM images and
runs its own implementation of the game logic, physics, rendering, and audio. No copyrighted
assets are included. You must supply your own legally obtained ROM files.

The engine currently supports Sonic the Hedgehog (S1), Sonic the Hedgehog 2 (S2), and
Sonic 3 & Knuckles (S3K) at varying levels of completeness. This guide follows the `0.7.20261105`
release; the [0.7 release summary](https://github.com/OpenGGF/OpenGGF/blob/develop/docs/changelog/v0.7-release-summary)
records its scope and limits.

For a tour of everything the engine can do, see [Features](/docs/guide/features).

## Choose Your Path

### I want to play

You have ROM files and want to get the engine running.

- [Getting Started](/docs/guide/playing/getting-started) -- From zero to playing in five minutes
- [Configuration](/docs/guide/playing/configuration) -- Common setup questions answered
- [Controls](/docs/guide/playing/controls) -- Keyboard and controller reference
- [Game Status](/docs/guide/playing/game-status) -- What works, what's incomplete, what to expect
- [Troubleshooting](/docs/guide/playing/troubleshooting) -- Fixing common problems

### I want to cross-reference the engine against the disassembly

You know s1disasm, s2disasm, or skdisasm and want to understand how the engine represents
the same concepts -- or you want to check the engine's accuracy.

- [How the Engine Reads ROMs](/docs/guide/cross-referencing/how-the-engine-reads-roms) -- The data pipeline from ROM bytes to rendered screen
- [68000 Primer](/docs/guide/cross-referencing/68000-primer) -- Just enough assembly to read object routines
- [Mapping Exercises](/docs/guide/cross-referencing/mapping-exercises) -- Learn to trace any feature between disassembly and engine
- [Architecture Overview](/docs/guide/cross-referencing/architecture-overview) -- Where things live in the codebase
- [Tooling](/docs/guide/cross-referencing/tooling) -- RomOffsetFinder and other built-in tools
- [Per-Game Notes](/docs/guide/cross-referencing/per-game-notes) -- S1, S2, and S3K specific quirks

### I want to contribute

You want to add objects, bosses, zones, or engine improvements.

- [Dev Setup](/docs/guide/contributing/dev-setup) -- Environment, build, and test setup
- [Translations](/docs/guide/contributing/translations) -- Add a language or improve existing UI wording without editing Java
- [Release Publishing](https://github.com/OpenGGF/OpenGGF/blob/develop/docs/project/release-publishing) -- Automatic publication on pushes to master
- [Architecture Deep Dive](/docs/guide/contributing/architecture) -- Providers, services, and runtime
- [Documentation and Branch Policy](/docs/guide/contributing/documentation-policy) -- Commit trailers, changelog/discrepancy updates, and PR documentation checks
- [Tutorial: Implement an Object](/docs/guide/contributing/tutorial-implement-object) -- Worked example from disassembly to running code
- [Adding Bosses](/docs/guide/contributing/adding-bosses) -- Boss-specific patterns
- [Adding Zones](/docs/guide/contributing/adding-zones) -- Bringing up a new zone
- [Audio System](/docs/guide/contributing/audio-system) -- SMPS driver, FM synthesis, PSG
- [Rewind System](/docs/guide/contributing/rewind-system) -- Using, validating, and extending frame rewind
- [Zone and Act Test Standard](/docs/guide/contributing/level-test-standard) -- Route, character, rewind and load-boundary obligations
- [Testing](/docs/guide/contributing/testing) -- Writing and running tests
- [Trace Replay Testing](/docs/guide/contributing/trace-replay) -- BizHawk recordings, replay tests, and divergence analysis

### I want to create levels

- [Level Editor](/docs/guide/creating/level-editor) -- Create, edit, save, reopen, playtest, and export levels for all three games

### I want to make films and cutscenes

- [Stageplay](/docs/guide/creating/stageplay) -- What Stageplay is and where to start
- [Your First Film](/docs/guide/creating/stageplay-first-film) -- A ten-second film, step by step, in the editor and as a screenplay
- [Directing Guide](/docs/guide/creating/stageplay-directing) -- Cast, routes, objects, camera, dialogue, voices, music, scene changes, export and mods
- [How Day Off Was Made](/docs/guide/creating/stageplay-day-off) -- A finished film's techniques, shot by shot
- [Troubleshooting and Glossary](/docs/guide/creating/stageplay-troubleshooting) -- Route failures, floors, "needs Run" and other surprises
- [Reference](/docs/guide/creating/stageplay-reference) -- Screenplay fields, editor commands and keys, limits
- [Stageplay from the Terminal](/docs/guide/creating/stageplay-authoring) -- Command-line tools for scripted films and agents

### I want to create mods

Start with the [creator handbook](https://github.com/OpenGGF/OpenGGF/blob/develop/docs/modding/index) for the maintained workflow,
formats, and samples. Mod API 0.7.0 is an unpublished, mutable candidate; use
matching engine and SDK artifacts from one commit. The
[release-policy descriptor](../../mod-api-release-policy.properties) owns the
current API version and publication status; the
[compatibility guide](https://github.com/OpenGGF/OpenGGF/blob/develop/docs/architecture/mod-api-compatibility) explains the contract.

## Related Documents

These documents live at the repository root and complement this guide:

- [README](https://github.com/OpenGGF/OpenGGF/blob/develop/README) -- Project overview and FAQ
- [Features](/docs/guide/features) -- Everything the engine can do, with links to each guide
- [CHANGELOG](https://github.com/OpenGGF/OpenGGF/blob/develop/CHANGELOG) -- Detailed release history
- [ROADMAP](/docs/reference/roadmap) -- Development priorities
- [CONFIGURATION](/docs/reference/configuration) -- Full configuration reference (all keys)
- [CREDITS](/docs/reference/credits) -- Community resources this project builds on
- [OBJECT_CHECKLIST](https://github.com/OpenGGF/OpenGGF/blob/develop/OBJECT_CHECKLIST) -- Sonic 2 object implementation status
- [S1_OBJECT_CHECKLIST](https://github.com/OpenGGF/OpenGGF/blob/develop/S1_OBJECT_CHECKLIST) -- Sonic 1 object implementation status
- [S3K_OBJECT_CHECKLIST](https://github.com/OpenGGF/OpenGGF/blob/develop/S3K_OBJECT_CHECKLIST) -- Sonic 3&K object implementation status
