import { useQuery } from "@tanstack/react-query";
import type { ClientLogo } from "@shared/schema";

const defaultLogos = [
  { id: "1", name: "Company A", imageUrl: "" },
  { id: "2", name: "Company B", imageUrl: "" },
  { id: "3", name: "Company C", imageUrl: "" },
  { id: "4", name: "Company D", imageUrl: "" },
  { id: "5", name: "Company E", imageUrl: "" },
  { id: "6", name: "Company F", imageUrl: "" },
];

export function ClientCarousel() {
  const { data: logos } = useQuery<ClientLogo[]>({
    queryKey: ["/api/client-logos"],
  });

  const displayLogos = logos && logos.length > 0 ? logos : defaultLogos;
  const duplicatedLogos = [...displayLogos, ...displayLogos];

  return (
    <section className="py-16 bg-muted/30" data-testid="section-client-carousel">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-2" data-testid="text-clients-title">
            Trusted by Industry Leaders
          </h2>
          <p className="text-muted-foreground">
            Companies that rely on our professional services
          </p>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex animate-scroll">
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.id}-${index}`}
                className="flex-shrink-0 w-40 h-20 mx-6 flex items-center justify-center"
                data-testid={`logo-client-${index}`}
              >
                {logo.imageUrl ? (
                  <img
                    src={logo.imageUrl}
                    alt={`${logo.name} company logo`}
                    className="max-w-full max-h-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-muted-foreground font-medium text-sm">{logo.name}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
