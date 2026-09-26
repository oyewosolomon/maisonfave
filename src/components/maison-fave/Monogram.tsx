/**
 * The boxed MF monogram. Drawn rather than served as an image so it stays
 * crisp at every size and can be recoloured by whatever band it sits in.
 */
const Monogram = ({ className = '' }: { className?: string }) => (
  <svg
    viewBox="0 0 48 48"
    aria-hidden="true"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <rect x="0.5" y="0.5" width="47" height="47" stroke="currentColor" strokeWidth="1" />
    <text
      x="24"
      y="32"
      textAnchor="middle"
      fill="currentColor"
      style={{ fontFamily: 'var(--font-playfair), serif', fontSize: '22px', letterSpacing: '0.02em' }}
    >
      MF
    </text>
  </svg>
);

export default Monogram;
