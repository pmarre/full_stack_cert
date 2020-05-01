# QUARANTINI - Search over 350,000 recipes

Quarantini can be accessed here: [Live Site](https://pmarre.github.io/full_stack_cert/03_interactive_frontend_development/milestone_2/index.html)

## TABLE OF CONTENTS

## UX

- The goal of the site is to develop a responsive website where users can quickly find recipes for their favorite foods, view their saved recipes, and learn about the nutrition of various recipes.
- The site should be responsive and work on all browsers
- Clickable items have hover effects to alert the user that they can be clicked
- Inputs use placeholders to clearly describe what needs to be entered by user
- Saved recipes are marked with a filled in heart so users know if they have liked a recipe in the past

### User Stories

- _"As an avid cook, I would like to be able to search for new recipes based on ingredient or recipe name."_, Completed with a clear search bar on the homepage that allows users to search for a recipe by any keyword (i.e. taco, chicken, bbq, etc).
- _"I have a great new recipe that isn't on the site, I would love to send it in to be featured on the site."_, Completed with on the "Submit Recipe" page where users can quickly and easily submit their own recipes for use.
- _"I am a bit of a health nut, I want to be able to see the nutrition information for a recipe before I commit to cooking it."_, Completed with the "Nutrition" section available when clicking into every recipe. This section is clearly located beneath the recipe instructions.
- _"I am a visual chef and want to be able to see photos of the food before I cook it."_, Completed on every recipe card. The user can clearly see the provided image of the food they will be cooking. _If no image is present, the user will see a generic photo_ -_"I like to cook recipes that are popular"_, Completed with the trending recipes section of our homepage. Users can view three recipes that are popular at the time. -_"I love finding new recipes and can spend hours looking for new recipes and I need a place where I can save recipes I am not going to cook immediately"_, Completed with the "Saved Recipes" page and the save recipe button (heart icon on every recipe). Users can use their browsers storage to save recipes for future use.

### Strategy

### Scope

### Structure

### Surface

### Wireframes

### Features

- Search for a recipe
<details>
<summary>Recipe Search</summary>
<br>
![Image of recipe search](https://github.com/pmarre/full_stack_cert/blob/creating-read-me/03_interactive_frontend_development/milestone_2/assets/images/readme-images/recipe-search.png)
</details>
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
- Manual Testing:
  - Found Bugs/Errors:
    1. Incorrect use of localStorage produced results that worked in development, but failed in the live site
    - Used a single key/value pair in the localStorage
      - Value was equal to empty array, as users saved/unsaved recipes I used shift/unshift to add/remove them from the array
    - Fixed by creating a single key/value pair for every item that was liked using the recipe id as the key and value for easy access
    2. 402 error from Spoonacular API
    - 402 error is throttling that Spoonacular puts on their API to limit the number of requests per day with the option to pay for more requests
      - Used `location.replace(/throttle.html)`, to redirect user to a new page stating the error

## Edgecases

- Backup image if no image exists
- No results
- Throttle API
- Error Messages
