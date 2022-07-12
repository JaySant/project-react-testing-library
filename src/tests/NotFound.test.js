import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../pages';

describe('Testa se renderiza o componente <NotFound.js />', () => {
  it('Testa se tem um caminho não existente e a renderização do Not Found', () => {
    renderWithRouter(<NotFound />);

    const notFoundTitle = screen.getByRole('heading',
      { name: /Page requested not found/i });
    expect(notFoundTitle).toBeInTheDocument();
  });
  it('Teste se a página mostra a imagem', () => {
    renderWithRouter(<NotFound />);

    const pikachuSad = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imagePikachu = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found' });
    expect(imagePikachu).toHaveProperty('src', pikachuSad);
  });
});
