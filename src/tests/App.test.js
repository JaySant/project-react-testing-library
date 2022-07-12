import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Testa o componente <App.js />', () => {
  it('Verifica se ao clicar em "Home" é direcionado para a pagina inicial', () => {
    const { history } = renderWithRouter(<App />);

    const homeElement = screen.getByRole('link', { name: 'Home' });
    expect(homeElement).toBeInTheDocument();
    userEvent.click(homeElement);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verifica se ao clicar em "About" é direcionado para a pagina about', () => {
    const { history } = renderWithRouter(<App />);

    const aboutElement = screen.getByRole('link', { name: 'About' });
    expect(aboutElement).toBeInTheDocument();
    userEvent.click(aboutElement);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Verifica se ao clicar em "Favorite Pokemons" é direcionado para favoritos', () => {
    const { history } = renderWithRouter(<App />);

    const favoriteElement = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteElement).toBeInTheDocument();
    userEvent.click(favoriteElement);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
