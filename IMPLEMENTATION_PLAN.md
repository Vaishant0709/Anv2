# Personal Anniversary Website Implementation Plan

## Goal

Build the anniversary website in small, reviewable steps that follow the Single Responsibility Principle. Each implementation step should touch files related to one responsibility only, maintain strong code quality, and include proper logs for meaningful user interactions and state transitions.

## Working Principles

- Keep content separate from UI logic.
- Keep state logic separate from rendering logic.
- Keep pure logic in isolated utility modules.
- Keep components focused on a single visual or behavioral concern.
- Avoid mixing feature work across unrelated files in the same step.
- Add logs for meaningful actions, not for every render.
- Keep `page.tsx` and `layout.tsx` thin.
- Prefer typed contracts for all shared structures.

## Recommended Folder Structure

```text
src/
  app/
  components/
    apps/
    boot/
    desktop/
    providers/
    ui/
  context/
  hooks/
  lib/
  data/
  types/
docs/
```

## Implementation Plan

### Phase 1: Foundation

#### Step 1: Project dependencies and runtime setup

Responsibility:
Project tooling and core dependencies only.

Files:
- `package.json`
- `package-lock.json`

Work:
- Install and confirm `framer-motion`, `lucide-react`, `clsx`, and `tailwind-merge`.
- Verify the existing Next.js, TypeScript, and Tailwind setup.

Quality checks:
- App boots locally.
- Dependency versions are compatible.

Logs:
- No runtime logs needed.

#### Step 2: Source folder organization

Responsibility:
Project structure only.

Files:
- Create folders under `src/` and `docs/` as needed.

Work:
- Introduce a clean structure for apps, boot flow, desktop UI, hooks, context, types, data, and utilities.

Quality checks:
- Folder structure matches the architecture plan.

Logs:
- No runtime logs needed.

#### Step 3: Shared utility helper

Responsibility:
Class name merging only.

Files:
- `src/lib/utils.ts`

Work:
- Add a `cn()` helper using `clsx` and `tailwind-merge`.

Quality checks:
- Utility is typed and reusable.

Logs:
- No runtime logs needed.

#### Step 4: Shared type contracts

Responsibility:
Type definitions only.

Files:
- `src/types/apps.ts`
- `src/types/content.ts`
- `src/types/desktop.ts`

Work:
- Define app ids.
- Define content shapes for timeline entries, reasons, flower poems, audio config, and terminal secrets.
- Define desktop window state types.

Quality checks:
- No `any` for shared contracts.
- Types are reusable across features.

Logs:
- No runtime logs needed.

#### Step 5: Logging utility

Responsibility:
Application logging only.

Files:
- `src/lib/logger.ts`

Work:
- Create a small logger abstraction with `info`, `warn`, and `error`.
- Support structured metadata.
- Optionally reduce noisy logs in production.

Quality checks:
- Logging API is simple and consistent.
- Secrets are never logged directly.

Example log events:
- `[boot] sequence started`
- `[auth] attempt submitted`
- `[window] opened`
- `[terminal] command executed`
- `[flower] petal revealed`
- `[audio] playback started`

### Phase 2: Content Boundary

#### Step 6: Central editable content source

Responsibility:
Site content only.

Files:
- `src/data/siteData.ts`

Work:
- Add all editable content in one place:
  - boot text
  - password answers
  - desktop icons
  - timeline entries
  - reasons
  - flower poems
  - terminal secrets
  - audio paths

Quality checks:
- Components should not hardcode personal content.
- Content is typed against shared interfaces.

Logs:
- No runtime logs needed.

#### Step 7: Content safety and normalization

Responsibility:
Content validation and formatting only.

Files:
- `src/lib/content.ts`

Work:
- Add helpers for validating content shape.
- Add normalizers for icon ids and timeline ordering.
- Add safe fallback behavior for missing content.

Quality checks:
- Malformed content does not crash the UI.

Logs:
- `warn` when optional content is missing or malformed.

### Phase 3: App Shell

#### Step 8: Global layout and global styles

Responsibility:
App-wide wrapper and design tokens only.

Files:
- `src/app/layout.tsx`
- `src/app/globals.css`

Work:
- Set up global styles, CSS variables, background rules, and a grain overlay foundation.
- Keep the layout clean and minimal.

Quality checks:
- No feature logic in the layout.
- Styles are global and reusable.

Logs:
- No runtime logs needed.

#### Step 9: Provider composition

Responsibility:
Provider wiring only.

Files:
- `src/components/providers/AppProviders.tsx`

Work:
- Centralize provider setup so `page.tsx` stays thin.

Quality checks:
- Future providers can be added without cluttering the route.

Logs:
- No runtime logs needed.

#### Step 10: Main route entry

Responsibility:
Top-level page composition only.

Files:
- `src/app/page.tsx`

Work:
- Render the high-level experience container that will eventually switch between boot, auth, and desktop states.

Quality checks:
- No state logic beyond composition.

Logs:
- No runtime logs needed.

### Phase 4: Desktop State Management

#### Step 11: Desktop state constants

Responsibility:
Default state definitions only.

Files:
- `src/context/desktopState.ts`

Work:
- Define initial auth state.
- Define initial window state and z-index defaults.

Quality checks:
- Constants are centralized and typed.

Logs:
- No runtime logs needed.

#### Step 12: Pure desktop reducer

Responsibility:
State transitions only.

Files:
- `src/context/desktopReducer.ts`

Work:
- Add reducer actions for:
  - authenticate
  - openWindow
  - closeWindow
  - focusWindow
  - setWindowPosition

Quality checks:
- Reducer remains pure.
- No direct rendering or side effects.

Logs:
- No logs inside the reducer itself.

#### Step 13: Desktop context provider

Responsibility:
Context access and action wrappers only.

Files:
- `src/context/DesktopContext.tsx`

Work:
- Wire reducer into React context.
- Expose a `useDesktop()` hook.
- Add action wrapper methods for consumers.

Quality checks:
- Context surface is small and explicit.

Logs:
- `[auth] success`
- `[auth] failure`
- `[window] opened`
- `[window] closed`
- `[window] focused`

#### Step 14: App registry

Responsibility:
App metadata mapping only.

Files:
- `src/lib/appRegistry.tsx`

Work:
- Map each app id to title, icon, and component.

Quality checks:
- Window opening logic does not contain hardcoded component branching elsewhere.

Logs:
- No direct logs needed.

### Phase 5: Boot and Authentication

#### Step 15: Boot screen component

Responsibility:
Boot text presentation only.

Files:
- `src/components/boot/BootScreen.tsx`

Work:
- Animate boot text using Framer Motion or a typewriter pattern.

Quality checks:
- Clean transitions.
- No auth logic mixed in.

Logs:
- `[boot] sequence started`
- `[boot] sequence completed`

#### Step 16: Authentication logic

Responsibility:
Input validation only.

Files:
- `src/lib/auth.ts`

Work:
- Normalize strings.
- Validate answers case-insensitively.
- Allow minor typo tolerance using a conservative similarity check.

Quality checks:
- No false positives from weak matching.
- Raw secrets are not exposed.

Logs:
- `[auth] validation started`
- `[auth] validation failed`

#### Step 17: Authentication gate UI

Responsibility:
Password input UI only.

Files:
- `src/components/boot/AuthGate.tsx`

Work:
- Add prompt, input field, submit action, and user feedback.

Quality checks:
- Accessible input behavior.
- Clear success and failure feedback.

Logs:
- `[auth] attempt submitted`
- `[auth] success`
- `[auth] failure`

#### Step 18: Intro flow orchestrator

Responsibility:
Boot-to-auth sequencing only.

Files:
- `src/components/boot/IntroFlow.tsx`

Work:
- Transition from boot screen to auth gate using `AnimatePresence`.

Quality checks:
- Smooth state transitions.
- No desktop rendering logic inside child components.

Logs:
- `[boot] transitioned to auth gate`

### Phase 6: Desktop Surface

#### Step 19: Desktop background

Responsibility:
Background rendering only.

Files:
- `src/components/desktop/DesktopBackground.tsx`

Work:
- Render a customizable background image or CSS-based atmospheric background.

Quality checks:
- Visual direction is isolated and easy to swap.

Logs:
- No runtime logs needed.

#### Step 20: Desktop icon component

Responsibility:
Single icon rendering and interaction only.

Files:
- `src/components/desktop/DesktopIcon.tsx`

Work:
- Render app icon and label.
- Handle double-click activation.

Quality checks:
- Component remains reusable.

Logs:
- `[desktop] icon activated`

#### Step 21: Desktop icon collection

Responsibility:
Desktop icon layout only.

Files:
- `src/components/desktop/DesktopIcons.tsx`

Work:
- Map icon data from `siteData`.

Quality checks:
- No window management logic embedded here beyond invoking open behavior.

Logs:
- No direct logs needed.

#### Step 22: Taskbar

Responsibility:
Taskbar UI only.

Files:
- `src/components/desktop/Taskbar.tsx`

Work:
- Display open apps and a live clock.

Quality checks:
- Clear mapping to context state.

Logs:
- `[taskbar] app refocused`

#### Step 23: Desktop composition

Responsibility:
Desktop assembly only.

Files:
- `src/components/desktop/Desktop.tsx`

Work:
- Compose background, icons, taskbar, and window layer.

Quality checks:
- Keep the file focused on composition.

Logs:
- `[desktop] rendered`

### Phase 7: Window System

#### Step 24: Window frame

Responsibility:
Window chrome only.

Files:
- `src/components/desktop/WindowFrame.tsx`

Work:
- Add title bar, close button, and content slot.

Quality checks:
- Presentation only, no drag logic.

Logs:
- No direct logs needed.

#### Step 25: Drag behavior hook

Responsibility:
Drag behavior only.

Files:
- `src/hooks/useWindowDrag.ts`

Work:
- Encapsulate drag-related behavior for desktop mode.

Quality checks:
- Hook contains behavior, not markup.

Logs:
- `[window] drag started`
- `[window] drag ended`

#### Step 26: Responsive viewport hooks

Responsibility:
Viewport detection only.

Files:
- `src/hooks/useIsMobile.ts`
- `src/hooks/useWindowDimensions.ts`

Work:
- Detect mobile mode and current viewport size.

Quality checks:
- Hooks are generic and reusable.

Logs:
- No runtime logs needed.

#### Step 27: Draggable window

Responsibility:
Window interactivity only.

Files:
- `src/components/desktop/DraggableWindow.tsx`

Work:
- Combine frame, drag behavior, z-index handling, and mobile full-screen fallback.

Quality checks:
- Dragging disabled or adapted on mobile.

Logs:
- `[window] focused`
- `[window] closed`

#### Step 28: Window layer

Responsibility:
Rendering all open windows only.

Files:
- `src/components/desktop/WindowLayer.tsx`

Work:
- Map open windows from context through the app registry.

Quality checks:
- No app-specific branching outside the registry.

Logs:
- No direct logs needed.

### Phase 8: Memories App

#### Step 29: Timeline card

Responsibility:
Single memory item rendering only.

Files:
- `src/components/apps/memories/TimelineCard.tsx`

#### Step 30: Timeline list

Responsibility:
Timeline layout and scroll animation only.

Files:
- `src/components/apps/memories/TimelineList.tsx`

#### Step 31: Memories app shell

Responsibility:
Memories app composition only.

Files:
- `src/components/apps/MemoriesApp.tsx`

Logs:
- `[memories] app opened`

### Phase 9: Reasons App

#### Step 32: Reason card

Responsibility:
Single draggable floating card only.

Files:
- `src/components/apps/reasons/ReasonCard.tsx`

#### Step 33: Floating layout helper

Responsibility:
Card positioning only.

Files:
- `src/lib/reasonsLayout.ts`

#### Step 34: Reasons app shell

Responsibility:
Reasons app composition only.

Files:
- `src/components/apps/ReasonsApp.tsx`

Logs:
- `[reasons] card interacted`

### Phase 10: Flower App

#### Step 35: Flower state helpers

Responsibility:
Petal state logic only.

Files:
- `src/lib/flower.ts`

#### Step 36: Flower canvas

Responsibility:
Flower visual rendering only.

Files:
- `src/components/apps/flower/FlowerCanvas.tsx`

#### Step 37: Flower petal

Responsibility:
Single petal interaction and animation only.

Files:
- `src/components/apps/flower/FlowerPetal.tsx`

#### Step 38: Poem reveal

Responsibility:
Poem display only.

Files:
- `src/components/apps/flower/PoemReveal.tsx`

#### Step 39: Flower app shell

Responsibility:
Flower app composition only.

Files:
- `src/components/apps/FlowerApp.tsx`

Logs:
- `[flower] petal clicked`
- `[flower] poem revealed`

### Phase 11: Terminal App

#### Step 40: Terminal parser

Responsibility:
Command parsing only.

Files:
- `src/lib/terminal.ts`

#### Step 41: Terminal history

Responsibility:
Past command rendering only.

Files:
- `src/components/apps/terminal/TerminalHistory.tsx`

#### Step 42: Terminal input

Responsibility:
Command input only.

Files:
- `src/components/apps/terminal/TerminalInput.tsx`

#### Step 43: Terminal app shell

Responsibility:
Terminal state and composition only.

Files:
- `src/components/apps/TerminalApp.tsx`

Logs:
- `[terminal] command executed`
- `[terminal] unknown command`

### Phase 12: Audio

#### Step 44: Global audio hook

Responsibility:
Audio playback lifecycle only.

Files:
- `src/hooks/useGlobalAudio.ts`

#### Step 45: Audio app UI

Responsibility:
Audio player interface only.

Files:
- `src/components/apps/AudioApp.tsx`

#### Step 46: Audio bootstrap

Responsibility:
Start audio after user interaction only.

Files:
- `src/components/audio/AudioBootstrap.tsx`

Logs:
- `[audio] initialized`
- `[audio] playback started`
- `[audio] playback paused`
- `[audio] load failed`

### Phase 13: Visual Polish

#### Step 47: Shared motion presets

Responsibility:
Reusable animations only.

Files:
- `src/lib/motion.ts`

#### Step 48: Theme tokens and polish

Responsibility:
Global visual language only.

Files:
- `src/app/globals.css`

#### Step 49: Shared UI primitives

Responsibility:
Reusable presentational controls only.

Files:
- `src/components/ui/Button.tsx`
- `src/components/ui/Input.tsx`
- `src/components/ui/Panel.tsx`

### Phase 14: Responsiveness and Accessibility

#### Step 50: Mobile window behavior

Responsibility:
Mobile window fallback only.

Files:
- `src/components/desktop/DraggableWindow.tsx`
- related hooks only

#### Step 51: Accessibility improvements

Responsibility:
Keyboard and accessibility support only.

Files:
- Relevant focused component files

Work:
- Add aria labels, focus states, keyboard submit behavior, and reduced-motion support.

#### Step 52: Empty and error states

Responsibility:
Fallback UI only.

Files:
- Relevant app files only

### Phase 15: Testing and Quality

#### Step 53: Unit tests for pure logic

Responsibility:
Logic verification only.

Files:
- `src/lib/auth.test.ts`
- `src/lib/terminal.test.ts`
- `src/lib/content.test.ts`
- `src/lib/flower.test.ts`

#### Step 54: Component tests for critical flows

Responsibility:
UI behavior verification only.

Files:
- Critical component test files

Priority:
- auth gate submit
- window open and close
- terminal command input
- flower petal interaction

#### Step 55: Lint and formatting setup

Responsibility:
Static code quality only.

Files:
- ESLint and formatting config files as needed

#### Step 56: Logging conventions documentation

Responsibility:
Observability guidance only.

Files:
- `README.md` or `docs/architecture.md`

### Phase 16: Documentation

#### Step 57: Content editing guide

Responsibility:
Non-technical editing instructions only.

Files:
- `README.md`

#### Step 58: Architecture documentation

Responsibility:
Technical structure explanation only.

Files:
- `docs/architecture.md`

### Phase 17: Desktop Widgets

#### Step 59: Desktop widget content model

Responsibility:
Content and type support for desktop widgets only.

Files:
- `src/types/content.ts`
- `src/data/siteData.ts`
- `src/lib/content.ts`

Work:
- Add editable content for:
  - relationship start date
  - pinned desktop note
  - optional memory widget copy
- Extend content validation and fallbacks without mixing widget UI logic.

Quality checks:
- Desktop widgets remain fully content-driven.
- Missing widget content degrades safely.

Logs:
- `warn` when optional widget content is missing or malformed.

#### Step 60: Desktop widget helpers

Responsibility:
Pure desktop widget logic only.

Files:
- `src/lib/desktopWidgets.ts`

Work:
- Add relationship uptime formatting helpers.
- Add memory selection helper for the desktop memory widget.

Quality checks:
- Helper output is deterministic and reusable.
- No rendering logic inside helper modules.

Logs:
- No runtime logs needed.

#### Step 61: Desktop widget components

Responsibility:
Desktop widget rendering only.

Files:
- `src/components/desktop/widgets/SystemUptimeWidget.tsx`
- `src/components/desktop/widgets/PinnedNoteWidget.tsx`
- `src/components/desktop/widgets/MemoryOfTheDayWidget.tsx`
- `src/components/desktop/DesktopWidgets.tsx`

Work:
- Build the uptime widget for the top-right area.
- Build the pinned note widget for the lower-center or right area.
- Build the memory widget as a polaroid-style focal card.
- Compose them in a shared desktop widget container.

Quality checks:
- Widgets balance the desktop without competing with window content.
- Widget layout stays responsive.

Logs:
- `[desktop] memory widget selected`

#### Step 62: Desktop widget integration

Responsibility:
Desktop composition update only.

Files:
- `src/components/desktop/Desktop.tsx`

Work:
- Place desktop widgets into the authenticated desktop surface.
- Preserve icon usability and window layering.

Quality checks:
- Widgets sit beneath windows and above the background.
- The center area feels intentionally occupied without clutter.

Logs:
- No direct logs needed.

### Phase 18: Anniversary Celebration

#### Step 63: Celebration content and state

Responsibility:
Copy and interaction state for the anniversary centerpiece only.

Files:
- `src/types/content.ts`
- `src/data/siteData.ts`
- `src/lib/content.ts`

Work:
- Add the central anniversary headline copy.
- Add optional celebration text for the post-click reveal.
- Keep it content-driven and safe to omit.

Quality checks:
- Button copy and celebratory message remain editable in one place.
- Missing celebration content degrades safely.

Logs:
- `warn` when optional celebration content is missing or malformed.

#### Step 64: Celebration animation utilities

Responsibility:
Fireworks and confetti launch logic only.

Files:
- `src/lib/celebration.ts`

Work:
- Set up the firework burst orchestration.
- Layer in a light confetti accent.
- Respect reduced motion where possible.

Quality checks:
- Animation logic stays separate from rendering.
- No DOM coupling outside the utility or hook boundary.

Logs:
- `[celebration] launched`
- `[celebration] reduced motion fallback`

#### Step 65: Celebration centerpiece

Responsibility:
Large center-screen anniversary button only.

Files:
- `src/components/celebration/AnniversaryHero.tsx`
- `src/components/celebration/CelebrationLayer.tsx`

Work:
- Render a bold `Happy Anniversary Aru` centerpiece in the middle of the desktop.
- Trigger the celebration animation on click.
- Show a soft romantic end frame after the bursts.

Quality checks:
- The button feels like the clear focal point of the desktop.
- Animation is extravagant but still elegant and on-theme.

Logs:
- `[celebration] hero clicked`

#### Step 66: Desktop integration

Responsibility:
Place the centerpiece into the authenticated desktop layout only.

Files:
- `src/components/desktop/Desktop.tsx`

Work:
- Add the anniversary hero to the desktop center.
- Keep it above the background and widgets, but below active windows.

Quality checks:
- The desktop now has a clear visual centerpiece.
- Existing windows and icons remain usable.

Logs:
- No direct logs needed.

### Phase 19: Bloom Celebration Refinement

#### Step 67: Flower-first celebration animation

Responsibility:
Centerpiece bloom animation only.

Files:
- `src/components/celebration/FlowerBloom.tsx`
- `src/components/celebration/CelebrationLayer.tsx`
- `src/lib/celebration.ts`

Work:
- Replace the fireworks-led reveal with a large blooming flower as the primary animation.
- Keep soft sparks behind the bloom and gold-rose confetti as accents.
- Preserve the romantic final line after the bloom settles.

Quality checks:
- The bloom feels dramatic and elegant rather than busy.
- The animation remains responsive and respects reduced motion.

Logs:
- `[celebration] bloom started`
- `[celebration] bloom completed`

## Logging Standard

Use logs for meaningful user actions and state changes.

Examples:

```ts
logger.info("[boot] sequence started");
logger.info("[auth] attempt submitted");
logger.warn("[auth] validation failed");
logger.info("[window] opened", { appId });
logger.info("[terminal] command executed", { command });
logger.error("[audio] load failed", { src });
```

Rules:

- Never log raw secret answers in production.
- Prefer structured metadata over string-only logs.
- Do not log every render.
- Use `warn` for recoverable issues.
- Use `error` for broken flows or failed resources.

## Code Quality Checklist

- One file, one primary responsibility.
- One step, one responsibility domain.
- Shared logic goes into `lib/`.
- Shared types go into `types/`.
- Shared state transitions stay pure.
- Components should mostly render and delegate logic outward.
- Keep comments minimal and useful.
- Run lint and typecheck after each meaningful chunk.
- Add tests for pure logic before relying on manual verification.

## Suggested Execution Order

1. Foundation
2. Content boundary
3. App shell
4. Desktop state
5. Boot and auth
6. Desktop UI
7. Window system
8. Core apps
9. Audio
10. Polish
11. Testing
12. Documentation

## Delivery Strategy

For each step:

1. Change only the files needed for that responsibility.
2. Keep logs focused and structured.
3. Run lint and typecheck.
4. Verify the UI or logic affected by that step.
5. Move on only after the step is stable.
