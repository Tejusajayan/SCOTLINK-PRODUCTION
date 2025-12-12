import { Link } from "wouter";
import { Anchor, Phone, Mail, MapPin } from "lucide-react";
import { SiWhatsapp } from "react-icons/si";

const serviceLinks = [
  { href: "/services/automobile-lashing", label: "Automobile Lashing" },
  { href: "/services/heavy-equipment-lashing", label: "Heavy Equipment Lashing" },
  { href: "/services/wooden-packing", label: "Wooden Packing" },
  { href: "/services/palletization", label: "Palletization" },
  { href: "/services/bundling-service", label: "Bundling Service" },
];

const quickLinks = [
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Our Services" },
  { href: "/gallery", label: "Gallery" },
  { href: "/why-choose-us", label: "Why Choose Us" },
  { href: "/contact", label: "Contact Us" },
];

export function Footer() {
  return (
    <footer className="bg-[#2D3748] text-white" data-testid="footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2" data-testid="footer-logo">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <Anchor className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">Scotlink Logistics</span>
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Your trusted partner for professional lashing and packing services. 
              We ensure your cargo reaches its destination safely and securely.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="https://wa.me/+971503785501"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity"
                data-testid="link-whatsapp-footer"
              >
                <SiWhatsapp className="w-5 h-5 text-white" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4" data-testid="footer-services-title">Our Services</h3>
            <ul className="space-y-2">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors text-sm"
                    data-testid={`footer-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4" data-testid="footer-quick-links-title">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-primary transition-colors text-sm"
                    data-testid={`footer-quick-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4" data-testid="footer-contact-title">Contact Info</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <span className="text-gray-300 text-sm" data-testid="footer-address">
                  6, 30st, Umm Ramool<br />
                  Al Rashidiya, Dubai, UAE
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="tel:+971503785501"
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                  data-testid="footer-phone"
                >
                  +971503785501
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                <a
                  href="mailto:info@scotlinklogistics.com"
                  className="text-gray-300 hover:text-primary transition-colors text-sm"
                  data-testid="footer-email"
                >
                  info@scotlinklogistics.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-600 mt-10 pt-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm" data-testid="footer-copyright">
              &copy; {new Date().getFullYear()} Scotlink Logistics. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
