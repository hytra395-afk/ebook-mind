#!/bin/bash
# Create OG image using ImageMagick
# This script creates a 1200x630 OG image for social sharing

convert -size 1200x630 xc:white \
  -fill '#4F46E5' -draw 'circle 150,315 250,315' \
  -fill 'white' -draw 'circle 150,315 200,315' \
  -fill 'white' -draw 'circle 150,315 170,315' \
  -font 'Arial-Bold' -pointsize 80 -fill '#4F46E5' \
  -annotate +350+380 'Ebook Mind' \
  -font 'Arial' -pointsize 40 -fill '#1F2937' \
  -annotate +150+500 'Kiến thức ngách thay đổi mindset' \
  /Users/admin/Documents/Ebook\ app/ebook-mind/public/og-image.png
