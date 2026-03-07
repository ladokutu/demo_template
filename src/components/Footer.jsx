import Link from 'next/link';
import { NAV_LINKS, SERVICES } from '@/src/data';
import { t } from '@/src/styles/shared';

export default function Footer() {
  return (
    <footer style={{ background: t.ink, color: '#fff', padding: '64px 2rem 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1.5fr', gap: 48, paddingBottom: 48, borderBottom: '1px solid rgba(255,255,255,0.08)' }} className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, background: t.blue, borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ color: '#fff', fontWeight: 900, fontSize: 14, fontFamily: 'Fraunces, serif' }}>iC</span>
              </div>
              <span style={{ fontWeight: 800, fontSize: 16, letterSpacing: '-0.02em' }}>Ladokutu Informasi</span>
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8, maxWidth: 280, marginBottom: 24 }}>
              Konsultan IT & Custom Software Development sejak 2017. Kami membantu bisnis Indonesia bertransformasi digital.
            </p>
            <div style={{ display: 'flex', gap: 10 }}>
              {['LinkedIn', 'Instagram', 'GitHub'].map((s) => (
                <a key={s} href="#" style={{ width: 36, height: 36, background: 'rgba(255,255,255,0.08)', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontWeight: 600, transition: 'all 0.2s' }} className="footer-link">
                  {s[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Nav links */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>Halaman</h4>
            {NAV_LINKS.map(({ label, href }) => (
              <div key={label} style={{ marginBottom: 10 }}>
                <a href={href} style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: 14, transition: 'color 0.2s' }} className="footer-link">{label}</a>
              </div>
            ))}
          </div>

          {/* Services */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>Layanan</h4>
            {SERVICES.map((svc) => (
              <div key={svc.title} style={{ marginBottom: 10 }}>
                <a href="#layanan" style={{ color: 'rgba(255,255,255,0.65)', textDecoration: 'none', fontSize: 13, transition: 'color 0.2s' }} className="footer-link">{svc.title}</a>
              </div>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>Kontak</h4>
            {[
              { icon: '📧', val: 'support@ladokutu.info' },
              { icon: '📞', val: '+628515657757' },
              { icon: '📍', val: 'Pondok Kelapa, Jakarta Timur' },
            ].map((c) => (
              <div key={c.val} style={{ display: 'flex', gap: 10, marginBottom: 14, alignItems: 'flex-start' }}>
                <span style={{ fontSize: 14, flexShrink: 0, marginTop: 1 }}>{c.icon}</span>
                <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: 13, lineHeight: 1.5 }}>{c.val}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '24px 0', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
            © {new Date().getFullYear()} Ladokutu Informasi. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Kebijakan Privasi', 'Syarat & Ketentuan'].map((l) => (
              <a key={l} href="#" style={{ color: 'rgba(255,255,255,0.35)', textDecoration: 'none', fontSize: 12, transition: 'color 0.2s' }} className="footer-link">{l}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
