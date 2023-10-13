# #!/bin/bash
# originally from this gist: https://gist.github.com/clemsos/9e480b2b792b57f1b22d
#requires you to install weasyprint

GITBOOK_REP="/Users/laser/Dropbox/Articles/Article_Gits/Survey_of_Alternative_Displays_gitbook"
SUMMARY_FILE="SUMMARY.md"
echo $OUTPUT_FILE

if [ -d "$GITBOOK_REP" ]; then

  echo "Entering directory '$GITBOOK_REP'..."
  cd $GITBOOK_REP
  if [ -f "$SUMMARY_FILE" ]; then
    # read summary and get texts by order in a single big file
    pandoc $SUMMARY_FILE -t html | \
      grep -o '<a href=['"'"'"][^"'"'"']*['"'"'"]' | \
      sed -e 's/^<a href=["'"'"']//' -e 's/["'"'"']$//'| \
      xargs cat | \
      pandoc -f markdown --variable fontsize=10pt \
              --variable=geometry:b5paper \
              --variable mainfont="Arial" \
             --variable documentclass=scrbook --toc --pdf-engine=weasyprint -o book.pdf
  else
    echo "File '$SUMMARY_FILE' does not exist"
  fi
else
echo "Directory '$GITBOOK_REP' does not exist"
fi