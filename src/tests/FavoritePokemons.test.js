import React from 'react';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente <FavoritePokemons.js />', () => {
  it('Teste se é exibida na tela a mensagem "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);

    const notFoundFavorite = screen.getByText(/No favorite pokemon found/i);
    expect(notFoundFavorite).toBeInTheDocument();
  });
});
