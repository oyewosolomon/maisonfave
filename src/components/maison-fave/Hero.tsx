import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

import { maisonFaveImages } from '@/lib/data/maison-fave';

const rail = ['People', 'Places', 'Culture', 'Experiences', 'Always', 'intentional.'];

const Hero = () => (
  <section id="top" className="relative min-h-[100svh] w-full overflow-hidden bg-[#2A1E18]">
    <Image
      src={maisonFaveImages.hero.src}
      alt={maisonFaveImages.hero.alt}
      fill
      priority
      sizes="100vw"
      className="object-cover object-[55%_50%]"
    />
    {/* Warm scrim: heavier on the left so the headline keeps its contrast. */}
    <div className="absolute inset-0 bg-gradient-to-r from-[#1B120E]/90 via-[#1B120E]/65 to-[#1B120E]/35" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#1B120E]/80 via-transparent to-[#1B120E]/50" />

    {/* The design keeps a narrow gutter that tracks the viewport rather than a
        centred max-width, so the headline stays hard against the left edge on
        wide screens. */}
    <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-6 pb-16 pt-36 lg:px-[6vw] lg:pb-20 lg:pt-44">
      <div className="flex flex-1 items-center">
        <div className="max-w-3xl">
          <p className="font-lato text-[11px] uppercase tracking-[0.34em] text-[#E7D9C6]">
            A creative house
          </p>

          {/* Sized so "without borders." still holds its own line on a phone. */}
          <h1 className="mt-7 font-playfair text-[2.05rem] uppercase leading-[1.08] tracking-[0.01em] text-white sm:text-5xl lg:text-[5.2rem]">
            Spaces,
            <br />
            stories and
            <br />
            experiences
            <br />
            without borders.
          </h1>

          <p className="mt-8 max-w-xl font-lato text-sm leading-relaxed text-white/80 lg:text-[0.95rem]">
            Maison Fave is a multidisciplinary creative house curating events, transforming
            spaces and bringing ideas to life — from the most intimate gatherings to
            large-scale celebrations, destination events and productions.
          </p>

          <Link
            href="#what-we-do"
            className="mt-10 inline-flex items-center gap-4 border border-white/50 px-8 py-4 font-lato text-[11px] uppercase tracking-[0.24em] text-white transition-colors hover:bg-white hover:text-[#2A1E18]"
          >
            Explore our world
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <p className="font-lato text-[10px] uppercase leading-[2] tracking-[0.28em] text-white/70 lg:text-[11px]">
        Nothing generic.
        <br />
        Everything considered.
      </p>
    </div>

    {/* Right rail. The word list and the sign-off share one column pinned to
        the gutter, so the sign-off's text lines up with the rail words above it
        — the hairline's width plus the gap is what the padding offsets. */}
    <div className="absolute bottom-20 right-[6vw] top-[24%] z-10 hidden flex-col items-start justify-between lg:flex">
      <div className="flex items-start gap-5">
        <div className="mt-1 h-40 w-px bg-white/30" />
        <ul className="font-lato text-[10px] uppercase leading-[2.1] tracking-[0.28em] text-white/75">
          {rail.map((word) => (
            <li key={word}>{word}</li>
          ))}
        </ul>
      </div>

      <p className="pl-[21px] font-lato text-[10px] uppercase leading-[2] tracking-[0.28em] text-white/70">
        A more
        <br />
        beautiful
        <br />
        tomorrow.
      </p>
    </div>
  </section>
);

export default Hero;
