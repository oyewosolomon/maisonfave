import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const WorkWithUs = () => (
  <section
    id="contact"
    className="relative w-full scroll-mt-24 overflow-hidden bg-[#4A1620] px-6 py-14 lg:px-[6vw] lg:py-16"
  >
    {/* Soft off-centre bloom keeps the flat burgundy from reading as a solid slab. */}
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 opacity-70"
      style={{
        background:
          'radial-gradient(120% 90% at 18% 20%, rgba(122,38,52,0.85) 0%, rgba(74,22,32,0) 60%)',
      }}
    />

    <div className="relative flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-14">
      <div className="lg:w-[26rem]">
        <p className="font-playfair text-2xl tracking-[0.3em] text-[#F3E9DC] lg:text-[1.75rem]">
          MAISON FAVE
        </p>
        <p className="mt-5 font-lato text-[10px] uppercase leading-[2] tracking-[0.24em] text-[#DCC3BC]">
          A creative house for
          <br />a more beautiful tomorrow.
        </p>
      </div>

      <div className="hidden h-24 w-px shrink-0 bg-[#F3E9DC]/25 lg:block" />

      <p className="flex-1 font-playfair text-2xl italic leading-snug text-[#F3E9DC] lg:text-[2rem]">
        Ideas travel.
        <br />
        Experiences stay.
      </p>

      <Link
        href="https://weddingsbymaisonfave.com/#plan-your-wedding"
        className="inline-flex shrink-0 items-center gap-4 rounded-full border border-[#F3E9DC]/40 px-8 py-4 font-lato text-[11px] uppercase tracking-[0.24em] text-[#F3E9DC] transition-colors hover:bg-[#F3E9DC] hover:text-[#4A1620]"
      >
        Work with us
        <ArrowRight className="h-4 w-4" />
      </Link>
    </div>
  </section>
);

export default WorkWithUs;
