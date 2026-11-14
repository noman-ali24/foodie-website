import { describe, it, expect } from 'vitest';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderAppRoutes } from '../utils/renderWithProviders.jsx';
import { useCartStore } from '../../src/store/useCartStore.js';
import { selectCartSummary } from '../../src/store/cartSelectors.js';

describe('Integration: Food Details Navigation, Cart Operations & Persistence', () => {
  it('navigates from MenuPage to FoodDetailsPage and displays full product details and related dishes', async () => {
    const user = userEvent.setup();
    renderAppRoutes({ initialEntries: ['/menu'] });

    const dishLink = screen.getByRole('link', {
      name: /smoky double smash burger/i,
    });
    await user.click(dishLink);

    expect(
      screen.getByRole('heading', {
        level: 1,
        name: /smoky double smash burger/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /related delicious dishes/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /crispy zinger crunch burger/i })
    ).toBeInTheDocument();
  });

  it('updates Navbar cart badge when adding items from FoodCard and FoodDetailsPage with quantity & instructions', async () => {
    const user = userEvent.setup();
    renderAppRoutes({ initialEntries: ['/menu'] });

    // Initial Navbar cart count is 0
    expect(
      screen.getByRole('button', { name: /shopping cart with 0 items/i })
    ).toBeInTheDocument();

    // Add 1 Smoky Double Smash Burger from MenuPage FoodCard
    const addBurgerBtn = screen.getByRole('button', {
      name: /add smoky double smash burger to cart/i,
    });
    await user.click(addBurgerBtn);

    expect(
      screen.getByRole('button', { name: /shopping cart with 1 items/i })
    ).toBeInTheDocument();

    // Navigate to Smoky Double Smash Burger details page
    await user.click(
      screen.getByRole('link', { name: /smoky double smash burger/i })
    );

    // Increase quantity to 3 (floor of 1 verified on decrease)
    const decreaseBtn = screen.getByRole('button', {
      name: /decrease quantity/i,
    });
    const increaseBtn = screen.getByRole('button', {
      name: /increase quantity/i,
    });
    expect(decreaseBtn).toBeDisabled();

    await user.click(increaseBtn);
    await user.click(increaseBtn);
    expect(decreaseBtn).not.toBeDisabled();

    // Add special instructions
    const instructionsInput = screen.getByLabelText(/special instructions/i);
    await user.type(instructionsInput, 'Extra smoky sauce');

    // Click Add to Cart (3 * 950 = Rs. 2,850)
    const detailAddBtn = screen.getByRole('button', {
      name: /add to cart • rs\. 2,850/i,
    });
    await user.click(detailAddBtn);

    // Total units in Navbar badge should now be 1 + 3 = 4 across 2 distinct lines
    expect(
      screen.getByRole('button', { name: /shopping cart with 4 items/i })
    ).toBeInTheDocument();

    const summary = selectCartSummary(useCartStore.getState());
    expect(summary.totalUnits).toBe(4);
    expect(summary.lineCount).toBe(2);

    // Programmatic store quantity update & line removal immediately sync with Navbar badge
    const customLine = summary.items.find(
      (i) => i.instructions === 'Extra smoky sauce'
    );
    act(() => {
      useCartStore.getState().updateQuantity(customLine.lineId, 5);
    });
    expect(
      screen.getByRole('button', { name: /shopping cart with 6 items/i })
    ).toBeInTheDocument();

    act(() => {
      useCartStore.getState().removeItem(customLine.lineId);
    });
    expect(
      screen.getByRole('button', { name: /shopping cart with 1 items/i })
    ).toBeInTheDocument();
  });

  it('persists cart items in localStorage and restores Navbar cart count after reload/remount', async () => {
    const user = userEvent.setup();
    const { unmount } = renderAppRoutes({ initialEntries: ['/menu'] });

    await user.click(
      screen.getByRole('button', {
        name: /add wood-fired pepperoni feast to cart/i,
      })
    );
    await user.click(
      screen.getByRole('button', {
        name: /add belgian molten lava cake to cart/i,
      })
    );

    expect(
      screen.getByRole('button', { name: /shopping cart with 2 items/i })
    ).toBeInTheDocument();

    // Unmount application, simulate fresh store memory & rehydrate from localStorage
    unmount();
    await act(async () => {
      await useCartStore.persist.rehydrate();
    });

    renderAppRoutes({ initialEntries: ['/'] });
    expect(
      screen.getByRole('button', { name: /shopping cart with 2 items/i })
    ).toBeInTheDocument();
  });

  it('handles invalid product URL gracefully with Dish Not Found EmptyState and Back to Menu navigation', async () => {
    const user = userEvent.setup();
    renderAppRoutes({ initialEntries: ['/menu/invalid-non-existent-dish-999'] });

    expect(
      screen.getByRole('heading', { name: /dish not found/i })
    ).toBeInTheDocument();

    const backBtns = screen.getAllByRole('button', { name: /back to menu/i });
    await user.click(backBtns[0]);

    expect(
      screen.getByRole('heading', { name: /discover your favorite food/i })
    ).toBeInTheDocument();
  });
});

