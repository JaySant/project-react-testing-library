import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Teste componente <Pokemon />', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const pokemName = screen.getByTestId('pokemon-name');
    const pokemType = screen.getByTestId('pokemon-type');
    const pokemWeight = screen.getByTestId('pokemon-weight');
    const pokemImg = screen.getByAltText('Pikachu sprite');
    const src = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png';

    expect(pokemName).toHaveTextContent('Pikachu');
    expect(pokemType).toHaveTextContent('Electric');
    expect(pokemWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pokemImg).toHaveAttribute('src', src);
  });

  it('Teste se redireciona para a página certa ao clicar no link de detalhes', () => {
    const { history } = renderWithRouter(<App />);

    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toEqual('/pokemons/25');
  });

  it('verify if have star icon for favorite pokemon', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const favoriteCheckbox = screen.getByLabelText(/pokémon favoritado/i);
    userEvent.click(favoriteCheckbox);
    const favorite = screen.getByAltText('Pikachu is marked as favorite');
    expect(favorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
