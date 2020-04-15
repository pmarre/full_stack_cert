('use strict');

$(document).ready(() => {
  console.log(savedRecipeIds);
  let foodId;
  if (savedRecipeIds.length > 0) {
    foodId = savedRecipeIds.map((id) => {
      $.when(
        $.getJSON(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${RECIPE_API}`
        )
      ).then((response) => {
        console.log(response);
        $('#saved-container').prepend(
          `<h3 id="${response.id} onclick="showIngredients(${response.id})")">${response.title}</h3><button class="btn" onclick="showIngredients(${response.id})">Test button</button>`
        );
      });
    });
  } else {
    $('#saved-heading').text("You don't have any saved recipes!");
  }
});
