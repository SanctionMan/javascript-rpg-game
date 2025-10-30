# Day/Night Cycle System

## Overview
The day/night cycle is **server-authoritative** to keep all players synchronized. The server tracks game time and broadcasts updates to all clients every second.

## How It Works

### Server Side (`server/server.js`)
- Tracks `gameTime` (0 to 1, representing a 24-hour cycle)
- 0 = midnight, 0.25 = dawn, 0.5 = noon, 0.75 = dusk, 1.0 = midnight
- Updates every second and broadcasts `timeUpdate` event to all clients
- Default cycle duration: 2 minutes (configurable via `DAY_CYCLE_DURATION`)
- New players receive current time immediately on connect

### Client Side (`client/core/lighting.js`)
The `DayNightCycle` class handles visual lighting changes:

**Lighting Effects:**
- Sun position rotates based on time (rises/sets realistically)
- Sun intensity increases during day, dims at night
- Sun color changes: orange at sunrise/sunset, white at noon
- Ambient light adjusts for time of day
- Sky color transitions from blue (day) to dark (night)
- Moon lighting during nighttime (cool blue tones)

**Key Methods:**
- `updateLighting(time)` - Called when server sends time update
- `getTimeString()` - Returns formatted time (e.g., "3:45 PM") for UI

### Integration (`client/main.js`)
```javascript
import { DayNightCycle } from './core/lighting.js';

// Create lighting controller
const dayNightCycle = new DayNightCycle(scene);

// Pass to Network so it can receive time updates
const network = new Network(scene, gui, input, dayNightCycle);
```

### Socket Events
- **`timeUpdate`** (server → client): Broadcasts current game time (0-1)
- Sent every 1 second to all clients
- Sent immediately when player connects

## Configuration

### Change Cycle Speed (server/server.js)
```javascript
const DAY_CYCLE_DURATION = 120000; // milliseconds (120000 = 2 minutes)
```

Examples:
- 60000 = 1 minute cycle (fast)
- 240000 = 4 minutes cycle (slower)
- 600000 = 10 minutes cycle (realistic)

### Customize Colors (client/core/lighting.js)
Edit `getDayColor()` and `updateSkyColor()` methods to adjust:
- Sunrise/sunset colors
- Day/night sky colors
- Ambient light tones
- Light intensity curves

## Optional: Display Time in UI
```javascript
// In your HUD or UI code
const timeString = dayNightCycle.getTimeString();
console.log(timeString); // "3:45 PM"
```

## Benefits of Server-Side Sync
✅ All players see the same time of day  
✅ No client-side drift or desync  
✅ Easy to extend (time-based events, NPC schedules, etc.)  
✅ Can persist/save server time if needed  
