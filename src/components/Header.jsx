import React, { useState } from 'react';

export default function Header({ currentView, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'collections', label: 'COLLECTIONS' },
    { id: 'fabric', label: 'FABRIC 2027' },
    { id: 'customize', label: 'CUSTOMIZE WITH AI' },
    { id: 'atelier', label: 'ATELIER' },
    { id: 'visit', label: 'VISIT' }
  ];

  const handleMobileNav = (id) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '18px 56px',
      background: 'rgba(241, 237, 230, 0.92)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(33, 28, 22, 0.07)'
    }} className="app-header">
      <button 
        type="button" 
        onClick={() => { onNavigate('home'); setMobileMenuOpen(false); }} 
        style={{ border: 'none', background: 'none', textAlign: 'left', cursor: 'pointer', padding: 0 }}
      >
        <div style={{
          fontFamily: 'var(--serif)',
          fontSize: '27px',
          fontWeight: 500,
          letterSpacing: '0.5px',
          lineHeight: 1,
          color: '#211C16'
        }}>Aesthetics</div>
        <div style={{
          fontFamily: 'var(--sans)',
          fontSize: '9.5px',
          fontWeight: 400,
          letterSpacing: '3.5px',
          color: 'var(--text-muted)',
          marginTop: '5px'
        }}>BY JAYLAXMI HOUSE</div>
      </button>

      {/* Desktop Navigation */}
      <nav style={{ display: 'flex', gap: '36px' }} className="desktop-nav">
        {navItems.map(item => {
          const active = currentView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onNavigate(item.id)}
              style={{
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                padding: '4px 0',
                fontFamily: 'var(--sans)',
                fontSize: '11px',
                fontWeight: 500,
                letterSpacing: '2.5px',
                color: active ? 'var(--accent)' : '#3A342B',
                borderBottom: active ? '2px solid var(--accent)' : '2px solid transparent',
                transition: 'all 0.25s ease'
              }}
            >
              {item.label}
            </button>
          );
        })}
      </nav>

      {/* Mobile Hamburger Button */}
      <button
        type="button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        style={{
          display: 'none',
          border: 'none',
          background: 'none',
          fontSize: '22px',
          cursor: 'pointer',
          color: '#211C16',
          padding: '4px'
        }}
        className="mobile-menu-toggle"
        aria-label="Toggle Navigation Menu"
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: '#F5F1E8',
          borderBottom: '1px solid rgba(33,28,22,0.1)',
          padding: '24px 32px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px',
          boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
          animation: 'aes-fade 0.2s ease'
        }}>
          {navItems.map(item => {
            const active = currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleMobileNav(item.id)}
                style={{
                  border: 'none',
                  background: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  padding: '8px 0',
                  fontFamily: 'var(--sans)',
                  fontSize: '13px',
                  fontWeight: active ? 600 : 400,
                  letterSpacing: '2.5px',
                  color: active ? 'var(--accent)' : '#3A342B'
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .app-header {
            padding: 16px 24px !important;
          }
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-toggle {
            display: block !important;
          }
        }
      `}</style>
    </header>
  );
}
