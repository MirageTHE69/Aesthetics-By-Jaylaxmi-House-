import React, { useState } from 'react';
import atelierWide from '../assets/atelier-wide.png';
import atelierDetail from '../assets/atelier-detail.png';

export default function AtelierView() {
  const [selectedMilestone, setSelectedMilestone] = useState(0);

  const MILESTONES = [
    {
      year: '1972',
      title: 'The First Pit-Loom',
      desc: 'Founded by master weaver Jaylaxmi Devi off Race Course Circle, Vadodara. Sourcing raw cotton from local farms and handloom weaving custom bedsheets and heavy drapes for the local community.'
    },
    {
      year: '1995',
      title: 'Bespoke Expansion',
      desc: 'Second-generation weavers expand the workshop to full-scale custom window draperies and upholstery fabrics, establishing direct partnerships with weaving families in Bhujodi and Patan.'
    },
    {
      year: '2012',
      title: 'Modern Design Atelier',
      desc: 'Third generation integrates minimalist modern architectural designs with heritage Gujarati weaves. Collaborative projects with prominent contemporary designers across India.'
    },
    {
      year: '2027',
      title: 'Craft Meets AI',
      desc: 'Introducing live digital customization through AI design assistants, letting homeowners and interior designers visualize legacy handloom materials in photorealistic contexts.'
    }
  ];

  return (
    <main style={{ padding: '74px 56px 110px' }} className="animate-fade">
      <section style={{ maxWidth: '760px', marginBottom: '60px' }}>
        <div style={{
          fontSize: '11px',
          letterSpacing: '3.5px',
          color: 'var(--accent)',
          marginBottom: '18px',
          fontWeight: 500
        }}>THE ATELIER</div>
        <h1 style={{
          fontFamily: 'var(--serif)',
          fontWeight: 500,
          fontSize: '72px',
          lineHeight: 0.98,
          letterSpacing: '-1px',
          marginBottom: '24px'
        }}>
          Made by hand,<br />
          <em style={{ fontStyle: 'italic' }}>since 1972.</em>
        </h1>
        <p style={{
          fontSize: '16.5px',
          lineHeight: 1.8,
          color: '#5C554A',
          marginBottom: '20px'
        }}>
          Jaylaxmi House began as a single curtain workshop off Race Course Circle. Three generations later, we still cut, stitch and finish every order in Vadodara — pairing traditional Gujarati craftsmanship with a restrained, modern eye.
        </p>
        <p style={{
          fontSize: '16.5px',
          lineHeight: 1.8,
          color: '#5C554A',
          margin: 0
        }}>
          Nothing here is mass-produced. Each piece is measured, made and delivered for one home — yours.
        </p>
      </section>

      {/* Workshop Image grid */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1.8fr 1.2fr',
        gap: '24px',
        marginBottom: '110px'
      }}>
        <div style={{ overflow: 'hidden', border: '1px solid rgba(33,28,22,0.06)', aspectRatio: '2/1.1' }} className="atelier-img-container">
          <img 
            src={atelierWide} 
            alt="Aesthetics Vadodara Wide Atelier Studio" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }}
            className="zoom-hover-img"
          />
        </div>
        <div style={{ overflow: 'hidden', border: '1px solid rgba(33,28,22,0.06)', aspectRatio: '1/1' }} className="atelier-img-container">
          <img 
            src={atelierDetail} 
            alt="Artisan hands stitching luxury textiles" 
            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }}
            className="zoom-hover-img"
          />
        </div>
      </section>

      {/* Interactive Timeline Section */}
      <section style={{ marginBottom: '110px' }}>
        <div style={{ fontSize: '11px', letterSpacing: '3.5px', color: 'var(--accent)', marginBottom: '18px', fontWeight: 500 }}>OUR JOURNEY</div>
        <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: '52px', lineHeight: 1, letterSpacing: '-0.5px', marginBottom: '48px' }}>
          Three generations <em style={{ fontStyle: 'italic' }}>of weaving.</em>
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '64px', alignItems: 'start' }}>
          {/* Year buttons (left) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {MILESTONES.map((milestone, idx) => (
              <button
                key={milestone.year}
                type="button"
                onClick={() => setSelectedMilestone(idx)}
                style={{
                  border: 'none',
                  background: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  padding: '16px 24px',
                  borderLeft: selectedMilestone === idx ? '3px solid var(--accent)' : '3px solid #ECE7DE',
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  fontFamily: 'var(--serif)',
                  fontSize: '36px',
                  fontWeight: 500,
                  lineHeight: 1,
                  color: selectedMilestone === idx ? 'var(--accent)' : '#8B8272',
                  transition: 'color 0.3s ease'
                }}>
                  {milestone.year}
                </div>
                <div style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '11px',
                  letterSpacing: '1px',
                  color: selectedMilestone === idx ? '#211C16' : '#8B8272',
                  marginTop: '8px',
                  fontWeight: selectedMilestone === idx ? 500 : 400
                }}>
                  {milestone.title}
                </div>
              </button>
            ))}
          </div>

          {/* Details (right) */}
          <div style={{
            background: '#FCFAF6',
            border: '1px solid rgba(33,28,22,0.06)',
            padding: '56px',
            minHeight: '260px',
            boxShadow: '0 24px 60px rgba(33,28,22,0.04)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            animation: 'aes-fade 0.5s ease'
          }} key={selectedMilestone}>
            <div style={{ fontSize: '11px', letterSpacing: '2.5px', color: 'var(--accent)', marginBottom: '14px', fontWeight: 600 }}>MILESTONE HISTORY</div>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '32px', fontWeight: 500, marginBottom: '20px', color: '#211C16' }}>{MILESTONES[selectedMilestone].title}</h3>
            <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#5C554A', margin: 0 }}>
              {MILESTONES[selectedMilestone].desc}
            </p>
          </div>
        </div>
      </section>

      {/* Sourcing and Sustainability Standards */}
      <section style={{
        background: 'var(--deep)',
        color: '#EFEBE3',
        padding: '80px 64px',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '64px',
        alignItems: 'center',
        border: '1px solid rgba(255,255,255,0.06)'
      }}>
        <div>
          <div style={{ fontSize: '10px', letterSpacing: '3px', color: '#C98A5E', marginBottom: '20px', fontWeight: 600 }}>SUSTAINABILITY &amp; ETHICS</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: '44px', lineHeight: 1.08, marginBottom: '20px' }}>
            Restoring the craft, <em style={{ fontStyle: 'italic' }}>preserving the planet.</em>
          </h2>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#C7C6BC', maxWidth: '440px', margin: 0 }}>
            Every fabric in our workshop carries certifications for both natural raw material sourcing and fair work compensation. We invest 15% of our revenue directly back into local weaver cooperatives.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.14)', paddingBottom: '20px' }}>
            <h4 style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 500, color: '#E8C9AF', marginBottom: '8px' }}>100% Organic Fibres</h4>
            <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#C7C6BC', margin: 0 }}>We use pure slub cotton, natural linen, and organic mulberry silk. No microplastics, no synthetic polyester fillers.</p>
          </div>
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.14)', paddingBottom: '20px' }}>
            <h4 style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 500, color: '#E8C9AF', marginBottom: '8px' }}>Zero-Chemical Dyeing</h4>
            <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#C7C6BC', margin: 0 }}>Our terracotta, indigo, and ochre hues are created using certified non-toxic organic dye washes, recycled rainwater, and natural mordants.</p>
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 500, color: '#E8C9AF', marginBottom: '8px' }}>Empowering Weavers</h4>
            <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#C7C6BC', margin: 0 }}>We maintain direct contracts with 44 loom artisans in Bhujodi, guaranteeing fair wages and stable income throughout the year.</p>
          </div>
        </div>
      </section>

      <style>{`
        .zoom-hover-img:hover {
          transform: scale(1.04);
        }
      `}</style>
    </main>
  );
}
