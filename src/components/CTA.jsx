'use client';
import { useVisible } from '@/src/hooks/useVisible';
import { t, fadeUp, hidden } from '@/src/styles/shared';

export default function CTA() {
  const [ref, visible] = useVisible(0.2);

  return (
    <section ref={ref} style={{ padding: '0 2rem 80px' }}>
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          background: `linear-gradient(135deg, ${t.blue} 0%, #7C3AED 100%)`,
          borderRadius: 24,
          padding: '64px 56px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 40,
          flexWrap: 'wrap',
          position: 'relative',
          overflow: 'hidden',
          ...(visible ? fadeUp : hidden),
        }}
      >
        {/* Decorative */}
        <div style={{ position: 'absolute', top: -60, right: 120, width: 200, height: 200, border: '1px solid rgba(255,255,255,0.1)', borderRadius: '50%', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: -40, right: -40, width: 160, height: 160, background: 'rgba(255,255,255,0.05)', borderRadius: '50%', pointerEvents: 'none' }} />

        <div style={{ position: 'relative', zIndex: 1, maxWidth: 560 }}>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em', lineHeight: 1.2, marginBottom: 14 }}>
            Siap Memulai Proyek Anda?
          </h2>
          <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
            Konsultasi gratis dengan tim ahli kami. Tidak ada kewajiban — kami akan membantu menentukan solusi terbaik untuk bisnis Anda.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', position: 'relative', zIndex: 1, flexShrink: 0 }}>
          <a
            href="#kontak"
            style={{ background: '#fff', color: t.blue, padding: '14px 28px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'all 0.22s' }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.2)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            Mulai Sekarang →
          </a>
          <a
            href="tel:+62222222222"
            style={{ background: 'transparent', color: '#fff', border: '1.5px solid rgba(255,255,255,0.5)', padding: '13px 24px', borderRadius: 8, fontWeight: 600, fontSize: 14, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'all 0.22s' }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
          >
            📞 Hubungi Kami
          </a>
        </div>
      </div>
    </section>
  );
}
