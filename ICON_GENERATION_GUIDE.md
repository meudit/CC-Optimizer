# PWA Icon Generation Guide

Since the image generation service is unavailable, you'll need to create the app icons manually. Here are two easy methods:

## Method 1: Using Online Tools (Recommended)

1. **Create a base icon** (512x512px):
   - Go to [Canva](https://www.canva.com) or [Figma](https://www.figma.com)
   - Create a 512x512px square
   - Add the credit card emoji 💳 or design your own icon
   - Use the app colors: Background #3B82F6 (blue), Icon white or #FFFFFF
   - Export as PNG

2. **Generate all sizes**:
   - Go to [PWA Asset Generator](https://www.pwabuilder.com/imageGenerator)
   - Upload your 512x512px icon
   - Download the generated icons
   - Save `icon-192.png` and `icon-512.png` to the project folder

## Method 2: Using ImageMagick (Command Line)

If you have ImageMagick installed:

```bash
# Create a simple icon with ImageMagick
convert -size 512x512 xc:#3B82F6 -gravity center -pointsize 300 -fill white -annotate +0+0 "💳" icon-512.png

# Resize for 192x192
convert icon-512.png -resize 192x192 icon-192.png
```

## Method 3: Simple Placeholder

For testing, you can use a simple colored square:

1. Create a 512x512px image with blue background (#3B82F6)
2. Add white text "PO" (Points Optimizer) in the center
3. Save as `icon-512.png`
4. Resize to 192x192 and save as `icon-192.png`

## Files Needed

Place these files in the project root:
- `icon-192.png` (192x192px)
- `icon-512.png` (512x512px)

## Testing PWA

After adding icons:

1. Serve the app over HTTPS (required for PWA)
2. Open in Chrome/Edge
3. Look for the install prompt in the address bar
4. Or go to Settings → Install app

## Optional: Screenshots

For the manifest.json screenshots (optional):
- `screenshot-mobile.png` (390x844px) - Mobile view
- `screenshot-desktop.png` (1280x720px) - Desktop view

These enhance the install experience but are not required.
