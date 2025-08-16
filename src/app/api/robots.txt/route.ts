export function GET() {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://dpboss.gold/sitemap.xml`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
    },
  });
}
