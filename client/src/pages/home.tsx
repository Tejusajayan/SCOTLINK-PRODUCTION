import { Layout } from "@/components/layout/layout";
import { HeroSection } from "@/components/home/hero-section";
import { ServicesPreview } from "@/components/home/services-preview";
import { ClientCarousel } from "@/components/home/client-carousel";
import { WhyChooseUsPreview } from "@/components/home/why-choose-us-preview";
import { CTASection } from "@/components/home/cta-section";

export default function Home() {
  return (
    <Layout>
      <HeroSection />
      <ServicesPreview />
      <ClientCarousel />
      <WhyChooseUsPreview />
      <CTASection />
    </Layout>
  );
}
