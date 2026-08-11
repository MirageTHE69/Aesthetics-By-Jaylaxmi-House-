import React, { useState } from 'react';

export default function Footer({ onNavigate }) {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    alert(`Thank you for subscribing, seasonal lookbooks will be sent to ${email}`);
    setEmail('');
  };

  return (
    <footer style={{
      background: 'var(--deep)',
      color: '#C7C6BC',
      padding: '70px 56px 44px',
      transition: 'background-color 0.5s ease'
    }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1fr 1fr 1fr',
        gap: '40px',
        paddingBottom: '50px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)'
      }}>
        <div>
          <div style={{
            fontFamily: 'var(--serif)',
            fontSize: '30px',
            color: '#EFEBE3',
            marginBottom: '6px'
          }}>Aesthetics</div>
          <div style={{
            fontSize: '9.5px',
            letterSpacing: '3.5px',
            color: '#9DA79C',
            marginBottom: '22px'
          }}>BY JAYLAXMI HOUSE</div>
          <p style={{
            fontSize: '14px',
            lineHeight: 1.7,
            color: '#A9AFA4',
            maxWidth: '300px',
            margin: 0
          }}>Premium, made-to-order home furnishings — crafted in Vadodara since 1972.</p>
        </div>

        <div>
          <div style={{
            fontSize: '10.5px',
            letterSpacing: '2.5px',
            color: '#8F988D',
            marginBottom: '18px'
          }}>EXPLORE</div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            alignItems: 'flex-start'
          }}>
            <button 
              type="button" 
              onClick={() => onNavigate('collections')} 
              style={{ border: 'none', background: 'none', color: '#C7C6BC', textAlign: 'left', cursor: 'pointer', padding: 0, fontFamily: 'var(--sans)', fontSize: '14px' }}
            >
              Collections
            </button>
            <button 
              type="button" 
              onClick={() => onNavigate('fabric')} 
              style={{ border: 'none', background: 'none', color: '#C7C6BC', textAlign: 'left', cursor: 'pointer', padding: 0, fontFamily: 'var(--sans)', fontSize: '14px' }}
            >
              Fabric of the Year 2027
            </button>
            <button 
              type="button" 
              onClick={() => onNavigate('customize')} 
              style={{ border: 'none', background: 'none', color: '#C7C6BC', textAlign: 'left', cursor: 'pointer', padding: 0, fontFamily: 'var(--sans)', fontSize: '14px' }}
            >
              Customize with AI
            </button>
            <button 
              type="button" 
              onClick={() => onNavigate('atelier')} 
              style={{ border: 'none', background: 'none', color: '#C7C6BC', textAlign: 'left', cursor: 'pointer', padding: 0, fontFamily: 'var(--sans)', fontSize: '14px' }}
            >
              Atelier
            </button>
          </div>
        </div>

        <div>
          <div style={{
            fontSize: '10.5px',
            letterSpacing: '2.5px',
            color: '#8F988D',
            marginBottom: '18px'
          }}>STUDIO</div>
          <div style={{
            fontSize: '14px',
            lineHeight: 1.7,
            color: '#A9AFA4'
          }}>
            Race Course Circle<br />
            Vadodara 390007<br />
            +91 98000 00000
          </div>
        </div>

        <div>
          <div style={{
            fontSize: '10.5px',
            letterSpacing: '2.5px',
            color: '#8F988D',
            marginBottom: '18px'
          }}>NEWSLETTER</div>
          <div style={{
            fontSize: '14px',
            lineHeight: 1.7,
            color: '#A9AFA4',
            marginBottom: '14px'
          }}>Seasonal lookbooks, quietly.</div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', borderBottom: '1px solid rgba(255, 255, 255, 0.25)' }}>
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                background: 'none',
                color: '#EFEBE3',
                padding: '6px 0',
                fontFamily: 'var(--sans)',
                fontSize: '14px'
              }}
              required
            />
            <button 
              type="submit" 
              style={{
                border: 'none',
                background: 'none',
                color: '#C98A5E',
                cursor: 'pointer',
                fontSize: '16px'
              }}
            >
              →
            </button>
          </form>
        </div>
      </div>

      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '24px',
        fontSize: '11px',
        letterSpacing: '1px',
        color: '#8F988D'
      }}>
        <span>© 1972–2026 Jaylaxmi House</span>
        <span>Vadodara · Gujarat · India</span>
      </div>
    </footer>
  );
}
