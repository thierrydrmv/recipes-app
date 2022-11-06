import Copy from 'clipboard-copy';
import { useHistory } from 'react-router-dom';
import { useContext, useState, useEffect } from 'react';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import RecipiesContext from '../context/RecipiesContext';

function ShareAndFavoriteButtons() {
  const history = useHistory();
  const url = history.location.pathname.split('/');
  const [linkCopiado, setLinkCopiado] = useState(false);
  const [favoriteIcon, setFavoriteIcon] = useState(false);
  const { renderOneFood } = useContext(RecipiesContext);

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
    <div>
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
    </div>
  );
}

export default ShareAndFavoriteButtons;
