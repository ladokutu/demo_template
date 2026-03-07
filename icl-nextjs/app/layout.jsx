import './globals.css';
import Script from "next/script";

export const metadata = {
  title: 'Ladokutu Informasi — Konsultan IT & Custom Software Development',
  description: 'Ladokutu Informasi adalah konsultan IT berpengalaman 7+ tahun. Spesialisasi custom software development, web & mobile app, dan transformasi digital.',
  keywords: 'Konsultan IT , custom software development, web development, mobile app, transformasi digital',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        {children}

        <Script id="tawkto" strategy="afterInteractive">
          {`
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/65fcddc2a0c6737bd1237d77/1hphs4g5m';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `}
        </Script>

      </body>
    </html>
  );
}