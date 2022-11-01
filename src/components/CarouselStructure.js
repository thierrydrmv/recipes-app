import React, { useContext, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import { useHistory } from 'react-router-dom';
import RecipiesContext from '../context/RecipiesContext';

function CarouselStructure() {
  const { location: { pathname } } = useHistory();
  const page = pathname.split('/')[1];
  const { mealApi,
    cocktailApi,
    setCocktailApi,
    setMealApi,
  } = useContext(RecipiesContext);

  useEffect(() => {
    const seis = 6;
    const fetchApiMeals = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      if (data.meals) {
        const result = [...data.meals];
        const b = result.splice(0, seis);
        setMealApi(b);
      } else {
        setMealApi([]);
      }
    };
    const fetchApiDrinks = async () => {
      const response = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      if (data.drinks) {
        const result = [...data.drinks];
        const b = result.splice(0, seis);
        setCocktailApi(b);
      } else {
        setCocktailApi([]);
      }
    };
    if (page === 'meals') {
      fetchApiDrinks();
    } else {
      fetchApiMeals();
    }
  }, []);
  return (
    <div>
      <Carousel>
        { page === 'drinks' ? (
          mealApi?.map((item, index) => (
            <Carousel.Item
              key={ index }
            >
              <img
                data-testid={ `${index}-recommendation-card` }
                className="flex-column w-100"
                src={ item.strMealThumb }
                alt={ item.strMeal }
              />
              <Carousel.Caption>
                <h3
                  className="flex-column w-100"
                  data-testid={ `${index}-recommendation-title` }
                >
                  {item.strMeal}
                </h3>
              </Carousel.Caption>
            </Carousel.Item>))
        )
          : cocktailApi?.map((item, index) => (
            <Carousel.Item
              key={ index }
            >
              <img
                data-testid={ `${index}-recommendation-card` }
                className="flex-column w-100"
                src={ item.strDrinkThumb }
                alt={ item.strDrink }
              />
              <Carousel.Caption>
                <h3
                  className="flex-column w-100"
                  data-testid={ `${index}-recommendation-title` }
                >
                  {item.strDrink}
                </h3>
              </Carousel.Caption>
            </Carousel.Item>)) }
      </Carousel>
    </div>
  );
}
export default CarouselStructure;
