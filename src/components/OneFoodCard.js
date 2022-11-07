import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipiesContext from '../context/RecipiesContext';
import CarouselStructure from './CarouselStructure';
import 'bootstrap/dist/css/bootstrap.min.css';

function OneFoodCard() {
  const { renderOneFood, setRenderOneFood } = useContext(RecipiesContext);
  const history = useHistory();
  const nove = 9;
  const vinteENove = 29;
  const quarentaENove = 49;
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
      setRenderOneFood(result);
    };
    fetchApiMeal();
  }, []);

  return (
    <div>
      {renderOneFood?.map(({
        idMeal, strMealThumb, strMeal, strInstructions, strYoutube,
        strTags, ingredientAndMeasureList, strCategory,
      }) => (
        (
          <div key={ idMeal }>
            <h1
              className="recipeName"
              data-testid="recipe-title"
            >
              {strMeal}
            </h1>
            <img
              className="oneFoodImg"
              data-testid="recipe-photo"
              src={ strMealThumb }
              name={ strTags }
              alt={ strMeal }
            />
            <p data-testid="recipe-category">{strCategory}</p>

            <div className="text-center m-3">
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
            <iframe
              data-testid="video"
              width="360"
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

export default OneFoodCard;
