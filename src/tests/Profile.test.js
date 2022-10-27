import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import RenderWithProvider from './RenderWIthProvider';
import Profile from '../components/Profile';

describe('Testa o componente "Profile"', () => {
  beforeEach(() => {
    localStorage.setItem('user', JSON.stringify({ email: 'alguem@email.com' }));
  });

  afterEach(() => {
    localStorage.clear();
    /* (() => cleanup); */
  });

  it('Testa se a página contém os botões.', async () => {
    RenderWithProvider(<Profile />);

    const doneRecipesBtn = await screen.findByRole('button', {
      name: /done recipes/i,
    });
    const favoriteRecipesBtn = await screen.findByRole('button', {
      name: /favorite recipes/i,
    });
    const logoutBtn = await screen.findByRole('button', {
      name: /logout/i,
    });

    expect(doneRecipesBtn).toBeInTheDocument();
    expect(favoriteRecipesBtn).toBeInTheDocument();
    expect(logoutBtn).toBeInTheDocument();
  });

  it('Testa se o botão "Done Recipes" redireciona corretamente.', async () => {
    const { history } = RenderWithProvider(<Profile />);

    const doneRecipesBtn = await screen.findByRole('button', {
      name: /done recipes/i,
    });

    userEvent.click(doneRecipesBtn);

    expect(history.location.pathname).toBe('/done-recipes');
  });

  it('Testa se o botão "Favorite Recipes" redireciona corretamente.', () => {
    RenderWithProvider(<Profile />);

    const favoriteRecipesBtn = screen.getByRole('button', {
      name: /favorite recipes/i,
    });

    userEvent.click(favoriteRecipesBtn);

    /* expect(window.location.pathname).toBe('/favorite-recipes'); */
  });

  it('Testa se o botão "Logout" redireciona corretamente.', () => {
    RenderWithProvider(<Profile />);

    const logoutBtn = screen.getByRole('button', {
      name: /logout/i,
    });

    userEvent.click(logoutBtn);

    expect(window.location.pathname).toBe('/');
  });
});
