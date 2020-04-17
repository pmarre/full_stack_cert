('use strict');

$(document).ready(() => {
  console.log(savedRecipeIds);
  let foodId;
  $('.recipe-card-list').prepend(
    `<div class="recipe-inner-container" id="saved-container"></div>`
  );
  if (savedRecipeIds.length > 0) {
    foodId = savedRecipeIds.map((id) => {
      $.when(
        $.getJSON(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${RECIPE_API}`
        )
      ).then((response) => {
        console.log(response);

        // buildThumbnail(response);
        let thumbnailElement = `
        <div class="recipe-card">
            <div class="img" style="background-image: url('${response.image}')">
                <div class="save-btn-container">
                    <i class="far fa-heart heart-btn heart-btn-outline" id="heart-outline-${response.id}" style="display: block;" onclick="toggleLikeBtn(${response.id})"></i>
                    <i class="fas fa-heart heart-btn heart-btn-fill" style="display: none;" id="heart-fill-${response.id}" onclick="toggleLikeBtn(${response.id})"></i>
                </div>
            </div>
            <div class="recipe-details">
                <h3 class="recipe-card-heading">${response.title}</h3>
                <span class="recipe-card-cook-time">Cook time: ${response.readyInMinutes} minutes</span>
                <div class="btn-container">
                    <a class="btn recipe-card-view-recipe" href="#saved-recipes-container" onclick="showIngredients(${response.id})">See recipe</a>
                </div>
            </div>
        </div>`;

        $('#saved-container').prepend(thumbnailElement);
        if (savedRecipeIds.indexOf(response.id) !== -1) {
          $(`#heart-fill-${response.id}`).toggle();
          $(`#heart-outline-${response.id}`).toggle();
          $(`#heart-fill-${response.id}`).addClass('saved');
        }

        if ($('.recipe-inner-container').length > 1) {
          $('.recipe-inner-container').next().remove();
        }
      });
    });
  } else {
    $('#saved-heading').text("You don't have any saved recipes!");
  }
});
