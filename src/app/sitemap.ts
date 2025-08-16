import dbConnect from '@/lib/mongodb';
import Market from '@/lib/models/Market';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  await dbConnect();
  const markets = await Market.find({ active: true }).lean();

  const baseUrl = 'https://dpboss.gold';

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
  ];

  const marketPages = markets.flatMap(market => [
    {
      url: `${baseUrl}/jodi-chart-record/${market.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/panel-chart-record/${market.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ]);

  return [...staticPages, ...marketPages];
}
