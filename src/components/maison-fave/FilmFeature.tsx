'use client';

import { useEffect, useRef, useState } from 'react';
import { Play } from 'lucide-react';

import { maisonFaveFilm } from '@/lib/data/maison-fave';

const { youtubeId, title, url } = maisonFaveFilm;

/** Shorts are vertical, so both thumbnails are cropped to the 9:16 frame with object-cover. */
const thumbnail = `https://i.ytimg.com/vi/${youtubeId}/maxresdefault.jpg`;
const fallbackThumbnail = `https://i.ytimg.com/vi/${youtubeId}/hqdefault.jpg`;

/** How much of the frame must be on screen before the film plays. */
const VISIBLE_THRESHOLD = 0.6;

const FilmFeature = () => {
  const frameRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const inView = useRef(false);
  // 'auto' = started by scrolling into view (browsers only allow this muted);
  // 'click' = the visitor pressed play, so it can start with sound.
  const [started, setStarted] = useState<'auto' | 'click' | null>(null);

  // Talks to the embedded player through the YouTube IFrame API's postMessage protocol.
  const command = (func: 'playVideo' | 'pauseVideo') => {
    iframeRef.current?.contentWindow?.postMessage(
      JSON.stringify({ event: 'command', func, args: [] }),
      '*',
    );
  };

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    // Visitors who ask for reduced motion keep the tap-to-play thumbnail.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        inView.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          // The iframe only mounts the first time the film scrolls into view,
          // which keeps YouTube's scripts off the initial page load.
          setStarted((current) => current ?? 'auto');
          command('playVideo');
        } else {
          command('pauseVideo');
        }
      },
      { threshold: VISIBLE_THRESHOLD },
    );
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="film" className="w-full scroll-mt-24 bg-[#F6F1E9]">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 py-20 sm:grid-cols-2 sm:px-10 lg:gap-16 lg:px-12 lg:py-24">
        <div className="max-w-md">
          <p className="font-lato text-[11px] uppercase tracking-[0.3em] text-[#8A7361]">
            In motion
          </p>
          <h2 className="mt-6 font-playfair text-3xl uppercase leading-[1.2] text-[#2A1E18] sm:text-4xl lg:text-[2.5rem]">
            See the
            <br />
            intention unfold.
          </h2>
          <div className="mt-7 h-px w-14 bg-[#8A7361]/50" />
          <p className="mt-6 font-lato text-sm leading-relaxed text-[#5C4A3E]">
            A glimpse of how we bring an idea to life — from the first detail to the
            moment people step into the room.
          </p>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-block font-lato text-[11px] uppercase tracking-[0.24em] text-[#4A1620] underline-offset-4 hover:underline"
          >
            Watch on YouTube
          </a>
        </div>

        <div
          ref={frameRef}
          className="relative mx-auto aspect-[9/16] w-full max-w-sm overflow-hidden bg-[#2B2C21] shadow-[0_24px_60px_-30px_rgba(42,30,24,0.6)] lg:mr-0 xl:max-w-md"
        >
          {started ? (
            <iframe
              ref={iframeRef}
              src={`https://www.youtube-nocookie.com/embed/${youtubeId}?autoplay=1&mute=${started === 'auto' ? 1 : 0}&loop=1&playlist=${youtubeId}&enablejsapi=1&rel=0&playsinline=1`}
              title={title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="absolute inset-0 h-full w-full border-0"
              // If the visitor scrolled past before the player finished loading, don't start it.
              onLoad={() => {
                if (!inView.current) command('pauseVideo');
              }}
            />
          ) : (
            <button
              type="button"
              onClick={() => setStarted('click')}
              aria-label={`Play video: ${title}`}
              className="group absolute inset-0 h-full w-full"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- remote thumbnail with a fallback */}
              <img
                src={thumbnail}
                alt=""
                loading="lazy"
                onError={(e) => {
                  if (e.currentTarget.src !== fallbackThumbnail) e.currentTarget.src = fallbackThumbnail;
                }}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
              />
              <span className="absolute inset-0 bg-[#2B2C21]/25 transition-colors group-hover:bg-[#2B2C21]/15" />
              <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-[#F3EEE2]/70 bg-[#2B2C21]/40 backdrop-blur-sm transition-transform group-hover:scale-105">
                <Play className="ml-1 h-6 w-6 fill-[#F3EEE2] text-[#F3EEE2]" strokeWidth={1.25} />
              </span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default FilmFeature;
