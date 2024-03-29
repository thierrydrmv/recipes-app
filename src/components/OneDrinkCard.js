import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipiesContext from '../context/RecipiesContext';
import CarouselStructure from './CarouselStructure';
import 'bootstrap/dist/css/bootstrap.min.css';

function OneDrinkCard() {
  const { renderOneFood, setRenderOneFood } = useContext(RecipiesContext);
  const history = useHistory();
  const vinte = 20;
  const trintaEDois = 32;
  const trintaECinco = 35;
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
        ingredient: Object.values(result[0]).filter(
          (item, index) => index > vinte && index < trintaEDois && item !== null,
        ),
        measure: Object.values(result[0]).filter(
          (item, index) => index > trintaECinco && index < cinquentaEUm && item !== null,
        ),
      }];
      setRenderOneFood(result);
    };
    fetchApiCocktail();
  }, []);
  return (
    <div>
      {renderOneFood?.map(({
        idDrink, strDrinkThumb, strDrink, strInstructions,
        ingredientAndMeasureList, strAlcoholic,
      }) => (
        (
          <div key={ idDrink }>
            <h1 className="recipeName" data-testid="recipe-title">{strDrink}</h1>
            <img
              className="oneFoodImg"
              data-testid="recipe-photo"
              src={ strDrinkThumb }
              alt={ strDrink }
              width="150"
            />
            <div className="text-center m-3">
              <p data-testid="recipe-category">{strAlcoholic}</p>
              <h5>Ingredients</h5>
            </div>
            <div className="ingredients-container">
              {ingredientAndMeasureList.map(
                ({ ingredient, measure }) => ingredient.map((i, index) => (
                  <div
                    key={ `${index}-${i}` }
                  >
                    <p
                      className="ingredients"
                      data-testid={ `${index}-ingredient-name-and-measure` }
                    >
                      {`${i} ${measure[index]}`}
                    </p>
                  </div>
                )),
              )}
            </div>
            <div className="m-3">
              <p data-testid="instructions">{strInstructions}</p>
            </div>
            <div className="text-center m-3">
              <h5>Recommendations</h5>
            </div>
            <CarouselStructure />
          </div>
        )
      ))}
    </div>
  );
}

export default OneDrinkCard;
