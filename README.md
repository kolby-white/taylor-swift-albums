# Taylor Swift Albums: revised edition

A revised web version of Kolby White's ArcGIS StoryMap
[Taylor Swift Albums](https://storymaps.arcgis.com/stories/54e18ec7155e4b33b04445be6986c460).

**Live site:** https://kolby-white.github.io/taylor-swift-albums/
**What changed and why:** [recommendations.html](recommendations.html)

## Additions
- Eras Tour map: all 149 shows by city, filterable by leg (Leaflet + Esri gray canvas basemap)
- "Where the songs come from" map of nine places tied to specific albums
- Clickable 2006–2026 timeline that marks the Big Machine → Republic switch and the re-recordings
- An original summary for each album, with the Wikipedia excerpts kept and credited in collapsible blocks
- "Every era has a look": a 12-era ribbon of colors sampled from each original cover, with motifs and how the visual identity reflects the music
- "How the music evolved": genre heatmap, theme matrix, and a four-phase songwriting breakdown
- "Compare the albums": stats dashboard (9 metrics, ranked bars), X/Y scatter with correlation, head-to-head album comparison, and a sortable data table, all sourced from Wikipedia
- Updated masters/re-recordings section (through the May 2025 buyback)
- Section navigation, full credits, alt text, dark mode, phone layout

## Files
`index.html` (page) · `data.js` (albums, places, tour cities, stats) · `app.js` (rendering + maps) · `compare.js` + `compare.css` (comparison tools) · `eras.js` + `eras.css` (era visual identity) · `styles.css`

Images are served from the original StoryMap's public ArcGIS item resources. Album art and posters © their rights holders, used for non-commercial educational commentary. Fan project, not affiliated with Taylor Swift or her labels.
