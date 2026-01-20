# After Effects Change List - Enablement Wall Videos

**Project File:** `3C_EnablementWallEdit.aep`
**Date:** January 20, 2026
**Based on Client Feedback from:** `MIM_3C_Present_Enablement Wall02.xlsx`

---

## Summary of Required Changes

The following changes need to be made to the video subtitles in Adobe After Effects:

---

## 1. TITLE/SUBTITLE INHERITANCE RULE

**Rule:** When a title appears that has NO direct subtitle mention, KEEP the previous subtitle visible and only change the title.

### Example (from client):
- **Video:** Financial Enablement (or Localization section in Special Enablers)
- **Scenario:** Title "Exploration Enablement Program" appears
- **Problem:** Currently shows title with no subtitle
- **Fix:** Keep the previous subtitle "Benefits include longer terms, grace periods, fast-track processing, letters of credit, financial guarantees and preferential rates of taxes, duties and fees." while showing the new title

### How to implement in After Effects:
1. Identify all titles that have empty/no subtitle in the Excel data
2. For these titles, extend the previous subtitle's duration to cover the new title's display time
3. Only animate the title change, not the subtitle

---

## 2. SEQUENTIAL TITLE DISPLAY

**Rule:** When the content mentions multiple related titles in the same subtitle, show the titles SEQUENTIALLY before moving to the next subtitle.

### Example (from client):
- **Video:** Industrial Cities & Special Economic Zones
- **Subtitle:** "Saudi Arabia has over 40 industrial cities and Special Economic Zones."
- **Implementation:**
  1. First show title: **"Over 40 Industrial Cities"** (hold for reading time)
  2. Then show title: **"4 Special Economic Zones"** (hold for reading time)
  3. Keep the SAME subtitle visible throughout both titles
  4. Then move to the next subtitle/title combination

### How to implement in After Effects:
1. Find the relevant subtitle section
2. Create two title keyframes with the same subtitle
3. Time each title for comfortable reading (approx. 3-4 seconds each)

---

## 3. REMOVE PARENTHETICAL NOTES

**Rule:** Remove ALL text in parentheses that were timing/production notes.

### Text to REMOVE from subtitles:
- "(Not directly mentioned; represents SIDF's sector-specific initiatives.)"
- "(Not directly mentioned...)" variations
- Any other parenthetical notes that were production guides

### How to find in After Effects:
1. Search text layers for "(" and ")"
2. Review if the parenthetical content is production notes vs. actual content
3. Delete production notes, keep legitimate parenthetical content (e.g., "(MODON)")

---

## 4. REMOVE ELLIPSIS AND QUOTES

**Rule:** Remove all `...` (ellipsis) and `"` (quotation marks) from subtitles.

### Characters to REMOVE:
- `...` (three periods)
- `…` (single ellipsis character)
- `"` (straight double quotes)
- `"` and `"` (curly double quotes)

### Exception:
- Keep quotes if they are part of a proper name like `"Supporting Units"` (but the quotes should still be removed)
- The content inside quotes stays, just remove the quote characters

### How to implement in After Effects:
1. Use Find & Replace in text layers
2. Replace `...` with nothing
3. Replace `"` with nothing
4. Review each change to ensure content integrity

---

## 5. FONT CONSISTENCY CHECK

**Rule:** All subtitles must use consistent font style and size.

### Standard to apply:
- **Font Family:** Diodrum Arabic
- **Font Style:** Bold (for titles), Regular (for subtitles) - confirm with design specs
- **Title Size:** [Verify current standard]
- **Subtitle Size:** [Verify current standard]

### Check all compositions:
1. `01 Financial Enablement Video`
2. `02 Industrial Cities & Economic Zones Video`
3. `03 Human Capital`
4. `04 Local Content`
5. `05 Special Enablers`

---

## 6. HUMAN CAPITAL - SUBTITLE SIZE FIX

**Specific Issue:** The first 2 subtitles in Human Capital video have inconsistent sizes.

### Fix Required:
1. Open `03 Human Capital` composition
2. Check the first two subtitle text layers
3. Ensure they match the standard subtitle size used throughout the video
4. The subtitles should be:
   - "A program to provide training support to private sector establishments..."
   - "Targeted Employees to be Saudi Nationality..." (or similar)

---

## 7. SUBTITLE TIMING OPTIMIZATION

**Rule:** When a subtitle is small/short and continues to the next slide, don't hold it too long. Account for reading time, then flip.

### Timing Guidelines:
- **Short subtitle (1-2 lines):** 3-4 seconds display time
- **Medium subtitle (3-4 lines):** 5-6 seconds display time
- **Long subtitle (5+ lines):** 7-8 seconds display time

### Implementation:
1. Review all subtitle durations in the timeline
2. Reduce duration for short subtitles that are held too long
3. Ensure smooth transitions between subtitle changes
4. Reading speed estimate: ~150-200 words per minute for comfortable reading

---

## Video-by-Video Checklist

### 01 Financial Enablement Video
- [ ] Check title/subtitle inheritance for titles without direct subtitles
- [ ] Remove any parenthetical notes
- [ ] Remove ellipsis and quotes
- [ ] Verify font consistency
- [ ] Adjust timing for short subtitles

### 02 Industrial Cities & Economic Zones Video
- [ ] Implement sequential title display for "40 Industrial Cities" / "4 Special Economic Zones"
- [ ] Check title/subtitle inheritance
- [ ] Remove parenthetical notes
- [ ] Remove ellipsis and quotes (check "Supporting Units" section)
- [ ] Verify font consistency
- [ ] Adjust timing for short subtitles

### 03 Human Capital
- [ ] **FIX FIRST 2 SUBTITLE SIZES** (priority)
- [ ] Check title/subtitle inheritance
- [ ] Remove parenthetical notes
- [ ] Remove ellipsis and quotes
- [ ] Verify font consistency throughout
- [ ] Adjust timing for short subtitles

### 04 Local Content
- [ ] Check title/subtitle inheritance
- [ ] Remove parenthetical notes
- [ ] Remove ellipsis and quotes
- [ ] Verify font consistency
- [ ] Adjust timing for short subtitles

### 05 Special Enablers
- [ ] Check "Exploration Enablement Program" title/subtitle (in Localization section)
- [ ] Check title/subtitle inheritance
- [ ] Remove parenthetical notes
- [ ] Remove ellipsis and quotes
- [ ] Verify font consistency
- [ ] Adjust timing for short subtitles

---

## Loop Videos (Starting Screens)
These may not need subtitle changes, but verify:
- [ ] `01 Financial Enablement_starting_Loop`
- [ ] `02 Industrial Cities & Economic Zones_Starting Screen_Loop`
- [ ] `03 Human Capital_Starting Screen_Loop`
- [ ] `04 Local Content_Starting Screen_Loop`
- [ ] `05 Special Enablers_Loop`

---

## After Completing Changes

1. **Render all 5 main videos** in H.264 baseline profile (for BrightSign compatibility)
2. **Test each video** for:
   - Subtitle readability
   - Font consistency
   - Timing feels natural
   - No production notes visible
3. **Export to:** `/EnablementWall-Vanilla/build/output/Screen02_videos/`
4. **File naming convention:**
   - `video-01.mp4` (Financial Enablement)
   - `video-02.mp4` (Industrial Cities)
   - `video-03.mp4` (Human Capital)
   - `video-04.mp4` (Local Content)
   - `video-05.mp4` (Special Enablers)

---

## Notes from Excel Data Analysis

The Excel file `MIM_3C_Present_Enablement Wall02.xlsx` contains 9 sheets:
1. FINANCIAL ENABLEMENT
2. INDUSTRIAL CITIES & SPECIAL ECO
3. HUMAN CAPITAL
4. LOCAL CONTENT
5. Specific Enablers_SMEs Enabling
6. Specific Enablers_PRODUCTIVITY
7. Specific Enablers_EXPORTS ENABL
8. Specific Enablers_LOCALIZATION (contains "Exploration Enablement Program")
9. Picklists

The "Specific Enablers" sheets (5-8) are for Screen 5 (Special Enablers video).

---

**Document prepared for video editing team**
