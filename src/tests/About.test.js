import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../pages';
import renderWithRouter from '../renderWithRouter';

describe('Teste se a página contém as informações no componente <About />',
  () => {
    it('Teste se a página contém um heading h2 com o texto "About Pokédex"', () => {
      renderWithRouter(<About />);

      const heading = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });
      expect(heading).toBeInTheDocument();
    });
    it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
      renderWithRouter(<About />);

      const pageText = screen.getAllByText(/Pokémon/i);
      expect(pageText).toHaveLength(2);
    });
    it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
      renderWithRouter(<About />);

      const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
      const image = screen.getByRole('img');
      expect(image).toHaveProperty('src', url);
    });
  });
