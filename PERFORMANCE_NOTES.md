# Performance Optimization Notes

## Critical: Background Image Optimization Required

**File**: `/public/assets/video/background.webp`  
**Current Size**: 5.1MB  
**Target Size**: <300KB  
**Impact**: Reduces page load time by 5+ seconds

### Action Items

1. **Compress Image**
   - Use ImageMagick, GIMP, or online tools
   - Reduce resolution from current to ~2560x1440
   - Reduce quality to 65-75%
   - Keep WebP format

2. **Alternative Formats**
   - Consider using AVIF format as primary with WebP fallback
   - AVIF can be 30-40% smaller than WebP

3. **Implementation**
   ```css
   /* Update background-image in globals.css */
   background-image: url('/assets/video/background.avif');
   /* fallback handled by browser */
   ```

4. **Testing**
   - Verify visual quality after compression
   - Test on mobile and desktop
   - Ensure blur/effect remains appropriate

### Tools for Compression

- **ImageMagick**: `magick background.webp -quality 70 -resize 2560x1440 background-optimized.webp`
- **FFmpeg**: `ffmpeg -i background.webp -q:v 70 background-optimized.webp`
- **Online**: TinyPNG, Squoosh, CloudConvert

### Performance Metrics

After optimization, expected improvement:
- Initial page load: ~6s → ~1s
- Paint timing: ~5s → <1s
- LCP improvement: significant

### Timeline

- Compress image before next deployment
- Measure Core Web Vitals after deployment
- Monitor performance on real users
