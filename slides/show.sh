echo $1
if [ $# -eq 0 ]
then
    reveal-md . --title 'Javascript' --theme solarized --highlightTheme github-gist
else
    reveal-md . --title 'Javascript' --theme moon
fi
