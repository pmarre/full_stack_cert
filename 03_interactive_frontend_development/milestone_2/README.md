# QUARANTINI - Search over 350,000 recipes

## UX

### USER STORIES

- US 1
- us 2
- us 3
- us 4

## Strategy

## Scope

## Structure

## Surface

## Wireframes

## Features

- Search for a recipe
  - If blank, user receives error
  - Recieve top 15 results
    - Recipe cards include Image, Title, Cook Time, Like Button, and See Recipe Button
- Full Recipe
  - Shows full recipe instructions, ingriedents, summary, image, nutrition, serving size, and cook time
  - Nutrition uses [Google Charts](https://developers.google.com/chart) to display Fat, Carbs, and Protein in a Donut chart
- Click for a random recipe
- Trending Recipes
  - API does not offer a trending recipe call, so I used random recipes to get a similar effect
- Fun Facts
  - Uses Spoonacular's Food Trivia to call a new fun fact for the user on each refresh
- Saved Recipes
  - Recipes the user has liked are stored with Local Storage and presented on the Saved Recipes page

## Technologies Used

- HTML5
- CSS3
- Javascript
- jQuery
- Font Awesome
- Google Fonts
- Spoonacular Recipe API
- Google Charts
- Local Storage (for Saved Recipes)

## Testing

- HTML
- CSS
- Jasmine

## Edgecases

- Backup image if no image exists
- No results
- Throttle API
- Error Messages
