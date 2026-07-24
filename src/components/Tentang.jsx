'use client';
import { useVisible } from '@/src/hooks/useVisible';
import { STATS } from '@/src/data';
import { t, fadeUp, fadeUpD, hidden } from '@/src/styles/shared';

const TEAM = [
  { name: 'Rikko',    role: 'CEO & Founder', avatar: 'RO', color: '#1B6EF3' },
  { name: 'Iqbal Mikhafasa', role: 'CMO', avatar: 'IM', color: '#7C3AED' },
  { name: 'Junaidi Ramli',   role: 'Technical Support', avatar: 'JR', color: '#059669' },
  { name: 'Djon ',  role: 'Lead Frontend Dev',    avatar: 'SM', color: '#D97706' }
];

const VALUES = [
  { icon: '🎯', title: 'Client-First',      desc: 'Kepuasan dan keberhasilan klien adalah prioritas utama kami dalam setiap keputusan.' },
  { icon: '⚡', title: 'Delivery On-Time',  desc: 'Kami berkomitmen menyelesaikan setiap proyek tepat waktu tanpa mengorbankan kualitas.' },
  { icon: '🔍', title: 'Transparansi',      desc: 'Komunikasi terbuka dan laporan progres rutin agar Anda selalu tahu perkembangan proyek.' },
  { icon: '🚀', title: 'Inovasi',           desc: 'Kami terus belajar dan mengadopsi teknologi terkini untuk solusi yang relevan dan modern.' },
];

export default function Tentang({ teamMembers }) {
  const [ref, visible] = useVisible();

  // Use CMS data if available, fallback to hardcoded TEAM
  const team = (teamMembers && teamMembers.length > 0)
    ? teamMembers.map((m) => ({
        name: m.name,
        role: m.role,
        avatar: m.avatar || m.name?.split(' ').map(w => w[0]).join('').substring(0,2).toUpperCase(),
        color: m.color || '#1B6EF3',
        image_url: m.image_url || null,
      }))
    : TEAM;

  return (
    <section ref={ref} id="tentang" style={{ background: '#fff', padding: '100px 2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 72, ...(visible ? fadeUp : hidden) }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, background: t.blueLight, border: `1px solid rgba(27,110,243,0.15)`, borderRadius: 100, padding: '6px 16px', fontSize: 12, fontWeight: 700, color: t.blue, marginBottom: 16, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Tentang Kami
          </div>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 800, color: t.ink, letterSpacing: '-0.03em', lineHeight: 1.15, marginBottom: 16 }}>
            Siapa <em style={{ color: t.blue, fontFamily: 'Fraunces, serif' }}>Ladokutu Informasi?</em>
          </h2>
          <p style={{ fontSize: 17, color: t.ink3, maxWidth: 600, margin: '0 auto', lineHeight: 1.8 }}>
            Kami adalah tim konsultan IT & software developer berpengalaman yang berdedikasi membantu bisnis Indonesia tumbuh melalui teknologi.
          </p>
        </div>

        {/* Story + Values */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start', marginBottom: 80 }} className="two-col">

          {/* Left — story */}
          <div style={visible ? fadeUp : hidden}>
            <div style={{ position: 'relative', borderRadius: 20, overflow: 'hidden', background: `linear-gradient(135deg, ${t.blueLight} 0%, ${t.blueMid} 100%)`, padding: '48px 40px', marginBottom: 32 }}>
              {/* Decorative circles */}
              <div style={{ position: 'absolute', top: -40, right: -40, width: 180, height: 180, border: `1px solid rgba(27,110,243,0.15)`, borderRadius: '50%' }} />
              <div style={{ position: 'absolute', bottom: -20, left: -20, width: 120, height: 120, background: `rgba(27,110,243,0.06)`, borderRadius: '50%' }} />

              <div style={{ position: 'relative', zIndex: 1 }}>
                <div style={{ fontSize: 48, fontWeight: 900, color: t.blue, fontFamily: 'Fraunces, serif', lineHeight: 1, marginBottom: 4 }}>2017</div>
                <div style={{ fontSize: 14, color: t.ink3, fontWeight: 500, marginBottom: 24 }}>Tahun berdiri di Pondok Kelapa , Jakarta Timur</div>
                <p style={{ fontSize: 15, color: t.ink2, lineHeight: 1.8 }}>
                  Ladokutu Informasi lahir dari passion sekelompok developer muda Jakarta Timur yang ingin membuat teknologi lebih accessible bagi bisnis lokal. Berawal dari 3 orang di sebuah co-working space, kini kami telah berkembang menjadi tim 50+ profesional.
                </p>
              </div>
            </div>

            <p style={{ fontSize: 15, color: t.ink3, lineHeight: 1.85, marginBottom: 20 }}>
              Selama 7+ tahun, kami telah menyelesaikan lebih dari 200 proyek untuk klien dari berbagai industri — mulai dari startup tahap awal hingga perusahaan nasional dengan ribuan pengguna.
            </p>
            <p style={{ fontSize: 15, color: t.ink3, lineHeight: 1.85 }}>
              Keahlian kami mencakup custom software development, web & mobile application, cloud infrastructure, dan IT consulting strategis — semua dikerjakan oleh tim in-house yang berpengalaman dan bersertifikat.
            </p>

            <div style={{ display: 'flex', gap: 12, marginTop: 32, flexWrap: 'wrap' }}>
              {['ISO 9001 Certified', 'AWS Partner', 'Google Cloud Partner'].map((badge) => (
                <span key={badge} style={{ background: t.bg2, border: `1.5px solid ${t.line}`, borderRadius: 8, padding: '8px 14px', fontSize: 12, fontWeight: 700, color: t.ink2 }}>
                  ✓ {badge}
                </span>
              ))}
            </div>
          </div>

          {/* Right — values */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16, ...(visible ? fadeUpD(0.15) : hidden) }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: t.ink, letterSpacing: '-0.02em', marginBottom: 8 }}>Nilai-Nilai Kami</h3>
            {VALUES.map((v, i) => (
              <div
                key={v.title}
                style={{
                  display: 'flex',
                  gap: 16,
                  padding: '20px 20px',
                  background: t.bg2,
                  border: `1.5px solid ${t.line}`,
                  borderRadius: 14,
                  transition: 'all 0.25s',
                  ...(visible ? fadeUpD(0.2 + i * 0.08) : hidden),
                }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = t.blue; e.currentTarget.style.background = t.blueLight; e.currentTarget.style.transform = 'translateX(6px)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = t.line; e.currentTarget.style.background = t.bg2; e.currentTarget.style.transform = 'none'; }}
              >
                <div style={{ width: 44, height: 44, background: '#fff', borderRadius: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0, boxShadow: t.shadowSm }}>
                  {v.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15, color: t.ink, marginBottom: 4 }}>{v.title}</div>
                  <div style={{ fontSize: 13, color: t.ink3, lineHeight: 1.65 }}>{v.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div style={visible ? fadeUpD(0.1) : hidden}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <h3 style={{ fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 800, color: t.ink, letterSpacing: '-0.03em', marginBottom: 10 }}>
              Tim <em style={{ color: t.blue, fontFamily: 'Fraunces, serif' }}>Inti</em> Kami
            </h3>
            <p style={{ fontSize: 15, color: t.ink3 }}>Profesional berpengalaman yang siap mewujudkan visi teknologi Anda</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }} className="team-grid">
            {team.map((member, i) => (
              <div
                key={member.name}
                style={{
                  textAlign: 'center',
                  padding: '24px 16px',
                  background: t.bg2,
                  border: `1.5px solid ${t.line}`,
                  borderRadius: 16,
                  transition: 'all 0.25s',
                  cursor: 'default',
                  ...(visible ? fadeUpD(0.25 + i * 0.07) : hidden),
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = t.shadowMd; e.currentTarget.style.borderColor = member.color; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'none'; e.currentTarget.style.boxShadow = 'none'; e.currentTarget.style.borderColor = t.line; }}
              >
                {member.image_url ? (
                  <div style={{ width: 56, height: 56, borderRadius: '50%', overflow: 'hidden', border: `2px solid ${member.color}40`, margin: '0 auto 12px' }}>
                    <img src={member.image_url} alt={member.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                ) : (
                  <div style={{ width: 56, height: 56, background: `${member.color}18`, border: `2px solid ${member.color}40`, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16, color: member.color, margin: '0 auto 12px' }}>
                    {member.avatar}
                  </div>
                )}
                <div style={{ fontWeight: 700, fontSize: 13, color: t.ink, marginBottom: 4, lineHeight: 1.3 }}>{member.name}</div>
                <div style={{ fontSize: 11, color: t.ink3, lineHeight: 1.4 }}>{member.role}</div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Team grid responsive CSS */}
      <style>{`
        @media (max-width: 900px) { .team-grid { grid-template-columns: repeat(3, 1fr) !important; } }
        @media (max-width: 480px) { .team-grid { grid-template-columns: repeat(2, 1fr) !important; } }
      `}</style>
    </section>
  );
}
