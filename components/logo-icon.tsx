export function LogoIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-10 h-10"
    >
      {/* Circular background - purple gradient */}
      <circle cx="20" cy="20" r="18" fill="url(#gradient)" />
      
      {/* Concentric circles - centered */}
      <g>
        {/* Outer circle */}
        <circle cx="20" cy="20" r="10" stroke="white" strokeWidth="2.5" fill="none" />
        
        {/* Middle circle */}
        <circle cx="20" cy="20" r="6.5" stroke="white" strokeWidth="2.5" fill="none" />
        
        {/* Inner circle - filled */}
        <circle cx="20" cy="20" r="3.5" fill="white" />
      </g>
      
      {/* Gradient definition - Purple gradient matching brand */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#667eea" />
          <stop offset="100%" stopColor="#764ba2" />
        </linearGradient>
      </defs>
    </svg>
  )
}
