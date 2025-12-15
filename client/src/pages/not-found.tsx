import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Layout } from "@/components/layout/layout";
import { Home, ArrowLeft } from "lucide-react";
import { SEO } from "@/components/seo";

export default function NotFound() {
  return (
    <Layout>
      <SEO
        title="Page Not Found"
        description="The page you are looking for does not exist."
        noindex
      />
      <div className="min-h-[60vh] flex items-center justify-center py-20" data-testid="page-not-found">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="mb-8">
            <span className="text-8xl font-bold text-primary">404</span>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Page Not Found
          </h1>
          <p className="text-muted-foreground mb-8">
            Sorry, the page you are looking for doesn&apos;t exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <Button className="gap-2" data-testid="button-go-home">
                <Home className="w-4 h-4" />
                Go Home
              </Button>
            </Link>
            <Button variant="outline" onClick={() => window.history.back()} className="gap-2" data-testid="button-go-back">
              <ArrowLeft className="w-4 h-4" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
