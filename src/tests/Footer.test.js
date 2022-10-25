import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer';
import Meals from '../components/Meals';
import renderWithProvider from './RenderWIthProvider';

describe('Testes para o componente Footer', () => {
  it('Testa se a imagem de drinks e meals aparece na tela', () => {
    render(<Footer />);
    const drinkIcon = screen.getByRole('img', { name: /drinks/i });
    const mealIcon = screen.getByRole('img', { name: /meals/i });
    expect(drinkIcon).toBeInTheDocument();
    expect(mealIcon).toBeInTheDocument();
  });
  it('Testa se há redirecionamento de pagina ao clicar no botão', () => {
    const { history } = renderWithProvider(<Meals />);
    console.log(history);
  });
});
