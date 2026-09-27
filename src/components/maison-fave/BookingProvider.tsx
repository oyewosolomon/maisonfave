'use client';

import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import BookingModal from './BookingModal';

type BookingContextValue = { openBooking: () => void };

const BookingContext = createContext<BookingContextValue | null>(null);

/** Hash that opens the enquiry form on load, so it can be linked to directly. */
const BOOKING_HASH = '#book';

/**
 * Owns the "Work with us" enquiry popup so any button on the page can open it
 * without prop-drilling through the server-rendered sections.
 */
export const BookingProvider = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);

  const openBooking = useCallback(() => setOpen(true), []);

  const closeBooking = useCallback(() => {
    setOpen(false);
    if (window.location.hash === BOOKING_HASH) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  }, []);

  useEffect(() => {
    const syncFromHash = () => {
      if (window.location.hash === BOOKING_HASH) setOpen(true);
    };
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}
      <BookingModal open={open} onClose={closeBooking} />
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBooking must be used inside <BookingProvider>');
  return context;
};
