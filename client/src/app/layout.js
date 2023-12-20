import 'bootstrap/dist/css/bootstrap.css'

export const metadata = {
  title: 'Home',
}

export default function RootLayout({ children }) {
 return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
