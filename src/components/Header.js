import { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RecipiesContext from '../context/RecipiesContext';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const { pageTitle, switchSearch, setSwitchSearch } = useContext(RecipiesContext);

  const handleSearch = () => {
    console.log('click');
    setSwitchSearch(!switchSearch);
  };

  const history = useHistory();
  const handleClick = (pathName) => {
    history.push(`/${pathName}`);
  };

  return (
    <div>
      <h1 data-testid="page-title">{pageTitle}</h1>
      <button
        type="button"
        onClick={ () => { handleClick('profile'); } }
      >
        <img data-testid="profile-top-btn" src={ profileIcon } alt="btn-profile" />
      </button>
      <button
        type="button"
        onClick={ handleSearch }
      >
        <img src={ searchIcon } data-testid="search-top-btn" alt="btn-search" />
      </button>
      {
        switchSearch === true
        && <SearchBar />
      }
    </div>
  );
}

export default Header;
