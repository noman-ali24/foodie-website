import { test, expect } from '@playwright/test';

test.describe('Foodie Browser E2E Suite', () => {
  test('navigates from Homepage category card to filtered Menu, searches dishes, and views Food Details', async ({
    page,
  }) => {
    await page.goto('/');
    await expect(
      page.getByRole('heading', { name: /delicious food, delivered/i })
    ).toBeVisible();

    await page
      .getByRole('button', { name: /browse burgers category/i })
      .click();
    await expect(page).toHaveURL(/\/menu\?category=Burgers/);
    await expect(
      page.getByRole('tab', { name: 'Burgers' })
    ).toHaveAttribute('aria-selected', 'true');

    // Search within the Burgers category
    const searchInput = page.getByRole('textbox', {
      name: /search menu items/i,
    });
    await searchInput.fill('Zinger');
    await expect(
      page.getByRole('link', { name: 'Crispy Zinger Crunch Burger' })
    ).toBeVisible();
    await expect(
      page.getByRole('link', { name: 'Smoky Double Smash Burger' })
    ).toHaveCount(0);

    // Navigate to Food Details page
    await page
      .getByRole('link', { name: 'Crispy Zinger Crunch Burger' })
      .click();
    await expect(page).toHaveURL(/\/menu\/crispy-zinger-crunch-burger/);
    await expect(
      page.getByRole('heading', {
        level: 1,
        name: 'Crispy Zinger Crunch Burger',
      })
    ).toBeVisible();
  });

  test('adds items to cart, updates Navbar badge, and persists cart across real browser reload', async ({
    page,
  }) => {
    await page.goto('/menu/smoky-double-smash-burger');

    await page.getByRole('button', { name: /increase quantity/i }).click();
    await page
      .getByLabel(/special instructions/i)
      .fill('Extra cheese please');
    await page
      .getByRole('button', { name: /add to cart • rs\. 1,900/i })
      .click();

    await expect(
      page.getByRole('button', { name: /shopping cart with 2 items/i })
    ).toBeVisible();

    // Reload browser page and verify localStorage persistence
    await page.reload();
    await expect(
      page.getByRole('button', { name: /shopping cart with 2 items/i })
    ).toBeVisible();
  });

  test('displays Dish Not Found EmptyState for invalid product URL and navigates back to Menu', async ({
    page,
  }) => {
    await page.goto('/menu/non-existent-dish-id');
    await expect(
      page.getByRole('heading', { name: /dish not found/i })
    ).toBeVisible();

    await page
      .getByRole('button', { name: /back to menu/i })
      .first()
      .click();
    await expect(page).toHaveURL(/\/menu$/);
  });
});
