# Digital Love Letter

A personal anniversary website built as a small retro-inspired operating system in the browser.

## Run It

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Main Editing File

Most personal content lives in [siteData.ts](/abs/C:/Users/sharm/Desktop/Anv2/anv2/src/data/siteData.ts).

This is the file to edit if you want to change:

- boot screen text
- accepted password answers
- desktop icon labels
- timeline memories
- reasons cards
- flower poems
- terminal secret commands
- audio track titles and file paths

## How To Update Content

### Boot text

Edit `bootText` in `siteData.ts`.

Example:

```ts
bootText: [
  "Initializing love.exe...",
  "Decrypting memories...",
  "Enter passcode.",
]
```

### Password answers

Edit `passwords` in `siteData.ts`.

Notes:

- answers are matched case-insensitively
- small typos are tolerated
- keep answers personal and easy to remember

Example:

```ts
passwords: ["paris", "the coffee shop", "nickname"]
```

### Desktop icon labels

Edit `desktopIcons` in `siteData.ts`.

You can change labels freely. The `id` values should stay as they are unless the app code also changes.

### Memories timeline

Edit `timeline` in `siteData.ts`.

Each memory needs:

- `date`
- `title`
- `description`
- `image`

Example:

```ts
{
  date: "Oct 12, 2022",
  title: "The First Date",
  description: "You wore that yellow dress...",
  image: "/images/date1.jpg"
}
```

### Reasons cards

Edit `reasons` in `siteData.ts`.

Each reason needs:

- `id`
- `text`

Keep `id` unique.

### Flower poems

Edit `flowerPoems` in `siteData.ts`.

Each string becomes one clickable petal.

### Terminal secrets

Edit `terminalSecrets` in `siteData.ts`.

The key is the command the user types.
The value is the response shown in the terminal.

Example:

```ts
terminalSecrets: {
  "sudo love her": "Command executed successfully. Heart completely unlocked."
}
```

### Audio tracks

Edit `audioTracks` in `siteData.ts`.

Each track needs:

- `id`
- `title`
- `src`

Example:

```ts
audioTracks: [
  { id: "track-1", title: "Voice Note 01", src: "/audio/voice-note-01.mp3" }
]
```

## Where To Put Media Files

### Images

Put timeline images in:

`public/images/`

Then reference them like:

`/images/date1.jpg`

### Audio

Put audio files in:

`public/audio/`

Then reference them like:

`/audio/voice-note-01.mp3`

If the file is missing or unsupported, the audio app will not play it.

## Useful Commands

```bash
npm run dev
npm run lint
npm run test
```

## Project Structure

- `src/data/`
  Content and editable personal data
- `src/components/`
  UI components and app windows
- `src/context/`
  Desktop state and window management
- `src/lib/`
  Pure helpers and shared logic
- `src/hooks/`
  Reusable React hooks
- `src/types/`
  Shared TypeScript contracts
- `docs/`
  Architecture notes

## Notes

- This project uses local data only. There is no backend or database.
- The current test suite focuses on pure logic helpers.
- If you rename app ids or remove required fields in `siteData.ts`, parts of the UI may stop working.

For the technical structure, see [architecture.md](/abs/C:/Users/sharm/Desktop/Anv2/anv2/docs/architecture.md).
