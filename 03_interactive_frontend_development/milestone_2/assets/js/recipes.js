// APIs hidden with .gitignore in a config.js file
const RECIPE_API = config.RECIPE_API_KEY;
const RECIPE_ID = config.RECIPE_API_ID;
const backupImage = './assets/images/rush-8.png';

$(document).ready(() => {
  getRandomFact();

  // setInterval(() => {
  //   $('.fact').text('');
  //   getRandomFact();
  // }, 600000);
  //On form submit, pull up 15 results for search item
  $('.search-container').on('submit', e => {
    e.preventDefault();
    let searchTerm = $('.search-bar').val();
    $.when(
      $.getJSON(
        `https://api.spoonacular.com/recipes/search?apiKey=${RECIPE_API}&number=15&query=${searchTerm}`
      )
    ).then(response => {
      console.log(response);
      let recipes = response.results;
      let img;
      // Check if no images
      // Set backup image if no images
      let elContainer = `<div class="recipe-test></div>`;
      let el;
      $('.recipe-card-list').prepend(
        `<div class="recipe-inner-container"></div>`
      );
      recipes.map(recipe => {
        if (recipe.imageUrls.length === 0) {
          img = backupImage;
        } else {
          img = response.baseUri + recipe.image;
        }

        el = `<div class="recipe-card">
        <div class="img" style="background-image: url('${img}')"></div>
        <div class="recipe-details">
          <h3 class="recipe-card-heading">${recipe.title}</h3>
          <span class="recipe-card-cook-time">Cook Time: ${recipe.readyInMinutes} minutes</span>
          <div class="btn-container"><a class="btn recipe-card-view-recipe" href="#${recipe.id}" onclick="showIngredients(${recipe.id})">See recipe</a></div>
        </div>
      </div>`;
        $('.recipe-inner-container').prepend(el);
      });

      if ($('.recipe-inner-container').length > 1) {
        $('.recipe-inner-container')
          .next()
          .remove();
      }
    });
  });
});

// Back Button

function backBtn() {
  $('.recipe-card-list').css('display', 'flex');
  $('.full-recipe-container').remove();
}

// show full recipe
function showIngredients(foodId) {
  $('.recipe-card-list').css('display', 'none');

  $.when(
    $.getJSON(
      `https://api.spoonacular.com/recipes/${foodId}/information?apiKey=${RECIPE_API}`
    ).then(response => {
      console.log(response);

      let item;
      let el = `<div class="full-recipe-container">
      <div id="${foodId}" class="banner-img" style="background-image: url('${response.image}')"></div>
        <div class="full-recipe-header">
        <button class="btn back-btn" onclick="backBtn()">Back</button>
        <div class="full-recipe-title">
        <h2 class="full-recipe-heading">${response.title}</h2>
        <p class="full-recipe-prep-time">Prep Time: ${response.preparationMinutes} minutes</p>
        <p class="full-recipe-cook-time">Cook Time: ${response.cookingMinutes} minutes</p>
        <p class="full-recipe-serving-size">Servings: ${response.servings}</p>
        </div>
        <h4 class="summary-heading">Summary</h4>
        <p class="recipe-summary">${response.summary}</p>
        </div>
        <div>
        <ul class="ingredient-list">
        <h4>Ingredient List:</h4></ul>
        </div>
        <div><ol class="instruction-list">
        <h4>Cooking Instructions: </ol></div>
        <div id="donutchart" style="width: 900px; height: 500px;"></div>
      </div>`;

      // Is there a better way to do this? .full-recipes moved to bottom of div when recipe was added
      $('.top-recipes-container').prepend($('.full-recipes').prepend(el));

      if ($('.full-recipe-container').length > 1) {
        $('.full-recipe-container')
          .next()
          .remove();
      }
      getNutritionInfo(foodId);
      response.analyzedInstructions[0].steps.forEach(step => {
        $('.instruction-list').append(`<li>${step.step}</li>`);
      });

      response.extendedIngredients.forEach(ingredient => {
        // hacked this together -- is there a better way to do this?
        item = Object.values(ingredient.originalString).join('');
        $('.ingredient-list').append(`<li>${item}</li>`);
      });
    })
  );
}

function getRandomFact() {
  $.when(
    $.getJSON(
      `https://api.spoonacular.com/food/trivia/random?apiKey=${RECIPE_API}`
    )
  ).then(response => {
    $('.fact').prepend(response.text);
  });
}

function getNutritionInfo(id) {
  $.when(
    $.getJSON(
      `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${RECIPE_API}`
    )
  ).then(response => {
    console.log(response);
    let calories = parseInt(response.calories);
    let fat = parseInt(response.fat.replace('g', ''));
    let protein = parseInt(response.protein.replace('g', ''));
    let carbs = parseInt(response.carbs.replace('g', ''));
    createChart(calories, fat, protein, carbs);
  });
}

function createChart(calories, fat, protein, carbs) {
  google.charts.load('current', { packages: ['corechart'] });
  google.charts.setOnLoadCallback(drawChart);
  function drawChart() {
    var data = google.visualization.arrayToDataTable([
      ['Macro', 'Macros per Serving'],
      ['Calories', calories],
      ['Fat (g)', fat],
      ['Protein (g)', protein],
      ['Carbs (g)', carbs]
    ]);
    console.log(data);
    var options = {
      title: 'Nutrition Details',
      pieHole: 0.4
    };

    var chart = new google.visualization.PieChart(
      document.getElementById('donutchart')
    );
    chart.draw(data, options);
  }
}