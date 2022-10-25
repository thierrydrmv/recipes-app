import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import RenderWithProvider from './RenderWIthProvider';
import App from '../App';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';

describe('Testa o componente "Login"', () => {
  beforeEach(() => {
    act(() => {
      RenderWithProvider(<App />);
    });
  });
  it('Testa se a página contém os inputs necessários e se o botão começa desabilitado:', () => {
    expect(screen.getByTestId(EMAIL_INPUT)).toBeInTheDocument();
    expect(screen.getByTestId(PASSWORD_INPUT)).toBeInTheDocument();
    expect(screen.getByRole('button', {
      name: /enter/i,
    })).toBeDisabled();
  });
  it('Testa se o botão habilida quando satisfeitos os requisitos:', () => {
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const enterBtn = screen.getByRole('button', {
      name: /enter/i,
    });

    userEvent.type(emailInput, 'alguem@email.com');
    userEvent.type(passwordInput, '1234567');

    expect(enterBtn).not.toBeDisabled();
  });
  it('Testa se ao clicar no login redireciona para página de receitas', () => {
    const emailInputs = screen.getByTestId(EMAIL_INPUT);
    const passwordInputs = screen.getByTestId(PASSWORD_INPUT);
    const enterBtns = screen.getByRole('button', {
      name: /enter/i,
    });

    userEvent.type(emailInputs, 'alguem@email.com');
    userEvent.type(passwordInputs, '1234567');
    userEvent.click(enterBtns);
  });
});
