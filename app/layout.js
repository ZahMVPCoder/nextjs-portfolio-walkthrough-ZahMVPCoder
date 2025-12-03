import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export const metadata = {
  title: 'Welcome to my Portfolio',
  description: 'This website showcases all my projects, links, skills, and everything about me!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50">
        <Navbar />
        
        <main className="flex-grow">
          {children}
          <Footer />  
        </main>
      </body>
    </html>
  )
}