import { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Copy from 'clipboard-copy';
import RecipiesContext from '../context/RecipiesContext';
import OneDrinkCard from './OneDrinkCard';
import OneFoodCard from './OneFoodCard';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/recipeDetail.css';

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
    Copy(`http://localhost:3000${history.location.pathname}`);
  };

  return (
    <div className="recipeDetails-container">
      <div className="icons-container">
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
      </div>

      { history.location.pathname.split('/')[1] === 'meals'
        ? <OneFoodCard /> : <OneDrinkCard />}

      {inProgress ? (
        <Button
          className="fixed-bottom"
          type="button"
          data-testid="start-recipe-btn"
          onClick={ handleButton }
        >
          Start Recipe
        </Button>)
        : (
          <Button
            className="fixed-bottom"
            variant="success"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ handleButton }
          >
            Continue Recipe
          </Button>
        )}

    </div>
  );
}
export default RecipeDetails;
