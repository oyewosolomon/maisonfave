import Image from 'next/image';
import { Flower2, Gift, Heart, Sparkles } from 'lucide-react';

import { maisonFaveDisciplines, maisonFaveImages } from '@/lib/data/maison-fave';

const icons = {
  sparkles: Sparkles,
  heart: Heart,
  flower: Flower2,
  gift: Gift,
};

const WhatWeDo = () => (
  <section id="what-we-do" className="w-full scroll-mt-24 bg-[#F6F1E9]">
    <div className="grid grid-cols-1 lg:grid-cols-[38%_1fr]">
      {/* Photo panel */}
      <div className="relative h-72 w-full sm:h-96 lg:h-auto lg:min-h-[32rem]">
        <Image
          src={maisonFaveImages.whatWeDo.src}
          alt={maisonFaveImages.whatWeDo.alt}
          fill
          sizes="(max-width: 1024px) 100vw, 38vw"
          className="object-cover"
        />
      </div>

      {/* Copy panel */}
      <div className="flex flex-col justify-between px-6 py-14 lg:px-12 lg:py-16">
        {/* The headline column has to stay wide enough that "Meaningful
            experiences." holds its own line, as the design has it. */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_17rem] lg:gap-12">
          <div>
            <p className="font-lato text-[11px] uppercase tracking-[0.3em] text-[#8A7361]">
              What we do
            </p>
            <h2 className="mt-6 font-playfair text-[1.75rem] uppercase leading-[1.18] text-[#2A1E18] sm:text-4xl lg:text-[2rem] xl:text-[2.2rem]">
              Curated events.
              <br />
              Transformed spaces.
              <br />
              Meaningful experiences.
            </h2>
          </div>

          <p className="font-lato text-sm leading-relaxed text-[#5C4C41] lg:pt-2">
            We provide end-to-end event planning, design, styling, creative direction and
            spatial transformation — taking ideas from concept to experience. Whether it&apos;s
            a private celebration, a destination wedding, a brand event or an interior
            project, we bring the same thoughtful, detail-driven approach.
          </p>
        </div>

        {/* Disciplines */}
        <ul className="mt-14 grid grid-cols-2 border-t border-[#2A1E18]/15 pt-10 lg:grid-cols-4">
          {maisonFaveDisciplines.map((discipline, index) => {
            const Icon = icons[discipline.icon];
            return (
              <li
                key={discipline.label}
                className={`flex flex-col items-center gap-4 px-3 py-6 text-center lg:py-0 ${
                  index > 0 ? 'lg:border-l lg:border-[#2A1E18]/15' : ''
                } ${index % 2 === 1 ? 'border-l border-[#2A1E18]/15 lg:border-l' : ''}`}
              >
                <Icon className="h-7 w-7 text-[#2A1E18]" strokeWidth={1} />
                <span className="whitespace-pre-line font-lato text-[10px] uppercase leading-[1.9] tracking-[0.2em] text-[#2A1E18]">
                  {discipline.label}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  </section>
);

export default WhatWeDo;
