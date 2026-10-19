export default function Logo({ size = 'md' }: { dark?: boolean; size?: 'sm' | 'md' | 'lg' }) {
  const width = size === 'sm' ? 110 : size === 'lg' ? 180 : 140
  return (
    <img
      src="/kinford-logo-new.png"
      alt="Kinford School of Guidance"
      style={{
        width,
        height: 'auto',
        display: 'block',
      }}
    />
  )
}
