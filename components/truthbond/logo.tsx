import Link from "next/link";

export function BrandMark({ size = 38 }: { size?: number }) {
  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M24 3.5 41 10v12.2c0 10.9-6.8 18.5-17 22.3C13.8 40.7 7 33.1 7 22.2V10l17-6.5Z"
        fill="#0E1D23"
        stroke="#76E4E7"
        strokeWidth="1.5"
      />
      <path
        d="m15.4 23.7 5.2 5.2 12.2-12.2"
        stroke="#76E4E7"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="24" cy="4" r="2.1" fill="#F7B955" />
      <circle cx="7.4" cy="10.2" r="1.8" fill="#F7B955" />
      <circle cx="40.6" cy="10.2" r="1.8" fill="#F7B955" />
    </svg>
  );
}

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="brand" aria-label="TruthBond home">
      <BrandMark size={compact ? 32 : 38} />
      <span>
        <strong>TruthBond</strong>
        {!compact && <small>EVIDENCE PROTOCOL</small>}
      </span>
    </Link>
  );
}
