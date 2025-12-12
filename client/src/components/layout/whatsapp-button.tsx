import { SiWhatsapp } from "react-icons/si";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/+971503785501"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
      data-testid="button-whatsapp-floating"
      aria-label="Contact us on WhatsApp"
    >
      <SiWhatsapp className="w-7 h-7 text-white" />
    </a>
  );
}
