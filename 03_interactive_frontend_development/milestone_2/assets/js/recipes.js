const RECIPE_API = config.RECIPE_API_KEY;

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
    fetch(
      `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/search?diet=v&excludeIngredients=c&query=burger`,
      {
        method: 'GET',
        headers: {
          'x-rapidapi-host':
            'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
          'x-rapidapi-key': '8da306016emsh97b0f10686069dap133e09jsn9f796067d7ae'
        }
      }
    )
      .then(response => {
        console.log(response);
      })
      .catch(err => {
        console.log(err);
      });
  });
});

fetch(
  'https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/quickAnswer?q=How%20much%20vitamin%20c%20is%20in%202%20apples%253F',
  {
    method: 'GET',
    headers: {
      'x-rapidapi-host': 'spoonacular-recipe-food-nutrition-v1.p.rapidapi.com',
      'x-rapidapi-key': '8da306016emsh97b0f10686069dap133e09jsn9f796067d7ae'
    }
  }
)
  .then(response => {
    console.log(response);
  })
  .catch(err => {
    console.log(err);
  });
