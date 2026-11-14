import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '../components/layout/MainLayout.jsx';
import HomePage from '../pages/HomePage.jsx';
import MenuPage from '../pages/MenuPage.jsx';
import FoodDetailsPage from '../pages/FoodDetailsPage.jsx';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="menu/:id" element={<FoodDetailsPage />} />
          <Route path="*" element={<HomePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
