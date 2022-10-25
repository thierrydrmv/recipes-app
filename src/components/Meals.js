import PropTypes from 'prop-types';
import { useEffect, useContext } from 'react';
import RecipiesContext from '../context/RecipiesContext';
import Header from './Header';

const pathNameSize = 6;

function Meals({ location }) {
  const { setPageTitle } = useContext(RecipiesContext);
  useEffect(() => {
    setPageTitle('Meals');
  });
  return (
    <div>
      {location.pathname.length === pathNameSize && <Header />}
    </div>
  );
}

Meals.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Meals;
