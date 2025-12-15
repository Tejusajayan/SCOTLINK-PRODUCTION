import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Layout } from "@/components/layout/layout";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, ImageIcon } from "lucide-react";
import { SEO } from "@/components/seo";
import type { GalleryImage } from "@shared/schema";

import autoImage from "@assets/stock_images/automobile_car_vehic_1b402b37.jpg";
import heavyImage from "@assets/stock_images/heavy_machinery_equi_09b3c560.jpg";
import woodenImage from "@assets/stock_images/wooden_crate_packing_50a7b666.jpg";
import palletImage from "@assets/stock_images/palletization_wareho_ae154d1b.jpg";
import bundlingImage from "@assets/stock_images/cargo_bundling_strap_d7a882d9.jpg";
import heroImage from "@assets/stock_images/industrial_shipping__dca51243.jpg";
import teamImage from "@assets/stock_images/warehouse_logistics__23b6dc46.jpg";

const defaultGallery = [
  { id: "1", imageUrl: heroImage, caption: "Shipping container cargo operations", category: "General" },
  { id: "2", imageUrl: autoImage, caption: "Automobile lashing service", category: "Automobile" },
  { id: "3", imageUrl: heavyImage, caption: "Heavy equipment securing", category: "Heavy Equipment" },
  { id: "4", imageUrl: woodenImage, caption: "Custom wooden packing", category: "Packing" },
  { id: "5", imageUrl: palletImage, caption: "Palletization service", category: "Palletization" },
  { id: "6", imageUrl: bundlingImage, caption: "Cargo bundling operations", category: "Bundling" },
  { id: "7", imageUrl: teamImage, caption: "Our professional team", category: "General" },
];

const categories = ["All", "Automobile", "Heavy Equipment", "Packing", "Palletization", "Partition"];

export default function Gallery() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { data: galleryImages } = useQuery<GalleryImage[]>({
    queryKey: ["/api/gallery"],
  });

  const images = galleryImages && galleryImages.length > 0 ? galleryImages : defaultGallery;

  const filteredImages = selectedCategory === "All"
    ? images
    : images.filter((img) => img.category === selectedCategory);

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <Layout>
      <SEO
        title="Project Gallery"
        description="View our latest projects showcasing our professional lashing, packing, and cargo securing work."
      />
      <section className="relative py-20 lg:py-28 bg-[#2D3748]" data-testid="section-gallery-hero">
        <div className="absolute inset-0 opacity-20">
          <img
            src={heroImage}
            alt="Gallery of professional cargo services"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#2D3748] via-[#2D3748]/90 to-[#2D3748]/80" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4" data-testid="text-gallery-title">
            Our Gallery
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            See our professional lashing and packing services in action
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-background" data-testid="section-gallery-grid">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
                data-testid={`button-filter-${category.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {category}
              </Button>
            ))}
          </div>

          {filteredImages.length === 0 ? (
            <div className="text-center py-16">
              <ImageIcon className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No Images Found</h3>
              <p className="text-muted-foreground">There are no images in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredImages.map((image, index) => (
                <div
                  key={image.id}
                  className="relative group cursor-pointer overflow-hidden rounded-lg aspect-[4/3]"
                  onClick={() => openLightbox(index)}
                  data-testid={`gallery-image-${image.id}`}
                >
                  <img
                    src={image.imageUrl}
                    alt={image.caption || "Gallery image"}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />
                  <div className="absolute inset-0 flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div>
                      <p className="text-white font-medium">{image.caption}</p>
                      <p className="text-white/70 text-sm">{image.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-5xl p-0 bg-black/95 border-none">
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
              onClick={() => setLightboxOpen(false)}
              data-testid="button-close-lightbox"
            >
              <X className="w-6 h-6" />
            </Button>

            {filteredImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                  onClick={prevImage}
                  data-testid="button-prev-image"
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                  onClick={nextImage}
                  data-testid="button-next-image"
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </>
            )}

            <div className="aspect-video flex items-center justify-center p-8">
              <img
                src={filteredImages[currentImageIndex]?.imageUrl}
                alt={filteredImages[currentImageIndex]?.caption || "Gallery image"}
                className="max-w-full max-h-full object-contain"
              />
            </div>

            <div className="p-4 text-center">
              <p className="text-white font-medium">{filteredImages[currentImageIndex]?.caption}</p>
              <p className="text-white/60 text-sm mt-1">
                {currentImageIndex + 1} of {filteredImages.length}
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}
