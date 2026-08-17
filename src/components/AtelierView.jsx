import React, { useState } from 'react';
import atelierWide from '../assets/atelier-wide.png';
import atelierDetail from '../assets/atelier-detail.png';
import { getStoredClients } from '../data/storage';

export default function AtelierView() {
  const [selectedMilestone, setSelectedMilestone] = useState(0);
  const clients = getStoredClients();

  const MILESTONES = [
    {
      year: '1970s',
      title: 'Jaylaxmi Furnishings Foundation',
      desc: 'Our journey began nearly five decades ago as Jaylaxmi Furnishings, built on a simple promise—to offer quality, honesty, and relationships that last. Sourcing natural cottons, hand-finished drapes, and traditional craftsmanship for homes across Gujarat.'
    },
    {
      year: '2000s',
      title: 'Architectural & Institutional Growth',
      desc: 'Partnered with renowned architects, hospital institutions, university campuses, and leading corporate groups. Built deep trust across Vadodara and Western India for precision drapery and bespoke contract upholstery.'
    },
    {
      year: '2017',
      title: 'Evolution into Aesthetics',
      desc: 'That generational legacy evolved into Aesthetics—a modern home décor destination created to meet the changing aspirations of contemporary homes while staying true to the ethics and craftsmanship that built our name.'
    },
    {
      year: 'Today',
      title: 'Trusted Across India & Digital Atelier',
      desc: 'Aesthetics has grown into one of the most trusted names in home décor—bringing together 30+ global luxury brands, custom furniture manufacturing, handloom floorings, and AI-assisted interior visualization.'
    }
  ];

  return (
    <main className="sec-pad animate-fade" style={{ padding: '74px 56px 110px' }}>
      {/* 1. Header & Story Introduction */}
      <section style={{ maxWidth: '820px', marginBottom: '60px' }}>
        <div style={{
          fontSize: '11px',
          letterSpacing: '3.5px',
          color: 'var(--accent)',
          marginBottom: '18px',
          fontWeight: 600
        }}>THE ATELIER &amp; HERITAGE</div>
        <h1 style={{
          fontFamily: 'var(--serif)',
          fontWeight: 500,
          fontSize: 'clamp(38px, 8vw, 72px)',
          lineHeight: 1.02,
          letterSpacing: '-1px',
          marginBottom: '28px'
        }}>
          Made with honesty,<br />
          <em style={{ fontStyle: 'italic' }}>for five decades.</em>
        </h1>
        <p style={{
          fontSize: '17px',
          lineHeight: 1.85,
          color: '#5C554A',
          marginBottom: '20px'
        }}>
          Every beautiful space begins with a story. Our journey began nearly five decades ago as <strong>Jaylaxmi Furnishings</strong>, built on a simple promise—to offer quality, honesty, and relationships that last. These values became the foundation of everything we do and continue to guide us even today.
        </p>
        <p style={{
          fontSize: '17px',
          lineHeight: 1.85,
          color: '#5C554A',
          marginBottom: '20px'
        }}>
          In <strong>2017</strong>, that legacy evolved into <strong>Aesthetics</strong>—a modern home décor destination created to meet the changing aspirations of contemporary homes while staying true to the ethics that built our name.
        </p>
        <p style={{
          fontSize: '17px',
          lineHeight: 1.85,
          color: '#5C554A',
          margin: 0
        }}>
          At Aesthetics, we believe history gives us our roots, but the future gives us our purpose. While we proudly honour our heritage, we continuously explore new ideas, global trends, premium furniture designs, and carefully curated soft furnishings to help create homes that are timeless, elegant, and deeply personal.
        </p>
      </section>

      {/* 2. Workshop Image grid */}
      <section className="atelier-img-grid" style={{
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

      {/* 3. Interactive Timeline Section */}
      <section style={{ marginBottom: '110px' }}>
        <div style={{ fontSize: '11px', letterSpacing: '3.5px', color: 'var(--accent)', marginBottom: '18px', fontWeight: 600 }}>OUR CHRONOLOGY</div>
        <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(30px, 6vw, 52px)', lineHeight: 1.05, letterSpacing: '-0.5px', marginBottom: '48px' }}>
          From Jaylaxmi Furnishings <em style={{ fontStyle: 'italic' }}>to Aesthetics.</em>
        </h2>

        <div className="timeline-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '64px', alignItems: 'start' }}>
          {/* Year buttons (left) */}
          <div className="timeline-years" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
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
                  fontSize: '34px',
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
                  fontWeight: selectedMilestone === idx ? 600 : 400
                }}>
                  {milestone.title}
                </div>
              </button>
            ))}
          </div>

          {/* Details (right) */}
          <div className="timeline-detail" style={{
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
            <p style={{ fontSize: '16px', lineHeight: 1.85, color: '#5C554A', margin: 0 }}>
              {MILESTONES[selectedMilestone].desc}
            </p>
          </div>
        </div>
      </section>

      {/* 4. Awards, Recognition & Sustainability */}
      <section className="sustain-grid" style={{
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
          <div style={{ fontSize: '10px', letterSpacing: '3px', color: '#C98A5E', marginBottom: '20px', fontWeight: 600 }}>CRAFT COMMITMENT</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(28px, 5.5vw, 44px)', lineHeight: 1.1, marginBottom: '20px' }}>
            Awards, recognitions, <em style={{ fontStyle: 'italic' }}>&amp; lasting relationships.</em>
          </h2>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#C7C6BC', maxWidth: '440px', margin: 0 }}>
            The awards and recognitions we have received from the global brands we represent are a reflection of our commitment to quality, craftsmanship, and customer satisfaction.
          </p>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.14)', paddingBottom: '20px' }}>
            <h4 style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 500, color: '#E8C9AF', marginBottom: '8px' }}>Honest Pricing &amp; Longevity</h4>
            <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#C7C6BC', margin: 0 }}>Built on five decades of integrity, we provide transparent measurements, authentic fabrics, and uncompromised finishing.</p>
          </div>
          <div style={{ borderBottom: '1px solid rgba(255,255,255,0.14)', paddingBottom: '20px' }}>
            <h4 style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 500, color: '#E8C9AF', marginBottom: '8px' }}>Architectural Collaborations</h4>
            <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#C7C6BC', margin: 0 }}>Trusted by interior designers and architects across India for private bungalows, penthouse residences, and luxury hotel projects.</p>
          </div>
          <div>
            <h4 style={{ fontFamily: 'var(--serif)', fontSize: '20px', fontWeight: 500, color: '#E8C9AF', marginBottom: '8px' }}>Master Weavers &amp; Tailoring</h4>
            <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#C7C6BC', margin: 0 }}>Every curtain, blind, sofa, and wallpaper is tailored and fitted by our in-house Vadodara installation artisans.</p>
          </div>
        </div>
      </section>

      <style>{`
        .zoom-hover-img:hover {
          transform: scale(1.04);
        }
        @media (max-width: 800px) {
          .atelier-img-grid {
            grid-template-columns: 1fr !important;
            margin-bottom: 64px !important;
          }
          .timeline-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
          .timeline-years {
            flex-direction: row !important;
            flex-wrap: wrap !important;
            gap: 10px !important;
          }
          .timeline-years button {
            padding: 10px 16px !important;
            border-left: none !important;
            border-bottom: 3px solid #ECE7DE;
          }
          .timeline-detail {
            padding: 32px 24px !important;
          }
          .sustain-grid {
            grid-template-columns: 1fr !important;
            padding: 48px 24px !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </main>
  );
}
