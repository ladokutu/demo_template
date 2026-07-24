'use client';
import { useVisible } from '@/src/hooks/useVisible';
import { STATS } from '@/src/data';
import { t, fadeUpD, hidden } from '@/src/styles/shared';

function StatsSkeleton() {
  return (
    <div style={{ padding: '40px 24px', textAlign: 'center' }}>
      <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', margin: '0 auto 8px', animation: 'shimmer 1.5s infinite' }} />
      <div style={{ width: 80, height: 36, borderRadius: 8, background: 'rgba(255,255,255,0.15)', margin: '0 auto 8px', animation: 'shimmer 1.5s infinite' }} />
      <div style={{ width: 100, height: 12, borderRadius: 6, background: 'rgba(255,255,255,0.1)', margin: '0 auto', animation: 'shimmer 1.5s infinite' }} />
    </div>
  );
}

export default function Stats({ items, loading }) {
  const [ref, visible] = useVisible(0.2);

  if (loading && (!items || items.length === 0)) {
    return (
      <section style={{ background: 'linear-gradient(135deg, #1B6EF3 0%, #1458CC 100%)', padding: '80px 2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <div style={{ width: 300, height: 28, borderRadius: 8, background: 'rgba(255,255,255,0.15)', margin: '0 auto 10px', animation: 'shimmer 1.5s infinite' }} />
            <div style={{ width: 200, height: 14, borderRadius: 6, background: 'rgba(255,255,255,0.1)', margin: '0 auto', animation: 'shimmer 1.5s infinite' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden' }} className="stats-row">
            <StatsSkeleton /><StatsSkeleton /><StatsSkeleton /><StatsSkeleton />
          </div>
        </div>
      </section>
    );
  }

  const statsList = items && items.length > 0 ? items : STATS;

  return (
    <section ref={ref} style={{ background: `linear-gradient(135deg, ${t.blue} 0%, #1458CC 100%)`, padding: '80px 2rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: -80, right: -80, width: 300, height: 300, border: '1px solid rgba(255,255,255,0.08)', borderRadius: '50%', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -60, left: '20%', width: 200, height: 200, border: '1px solid rgba(255,255,255,0.08)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <h2 style={{ fontSize: 'clamp(24px, 3.5vw, 38px)', fontWeight: 800, color: '#fff', letterSpacing: '-0.03em' }}>
            Angka yang Bicara Sendiri
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, marginTop: 10 }}>7 tahun kepercayaan klien Indonesia</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 2, background: 'rgba(255,255,255,0.08)', borderRadius: 16, overflow: 'hidden' }} className="stats-row">
          {statsList.map((s, i) => (
            <div
              key={s.label}
              style={{
                padding: '40px 24px',
                textAlign: 'center',
                background: 'rgba(255,255,255,0.04)',
                ...(visible ? fadeUpD(i * 0.1) : hidden),
              }}
            >
              <div style={{ fontSize: 36, marginBottom: 8 }}>{s.icon}</div>
              <div style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 900, color: '#fff', letterSpacing: '-0.04em', lineHeight: 1, fontFamily: 'Fraunces, serif' }}>{s.num}</div>
              <div style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', marginTop: 8, fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}