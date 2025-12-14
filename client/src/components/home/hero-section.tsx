import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Package } from "lucide-react";
import heroImage from "@assets/stock_images/industrial_shipping__dca51243.jpg";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center" data-testid="section-hero">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/40" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <div className="flex items-center gap-2 mb-6">
            <div className="h-px w-12 bg-primary" />
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Professional Cargo Solutions
            </span>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6" data-testid="text-hero-title">
            Secure Your Cargo with{" "}
            <span className="text-primary">Expert Lashing</span> & Packing
          </h1>
          
          <p className="text-lg sm:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl" data-testid="text-hero-description">
            We provide professional lashing and packing services for automobiles, 
            heavy equipment, and industrial cargo. Safety-focused operations with 
            premium materials and trained manpower.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            <Link href="/contact">
              <Button size="lg" className="gap-2 text-base px-8" data-testid="button-hero-quote">
                Get a Quote
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link href="/services">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 text-base px-8 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20"
                data-testid="button-hero-services"
              >
                Our Services
              </Button>
            </Link>
          </div>
          
          <div className="flex flex-wrap gap-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-white font-semibold" data-testid="text-feature-safety">Safety First</p>
                <p className="text-gray-300 text-sm">Certified Operations</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary/20 backdrop-blur-sm rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-white font-semibold" data-testid="text-feature-materials">Premium Materials</p>
                <p className="text-gray-300 text-sm">High Quality Products</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
