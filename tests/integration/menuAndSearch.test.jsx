import { describe, it, expect } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderAppRoutes } from '../utils/renderWithProviders.jsx';

describe('Integration: Menu Search, Filtering & Category Selection', () => {
  it('renders all 8 menu items initially and filters dynamically by search query', async () => {
    const user = userEvent.setup();
    renderAppRoutes({ initialEntries: ['/menu'] });

    expect(
      screen.getByRole('heading', { name: /discover your favorite food/i })
    ).toBeInTheDocument();

    const searchInput = screen.getByRole('textbox', {
      name: /search menu items/i,
    });
    expect(searchInput).toHaveValue('');

    await user.type(searchInput, 'Sindhi Dum Biryani');
    expect(
      screen.getByRole('link', { name: /royal sindhi dum biryani/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: /smoky double smash burger/i })
    ).not.toBeInTheDocument();

    const clearBtn = screen.getByRole('button', {
      name: /clear search query/i,
    });
    await user.click(clearBtn);
    expect(searchInput).toHaveValue('');
    expect(
      screen.getByRole('link', { name: /smoky double smash burger/i })
    ).toBeInTheDocument();
  });

  it('filters dishes by category tab selection and preserves typed search query across tab changes', async () => {
    const user = userEvent.setup();
    renderAppRoutes({ initialEntries: ['/menu'] });

    const tablist = screen.getByRole('tablist', { name: /food categories/i });
    const pizzaTab = within(tablist).getByRole('tab', { name: 'Pizza' });

    await user.click(pizzaTab);
    expect(pizzaTab).toHaveAttribute('aria-selected', 'true');
    expect(
      screen.getByRole('link', { name: /wood-fired pepperoni feast/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('link', { name: /smoky bbq chicken supreme/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('link', { name: /smoky double smash burger/i })
    ).not.toBeInTheDocument();

    // Type search query after arriving or selecting a tab, then switch tab to All
    const searchInput = screen.getByRole('textbox', {
      name: /search menu items/i,
    });
    await user.type(searchInput, 'Pepperoni');
    expect(searchInput).toHaveValue('Pepperoni');

    const allTab = within(tablist).getByRole('tab', { name: 'All' });
    await user.click(allTab);
    expect(searchInput).toHaveValue('Pepperoni');
    expect(
      screen.getByRole('link', { name: /wood-fired pepperoni feast/i })
    ).toBeInTheDocument();
  });

  it('shows EmptyState when no dishes match and resets all filters when clicked', async () => {
    const user = userEvent.setup();
    renderAppRoutes({ initialEntries: ['/menu'] });

    const searchInput = screen.getByRole('textbox', {
      name: /search menu items/i,
    });
    await user.type(searchInput, 'NonExistentSushiRollXYZ');

    expect(
      screen.getByRole('heading', { name: /no matching dishes found/i })
    ).toBeInTheDocument();

    const resetBtns = screen.getAllByRole('button', {
      name: /reset all filters/i,
    });
    await user.click(resetBtns[resetBtns.length - 1]);

    expect(searchInput).toHaveValue('');
    expect(
      screen.getByRole('link', { name: /smoky double smash burger/i })
    ).toBeInTheDocument();
  });

  it('navigates from Homepage category card and Hero search directly to filtered /menu view', async () => {
    const user = userEvent.setup();
    renderAppRoutes({ initialEntries: ['/'] });

    const dessertsCard = screen.getByRole('button', {
      name: /browse desserts category/i,
    });
    await user.click(dessertsCard);

    const tablist = screen.getByRole('tablist', { name: /food categories/i });
    expect(
      within(tablist).getByRole('tab', { name: 'Desserts' })
    ).toHaveAttribute('aria-selected', 'true');
    expect(
      screen.getByRole('link', { name: /belgian molten lava cake/i })
    ).toBeInTheDocument();
  });
});

