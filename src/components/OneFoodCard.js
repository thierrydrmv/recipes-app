import { useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import RecipiesContext from '../context/RecipiesContext';
import CarouselStructure from './CarouselStructure';

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
        idMeal, strMealThumb, strMeal, strInstructions, strCategory, strYoutube,
        strTags, ingredientAndMeasureList,
      }) => (
        (
          <div key={ idMeal }>
            <h1 data-testid="recipe-title">{strMeal}</h1>
            <img
              data-testid="recipe-photo"
              src={ strMealThumb }
              name={ strTags }
              alt={ strMeal }
              width="150"
            />
            <p data-testid="recipe-category">{strCategory}</p>
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
            <iframe
              data-testid="video"
              width="560"
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
            <h2>Recomendações</h2>
            <CarouselStructure />
          </div>
        )
      ))}
    </div>
  );
}

export default OneFoodCard;
