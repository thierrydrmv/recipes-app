import { useContext } from 'react';
import RecipiesContext from '../context/RecipiesContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const { pageTitle } = useContext(RecipiesContext);
  return (
    <div>
      <h1 data-testid="page-title">{pageTitle}</h1>
      <img data-testid="profile-top-btn" src={ profileIcon } alt="" />
      <img data-testid="search-top-btn" src={ searchIcon } alt="" />
    </div>
  );
}

export default Header;
