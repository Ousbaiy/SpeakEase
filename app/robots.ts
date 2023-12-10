import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/chat', '/register'],
    },
    sitemap: 'https://speak-ease.vercel.app/sitemap.xml',
  };
}
