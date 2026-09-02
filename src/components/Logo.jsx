export default function Logo({ variant = 'light', className = '' }) {
  const textColor = variant === 'dark' ? 'text-white' : 'text-brand-400'
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <img src="/logo.png" alt="Admish" className="w-9 h-9 rounded-lg object-contain bg-white" />
      <span className={`text-2xl font-bold tracking-tight ${textColor}`}>Admish</span>
    </div>
  )
}
