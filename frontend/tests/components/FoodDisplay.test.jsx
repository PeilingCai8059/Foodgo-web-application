import { it, expect, describe, vi} from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import { StoreContext } from '../../context/StoreContext';
import FoodItem from '../../components/FoodItem/FoodItem';

describe('FoodItem Component', () => {
    const mockAddToCart = vi.fn();
    const mockRemoveFromCart = vi.fn();
  
    const renderWithContext = (props, cartItems = {}, ) => {
      return render(
        <StoreContext.Provider
          value={{cartItems,
            addToCart: mockAddToCart,
            removeFromCart: mockRemoveFromCart,
          }}
        >
          <FoodItem {...props} />
        </StoreContext.Provider>
      );
    };
  
    it('renders the FoodItem with the provided props', () => {
      renderWithContext({
        id: '1',
        name: 'Pizza',
        price: 12,
        description: 'Delicious Pizza',
        image: 'pizza.jpg',
      });
  
      expect(screen.getByText('Pizza')).toBeInTheDocument();
      expect(screen.getByText('Delicious Pizza')).toBeInTheDocument();
      expect(screen.getByText('$12')).toBeInTheDocument();
    });
  
    it('renders the add button when the item is not in the cart', () => {
      renderWithContext(
        {
          id: '1',
          name: 'Pizza',
          price: 12,
          description: 'Delicious Pizza',
          image: 'pizza.jpg',
        },
        {}
      );
  
      const addButton = screen.getByAltText('add');
      expect(addButton).toHaveClass('add');
      fireEvent.click(addButton);
      expect(mockAddToCart).toHaveBeenCalledWith('1');
    });
    it('renders the remove button when the item in the cart', () => {
        renderWithContext(
          {
            id: '1',
            name: 'Pizza',
            price: 12,
            description: 'Delicious Pizza',
            image: 'pizza.jpg',
          },
          {"1": 2}
        );
    
        const removeButton = screen.getByAltText('remove');
        fireEvent.click(removeButton);
        expect(mockRemoveFromCart).toHaveBeenCalledWith('1');
      });
  
    it('renders the counter when the item is in the cart', () => {
      renderWithContext(
        {
          id: '1',
          name: 'Pizza',
          price: 12,
          description: 'Delicious Pizza',
          image: 'pizza.jpg',
        },
        { '1': 2 }
      );
  
      expect(screen.getByText('2')).toBeInTheDocument();
      
    });
  
    
  });