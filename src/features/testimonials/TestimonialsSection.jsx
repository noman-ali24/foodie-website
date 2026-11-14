import PageContainer from '../../components/layout/PageContainer.jsx';
import SectionHeading from '../../components/shared/SectionHeading.jsx';
import TestimonialCard from './TestimonialCard.jsx';
import { TESTIMONIALS_DATA } from '../../data/testimonialsData.js';

export default function TestimonialsSection({
  testimonials = TESTIMONIALS_DATA,
}) {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="py-16 sm:py-20 lg:py-24 bg-cream/60 border-t border-border-warm"
    >
      <PageContainer className="space-y-12">
        <SectionHeading
          id="testimonials-heading"
          eyebrow="CUSTOMER LOVE"
          title="What Our"
          highlightedText="Customers Say"
          subtitle="Real experiences from food lovers who make us their favorite choice."
          align="center"
        />

        {/* Responsive Grid: 1 col mobile, 2 cols tablet, 3 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

