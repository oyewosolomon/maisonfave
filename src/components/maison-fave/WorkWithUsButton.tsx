'use client';

import type { ReactNode } from 'react';

import { useBooking } from './BookingProvider';

/** Opens the enquiry popup; keeps server-rendered sections free of client state. */
const WorkWithUsButton = ({
  className,
  onClick,
  children,
}: {
  className?: string;
  onClick?: () => void;
  children: ReactNode;
}) => {
  const { openBooking } = useBooking();

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      onClick={() => {
        onClick?.();
        openBooking();
      }}
      className={className}
    >
      {children}
    </button>
  );
};

export default WorkWithUsButton;
