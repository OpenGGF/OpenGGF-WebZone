---
title: "Getting Started"
group: "Players"
order: 1
---

# Getting Started

This page gets you from zero to playing in under five minutes.

## What You Need

- **For downloaded releases:** no separate Java install is required; release packages include a
  native OpenGGF executable for your platform.
- **For source builds:** Java 21 or later. Download from [Adoptium](https://adoptium.net/) or
  your preferred distribution. Run `java -version` to check.
- **A GPU that supports OpenGL 4.1.** Any discrete GPU from the last decade will work.
  Integrated graphics (Intel HD 4000+, Apple Silicon) are fine.
- **ROM files** for the games you want to play. The engine does not include any game data.
  You must supply your own legally obtained copies.

### Expected ROM Files

The engine is verified against these specific ROM revisions. Check the file hashes rather
than relying on ROM naming conventions; other revisions may produce incorrect results.

| Game | Default filename | Required ROM | CRC32 | SHA-1 |
|------|------------------|--------------|-------|-------|
| Sonic 1 | `s1.gen` | World REV01 | `AFE05EEE` | `69E102855D4389C3FD1A8F3DC7D193F8EEE5FE5B` |
| Sonic 2 | `s2.gen` | World REV01 | `7B905383` | `8BCA5DCEF1AF3E00098666FD892DC1C2A76333F9` |
| Sonic 3&K | `s3k.gen` | Lock-on combined | `63522553` | `CFBF98C36C776677290A872547AC47C53D2761D6` |

ROM filenames can be changed in `config.yaml` if yours differ. See
[Configuration](/docs/guide/playing/configuration) for details.

### Where to Get the ROMs

We do not distribute ROMs, and we cannot help you find copies to download. Asking for them
in our community spaces will get you removed. These are the routes we know of:

- **A pre-2022 Steam purchase.** Sega sold *Sonic the Hedgehog*, *Sonic the Hedgehog 2* and
  *Sonic 3 & Knuckles* standalone on Steam, and the same three appeared in *Sega Mega Drive &
  Genesis Classics*. Those releases install real Mega Drive ROM images to disk — notably
  `Sonic_Knuckles_wSonic3.bin`, the pre-combined lock-on image the engine expects. All three
  standalone titles were **delisted on 20 May 2022**, and the Classics collection was removed
  in **December 2024**. If you bought any of them before those dates they are still in your
  Steam library and still installable; if you didn't, this route is closed.
- **Dumping your own cartridges.** If you own the carts, a cartridge reader such as the
  [Open Source Cartridge Reader](https://github.com/sanni/cartreader) (Sanni/OSCR) will dump
  Mega Drive titles to an SD card. For Sonic 3 & Knuckles you must dump *Sonic the Hedgehog 3*
  and *Sonic & Knuckles* separately and concatenate them — Sonic & Knuckles first, then Sonic 3
  — to produce the 4 MB combined image. Verify the result against the SHA-1 above.
  (Whether personal backups of media you own are lawful varies by country; check your own
  jurisdiction rather than assuming.)

Things that will **not** give you usable ROMs: *Sonic Origins* and *Origins Plus* (Retro Engine
remakes, assets in proprietary containers), the mobile remasters, Sonic Mega Collection, Nintendo
Switch Online, and the Genesis Mini. They are fine ways to play the games — just not sources of
ROM files for this engine.

## Install and Run

### Option A: Download a Release

1. Download the latest release package for your platform from the Releases page:
   - Windows: `OpenGGF-windows.zip`
   - macOS: `OpenGGF-macos.zip`
   - Linux: `OpenGGF-linux.tar.gz`
2. Extract it to a folder.
3. Place your ROM files next to the editable `config.yaml` included in the package.
4. Start OpenGGF:
   - Windows: double-click `OpenGGF.exe`, or run it from a terminal.
   - macOS: open `OpenGGF.app`.
   - Linux: run `./OpenGGF` from the extracted `OpenGGF` directory.
5. If your ROM filenames differ from the defaults, edit `config.yaml` in the extracted package.

Windows terminal example:
   ```
   .\OpenGGF.exe
   ```

Linux terminal example:
   ```
   cd OpenGGF
   ./OpenGGF
   ```

### Option B: Build from Source

1. Clone the repository:
   ```
   git clone https://github.com/jamesj999/sonic-engine.git
   cd sonic-engine
   ```
2. Build with Maven:
   ```
   mvn package
   ```
3. Place your ROM files in the project root directory (next to `pom.xml`).
4. Run:
   ```
   java -jar target/OpenGGF-0.6.prerelease-jar-with-dependencies.jar
   ```

## First Launch

When the engine starts, you will see:

1. **Master title screen** -- An engine-wide title screen with animated clouds and a game
   selection menu. Use the arrow keys to highlight a game and press Space to select it.
2. **Game title screen** -- The selected game's original title screen (e.g., the Sonic 2
   "PRESS START BUTTON" screen).
3. **Gameplay** -- The first zone of the selected game.

If a ROM file is missing for the game you selected, the engine will show an error.

## Quick Configuration

The engine reads settings from `config.yaml` in the working directory. If the file
does not exist, defaults are used. A few settings you might want to change immediately:

| Setting | What it does | Default |
|---------|-------------|---------|
| `roms.default` | Which game boots first (`"s1"`, `"s2"`, or `"s3k"`) | `"s3k"` |
| `startup.masterTitleScreen` | Show game picker on launch | `true` |
| `display.windowAutosize` | Derive the window size from the aspect preset | `true` |
| `audio.enabled` | Enable or disable sound | `true` |
| `characters.sidekick` | Add Tails as a CPU sidekick (`"tails"` or `""`) | `"tails"` |
| `debug.flags.editor` | Allow `Shift+Tab` to open the experimental editor overlay | `false` |

Key bindings can be written as names like `"SPACE"` and `"F9"` instead of raw numeric key codes.

For the full list, see [Configuration](/docs/guide/playing/configuration) or the
[Configuration Reference](/docs/reference/configuration).

## What Next?

- [Controls](/docs/guide/playing/controls) -- Learn the keyboard layout
- [Game Status](/docs/guide/playing/game-status) -- See what works in each game
- [Troubleshooting](/docs/guide/playing/troubleshooting) -- If something went wrong
