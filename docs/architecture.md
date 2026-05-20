# Architecture

## Overview

This project is a single-user anniversary website built as a desktop-like experience in the browser.

The architecture is intentionally simple:

- no backend
- no database
- all personal content lives in one local data file
- app windows are registered through a central registry
- desktop state is managed through a single React context

## Core Ideas

### 1. Content is separate from UI

All editable content lives in [siteData.ts](/abs/C:/Users/sharm/Desktop/Anv2/anv2/src/data/siteData.ts).

That includes:

- boot text
- passwords
- memories
- reasons
- flower poems
- terminal secrets
- audio track paths

UI components should read from normalized content, not hardcode personal data.

### 2. State is separate from rendering

Desktop state lives in:

- [desktopState.ts](/abs/C:/Users/sharm/Desktop/Anv2/anv2/src/context/desktopState.ts)
- [desktopReducer.ts](/abs/C:/Users/sharm/Desktop/Anv2/anv2/src/context/desktopReducer.ts)
- [DesktopContext.tsx](/abs/C:/Users/sharm/Desktop/Anv2/anv2/src/context/DesktopContext.tsx)

The reducer handles:

- authentication
- opening windows
- closing windows
- focusing windows
- updating window position

Components consume state through `useDesktop()`.

### 3. App registration is centralized

The desktop does not hardcode app components directly in multiple places.

Instead, [appRegistry.tsx](/abs/C:/Users/sharm/Desktop/Anv2/anv2/src/lib/appRegistry.tsx) maps each app id to:

- title
- icon
- default window size
- render function

This keeps desktop/window code generic.

## App Flow

### Boot and auth

The route entry renders [ExperienceShell.tsx](/abs/C:/Users/sharm/Desktop/Anv2/anv2/src/components/ExperienceShell.tsx).

If the user is not authenticated:

1. [IntroFlow.tsx](/abs/C:/Users/sharm/Desktop/Anv2/anv2/src/components/boot/IntroFlow.tsx) runs
2. [BootScreen.tsx](/abs/C:/Users/sharm/Desktop/Anv2/anv2/src/components/boot/BootScreen.tsx) shows the intro
3. [AuthGate.tsx](/abs/C:/Users/sharm/Desktop/Anv2/anv2/src/components/boot/AuthGate.tsx) collects the answer
4. [auth.ts](/abs/C:/Users/sharm/Desktop/Anv2/anv2/src/lib/auth.ts) validates it

After success, desktop state flips to authenticated.

### Desktop

Once authenticated:

1. [Desktop.tsx](/abs/C:/Users/sharm/Desktop/Anv2/anv2/src/components/desktop/Desktop.tsx) renders
2. desktop icons come from `siteData.desktopIcons`
3. double-clicking an icon calls `openWindow`
4. open windows are rendered by [WindowLayer.tsx](/abs/C:/Users/sharm/Desktop/Anv2/anv2/src/components/desktop/WindowLayer.tsx)
5. each window uses [DraggableWindow.tsx](/abs/C:/Users/sharm/Desktop/Anv2/anv2/src/components/desktop/DraggableWindow.tsx)

## App Modules

Current app modules:

- [MemoriesApp.tsx](/abs/C:/Users/sharm/Desktop/Anv2/anv2/src/components/apps/MemoriesApp.tsx)
- [ReasonsApp.tsx](/abs/C:/Users/sharm/Desktop/Anv2/anv2/src/components/apps/ReasonsApp.tsx)
- [FlowerApp.tsx](/abs/C:/Users/sharm/Desktop/Anv2/anv2/src/components/apps/FlowerApp.tsx)
- [TerminalApp.tsx](/abs/C:/Users/sharm/Desktop/Anv2/anv2/src/components/apps/TerminalApp.tsx)
- [AudioApp.tsx](/abs/C:/Users/sharm/Desktop/Anv2/anv2/src/components/apps/AudioApp.tsx)

Each app follows the same pattern:

- app shell component in `src/components/apps/`
- smaller subcomponents in a dedicated subfolder when needed
- pure helper logic in `src/lib/` when needed

## Shared Layers

### `src/lib/`

Pure helpers and shared logic.

Examples:

- content normalization
- auth matching
- terminal command parsing
- flower petal state
- motion presets

### `src/hooks/`

Reusable client-side behavior.

Examples:

- mobile detection
- viewport size
- reduced motion
- window drag behavior
- global audio state

### `src/components/ui/`

Shared visual primitives.

Examples:

- button
- input
- panel

## Logging

Logging is centralized through [logger.ts](/abs/C:/Users/sharm/Desktop/Anv2/anv2/src/lib/logger.ts).

Logs are used for meaningful state changes and user actions such as:

- boot sequence start and finish
- auth attempts
- window open, focus, close, drag
- app-specific interactions
- audio lifecycle events

## Testing

Current automated coverage is focused on pure logic helpers:

- auth
- terminal
- content
- flower

Run:

```bash
npm run test
```

## Why This Structure Works

- It keeps content easy to edit.
- It keeps window management generic.
- It avoids app-specific coupling inside desktop infrastructure.
- It supports iterative development without requiring backend work.
- It makes the project easier to personalize and maintain later.
