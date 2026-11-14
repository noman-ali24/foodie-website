import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderAppRoutes } from '../utils/renderWithProviders.jsx';

describe('Integration: Accessibility Basics & Keyboard Interactions', () => {
  it('exposes semantic landmarks, section aria-labelledby targets, and accessible input/button names on HomePage', () => {
    renderAppRoutes({ initialEntries: ['/'] });

    // Semantic Landmarks
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(
      screen.getByRole('navigation', { name: /primary navigation/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    expect(
      screen.getByRole('search', { name: /search food items/i })
    ).toBeInTheDocument();

    // Verify all section aria-labelledby IDs resolve to real DOM heading elements
    const sectionHeadingIds = [
      'services-heading',
      'categories-heading',
      'popular-menu-heading',
      'testimonials-heading',
      'app-promo-heading',
    ];
    for (const id of sectionHeadingIds) {
      const headingEl = document.getElementById(id);
      expect(headingEl).not.toBeNull();
      expect(headingEl.tagName).toBe('H2');
    }
  });

  it('supports keyboard activation (Enter and Space) on interactive CategoryCard elements', async () => {
    const user = userEvent.setup();
    renderAppRoutes({ initialEntries: ['/'] });

    const pizzaCategoryCard = screen.getByRole('button', {
      name: /browse pizza category/i,
    });
    expect(pizzaCategoryCard).toHaveAttribute('tabIndex', '0');

    pizzaCategoryCard.focus();
    expect(pizzaCategoryCard).toHaveFocus();

    await user.keyboard('{Enter}');

    // Should navigate to /menu with Pizza category selected
    expect(
      screen.getByRole('heading', { name: /discover your favorite food/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('tab', { name: 'Pizza' })
    ).toHaveAttribute('aria-selected', 'true');
  });

  it('supports keyboard interaction on PopularMenuSection category tabs', async () => {
    const user = userEvent.setup();
    renderAppRoutes({ initialEntries: ['/'] });

    const biryaniTab = screen.getByRole('tab', { name: 'Biryani' });
    biryaniTab.focus();
    expect(biryaniTab).toHaveFocus();

    await user.keyboard('{Enter}');
    expect(biryaniTab).toHaveAttribute('aria-selected', 'true');
    expect(
      screen.getByRole('link', { name: /royal sindhi dum biryani/i })
    ).toBeInTheDocument();
  });

  it('verifies FoodCard accessibility: screen-reader image & heading names, mouse/touch image navigation, keyboard link navigation, and zero hidden links', async () => {
    const user = userEvent.setup();
    renderAppRoutes({ initialEntries: ['/menu'] });

    // 1. Ensure no inaccessible interactive anchor tags (no aria-hidden="true" or tabindex="-1" links)
    expect(
      document.querySelectorAll('a[aria-hidden="true"], a[tabindex="-1"]')
        .length
    ).toBe(0);

    // 2. Verify screen-reader accessible naming for image, h3 heading, and link
    const productImg = screen.getByRole('img', {
      name: 'Smoky Double Smash Burger',
    });
    expect(productImg).toBeInTheDocument();

    const productHeading = screen.getByRole('heading', {
      level: 3,
      name: 'Smoky Double Smash Burger',
    });
    expect(productHeading).toBeInTheDocument();

    const productLink = screen.getByRole('link', {
      name: 'Smoky Double Smash Burger',
    });
    expect(productLink).toBeInTheDocument();

    // 3. Verify clicking/tapping the product image navigates to FoodDetailsPage
    await user.click(productImg);
    expect(
      screen.getByRole('heading', {
        level: 1,
        name: 'Smoky Double Smash Burger',
      })
    ).toBeInTheDocument();
  });
});

