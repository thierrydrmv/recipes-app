import Copy from 'clipboard-copy';
import { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import profileIcon from '../images/profileIcon.svg';

function DoneRecipes() {
  const [copiado, setcopiado] = useState(false);
  const [filtro, setFiltro] = useState('All');
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const Compartilhar = (tipo, id) => {
    const url = `${window.location.origin}/${tipo}s/${id}`;
    Copy(url);
    setcopiado(true);
  };
  console.log(filtro);

  return (
    <div>
      <h1 data-testid="page-title">
        Done Recipes
      </h1>
      <img data-testid="profile-top-btn" src={ profileIcon } alt="" />
      <button
        data-testid="filter-by-all-btn"
        type="button"
        onClick={ () => setFiltro('All') }
      >
        All
      </button>
      <button
        data-testid="filter-by-meal-btn"
        type="button"
        onClick={ () => setFiltro('meal') }
      >
        Meals
      </button>
      <button
        data-testid="filter-by-drink-btn"
        type="button"
        onClick={ () => setFiltro('drink') }
      >
        Drinks
      </button>
      {doneRecipes.filter(
        (recipes) => (recipes.type === filtro || filtro === 'All'),
      ).map((recipe, index) => (
        <div key={ index }>
          <a href={ `/${recipe.type}s/${recipe.id}` }>
            <img
              src={ recipe.image }
              className="recipe-image"
              data-testid={ `${index}-horizontal-image` }
              alt={ recipe.name }
              width="250px"
            />
          </a>
          <p data-testid={ `${index}-horizontal-top-text` }>
            Nacionalidade/Categoria/alcoolico ou não:
            { `${recipe.nationality} - ${recipe.category}`}
            {recipe.alcoholicOrNot}
          </p>
          <a href={ `/${recipe.type}s/${recipe.id}` }>
            <p
              data-testid={ `${index}-horizontal-name` }
            >
              Nome :
              { recipe.name }

            </p>
          </a>
          <p data-testid={ `${index}-horizontal-done-date` }>
            Data :
            {recipe.doneDate}
          </p>
          Tags:
          {recipe.tags.map((tagName, idx) => (
            <p
              key={ idx }
              data-testid={ `${index}-${tagName}-horizontal-tag` }
            >
              {tagName}
            </p>
          ))}
          <button
            type="button"
            onClick={ () => {
              Compartilhar(recipe.type, recipe.id);
            } }
          >
            <img
              src={ shareIcon }
              alt=""
              data-testid={ `${index}-horizontal-share-btn` }
            />
          </button>
          <p hidden={ !copiado }>Link copied!</p>
        </div>
      ))}
    </div>
  );
}

export default DoneRecipes;
