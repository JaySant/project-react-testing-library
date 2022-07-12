import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';

describe('Teste o componente <Pokedex.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  const pokemonIdName = 'pokemon-name';

  it('Teste se a página contém um heading com o texto Encountered pokémons', () => {
    const Encountered = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(Encountered).toBeInTheDocument();
  });

  it(`Teste se é exibido próximo pokémon da lista
  quando o botão Próximo pokémon é clicado`, () => {
    pokemons.forEach((pokemon) => {
      const namePokemon = screen.getByTestId(pokemonIdName);
      const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });

      expect(nextPokemon).toHaveTextContent('Próximo pokémon');
      expect(namePokemon).toHaveTextContent(pokemon.name);
      userEvent.click(nextPokemon);
    });
  });
  it('Teste se é mostrado apenas um pokémon por vez', () => {
    pokemons.forEach((pokemon) => {
      screen.getAllByTestId('pokemon-type-button');
      const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });
      const namePokemon = screen.getByTestId(pokemonIdName);
      const pokemonsInTheWindow = screen.queryAllByTestId('pokemon-name');

      expect(pokemonsInTheWindow).toHaveLength(1);
      expect(namePokemon).toHaveTextContent(pokemon.name);
      expect(nextPokemon).toHaveTextContent('Próximo pokémon');

      userEvent.click(nextPokemon);
    });
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    const allBtn = screen.getByRole('button', { name: /all/i });

    expect(allBtn).toHaveTextContent('All');

    userEvent.click(allBtn);

    pokemons.forEach((pokemon) => {
      const namePokemon = screen.getByTestId(pokemonIdName);
      const nextPokemon = screen.getByRole('button', { name: /próximo pokémon/i });

      expect(namePokemon).toHaveTextContent(pokemon.name);
      userEvent.click(nextPokemon);
    });
  });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    const pokemonTypes = [...new Set(pokemons.map(({ type }) => type))];
    screen.getAllByTestId('pokemon-type-button');
    pokemonTypes.forEach((type) => {
      const typeButton = screen.getByRole('button', { name: type });
      userEvent.click(typeButton);
      const pokemonType = screen.getAllByText(type);
      expect(pokemonType).toHaveLength(2);
    });
  });
});
