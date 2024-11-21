import { it, expect, describe, vi} from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { StoreContext } from '../../context/StoreContext';
import Login from '../../components/Login/Login';


describe('login page', () => {
    const mockSetShowLogin = vi.fn();
    const mockSetToken = vi.fn();
    const mockUrl = 'http://localhost';

    const renderWithContext = () => {
        return render(
        <StoreContext.Provider
            value={{
            url: mockUrl,
            setToken: mockSetToken,
        }}
        >
        <Login setShowlogin={mockSetShowLogin} />
        </StoreContext.Provider>
        );
    };

    it('renders the login form by default', () => {
        renderWithContext();
        screen.debug();
        const loginButton = screen.getByRole('button', { name: /login/i });
        expect(loginButton).toBeInTheDocument();
      
      });

      it('renders the register form when toggled', () => {
        renderWithContext();
        
        fireEvent.click(screen.getByText('Click here'));
        
        const signupButton = screen.getByRole('button', { name: /Sign Up/i });
        expect(signupButton).toBeInTheDocument();
        
        const nameInput = screen.getByPlaceholderText('Your Name');
        expect(nameInput).toBeInTheDocument();

        const checkbox = screen.getByRole('checkbox');
        expect(checkbox).toBeInTheDocument();
      });
})