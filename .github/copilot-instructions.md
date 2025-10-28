GitHub Copilot Instructions
🧠 Project Overview

This project is a 3D low-poly multiplayer RPG inspired by RuneScape.
The client uses Babylon.js (WebGL-based 3D engine) and HTML5 for rendering and UI.
The server runs on Node.js with Express and Socket.IO for real-time multiplayer communication, game state management, and player synchronization.

🎮 Frontend / Game Client Guidelines

Use Babylon.js for all 3D rendering, physics, lighting, and camera systems.

Structure code with ES Modules (import/export) syntax.

Organize the client into modular subsystems: rendering, input, networking, entities, and UI.

Use low-poly assets and keep materials optimized (e.g., PBR materials with simple shaders or baked lighting).

Store all 3D assets (GLB, textures, audio) under /client/assets/.

Use requestAnimationFrame for the main game loop.

Include player movement, camera control, and world scene management.

Prefer clean, readable, and well-commented code explaining core 3D math (e.g., rotation, vector movement, camera follow).

Use Babylon’s Scene Graph effectively for player entities, world, lighting, and animations.

Always name variables clearly (e.g., playerMesh, cameraTarget, socketConnection).

Handle real-time updates from the server through Socket.IO events (e.g., playerJoined, stateUpdate, playerLeft).

Example Rendering Responsibilities
System	Description
core/scene.js	Initializes Babylon.js engine, camera, lights, and world setup
entities/player.js	Handles local and remote player mesh creation and updates
network/socket.js	Manages Socket.IO connection, events, and synchronization
input/controls.js	Handles keyboard/mouse input for movement and camera rotation
ui/hud.js	Renders in-game UI such as chat, inventory, and status bars
⚙️ Backend / Server Guidelines

Use Node.js + Express + Socket.IO.

Store server code in /server/.

Express should serve the static /client folder and handle the WebSocket upgrade.

Maintain an in-memory player registry (Map or object) containing IDs, names, positions, and rotation.

The server should:

Assign unique IDs to players.

Broadcast player join/leave events.

Sync position updates via Socket.IO (updatePosition, stateUpdate).

Optionally handle persistence (DB integration later).

Use async/await and modularize logic into controllers/ and utils/.

Tick rate for server updates: ~20Hz (50ms interval).

All network messages should be lightweight JSON objects.

Example Socket.IO Event Design
Event	Direction	Description
welcome	server → client	Sends initial world state and player ID
playerJoined	server → all	Notifies all players of a new player
updatePosition	client → server	Sends player position and rotation
stateUpdate	server → all	Periodic broadcast of all player states
playerLeft	server → all	Informs players when someone disconnects
chat	both	Simple text-based chat system
🧩 Code Style & Quality

Follow Prettier style: 2-space indentation, semicolons, single quotes.

Avoid overly long functions (>50 lines).

Use clear, descriptive naming for meshes, materials, and systems.

Include inline comments for vector math, interpolation, and physics updates.

Use constants (e.g., const MOVE_SPEED = 4;) instead of magic numbers.

Favor readability and modularity over micro-optimization.

📁 Project Structure (for Copilot)

This is a 3D RPG project built with Babylon.js and Socket.IO.
Copilot should assume this layout and generate new files or code accordingly.

client/
├── index.html
├── main.js
│
├── core/
│   ├── scene.js          # Engine setup (Babylon.js scene, camera, lighting)
│   ├── renderer.js       # Rendering loop, frame management
│   ├── world.js          # Loads terrain, environment, skybox
│
├── entities/
│   ├── player.js         # Local and remote player logic
│   ├── npc.js            # NPC definitions and behavior
│
├── input/
│   ├── controls.js       # Keyboard/mouse/gamepad input
│
├── network/
│   ├── socket.js         # Socket.IO client setup and event handling
│
├── ui/
│   ├── hud.js            # Health, inventory, chat, menus
│
├── assets/               # Models, textures, sounds
└── utils/                # Math helpers, interpolation, collision utils

server/
├── index.js              # Express + Socket.IO app entry
├── controllers/          # Game logic (movement, combat, world state)
├── routes/               # Optional REST routes (save/load)
├── utils/                # Helper functions, constants
└── config.js             # Server config (tick rate, ports, limits)

.github/
└── copilot-instructions.md

Folder Rules for Copilot

Never mix responsibilities:

Rendering in core/, logic in entities/, networking in network/, UI in ui/.

Always use ES Modules in the client (import/export).

Use CommonJS or ES Modules on the server depending on project setup.

Keep filenames lowercase and use clear descriptive names.

When generating new systems, Copilot should decide placement based on purpose:

3D camera code → core/scene.js

Movement interpolation → utils/interpolation.js

Socket.IO event handling → network/socket.js

Chat UI → ui/chat.js

🎨 Style & Design Guidelines

Keep visual style low-poly and readable.

Use PBR materials sparingly; prefer unlit or flat shading.

Maintain consistent world scale (1 unit = 1 meter).

Include ambient lighting and dynamic shadows where appropriate.

Use Babylon.js AssetContainer or SceneLoader for 3D assets.

🧠 Learning Mode (Minimal Change Policy)

This project emphasizes gradual learning and understanding.

When Copilot suggests code:

Prefer incremental edits over full rewrites.

Preserve the current architecture unless instructed to refactor.

Add concise, explanatory comments like
// Added camera follow logic or // Sync remote player positions.

Avoid unnecessary abstractions or third-party dependencies.

Keep all improvements small, focused, and educational.

Goal:
Empower the developer to learn how a real multiplayer 3D RPG works, not just generate the final product.