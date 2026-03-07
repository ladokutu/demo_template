import './globals.css';

export const metadata = {
  title: 'Ladokutu Informasi — Konsultan IT & Custom Software Development Bandung',
  description: 'Ladokutu Informasi adalah konsultan IT berpengalaman 13+ tahun di Bandung. Spesialisasi custom software development, web & mobile app, dan transformasi digital.',
  keywords: 'Konsultan IT , custom software development, web development, mobile app, transformasi digital',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
