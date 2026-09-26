'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';

import { maisonFaveBrands } from '@/lib/data/maison-fave';

const OurBrands = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  // The row is a three-up grid on desktop and a snapping scroller below it;
  // the arrows page it by one card, measured off the first card so the step
  // stays right whatever the breakpoint.
  const scrollByCard = (direction: -1 | 1) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 24 : track.clientWidth;
    track.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  return (
    <section id="our-brands" className="w-full scroll-mt-24 bg-[#F6F1E9] px-6 py-16 lg:px-[6vw] lg:py-20">
      <div>
        <div className="grid grid-cols-1 px-5 lg:px-10 items-end gap-8 lg:grid-cols-[1fr_28rem_auto] lg:gap-12">
          <div>
            <p className="font-lato text-[11px] uppercase tracking-[0.3em] text-[#8A7361]">
              The Maison Fave house
            </p>
            <h2 className="mt-6 font-playfair text-3xl uppercase leading-[1.18] text-[#2A1E18] sm:text-4xl lg:text-[2.9rem]">
              Our brands.
              <br />
              Different expressions.
            </h2>
          </div>

          <p className="font-lato text-sm leading-relaxed text-[#5C4C41]">
            Each brand is a reflection of the same creative instinct — intentionality,
            excellence and unforgettable experiences.
          </p>

          <div className="flex gap-5 lg:pb-2">
            <button
              type="button"
              onClick={() => scrollByCard(-1)}
              aria-label="Previous brand"
              className="text-[#2A1E18] transition-opacity hover:opacity-50"
            >
              <ArrowLeft className="h-5 w-5" strokeWidth={1.25} />
            </button>
            <button
              type="button"
              onClick={() => scrollByCard(1)}
              aria-label="Next brand"
              className="text-[#2A1E18] transition-opacity hover:opacity-50"
            >
              <ArrowRight className="h-5 w-5" strokeWidth={1.25} />
            </button>
          </div>
        </div>

        <div
          ref={trackRef}
          className="mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:grid lg:grid-cols-3 lg:overflow-visible"
        >
          {maisonFaveBrands.map((brand) => (
            <article
              key={brand.name}
              className="flex w-[82vw] shrink-0 snap-start flex-col sm:w-[60vw] lg:w-auto"
            >
              <div className="relative h-64 w-full lg:h-72">
                <Image
                  src={brand.image.src}
                  alt={brand.image.alt}
                  fill
                  sizes="(max-width: 1024px) 82vw, 30vw"
                  className="object-cover"
                />
              </div>

              <div className="flex flex-1 flex-col border border-t-0 border-[#2A1E18]/15 bg-[#FBF8F3] px-7 py-8">
                <h3 className="whitespace-pre-line font-playfair text-[0.95rem] uppercase leading-[1.7] tracking-[0.2em] text-[#2A1E18]">
                  {brand.name}
                </h3>
                <p className="mt-5 flex-1 font-lato text-sm leading-relaxed text-[#5C4C41]">
                  {brand.description}
                </p>
                <Link
                  href={brand.href}
                  className="mt-8 inline-flex items-center gap-3 font-lato text-[10px] uppercase tracking-[0.24em] text-[#2A1E18] transition-opacity hover:opacity-60"
                >
                  Explore
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.5} />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurBrands;
