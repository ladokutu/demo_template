'use client';
import { useVisible } from '@/src/hooks/useVisible';
import { TESTIMONIALS } from '@/src/data';
import { t, fadeUp, fadeUpD, hidden } from '@/src/styles/shared';

export default function Testimonials() {
  const [ref, visible] = useVisible();

  return (
    <section ref={ref} style={{ background: t.bg2, padding: '100px 2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div style={{ textAlign: 'center', marginBottom: 60, ...(visible ? fadeUp : hidden) }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: t.blueLight, border: `1px solid rgba(27,110,243,0.15)`, borderRadius: 100, padding: '6px 16px', fontSize: 12, fontWeight: 700, color: t.blue, marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Testimoni
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: t.ink, letterSpacing: '-0.03em', lineHeight: 1.15 }}>
            Apa Kata <em style={{ color: t.blue, fontFamily: 'Fraunces, serif' }}>Klien Kami</em>
          </h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="three-col">
          {TESTIMONIALS.map((testi, i) => (
            <div
              key={testi.name}
              style={{
                background: '#fff',
                border: `1.5px solid ${t.line}`,
                borderRadius: 16,
                padding: '32px 28px',
                boxShadow: t.shadowSm,
                ...(visible ? fadeUpD(i * 0.12) : hidden),
              }}
            >
              {/* Stars */}
              <div style={{ display: 'flex', gap: 3, marginBottom: 20 }}>
                {[...Array(5)].map((_, j) => (
                  <span key={j} style={{ color: '#FBBF24', fontSize: 16 }}>★</span>
                ))}
              </div>

              {/* Quote */}
              <p style={{ fontSize: 14, color: t.ink2, lineHeight: 1.8, marginBottom: 28, fontStyle: 'italic' }}>
                &ldquo;{testi.text}&rdquo;
              </p>

              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, paddingTop: 20, borderTop: `1px solid ${t.line}` }}>
                <div style={{ width: 44, height: 44, background: `linear-gradient(135deg, ${t.blue}, #7C3AED)`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
                  {testi.avatar}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: t.ink }}>{testi.name}</div>
                  <div style={{ fontSize: 12, color: t.ink3 }}>{testi.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
