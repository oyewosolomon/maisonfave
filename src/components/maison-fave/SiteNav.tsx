'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

import { maisonFaveNav } from '@/lib/data/maison-fave';
import Monogram from './Monogram';

/**
 * Overlays the hero photo while at the top of the page, then swaps to a solid
 * cream bar once the hero has scrolled away so the links stay readable.
 */
const SiteNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight - 120);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const onDark = !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 z-50 w-full transition-colors duration-500 ${
        scrolled ? 'bg-[#F6F1E9]/95 backdrop-blur-sm shadow-[0_1px_0_rgba(42,30,24,0.10)]' : 'bg-transparent'
      }`}
    >
      <div className="flex items-center justify-between gap-6 px-6 py-5 lg:px-[6vw]">
        {/* Brand */}
        <Link
          href="#top"
          className={`flex items-center gap-4 ${onDark ? 'text-white' : 'text-[#2A1E18]'}`}
        >
          <Monogram className="h-9 w-9 shrink-0 lg:h-11 lg:w-11" />
          <span className="font-playfair text-base tracking-[0.34em] lg:text-xl">
            MAISON FAVE
          </span>
        </Link>

        {/* Desktop menu */}
        <nav className="hidden items-center gap-8 xl:flex">
          {maisonFaveNav.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`font-lato text-[11px] uppercase tracking-[0.22em] transition-opacity hover:opacity-60 ${
                onDark ? 'text-white/90' : 'text-[#2A1E18]'
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link
            href="#contact"
            className={`hidden rounded-full border px-7 py-3 font-lato text-[11px] uppercase tracking-[0.22em] transition-colors md:inline-block ${
              onDark
                ? 'border-white/40 bg-[#4A1620]/80 text-white hover:bg-[#4A1620]'
                : 'border-[#4A1620] bg-[#4A1620] text-[#F6F1E9] hover:bg-[#6A2130]'
            }`}
          >
            Work with us
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            className={`xl:hidden ${onDark ? 'text-white' : 'text-[#2A1E18]'}`}
          >
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <nav className="border-t border-[#2A1E18]/10 bg-[#F6F1E9] px-6 py-6 xl:hidden">
          <ul className="flex flex-col gap-5">
            {maisonFaveNav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="font-lato text-[12px] uppercase tracking-[0.24em] text-[#2A1E18]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="inline-block rounded-full bg-[#4A1620] px-7 py-3 font-lato text-[11px] uppercase tracking-[0.22em] text-[#F6F1E9]"
              >
                Work with us
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
};

export default SiteNav;
