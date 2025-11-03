import Link from "next/link"
import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">EduHub</h3>
            <p className="text-sm opacity-80">Modern school management platform for the digital age.</p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:opacity-80 transition">
                  About
                </Link>
              </li>
              <li>
                <Link href="/academics" className="hover:opacity-80 transition">
                  Academics
                </Link>
              </li>
              <li>
                <Link href="/admissions" className="hover:opacity-80 transition">
                  Admissions
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="hover:opacity-80 transition">
                  Gallery
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/contact" className="hover:opacity-80 transition">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-80 transition">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-80 transition">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:opacity-80 transition">
                  Terms
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Contact Info</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@eduhub.edu</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>123 Education St, City</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-sm opacity-80">
          <p>&copy; 2025 EduHub. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
