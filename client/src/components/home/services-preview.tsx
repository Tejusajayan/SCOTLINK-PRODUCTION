import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Car, Truck, Package, Layers, Link2, Loader2 } from "lucide-react";
import type { Service } from "@shared/schema";

import autoImage from "@assets/stock_images/automobile_car_vehic_1b402b37.jpg";
import heavyImage from "@assets/stock_images/heavy_machinery_equi_09b3c560.jpg";
import woodenImage from "@assets/stock_images/wooden_crate_packing_50a7b666.jpg";
import palletImage from "@assets/stock_images/palletization_wareho_ae154d1b.jpg";
import bundlingImage from "@assets/stock_images/cargo_bundling_strap_d7a882d9.jpg";

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
    imageUrl: autoImage,
    enabled: true,
  },
  {
    id: "2",
    slug: "heavy-equipment-lashing",
    title: "Heavy Equipment Lashing",
    shortDescription: "Specialized lashing solutions for heavy machinery and industrial equipment.",
    imageUrl: heavyImage,
    enabled: true,
  },
  {
    id: "3",
    slug: "wooden-packing",
    title: "Wooden Packing",
    shortDescription: "Custom wooden crates and packaging for fragile and valuable items.",
    imageUrl: woodenImage,
    enabled: true,
  },
  {
    id: "4",
    slug: "palletization",
    title: "Palletization",
    shortDescription: "Efficient pallet solutions for organized and stackable cargo handling.",
    imageUrl: palletImage,
    enabled: true,
  },
  {
    id: "5",
    slug: "bundling-service",
    title: "Bundling Service",
    shortDescription: "Professional bundling and strapping for secure cargo grouping.",
    imageUrl: bundlingImage,
    enabled: true,
  },
];

export function ServicesPreview() {
  const { data: apiServices, isLoading } = useQuery<Service[]>({
    queryKey: ["/api/services"],
  });

  const services = apiServices && apiServices.length > 0 ? apiServices : defaultServices;

  return (
    <section className="py-16 lg:py-24 bg-background" data-testid="section-services-preview">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="h-px w-8 bg-primary" />
            <span className="text-primary font-medium text-sm uppercase tracking-wider">
              What We Offer
            </span>
            <div className="h-px w-8 bg-primary" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4" data-testid="text-services-title">
            Our Professional Services
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We offer a comprehensive range of lashing and packing services to ensure 
            your cargo reaches its destination safely and securely.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.slice(0, 3).map((service) => {
                const IconComponent = iconMap[service.slug] || Package;
                const image = service.imageUrl || imageMap[service.slug] || autoImage;
                return (
                  <Link key={service.id} href={`/services/${service.slug}`}>
                    <Card className="group overflow-visible h-full hover-elevate cursor-pointer" data-testid={`card-service-${service.slug}`}>
                      <div className="relative h-48 overflow-hidden rounded-t-lg">
                        <img
                          src={image}
                          alt={`${service.title} - Professional cargo securing service`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                        <div className="absolute bottom-4 left-4 w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                          <IconComponent className="w-6 h-6 text-primary-foreground" />
                        </div>
                      </div>
                      <CardContent className="p-6">
                        <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                          {service.title}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                          {service.shortDescription || service.description}
                        </p>
                        <span className="inline-flex items-center gap-1 text-primary font-medium text-sm">
                          Learn More
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>

            {services.length > 3 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 max-w-4xl mx-auto">
                {services.slice(3, 5).map((service) => {
                  const IconComponent = iconMap[service.slug] || Package;
                  const image = service.imageUrl || imageMap[service.slug] || autoImage;
                  return (
                    <Link key={service.id} href={`/services/${service.slug}`}>
                      <Card className="group overflow-visible h-full hover-elevate cursor-pointer" data-testid={`card-service-${service.slug}`}>
                        <div className="relative h-48 overflow-hidden rounded-t-lg">
                          <img
                            src={image}
                            alt={`${service.title} - Professional cargo securing service`}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                          <div className="absolute bottom-4 left-4 w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                            <IconComponent className="w-6 h-6 text-primary-foreground" />
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                            {service.title}
                          </h3>
                          <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                            {service.shortDescription || service.description}
                          </p>
                          <span className="inline-flex items-center gap-1 text-primary font-medium text-sm">
                            Learn More
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </CardContent>
                      </Card>
                    </Link>
                  );
                })}
              </div>
            )}
          </>
        )}

        <div className="text-center mt-10">
          <Link href="/services">
            <Button variant="outline" size="lg" className="gap-2" data-testid="button-view-all-services">
              View All Services
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
