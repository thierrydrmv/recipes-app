import React from 'react';

function Login() {
  return (
    <div>
      <h1>Login</h1>
      <div>
        <input
          type="email"
          placeholder="E-mail"
          data-testid="email-input"
          name="email"
          onChange=""
        />
        <input
          type="text"
          placeholder="Password"
          data-testid="password-input"
          name="password"
          onChange=""
        />
        <button
          type="button"
          data-testid="login-submit-btn"
          // disabled={ !email.length > 0 || !name.length > 0 }
          onClick=""
          className="button"
        >
          Enter
        </button>
      </div>
    </div>
  );
}

export default Login;
