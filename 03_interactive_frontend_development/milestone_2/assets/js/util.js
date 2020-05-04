// API is throttled at 100 requests/day
// const RECIPE_API = '822ac61ec94b4490b4e562e53eccb278';
const RECIPE_API = 'fe4d98c4906948e2b62c8cde455bc054';
const backupImage = './assets/images/backup-img.png';

// Build thumbnails
function buildThumbnail(response) {
  let recipes = response.results;
  let img;
  // let thumbnailElement;
  $('.recipe-card-list').prepend(`<div class="recipe-inner-container"></div>`);
  $('#spinner').hide();

  // Check if no images
  // Set backup image if no image
  recipes.map((recipe) => {
    // check if recipe obj has key 'imageUrls'
    if ('imageUrls' in recipe) {
      if (recipe.imageUrls.length === 0) {
        img = backupImage;
      }
    } else {
      if (recipe['image'] == undefined) {
        img = backupImage;
      } else {
        img = response.baseUri + recipe.image;
      }
    }

    $('.recipe-inner-container').prepend(
      buildRecipeCard(img, recipe.id, recipe.title)
    );
    if (localStorage.getItem(recipe.id) !== null) {
      $(`#heart-fill-${recipe.id}`).toggle();
      $(`#heart-outline-${recipe.id}`).toggle();
      $(`#heart-fill-${recipe.id}`).addClass('saved');
      localStorage.setItem(recipe.id, recipe.id);
    }

    if ($('.recipe-inner-container').length > 1) {
      $('.recipe-inner-container').next().remove();
    }
  });
}

function showIngredients(foodId) {
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
      // Check if no images
      // Set backup image if no images
      if (!response.image) {
        img = backupImage;
      } else {
        img = response.image;
      }
      $('.loading-container ').hide();

      // Is there a better way to do this? .full-recipes moved to bottom of div when recipe was added
      $('.top-recipes-container').prepend(
        $('.full-recipes').prepend(
          buildFullRecipeCard(
            foodId,
            img,
            response.title,
            response.servings,
            response.readyInMinutes,
            response.summary
          )
        )
      );
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
    },
    statusCode: {
      402: function (response) {
        throttledApiRedirect();
      },
    },
  });
}

// Build Recipe Thumbnail
function buildRecipeCard(img, id, title) {
  return `
      <div class="recipe-card">
        <div class="img" style="background-image: url('${img}')">
          <div class="save-btn-container">
            <i class="far fa-heart heart-btn heart-btn-outline" id="heart-outline-${id}" style="display: block;" onclick="toggleLikeBtn(${id})"></i>
            <i class="fas fa-heart heart-btn heart-btn-fill" style="display: none;" id="heart-fill-${id}" onclick="toggleLikeBtn(${id})"></i>
          </div>
        </div>
        <div class="recipe-details">
            <a class="recipe-card-view-recipe" href="#top-recipes" onclick="showIngredients(${id})">${title}</a>
        </div>
      </div>`;
}

// Build full view of recipe
function buildFullRecipeCard(id, img, title, servings, minutes, summary) {
  return `
    <div class="full-recipe-container">
      <div id="${id}" class="banner-img" style="background-image: url('${img}')"></div>
      <div class="full-recipe-header">
        <button class="btn back-btn" onclick="backBtn()">Back</button>
        <div class="full-recipe-title">
          <h2 class="full-recipe-heading">${title}</h2>
          <div class="prep-icon-container">
            <div class="prep-icon">
              <i class="fas fa-utensils"></i>
              <span>Serves ${servings}</span>
            </div>
            <div class="prep-icon">
              <i class="far fa-clock"></i>
              <span>${minutes} minutes</span>
            </div>
          </div>
        </div>
        <h4 class="summary-heading">Summary</h4>
        <p class="recipe-summary">${summary}</p>
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
}

function toggleLikeBtn(id) {
  if ($(`#heart-fill-${id}`).hasClass('saved')) {
    $(`#heart-outline-${id}`).toggle();
    $(`#heart-fill-${id}`).toggle();
    $(`#heart-fill-${id}`).removeClass('saved');

    if (localStorage.getItem(id) !== null) {
      localStorage.removeItem(id);
    }
  } else {
    $(`#heart-fill-${id}`).toggle();
    $(`#heart-outline-${id}`).toggle();
    $(`#heart-fill-${id}`).addClass('saved');
    localStorage.setItem(id, id);
  }
}

// Back Button on full recipe
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
    },
    statusCode: {
      402: function (response) {
        throttledApiRedirect();
      },
    },
  });
}

// Redirect user to new page when 402 error occurs
function throttledApiRedirect() {
  location.replace(
    'full_stack_cert/03_interactive_frontend_development/milestone_2/throttled.html'
  );
}

// Build Google chart with recipe nutrition information
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

function checkFormSubmission(e) {
  e.preventDefault();
  let errors = 0;
  for (var i = 0; i < $('.recipe-form-input').length; i++) {
    if ($($('.recipe-form-input')[i]).val() == '') {
      errors += 1;
    }
  }
  if (errors < 1) {
    $('.form-success').addClass('form-response');
    $('.form-error').removeClass('form-response');
    $('.recipe-form-input').val('');
  } else {
    $('.form-error').addClass('form-response');
    $('.form-success').removeClass('form-response');
  }
}
