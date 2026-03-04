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
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Partners />
        <Services />
        <HowWeWork />
        <Portfolio />
        <Stats />
        <Testimonials />
        <Tentang />
        <CTA />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
