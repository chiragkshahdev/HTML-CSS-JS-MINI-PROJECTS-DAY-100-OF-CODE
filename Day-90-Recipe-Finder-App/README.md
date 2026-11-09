# Day 90 - Recipe Finder App

Search recipes by name, category and get full ingredients + instructions.

## Features
- Search by dish name (chicken, pasta, cake, paneer)
- Category filter: Chicken, Beef, Vegetarian, Dessert, Seafood, Pasta
- Random recipe button - Surprise Me
- Click any card to see full recipe
- Ingredients list with measurements
- Step by step instructions
- YouTube video link

## Tech Used
- HTML, CSS, JavaScript
- TheMealDB API

## API Used
- Search: https://www.themealdb.com/api/json/v1/1/search.php?s=chicken
- By Category: https://www.themealdb.com/api/json/v1/1/filter.php?c=Chicken
- By ID: https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772
- Random: https://www.themealdb.com/api/json/v1/1/random.php

## How to Run
1. Download all 4 files in same folder
2. Double click `index.html`
3. Or use VS Code Live Server

## Future Ideas
- Add favourites with localStorage
- Add veg / non-veg filter
- Add cooking time