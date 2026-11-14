import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import {
  Flame,
  Search,
  ArrowRight,
  ShoppingBag,
  Star,
  Clock,
  CheckCircle2,
} from 'lucide-react';
import PageContainer from '../../components/layout/PageContainer.jsx';
import AppButton from '../../components/shared/AppButton.jsx';
import AppInput from '../../components/shared/AppInput.jsx';
import HeroVisual from './HeroVisual.jsx';

const POPULAR_TAGS = [
  'Smash Burger',
  'Pepperoni Pizza',
  'Loaded Fries',
  'Dum Biryani',
];

const CUSTOMER_AVATARS = [
  {
    name: 'Ayesha K.',
    src: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=120&q=80',
  },
  {
    name: 'Usman R.',
    src: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
  },
  {
    name: 'Sara M.',
    src: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=120&q=80',
  },
  {
    name: 'Bilal A.',
    src: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
  },
];

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      navigate(`/menu?search=${encodeURIComponent(trimmed)}`);
    } else {
      navigate('/menu');
    }
  };

  const handleQuickTagClick = (tag) => {
    setSearchQuery(tag);
    navigate(`/menu?search=${encodeURIComponent(tag)}`);
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-cream via-cream/60 to-surface pt-8 pb-16 sm:py-16 lg:py-20 border-b border-border-warm">
      <PageContainer>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Copy, Search & CTAs */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            {/* Promotional Eyebrow Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cream-strong border border-primary/40 shadow-2xs">
              <span className="w-6 h-6 rounded-full bg-secondary text-white flex items-center justify-center">
                <Flame className="w-3.5 h-3.5 fill-white" />
              </span>
              <span className="font-heading text-xs font-bold uppercase tracking-wider text-dark">
                Fast Delivery • Hot &amp; Fresh
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-heading text-4xl sm:text-5xl xl:text-6xl font-extrabold text-dark tracking-tight leading-[1.12]">
              Delicious Food,{' '}
              <span className="text-secondary underline decoration-primary decoration-4 underline-offset-8">
                Delivered
              </span>{' '}
              To Your Door.
            </h1>

            {/* Supporting Description */}
            <p className="text-base sm:text-lg text-body max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Craving flame-grilled smash burgers, artisan wood-fired pizzas, or sizzling loaded bowls? Order from top local chefs and enjoy restaurant-grade meals in under 30 minutes.
            </p>

            {/* Frontend Search Bar */}
            <form
              onSubmit={handleSearchSubmit}
              className="max-w-xl mx-auto lg:mx-0 pt-1"
              role="search"
              aria-label="Search food items"
            >
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 bg-surface p-2 rounded-2xl sm:rounded-full border border-border-warm shadow-[var(--shadow-card)] focus-within:border-primary transition-colors">
                <div className="flex-1">
                  <AppInput
                    name="heroSearch"
                    ariaLabel="Search food items"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search burgers, pizza, biryani, desserts..."
                    size="small"
                    startIcon={<Search className="w-5 h-5 text-secondary" />}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '9999px',
                        backgroundColor: 'transparent',
                        '& .MuiOutlinedInput-notchedOutline': {
                          border: 'none',
                        },
                        '&.Mui-focused': {
                          boxShadow: 'none',
                        },
                      },
                    }}
                  />
                </div>
                <AppButton
                  type="submit"
                  variant="primary"
                  size="md"
                  className="shrink-0 sm:px-7"
                >
                  Find Food
                </AppButton>
              </div>

              {/* Popular Quick Search Tags */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mt-3 text-xs">
                <span className="font-semibold text-muted">Popular:</span>
                {POPULAR_TAGS.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleQuickTagClick(tag)}
                    className="px-2.5 py-1 rounded-full bg-surface border border-border-warm text-body hover:text-dark hover:border-primary hover:bg-cream transition-colors cursor-pointer font-medium"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </form>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
              <AppButton
                component={Link}
                to="/menu"
                variant="secondary"
                size="lg"
                endIcon={<ArrowRight className="w-5 h-5" />}
              >
                Explore Menu
              </AppButton>

              <AppButton
                component={Link}
                to="/menu"
                variant="outline"
                size="lg"
                startIcon={<ShoppingBag className="w-5 h-5 text-secondary" />}
              >
                Order Now
              </AppButton>
            </div>

            {/* Trust Indicators & Happy Customers */}
            <div className="pt-4 border-t border-border-warm flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6">
              <div className="flex items-center gap-3">
                <AvatarGroup
                  max={4}
                  sx={{
                    '& .MuiAvatar-root': {
                      width: 38,
                      height: 38,
                      border: '2px solid #FFFFFF',
                      fontSize: '0.85rem',
                    },
                  }}
                >
                  {CUSTOMER_AVATARS.map((person) => (
                    <Avatar
                      key={person.name}
                      alt={person.name}
                      src={person.src}
                    />
                  ))}
                </AvatarGroup>
                <div className="text-left">
                  <p className="font-heading text-sm font-bold text-dark">
                    15,000+ Happy Foodies
                  </p>
                  <div className="flex items-center gap-1 text-xs text-body">
                    <Star className="w-3.5 h-3.5 fill-primary text-primary" />
                    <span className="font-bold text-dark">4.9</span>
                    <span>(2.4k+ reviews)</span>
                  </div>
                </div>
              </div>

              <div className="hidden sm:block h-8 w-px bg-border-warm" />

              <div className="flex items-center gap-4 text-xs font-semibold text-dark">
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-secondary" />
                  30-Min Delivery
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  No Minimum Order
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5">
            <HeroVisual />
          </div>
        </div>
      </PageContainer>
    </section>
  );
}

