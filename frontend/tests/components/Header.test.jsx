import { it, expect, describe} from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Header from '../../components/Header/Header';

describe('Header component ', () => {
    it('contains link to the menu page', () => {
        render(
            <MemoryRouter>
              <Header />
            </MemoryRouter>
          );

          const menuLink = screen.getByRole('link', { name: /view menu/i });
          expect(menuLink).toHaveAttribute('href', '/menu');
    })
})