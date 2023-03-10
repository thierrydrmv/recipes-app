import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithProvider from './RenderWIthProvider';
import RecipeInProgress from '../components/RecipeInProgress';

const oneDrink = require('../../cypress/mocks/oneDrink');
const oneMeal = require('../../cypress/mocks/oneMeal');

describe('testando a página receita em progresso', () => {
  it('renderiza os ingredientes do meals', async () => {
    global.navigator.clipboard = { writeText: jest.fn() };
    global.fetch = jest.fn()
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(oneMeal),
      });
    RenderWithProvider(<RecipeInProgress />, '/meals/52771/in-progress');
    const ingredients = await screen.findAllByRole('checkbox');
    expect(ingredients).toHaveLength(8);
    userEvent.click(ingredients[1]);
  });
  it('renderiza os ingredientes dos drinks', async () => {
    global.fetch = jest.fn()
      .mockResolvedValue({
        json: jest.fn().mockResolvedValue(oneDrink),
      });
    RenderWithProvider(<RecipeInProgress />, '/drinks/178319/in-progress');
    const ingredients = await screen.findAllByRole('checkbox');
    expect(ingredients).toHaveLength(3);
    userEvent.click(ingredients[0]);
    userEvent.click(ingredients[1]);
    userEvent.click(ingredients[2]);
    const finishBtn = screen.getByRole('button', { name: /finish recipe/i });
    userEvent.click(finishBtn);
  });
});
