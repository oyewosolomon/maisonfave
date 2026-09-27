import { BookingProvider } from '@/components/maison-fave/BookingProvider';
import SiteNav from '@/components/maison-fave/SiteNav';
import Hero from '@/components/maison-fave/Hero';
import WhatWeDo from '@/components/maison-fave/WhatWeDo';
import CreativeHouse from '@/components/maison-fave/CreativeHouse';
import OurBrands from '@/components/maison-fave/OurBrands';
import WorkWithUs from '@/components/maison-fave/WorkWithUs';
import SiteFooter from '@/components/maison-fave/SiteFooter';

export default function HomePage() {
  return (
    <BookingProvider>
      <div className="bg-[#F6F1E9]">
        <SiteNav />
        <main>
          <Hero />
          <WhatWeDo />
          <CreativeHouse />
          <OurBrands />
          <WorkWithUs />
        </main>
        <SiteFooter />
      </div>
    </BookingProvider>
  );
}
