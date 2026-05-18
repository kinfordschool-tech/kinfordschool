export default function Logo({ dark = false, size = 'md' }: { dark?: boolean; size?: 'sm' | 'md' | 'lg' }) {
  const scale = size === 'sm' ? 0.6 : size === 'lg' ? 1.4 : 1
  const textColor = dark ? '#1E1E1E' : '#FFFFFF'
  return (
    <svg width={160 * scale} height={60 * scale} viewBox="0 0 160 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Yellow bar */}
      <rect x="0" y="0" width="44" height="10" rx="2" fill="#F5B800" />
      {/* Crimson arch */}
      <path d="M0 48 C0 28 44 28 44 48 L38 48 C38 34 6 34 6 48 Z" fill="#A0163B" />
      {/* Wordmark */}
      <text x="54" y="34" fontFamily="Geist, sans-serif" fontWeight="700" fontSize="24" fill={textColor} letterSpacing="-0.5">Kinford</text>
      <text x="54" y="50" fontFamily="Geist, sans-serif" fontWeight="400" fontSize="10" fill={dark ? 'rgba(30,30,30,0.5)' : 'rgba(255,255,255,0.45)'} letterSpacing="2">SCHOOL OF GUIDANCE</text>
    </svg>
  )
}
