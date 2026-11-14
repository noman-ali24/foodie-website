import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import muiTheme from '../../src/theme/muiTheme.js';
import MainLayout from '../../src/components/layout/MainLayout.jsx';
import HomePage from '../../src/pages/HomePage.jsx';
import MenuPage from '../../src/pages/MenuPage.jsx';
import FoodDetailsPage from '../../src/pages/FoodDetailsPage.jsx';

export function renderWithProviders(
  ui,
  { initialEntries = ['/'], ...renderOptions } = {}
) {
  function Wrapper({ children }) {
    return (
      <ThemeProvider theme={muiTheme}>
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      </ThemeProvider>
    );
  }

  return render(ui, { wrapper: Wrapper, ...renderOptions });
}

export function renderAppRoutes({ initialEntries = ['/'] } = {}) {
  return render(
    <ThemeProvider theme={muiTheme}>
      <MemoryRouter initialEntries={initialEntries}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/menu" element={<MenuPage />} />
            <Route path="/menu/:id" element={<FoodDetailsPage />} />
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
      </MemoryRouter>
    </ThemeProvider>
  );
}

