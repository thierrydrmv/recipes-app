import PropTypes from 'prop-types';
import { useEffect, useContext } from 'react';
import RecipiesContext from '../context/RecipiesContext';
import Header from './Header';

function Meals() {
  const { pageTitle, setPageTitle } = useContext(RecipiesContext);
  useEffect(() => {
    setPageTitle('Meals');
  });
  return (
    <div>
      {pageTitle === 'Meals' && <Header />}
    </div>
  );
}

Meals.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Meals;
