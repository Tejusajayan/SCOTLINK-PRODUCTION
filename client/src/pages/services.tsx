import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/layout";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Car, Truck, Package, Layers, Link2, Loader2 } from "lucide-react";
import { SEO } from "@/components/seo";
import type { Service } from "@shared/schema";

import autoImage from "@assets/automobile_car_vehic_1b402b37.jpg";
import heavyImage from "@assets/heavy_machinery_equi_09b3c560.jpg";
import woodenImage from "@assets/wooden_crate_packing_50a7b666.jpg";
import palletImage from "@assets/palletization_wareho_ae154d1b.jpg";
import bundlingImage from "@assets/cargo_bundling_strap_d7a882d9.jpg";
import heroImage from "@assets/industrial_shipping__dca51243.jpg";

const iconMap: Record<string, typeof Car> = {
  "automobile-lashing": Car,
  "heavy-equipment-lashing": Truck,
  "wooden-packing": Package,
  "palletization": Layers,
  "bundling-service": Link2,
};

const imageMap: Record<string, string> = {
  "automobile-lashing": autoImage,
  "heavy-equipment-lashing": heavyImage,
  "wooden-packing": woodenImage,
  "palletization": palletImage,
  "bundling-service": bundlingImage,
};

const defaultServices = [
  {
    id: "1",
    slug: "automobile-lashing",
    title: "Automobile Lashing",
    shortDescription: "Professional securing of vehicles for safe transportation across all distances.",
    description: "Our specialized team uses premium-grade straps and anchoring systems to ensure your vehicles arrive in perfect condition.",
    imageUrl: autoImage,
    enabled: true,
  },
  {
    id: "2",
    slug: "heavy-equipment-lashing",
    title: "Heavy Equipment Lashing",
    shortDescription: "Specialized lashing solutions for heavy machinery and industrial equipment.",
    description: "We handle construction equipment, manufacturing machinery, and oversized loads with precision and care.",
    imageUrl: heavyImage,
    enabled: true,
  },
  {
    id: "3",
    slug: "wooden-packing",
    title: "Wooden Packing",
    shortDescription: "Custom wooden crates and packaging for fragile and valuable items.",
    description: "Our expert craftsmen create protective enclosures tailored to your specific cargo requirements.",
    imageUrl: woodenImage,
    enabled: true,
  },
  {
    id: "4",
    slug: "palletization",
    title: "Palletization",
    shortDescription: "Efficient pallet solutions for organized and stackable cargo handling.",
    description: "We provide professional palletizing services that optimize storage and transportation efficiency.",
    imageUrl: palletImage,
    enabled: true,
  },
  {
    id: "5",
    slug: "bundling-service",
    title: "Bundling Service",
    shortDescription: "Professional bundling and strapping for secure cargo grouping.",
    description: "We bundle multiple items together safely for efficient handling and transportation.",
    imageUrl: bundlingImage,
    enabled: true,
  },
];

export default function Services() {
  const { data: apiServices, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const services = apiServices && apiServices.length > 0 ? apiServices : defaultServices;

  return (
    <Layout>
      <SEO
        title="Our Services - Lashing & Packing Solutions"
        description="Comprehensive lashing and packing solutions including automobile lashing, heavy equipment lashing, wooden packing, palletization, and bundling services."
      />
      <section className="relative py-20 lg:py-28 bg-[#2D3748]" data-testid="section-services-hero">
        <div className="absolute inset-0 opacity-20">
          <img
            src={heroImage}
            alt="Professional cargo lashing services"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D3748] via-[#2D3748]/90 to-[#2D3748]/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" data-testid="text-services-hero-title">
            Our Services
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Comprehensive lashing and packing solutions for all your cargo needs
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-background" data-testid="section-services-list">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="h-px w-8 bg-primary" />
              <span className="text-primary font-medium text-sm uppercase tracking-wider">
                What We Offer
              </span>
              <div className="h-px w-8 bg-primary" />
            </div>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Professional Cargo Solutions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From automobiles to heavy machinery, we provide expert lashing and packing
              services tailored to your specific requirements.
            </p>
          </div>

          {isLoading ? (
            <div className="flex justify-center py-16">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="space-y-8">
              {services.map((service, index) => {
                const IconComponent = iconMap[service.slug] || Package;
                const image = service.imageUrl || imageMap[service.slug] || heroImage;
                return (
                  <Link key={service.id} href={`/services/${service.slug}`}>
                    <Card
                      className={`overflow-visible hover-elevate cursor-pointer ${index % 2 === 1 ? "lg:flex-row-reverse" : ""
                        }`}
                      data-testid={`card-service-full-${service.slug}`}
                    >
                      <div className={`flex flex-col lg:flex-row ${index % 2 === 1 ? "lg:flex-row-reverse" : ""}`}>
                        <div className="relative lg:w-2/5 h-64 lg:h-auto overflow-hidden rounded-t-lg lg:rounded-t-none lg:rounded-l-lg">
                          <img
                            src={image}
                            alt={`${service.title} - Professional cargo securing service`}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent lg:bg-gradient-to-r" />
                          <div className="absolute bottom-4 left-4 w-14 h-14 bg-primary rounded-lg flex items-center justify-center">
                            <IconComponent className="w-7 h-7 text-primary-foreground" />
                          </div>
                        </div>
                        <CardContent className="lg:w-3/5 p-8 flex flex-col justify-center">
                          <h3 className="text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-muted-foreground mb-6 leading-relaxed">
                            {service.shortDescription}
                          </p>
                          <span className="inline-flex items-center gap-2 text-primary font-semibold">
                            View Service Details
                            <ArrowRight className="w-5 h-5" />
                          </span>
                        </CardContent>
                      </div>
                    </Card>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
