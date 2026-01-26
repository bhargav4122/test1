import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title: string;
    description: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: string;
    children?: React.ReactNode;
}

const SEO: React.FC<SEOProps> = ({
    title,
    description,
    keywords,
    image = 'https://res.cloudinary.com/dsf4d41i8/image/upload/v1755995499/BDS_Logo_-_Original_with_Transparent_Background_-_5000x5000_vb9jll.png',
    url,
    type = 'website',
    children
}) => {
    const siteTitle = 'Business & Data Solutions';
    const fullTitle = `${title} | ${siteTitle}`;
    const currentUrl = url || window.location.href;

    return (
        <Helmet>
            {/* Standard metadata tags */}
            <title>{fullTitle}</title>
            <meta name='description' content={description} />
            {keywords && <meta name='keywords' content={keywords} />}
            <link rel="canonical" href={currentUrl} />

            {/* Open Graph tags (Facebook, LinkedIn) */}
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:type" content={type} />
            <meta property="og:url" content={currentUrl} />
            <meta property="og:image" content={image} />
            <meta property="og:site_name" content={siteTitle} />

            {/* Twitter Card tags */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            {children} {/* Render children here */}
        </Helmet>
    );
};

export default SEO;

