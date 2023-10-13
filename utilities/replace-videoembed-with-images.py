import os
import re
from bs4 import BeautifulSoup
from urllib.parse import urlparse, unquote

# Get the current directory where the script is located
current_directory = os.path.dirname(os.path.abspath(__file__))

# Define the directory where your processed images and Markdown files are located
# Go up one level from the "utilities" folder
base_directory = os.pardir

# Directory where the processed images are located
image_directory = os.path.join(current_directory, 'video_embed_images')

# Directory for the new Markdown files (within the "utilities" folder)
new_md_files_directory = os.path.join(current_directory, 'new_md_files')

# Regular expression to match embed tags, including the optional {% endembed %} tag
embed_pattern = r'{% embed url="([^"]+)" %}(.*?)\{% endembed %\}'

# Function to replace embed tags with image Markdown tags


def replace_embed_tags(md_content, md_filename):
    # Find all embed tags in the Markdown content
    embed_matches = re.finditer(embed_pattern, md_content, re.DOTALL)

    for idx, match in enumerate(embed_matches, start=1):
        url = match.group(1)
        embed_content = match.group(2)

        try:
            # Use .jpg as the image extension
            image_filename = f'{md_filename}_{idx}.jpg'

            # Construct the relative path to the image in the video_embed_images folder
            relative_image_path = os.path.relpath(os.path.join(
                image_directory, image_filename), os.path.dirname(full_path))
            print({relative_image_path})
            print({image_filename})

            # Replace {% embed %} tag with image Markdown tag and relative image path
            md_content = md_content.replace(match.group(
                0), f'![{md_filename}_{idx}]({relative_image_path}) [{embed_content}]({url})')
            print(
                f'![{md_filename}_{idx}]({relative_image_path}) [{embed_content}]({url})')
        except Exception as e:
            print(f"Error processing {url}: {str(e)}")

    # Remove any remaining {% endembed %} tags
    md_content = md_content.replace('{% endembed %}', '')

    return md_content


# Recursively walk through the directory and process Markdown files
for root, dirs, files in os.walk(base_directory):
    # Exclude the "utilities" folder in the parent directory
    if current_directory in root:
        continue

    for filename in files:
        if filename.endswith('.md'):
            full_path = os.path.join(root, filename)

            # Determine the relative path within the directory structure
            relative_path = os.path.relpath(full_path, base_directory)

            # Construct the output directory path for the new file
            output_dir = os.path.join(
                new_md_files_directory, os.path.dirname(relative_path))
            os.makedirs(output_dir, exist_ok=True)

            # Read the original Markdown file
            with open(full_path, 'r', encoding='utf-8') as file:
                md_content = file.read()

            # Use BeautifulSoup to parse the HTML
            soup = BeautifulSoup(md_content, 'html.parser')

            # Extract and process embed tags
            md_filename = os.path.splitext(filename)[0]
            new_md_content = replace_embed_tags(md_content, md_filename)

            # Construct the new markdown file path
            new_md_filename = os.path.join(output_dir, filename)

            # Write the modified Markdown content to the new file preserving the folder structure
            with open(new_md_filename, 'w', encoding='utf-8') as new_file:
                new_file.write(new_md_content)
