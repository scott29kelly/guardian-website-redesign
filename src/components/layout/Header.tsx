import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, ChevronDown } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  {
    href: '/services',
    label: 'Services',
    dropdown: [
      { href: '/roofing', label: 'Roofing' },
      { href: '/siding', label: 'Siding' },
      { href: '/storm-damage', label: 'Storm Repair' },
    ],
  },
  { href: '/projects', label: 'Projects' },
  { href: '/testimonials', label: 'Testimonials' },
  { href: '/about', label: 'About' },
  { href: '/service-areas', label: 'Service Areas' },
  { href: '/contact', label: 'Contact' },
]

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const location = useLocation()

  const isActive = (href: string) => location.pathname === href

  return (
    <>
      {/* Top Bar */}
      <div className="bg-navy text-white text-sm py-2">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex justify-between items-center">
          <span className="hidden sm:inline text-slate-300">Serving PA, NJ, DE, MD, VA, NY</span>
          <div className="flex items-center gap-4 text-slate-300 ml-auto">
            <a href="tel:855-424-5911" className="hover:text-white transition-colors">
              855-424-5911
            </a>
            <a
              href="mailto:info@guardianstormrepair.com"
              className="hidden md:inline hover:text-white transition-colors"
            >
              info@guardianstormrepair.com
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 shrink-0">
            <div className="w-10 h-10 bg-navy rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-6 h-6">
                <path fill="#F97316" d="M50 20L25 42v38h50V42L50 20z" />
              </svg>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-navy font-heading font-extrabold text-lg tracking-tight">
                Guardian
              </span>
              <span className="text-navy/70 text-xs font-medium -mt-0.5">Roofing & Siding</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div
                  key={link.href}
                  className="relative group"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <Link
                    to={link.href}
                    className={`flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                      isActive(link.href)
                        ? 'text-guardian-blue'
                        : 'text-navy/70 hover:text-navy hover:bg-slate-100'
                    }`}
                  >
                    {link.label}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </Link>
                  <div
                    className={`absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-lg border border-slate-200 py-2 transition-all duration-200 ${
                      dropdownOpen
                        ? 'opacity-100 translate-y-0 pointer-events-auto'
                        : 'opacity-0 -translate-y-2 pointer-events-none'
                    }`}
                  >
                    {link.dropdown.map((sub) => (
                      <Link
                        key={sub.href}
                        to={sub.href}
                        className="block px-4 py-2 text-sm text-navy/70 hover:text-navy hover:bg-slate-50 transition-colors"
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(link.href)
                      ? 'text-guardian-blue'
                      : 'text-navy/70 hover:text-navy hover:bg-slate-100'
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center px-5 py-2.5 bg-gradient-to-r from-safety-orange to-orange-500 text-white text-sm font-semibold rounded-full shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 transition-all duration-300"
            >
              Get Estimate
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 text-navy"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        <div
          className={`lg:hidden fixed inset-0 top-[calc(theme(spacing.16)+theme(spacing.8))] z-40 bg-white transition-transform duration-300 ${
            mobileOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <nav className="p-6 space-y-1 overflow-y-auto h-full">
            {navLinks.map((link) => (
              <div key={link.href}>
                <Link
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 text-base font-medium rounded-xl transition-colors ${
                    isActive(link.href)
                      ? 'text-guardian-blue bg-sky-50'
                      : 'text-navy hover:bg-slate-50'
                  }`}
                >
                  {link.label}
                </Link>
                {link.dropdown?.map((sub) => (
                  <Link
                    key={sub.href}
                    to={sub.href}
                    onClick={() => setMobileOpen(false)}
                    className="block pl-10 pr-4 py-2.5 text-sm text-navy/60 hover:text-navy hover:bg-slate-50 rounded-lg transition-colors"
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            ))}
            <div className="pt-4">
              <Link
                to="/contact"
                onClick={() => setMobileOpen(false)}
                className="block w-full text-center px-5 py-3 bg-gradient-to-r from-safety-orange to-orange-500 text-white font-semibold rounded-full"
              >
                Get Free Estimate
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  )
}
