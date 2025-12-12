import { Layout } from "@/components/layout/layout";
import { Card, CardContent } from "@/components/ui/card";
import { Target, Eye, Shield, Users, Award } from "lucide-react";
import teamImage from "@assets/warehouse_logistics__23b6dc46.jpg";

export default function About() {
  return (
    <Layout>
      <section className="relative py-20 lg:py-28 bg-[#2D3748]" data-testid="section-about-hero">
        <div className="absolute inset-0 opacity-20">
          <img
            src={teamImage}
            alt="Scotlink team at work"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D3748] via-[#2D3748]/90 to-[#2D3748]/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" data-testid="text-about-title">
            About Scotlink Logistcs
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Your trusted partner for professional lashing and packing solutions
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-background" data-testid="section-about-story">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="h-px w-8 bg-primary" />
                <span className="text-primary font-medium text-sm uppercase tracking-wider">
                  Our Story
                </span>
                <div className="h-px w-8 bg-primary" />
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6" data-testid="text-story-title">
                Building Excellence from Day One
              </h2>
            </div>

            <div className="prose prose-lg max-w-none text-muted-foreground">
              <p className="text-lg leading-relaxed mb-6" data-testid="text-story-content">
                Scotlink Logistics is a newly established company dedicated to providing professional 
                lashing and packing services for the logistics and transportation industry. 
                While we are new to the market, our team brings together expertise and a 
                passion for excellence that sets us apart.
              </p>
              <p className="text-lg leading-relaxed mb-6">
                We specialize in securing automobiles, heavy machinery, and industrial cargo 
                for safe transportation. Our focus on safety, combined with the use of 
                premium materials and professionally trained manpower, ensures that your 
                valuable cargo reaches its destination in perfect condition.
              </p>
              <p className="text-lg leading-relaxed">
                At Scotlink Logistics, we believe that being new means being innovative, flexible, 
                and fully committed to exceeding our customers&apos; expectations. We approach 
                every project with fresh perspectives and a determination to deliver the 
                best possible service.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30" data-testid="section-specializations">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="text-spec-title">
              What We Specialize In
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our core competencies cover the full spectrum of cargo securing needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "Automobile Lashing", desc: "Secure vehicle transportation" },
              { title: "Heavy Equipment", desc: "Machinery securing solutions" },
              { title: "Wooden Packing", desc: "Custom protective crating" },
              { title: "Palletization", desc: "Organized cargo handling" },
            ].map((item) => (
              <Card key={item.title} className="text-center p-6" data-testid={`card-spec-${item.title.toLowerCase().replace(/\s+/g, "-")}`}>
                <CardContent className="p-0">
                  <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-background" data-testid="section-commitment">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="text-commitment-title">
              Our Commitment
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center p-6" data-testid="commitment-safety">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Safety First</h3>
              <p className="text-muted-foreground">
                Every operation follows strict safety protocols to protect your cargo and our team.
              </p>
            </div>
            <div className="text-center p-6" data-testid="commitment-materials">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Premium Materials</h3>
              <p className="text-muted-foreground">
                We use only high-quality lashing straps, wooden crates, and protective materials.
              </p>
            </div>
            <div className="text-center p-6" data-testid="commitment-manpower">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">Trained Manpower</h3>
              <p className="text-muted-foreground">
                Our team is professionally trained to handle all types of cargo with expertise.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-muted/30" data-testid="section-vision-mission">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-l-4 border-l-primary" data-testid="card-vision">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Eye className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Our Vision</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To become the most trusted name in cargo lashing and packing services, 
                  recognized for our unwavering commitment to safety, quality, and customer 
                  satisfaction. We aim to set new industry standards through innovation and excellence.
                </p>
              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-primary" data-testid="card-mission">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Target className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">Our Mission</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  To deliver exceptional lashing and packing solutions that ensure the safe 
                  transportation of our clients&apos; valuable cargo. We are committed to using 
                  premium materials, maintaining the highest safety standards, and providing 
                  outstanding customer service at competitive prices.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
}
