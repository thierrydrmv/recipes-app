import { useContext } from 'react';
import { Link } from 'react-router-dom';
import RecipiesContext from '../context/RecipiesContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const { pageTitle, switchSearch, setSwitchSearch } = useContext(RecipiesContext);

  const handleSearch = () => {
    setSwitchSearch(!switchSearch);
  };

  return (
    <div>
      <h1 data-testid="page-title">{pageTitle}</h1>
      <Link
        to="/profile"
      >
        <button
          type="button"
        >
          <img data-testid="profile-top-btn" src={ profileIcon } alt="" />
        </button>
      </Link>

      <button
        type="button"
        onClick={ handleSearch }
      >
        <img data-testid="search-top-btn" src={ searchIcon } alt="" />
      </button>
      {
        switchSearch === true
        && <input
          type="text"
          placeholder="Search"
          data-testid="search-input"
          name="search"
          value=""
          onChange=""
        />
      }
    </div>
  );
}

export default Header;
