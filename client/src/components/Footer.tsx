import { Link } from "wouter";
import { Shield, Twitter, Linkedin, Github, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-red-500 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-xl text-white">Res<span className="text-red-400">Q</span></span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              India's first integrated emergency response platform — saving lives one second at a time.
            </p>
            <div className="flex gap-3 mt-5">
              {[Twitter, Linkedin, Github, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-500 transition-colors">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Product</h4>
            <ul className="space-y-2 text-sm">
              {["Features", "Command Center", "Mobile App", "API Access"].map((item) => (
                <li key={item}><Link href="/product" className="hover:text-red-400 transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2 text-sm">
              {["About Us", "Our Mission", "Team", "Careers"].map((item) => (
                <li key={item}><Link href="/about" className="hover:text-red-400 transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Links</h4>
            <ul className="space-y-2 text-sm">
              {["Blog", "Press", "Contact", "Privacy Policy"].map((item) => (
                <li key={item}><Link href="/contact" className="hover:text-red-400 transition-colors">{item}</Link></li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-gray-500">
          <span>© 2024 ResQ. All rights reserved.</span>
          <span>Made with ❤️ for India</span>
        </div>
      </div>
    </footer>
  );
}
