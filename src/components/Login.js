import PropTypes from 'prop-types';
import React, { useContext, useState } from 'react';
import RecipiesContext from '../context/RecipiesContext';
import rockGlass from '../images/rockGlass.svg';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login({ history }) {
  const { email, setEmail } = useContext(RecipiesContext);

  const [password, setPassword] = useState('');

  const handleEmail = ({ target }) => {
    setEmail(target.value);
  };

  const handlePassword = ({ target }) => {
    setPassword(target.value);
  };

  const formValidation = () => {
    const validEmail = email.includes('@') && email.includes('.com');
    const seven = 7;
    return !!(!validEmail || password.length < seven);
  };

  const handleClick = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <div>

      <div className="meals">
        <h1>Login</h1>
        <span className="logo">Grupo-16</span>
        <object
          className="rocksGlass"
          type="image/svg+xml"
          data={ rockGlass }
        >
          Glass
        </object>
        <div>
          <input
            type="email"
            placeholder="E-mail"
            data-testid="email-input"
            name="email"
            value={ email }
            onChange={ handleEmail }
          />
          <input
            type="text"
            placeholder="Password"
            data-testid="password-input"
            name="password"
            value={ password }
            onChange={ handlePassword }
          />
          <button
            type="button"
            data-testid="login-submit-btn"
            disabled={ formValidation() }
            onClick={ handleClick }
            className="button"
          >
            Enter
          </button>
        </div>
      </div>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Login;
