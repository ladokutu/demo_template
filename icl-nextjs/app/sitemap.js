// app/sitemap.js
// Next.js App Router — auto-generate sitemap
// Taruh file ini di: app/sitemap.js

export default function sitemap() {
  const baseUrl = 'https://ladokutu.info';
  const lastModified = new Date('2026-03-10');

  return [
    {
      url: `${baseUrl}/`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/#layanan`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/#cara-kerja`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#portofolio`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/#tentang`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/#kontak`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];
}
