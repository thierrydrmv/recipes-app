import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipiesContext from '../context/RecipiesContext';
import ShareAndFavoriteButtons from './ShareAndFavoriteButton';

export default function RecipeInProgress() {
  const history = useHistory();
  const url = history.location.pathname.split('/');
  const [ingredientsSize, setIngredientsSize] = useState();
  const [ingredientsList, setIngredientsList] = useState([]);
  const { renderOneFood, setRenderOneFood,
    checkBox, setCheckBox } = useContext(RecipiesContext);
  const nove = 9;
  const vinteENove = 29;
  const vinteEUm = 21;
  const trintaECinco = 35;

  useEffect(() => {
    const fetchApiMeal = async () => {
      const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${url[2]}`;
      const response = await fetch(endPoint);
      const data = await response.json();
      const recipe = data[url[1]][0];
      recipe.ingredientsAndMeasureList = {
        ingredient: Object.values(recipe).slice(nove, vinteENove)
          .filter((value) => value !== null && value !== '') };
      setRenderOneFood(recipe);
      setIngredientsList(recipe.ingredientsAndMeasureList.ingredient);
      setIngredientsSize(recipe.ingredientsAndMeasureList.ingredient.length);
    };
    const fetchApiCocktail = async () => {
      const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${url[2]}`;
      const response = await fetch(endPoint);
      const data = await response.json();
      const recipe = data[url[1]][0];
      recipe.ingredientsAndMeasureList = {
        ingredient: Object.values(recipe).slice(vinteEUm, trintaECinco)
          .filter((value) => value !== null && value !== '') };
      setRenderOneFood(recipe);
      setIngredientsList(recipe.ingredientsAndMeasureList.ingredient);
      setIngredientsSize(recipe.ingredientsAndMeasureList.ingredient.length);
    };
    if (url[1] === 'meals') {
      fetchApiMeal();
    } else {
      fetchApiCocktail();
    }
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    if (!doneRecipes) {
      localStorage.setItem(
        'doneRecipes',
        JSON.stringify([]),
      );
    }
  }, []);

  useEffect(() => {
    const prev = localStorage.getItem('inProgressRecipes');
    const previous = prev ? JSON.parse(prev)[url[1]][url[2]] : '';
    setCheckBox(previous || Array(ingredientsSize).fill(false));
  }, [ingredientsSize]);

  const saveLocalStorage = (status) => {
    const prev = JSON.parse(localStorage.getItem('inProgressRecipes'))
    || { [url[1]]: { [url[2]]: [...status] } };
    prev[url[1]][url[2]] = [...status];
    if (url[1] === 'meals') {
      prev.drinks = {};
    } else {
      prev.meals = {};
    }
    localStorage.setItem('inProgressRecipes', JSON.stringify(prev));
  };
  const handleCheckBox = (index) => {
    const status = [...checkBox];
    status[index] = !status[index];
    setCheckBox(status);
    saveLocalStorage(status);
  };
  const handleClick = () => {
    const timeElapsed = Date.now();
    const today = new Date(timeElapsed);
    const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
    history.push('/done-recipes');
    if (url[1] === 'meals') {
      const { idMeal: id,
        strCategory: category,
        strMeal: name, strMealThumb: image,
        strArea: nationality, strTags } = renderOneFood;
      const tags = strTags.split(',');
      localStorage.setItem(
        'doneRecipes',
        JSON.stringify([...doneRecipes, { id,
          type: 'meal',
          nationality,
          category,
          alcoholicOrNot: '',
          name,
          image,
          doneDate: today.toISOString(),
          tags }]),
      );
    } else {
      const { idDrink: id,
        strCategory: category,
        strAlcoholic: alcoholicOrNot,
        strDrink: name, strDrinkThumb: image,
      } = renderOneFood;
      localStorage.setItem(
        'doneRecipes',
        JSON.stringify([...doneRecipes, {
          id,
          type: 'drink',
          category,
          alcoholicOrNot,
          name,
          nationality: '',
          image,
          doneDate: today.toISOString(),
          tags: [] }]),
      );
    }
  };

  return (
    <section>
      {
        url[1] === 'meals' ? (
          [renderOneFood]?.map(({ strMeal,
            strMealThumb, strInstructions, strCategory }, i) => (
            (
              <div key={ `${strMeal}${i}` }>
                <ShareAndFavoriteButtons />
                <h3 data-testid="recipe-title">{strMeal}</h3>
                <img
                  data-testid="recipe-photo"
                  src={ strMealThumb }
                  alt={ strMealThumb }
                />
                {ingredientsList.map((element, index) => (
                  <label
                    key={ `${element}-${index}` }
                    htmlFor="ingredients"
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input
                      onChange={ () => handleCheckBox(index) }
                      className="ingredient-checkbox"
                      checked={ checkBox[index] }
                      type="checkbox"
                    />
                    <p>{element}</p>
                  </label>
                ))}
                <h4 data-testid="recipe-category">{strCategory}</h4>
                <p data-testid="instructions">{strInstructions}</p>
                <button
                  disabled={ !checkBox.every((check) => check === true) }
                  type="button"
                  data-testid="finish-recipe-btn"
                  onClick={ handleClick }
                >
                  Finish Recipe
                </button>
              </div>
            )))
        ) : (
          [renderOneFood]?.map(({ strInstructions, strDrink,
            strDrinkThumb, strAlcoholic }) => (
            (
              <div key={ strDrink }>
                <ShareAndFavoriteButtons />
                <h3 data-testid="recipe-title">{strDrink}</h3>
                <img
                  data-testid="recipe-photo"
                  src={ strDrinkThumb }
                  alt={ strDrinkThumb }
                />
                {ingredientsList?.map((element, index) => (
                  <div className="text-dark" key={ `${element}-${index}` }>
                    <label
                      htmlFor="ingredient"
                      data-testid={ `${index}-ingredient-step` }
                    >
                      <input
                        onChange={ () => handleCheckBox(index) }
                        checked={ checkBox[index] }
                        type="checkbox"
                      />
                      <p>{element}</p>
                    </label>
                  </div>
                ))}
                <h4 data-testid="recipe-category">{strAlcoholic}</h4>
                <p data-testid="instructions">{strInstructions}</p>
                <button
                  disabled={ !checkBox.every((check) => check === true) }
                  type="button"
                  data-testid="finish-recipe-btn"
                  onClick={ handleClick }
                >
                  Finish Recipe
                </button>
              </div>)
          )))
      }
    </section>
  );
}
