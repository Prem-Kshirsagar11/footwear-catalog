import './globals.css'

export const metadata = {
  title: 'ShopCatalog',
  description: 'Browse footwear catalog',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@400;600;700;800&family=Barlow:wght@400;500;600&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'Barlow', sans-serif", margin: 0, background: '#f2f2f2' }}>
        {children}
      </body>
    </html>
  )
}