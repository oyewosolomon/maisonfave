/**
 * The Maison Fave leaf mark. The PNG is only used as a mask, so the mark takes
 * the current text colour and can flip between light and dark with the nav.
 */
const BrandMark = ({ className = '' }: { className?: string }) => (
  <span
    aria-hidden="true"
    className={`inline-block bg-current ${className}`}
    style={{
      maskImage: 'url(/assets/images/brand/maisonfave-mark.png)',
      WebkitMaskImage: 'url(/assets/images/brand/maisonfave-mark.png)',
      maskSize: 'contain',
      WebkitMaskSize: 'contain',
      maskRepeat: 'no-repeat',
      WebkitMaskRepeat: 'no-repeat',
      maskPosition: 'center',
      WebkitMaskPosition: 'center',
    }}
  />
);

export default BrandMark;
