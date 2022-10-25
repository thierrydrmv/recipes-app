import PropTypes from 'prop-types';
import { useEffect, useContext } from 'react';
import RecipiesContext from '../context/RecipiesContext';
import Header from './Header';
import Footer from './Footer';

const pathNameSize = 7;

function Drinks({ location }) {
  const { setPageTitle } = useContext(RecipiesContext);
  useEffect(() => {
    setPageTitle('Drinks');
  });
  return (
    <div>
      {location.pathname.length === pathNameSize && <Header />}
      <Footer />
    </div>
  );
}

Drinks.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

export default Drinks;
