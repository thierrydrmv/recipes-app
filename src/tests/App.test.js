import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import RenderWithProvider from './RenderWIthProvider';
import App from '../App';

const EMAIL_INPUT = 'email-input';
const PASSWORD_INPUT = 'password-input';

describe('Testa o componente "App"', () => {
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
});
