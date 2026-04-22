#!/bin/bash
# MacOS native photo optimizer

INPUT_DIR="${1%/}" # Remove trailing slash if present

if [ -z "$INPUT_DIR" ]; then
  echo "Usage: npm run optimize <path-to-raw-photos-folder>"
  echo "Example: npm run optimize ~/Downloads/NewPhotos"
  exit 1
fi

PARENT_DIR=$(dirname "$INPUT_DIR")
OUTPUT_DIR="$PARENT_DIR/readyToUpload"

mkdir -p "$OUTPUT_DIR"

echo "Optimizing photos from $INPUT_DIR to $OUTPUT_DIR..."

find "$INPUT_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.heic" \) | while read file; do
  filename=$(basename "$file")
  name_without_ext="${filename%.*}"
  
  out_path="$OUTPUT_DIR/${name_without_ext}.jpg"
  
  if [ -f "$out_path" ]; then
    echo "Skipping (already optimized): $filename"
    continue
  fi
  
  echo "Processing: $filename"
  
  # Use sips to convert format to jpeg (-s format jpeg), and set max dimension to 2560px (-Z 2560)
  # This makes file size manageable for the web and GitHub
  sips -s format jpeg -Z 2560 "$file" --out "$out_path" > /dev/null 2>&1
done

echo "Done! 🎉 Your optimized photos are in the '$OUTPUT_DIR' folder."
echo "You can now safely drag these into Decap CMS."