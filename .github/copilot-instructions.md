GitHub Copilot Instructions
🧠 Project Overview

This project is a 3D low-poly multiplayer RPG inspired by RuneScape.
The client uses Babylon.js (WebGL-based 3D engine) and HTML5 for rendering and UI.
The server runs on Node.js with Express and Socket.IO for real-time multiplayer communication, game state management, and player synchronization.

🎮 Frontend / Game Client Guidelines

Use Babylon.js for all 3D rendering, physics, lighting, and camera systems.

Structure code with ES Modules (import/export) syntax.

Organize the client into modular subsystems: rendering, input, networking, entities, and UI.

Use low-poly assets and keep materials optimized (simple shaders or baked lighting).

Store all 3D assets (GLB, textures, audio) under /client/assets/.

Use requestAnimationFrame for the main game loop.

Include player movement, camera control, and world scene management.

Use Babylon’s Scene Graph effectively for players, world, lighting, and animations.

Handle real-time updates from the server via Socket.IO (playerJoined, stateUpdate, playerLeft).

Example Rendering Responsibilities
System	Description
core/scene.js	Initializes Babylon.js engine, camera, lights, and world setup
entities/player.js	Handles local and remote player mesh creation and updates
network/socket.js	Manages Socket.IO connection, events, and synchronization
input/controls.js	Handles keyboard/mouse input for movement and camera rotation
ui/hud.js	Renders in-game UI such as chat, inventory, and status bars
⚙️ Backend / Server Guidelines

Use Node.js + Express + Socket.IO.

Store all server code in /server/.

Express should serve static client files and handle WebSocket upgrades.

Maintain an in-memory player registry storing IDs, names, positions, and rotation.

The server should:

Assign unique player IDs.

Broadcast join/leave events.

Sync positions and state updates through Socket.IO.

Use async/await, modularize logic into controllers/ and utils/.

Target a 20Hz tick rate (~50ms updates).

Use concise JSON for all network messages.

Example Socket.IO Event Design
Event	Direction	Description
welcome	server → client	Sends initial world state and player ID
playerJoined	server → all	Notifies players of a new player
updatePosition	client → server	Sends player position/rotation
stateUpdate	server → all	Broadcasts all player states
playerLeft	server → all	Player disconnect notice
chat	both	Basic in-game chat system
🧩 Code Style & Quality

Follow Prettier style: 2-space indentation, semicolons, single quotes.

Avoid long functions (>50 lines).

Use descriptive variable names for meshes, cameras, and materials.

Include comments for 3D math (vectors, quaternions, rotations).

Replace “magic numbers” with constants (e.g. const MOVE_SPEED = 4;).

Prioritize clarity and modularity over micro-optimization.

📁 Project Structure
client/
├── index.html
├── main.js
│
├── core/
│   ├── scene.js          # Babylon engine, camera, lights
│   ├── renderer.js       # Game loop and render cycle
│   ├── world.js          # Loads terrain, environment, skybox
│
├── entities/
│   ├── player.js         # Player logic (local/remote)
│   ├── npc.js            # NPCs, pathfinding
│
├── input/
│   ├── controls.js       # Keyboard/mouse/gamepad input
│
├── network/
│   ├── socket.js         # Socket.IO client setup & events
│
├── ui/
│   ├── hud.js            # UI overlay, chat, inventory
│
├── assets/               # Models, textures, sounds
└── utils/                # Math helpers, interpolation, collision

server/
├── index.js              # Express + Socket.IO entry
├── controllers/          # Game logic (movement, world sync)
├── routes/               # Optional REST API (save/load)
├── utils/                # Helpers and constants
└── config.js             # Server configuration (ports, tick rate)

.github/
└── copilot-instructions.md

Folder Rules for Copilot

Never mix responsibilities:
Rendering in core/, logic in entities/, networking in network/, UI in ui/.

Always use ES Modules on the client.

Keep filenames lowercase and descriptive.

When generating new systems:

3D camera → core/scene.js

Movement interpolation → utils/interpolation.js

Socket.IO handling → network/socket.js

Chat → ui/chat.js

🎨 Visual Style

Low-poly world aesthetic.

Flat or simple PBR materials.

1 Babylon.js unit = 1 meter.

Basic ambient light + directional sunlight.

Shadows optional for performance.

Use SceneLoader or AssetContainer for assets.

🧠 Learning Mode (Minimal Change Policy)

This project emphasizes gradual learning and clear progression.

When Copilot suggests code:

Prefer small edits, not total rewrites.

Maintain architecture unless explicitly changing it.

Always include short, helpful comments like:
// added remote player sync or // smoothed camera motion.

Avoid abstractions or extra libraries.

Focus on educational clarity and step-by-step evolution.

Goal:
Help the developer understand each part of building a 3D multiplayer RPG.

💬 Copilot Prompt Examples

Here are examples of ideal prompts to use in Copilot Chat or inline completions.
They teach Copilot what kinds of help to give for this project.

🧩 Game Systems

“Create a Babylon.js scene.js that sets up a camera, light, and ground.”

“Generate player.js to spawn a low-poly mesh and handle WASD movement.”

“Add camera follow logic that orbits around the player.”

“Implement socket.io events to broadcast player positions between clients.”

“Write interpolation code for smoothing remote player movement.”

“Generate a chat.js UI that connects to the socket and displays messages.”

“Add a world.js loader that imports a GLB file for the map.”

“Create a basic NPC.js that walks randomly and syncs with server state.”

🧠 Networking

“Implement a Socket.IO server that tracks player positions and broadcasts updates every 50ms.”

“Show how to handle player disconnects cleanly on the server.”

“Add a ‘welcome’ event that sends initial world data to a new client.”

🎨 UI & Assets

“Add an HTML overlay for health and inventory using Babylon GUI.”

“Create a chat HUD that displays player messages over time.”

“Show how to load a GLB model and attach it to the player entity.”

🔍 Debugging / Learning

“Explain how to use Babylon.js Vector3 for player movement direction.”

“Help me understand how to interpolate remote player positions smoothly.”

“Show how to integrate socket.io client in Babylon’s game loop.”