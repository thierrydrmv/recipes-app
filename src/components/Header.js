import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipiesContext from '../context/RecipiesContext';
import profileIcon from '../images/profileIcon.svg';
import SearchBar from './SearchBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import searchIcon from '../images/searchIcon.svg';

function Header() {
  const { pageTitle, switchSearch, setSwitchSearch } = useContext(RecipiesContext);

  const handleSearch = () => {
    setSwitchSearch(!switchSearch);
  };

  const history = useHistory();
  const handleClick = (pathName) => {
    history.push(`/${pathName}`);
  };

  return (
    <div className="header-container">
      <h1 data-testid="page-title">{pageTitle}</h1>
      <div className="text-center">
        <button
          className="icons"
          type="button"
          onClick={ () => { handleClick('profile'); } }
        >
          <img data-testid="profile-top-btn" src={ profileIcon } alt="btn-profile" />
        </button>
        <button
          className="icons"
          type="button"
          onClick={ handleSearch }
        >
          <img src={ searchIcon } data-testid="search-top-btn" alt="btn-search" />
        </button>
        {
          switchSearch
          && <SearchBar />
        }
      </div>
    </div>
  );
}

export default Header;
