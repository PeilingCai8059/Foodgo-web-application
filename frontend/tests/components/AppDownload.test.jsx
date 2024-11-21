import { it, expect, describe } from 'vitest';
import { render, screen } from '@testing-library/react';
import AppDownload from '../../components/AppDownload/AppDownload';


describe('testAppDownload', () => {
    it('constains download in the title', () => {
        render(<AppDownload />);
        const heading = screen.getByText(/Download/i)
        expect(heading).toBeInTheDocument();
    })
    it('contain google store link', () => {
        render(<AppDownload/>);
        const googleImage = screen.getByAltText('Google Play');
        expect(googleImage).toBeInTheDocument();
    });

    it('contain apple store link', () => {
        render(<AppDownload/>);
        const appleImage = screen.getByAltText('Apple Store');
        expect(appleImage).toBeInTheDocument();
    });

})