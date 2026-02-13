/**
 * Per-page SEO metadata using React 19's native <title> and <meta> hoisting.
 * These elements are automatically moved to <head> by React.
 */

interface PageMetaProps {
  title: string
  description: string
  path?: string
}

const BASE_URL = 'https://guardian-website-redesign.vercel.app'
const SITE_NAME = 'Guardian Roofing & Siding'

export default function PageMeta({ title, description, path = '' }: PageMetaProps) {
  const fullTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`
  const url = `${BASE_URL}${path}`

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />
    </>
  )
}
