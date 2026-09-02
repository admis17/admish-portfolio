export default function Logo({ variant = 'light', className = '' }) {
  const textColor = variant === 'dark' ? 'text-white' : 'text-brand-400'

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <svg width="34" height="34" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="admish-logo-grad" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#fde047" />
            <stop offset="1" stopColor="#a16207" />
          </linearGradient>
        </defs>
        <rect width="36" height="36" rx="9" fill="url(#admish-logo-grad)" />
        <path
          d="M11 26 L18 10 L25 26"
          stroke="black"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path d="M14.2 20 H21.8" stroke="black" strokeWidth="3" strokeLinecap="round" />
      </svg>
      <span className={`text-2xl font-bold tracking-tight ${textColor}`}>Admish</span>
    </div>
  )
}
