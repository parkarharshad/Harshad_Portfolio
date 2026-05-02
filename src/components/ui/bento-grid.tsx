import { ReactNode } from "react";
import { GlowingEffect } from "./glowing-effect";

export const BentoGrid = ({ children, style }: { children?: ReactNode; style?: React.CSSProperties }) => (
  <div className="bento-grid" style={style}>
    {children}
  </div>
);

export const BentoGridItem = ({
  title, description, header, icon, onClick, colSpan = 1,
}: {
  title?: string | ReactNode;
  description?: string | ReactNode;
  header?: ReactNode;
  icon?: ReactNode;
  onClick?: () => void;
  colSpan?: number;
}) => {
  return (
    <div
      data-col={colSpan}
      style={{
        gridColumn: `span ${colSpan}`,
        position: 'relative',
        borderRadius: 16,
        padding: 2,
      }}
    >
      <GlowingEffect borderWidth={2} spread={80} proximity={100} color="rgba(99,102,241,1)" />

      <div
        onClick={onClick}
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          borderRadius: 14,
          border: '1px solid var(--border)',
          background: 'var(--bg1)',
          overflow: 'hidden',
          height: '100%',
          transition: 'border-color 0.3s, background 0.3s',
          zIndex: 2,
        }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = 'var(--border2)';
          el.style.background = 'var(--bg2)';
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = 'var(--border)';
          el.style.background = 'var(--bg1)';
        }}
      >
        {header && <div style={{ width: '100%' }}>{header}</div>}

        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '20px 24px', flex: 1 }}>
          {icon && <div>{icon}</div>}
          {title && (
            <div style={{ fontFamily: "'Plus Jakarta Sans','Inter',sans-serif", fontWeight: 700, fontSize: 18, color: 'var(--text)', letterSpacing: '-0.01em', lineHeight: 1.3 }}>
              {title}
            </div>
          )}
          {description && (
            <div className="portfolio-desc" style={{ fontFamily: "'Inter',sans-serif", fontSize: 13, fontWeight: 300, color: '#71717a', lineHeight: 1.7 }}>
              {description}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};