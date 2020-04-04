// APIs hidden with .gitignore in a config.js file
const RECIPE_API = config.RECIPE_API_KEY;
const RECIPE_ID = config.RECIPE_API_ID;

$(document).ready(() => {
  $('.search-container').on('submit', e => {
    e.preventDefault();
    let searchTerm = $('.search-bar').val();
    //   $.when(
    //     $.getJSON(
    //       `https://api.spoonacular.com/recipes/search/${searchTerm}&apiKey=${RECIPE_API}`
    //     )
    //   ).then(response => {
    //     console.log(response);
    //   });
    // $.ajax({
    //   url: `https://cors-anywhere.herokuapp.com/https://api.spoonacular.com/recipes/search/${searchTerm}`,
    //   headers: {
    //     'X-RapidAPI-Key': RECIPE_API,
    //     'Content-Type': 'application/json'
    //   },
    //   dataType: 'json',
    //   success: response => {
    //     console.log(response);
    //   }
    // });
    $.when(
      $.getJSON(
        `https://api.edamam.com/search?q=${searchTerm}&app_id=${RECIPE_ID}&app_key=${RECIPE_API}`
      )
    ).then(response => {
      let recipes = response.hits;
      recipes.forEach((recipe, i) => {
        let el = `<div>${recipe.recipe.label}</div>`;
        $('.top-recipes-container').prepend(el);
      });
      console.log(recipes);
    });
  });
});
