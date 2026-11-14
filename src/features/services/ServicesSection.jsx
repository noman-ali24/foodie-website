import PageContainer from '../../components/layout/PageContainer.jsx';
import SectionHeading from '../../components/shared/SectionHeading.jsx';
import ServiceCard from './ServiceCard.jsx';
import { SERVICES_DATA } from '../../data/servicesData.js';

export default function ServicesSection({ services = SERVICES_DATA }) {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-16 sm:py-20 lg:py-24 bg-surface"
    >
      <PageContainer className="space-y-12">
        <SectionHeading
          id="services-heading"
          eyebrow="WHAT WE SERVE"
          title="Your Favorite Food,"
          highlightedText="Delivered Your Way"
          subtitle="Fresh meals, fast delivery and a seamless ordering experience."
          align="center"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}

