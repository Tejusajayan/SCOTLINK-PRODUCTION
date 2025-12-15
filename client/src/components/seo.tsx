import { Helmet } from "react-helmet-async";

interface SEOProps {
    title: string;
    description: string;
    keywords?: string[];
    canonical?: string;
    image?: string;
    noindex?: boolean;
}

export function SEO({ title, description, keywords, canonical, image, noindex }: SEOProps) {
    const siteTitle = "Scotlink";
    const fullTitle = `${title} | ${siteTitle}`;

    // Default image if not provided (e.g., logo or og-image)
    const metaImage = image || "/assets/logo.png"; // Assuming there is a logo asset, or we can leave it blank

    return (
        <Helmet>
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            {keywords && <meta name="keywords" content={keywords.join(", ")} />}
            {noindex && <meta name="robots" content="noindex, nofollow" />}

            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            {metaImage && <meta property="og:image" content={metaImage} />}

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            {metaImage && <meta name="twitter:image" content={metaImage} />}

            {canonical && <link rel="canonical" href={canonical} />}
        </Helmet>
    );
}
