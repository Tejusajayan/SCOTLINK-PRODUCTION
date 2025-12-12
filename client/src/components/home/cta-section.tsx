import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Phone, MessageSquare } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-16 lg:py-24 bg-primary relative overflow-hidden" data-testid="section-cta">
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M0,50 Q25,30 50,50 T100,50 V100 H0 Z" fill="currentColor" className="text-white" />
        </svg>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4" data-testid="text-cta-title">
          Ready to Secure Your Cargo?
        </h2>
        <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
          Get in touch with us today for a free consultation and quote. 
          Our team is ready to provide you with the best solutions for your cargo needs.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact">
            <Button
              size="lg"
              className="gap-2 bg-white text-primary hover:bg-white/90 border-white"
              data-testid="button-cta-contact"
            >
              <MessageSquare className="w-5 h-5" />
              Contact Us
            </Button>
          </Link>
          <a href="tel:+1234567890">
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-white text-white hover:bg-white/10 bg-transparent"
              data-testid="button-cta-call"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
