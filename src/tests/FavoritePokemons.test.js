import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../pages';
import renderWithRouter from '../renderWithRouter';
// import App from '../App';

describe('Testa o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibida na tela a mensagem "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);

    const notFoundFavorite = screen.getByText(/No favorite pokemon found/i);
    expect(notFoundFavorite).toBeInTheDocument();
  });
});
