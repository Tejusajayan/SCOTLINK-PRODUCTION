import { Link } from "wouter";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Shield, 
  Award, 
  Users, 
  Clock, 
  DollarSign, 
  HeartHandshake,
  ArrowRight,
  CheckCircle
} from "lucide-react";
import heroImage from "@assets/industrial_shipping__dca51243.jpg";

const reasons = [
  {
    icon: Shield,
    title: "Safety-Focused Operations",
    description: "Safety is our top priority. Every operation follows strict safety protocols to protect your cargo and our team. We invest in proper training and equipment to ensure accident-free handling.",
    highlights: [
      "Comprehensive safety training for all staff",
      "Regular equipment inspection and maintenance",
      "Strict adherence to industry safety standards",
      "Incident prevention through careful planning",
    ],
  },
  {
    icon: Award,
    title: "High-Quality Materials",
    description: "We never compromise on quality. Our lashing straps, wooden crates, and packing materials are sourced from trusted suppliers and meet international quality standards.",
    highlights: [
      "Premium-grade lashing straps and chains",
      "ISPM-15 compliant wood for international shipping",
      "Industrial-strength stretch wrap and strapping",
      "Protective cushioning materials",
    ],
  },
  {
    icon: Users,
    title: "Professional Manpower",
    description: "Our team consists of trained professionals who understand the nuances of cargo securing. Their expertise ensures your cargo is handled with precision and care.",
    highlights: [
      "Skilled and experienced technicians",
      "Continuous training and skill development",
      "Dedicated project supervisors",
      "Customer-focused service attitude",
    ],
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "We believe in honest, straightforward pricing. You'll receive a detailed quote with no hidden fees or surprise charges. What we quote is what you pay.",
    highlights: [
      "Free consultations and quotes",
      "Detailed breakdown of all costs",
      "Competitive market rates",
      "No hidden charges or fees",
    ],
  },
  {
    icon: Clock,
    title: "Fast Service Delivery",
    description: "We understand that time is critical in logistics. Our efficient processes and dedicated team ensure quick turnaround times without compromising on quality.",
    highlights: [
      "Rapid response to service requests",
      "Efficient project execution",
      "On-time delivery commitment",
      "24/7 availability for urgent needs",
    ],
  },
  {
    icon: HeartHandshake,
    title: "Customer Commitment",
    description: "Your satisfaction drives everything we do. We go above and beyond to meet your expectations and build lasting relationships based on trust and reliability.",
    highlights: [
      "Personalized service approach",
      "Open communication throughout",
      "Flexible solutions for unique needs",
      "Post-service support and follow-up",
    ],
  },
];

export default function WhyChooseUs() {
  return (
    <Layout>
      <section className="relative py-20 lg:py-28 bg-[#2D3748]" data-testid="section-why-hero">
        <div className="absolute inset-0 opacity-20">
          <img
            src={heroImage}
            alt="Why choose Scotlink Logistics"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D3748] via-[#2D3748]/90 to-[#2D3748]/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" data-testid="text-why-hero-title">
            Why Choose Us
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Discover what makes Scotlink Logistics your ideal partner for lashing and packing services
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-background" data-testid="section-why-intro">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                Our Promise
              </span>
              <div className="h-px w-8 bg-primary" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
              Fresh Energy, Proven Values
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              As a newly established company, we bring fresh perspectives and modern approaches 
              to the lashing and packing industry. What we may lack in years, we make up for 
              with passion, dedication, and an unwavering commitment to excellence.
            </p>
          </div>

          <div className="space-y-12">
            {reasons.map((reason, index) => (
              <Card 
                key={reason.title} 
                className="overflow-visible"
                data-testid={`card-reason-${reason.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <CardContent className="p-0">
                  <div className={`flex flex-col lg:flex-row ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                    <div className="lg:w-1/3 p-8 bg-primary/5 flex flex-col items-center justify-center text-center">
                      <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <reason.icon className="w-10 h-10 text-primary" />
                      </div>
                      <h3 className="text-2xl font-bold text-foreground">{reason.title}</h3>
                    </div>
                    <div className="lg:w-2/3 p-8">
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {reason.description}
                      </p>
                      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {reason.highlights.map((highlight) => (
                          <li key={highlight} className="flex items-start gap-2">
                            <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm text-foreground">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-primary" data-testid="section-why-cta">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Experience the Difference?
          </h2>
          <p className="text-primary-foreground/80 text-lg max-w-2xl mx-auto mb-8">
            Let us show you why companies trust Scotlink Logistics for their lashing and packing needs. 
            Contact us today for a free consultation.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="gap-2 bg-white text-primary hover:bg-white/90"
              data-testid="button-why-cta"
            >
              Get Started Today
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
