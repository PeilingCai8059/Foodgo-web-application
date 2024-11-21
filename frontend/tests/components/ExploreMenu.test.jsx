import { it, expect, describe} from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import ExploreMenu from '../../components/ExploreMenu/ExploreMenu';
import { useState } from 'react';

describe('categorize food', () => {

    const WrapperComponent = () => {
        const [category, setCategory] = useState('All');
        return (
            <ExploreMenu 
              category={category} 
              setCategory={setCategory} 
            />
          );
    }

    it('calls setCategory with the correct value on click', () => {
        render(<WrapperComponent />)
        const saladImage = screen.getByAltText('Salad');
        expect(saladImage).not.toHaveClass('active');

        fireEvent.click(saladImage);
        expect(saladImage).toHaveClass('active');
    });

    it('toggles category back to "All" when clicking the same category ', () => {
        render(<WrapperComponent />)
        const saladImage = screen.getByAltText('Salad');
        fireEvent.click(saladImage);
        fireEvent.click(saladImage);
        expect(saladImage).not.toHaveClass('active');
    })

    it('contains category "Salad"', () => {
        render(<WrapperComponent />);
        const saladImage = screen.getByAltText('Salad');
        expect(saladImage).toBeInTheDocument();
    });

    it('contains category "Rolls"', () => {
    render(<WrapperComponent />);
    const rollsImage = screen.getByAltText('Rolls');
    expect(rollsImage).toBeInTheDocument();
    });

    it('contains category "Deserts"', () => {
        render(<WrapperComponent />);
        const desertsImage = screen.getByAltText('Deserts');
        expect(desertsImage).toBeInTheDocument();
    });

    it('contains category "Sandwich"', () => {
        render(<WrapperComponent />);
        const sandwichImage = screen.getByAltText('Sandwich');
        expect(sandwichImage).toBeInTheDocument();
    });

    it('contains category "Cake"', () => {
        render(<WrapperComponent />);
        const cakeImage = screen.getByAltText('Cake');
        expect(cakeImage).toBeInTheDocument();
    });

    it('contains category "Pure Veg"', () => {
        render(<WrapperComponent />);
        const pureVegImage = screen.getByAltText('Pure Veg');
        expect(pureVegImage).toBeInTheDocument();
    });

    it('contains category "Pasta"', () => {
        render(<WrapperComponent />);
        const pastaImage = screen.getByAltText('Pasta');
        expect(pastaImage).toBeInTheDocument();
    });

    it('contains category "Noodles"', () => {
        render(<WrapperComponent />);
        const noodlesImage = screen.getByAltText('Noodles');
        expect(noodlesImage).toBeInTheDocument();
    });
    
})