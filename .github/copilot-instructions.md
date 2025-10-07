# GitHub Copilot Instructions

## 🧠 Project Overview
This project is a 2D top-down pixel game built with JavaScript and HTML5 Canvas for rendering.  
The backend uses Node.js with Express to serve static files, handle multiplayer logic, and manage game state synchronization.

## 🎨 Frontend / Game Client Guidelines
- Use **HTML5 Canvas** for all rendering.
- Organize code into logical modules (e.g., `player.js`, `map.js`, `input.js`, `engine.js`).
- Use **ES modules (import/export)** syntax.
- Keep the **game loop** efficient — prefer `requestAnimationFrame` for rendering.
- Store assets (sprites, tilesets, sounds) in `/public/assets/`.
- Use **32×32 or 64×64 pixel tiles** and ensure consistent scaling.
- Prefer **pure JavaScript** (no frameworks unless essential).
- Write clean, readable, and self-documenting code with comments explaining tricky math (e.g., collision or camera logic).
- When generating code, use descriptive variable names like `playerPosition`, `tileMap`, `velocityX`, etc.
- Follow consistent indentation (2 spaces).

## ⚙️ Backend / Server Guidelines
- Use **Node.js + Express**.
- Store server files under `/server/`.
- Use `express.json({ limit: "10mb" })` and `express.static("public")` for serving.
- Keep routes simple — e.g., `/api/state`, `/api/update`, `/api/connect`.
- Prefer modular organization: `routes/`, `controllers/`, and `utils/` directories.
- Avoid blocking the event loop — use async I/O.
- Follow modern ES syntax (`import`, `export`, `async/await`).

## 🧩 Code Style & Quality
- Follow **Prettier** style (2-space indentation, semicolons, single quotes).
- Avoid overly complex functions (>50 lines).
- Use meaningful commits and clear code comments.
- Always define constants (e.g., `const TILE_SIZE = 32;`) instead of hardcoding numbers.

## 💡 Copilot Behavior Preferences
- Suggest modular and reusable functions.
- Prioritize performance and readability.
- When unsure, prefer **clarity over brevity**.
- Provide comments for math, physics, or rendering code.
- Avoid unnecessary libraries — focus on native browser APIs.

## 📁 Project Structure (Guidelines for Copilot)

The project follows a **professional, modular folder layout** for a 2D top-down RPG made in JavaScript using HTML5 Canvas.

### Core Layout

```
client/
├── index.html
├── main.js
│
├── engine/
│   ├── core/         # Game loop, renderer, resource loader, camera
│   ├── entities/     # Player, NPCs, enemies, projectiles
│   ├── scenes/       # Game scenes (town, battle, menu, etc.)
│   ├── ui/           # HUD, dialogs, inventory screens
│   └── input/        # Keyboard, mouse, gamepad handlers
│
├── utils/            # Math, pathfinding, collision helpers
├── assets/           # Sprites, tiles, sounds, maps
├── data/             # JSON data for items, NPCs, quests
│
server/
├── index.js          # Express app entry
├── routes/           # API endpoints
├── controllers/      # Game logic (save/load, multiplayer)
└── utils/            # Server-side helpers

.github/
└── copilot-instructions.md
```

### Folder Rules for Copilot
- **Never mix responsibilities:** Keep rendering in `core/`, logic in `entities/`, and UI in `ui/`.
- **Always use ES modules:** (`import` / `export`) across all engine files.
- **Keep file names lowercase** and use hyphens only when necessary.
- **Prefer modular, reusable systems** over long monolithic functions.
- When generating code, use this structure to determine where new files or functions belong.
- For example:
  - Rendering helpers → `engine/core/renderer.js`
  - Camera logic → `engine/core/camera.js`
  - Player movement → `engine/entities/player.js`
  - Keyboard input → `engine/input/keyboard.js`
  - Dialogue UI → `engine/ui/dialogBox.js`

### Style Notes
- Use **2-space indentation**, **single quotes**, and **Prettier-style formatting**.
- Keep all asset paths relative to `/assets/`.
- Write concise, well-commented functions.
- When possible, prefer readability and clarity over extreme brevity.

## 🧠 Learning Mode (Minimal Change Policy)

This project is meant for learning and gradual development.

When suggesting code changes or completions:

- **Prefer small, focused edits** instead of full rewrites.  
  Example: Fix a bug in a few lines rather than replacing an entire function.

- **Preserve existing structure** whenever possible.  
  Do not rename functions or variables unless explicitly requested.

- **Explain improvements clearly in comments** (if using Copilot Chat).  
  Provide short notes like “// added basic camera follow” or “// simplified collision check”.

- **Respect current patterns and architecture.**  
  Adapt to the existing style instead of introducing new frameworks or APIs.

- **Avoid auto-optimizing** or introducing unnecessary abstractions.  
  Simplicity and readability take priority over performance at this stage.

The goal is to **help the developer understand each step** of the code evolution, not to produce the final version automatically.
