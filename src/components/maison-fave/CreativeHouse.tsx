import Image from 'next/image';

import { maisonFaveImages, maisonFaveStats } from '@/lib/data/maison-fave';

const CreativeHouse = () => (
  <section id="about" className="w-full scroll-mt-24 bg-[#2B2C21]">
    <div className="grid grid-cols-1 lg:grid-cols-[22%_1fr]">
      {/* Photo sliver */}
      <div className="relative h-56 w-full sm:h-72 lg:h-auto lg:min-h-[22rem]">
        <Image
          src={maisonFaveImages.creativeHouse.src}
          alt={maisonFaveImages.creativeHouse.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 22vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#2B2C21]/25" />
      </div>

      <div className="grid grid-cols-1 gap-10 px-6 py-14 lg:grid-cols-[1fr_1fr_16rem] lg:gap-12 lg:px-14 lg:py-16">
        <div>
          <p className="font-lato text-[11px] uppercase tracking-[0.3em] text-[#B6AE93]">
            The creative house
          </p>
          <h2 className="mt-6 font-playfair text-3xl uppercase leading-[1.2] text-[#F3EEE2] sm:text-4xl lg:text-[2.5rem]">
            One vision.
            <br />
            Many possibilities.
          </h2>
        </div>

        <div className="lg:pt-1">
          <p className="font-lato text-sm leading-relaxed text-[#DCD6C6]">
            For five years, we&apos;ve built, created and executed across different
            disciplines, working with 100+ clients in several countries. Our strength is the
            ability to see potential, build intentionally and create experiences people
            connect with.
          </p>
          <div className="mt-7 h-px w-14 bg-[#B6AE93]/60" />
          <p className="mt-6 font-playfair text-xl italic leading-snug text-[#F3EEE2] lg:text-2xl">
            Different occasions.
            <br />
            The same intention.
          </p>
        </div>

        {/* Stats */}
        <dl className="flex flex-row flex-wrap gap-8 border-t border-[#B6AE93]/30 pt-8 lg:flex-col lg:gap-9 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-1">
          {maisonFaveStats.map((stat) => (
            <div key={stat.label}>
              <dt className="font-playfair text-2xl uppercase leading-none text-[#F3EEE2] lg:text-[1.9rem]">
                {stat.value}
              </dt>
              <dd className="mt-2.5 font-lato text-[10px] uppercase tracking-[0.24em] text-[#B6AE93]">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  </section>
);

export default CreativeHouse;
