import { Link } from 'react-router-dom';
import {
  UtensilsCrossed,
  MapPin,
  Phone,
  Mail,
  Clock,
  Globe,
  Share2,
  MessageCircle,
  Sparkles,
} from 'lucide-react';
import PageContainer from './PageContainer.jsx';

const QUICK_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Full Menu', to: '/menu' },
  { label: 'Shopping Cart', to: '/cart' },
  { label: 'Sign In', to: '/login' },
  { label: 'Create Account', to: '/signup' },
];

const COMPANY_LINKS = [
  { label: 'Our Services', href: '/#services' },
  { label: 'Popular Categories', href: '/#categories' },
  { label: 'Customer Reviews', href: '/#testimonials' },
  { label: 'Mobile App', href: '/#download-app' },
];

const SOCIAL_LINKS = [
  { label: 'Website', icon: Globe, href: '#website' },
  { label: 'Community', icon: MessageCircle, href: '#community' },
  { label: 'Share', icon: Share2, href: '#share' },
  { label: 'Highlights', icon: Sparkles, href: '#highlights' },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-cream border-t border-border-warm pt-16 pb-10 text-body">
      <PageContainer>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-border-warm">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" className="inline-flex items-center gap-2.5">
              <div className="w-11 h-11 rounded-2xl bg-primary flex items-center justify-center text-dark shadow-xs">
                <UtensilsCrossed className="w-5 h-5" />
              </div>
              <span className="font-heading text-2xl font-extrabold text-dark tracking-tight">
                Fast<span className="text-secondary">Food</span>
              </span>
            </Link>

            <p className="text-sm text-body leading-relaxed max-w-sm">
              Freshly prepared gourmet burgers, wood-fired pizzas, bowls, and desserts delivered piping hot to your doorstep in 30 minutes or less.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-2.5 pt-1">
              {SOCIAL_LINKS.map((item) => {
                const IconComponent = item.icon;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    aria-label={item.label}
                    className="w-10 h-10 rounded-full bg-surface border border-border-warm flex items-center justify-center text-dark hover:bg-primary hover:border-primary transition-colors shadow-2xs"
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="lg:col-span-2 space-y-3.5">
            <h3 className="font-heading text-base font-bold text-dark">
              Quick Links
            </h3>
            <ul className="space-y-2.5 text-sm">
              {QUICK_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore Sections */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="font-heading text-base font-bold text-dark">
              Explore FastFood
            </h3>
            <ul className="space-y-2.5 text-sm">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hover:text-secondary transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Hours */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="font-heading text-base font-bold text-dark">
              Get in Touch
            </h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-secondary shrink-0 mt-1" />
                <span>742 Culinary Avenue, Downtown Food District, NY 10001</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-secondary shrink-0" />
                <span>+1 (800) 555-0199</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-secondary shrink-0" />
                <span>hello@fastfood-delivery.demo</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-secondary shrink-0" />
                <span>Daily: 10:00 AM – 11:30 PM</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted">
          <p>© {currentYear} FastFood Delivery. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#privacy" className="hover:text-dark transition-colors">
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-dark transition-colors">
              Terms of Service
            </a>
            <a href="#cookies" className="hover:text-dark transition-colors">
              Cookie Settings
            </a>
          </div>
        </div>
      </PageContainer>
    </footer>
  );
}
