export function TamilPattern() {
  return (
    <svg className="absolute inset-0 w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <pattern id="tamil-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          {/* Kolam-inspired pattern */}
          <circle cx="50" cy="50" r="2" fill="#8B0000" />
          <circle cx="25" cy="25" r="2" fill="#8B0000" />
          <circle cx="75" cy="25" r="2" fill="#8B0000" />
          <circle cx="25" cy="75" r="2" fill="#8B0000" />
          <circle cx="75" cy="75" r="2" fill="#8B0000" />
          
          <path d="M 50,30 L 70,50 L 50,70 L 30,50 Z" fill="none" stroke="#D4AF37" strokeWidth="0.5" />
          <circle cx="50" cy="50" r="15" fill="none" stroke="#D2691E" strokeWidth="0.5" />
          
          <line x1="35" y1="35" x2="65" y2="65" stroke="#8B0000" strokeWidth="0.3" opacity="0.5" />
          <line x1="65" y1="35" x2="35" y2="65" stroke="#8B0000" strokeWidth="0.3" opacity="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#tamil-pattern)" />
    </svg>
  );
}
