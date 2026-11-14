import { Link } from 'react-router-dom';
import {
  Smartphone,
  ArrowRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer.jsx';
import AppButton from '../../components/shared/AppButton.jsx';
import AppPromotionVisual from './AppPromotionVisual.jsx';

const APP_HIGHLIGHTS = [
  'Browse curated categories & daily specials effortlessly',
  'Customize your meal and quantities in seconds',
  'Enjoy hot, freshly prepared dishes at your doorstep',
];

export default function AppPromotionSection() {
  return (
    <section
      id="download-app"
      aria-labelledby="app-promo-heading"
      className="py-16 sm:py-20 lg:py-24 bg-surface"
    >
      <PageContainer>
        <div className="relative overflow-hidden rounded-3xl sm:rounded-[2.5rem] bg-gradient-to-br from-cream-strong via-cream to-primary/20 border border-primary/40 px-6 py-12 sm:px-10 sm:py-14 lg:px-16 lg:py-16 shadow-[var(--shadow-card)]">
          {/* Decorative Warm Accent Circles */}
          <div
            aria-hidden="true"
            className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-primary/20 blur-2xl pointer-events-none"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-secondary/15 blur-2xl pointer-events-none"
          />

          <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            {/* Left Column: Text & CTAs */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Eyebrow Pill */}
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface/90 border border-primary/40 text-secondary font-heading font-semibold text-xs uppercase tracking-wider shadow-2xs">
                <Sparkles className="w-3.5 h-3.5" />
                ORDER ANYTIME, ANYWHERE
              </span>

              {/* Main Heading */}
              <h2
                id="app-promo-heading"
                className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-dark tracking-tight leading-tight"
              >
                Get Your Favorite Food{' '}
                <span className="text-secondary">Delivered Faster</span>
              </h2>

              {/* Supporting Description */}
              <p className="text-sm sm:text-base lg:text-lg text-body max-w-xl mx-auto lg:mx-0 leading-relaxed">
                Enjoy a seamless food ordering experience. Discover delicious meals, place your order easily, and get fresh food delivered right to your doorstep.
              </p>

              {/* Key Highlights */}
              <ul className="space-y-2.5 max-w-lg mx-auto lg:mx-0 text-left">
                {APP_HIGHLIGHTS.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-sm font-medium text-dark"
                  >
                    <CheckCircle2 className="w-4 h-4 text-secondary shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Primary & Secondary CTAs */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                <AppButton
                  type="button"
                  variant="dark"
                  size="lg"
                  startIcon={<Smartphone className="w-5 h-5 text-primary" />}
                >
                  Download App
                </AppButton>

                <AppButton
                  component={Link}
                  to="/menu"
                  variant="primary"
                  size="lg"
                  endIcon={<ArrowRight className="w-5 h-5" />}
                >
                  Explore Menu
                </AppButton>
              </div>
            </div>

            {/* Right Column: Mobile Phone Mockup Visual */}
            <div className="lg:col-span-5">
              <AppPromotionVisual />
            </div>
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

