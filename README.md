# Enablement Wall - BrightSign Kiosk Application

Kiosk application for BrightSign XT1144 hardware displaying enablement programs/initiatives.

## Tech Stack
- Vanilla JS/HTML (BrightSign compatible)
- Node.js static server

## Quick Start
```bash
cd EnablementWall-Vanilla
npm install
node server.js
# Open http://127.0.0.1:3001
```

## Project Structure
```
EnablementWall-Vanilla/
├── server.js          # Node.js static server (port 3001)
├── package.json
└── build/
    ├── index.html     # Single-page app
    ├── config.json    # Screen configuration
    ├── data.json      # Enablers/program data
    ├── Icons/         # Program icons
    ├── posters/       # Poster images
    └── output/        # Videos (not in git - add manually)
        ├── Screen01_loops/    # Loop videos
        └── Screen02_videos/   # Main videos
```

## Video Files
Video files are excluded from git due to size. Copy them manually to:
- `build/output/Screen01_loops/` - loop-01.mp4 to loop-05.mp4
- `build/output/Screen02_videos/` - video-01.mp4 to video-05.mp4

## Documentation
- `CLAUDE.md` - Detailed project documentation and issue fixes
- `feedback/AFTER_EFFECTS_CHANGE_LIST.md` - Video subtitle editing guide

## BrightSign Notes
- Uses `hwz="z-index:-1"` attribute for video layering
- H.264 Main profile, Level 5.1 for video compatibility
- ES5-compatible JavaScript (no async/await)
