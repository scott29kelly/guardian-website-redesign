import { Outlet, useLocation } from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import GraceWidget from '../ui/GraceWidget'

export default function Layout() {
  const { pathname } = useLocation()
  // Don't show floating widget on the dedicated Grace page
  const showGraceWidget = pathname !== '/grace'

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />
      {/* Skip to content link — visible on focus for keyboard users */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] focus:px-4 focus:py-2 focus:bg-navy focus:text-white focus:rounded-lg focus:text-sm focus:font-medium focus:outline-none focus:ring-2 focus:ring-safety-orange"
      >
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {showGraceWidget && <GraceWidget />}
    </div>
  )
}
