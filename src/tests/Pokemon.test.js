import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('test PokemonDetails component', () => {
  const pagaPath = '/pokemons/25';
  it('Teste se as informações detalhadas do Pokémon selecionado são mostradas.', () => {
    const { history } = renderWithRouter(<App />);
    history.push(pagaPath);

    screen.getByRole('heading', { name: /pikachu details/i });
    screen.getByRole('heading', { name: /summary/i, level: 2 });
    screen.getByText(/This intelligent Pokémon/i);
  });

  it('Teste se existe uma seção com os mapas contendo as localizações do pokémon',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(pagaPath);

      screen.getByRole('heading', { name: /game locations of pikachu/i });

      const images = screen.getAllByAltText(/pikachu location/i);
      const src1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
      const src2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';
      screen.getByText(/kanto power plant/i);
      screen.getByText(/kanto viridian forest/i);

      expect(images[0]).toHaveAttribute('src', src1);
      expect(images[1]).toHaveAttribute('src', src2);
    });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes.',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push(pagaPath);
      const checkbox = screen.getByRole('checkbox', { name: /pokémon favoritado/i });

      userEvent.click(checkbox);
      const checked = screen.getByAltText('Pikachu is marked as favorite');
      userEvent.click(checkbox);
      expect(checked).not.toBeInTheDocument();
    });
});
