# Scratch - Search over 350,000 recipes

Scratch can be accessed here: [Live Site](https://pmarre.github.io/full_stack_cert/03_interactive_frontend_development/milestone_2/index.html)

## TABLE OF CONTENTS

1. [UX](https://github.com/pmarre/full_stack_cert/tree/master/03_interactive_frontend_development/milestone_2#UX)
   - [User Stories](https://github.com/pmarre/full_stack_cert/tree/creating-read-me/03_interactive_frontend_development/milestone_2#user-stories)
   - [Strategy](https://github.com/pmarre/full_stack_cert/tree/creating-read-me/03_interactive_frontend_development/milestone_2#strategy)
   - [Scope](https://github.com/pmarre/full_stack_cert/tree/creating-read-me/03_interactive_frontend_development/milestone_2#scope)
   - [Structure](https://github.com/pmarre/full_stack_cert/tree/creating-read-me/03_interactive_frontend_development/milestone_2#structure)
   - [Surface](https://github.com/pmarre/full_stack_cert/tree/creating-read-me/03_interactive_frontend_development/milestone_2#strategy)
   - [Wireframes](https://github.com/pmarre/full_stack_cert/tree/creating-read-me/03_interactive_frontend_development/milestone_2#wireframes)
2. [Features](https://github.com/pmarre/full_stack_cert/tree/creating-read-me/03_interactive_frontend_development/milestone_2#features)
   - [More Key Features](https://github.com/pmarre/full_stack_cert/tree/creating-read-me/03_interactive_frontend_development/milestone_2#more-key-features)
3. [Technologies Used](https://github.com/pmarre/full_stack_cert/tree/creating-read-me/03_interactive_frontend_development/milestone_2#technologies-used)
4. [Testing](https://github.com/pmarre/full_stack_cert/tree/creating-read-me/03_interactive_frontend_development/milestone_2#testing)
5. [Edgecases](https://github.com/pmarre/full_stack_cert/tree/creating-read-me/03_interactive_frontend_development/milestone_2#edgecases)
6. [Deployment]()

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

While deciding on a design for this project, I first needed to establish a target audience. Since cooking is done by nearly everyone, the target audience could range from a professional chef to the absolute beginner learning how to boil water. I decided that, while professional chefs could use my site successfully, they weren't my target audience. And the same goes for the absolute beginner. My target audience is the at home cook. Someone who has an understanding of their capabilities as a cook and is beginning to experiment with new recipes.

With the target audience being fairly broad, I needed a design that was intuitive to use, but offered more modern functionality like a "like" button to save favorite recipes. I also chose nice, bright colors to connect emotionally with people and provide a positive experience while searching for a recipe.

### Scope

The next problem I had to solve before diving into the design of the project was what does my target audience need? They don't need a recipe database, they need a recipe. They need something that looks appealing for them to cook. Users don't come to the site to look at a recipe database, they come to the site with the intent to find the recipe they are longing for.

So the next step was figuring out how to connect the user with the specific recipe they are looking for.

### Structure

### Surface

### Wireframes

<details>
<summary>Desktop Homepage Wireframe</summary>
<br />
   <img alt="Description" src="https://github.com/pmarre/full_stack_cert/blob/master/03_interactive_frontend_development/milestone_2/assets/images/readme-images/hp-wireframe.png">
</details>
<details>
<summary>Desktop Saved Recipes Page Wireframe</summary>
<br />
   <img alt="Description" src="https://github.com/pmarre/full_stack_cert/blob/master/03_interactive_frontend_development/milestone_2/assets/images/readme-images/hp-wireframe.png">
</details>
<details>
<summary>Desktop Submit Recipe Page Wireframe</summary>
<br />
   <img alt="Description" src="https://github.com/pmarre/full_stack_cert/blob/master/03_interactive_frontend_development/milestone_2/assets/images/readme-images/hp-wireframe.png">
</details>
<details>
<summary>Mobile Homepage Wireframe</summary>
<br />
   <img alt="Description" src="https://github.com/pmarre/full_stack_cert/blob/master/03_interactive_frontend_development/milestone_2/assets/images/readme-images/hp-wireframe.png">
</details>
<details>
<summary>Mobile Saved Recipes Page Wireframe</summary>
<br />
   <img alt="Description" src="https://github.com/pmarre/full_stack_cert/blob/master/03_interactive_frontend_development/milestone_2/assets/images/readme-images/hp-wireframe.png">
</details>
<details>
<summary>Mobile Submit Recipe Page Wireframe</summary>
<br />
   <img alt="Description" src="https://github.com/pmarre/full_stack_cert/blob/master/03_interactive_frontend_development/milestone_2/assets/images/readme-images/hp-wireframe.png">
</details>

## Features

This project is built with HTML, CSS, Javascript, and jQuery in conjuction with the [Spoonacular API](https://spoonacular.com/food-api) to built a recipe database. I chose to avoid using a style library like Bootstrap or Semantic UI and built this project from scratch. The majority of the site is styled using CSS3's Flexbox to make responsive elements so the project renders as expected on various devices.

Javascript and jQuery were used to add functionality to the project. Using jQuery's `.ajax()` method, I am able to quickly make calls to the API, return data, and check for errors.

#### More key features:

1. Recipe search functionality
   - Recieves top 15 results from the API and presents them in an organized and informative manor so the user can quickly view each recipe
   - If the search bar is left blank, user receives error when they try to submit
2. Full Recipe Card
   - Shows full recipe instructions, ingriedents, summary, image, nutrition, serving size, and cook time
   - Nutrition uses [Google Charts](https://developers.google.com/chart) to display Fat, Carbs, and Protein in a donut chart
3. Random Recipe Generator
   - Option to generate a random recipe to view
4. Trending Recipes
   - Right away, users are able to see three popular recipes when they land on the site
5. Fun Facts
   - On the homepage, users can see fun food facts that are pullded from Spoonacular's Food Trivia call
6. Saved Recipes
   - Recipes the user has "liked" are stored with Local Storage and presented on the Saved Recipes page

## Future Features

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

#### HTML

- Used W3C HTML validator to validate all HTML pages - No warnings or errors

#### CSS

- Used W3C CSS validator to validate all CSS files - No warnings or errors

#### Manual Testing:

##### Found Bugs/Errors:

1. Incorrect use of localStorage produced results that worked in development, but failed in the live site
   - Used a single key/value pair in the localStorage
   - Value was equal to empty array, as users saved/unsaved recipes I used shift/unshift to add/remove them from the array
   - Fixed by creating a single key/value pair for every item that was liked using the recipe id as the key and value for easy access
2. 402 error from Spoonacular API
   - 402 error is throttling that Spoonacular puts on their API to limit the number of requests per day with the option to pay for more requests
   - Used `location.replace(/throttle.html)`, to redirect user to a new page stating the error
3. Peer review in Code Institute Slack Channel
   - Used the peer review Slack channel to have student/alumni/mentors review the site and give feedback and look for bugs
   - There were two errors/issues that were brought up in the peer review:
     1. Site was giving a 404 (page not found) error when API quota was reached - this was due to a syntax error in my redirect
     2. While having no effect on the functionality of the site, by having my project share a repo with all of my course work, readability and repo navigation has become a bit of an issue. At this time, I am leaving the site in place, but moving forward each project will be in its own repository.

## Edgecases

There were a few edgecases that need to be considered for this project to protect the user experience. Because the user has full control over what they search for I needed to answer a few questions:

_Q: What if the recipe has no image?_

A: This came up in development a few times, I ended up finding an SVG online and used it as a backup image. Before any dynamic elements are added to the page, I check for an image. If no image exists, I add in my backup image.

_Q: What if there are no results?_

A: While no results is unlikely given the breadth of Spoonacular's API, it is still possible. For example what if someone enters "afdsfafac"? That is not a real word or food item and the API will respond with an empty object. If that is the case, the user will see the response: "Sorry, no results for 'afdsfafac'!"

_Q: Spoonacular's API has a pay wall. What happens if the daily limit is hit?_

A: Because I used the free version of the API, the site is limited to 100 requests per day. If a user happens to do the 101st search of the day, the API responds with a 402 error and the user gets redirected to a new landing page telling them what the issue is, to return tomorrow, and if they are tired of the pay wall, to donate to the site.

## Deployment
