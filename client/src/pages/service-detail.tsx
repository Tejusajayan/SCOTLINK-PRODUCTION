import { useParams, Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, ArrowLeft, CheckCircle, Car, Truck, Package, Layers, Link2, Loader2 } from "lucide-react";
import { SEO } from "@/components/seo";
import type { Service } from "@shared/schema";

import autoImage from "@assets/automobile_car_vehic_1b402b37.jpg";
import heavyImage from "@assets/heavy_machinery_equi_09b3c560.jpg";
import woodenImage from "@assets/wooden_crate_packing_50a7b666.jpg";
import palletImage from "@assets/palletization_wareho_ae154d1b.jpg";
import bundlingImage from "@assets/cargo_bundling_strap_d7a882d9.jpg";

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

// Default features for fallback
const defaultFeatures = [
  "Professional service",
  "Experienced team",
  "Quality materials",
  "Fully insured"
];

export default function ServiceDetail() {
  const params = useParams();
  const slug = params.id as string;

  const { data: apiService, isLoading } = useQuery<Service>({
    queryKey: ["/api/services", slug],
  });

  if (isLoading) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (!apiService) {
    return (
      <Layout>
        <div className="min-h-[60vh] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Service Not Found</h1>
            <Link href="/services">
              <Button>Back to Services</Button>
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const service = apiService;
  const IconComponent = iconMap[slug] || Package;
  const image = service.imageUrl || imageMap[slug] || autoImage;

  // Parse JSON fields safely
  let workflowSteps: Array<{ title: string; description?: string }> = [];
  let galleryImages: string[] = [];
  let features: string[] = [];

  try {
    const parsed = JSON.parse(service.workflowSteps || "[]");
    // Support both old format (string array) and new format (object array)
    workflowSteps = parsed.map((step: any) =>
      typeof step === 'string' ? { title: step } : step
    );
  } catch (e) {
    console.error("Failed to parse workflow steps:", e);
    workflowSteps = [];
  }

  try {
    galleryImages = JSON.parse(service.galleryImages || "[]");
  } catch (e) {
    console.error("Failed to parse gallery images:", e);
    galleryImages = [];
  }

  try {
    features = JSON.parse(service.features || "[]");
  } catch (e) {
    console.error("Failed to parse features:", e);
    features = [];
  }

  // Use default features if none provided
  const displayFeatures = features.length > 0 ? features : defaultFeatures;

  return (
    <Layout>
      <SEO
        title={service.title}
        description={service.shortDescription || service.title}
        image={image}
      />
      <section className="relative py-20 lg:py-28" data-testid="section-service-hero">
        <div className="absolute inset-0">
          <img
            src={image}
            alt={`${service.title} - Professional cargo securing service`}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/services" className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Services
          </Link>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 bg-primary rounded-lg flex items-center justify-center">
              <IconComponent className="w-8 h-8 text-primary-foreground" />
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-white" data-testid="text-service-detail-title">
              {service.title}
            </h1>
          </div>
          <p className="text-white/90 text-lg max-w-2xl">
            {service.shortDescription}
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-background" data-testid="section-service-description">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-foreground mb-4">About This Service</h2>
              <p className="text-muted-foreground leading-relaxed mb-8 whitespace-pre-line" data-testid="text-service-description">
                {service.fullDescription}
              </p>

              {service.importance && (
                <>
                  <h3 className="text-xl font-bold text-foreground mb-4">Why It Matters</h3>
                  <p className="text-muted-foreground leading-relaxed whitespace-pre-line" data-testid="text-service-importance">
                    {service.importance}
                  </p>
                </>
              )}
            </div>

            <div>
              <Card className="sticky top-24" data-testid="card-service-features">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">Service Features</h3>
                  <ul className="space-y-3">
                    {displayFeatures.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Link href="/contact" className="block mt-6">
                    <Button className="w-full gap-2" data-testid="button-service-quote">
                      Get a Quote
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {workflowSteps.length > 0 && (
        <section className="py-16 lg:py-24 bg-muted/30" data-testid="section-workflow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Our Process</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                A systematic approach to ensure the highest quality results
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {workflowSteps.map((step, index) => (
                <div key={index} className="relative" data-testid={`workflow-step-${index + 1}`}>
                  <Card className="h-full">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                        <span className="text-primary-foreground font-bold text-lg">{index + 1}</span>
                      </div>
                      <h3 className="font-semibold text-foreground mb-2">{step.title}</h3>
                      {step.description && (
                        <p className="text-sm text-muted-foreground">{step.description}</p>
                      )}
                    </CardContent>
                  </Card>
                  {index < workflowSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-primary/30" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {galleryImages.length > 0 && (
        <section className="py-16 lg:py-24 bg-background" data-testid="section-service-gallery">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">Gallery</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                See our work in action
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryImages.map((imageUrl, index) => (
                <div key={index} className="relative aspect-video rounded-lg overflow-hidden group">
                  <img
                    src={imageUrl}
                    alt={`${service.title} gallery image ${index + 1}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="py-16 lg:py-24 bg-primary" data-testid="section-service-cta">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8">
            Contact us today for a free consultation and quote for your {service.title?.toLowerCase()} needs.
          </p>
          <Link href="/contact">
            <Button
              size="lg"
              className="gap-2 bg-white text-primary hover:bg-white/90"
              data-testid="button-service-cta"
            >
              Contact Us Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
