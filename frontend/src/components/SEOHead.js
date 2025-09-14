import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOHead = ({ 
  title = "Free BMI Calculator - Calculate Body Mass Index Online | Instant Results",
  description = "Free BMI calculator online - Calculate your Body Mass Index instantly with our advanced BMI calculator. Includes body fat estimation, ideal weight, calorie needs, and macros calculator.",
  keywords = "BMI calculator, body mass index calculator, calculate BMI, free BMI calculator, BMI calculator online, healthy BMI range, BMI categories, body fat calculator",
  canonical = "/",
  ogTitle,
  ogDescription,
  ogImage = "/og-image.jpg",
  structuredData,
  additionalMeta = []
}) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={`https://bmicalculator.com${canonical}`} />
      
      {/* Open Graph */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={`https://bmicalculator.com${canonical}`} />
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="BMI Calculator Online" />
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional Meta Tags */}
      {additionalMeta.map((meta, index) => (
        <meta key={index} {...meta} />
      ))}
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;