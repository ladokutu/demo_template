'use client';
import { useCmsData } from '@/src/hooks/useCmsData';
import Navbar       from '@/src/components/Navbar';
import Hero         from '@/src/components/Hero';
import Partners     from '@/src/components/Partners';
import Services     from '@/src/components/Services';
import HowWeWork    from '@/src/components/HowWeWork';
import Portfolio    from '@/src/components/Portfolio';
import Stats        from '@/src/components/Stats';
import Testimonials from '@/src/components/Testimonials';
import Tentang      from '@/src/components/Tentang';
import CTA          from '@/src/components/CTA';
import Contact      from '@/src/components/Contact';
import Footer       from '@/src/components/Footer';

export default function Home() {
  const { data: navLinks, loading: navLoading }                = useCmsData('nav_links');
  const { data: services, loading: servicesLoading }          = useCmsData('services');
  const { data: processSteps, loading: stepsLoading }         = useCmsData('process_steps');
  const { data: portfolioItems, loading: portfolioLoading }   = useCmsData('portfolio_items');
  const { data: stats, loading: statsLoading }                = useCmsData('stats');
  const { data: testimonials, loading: testimonialsLoading }  = useCmsData('testimonials');
  const { data: partners, loading: partnersLoading }          = useCmsData('partners');
  const { data: teamMembers, loading: teamLoading }           = useCmsData('team_members');

  return (
    <>
      <Navbar links={navLinks} loading={navLoading} />
      <main>
        <Hero />
        <Partners items={partners} loading={partnersLoading} />
        <Services items={services} loading={servicesLoading} />
        <HowWeWork steps={processSteps} loading={stepsLoading} />
        <Portfolio items={portfolioItems} loading={portfolioLoading} />
        <Stats items={stats} loading={statsLoading} />
        <Testimonials items={testimonials} loading={testimonialsLoading} />
        <Tentang teamMembers={teamMembers} loading={teamLoading} />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
