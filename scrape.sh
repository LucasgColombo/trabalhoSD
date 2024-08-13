#!/bin/bash

# Script para fazer scrape de uma página da Steam
URL="https://store.steampowered.com/search/?supportedlang=brazilian&specials=1&filter=topsellers&ndl=1"
OUTPUT="steam_games.html"

curl -o $OUTPUT $URL

echo "Dados baixados e salvos em $OUTPUT"
