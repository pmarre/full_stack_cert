// APIs hidden with .gitignore in a config.js file
const RECIPE_API = config.RECIPE_API_KEY;
const RECIPE_ID = config.RECIPE_API_ID;
const backupImage = './assets/images/rush-8.png';

$(document).ready(() => {
  $('.search-container').on('submit', e => {
    e.preventDefault();
    let searchTerm = $('.search-bar').val();
    $.when(
      $.getJSON(
        `https://api.spoonacular.com/recipes/search?apiKey=${RECIPE_API}&number=10&query=${searchTerm}`
      )
    ).then(response => {
      console.log(response);
      let recipes = response.results;
      let img;
      // Check if no images
      // Set backup image if no images
      recipes.forEach((recipe, i) => {
        if (recipe.imageUrls.length === 0) {
          img = backupImage;
        } else {
          img = response.baseUri + recipe.image;
        }

        let el = `<div class="recipe-card">
        <div class="img" style="background-image: url('${img}')"></div>
        <div class="recipe-details">
          <h3 class="recipe-card-heading">${recipe.title}</h3>
          <span class="recipe-card-cook-time">Cook Time: ${recipe.readyInMinutes} minutes</span>
          <a class="btn recipe-card-view-recipe" href="#" onclick="showIngredients('${recipe.uri}')">See recipe</a>
        </div>
      </div>`;
        $('.top-recipes-container').prepend(el);
      });
      console.log(recipes);
    });
  });
});

function showIngredients(foodId) {
  let id = foodId.indexOf('#');
  let food = foodId.substring(id + 1);
  console.log(food);
  $.when(
    $.getJSON(
      `https://api.edamam.com/search?r=${foodId}&app_id=${RECIPE_ID}&app_key=${RECIPE_API}${food}`
    ).then(response => {
      console.log(response);
    })
  );
}
