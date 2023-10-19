const searchbtn = document.querySelector('.seachbtn');
const searchbox = document.querySelector('.searchBox');
const recipe_container = document.querySelector('.recipe-container');
const recipeDetialsContent = document.querySelector('.recipe-details-content');
const Recipe_closeBtn = document.querySelector('.recipe-closeBtn');

// function for fetching the recipe from the api
const fetchRecipes = async (query)=>{
    recipe_container.innerHTML = "<h2>Fetching Recipes ....</h2>";
try{
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}
    `);
    const response = await data.json();

    recipe_container.innerHTML = "";
    // giving the search result when we find it!!
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p><span>${meal.strArea}</span> Dish</p>
        <p>Belong to <span>${meal.strCategory}</span> Category</p>
        `
        const button = document.createElement('button');
        button.textContent = "View Recipes";
        recipeDiv.appendChild(button);

        // adding event listener in our button
        button.addEventListener('click', ()=>{
            openRecipePopup(meal);
        });
        recipe_container.appendChild(recipeDiv);
    });
    // throwing error when user provide wrong input
}catch(error){
    recipe_container.innerHTML = "<h2>Error in Fetching Recipes ....</h2>";

    }
  
    

    // console.log(response);
}
// function to fetch Ingredient and measurement
const fetchIngredients = (meal) =>{
    let ingredentsList = "";
    for(let i=1; i<=20; i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient ){
            const measure = meal[`strMeasure${i}`];
            ingredentsList += `<li>${measure} ${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredentsList;

}
// function to open the recipe popup
const openRecipePopup = (meal)=>{
    recipeDetialsContent.innerHTML =`
    <h2 class="recipeName">${meal.strMeal}</h2>
    <h3>Ingredent:</h3>
    <ul class="IngredientList">${fetchIngredients(meal)}</ul>
    <div class="recipe-instructions">
        <h3>Instruction:</h3>
        <p>${meal.strInstructions}</p>
    </div>
    `
    
    recipeDetialsContent.parentElement.style.display = "block";

}

// for closing the popup window
Recipe_closeBtn.addEventListener('click',()=>{
    recipeDetialsContent.parentElement.style.display = "none";
});

// to search anything in search box
searchbtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchinput = searchbox.value.trim();
    if(!searchinput){
        recipe_container.innerHTML = `<h2>Type the meal in the search box...</h2>`;
        return;
    }
    fetchRecipes(searchinput);
    // console.log('button click');
});