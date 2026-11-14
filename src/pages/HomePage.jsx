import HeroSection from '../features/hero/HeroSection.jsx';
import ServicesSection from '../features/services/ServicesSection.jsx';
import CategoriesSection from '../features/categories/CategoriesSection.jsx';
import PopularMenuSection from '../features/menu/PopularMenuSection.jsx';
import TestimonialsSection from '../features/testimonials/TestimonialsSection.jsx';
import AppPromotionSection from '../features/app-promotion/AppPromotionSection.jsx';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <CategoriesSection />
      <PopularMenuSection />
      <TestimonialsSection />
      <AppPromotionSection />
    </>
  );
}

