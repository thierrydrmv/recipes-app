import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import copy from 'clipboard-copy';
import profileIcon from '../images/profileIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/favoriteRecipes.css';

function FavoriteRecipes() {
  const [favoriteToShow, setFavoriteToShow] = useState([]);
  const [updateLocalStorage, setUpdateLocalStorage] = useState(false);
  const [id, setId] = useState('');

  useEffect(() => {
    const recipiesFromLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteToShow(recipiesFromLocalStorage);
  }, [updateLocalStorage]);

  const showAllFav = () => {
    const recipiesFromLocalStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteToShow(recipiesFromLocalStorage);
  };

  const filterFavMeals = () => {
    const recipiesFromLs = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const filtredArray = recipiesFromLs.filter((element) => element.type === 'meal');
    setFavoriteToShow(filtredArray);
  };

  const filterFavDrinks = () => {
    const recipiesFromLs = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteToShow(recipiesFromLs.filter((element) => element.type === 'drink'));
  };

  const removeFavorite = ({ target }) => {
    const recipiesFromLs = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const idToBeRemoved = target.attributes.id.value;
    const filtredArray = recipiesFromLs.filter((element) => element.id !== idToBeRemoved);
    localStorage.clear();
    localStorage.setItem('favoriteRecipes', JSON.stringify(filtredArray));
    setUpdateLocalStorage(!updateLocalStorage);
  };

  const copyToClipboard = async ({ target }) => {
    const recipeUrl = `http://localhost:3000/${target.name}s/${target.id}`;
    copy(recipeUrl);
    setId(target.id);
  };
  const history = useHistory();

  const handleClick = (pathName) => {
    history.push(`/${pathName}`);
  };

  const handleClick = (pathName) => {
    history.push(`/${pathName}`);
  };
  return (
    <section className="favRecipes-container">
      <button
        type="button"
        onClick={ () => { handleClick('profile'); } }
        className="icons"
      >
        <img
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt=""
          className="profile-img"
        />
      </button>
      <div>
        <h1 data-testid="page-title">
          Favorite Recipes
        </h1>
      </div>
      <div className="butons-container">
        <Button
          variant="success"
          className="buttons"
          type="button"
          data-testid="filter-by-all-btn"
          onClick={ showAllFav }
        >
          All
        </Button>
        <Button
          variant="success"
          className="buttons"
          type="button"
          data-testid="filter-by-meal-btn"
          onClick={ filterFavMeals }
        >
          Meals
        </Button>
        <Button
          variant="success"
          className="buttons"
          type="button"
          data-testid="filter-by-drink-btn"
          onClick={ filterFavDrinks }
        >
          Drinks
        </Button>
      </div>
      <section className="card-container">
        { favoriteToShow?.map((element, index) => (
          <div key={ element.id } className="card-favorite">
            <Link to={ `/${element.type}s/${element.id}` }>
              <img
                className="img-thumbnail favRecipe-img"
                data-testid={ `${index}-horizontal-image` }
                src={ element.image }
                alt={ element.name }
              />
            </Link>
            <section className="card-favorite-text">
              <div className="nameToCategory">
                <Link to={ `/${element.type}s/${element.id}` }>
                  <h6 data-testid={ `${index}-horizontal-name` }>{element.name}</h6>
                </Link>
                <p
                  data-testid={ `${index}-horizontal-top-text` }
                >
                  {` ${element.nationality} -`}
                  {` ${element.category} -`}
                  {element.type === 'drink' && ` ${element.alcoholicOrNot}`}
                </p>
              </div>
              <div className="icons">
                <input
                  type="image"
                  src={ shareIcon }
                  width="50"
                  height="30"
                  alt="Share"
                  data-testid={ `${index}-horizontal-share-btn` }
                  name={ element.type }
                  id={ element.id }
                  onClick={ copyToClipboard }
                />
                {/* <button
                type="button"
                data-testid={`${index}-horizontal-share-btn`}
              >
                <img src={shareIcon} alt="" />
              </button> */}
                <input
                  type="image"
                  src={ blackHeartIcon }
                  width="50"
                  height="30"
                  alt="Remove Favorite"
                  data-testid={ `${index}-horizontal-favorite-btn` }
                  id={ element.id }
                  onClick={ removeFavorite }
                />
                { id === element.id && <p data-testid="link-copied">Link copied!</p>}
                {/* <button
                type="button"
                data-testid={`${index}-horizontal-favorite-btn`}
              >
                <img src={ blackHeartIcon } alt="" />
              </button> */}
              </div>
            </section>
          </div>
        ))}
      </section>
    </section>

  );
}

export default FavoriteRecipes;
