'use client';
import { useVisible } from '@/src/hooks/useVisible';
import { PROCESS_STEPS } from '@/src/data';
import { t, fadeUp, fadeUpD, hidden } from '@/src/styles/shared';

export default function HowWeWork() {
  const [ref, visible] = useVisible();

  return (
    <section ref={ref} id="cara-kerja" style={{ background: t.bg2, padding: '100px 2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'center' }} className="two-col">

          {/* Left text */}
          <div style={visible ? fadeUp : hidden}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: t.blueLight, border: `1px solid rgba(27,110,243,0.15)`, borderRadius: 100, padding: '6px 16px', fontSize: 12, fontWeight: 700, color: t.blue, marginBottom: 20, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Cara Kerja Kami
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: t.ink, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 20 }}>
              Proses yang <em style={{ color: t.blue, fontFamily: 'Fraunces, serif' }}>Transparan</em> & Terstruktur
            </h2>
            <p style={{ fontSize: 16, color: t.ink3, lineHeight: 1.8, marginBottom: 32 }}>
              Kami mengikuti metodologi agile yang terbukti, memastikan setiap proyek berjalan on-track, on-budget, dan sesuai ekspektasi Anda.
            </p>
            <a href="#kontak" className="btn-primary">
              Diskusi Proyek Anda →
            </a>
          </div>

          {/* Right steps */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {PROCESS_STEPS.map((step, i) => (
              <div
                key={step.num}
                style={{
                  display: 'flex',
                  gap: 20,
                  padding: '24px 0',
                  borderBottom: i < PROCESS_STEPS.length - 1 ? `1px solid ${t.line}` : 'none',
                  ...(visible ? fadeUpD(i * 0.12) : hidden),
                }}
              >
                {/* Number + line */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, flexShrink: 0 }}>
                  <div style={{ width: 44, height: 44, background: t.blue, borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 800, fontSize: 14, flexShrink: 0 }}>
                    {step.num}
                  </div>
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: t.ink, marginBottom: 6, letterSpacing: '-0.01em' }}>{step.title}</h3>
                  <p style={{ fontSize: 14, color: t.ink3, lineHeight: 1.7 }}>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
