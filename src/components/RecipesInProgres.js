import { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import RecipiesContext from '../context/RecipiesContext';

export default function RecipesInProgress() {
  const history = useHistory();
  const id = history.location.pathname.split('/')[2];

  const { renderOneFood } = useContext(RecipiesContext);
  const oneFood = renderOneFood[0];
  // const { ingredientAndMeasureList, strMeal, idMeal,
  //   strMealThumb, strInstructions, strCategory } = renderOneFood[0];
  if (oneFood) {
    const { ingredientAndMeasureList } = oneFood;
    const { ingredient, measure } = ingredientAndMeasureList[0];
    oneFood.ingredientAndMeasureList[0]
      .ingredient = ingredient.filter((element) => element !== '');

    oneFood.ingredientAndMeasureList[0]
      .measure = measure.filter((element) => element !== ' ');

    localStorage.setItem(id, JSON.stringify(oneFood));
  }

  const saveLocalStorage = (status) => {
    const prev = JSON.parse(localStorage.getItem(id));
    console.log('prev', prev);
    prev.status = status;
    localStorage.setItem(id, JSON.stringify(prev));
  };

  // useEffect(() => {
  //   console.log(renderOneFood[0]);
  //   if (oneFood) {
  //     localStorage.setItem(id, renderOneFood[0]);
  //   }
  // }, []);

  const { ingredientAndMeasureList, strMeal,
    strMealThumb, strInstructions, strCategory } = JSON.parse(localStorage.getItem(id));
  const { ingredient } = ingredientAndMeasureList[0];
  // const filteredIngredients = ingredient.filter((element) => element !== '');
  // const food = JSON.parse(localStorage.getItem(id));
  // console.log('food', food);

  console.log(ingredientAndMeasureList[0].ingredient);

  const [checkboxStatus, setCheckbox] = useState(
    Array(ingredientAndMeasureList[0].ingredient.length).fill(false),
  );

  const handleCheckBox = (index) => {
    const status = [...checkboxStatus];
    status[index] = !status[index];
    saveLocalStorage(status);
    setCheckbox(status);
  };

  const handleClick = () => {
    history.push('/done-recipes');
  };

  return (
    <section>
      <h3 data-testid="recipe-title">{strMeal}</h3>
      <img data-testid="recipe-photo" src={ strMealThumb } alt={ strMealThumb } />
      {ingredient.map((element, index) => (
        <label
          key={ element }
          htmlFor="ingredient"
          data-testid={ `${index}-ingredient-step` }
        >
          <input
            onChange={ () => handleCheckBox(index) }
            className="ingredient-checkbox"
            type="checkbox"
          />
          <span>{element}</span>
        </label>
      ))}
      <button data-testid="share-btn" type="button">
        compartilhar
      </button>
      <button data-testid="favorite-btn" type="button">
        favoritar
      </button>
      <h4 data-testid="recipe-category">{strCategory}</h4>
      <p data-testid="instructions">{strInstructions}</p>
      <button
        disabled={ !checkboxStatus.every((check) => check === true) }
        type="button"
        data-testid="finish-recipe-btn"
        onClick={ handleClick }
      >
        finalizar
      </button>
    </section>
  );
}
