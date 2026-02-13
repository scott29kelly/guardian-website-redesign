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
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      {showGraceWidget && <GraceWidget />}
    </div>
  )
}
