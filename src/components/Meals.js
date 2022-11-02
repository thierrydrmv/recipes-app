import PropTypes from 'prop-types';
import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipiesContext from '../context/RecipiesContext';
import Header from './Header';
import Footer from './Footer';

function Meals() {
  const {
    setPageTitle,
    setRoute,
    redirect,
    meals,
    setMeat,
    setMeale,
    meat,
    meale,
    mealcat,
    setMealcat,
    mealcatBool,
    setMealcatBool,
    setRoute,
    setRedirect,
  } = useContext(RecipiesContext);
  const history = useHistory();

  const fetchData = async () => {
    const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
    const data = await response.json();
    return data;
  };

  useEffect(() => {
    const requestAPI = async () => {
      const response = await fetchData();
      setMeat(response);
      setMeale(true);
    };
    requestAPI();
  }, []);

  useEffect(() => {
    setPageTitle('Meals');
    setRoute('meals');
    setMeale(false);
    if (redirect) {
      history.push(redirect);
    }
  }, [history, redirect, setPageTitle, setRoute, setMeale]);
  
    useEffect(() => {
    if (redirect) {
      history.push(redirect);
      setRedirect('');
    }
  });

  const size = 12;

  useEffect(() => {
    const fetchMeal = async () => {
      const fiveMeats = 6;
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list');
      const data = await response.json();
      const newData = data.meals.splice(0, fiveMeats);
      newData
        .map((item) => ({ categoryName: item.strCategory }));
      setMealcat(newData);
      setMealcatBool(true);
    };
    fetchMeal();
  }, []);
  return (
    <div>
      <Header />
   //   { mealcatBool
   //   && mealcat?.map(({ categoryName }, index) => (
   //     <button
   //       key={ `${categoryName}-${index}` }
   //       data-testid={ `{${categoryName}-category-filter}` }
   //       type="button"
   //     >
   //       { categoryName }
   //     </button>
   //   ))}
      { meale ? meat.meals?.map(({ idMeal, strMealThumb, strMeal }, index) => (
        index < size && (
          <div data-testid={ `${index}-recipe-card` } key={ idMeal }>
            <p data-testid={ `${index}-card-name` }>{strMeal}</p>
            <img
              data-testid={ `${index}-card-img` }
              src={ strMealThumb }
              alt={ idMeal }
            />
          </div>
        )
      )) : (
        meals.meals?.map(({ idMeal, strMealThumb, strMeal }, index) => (
          index < size && (
            <div
              data-testid={ `${index}-recipe-card` }
              key={ idMeal }
            >
              <p data-testid={ `${index}-card-name` }>{strMeal}</p>
              <img
                data-testid={ `${index}-card-img` }
                src={ strMealThumb }
                alt={ idMeal }
              />
            </div>
          )
        )))}
      <Footer />
    </div>
  );
}

Meals.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Meals;
