import os
import re
import markdown
import subprocess
from bs4 import BeautifulSoup
from urllib.parse import urlparse, unquote

# This was written with ChatGPT, almost entirely

# Define the directory where your Markdown files are located
base_directory = '/Users/laser/Dropbox/Articles/Article_Gits/Survey_of_Alternative_Displays_gitbook'

# Directory to save the thumbnail images
image_directory = os.path.join(base_directory, 'utilities/video_embed_images')

# Regular expression to match embed tags
embed_pattern = r'{% embed url="([^"]+)" %}'

# Create a function to find and process the embed tags


def process_embed_tags(md_content, md_filename):
    # Find all embed tags in the Markdown content
    embed_matches = re.findall(embed_pattern, md_content)

    # Create a list to store filenames
    filenames = []

    for idx, url in enumerate(embed_matches, start=1):
        try:
            # Get the video name from the URL
            video_name = os.path.splitext(
                os.path.basename(unquote(urlparse(url).path)))[0]
            image_filename = os.path.join(
                image_directory, f'{md_filename}_{idx}')

            subprocess.run(['yt-dlp', '--skip-download',
                            '--write-thumbnail', '--output', image_filename, url])

            # Append the filename to the list
            filenames.append(image_filename)
        except Exception as e:
            print(f"Error processing {url}: {str(e)}")

    # Append the filenames to the summary.txt file
    with open(os.path.join(image_directory, 'summary.txt'), 'a') as summary_file:
        for filename in filenames:
            summary_file.write(f"{filename}\n")


# Create the image directory if it doesn't exist
if not os.path.exists(image_directory):
    os.makedirs(image_directory)

# Recursively walk through the directory and process Markdown files
for root, dirs, files in os.walk(base_directory):
    for filename in files:
        if filename.endswith('.md'):
            full_path = os.path.join(root, filename)

            # Read the Markdown file
            with open(full_path, 'r', encoding='utf-8') as file:
                md_content = file.read()

            # Use markdown library to convert Markdown to HTML
            html_content = markdown.markdown(
                md_content, extensions=['markdown.extensions.extra'])

            # Use BeautifulSoup to parse the HTML
            soup = BeautifulSoup(html_content, 'html.parser')

            # Extract and process embed tags
            md_filename = os.path.splitext(filename)[0]
            process_embed_tags(md_content, md_filename)
