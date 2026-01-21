# EnablementWall Project - Progress Report

## Date: December 10, 2025 (Updated)

---

## Project Overview
Kiosk application for BrightSign XT1144 hardware displaying enablement programs/initiatives. Built with Vanilla JS/HTML (React version deprecated due to BrightSign compatibility issues).

---

## Issues Reported by Client (from BrightSign Testing)

### Issue 1: White Bars Instead of Buttons
**Screens Affected:** Financial Enablement, Human Capital, Local Content
**Problem:** Program list showed white/gray bars (skeleton-like) instead of clickable buttons with text
**Root Cause:** Tailwind CSS classes not rendering properly on BrightSign's Chromium
**Status:** ✅ FIXED - Using Vanilla JS/HTML version

### Issue 2: Empty Section with ":"
**Screen Affected:** Tamheer Program detail page
**Problem:** Empty box showing just `:` character
**Root Cause:** `data.json` had `"textDone": ":"` instead of empty string
**Status:** ✅ FIXED

### Issue 3: Duplicate "Visit us" Footer
**Screen Affected:** Momaken Program detail page
**Problem:** Two "Visit us" sections appearing
**Root Cause:** "The Training Program" section had duplicate `textDone` with "Visit us" text
**Status:** ✅ FIXED

### Issue 4: Video Playback Issues
**Problem:** Videos may not autoplay on BrightSign
**Root Cause:** Missing `muted` and `playsInline` attributes required for Chromium autoplay
**Status:** ✅ FIXED

### Issue 5: Menu Pages Centered (Not Fullscreen)
**Problem:** Enablers and Details pages had content centered with too much padding
**Root Cause:** CSS had `max-width` constraints and centered alignment
**Status:** ✅ FIXED - Content now fills screen with less padding

### Issue 6: Menu Scroll Position Not Resetting
**Problem:** When returning to menu after skipping video, scroll position was retained
**Root Cause:** No scroll reset on page navigation
**Status:** ✅ FIXED - Added scrollTop = 0 on page init

### Issue 7: Financial Enablement Missing Background
**Problem:** Financial Enablement page had no background image
**Root Cause:** bgImage not being applied
**Status:** ✅ FIXED - Added fallback to enablers-02.png

---

## Current Working Version: Vanilla JS/HTML

### Location
```
/Users/varunsaini/Desktop/EnablementWall/EnablementWall-Vanilla/
├── server.js          # Node.js static server on port 3001
└── build/
    ├── index.html     # Single-page app with all functionality
    ├── config.json    # Screen configuration (with poster paths)
    ├── data.json      # Enablers/program data
    ├── enablers-02.png # Background for Financial Enablement
    ├── enablers-05.png # Background images
    ├── enablers-06.png
    ├── enablers-07.png
    ├── enablers-08.png
    ├── posters/       # Static poster images for loop page
    │   ├── poster-01.jpg
    │   ├── poster-02.jpg
    │   ├── poster-03.jpg
    │   ├── poster-04.jpg
    │   └── poster-05.jpg
    ├── output/        # Videos
    │   ├── Screen01_loops/
    │   │   ├── loop-01.mp4
    │   │   ├── loop-02.mp4
    │   │   ├── loop-03.mp4
    │   │   ├── loop-04.mp4
    │   │   └── loop-05.mp4
    │   └── Screen02_videos/
    │       ├── video-01.mp4
    │       ├── video-02.mp4
    │       ├── video-03.mp4
    │       ├── video-04.mp4
    │       └── video-05.mp4
    ├── Icons/         # Program icons
    └── favicon.ico
```

### How to Run
```bash
cd /Users/varunsaini/Desktop/EnablementWall/EnablementWall-Vanilla
node server.js
# Open http://127.0.0.1:3001
```

---

## BrightSign Hardware Solutions

### Video Overlay Issue
**Problem**: BrightSign's Chromium uses **hardware video rendering** which overlays on top of ALL HTML/CSS elements, ignoring z-index completely.

**Solution**: Use `hwz="z-index:-1"` attribute on video elements (BrightSign-specific feature)
```html
<video id="loopVideo" hwz="z-index:-1" muted playsinline loop>
```

### Loop Page - Video with hwz Attribute
Loop videos now play with `hwz="z-index:-1"` so buttons appear on top:
```html
<video id="loopVideo" hwz="z-index:-1" muted playsinline loop
       style="position:absolute; top:0; left:0; width:100%; height:100%; object-fit:cover; z-index:1;">
</video>
<button id="watchBtn" style="position:absolute; bottom:32%; left:12%; z-index:100;">Watch Video</button>
```

### Video Page - 96% Video, 4% Skip Bar
```html
<video id="mainVideo" muted playsinline style="width:100%; height:96%; object-fit:cover;"></video>
<div id="videoBottomBar" style="height:4%; background-color:#000;">
  <button id="closeBtn">Skip →</button>
</div>
```

---

## External Links - Modal Iframe Solution

**Problem**: External website links navigated away from app with no way to return (touchscreen kiosk).

**Solution**: Links open in fullscreen modal with iframe and "Return to App" button at bottom:
```html
<div id="linkModal">
  <iframe id="linkIframe" src=""></iframe>
  <button id="linkModalClose">✕ Return to App</button>
</div>
```

```css
#linkModal {
  display: none;
  position: fixed;
  top: 0; left: 0;
  width: 100vw; height: 100vh;
  background: #000;
  z-index: 9999;
}
#linkModal.active {
  display: flex;
  flex-direction: column;
}
#linkIframe {
  flex: 1;
  width: 100%;
  border: none;
}
#linkModalClose {
  width: 100%;
  height: 60px;
  background: #40D9C7;
  color: #000;
  font-weight: bold;
}
```

**Note**: Some websites block iframe embedding (X-Frame-Options). These will show white screen.

---

## Page Layout - Fullscreen with Fixed Header/Footer

### Enablers Page CSS
```css
#page-enablers {
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
  background: #1e2f2d;
}
.enablers-content {
  height: 100%;
  padding: 20px 40px;  /* Reduced padding for fullscreen */
  width: 100%;
}
.enablers-title {
  font-size: 3rem;     /* Bigger title */
  flex-shrink: 0;      /* Fixed at top */
}
.enablers-list {
  flex: 1;             /* Fills available space */
  overflow-y: auto;    /* Scrolls */
}
.enabler-btn {
  padding: 20px 30px;  /* Bigger buttons */
  font-size: 1.5rem;
}
.nav-buttons {
  flex-shrink: 0;      /* Fixed at bottom */
}
```

### Details Page CSS
Same pattern - title/subtitle fixed at top, cards scroll in middle, nav buttons fixed at bottom.

### Scroll Reset on Navigation
```javascript
function initEnablersPage(params) {
  setTimeout(function() {
    var listEl = document.getElementById('enablersList');
    if (listEl) listEl.scrollTop = 0;
  }, 50);
  // ... rest of function
}
```

---

## CSS Fixes Applied

### Remove Tap Highlight (Yellow Bounding Box)
```css
button, a, select, input, [onclick] {
  outline: none !important;
  -webkit-tap-highlight-color: transparent !important;
  -webkit-touch-callout: none !important;
  -webkit-user-select: none !important;
}
* {
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0) !important;
}
```

---

## Current App Flow

```
Screen Selector (/)
    ↓ [Select screen, click Go]
Loop Page (#loop)
    ↓ Shows looping video with hwz attribute
    │   - "Watch Video" button (pill, semi-transparent)
    │   - "Reset Screen" text link
    ↓ [Click Watch Video]
Main Video (#video)
    ↓ Video plays (96% screen), "Skip →" in bottom right
    ↓ [Video ends OR click Skip]
    ├── If Screen 5 → Special Enablers Grid (#special)
    └── Else → Enablers List (#enablers?id=1&card=X)
                    ↓ [Click program button]
              Program Details (#details?id=1&card=X&ei_id=Y)
                    ↓ [Click external link button]
              Opens website in modal iframe with "Return to App" button
```

---

## Button Styling Summary

| Button | Style |
|--------|-------|
| Watch Video | Pill, 1px teal border, 15% black bg, bold text |
| Reset Screen | Text only, no border, transparent |
| Skip (video) | Text "Skip →", minimal, bottom right |
| Enabler buttons | White border pill, transparent bg, 1.5rem font |
| External links | Teal bg (#40D9C7), black text, opens in modal |
| Return to App | Full width, teal bg, bottom of modal |
| Nav buttons | Circle, teal border, home/back icons |

---

## Key Technical Details

- **BrightSign XT1144** with old Chromium browser
- **`hwz="z-index:-1"`** - BrightSign-specific attribute for video layering
- **ES5-compatible JavaScript** (no async/await, arrow functions limited)
- **Hash-based routing** for SPA navigation
- **H264 baseline profile** for video compatibility
- **Server runs on port 3001**
- **Node.js v14+ required**
- **All assets are local** - no external CDN dependencies

---

## Client Deployment

**Share the entire folder:**
```
/Users/varunsaini/Desktop/EnablementWall/EnablementWall-Vanilla/
```

This includes:
- `server.js` - Node.js server
- `build/` folder with all assets (index.html, config.json, data.json, videos, images, icons)

---

## Testing Checklist

- [x] Screen selector dropdown works
- [x] Loop page shows video with buttons overlay
- [x] Watch Video button visible and clickable
- [x] Main video plays
- [x] Skip button works
- [x] Videos loop properly (fallback onended handler)
- [x] Enablers page shows buttons (fullscreen)
- [x] Program details display correctly (fullscreen)
- [x] External links open in modal
- [x] "Return to App" button works
- [x] No yellow tap highlight on buttons
- [x] Scroll resets when returning to menu
- [x] Financial Enablement has background image
- [ ] Test all 5 screens on BrightSign hardware

---

## Files Modified (Dec 1, 2025)

1. **index.html** - Updated CSS for fullscreen layout, scroll reset JS
2. **Background fallback** - Added enablers-02.png as default for Financial Enablement

---

## Issue 8: X-Frame-Options Blocked Links (Dec 10, 2025)

**Problem:** Some external links open in iframe modal but show white/blank screen because the websites block iframe embedding via X-Frame-Options or Content-Security-Policy headers.

**Status:** ✅ FIXED (Dec 11, 2025) - 14 blocked links removed from data.json

### Removed URLs (14 total)
The following blocked URLs were removed from data.json:
- `gami.gov.sa` (2 occurrences)
- `dinar.sa`
- `sukuk.sa` (2 occurrences)
- `modon.gov.sa`
- `rcjy.gov.sa`
- `eservices.taqat.sa/Eservices_Individual`
- `kafalah.gov.sa`
- `eloan.sidf.gov.sa`
- `google.com/maps`
- `saudiexports.gov.sa`
- `saudiexim.gov.sa`
- `saudimade.sa`

### Working Links Remaining: 39 total
All remaining links in data.json work properly in iframe modal.

---

## Issue 9: Content Alignment (Dec 11, 2025)

**Problem:** Client requested content to be centered/justified to middle on tall kiosk screen instead of left-aligned.

**Status:** ✅ FIXED

### Changes Made:
1. **Enablers page** - Content centered with max-width 800px
2. **Details page** - Content centered with max-width 800px
3. **Nav buttons** - Centered horizontally
4. **Titles** - Text-align center

---

## Contact/Notes

- Client tested on BrightSign XT1144 hardware
- Server runs on port 3001 (vanilla version)
- Node.js v14+ required
- All assets are local, no external CDN dependencies

---

## DEVELOPMENT RULES - DO's and DON'Ts

### ❌ DON'Ts (Never Do These)

1. **Never use setTimeout to delay video loading**
   - Video event handlers must be set AFTER video src is assigned
   - Race conditions between setTimeout and event handlers cause crashes
   ```javascript
   // BAD - event handlers set before src
   setTimeout(function() { video.src = url; }, 50);
   video.oncanplaythrough = function() { ... }; // CRASH!

   // GOOD - everything in sequence
   video.src = url;
   video.load();
   video.oncanplaythrough = function() { ... };
   ```

2. **Never wrap content page initialization in setTimeout**
   - Causes delays and potential race conditions
   - DOM manipulation is fast enough without delays

3. **Never set video.src = '' and then set event handlers**
   - Always reset video state, then set src, then set handlers

4. **Never use async/await or arrow functions**
   - BrightSign Chromium is ES5 only
   - Use `function() {}` not `() => {}`

5. **Never use external CDN links**
   - All assets must be local
   - BrightSign may not have internet access

6. **Never use CSS Grid**
   - Use Flexbox instead for BrightSign compatibility

7. **Never make changes without testing locally first**
   - Run `node server.js` and test in browser before committing

### ✅ DO's (Always Do These)

1. **Always reset video before loading new source**
   ```javascript
   video.pause();
   video.currentTime = 0;
   video.src = newUrl;
   video.load();
   ```

2. **Always use `isVideoReady` flag to prevent double-play**
   ```javascript
   var isVideoReady = false;
   video.oncanplaythrough = function() {
     if (isVideoReady) return;
     isVideoReady = true;
     video.play();
   };
   ```

3. **Always check `currentPage` in event handlers**
   ```javascript
   video.onended = function() {
     if (currentPage !== 'video') return;
     // ... handle event
   };
   ```

4. **Always use `hwz="z-index:-1"` on video elements**
   - Required for BrightSign to render HTML over video

5. **Always include `muted` and `playsinline` on videos**
   - Required for autoplay on BrightSign/Chromium

6. **Always use inline styles for BrightSign compatibility**
   - CSS classes may not render correctly

7. **Always test all 5 screens before shipping**

---

## PRE-SHIP CHECKLIST

Before sharing any build with the client, verify ALL of the following:

### 1. Local Testing (Required)
- [ ] Run `node server.js` in EnablementWall-Vanilla folder
- [ ] Open http://127.0.0.1:3001 in browser
- [ ] Test Screen 1 (Financial Enablement) - full flow
- [ ] Test Screen 2 (Industrial Cities) - full flow
- [ ] Test Screen 3 (Human Capital) - full flow
- [ ] Test Screen 4 (Local Content) - full flow
- [ ] Test Screen 5 (Special Enablers) - full flow

### 2. Video Testing
- [ ] Loop videos play and loop seamlessly
- [ ] Main videos play after "Watch Video" click
- [ ] Skip button is visible and works
- [ ] No video jitter or double-loading
- [ ] Videos don't crash the app

### 3. Navigation Testing
- [ ] All enabler buttons are clickable
- [ ] All detail pages load correctly
- [ ] Back button works
- [ ] Home button returns to loop page
- [ ] Idle timeout returns to loop after 2 minutes

### 4. Content Testing
- [ ] No empty cards or ":" characters
- [ ] All titles display correctly
- [ ] External links open in modal (if any)
- [ ] "Return to App" button works

### 5. Code Review
- [ ] No setTimeout wrapping video loading
- [ ] No async/await or arrow functions
- [ ] All event handlers check currentPage
- [ ] Video elements have hwz attribute
- [ ] No console errors in browser

### 6. Git Hygiene
- [ ] All changes committed
- [ ] Commit message describes the fix
- [ ] Pushed to GitHub

---

## LESSONS LEARNED

### Issue 10: setTimeout Race Condition (Jan 21, 2026)

**Problem:** App crashed on BrightSign after "jitter fix" update.

**Root Cause:** Used setTimeout to delay video loading, but event handlers were set OUTSIDE the setTimeout, causing them to be attached to a video with no source.

**Bad Code:**
```javascript
setTimeout(function() {
  video.src = url;  // src set 50ms later
  video.load();
}, 50);
video.oncanplaythrough = function() { ... }; // Set immediately on empty video!
```

**Fix:** Remove setTimeout, load video directly:
```javascript
video.src = url;
video.load();
video.oncanplaythrough = function() { ... };
```

**Lesson:** Never separate video src assignment from event handler setup with setTimeout. Video loading is event-driven - let the browser handle timing.
