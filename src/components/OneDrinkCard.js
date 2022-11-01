import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipiesContext from '../context/RecipiesContext';
import CarouselStructure from './CarouselStructure';

function OneDrinkCard() {
  const { renderOneFood, setRenderOneFood } = useContext(RecipiesContext);
  const history = useHistory();
  const vinteEUm = 21;
  const trintaECinco = 35;
  const trintaESeis = 36;
  const cinquentaEUm = 51;
  useEffect(() => {
    const fetchApiCocktail = async () => {
      const id = history.location.pathname.split('/')[2];
      const endPoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
      const response = await fetch(endPoint);
      const data = await response.json();
      const result = [...data.drinks];
      result[0].type = 'drinks';
      result[0].ingredientAndMeasureList = [{
        ingredient: Object.values(result[0]).slice(vinteEUm, trintaECinco),
        measure: Object.values(result[0]).slice(trintaESeis, cinquentaEUm),
      }];
      setRenderOneFood(result);
    };
    fetchApiCocktail();
  }, []);
  return (
    <div>
      {renderOneFood.map(({
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
            {ingredientAndMeasureList.map(
              ({ ingredient, measure }) => ingredient.map((i, index) => (
                <div key={ `${index}-${i}` }>
                  <p
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {i}
                  </p>
                  <p
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {measure[index]}
                  </p>
                </div>
              )),
            )}
            <p data-testid="instructions">{strInstructions}</p>
            <h2>Recomendações</h2>
            <CarouselStructure />
          </div>
        )
      ))}
    </div>
  );
}

export default OneDrinkCard;
