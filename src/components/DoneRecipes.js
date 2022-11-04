import Copy from 'clipboard-copy';
import { useState } from 'react';
import shareIcon from '../images/shareIcon.svg';
import profileIcon from '../images/profileIcon.svg';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/doneRecipes.css';

function DoneRecipes() {
  const [copiado, setcopiado] = useState(false);
  const [filtro, setFiltro] = useState('All');
  const doneRecipes = JSON.parse(localStorage.getItem('EnviadoneRecipes'));
  const Compartilhar = (tipo, id) => {
    const url = `http://localhost:3000/${tipo}s/${id}`;
    console.log(url);
    Copy(url);
    setcopiado(true);
  };
  return (
    <section className="favRecipes-container">
      <img
        className="profile-img"
        data-testid="profile-top-btn"
        src={ profileIcon }
        alt=""
      />
      <div>
        <h1 data-testid="page-title">
          Done Recipes
        </h1>
      </div>
      <div className="butons-container">
        <button
          className="buttons btn btn-success"
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ () => setFiltro('All') }
        >
          All
        </button>
        <button
          className="buttons btn btn-success"
          data-testid="filter-by-meal-btn"
          type="button"
          onClick={ () => setFiltro('meal') }
        >
          Meals
        </button>
        <button
          className="buttons btn btn-success"
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ () => setFiltro('drink') }
        >
          Drinks
        </button>
      </div>
      <section className="card-container">
        {doneRecipes?.filter(
          (recipes) => (recipes.type === filtro || filtro === 'All'),
        ).map((recipe, index) => (
          <div key={ index } className="card-doneRecipes">
            <a href={ `/${recipe.type}s/${recipe.id}` }>
              <img
                src={ recipe.image }
                className="img-thumbnail favRecipe-img"
                data-testid={ `${index}-horizontal-image` }
                alt={ recipe.name }
                width="250px"
              />
            </a>
            <section className="card-container">
              <div className="nameToCategory">
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
              </div>
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
              <div className="icons">
                <button
                  className="shareIcon"
                  type="button"
                  data-testid={ `${index}-share-button` }
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
              </div>
              <p hidden={ !copiado }>Link copied!</p>
            </section>
          </div>
        ))}
      </section>
    </section>
  );
}
export default DoneRecipes;
