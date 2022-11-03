import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Copy from 'clipboard-copy';
// import RecipiesContext from '../context/RecipiesContext';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeInProgress() {
  const [oneFoodInProgress, setOneFoodInProgress] = useState([]);
  const [linkCopiado, setLinkCopiado] = useState(false);
  const [favoriteIcon, setFavoriteIcon] = useState(false);
  const history = useHistory();
  const route = history.location.pathname.split('/')[1];
  const nove = 9;
  const vinteENove = 29;
  const quarentaENove = 49;
  const vinteEUm = 21;
  const trintaECinco = 35;
  const trintaESeis = 36;
  const cinquentaEUm = 51;
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
  useEffect(() => {
    const id = history.location.pathname.split('/')[2];
    const fetchApiMeal = async () => {
      const endPoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(endPoint);
      const data = await response.json();
      const result = [...data.meals];
      result[0].type = 'meals';
      result[0].ingredientAndMeasureList = [{
        ingredient: Object.values(result[0]).slice(nove, vinteENove),
        measure: Object.values(result[0]).slice(vinteENove, quarentaENove),
      }];
      setOneFoodInProgress(result);
    };
    const fetchApiCocktail = async () => {
      const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(endPoint);
      const data = await response.json();
      const result = [...data.drinks];
      result[0].type = 'drinks';
      result[0].ingredientAndMeasureList = [{
        ingredient: Object.values(result[0]).slice(vinteEUm, trintaECinco),
        measure: Object.values(result[0]).slice(trintaESeis, cinquentaEUm),
      }];
      setOneFoodInProgress(result);
    };
    if (route === 'meals') {
      fetchApiMeal();
    } else {
      fetchApiCocktail();
    }
  }, []);
  const handleShare = () => {
    const id = history.location.pathname.split('/')[2];
    setLinkCopiado(true);
    Copy(`http://localhost:3000/${route}/${id}`);
  };

  const handleFavorites = () => {
    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    if (route === 'meals') {
      const { idMeal: id,
        strCategory: category,
        strMeal: name, strMealThumb: image, strArea: nationality } = oneFoodInProgress[0];
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([...favorite, {
          id,
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
        strDrink: name, strDrinkThumb: image } = oneFoodInProgress[0];
      localStorage.setItem(
        'favoriteRecipes',
        JSON.stringify([...favorite, {
          id,
          type: 'drink',
          category,
          alcoholicOrNot,
          name,
          nationality: '',
          image }]),
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
  const handleClickFinish = () => {
    history.push('/done-recipes');
  };
  return (
    <div>
      {route === 'meals' ? oneFoodInProgress?.map(({
        idMeal, strMealThumb, strMeal, strInstructions, strCategory, strYoutube,
        strTags, ingredientAndMeasureList,
      }) => (
        (
          <div key={ idMeal }>
            <h1 data-testid="recipe-title">{strMeal}</h1>
            <img
              data-testid="recipe-photo"
              src={ strMealThumb }
              name={ strTags }
              alt={ strMeal }
              width="150"
            />
            <p data-testid="recipe-category">{strCategory}</p>
            <button
              type="button"
              data-testid="share-btn"
              onClick={ handleShare }
            >
              <img src={ shareIcon } alt="" />
            </button>
            <button
              type="button"
              data-testid="favorite-btn"
              onClick={ handleFavorites }
              src={ favoriteIcon ? blackHeartIcon : whiteHeartIcon }
            >
              <img src={ favoriteIcon ? blackHeartIcon : whiteHeartIcon } alt="" />
            </button>
            {linkCopiado && <h3>Link copied!</h3>}
            {ingredientAndMeasureList.map(
              ({ ingredient, measure }) => ingredient.map((i, index) => (
                <div key={ `${index}-${i}` }>
                  <p data-testid={ `${index}-ingredient-name-and-measure` }>
                    {i}
                  </p>
                  <p data-testid={ `${index}-ingredient-name-and-measure` }>
                    {measure[index]}
                  </p>
                </div>
              )),
            )}
            <p data-testid="instructions">{strInstructions}</p>
            <iframe
              data-testid="video"
              width="560"
              height="315"
              src={ `https://www.youtube.com/embed/_${strYoutube.split('_')}` }
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer;
              autoplay; clipboard-write;
              encrypted-media; gyroscope; p
              icture-in-picture"
              allowFullScreen
            />
            <button
              onClick={ handleClickFinish }
              data-testid="finish-recipe-btn"
              type="button"
            >
              Finish Recipe
            </button>
          </div>
        )
      )) : (
        oneFoodInProgress?.map(({
          idDrink, strDrinkThumb, strDrink, strInstructions, strAlcoholic,
          ingredientAndMeasureList,
        }) => (
          (
            <div key={ idDrink }>
              <h1 data-testid="recipe-title">{strDrink}</h1>
              <img
                data-testid="recipe-photo"
                src={ strDrinkThumb }
                alt={ strDrink }
                width="150"
              />
              <p data-testid="recipe-category">{strAlcoholic}</p>
              <button
                type="button"
                data-testid="share-btn"
                onClick={ handleShare }
              >
                <img src={ shareIcon } alt="" />
              </button>
              <button
                type="button"
                data-testid="favorite-btn"
                onClick={ handleFavorites }
                src={ favoriteIcon ? blackHeartIcon : whiteHeartIcon }
              >
                <img src={ favoriteIcon ? blackHeartIcon : whiteHeartIcon } alt="" />
              </button>
              {linkCopiado && <h3>Link copied!</h3>}
              {ingredientAndMeasureList.map(
                ({ ingredient, measure }) => ingredient.map((i, index) => (
                  <div key={ `${index}-${i}` }>
                    <p data-testid={ `${index}-ingredient-name-and-measure` }>{i}</p>
                    <p data-testid={ `${index}-ingredient-name-and-measure` }>
                      {measure[index]}
                    </p>
                  </div>
                )),
              )}
              <p data-testid="instructions">{strInstructions}</p>
              <button
                onClick={ handleClickFinish }
                data-testid="finish-recipe-btn"
                type="button"
              >
                Finish Recipe
              </button>
            </div>
          )
        ))
      )}
    </div>
  );
  // const [checkboxStatus, setCheckbox] = useState(
  //   Array(ingredientAndMeasureList[0].ingredient.length).fill(false),
  // );
  // const handleCheckBox = (index) => {const status = [...checkboxStatus];status[index] = !status[index];
  //   saveLocalStorage(status);
  //   setCheckbox(status);
  // };
}
export default RecipeInProgress;
