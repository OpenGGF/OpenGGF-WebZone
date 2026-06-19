---
title: "OpenGGF User Guide"
group: "Reference"
order: 99
---

# OpenGGF User Guide

OpenGGF is an open-source, Java-based engine that reimplements classic Mega Drive / Genesis
Sonic the Hedgehog games. It is not an emulator: it reads data from original ROM images and
runs its own implementation of the game logic, physics, rendering, and audio. No copyrighted
assets are included. You must supply your own legally obtained ROM files.

The engine currently supports Sonic the Hedgehog (S1), Sonic the Hedgehog 2 (S2), and
Sonic 3 & Knuckles (S3K) at varying levels of completeness.

## Choose Your Path

### I want to play

You have ROM files and want to get the engine running.

- [Getting Started](/docs/guide/playing/getting-started) -- From zero to playing in five minutes
- [Configuration](/docs/guide/playing/configuration) -- Common setup questions answered
- [Controls](/docs/guide/playing/controls) -- Full keyboard reference
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
- [Architecture Deep Dive](/docs/guide/contributing/architecture) -- Providers, services, and runtime
- [Documentation and Branch Policy](/docs/guide/contributing/documentation-policy) -- Commit trailers, changelog/discrepancy updates, and PR documentation checks
- [Tutorial: Implement an Object](/docs/guide/contributing/tutorial-implement-object) -- Worked example from disassembly to running code
- [Adding Bosses](/docs/guide/contributing/adding-bosses) -- Boss-specific patterns
- [Adding Zones](/docs/guide/contributing/adding-zones) -- Bringing up a new zone
- [Audio System](/docs/guide/contributing/audio-system) -- SMPS driver, FM synthesis, PSG
- [Rewind System](/docs/guide/contributing/rewind-system) -- Using, validating, and extending frame rewind
- [Testing](/docs/guide/contributing/testing) -- Writing and running tests
- [Trace Replay Testing](/docs/guide/contributing/trace-replay) -- BizHawk recordings, replay tests, and divergence analysis

## Related Documents

These documents live at the repository root and complement this guide:

- [README](https://github.com/OpenGGF/OpenGGF/blob/develop/README) -- Project overview and FAQ
- [CHANGELOG](https://github.com/OpenGGF/OpenGGF/blob/develop/CHANGELOG) -- Detailed release history
- [ROADMAP](/docs/reference/roadmap) -- Development priorities
- [CONFIGURATION](/docs/reference/configuration) -- Full configuration reference (all keys)
- [CREDITS](/docs/reference/credits) -- Community resources this project builds on
- [OBJECT_CHECKLIST](https://github.com/OpenGGF/OpenGGF/blob/develop/OBJECT_CHECKLIST) -- Sonic 2 object implementation status
- [S1_OBJECT_CHECKLIST](https://github.com/OpenGGF/OpenGGF/blob/develop/S1_OBJECT_CHECKLIST) -- Sonic 1 object implementation status
- [S3K_OBJECT_CHECKLIST](https://github.com/OpenGGF/OpenGGF/blob/develop/S3K_OBJECT_CHECKLIST) -- Sonic 3&K object implementation status
