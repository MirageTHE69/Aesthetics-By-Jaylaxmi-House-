import React, { useState } from 'react';
import { getStoredContact } from '../data/storage';

export default function Footer({ onNavigate }) {
  const [email, setEmail] = useState('');
  const contact = getStoredContact();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    alert(`Thank you for subscribing, seasonal lookbooks will be sent to ${email}`);
    setEmail('');
  };

  return (
    <footer className="sec-pad" style={{
      background: 'var(--deep)',
      color: '#C7C6BC',
      padding: '70px 56px 44px',
      transition: 'background-color 0.5s ease'
    }}>
      <div className="footer-grid" style={{
        display: 'grid',
        gridTemplateColumns: '2fr 1.1fr 1.1fr 1.2fr',
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
            marginBottom: '20px',
            fontWeight: 600
          }}>BY JAYLAXMI HOUSE</div>
          <p style={{
            fontSize: '14px',
            lineHeight: 1.75,
            color: '#A9AFA4',
            maxWidth: '320px',
            margin: 0
          }}>
            Five decades of heritage—crafted with honesty, quality, and timeless craftsmanship in Vadodara.
          </p>
        </div>

        <div>
          <div style={{
            fontSize: '10.5px',
            letterSpacing: '2.5px',
            color: '#8F988D',
            marginBottom: '18px',
            fontWeight: 600
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
              The 9 Collections
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
              Our Story &amp; Atelier
            </button>
          </div>
        </div>

        <div>
          <div style={{
            fontSize: '10.5px',
            letterSpacing: '2.5px',
            color: '#8F988D',
            marginBottom: '18px',
            fontWeight: 600
          }}>STUDIO &amp; CONTACT</div>
          <div style={{
            fontSize: '13.5px',
            lineHeight: 1.7,
            color: '#A9AFA4'
          }}>
            Race Course Circle, Alkapuri<br />
            Vadodara, Gujarat 390007<br />
            <span style={{ color: '#E8C9AF' }}>Sales:</span> +91 9913132736<br />
            <span style={{ color: '#E8C9AF' }}>General:</span> +91 9998852736<br />
            <span style={{ color: '#E8C9AF' }}>Partner:</span> +91 9725116871
          </div>
        </div>

        <div>
          <div style={{
            fontSize: '10.5px',
            letterSpacing: '2.5px',
            color: '#8F988D',
            marginBottom: '18px',
            fontWeight: 600
          }}>CONNECT</div>
          <div style={{
            fontSize: '13.5px',
            lineHeight: 1.7,
            color: '#A9AFA4',
            marginBottom: '14px'
          }}>
            Email: <a href="mailto:Aesthetics.jhv@gmail.com" style={{ color: '#EFEBE3' }}>Aesthetics.jhv@gmail.com</a>
          </div>
          <form onSubmit={handleSubmit} style={{ display: 'flex', borderBottom: '1px solid rgba(255, 255, 255, 0.25)' }}>
            <input 
              type="email" 
              placeholder="Your email for lookbooks" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                flex: 1,
                border: 'none',
                background: 'none',
                color: '#EFEBE3',
                padding: '6px 0',
                fontFamily: 'var(--sans)',
                fontSize: '13px'
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
        flexWrap: 'wrap',
        gap: '8px',
        paddingTop: '24px',
        fontSize: '11px',
        letterSpacing: '1px',
        color: '#8F988D'
      }}>
        <span>© Jaylaxmi Furnishings · Aesthetics 2017–2026</span>
        <span>Race Course Circle · Vadodara · Gujarat · India</span>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .footer-grid {
            grid-template-columns: 1fr 1fr !important;
            row-gap: 40px !important;
          }
        }
        @media (max-width: 500px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </footer>
  );
}
