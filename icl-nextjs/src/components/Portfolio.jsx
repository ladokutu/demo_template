'use client';
import { useState } from 'react';
import { useVisible } from '@/src/hooks/useVisible';
import { PORTFOLIO_ITEMS } from '@/src/data';
import { t, fadeUp, fadeUpD, hidden } from '@/src/styles/shared';

const TAG_COLORS = {
  'Web App':        { bg: '#EEF4FF', color: '#1B6EF3' },
  'Custom Software':{ bg: '#F3EEFF', color: '#7C3AED' },
  'Mobile App':     { bg: '#E0F9F1', color: '#059669' },
  'Dashboard':      { bg: '#FFF7ED', color: '#D97706' },
};

export default function Portfolio() {
  const [ref, visible] = useVisible();
  const [hovered, setHovered] = useState(null);

  return (
    <section ref={ref} id="portofolio" style={{ background: '#fff', padding: '100px 2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56, flexWrap: 'wrap', gap: 20, ...(visible ? fadeUp : hidden) }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: t.blueLight, border: `1px solid rgba(27,110,243,0.15)`, borderRadius: 100, padding: '6px 16px', fontSize: 12, fontWeight: 700, color: t.blue, marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Portofolio
            </div>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: t.ink, letterSpacing: '-0.03em', lineHeight: 1.15 }}>
              Karya yang <em style={{ color: t.blue, fontFamily: 'Fraunces, serif' }}>Kami Banggakan</em>
            </h2>
          </div>
          <a href="#kontak" className="btn-ghost">Lihat Semua →</a>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }} className="three-col">
          {PORTFOLIO_ITEMS.map((item, i) => {
            const tagStyle = TAG_COLORS[item.tag] || { bg: t.blueLight, color: t.blue };
            return (
              <div
                key={item.title}
                style={{
                  border: `1.5px solid ${hovered === i ? t.blue : t.line}`,
                  borderRadius: 16,
                  overflow: 'hidden',
                  background: '#fff',
                  boxShadow: hovered === i ? t.shadowLg : t.shadowSm,
                  transition: 'all 0.28s cubic-bezier(0.4,0,0.2,1)',
                  transform: hovered === i ? 'translateY(-6px)' : 'none',
                  cursor: 'pointer',
                  ...(visible ? fadeUpD(i * 0.08) : hidden),
                }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                className="portfolio-card"
              >
                {/* Image placeholder with gradient */}
                <div style={{ height: 180, background: `linear-gradient(135deg, ${t.blueLight} 0%, ${t.blueMid} 100%)`, position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 48, overflow: 'hidden' }}>
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(135deg, rgba(27,110,243,0.1), rgba(124,58,237,0.1))` }} />
                  <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 64, height: 64, background: '#fff', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: t.shadowMd, fontSize: 28 }}>
                      {['🛒','👥','🩺','🚛','📚','💳'][i]}
                    </div>
                  </div>
                  {/* Overlay on hover */}
                  <div style={{ position: 'absolute', inset: 0, background: 'rgba(27,110,243,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: hovered === i ? 1 : 0, transition: 'opacity 0.3s' }} className="port-overlay">
                    <span style={{ color: '#fff', fontWeight: 700, fontSize: 14, border: '1.5px solid rgba(255,255,255,0.6)', padding: '8px 20px', borderRadius: 8 }}>Lihat Detail →</span>
                  </div>
                </div>

                <div style={{ padding: '24px 24px 28px' }}>
                  <span style={{ background: tagStyle.bg, color: tagStyle.color, fontSize: 11, fontWeight: 700, padding: '4px 10px', borderRadius: 6, letterSpacing: '0.04em', display: 'inline-block', marginBottom: 12 }}>
                    {item.tag}
                  </span>
                  <h3 style={{ fontSize: 16, fontWeight: 700, color: t.ink, marginBottom: 6, letterSpacing: '-0.01em' }}>{item.title}</h3>
                  <p style={{ fontSize: 12, color: t.blue, fontWeight: 600, marginBottom: 10 }}>{item.client}</p>
                  <p style={{ fontSize: 13, color: t.ink3, lineHeight: 1.65 }}>{item.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
