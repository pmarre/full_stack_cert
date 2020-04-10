const RECIPE_API = 'fe4d98c4906948e2b62c8cde455bc054';
const backupImage = './assets/images/rush-8.png';

$(document).ready(() => {
  // Menu animations
  $('.nav-container').click(function () {
    $('.nav').css('width', '100%');
  });
  $('.close').click(function () {
    $('.nav').css('width', '0');
  });

  // get & display random fact on page load
  getRandomFact();
  getRandomRecipe();

  $('.search-container').on('submit', (e) => {
    e.preventDefault();

    if ($('.search-bar').val() == '') {
      $('.search-bar').addClass('error');
      $('.error-message').css('display', 'block').css('height', '100%');
    } else {
      $('.full-recipe-container').remove();
      $('.search-bar').removeClass('error');
      $('.recipe-card-list').css('display', 'flex');
      $('.error-message').css('display', 'none');
      $('#spinner').show();
      let searchTerm = $('.search-bar').val();
      $.when(
        $.getJSON(
          `https://api.spoonacular.com/recipes/search?apiKey=${RECIPE_API}&number=15&query=${searchTerm}`
        )
      ).then((response) => {
        let recipes = response.results;
        let img;
        let el;
        $('.recipe-card-list').prepend(
          `<div class="recipe-inner-container"></div>`
        );
        $('#spinner').hide();

        // Check if no images
        // Set backup image if no images
        recipes.map((recipe) => {
          if (recipe.imageUrls.length === 0) {
            img = backupImage;
          } else {
            img = response.baseUri + recipe.image;
          }
          el = `<div class="recipe-card">
        <div class="img" style="background-image: url('${img}')"></div>
        <div class="recipe-details">
          <h3 class="recipe-card-heading">${recipe.title}</h3>
          <span class="recipe-card-cook-time">Cook time: ${recipe.readyInMinutes} minutes</span>
          <div class="btn-container"><a class="btn recipe-card-view-recipe" href="#top-recipes" onclick="showIngredients(${recipe.id})">See recipe</a></div>
        </div>
      </div>`;
          $('.recipe-inner-container').prepend(el);
        });

        if ($('.recipe-inner-container').length > 1) {
          $('.recipe-inner-container').next().remove();
        }
      });
    }
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
  $('.loading-container ').show();
  $.when(
    $.getJSON(
      `https://api.spoonacular.com/recipes/${foodId}/information?apiKey=${RECIPE_API}`
    ).then((response) => {
      let item;
      let img;
      console.log(response);
      // Check if no images
      // Set backup image if no images
      if (!response.image) {
        img = backupImage;
      } else {
        img = response.image;
      }
      $('.loading-container ').hide();
      let el = `<div class="full-recipe-container">
      <div id="${foodId}" class="banner-img" style="background-image: url('${img}')"></div>
        <div class="full-recipe-header">
        <button class="btn back-btn" onclick="backBtn()">Back</button>
        <div class="full-recipe-title">
        <h2 class="full-recipe-heading">${response.title}</h2>
        <div class="prep-icon-container">
        <div class="prep-icon">
        <i class="fas fa-utensils"></i>
          <span>Serves ${response.servings}</span>
        </div>
        <div class="prep-icon">
        <i class="far fa-clock"></i>
          <span>${response.readyInMinutes} minutes</span>
        </div>
      </div>
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
        <h4 class="nutrition-heading">Nutrition Information:</h4>
        <div id="donutchart" style="width: 100%; height: 400px;"></div>
      </div>`;

      // Is there a better way to do this? .full-recipes moved to bottom of div when recipe was added
      $('.top-recipes-container').prepend($('.full-recipes').prepend(el));

      if ($('.full-recipe-container').length > 1) {
        $('.full-recipe-container').next().remove();
      }
      getNutritionInfo(foodId);
      response.analyzedInstructions[0].steps.forEach((step) => {
        $('.instruction-list').append(`<li>${step.step}</li>`);
      });

      response.extendedIngredients.forEach((ingredient) => {
        // hacked this together -- is there a better way to do this?
        item = Object.values(ingredient.originalString).join('');
        $('.ingredient-list').append(`<li>${item}</li>`);
      });
    })
  );
}

function getRandomRecipe() {
  $('.btn-random-recipe').click(() => {
    $.when(
      $.getJSON(
        `https://api.spoonacular.com/recipes/random?apiKey=${RECIPE_API}`
      )
    ).then((response) => {
      showIngredients(response.recipes[0].id);
    });
  });
}

function getRandomFact() {
  $.when(
    $.getJSON(
      `https://api.spoonacular.com/food/trivia/random?apiKey=${RECIPE_API}`
    )
  ).then((response) => {
    $('.fact').prepend(response.text);
  });
}

function getNutritionInfo(id) {
  $.when(
    $.getJSON(
      `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json?apiKey=${RECIPE_API}`
    )
  ).then((response) => {
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
      ['Fat (g)', fat],
      ['Protein (g)', protein],
      ['Carbs (g)', carbs],
    ]);
    var options = {
      pieHole: 0.4,
      colors: ['#3ab86f', '#05d5ff', '#5533ff'],
      chartArea: { width: '100%', height: '80%' },
      legend: { position: 'bottom' },
    };

    var chart = new google.visualization.PieChart(
      document.getElementById('donutchart')
    );
    chart.draw(data, options);
  }
}
