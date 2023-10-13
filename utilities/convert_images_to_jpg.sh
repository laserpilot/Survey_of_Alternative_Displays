#!/bin/bash

# Relative path to the "video_embed_images" directory
image_directory="/Users/laser/Dropbox/Articles/Article_Gits/Survey_of_Alternative_Displays_gitbook/utilities/video-embed-images"

# Convert images to JPG format and remove the original files
find "$image_directory" -type f -exec sh -c '
  for image; do
    if [[ $image == *.jpg ]]; then
      echo "Skipping $image (already in JPG format)"
    else
      jpg_image="${image%.*}.jpg"
      sips -s format jpeg "$image" --out "$jpg_image"
      echo "Converted $image to $jpg_image"
      rm "$image"
      echo "Removed original $image"
    fi
  done
' sh {} +