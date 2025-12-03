import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white mt-auto border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-4">
              Zahir Alston
            </h3>
            <p className="text-gray-400 leading-relaxed">
              Web Designer & Content Creator passionate about building beautiful and functional websites.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-400">Quick Links</h4>
            <div className="flex flex-col gap-2">
              <Link href="/" className="text-gray-400 hover:text-green-400 transition-colors">
                Home
              </Link>
              <Link href="/about" className="text-gray-400 hover:text-green-400 transition-colors">
                About
              </Link>
              <Link href="/projects" className="text-gray-400 hover:text-green-400 transition-colors">
                Projects
              </Link>
              <Link href="/contact" className="text-gray-400 hover:text-green-400 transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Connect Section */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-green-400">Connect</h4>
            <p className="text-gray-400 mb-4">
              Let's work together on your next project!
            </p>
            <Link 
              href="/contact" 
              className="inline-block bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold px-6 py-3 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
            >
              Get in Touch
            </Link>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">
            © 2025 Zahir Alston. Built with ❤️ using Next.js & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}