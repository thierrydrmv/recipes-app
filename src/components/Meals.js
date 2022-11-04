import PropTypes from 'prop-types';
import { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import RecipiesContext from '../context/RecipiesContext';
import Header from './Header';
import Footer from './Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/meals.css';

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
    setRedirect,
  } = useContext(RecipiesContext);
  const history = useHistory();
  useEffect(() => {
    const requestAPI = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setMeat(data);
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
      const category = newData
        .map((item) => (item.strCategory));
      setMealcat(category);
      setMealcatBool(true);
    };
    fetchMeal();
  }, []);
  const handleCategory = async (category) => {
    const response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await response.json();
    setMeat(data);
  };
  return (
    <div>
      <Header />
      <div className="button-container text-center">
      { mealcatBool
      && mealcat?.map((categoryName, index) => (
        <button
          className="btn btn-success m-1"
          key={ `${categoryName}-${index}` }
          data-testid={ `{${categoryName}-category-filter}` }
          type="button"
          onClick={ () => handleCategory(categoryName) }
        >
          { categoryName }
        </button>
      ))}
      </div>
      <div className="card-container">
        { meale ? meat.meals?.map(({ idMeal, strMealThumb, strMeal }, index) => (
          index < size && (
            <div
              className="recipe-card"
              data-testid={ `${index}-recipe-card` }
              key={ idMeal }>
              <img
                className="imagem"
                data-testid={ `${index}-card-img` }
                src={ strMealThumb }
                alt={ idMeal }
              />
              <p data-testid={ `${index}-card-name` }>{strMeal}</p>
            </div>
          )
        )) : (
          meals.meals?.map(({ idMeal, strMealThumb, strMeal }, index) => (
            index < size && (
              <div
                className="recipe-card"
                data-testid={ `${index}-recipe-card` }
                key={ idMeal }
              >
                <img
                  className="imagem"
                  data-testid={ `${index}-card-img` }
                  src={ strMealThumb }
                  alt={ idMeal }
                />
                <p data-testid={ `${index}-card-name` }>{strMeal}</p>
              </div>
            )
          )))}
        </div>
      
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
