import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipiesContext from '../context/RecipiesContext';
import OneDrinkCard from './OneDrinkCard';
import OneFoodCard from './OneFoodCard';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';

function RecipeDetails() {
  const [inProgress, setInProgress] = useState(false);
  const [linkCopiado, setLinkCopiado] = useState(false);
  const [favoriteIcon, setFavoriteIcon] = useState(false);
  const history = useHistory();
  const {
    renderOneFood,
  } = useContext(RecipiesContext);

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
    localStorage.setItem('inProgressRecipes', JSON.stringify({
      drinks: {
        178319: '[lista - de - ingredientes - utilizados]',
      },
      meals: {
        52771: '[lista - de - ingredientes - utilizados]',
      } }));
  }, []);

  useEffect(() => {
    const id = history.location.pathname.split('/')[2];
    const route = history.location.pathname.split('/')[1];
    if (renderOneFood?.length) {
      const list = JSON.parse(localStorage.getItem('inProgressRecipes'));
      const inProgressNow = [...Object.entries(list[route])];
      if (inProgressNow[0].includes(id)) {
        setInProgress(true);
      }
    }
  }, [inProgress]);

  const handleButton = () => {
    history.push(`${history.location.pathname}/in-progress`);
  };

  const handleFavorites = () => {
    const route = history.location.pathname.split('/')[1];

    const favorite = JSON.parse(localStorage.getItem('favoriteRecipes'));
    console.log(renderOneFood[0].idMeal);
    if (route === 'meals') {
      const { idMeal: id,
        strCategory: category,
        strMeal: name, strMealThumb: image, strArea: nationality } = renderOneFood[0];
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
        strDrink: name, strDrinkThumb: image } = renderOneFood[0];

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

  const handleShare = () => {
    setLinkCopiado(true);
    navigator.clipboard.writeText(`http://localhost:3000${history.location.pathname}`);
  };

  return (
    <div>
      <h1>RECIPE SCREEN</h1>
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
      { history.location.pathname.split('/')[1] === 'meals'
        ? <OneFoodCard /> : <OneDrinkCard />}

      {inProgress ? (
        <button
          className="fixed-bottom"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ handleButton }
        >
          Start Recipe
        </button>)
        : (
          <button
            className="fixed-bottom"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ handleButton }
          >
            Continue Recipe
          </button>
        )}

    </div>
  );
}
export default RecipeDetails;
