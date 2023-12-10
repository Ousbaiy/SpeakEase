import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://speak-ease.vercel.app',
      lastModified: new Date(),
    },
    {
      url: 'https://speak-ease.vercel.app/pricing',
      lastModified: new Date(),
    },
  ];
}
