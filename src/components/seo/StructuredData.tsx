import { jsonLdSchema } from '@/core/seo/metadata';

export function StructuredData() {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Ageinfo",
        "url": "https://ageinfo.online",
        "logo": "https://ageinfo.online/logo-full.png",
        "sameAs": [
            "https://twitter.com/ageinfo",
            "https://instagram.com/ageinfo",
            "https://github.com/ageinfo"
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-555-555-5555",
            "contactType": "Customer Support",
            "areaServed": "US",
            "availableLanguage": ["en", "id"]
        }
    };

    // Combine schemas
    const structuredData = [
        jsonLdSchema, // SoftwareApplication from core metadata
        organizationSchema
    ];

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
                __html: JSON.stringify(structuredData)
            }}
        />
    );
}
