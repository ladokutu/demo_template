'use client';
import { useVisible } from '@/src/hooks/useVisible';
import { SERVICES } from '@/src/data';
import { t, fadeUp, fadeUpD, hidden } from '@/src/styles/shared';

export default function Services() {
  const [ref, visible] = useVisible();

  return (
    <section ref={ref} id="layanan" style={{ background: '#fff', padding: '100px 2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 64, ...(visible ? fadeUp : hidden) }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: t.blueLight, border: `1px solid rgba(27,110,243,0.15)`, borderRadius: 100, padding: '6px 16px', fontSize: 12, fontWeight: 700, color: t.blue, marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Layanan Kami
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: t.ink, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 16 }}>
            Solusi Teknologi <em style={{ color: t.blue, fontFamily: 'Fraunces, serif' }}>Lengkap</em>
          </h2>
          <p style={{ fontSize: 17, color: t.ink3, maxWidth: 540, margin: '0 auto', lineHeight: 1.7 }}>
            Dari konsep hingga deployment, kami menyediakan layanan IT end-to-end yang disesuaikan dengan kebutuhan dan skala bisnis Anda.
          </p>
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(340px, 100%), 1fr))', gap: 24 }} className="three-col">
          {SERVICES.map((svc, i) => (
            <div
              key={svc.title}
              style={{
                background: '#fff',
                border: `1.5px solid ${t.line}`,
                borderRadius: 16,
                padding: '32px 28px',
                boxShadow: t.shadowSm,
                position: 'relative',
                overflow: 'hidden',
                ...(visible ? fadeUpD(i * 0.08) : hidden),
              }}
              className="service-card"
            >
              {/* Top accent */}
              <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg, ${svc.color}, transparent)`, borderRadius: '16px 16px 0 0' }} />

              <div style={{ width: 52, height: 52, background: `${svc.color}14`, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24, marginBottom: 20, transition: 'all 0.3s' }} className="card-icon">
                {svc.icon}
              </div>

              <h3 style={{ fontSize: 17, fontWeight: 700, color: t.ink, marginBottom: 10, letterSpacing: '-0.01em' }}>{svc.title}</h3>
              <p style={{ fontSize: 14, color: t.ink3, lineHeight: 1.7, marginBottom: 20 }}>{svc.desc}</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                {svc.features.map((f) => (
                  <div key={f} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: t.ink2 }}>
                    <span style={{ width: 16, height: 16, background: `${svc.color}18`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: svc.color, flexShrink: 0 }}>✓</span>
                    {f}
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 24, display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, fontWeight: 600, color: svc.color, cursor: 'pointer' }}>
                Pelajari lebih lanjut <span>→</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
