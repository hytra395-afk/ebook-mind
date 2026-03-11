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
      {/* Background */}
      <rect width="40" height="40" rx="10" fill="url(#gradient)" />
      
      {/* Book outline */}
      <g stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        {/* Left page */}
        <path d="M 12 10 L 12 30 Q 12 32 14 32 L 20 32 L 20 10 Z" fill="none" />
        
        {/* Right page */}
        <path d="M 20 10 L 20 32 L 26 32 Q 28 32 28 30 L 28 10 Z" fill="none" />
        
        {/* Center spine */}
        <line x1="20" y1="10" x2="20" y2="32" />
      </g>
      
      {/* Gradient definition - Purple → Pink (PlanAI style) */}
      <defs>
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#6366f1" />
          <stop offset="60%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#d946ef" />
        </linearGradient>
      </defs>
    </svg>
  )
}
