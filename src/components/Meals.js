import PropTypes from 'prop-types';
import { useEffect, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import RecipiesContext from '../context/RecipiesContext';
import Header from './Header';
import Footer from './Footer';
import FilterButtons from './FilterButtons';
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
    setRedirect,
    setBackupMeat,
  } = useContext(RecipiesContext);
  const history = useHistory();

  useEffect(() => {
    const requestAPI = async () => {
      const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
      const data = await response.json();
      setMeat(data);
      setBackupMeat(data);
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
      setRedirect('');
    }
  }, [history, redirect, setPageTitle, setRoute, setMeale]);

  const size = 12;

  return (
    <div className="test">
      <Header />
      <FilterButtons />
      { meale ? meat.meals?.map(({ idMeal, strMealThumb, strMeal }, index) => (
        index < size && (
          <Link to={ `${history.location.pathname}/${idMeal}` }>
            <div data-testid={ `${index}-recipe-card` } key={ idMeal }>
              <p data-testid={ `${index}-card-name` }>{strMeal}</p>
              <img
                className="imagem"
                data-testid={ `${index}-card-img` }
                src={ strMealThumb }
                alt={ idMeal }
              />
              <p data-testid={ `${index}-card-name` }>{strMeal}</p>
            </div>
          </Link>
        )
      )) : (
        meals.meals?.map(({ idMeal, strMealThumb, strMeal }, index) => (
          index < size && (
            <Link to={ `${history.location.pathname}/${idMeal}` }>
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
            </Link>
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
