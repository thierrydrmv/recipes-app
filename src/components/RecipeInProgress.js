import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Copy from 'clipboard-copy';
import RecipiesContext from '../context/RecipiesContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

export default function RecipeInProgress() {
  const history = useHistory();
  const url = history.location.pathname.split('/');
  const [linkCopiado, setLinkCopiado] = useState(false);
  const [favoriteIcon, setFavoriteIcon] = useState(false);
  const [ingredientsSize, setIngredientsSize] = useState();
  // ['','meals','503014','in-progress'];
  const { renderOneFood, setRenderOneFood,
    checkBox, setCheckBox } = useContext(RecipiesContext);

  useEffect(() => {
    const urlId = history.location.pathname.split('/')[2];
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (favorite?.map(({ id }) => id).includes(urlId)) {
      setFavoriteIcon(true);
    }
    if (!favorite) {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([]),
      );
    }
  });
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
      setIngredientsSize(recipe.ingredientsAndMeasureList.ingredient.length);
    };
    if (url[1] === 'meals') {
      fetchApiMeal();
    } else {
      fetchApiCocktail();
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
    history.push('/done-recipes');
  };
  if (renderOneFood.length === 0) {
    return;
  }
  const { ingredientsAndMeasureList, strMeal,
    strMealThumb, strInstructions, strDrink,
    strDrinkThumb, strAlcoholic } = renderOneFood;
  const { ingredient } = ingredientsAndMeasureList;
  const handleFavorites = () => {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (url[1] === 'meals') {
      const { idMeal: id,
        strCategory: category,
        strMeal: name, strMealThumb: image, strArea: nationality } = renderOneFood;
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([...favorite, { id,
          type: 'meal',
          nationality,
          category,
          alcoholicOrNot: '',
          name,
          image }]),
      );
    } else {
      const { idDrink: id,
        strCategory: category,
        strAlcoholic: alcoholicOrNot,
        strDrink: name, strDrinkThumb: image } = renderOneFood;
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([...favorite, {
          id, type: 'drink', category, alcoholicOrNot, name, nationality: '', image }]),
      );
    }
    setFavoriteIcon(!favoriteIcon);
    const urlId = history.location.pathname.split('/')[2];
    if (favorite?.map(({ id }) => id).includes(urlId)) {
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify(favorite?.filter(({ id }) => id !== urlId)),
      );
    }
  };
  const handleShare = () => {
    setLinkCopiado(true);
    Copy(`http://localhost:3000/${url[1]}/${url[2]}`);
  };
  return (
    <section>
      {url[1] === 'meals' ? (
        <div>
          <div className="text-center">
            <button
              className="icons"
              type="button"
              data-testid="share-btn"
              onClick={ handleShare }
            >
              <img src={ shareIcon } alt="" />
            </button>
            {linkCopiado && <h3>Link copied!</h3>}
            <button
              className="icons"
              type="button"
              data-testid="favorite-btn"
              onClick={ handleFavorites }
              src={ favoriteIcon ? blackHeartIcon : whiteHeartIcon }
            >
              <img src={ favoriteIcon ? blackHeartIcon : whiteHeartIcon } alt="" />
            </button>
            <h3 data-testid="recipe-title">{strMeal}</h3>
          </div>
          <img
            data-testid="recipe-photo"
            src={ strMealThumb }
            alt={ strMealThumb }
            width="360"
          />
          {ingredient?.map((element, index) => (
            <label
              key={ element }
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
          <button
            type="button"
            data-testid="share-btn"
            onClick={ handleShare }
          >
            <img src={ shareIcon } alt="" />
          </button>
          {linkCopiado && <h3>Link copied!</h3>}
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ handleFavorites }
            src={ favoriteIcon ? blackHeartIcon : whiteHeartIcon }
          >
            <img src={ favoriteIcon ? blackHeartIcon : whiteHeartIcon } alt="" />
          </button>
          <h4 data-testid="recipe-category">{strCategory}</h4>
          <p data-testid="instructions">{strInstructions}</p>
          <Button
            disabled={ !checkBox.every((check) => check === true) }
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ handleClick }
            className="fixed-bottom"
            variant="success"
          >
            Finish Recipe
          </Button>
        </div>
      ) : (
        <div>
          <h3 data-testid="recipe-title">{strDrink}</h3>
          <img
            data-testid="recipe-photo"
            src={ strDrinkThumb }
            alt={ strDrinkThumb }
          />
          {ingredient?.map((element, index) => (
            <div className="text-dark" key={ element }>
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
          <button type="button" data-testid="share-btn" onClick={ handleShare }>
            <img src={ shareIcon } alt="" />
          </button>
          {linkCopiado && <h3>Link copied!</h3>}
          <button
            type="button"
            data-testid="favorite-btn"
            onClick={ handleFavorites }
            src={ favoriteIcon ? blackHeartIcon : whiteHeartIcon }
          >
            <img src={ favoriteIcon ? blackHeartIcon : whiteHeartIcon } alt="" />
          </button>
          <h4 data-testid="recipe-category">{strAlcoholic}</h4>
          <p data-testid="instructions">{strInstructions}</p>
          <button
            className="fixed-bottom"
            variant="success"
            disabled={ !checkBox.every((check) => check === true) }
            type="button"
            data-testid="finish-recipe-btn"
            onClick={ handleClick }
          >
            Finish Recipe
          </button>
        </div>
      )}
    </section>
  );
}
