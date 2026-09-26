import Link from 'next/link';
import { FaInstagram, FaLinkedinIn, FaPinterestP, FaYoutube } from 'react-icons/fa';

import { maisonFaveNav, maisonFaveSocials } from '@/lib/data/maison-fave';

const socialIcons = {
  instagram: FaInstagram,
  pinterest: FaPinterestP,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
};

const SiteFooter = () => (
  <footer className="w-full bg-[#F6F1E9] px-6 py-9 lg:px-[6vw]">
    <div className="flex flex-col items-center gap-8 lg:flex-row lg:justify-between lg:gap-10">
      <nav className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
        {maisonFaveNav.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="font-lato text-[10px] uppercase tracking-[0.22em] text-[#2A1E18] transition-opacity hover:opacity-60"
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className="flex items-center gap-8 lg:gap-10">
        <ul className="flex items-center gap-5">
          {maisonFaveSocials.map((social) => {
            const Icon = socialIcons[social.icon];
            return (
              <li key={social.label}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="text-[#2A1E18] transition-opacity hover:opacity-60"
                >
                  <Icon className="h-4 w-4" />
                </a>
              </li>
            );
          })}
        </ul>

        <div className="hidden h-6 w-px bg-[#2A1E18]/20 lg:block" />

        <p className="font-lato text-[10px] uppercase tracking-[0.22em] text-[#5C4C41]">
          Lagos <span className="mx-1.5">&bull;</span> Paris <span className="mx-1.5">&bull;</span> and beyond
        </p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
