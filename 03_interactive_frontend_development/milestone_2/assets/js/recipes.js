'use strict';

// API is throttled at 100 requests/day
const RECIPE_API = '822ac61ec94b4490b4e562e53eccb278';
// const RECIPE_API = 'fe4d98c4906948e2b62c8cde455bc054';
const backupImage = './assets/images/rush-8.png';

// Build thumbnails
const buildThumbnail = (response) => {
  let recipes = response.results;
  let img;
  let thumbnailElement;
  $('.recipe-card-list').prepend(`<div class="recipe-inner-container"></div>`);
  $('#spinner').hide();

  // Check if no images
  // Set backup image if no images
  console.log(response);

  recipes.map((recipe) => {
    // check if recipe obj has key 'imageUrls'
    if ('imageUrls' in recipe) {
      if (recipe.imageUrls.length === 0) {
        img = backupImage;
      }
    } else {
      img = response.baseUri + recipe.image;
    }

    thumbnailElement = `
    <div class="recipe-card">
      <div class="img" style="background-image: url('${img}')">
        <div class="save-btn-container">
          <i class="far fa-heart heart-btn heart-btn-outline" id="heart-outline-${recipe.id}" style="display: block;" onclick="toggleLikeBtn(${recipe.id})"></i>
          <i class="fas fa-heart heart-btn heart-btn-fill" style="display: none;" id="heart-fill-${recipe.id}" onclick="toggleLikeBtn(${recipe.id})"></i>
        </div>
      </div>
      <div class="recipe-details">
          <a class="recipe-card-view-recipe" href="#top-recipes" onclick="showIngredients(${recipe.id})">${recipe.title}</a>
      </div>
    </div>`;

    $('.recipe-inner-container').prepend(thumbnailElement);
    if (localStorage.getItem(recipe.id) !== null) {
      $(`#heart-fill-${recipe.id}`).toggle();
      $(`#heart-outline-${recipe.id}`).toggle();
      $(`#heart-fill-${recipe.id}`).addClass('saved');
      localStorage.setItem(id, id);
    }

    if ($('.recipe-inner-container').length > 1) {
      $('.recipe-inner-container').next().remove();
    }
  });
};

const showIngredients = (foodId) => {
  $('.recipe-card-list').css('display', 'none');
  $('.loading-container ').show();
  $.ajax({
    url: `https://api.spoonacular.com/recipes/${foodId}/information`,
    type: 'GET',
    data: {
      apiKey: RECIPE_API,
    },
    success: (response) => {
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

      // Put in own function or find a way to put in HTML
      let el = `
      <div class="full-recipe-container">
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
        <div>
          <ol class="instruction-list">
            <h4>Cooking Instructions: </h4>
          </ol>
        </div>
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
    },

    error: function (xhr, status) {
      if (typeof this.statusCode[xhr.status] != 'undefined') {
        return false;
      }
      console.log(status);
    },
    statusCode: {
      402: function (response) {
        throttledApiRedirect();
      },
    },
  });
};

$(document).ready(() => {
  localStorage.removeItem('foodId');
  // Menu animations
  $('.nav-container').click(function () {
    $('.nav').addClass('nav-open');
  });
  $('.close').click(function () {
    $('.nav').removeClass('nav-open');
  });

  $('#clear-recipe').click(() => {
    $('.recipe-form-input').val('');
  });

  // get & display random fact/recipe on page load
  getRandomFact();
  getRandomRecipe();
  getTrendingRecipes();
  // On search, build thumbnails

  $('.search-container').on('submit', (e) => {
    e.preventDefault();
    let searchTerm = $('.search-bar').val();
    if (searchTerm == '') {
      $('.search-bar').addClass('error');
      $('.error-message').css('display', 'block').css('height', '100%');
    } else {
      // put lines 24 - 29 in function and call here
      $('.full-recipe-container').remove();
      $('.search-bar').removeClass('error');
      $('.recipe-card-list').css('display', 'flex');
      $('.error-message').css('display', 'none');
      $('#spinner').show();
      $('#showing-results-heading')
        .show()
        .text(`Showing results for '${searchTerm}':`);
      $.ajax({
        url: `https://api.spoonacular.com/recipes/search`,
        type: 'GET',
        data: {
          query: searchTerm,
          number: 15,
          apiKey: RECIPE_API,
        },
        success: (response) => {
          if (response.totalResults > 0) {
            buildThumbnail(response);
          } else {
            $('#showing-results-heading')
              .show()
              .text(`Sorry, no results for '${searchTerm}'!`);
            $('.recipe-card-list').css('display', 'none');
          }
        },

        error: function (xhr, status) {
          if (typeof this.statusCode[xhr.status] != 'undefined') {
            return false;
          }
          console.log(status);
        },
        statusCode: {
          402: function (response) {
            throttledApiRedirect();
          },
        },
      });
    }
  });
});

function toggleLikeBtn(id) {
  if ($(`#heart-fill-${id}`).hasClass('saved')) {
    $(`#heart-outline-${id}`).toggle();
    $(`#heart-fill-${id}`).toggle();
    $(`#heart-fill-${id}`).removeClass('saved');

    if (localStorage.getItem(id) !== null) {
      localStorage.removeItem(id);
      console.log('removed', localStorage);
    }
  } else {
    $(`#heart-fill-${id}`).toggle();
    $(`#heart-outline-${id}`).toggle();
    $(`#heart-fill-${id}`).addClass('saved');
    localStorage.setItem(id, id);
  }
  console.log(localStorage);
}

// Back Button
function backBtn() {
  $('.recipe-card-list').css('display', 'flex');
  $('.full-recipe-container').remove();
}

function getRandomRecipe() {
  $('.btn-random-recipe').click(() => {
    $.ajax({
      url: `https://api.spoonacular.com/recipes/random`,
      type: 'GET',
      data: {
        number: 1,
        apiKey: RECIPE_API,
      },
      dataType: 'json',
      success: (response) => {
        showIngredients(response.recipes[0].id);
      },
      error: function (xhr, status) {
        if (typeof this.statusCode[xhr.status] != 'undefined') {
          return false;
        }
        console.log(status);
      },
      statusCode: {
        402: function (response) {
          throttledApiRedirect();
        },
      },
    });
    $('#spinner').hide();
    $('#showing-results-heading').hide();
    $('#search-bar').val('');
  });
}

function getRandomFact() {
  $.ajax({
    url: `https://api.spoonacular.com/food/trivia/random`,
    type: 'GET',
    data: {
      apiKey: RECIPE_API,
    },
    dataType: 'json',
    success: (response) => {
      $('.fact').prepend(response.text);
    },
    error: function (xhr, status) {
      if (typeof this.statusCode[xhr.status] != 'undefined') {
        return false;
      }
      console.log(status);
    },
    statusCode: {
      402: function (response) {
        throttledApiRedirect();
      },
    },
  });
}

function getNutritionInfo(id) {
  $.ajax({
    url: `https://api.spoonacular.com/recipes/${id}/nutritionWidget.json`,
    type: 'GET',
    data: {
      apiKey: RECIPE_API,
    },
    dataType: 'json',
    success: (response) => {
      let fat = parseInt(response.fat.replace('g', ''));
      let protein = parseInt(response.protein.replace('g', ''));
      let carbs = parseInt(response.carbs.replace('g', ''));
      createChart(fat, protein, carbs);
    },
    error: function (xhr, status) {
      if (typeof this.statusCode[xhr.status] != 'undefined') {
        return false;
      }
      console.log(status);
    },
    statusCode: {
      402: function (response) {
        throttledApiRedirect();
      },
    },
  });
}

function getTrendingRecipes() {
  $.ajax({
    url: `https://api.spoonacular.com/recipes/random?`,
    type: 'GET',
    data: {
      number: 3,
      apiKey: RECIPE_API,
    },
    dataType: 'json',
    success: (res) => {
      console.log(res);
      let recipes = res.recipes;
      recipes.map((recipe, i) => {
        // Remove HTML elements from API summary
        let summary = recipe.summary.replace(/<[^>]*>?/gm, '');
        let background = $(`.recipe-${i + 1}`);
        background.css('background-image', `url('${recipe.image}')`);
        let link = $(`.trending-link-${i + 1}`);
        link.text(recipe.title);
        link.attr('id', recipe.id);
        $(`.trending-summary-${i + 1}`).append(`<p class='sum'>${summary}</p>`);
        $(`.trending-summary-${i + 1}`)
          .append(`<i class="far fa-heart heart-btn heart-btn-outline" id="heart-outline-${recipe.id}" style="display: block;" onclick="toggleLikeBtn(${recipe.id})"></i>
        <i class="fas fa-heart heart-btn heart-btn-fill" style="display: none;" id="heart-fill-${recipe.id}" onclick="toggleLikeBtn(${recipe.id})"></i>`);
        link.click(() => {
          showIngredients(recipe.id);
        });
      });
    },
    error: function (xhr, status) {
      if (typeof this.statusCode[xhr.status] != 'undefined') {
        return false;
      }
      console.log(status);
    },
    statusCode: {
      402: function (response) {
        throttledApiRedirect();
      },
    },
  });
}

function throttledApiRedirect() {
  location.replace('/full_stack_cert/03_interactive_frontend_development/milestone_2/throttled.html');
}

// Add google charts
function createChart(fat, protein, carbs) {
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
      pieSliceText: 'value',
      pieSliceTextStyle: {
        color: '#fff',
        fontName: 'Montserrat',
        fontSize: 18,
      },
    };

    var chart = new google.visualization.PieChart(
      document.getElementById('donutchart')
    );
    chart.draw(data, options);
  }
}
