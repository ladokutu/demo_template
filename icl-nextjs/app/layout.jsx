import './globals.css';

export const metadata = {
  title: 'iCreativeLabs — Konsultan IT & Custom Software Development Bandung',
  description: 'iCreativeLabs adalah konsultan IT berpengalaman 13+ tahun di Bandung. Spesialisasi custom software development, web & mobile app, dan transformasi digital.',
  keywords: 'konsultan IT Bandung, custom software development, web development, mobile app, transformasi digital',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
