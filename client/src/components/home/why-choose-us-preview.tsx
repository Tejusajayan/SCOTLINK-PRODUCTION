import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Shield, Award, Users, Clock, DollarSign, HeartHandshake, ArrowRight } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Safety-Focused Operations",
    description: "Our priority is ensuring your cargo is handled with the utmost care and safety protocols.",
  },
  {
    icon: Award,
    title: "High-Quality Materials",
    description: "We use only premium-grade lashing straps, packing materials, and protective equipment.",
  },
  {
    icon: Users,
    title: "Professional Manpower",
    description: "Our trained team brings expertise and dedication to every project we undertake.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "No hidden fees. Get clear, competitive quotes with full cost breakdown upfront.",
  },
  {
    icon: Clock,
    title: "Fast Service Delivery",
    description: "We understand time is money. Quick turnaround without compromising quality.",
  },
  {
    icon: HeartHandshake,
    title: "Customer Commitment",
    description: "Your satisfaction is our success. We go above and beyond to meet your needs.",
  },
];

export function WhyChooseUsPreview() {
  return (
    <section className="py-16 lg:py-24 bg-background" data-testid="section-why-choose-preview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-primary" />
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              Our Commitment
            </span>
            <div className="h-px w-8 bg-primary" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="text-why-title">
            Why Choose Scotlink Logistics?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            As a newly established company, we bring fresh energy and modern approaches 
            to the lashing and packing industry, combined with a strong commitment to excellence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="flex flex-col items-start p-6 rounded-lg bg-card border border-card-border hover-elevate transition-all"
              data-testid={`feature-${feature.title.toLowerCase().replace(/\s+/g, "-")}`}
            >
              <div className="w-14 h-14 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <feature.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/why-choose-us">
            <Button variant="outline" size="lg" className="gap-2" data-testid="button-learn-more-why">
              Learn More About Us
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
