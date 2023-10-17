const searchbtn = document.querySelector('.seachbtn');
const searchbox = document.querySelector('.searchBox');
const recipe_container = document.querySelector('.recipe-container');

const fetchRecipes = async (query)=>{
    recipe_container.innerHTML = "<h2>Fetching Recipes ....</h2>";
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}
    `);
    const response = await data.json();

    recipe_container.innerHTML = "";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea}</p>
        <p>${meal.strCategory}</p>
        `
        recipe_container.appendChild(recipeDiv);
    });
    

    // console.log(response);
}

searchbtn.addEventListener('click', (e)=>{
    e.preventDefault();
    const searchinput = searchbox.value.trim();
    fetchRecipes(searchinput);
    // console.log('button click');
});