import React, { useState, useEffect, useRef } from 'react';
import mittiInspiration from '../assets/mitti-inspiration.png';
import mittiCraft from '../assets/mitti-craft.png';
import mittiCurtains from '../assets/mitti-curtains.png';
import mittiSofa from '../assets/mitti-sofa.png';
import mittiKitchen from '../assets/mitti-kitchen.png';
import patternSolid from '../assets/pattern-solid.png';
import patternHerringbone from '../assets/pattern-herringbone.png';
import patternStripe from '../assets/pattern-stripe.png';
import patternGrid from '../assets/pattern-grid.png';

export default function FabricView({ onNavigate, onSelectCategory }) {
  const [texMode, setTexMode] = useState(0);
  const storyRef = useRef(null);

  const TEX_MODES = [
    { label: 'DAYLIGHT', filter: 'sepia(0.5) saturate(1.8) hue-rotate(-12deg)' },
    { label: 'EVENING', filter: 'sepia(0.5) saturate(1.6) hue-rotate(-12deg) brightness(0.72)' },
    { label: 'RAKING LIGHT', filter: 'sepia(0.5) saturate(1.8) hue-rotate(-12deg) contrast(1.22) brightness(0.9)' }
  ];

  const handleScrollStory = () => {
    if (storyRef.current) {
      storyRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handlePairClick = (catName) => {
    onSelectCategory(catName);
    onNavigate('category');
  };

  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="animate-fade">
      {/* Hero section */}
      <section style={{
        position: 'relative',
        height: '92vh',
        minHeight: '640px',
        overflow: 'hidden',
        background: '#211C16'
      }}>
        <img 
          src="https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?w=2000&q=80" 
          alt="Mitti fabric, woven texture" 
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: 'sepia(0.5) saturate(1.9) hue-rotate(-12deg) brightness(0.82)'
          }}
          className="animate-ken-burns"
        />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to top, rgba(20,16,12,0.72), rgba(20,16,12,0.22) 45%, rgba(20,16,12,0.3))'
        }} />
        
        <div className="sec-pad" style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '0 56px',
          animation: 'aes-fade 1.1s ease 0.2s both'
        }}>
          <div style={{
            fontSize: '11px',
            letterSpacing: '5px',
            color: '#E8C9AF',
            marginBottom: '34px',
            fontWeight: 500
          }}>FABRIC OF THE YEAR · 2027 EDITION</div>
          <h1 style={{
            fontFamily: 'var(--serif)',
            fontWeight: 500,
            fontStyle: 'italic',
            fontSize: 'clamp(90px, 13vw, 180px)',
            lineHeight: 0.9,
            letterSpacing: '-2px',
            color: '#F5F1E8',
            marginBottom: '34px'
          }}>Mitti.</h1>
          <p style={{
            fontFamily: 'var(--sans)',
            fontSize: '17px',
            lineHeight: 1.7,
            color: 'rgba(245,241,232,0.85)',
            maxWidth: '440px',
            marginBottom: '44px'
          }}>A handloom cotton–silk bouclé, the colour of Gujarat's earth after the first monsoon rain.</p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button 
              type="button" 
              onClick={handleScrollStory} 
              style={{
                border: '1px solid rgba(245,241,232,0.45)',
                background: 'rgba(245,241,232,0.06)',
                backdropFilter: 'blur(6px)',
                color: '#F5F1E8',
                cursor: 'pointer',
                padding: '16px 34px',
                fontFamily: 'var(--sans)',
                fontSize: '11px',
                letterSpacing: '3px',
                transition: 'all 0.25s ease'
              }}
              className="story-btn"
            >
              DISCOVER THE STORY
            </button>
            <a 
              href="/fabric-of-the-year-2027.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              style={{
                border: '1px solid var(--accent)',
                background: 'var(--accent)',
                color: '#ffffff',
                cursor: 'pointer',
                padding: '16px 34px',
                fontFamily: 'var(--sans)',
                fontSize: '11px',
                letterSpacing: '3px',
                textDecoration: 'none',
                transition: 'all 0.25s ease',
                display: 'inline-block'
              }}
              className="accent-btn"
            >
              DOWNLOAD PDF LOOKBOOK 📄
            </a>
          </div>
        </div>
        
        {/* Animated drop line */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          width: '1px',
          height: '64px',
          background: 'rgba(245,241,232,0.7)'
        }} className="animate-drop-loop" />
      </section>

      {/* Story Sections */}
      <section ref={storyRef} className="sec-pad" style={{ padding: '110px 56px 40px' }}>
        <div className="reveal" style={{ maxWidth: '720px', marginBottom: '90px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '3.5px', color: 'var(--accent)', marginBottom: '18px', fontWeight: 500 }}>THE STORY</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(36px, 7vw, 64px)', lineHeight: 1.02, letterSpacing: '-1px' }}>
            Born of <em style={{ fontStyle: 'italic' }}>monsoon earth.</em>
          </h2>
        </div>

        <div className="story-row" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          gap: '72px',
          alignItems: 'center',
          marginBottom: '110px'
        }}>
          <div className="reveal">
            <div style={{ fontSize: '11px', letterSpacing: '3px', color: '#8B8272', marginBottom: '22px', fontWeight: 500 }}>01 — THE INSPIRATION</div>
            <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(28px, 5vw, 42px)', lineHeight: 1.08, marginBottom: '24px' }}>After the first rain.</h3>
            <p style={{ fontSize: '16px', lineHeight: 1.85, color: '#5C554A', maxWidth: '400px' }}>
              Each June, the fields around Bhuj turn from bone-dry ochre to a deep, wet terracotta. Mitti — literally, <em>earth</em> — holds that exact moment in cloth: warm, saturated, quietly alive.
            </p>
          </div>
          <div className="reveal" style={{ aspectRatio: '4/4.4', overflow: 'hidden' }}>
            <img 
              src={mittiInspiration} 
              alt="Terracotta fields of Kutch" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }} 
              className="zoom-hover-img"
            />
          </div>
        </div>

        <div className="story-row" style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 1fr',
          gap: '72px',
          alignItems: 'center',
          marginBottom: '110px'
        }}>
          <div className="reveal story-row-img" style={{ aspectRatio: '4/4.4', overflow: 'hidden' }}>
            <img
              src={mittiCraft}
              alt="Hands weaving at a pit loom"
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }}
              className="zoom-hover-img"
            />
          </div>
          <div className="reveal">
            <div style={{ fontSize: '11px', letterSpacing: '3px', color: '#8B8272', marginBottom: '22px', fontWeight: 500 }}>02 — THE CRAFT</div>
            <h3 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(28px, 5vw, 42px)', lineHeight: 1.08, marginBottom: '24px' }}>Fourteen pairs of hands.</h3>
            <p style={{ fontSize: '16px', lineHeight: 1.85, color: '#5C554A', maxWidth: '400px' }}>
              Slub-spun cotton and mulberry silk, woven on pit looms in Bhujodi. Eleven days per bolt. The irregularity is not a flaw — it is the signature of the hand that made it.
            </p>
          </div>
        </div>

        <div className="reveal" style={{ textAlign: 'center', padding: '40px 0 90px', maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontWeight: 500, fontSize: 'clamp(26px, 5vw, 44px)', lineHeight: 1.3, color: '#2C271F', marginBottom: '28px' }}>
            “The colour of Gujarat after the first rain — held in cloth.”
          </p>
          <div style={{ fontSize: '10.5px', letterSpacing: '3px', color: '#8B8272', fontWeight: 500 }}>
            RAJESH VYAS · MASTER WEAVER, BHUJODI
          </div>
        </div>
      </section>

      {/* Texture showcase */}
      <section className="sec-pad texture-grid" style={{
        background: 'var(--deep)',
        color: '#EFEBE3',
        display: 'grid',
        gridTemplateColumns: '1.15fr 1fr',
        gap: '64px',
        alignItems: 'center',
        padding: '90px 56px',
        transition: 'background-color 0.5s ease'
      }}>
        <div style={{ overflow: 'hidden', aspectRatio: '4/3.2' }}>
          <img 
            src="https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?w=1600&q=80" 
            alt="Mitti texture, macro" 
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: TEX_MODES[texMode].filter,
              transition: 'filter 0.6s ease, transform 0.8s ease'
            }}
            className="zoom-hover-img"
          />
        </div>
        <div>
          <div style={{ fontSize: '11px', letterSpacing: '3.5px', color: '#C98A5E', marginBottom: '22px', fontWeight: 500 }}>THE TEXTURE</div>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontWeight: 500,
            fontSize: 'clamp(32px, 6vw, 54px)',
            lineHeight: 1.05,
            letterSpacing: '-0.5px',
            marginBottom: '22px'
          }}>Up close,<br /><em style={{ fontStyle: 'italic' }}>it breathes.</em></h2>
          <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#C7C6BC', maxWidth: '380px', marginBottom: '36px' }}>
            See how the bouclé behaves under different light — hover the swatch to move closer.
          </p>

          {/* Light Mode Selector Toggles */}
          <div style={{ display: 'flex', gap: '10px', marginBottom: '40px', flexWrap: 'wrap' }}>
            {TEX_MODES.map((mode, i) => (
              <button
                key={mode.label}
                type="button"
                onClick={() => setTexMode(i)}
                style={{
                  border: texMode === i ? '1px solid #C98A5E' : '1px solid rgba(239,235,227,0.3)',
                  background: texMode === i ? 'rgba(201,138,94,0.16)' : 'transparent',
                  color: texMode === i ? '#E8C9AF' : '#C7C6BC',
                  cursor: 'pointer',
                  padding: '11px 18px',
                  fontFamily: 'var(--sans)',
                  fontSize: '10.5px',
                  letterSpacing: '2px',
                  transition: 'all 0.2s ease',
                  fontWeight: 500
                }}
              >
                {mode.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '20px', padding: '14px 0', borderTop: '1px solid rgba(255,255,255,0.14)' }}>
              <span style={{ color: '#9DA79C', letterSpacing: '1px', fontSize: '11px', whiteSpace: 'nowrap', fontWeight: 500 }}>SLUB DENSITY</span>
              <span style={{ fontSize: '13.5px', textAlign: 'right', whiteSpace: 'nowrap' }}>Irregular · 6–9 per inch</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '20px', padding: '14px 0', borderTop: '1px solid rgba(255,255,255,0.14)' }}>
              <span style={{ color: '#9DA79C', letterSpacing: '1px', fontSize: '11px', whiteSpace: 'nowrap', fontWeight: 500 }}>PILE</span>
              <span style={{ fontSize: '13.5px', textAlign: 'right', whiteSpace: 'nowrap' }}>Low bouclé loop</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '20px', padding: '14px 0', borderTop: '1px solid rgba(255,255,255,0.14)', borderBottom: '1px solid rgba(255,255,255,0.14)' }}>
              <span style={{ color: '#9DA79C', letterSpacing: '1px', fontSize: '11px', whiteSpace: 'nowrap', fontWeight: 500 }}>HAND-FEEL</span>
              <span style={{ fontSize: '13.5px', textAlign: 'right', whiteSpace: 'nowrap' }}>Dry, warm, grounded</span>
            </div>
          </div>
        </div>
      </section>

      {/* Colour palette circles */}
      <section className="sec-pad" style={{ padding: '110px 56px' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '3.5px', color: 'var(--accent)', marginBottom: '18px', fontWeight: 500 }}>THE PALETTE</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(30px, 6vw, 56px)', lineHeight: 1.05 }}>
            Lives quietly <em style={{ fontStyle: 'italic' }}>with colour.</em>
          </h2>
        </div>
        
        <div className="reveal" style={{ display: 'flex', justifyContent: 'center', gap: '56px', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center', width: '130px' }}>
            <div style={{
              width: '104px',
              height: '104px',
              borderRadius: '50%',
              background: '#B4592F',
              margin: '0 auto 18px',
              transition: 'transform 0.3s ease',
              boxShadow: '0 18px 40px rgba(180,89,47,0.3)'
            }} className="swatch-circle" />
            <div style={{ fontFamily: 'var(--serif)', fontSize: '19px', marginBottom: '5px' }}>Mitti</div>
            <div style={{ fontSize: '11.5px', color: '#8B8272', lineHeight: 1.5 }}>The fabric itself — sofas, drapery</div>
          </div>

          <div style={{ textAlign: 'center', width: '130px' }}>
            <div style={{
              width: '104px',
              height: '104px',
              borderRadius: '50%',
              background: '#D9C6A5',
              margin: '0 auto 18px',
              transition: 'transform 0.3s ease',
              boxShadow: '0 18px 40px rgba(33,28,22,0.12)'
            }} className="swatch-circle" />
            <div style={{ fontFamily: 'var(--serif)', fontSize: '19px', marginBottom: '5px' }}>Kharif Sand</div>
            <div style={{ fontSize: '11.5px', color: '#8B8272', lineHeight: 1.5 }}>Walls &amp; sheer curtains</div>
          </div>

          <div style={{ textAlign: 'center', width: '130px' }}>
            <div style={{
              width: '104px',
              height: '104px',
              borderRadius: '50%',
              background: '#33443A',
              margin: '0 auto 18px',
              transition: 'transform 0.3s ease',
              boxShadow: '0 18px 40px rgba(51,68,58,0.3)'
            }} className="swatch-circle" />
            <div style={{ fontFamily: 'var(--serif)', fontSize: '19px', marginBottom: '5px' }}>Neem</div>
            <div style={{ fontSize: '11.5px', color: '#8B8272', lineHeight: 1.5 }}>Accent seating, rugs</div>
          </div>

          <div style={{ textAlign: 'center', width: '130px' }}>
            <div style={{
              width: '104px',
              height: '104px',
              borderRadius: '50%',
              background: '#EFE9DD',
              border: '1px solid #DAD3C7',
              margin: '0 auto 18px',
              transition: 'transform 0.3s ease'
            }} className="swatch-circle" />
            <div style={{ fontFamily: 'var(--serif)', fontSize: '19px', marginBottom: '5px' }}>Chalk</div>
            <div style={{ fontSize: '11.5px', color: '#8B8272', lineHeight: 1.5 }}>Linen, ceilings, trim</div>
          </div>

          <div style={{ textAlign: 'center', width: '130px' }}>
            <div style={{
              width: '104px',
              height: '104px',
              borderRadius: '50%',
              background: '#2B2622',
              margin: '0 auto 18px',
              transition: 'transform 0.3s ease',
              boxShadow: '0 18px 40px rgba(33,28,22,0.3)'
            }} className="swatch-circle" />
            <div style={{ fontFamily: 'var(--serif)', fontSize: '19px', marginBottom: '5px' }}>Iron Ink</div>
            <div style={{ fontSize: '11.5px', color: '#8B8272', lineHeight: 1.5 }}>Hardware &amp; framing</div>
          </div>
        </div>
      </section>

      {/* Subtypes & Patterns Grid */}
      <section className="sec-pad" style={{ padding: '0 56px 110px' }}>
        <div className="reveal" style={{ marginBottom: '48px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '3.5px', color: 'var(--accent)', marginBottom: '18px', fontWeight: 500 }}>THE PATTERNS</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(30px, 6vw, 52px)', lineHeight: 1.05 }}>
            Subtypes &amp; <em style={{ fontStyle: 'italic' }}>weaves.</em>
          </h2>
          <p style={{ fontSize: '16px', lineHeight: 1.8, color: '#5C554A', maxWidth: '560px', marginTop: '16px' }}>
            Mitti is available in four distinct hand-loomed patterns, each expressing a different facet of Kutchi weaving tradition.
          </p>
        </div>

        <div className="reveal pattern-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px' }}>
          {[
            {
              name: 'Mitti Classic Solid',
              desc: 'The original slub cotton-silk bouclé in a uniform terracotta wash. Perfect for large-scale upholstery.',
              img: patternSolid,
              spec: '480 GSM · Heavy Upholstery'
            },
            {
              name: 'Mitti Herringbone',
              desc: 'An alternating diagonal chevron structure that captures light at multiple angles. Gives depth to panels.',
              img: patternHerringbone,
              spec: '495 GSM · Drapes & Seating'
            },
            {
              name: 'Mitti Rain-Stripe',
              desc: 'Fine, irregular vertical lines of sand-dyed yarn that simulate rain cascading down dry clay fields.',
              img: patternStripe,
              spec: '450 GSM · Roman Blinds & Cushions'
            },
            {
              name: 'Mitti Bhujodi Grid',
              desc: 'A structural windowpane check woven with undyed raw silk thread. A striking, modern architectural grid.',
              img: patternGrid,
              spec: '460 GSM · Statement Pieces'
            }
          ].map((item, index) => (
            <div key={item.name} style={{
              background: '#FCFAF6',
              border: '1px solid rgba(33,28,22,0.06)',
              boxShadow: '0 12px 30px rgba(33,28,22,0.04)',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              display: 'flex',
              flexDirection: 'column'
            }} className="pattern-card">
              <div style={{ aspectRatio: '1/1', overflow: 'hidden', position: 'relative' }}>
                <img 
                  src={item.img} 
                  alt={item.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                  className="pattern-img"
                />
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(33,28,22,0.03)',
                  transition: 'background 0.3s ease'
                }} className="pattern-overlay" />
              </div>
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontSize: '10px', letterSpacing: '2px', color: 'var(--accent)', marginBottom: '8px', fontWeight: 600 }}>0{index + 1} · PATTERN</div>
                <h3 style={{ fontFamily: 'var(--serif)', fontSize: '22px', fontWeight: 500, color: '#211C16', marginBottom: '10px' }}>{item.name}</h3>
                <p style={{ fontSize: '13.5px', lineHeight: 1.6, color: '#6B6458', marginBottom: '18px', flex: 1 }}>{item.desc}</p>
                <div style={{
                  fontSize: '11px',
                  fontFamily: 'ui-monospace, monospace',
                  color: '#8B8272',
                  borderTop: '1px solid #ECE7DE',
                  paddingTop: '12px',
                  letterSpacing: '0.5px'
                }}>
                  {item.spec}
                </div>
              </div>
            </div>
          ))}
        </div>

        <style>{`
          .pattern-card:hover {
            transform: translateY(-8px);
            box-shadow: 0 20px 40px rgba(33,28,22,0.1) !important;
          }
          .pattern-card:hover .pattern-img {
            transform: scale(1.06);
          }
          .pattern-card:hover .pattern-overlay {
            background: rgba(33,28,22,0) !important;
          }
        `}</style>
      </section>

      {/* Specifications grid */}
      <section className="sec-pad" style={{ padding: '0 56px 110px' }}>
        <div className="reveal" style={{ marginBottom: '48px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '3.5px', color: 'var(--accent)', marginBottom: '18px', fontWeight: 500 }}>SPECIFICATIONS</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(30px, 6vw, 52px)', lineHeight: 1.05 }}>
            The material, <em style={{ fontStyle: 'italic' }}>precisely.</em>
          </h2>
        </div>

        <div className="reveal specs-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          <div style={{ background: '#FCFAF6', padding: '30px 28px', border: '1px solid rgba(33,28,22,0.05)', boxShadow: '0 20px 50px rgba(33,28,22,0.06)' }}>
            <div style={{ fontSize: '10.5px', letterSpacing: '2.5px', color: '#8B8272', marginBottom: '14px', fontWeight: 500 }}>COMPOSITION</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '23px', lineHeight: 1.25 }}>62% cotton, 28% silk, 10% linen</div>
          </div>
          <div style={{ background: '#FCFAF6', padding: '30px 28px', border: '1px solid rgba(33,28,22,0.05)', boxShadow: '0 20px 50px rgba(33,28,22,0.06)' }}>
            <div style={{ fontSize: '10.5px', letterSpacing: '2.5px', color: '#8B8272', marginBottom: '14px', fontWeight: 500 }}>WEIGHT</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '23px', lineHeight: 1.25 }}>480 GSM — upholstery grade</div>
          </div>
          <div style={{ background: '#FCFAF6', padding: '30px 28px', border: '1px solid rgba(33,28,22,0.05)', boxShadow: '0 20px 50px rgba(33,28,22,0.06)' }}>
            <div style={{ fontSize: '10.5px', letterSpacing: '2.5px', color: '#8B8272', marginBottom: '14px', fontWeight: 500 }}>FINISH</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '23px', lineHeight: 1.25 }}>Matte, stain-guarded</div>
          </div>
          <div style={{ background: '#FCFAF6', padding: '30px 28px', border: '1px solid rgba(33,28,22,0.05)', boxShadow: '0 20px 50px rgba(33,28,22,0.06)' }}>
            <div style={{ fontSize: '10.5px', letterSpacing: '2.5px', color: '#8B8272', marginBottom: '14px', fontWeight: 500 }}>DURABILITY</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '23px', lineHeight: 1.25 }}>60,000 Martindale rubs</div>
          </div>
          <div style={{ background: '#FCFAF6', padding: '30px 28px', border: '1px solid rgba(33,28,22,0.05)', boxShadow: '0 20px 50px rgba(33,28,22,0.06)' }}>
            <div style={{ fontSize: '10.5px', letterSpacing: '2.5px', color: '#8B8272', marginBottom: '14px', fontWeight: 500 }}>RECOMMENDED USE</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '23px', lineHeight: 1.25 }}>Sofas, armchairs, full-length drapery</div>
          </div>
          <div style={{ background: '#FCFAF6', padding: '30px 28px', border: '1px solid rgba(33,28,22,0.05)', boxShadow: '0 20px 50px rgba(33,28,22,0.06)' }}>
            <div style={{ fontSize: '10.5px', letterSpacing: '2.5px', color: '#8B8272', marginBottom: '14px', fontWeight: 500 }}>MAINTENANCE</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '23px', lineHeight: 1.25 }}>Dry clean; brush weekly</div>
          </div>
          <div style={{ background: '#FCFAF6', padding: '30px 28px', border: '1px solid rgba(33,28,22,0.05)', boxShadow: '0 20px 50px rgba(33,28,22,0.06)' }}>
            <div style={{ fontSize: '10.5px', letterSpacing: '2.5px', color: '#8B8272', marginBottom: '14px', fontWeight: 500 }}>WIDTH</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '23px', lineHeight: 1.25 }}>140 cm, selvedge signed</div>
          </div>
          <div style={{ background: '#FCFAF6', padding: '30px 28px', border: '1px solid rgba(33,28,22,0.05)', boxShadow: '0 20px 50px rgba(33,28,22,0.06)' }}>
            <div style={{ fontSize: '10.5px', letterSpacing: '2.5px', color: 'var(--accent)', marginBottom: '14px', fontWeight: 500 }}>EDITION</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '23px', lineHeight: 1.25, color: 'var(--accent)' }}>2027 run — 400 bolts only</div>
          </div>
        </div>
      </section>

      {/* Why Mitti */}
      <section className="sec-pad" style={{ padding: '0 56px 110px' }}>
        <div className="reveal" style={{ maxWidth: '820px', marginBottom: '70px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '3.5px', color: 'var(--accent)', marginBottom: '18px', fontWeight: 500 }}>WHY MITTI</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(32px, 6vw, 56px)', lineHeight: 1.1, letterSpacing: '-0.5px', marginBottom: '26px' }}>
            One fabric, chosen from <em style={{ fontStyle: 'italic' }}>two hundred and fourteen.</em>
          </h2>
          <p style={{ fontSize: '16px', lineHeight: 1.85, color: '#5C554A', maxWidth: '560px' }}>
            Every year our atelier selects a single textile to define the season. Mitti won for its restraint: a colour that anchors a room without demanding it, and a weave that improves with a decade of use.
          </p>
        </div>

        <div className="reveal stats-grid-4" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderTop: '1px solid #DAD3C7' }}>
          <div className="stats-item" style={{ padding: '30px 24px 0 0', borderRight: '1px solid #DAD3C7' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '46px', color: 'var(--accent)', lineHeight: 1, marginBottom: '12px' }}>214</div>
            <div style={{ fontSize: '12.5px', letterSpacing: '1px', color: '#6B6458', lineHeight: 1.6 }}>Fabrics considered across four mills</div>
          </div>
          <div className="stats-item" style={{ padding: '30px 24px 0', borderRight: '1px solid #DAD3C7' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '46px', color: 'var(--accent)', lineHeight: 1, marginBottom: '12px' }}>12</div>
            <div style={{ fontSize: '12.5px', letterSpacing: '1px', color: '#6B6458', lineHeight: 1.6 }}>Shortlisted for hand-feel and light response</div>
          </div>
          <div className="stats-item" style={{ padding: '30px 24px 0', borderRight: '1px solid #DAD3C7' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '46px', color: 'var(--accent)', lineHeight: 1, marginBottom: '12px' }}>3</div>
            <div style={{ fontSize: '12.5px', letterSpacing: '1px', color: '#6B6458', lineHeight: 1.6 }}>Woven in full trial bolts and lived with</div>
          </div>
          <div className="stats-item" style={{ padding: '30px 0 0 24px' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '46px', color: 'var(--accent)', lineHeight: 1, marginBottom: '12px' }}>1</div>
            <div style={{ fontSize: '12.5px', letterSpacing: '1px', color: '#6B6458', lineHeight: 1.6 }}>Chosen — signed by its weavers</div>
          </div>
        </div>
      </section>

      {/* Pairs with */}
      <section className="sec-pad" style={{ padding: '0 56px 110px' }}>
        <div className="reveal" style={{ marginBottom: '48px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '3.5px', color: 'var(--accent)', marginBottom: '18px', fontWeight: 500 }}>MATCHING COLLECTIONS</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(30px, 6vw, 52px)', lineHeight: 1.05 }}>
            Mitti <em style={{ fontStyle: 'italic' }}>pairs with.</em>
          </h2>
        </div>

        <div className="reveal pair-row-3" style={{ display: 'grid', gridTemplateColumns: '2fr 1.2fr 1fr', gap: '16px', marginBottom: '16px' }}>
          <button
            type="button"
            onClick={() => handlePairClick('Curtains')}
            className="pair-btn"
            style={{ position: 'relative', border: 'none', padding: 0, cursor: 'pointer', height: '340px', background: '#BFB7AA', overflow: 'hidden', display: 'block' }}
          >
            <span style={{ position: 'absolute', inset: 0, backgroundImage: `url(${mittiCurtains})`, backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.4s ease' }} className="pair-bg" />
            <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,16,12,0.62), transparent 55%)' }} />
            <span style={{ position: 'absolute', left: '20px', bottom: '42px', fontFamily: 'var(--serif)', fontSize: '24px', fontWeight: 500, color: '#FBF9F5' }}>Curtains</span>
            <span style={{ position: 'absolute', left: '20px', bottom: '18px', fontSize: '10px', letterSpacing: '2.5px', color: 'rgba(251,249,245,0.75)', fontWeight: 500 }}>EXPLORE →</span>
          </button>
          <button 
            type="button" 
            onClick={() => handlePairClick('Wallpapers')}
            style={{ position: 'relative', border: 'none', padding: 0, cursor: 'pointer', height: '340px', background: '#BFB7AA', overflow: 'hidden', display: 'block' }}
            className="pair-btn"
          >
            <span style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://images.unsplash.com/photo-1558882224-dda166733046?w=1600&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.4s ease' }} className="pair-bg" />
            <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,16,12,0.62), transparent 55%)' }} />
            <span style={{ position: 'absolute', left: '20px', bottom: '42px', fontFamily: 'var(--serif)', fontSize: '24px', fontWeight: 500, color: '#FBF9F5' }}>Wallpapers</span>
            <span style={{ position: 'absolute', left: '20px', bottom: '18px', fontSize: '10px', letterSpacing: '2.5px', color: 'rgba(251,249,245,0.75)', fontWeight: 500 }}>EXPLORE →</span>
          </button>
          <button 
            type="button" 
            onClick={() => handlePairClick('Upholstery Fabrics')}
            style={{ position: 'relative', border: 'none', padding: 0, cursor: 'pointer', height: '340px', background: '#BFB7AA', overflow: 'hidden', display: 'block' }}
            className="pair-btn"
          >
            <span style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1600&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.4s ease' }} className="pair-bg" />
            <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,16,12,0.62), transparent 55%)' }} />
            <span style={{ position: 'absolute', left: '20px', bottom: '42px', fontFamily: 'var(--serif)', fontSize: '24px', fontWeight: 500, color: '#FBF9F5' }}>Sofa Fabric</span>
            <span style={{ position: 'absolute', left: '20px', bottom: '18px', fontSize: '10px', letterSpacing: '2.5px', color: 'rgba(251,249,245,0.75)', fontWeight: 500 }}>EXPLORE →</span>
          </button>
        </div>

        <div className="reveal pair-row-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '16px' }}>
          <button 
            type="button" 
            onClick={() => handlePairClick('Wooden Flooring')}
            style={{ position: 'relative', border: 'none', padding: 0, cursor: 'pointer', height: '300px', background: '#BFB7AA', overflow: 'hidden', display: 'block' }}
            className="pair-btn"
          >
            <span style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://images.unsplash.com/photo-1618220179428-22790b461013?w=1600&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.4s ease' }} className="pair-bg" />
            <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,16,12,0.62), transparent 55%)' }} />
            <span style={{ position: 'absolute', left: '20px', bottom: '42px', fontFamily: 'var(--serif)', fontSize: '24px', fontWeight: 500, color: '#FBF9F5' }}>Wooden Flooring</span>
            <span style={{ position: 'absolute', left: '20px', bottom: '18px', fontSize: '10px', letterSpacing: '2.5px', color: 'rgba(251,249,245,0.75)', fontWeight: 500 }}>EXPLORE →</span>
          </button>
          <button 
            type="button" 
            onClick={() => handlePairClick('Rugs & Carpets')}
            style={{ position: 'relative', border: 'none', padding: 0, cursor: 'pointer', height: '300px', background: '#BFB7AA', overflow: 'hidden', display: 'block' }}
            className="pair-btn"
          >
            <span style={{ position: 'absolute', inset: 0, backgroundImage: 'url("https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1200&q=80")', backgroundSize: 'cover', backgroundPosition: 'center', transition: 'transform 0.4s ease' }} className="pair-bg" />
            <span style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(20,16,12,0.62), transparent 55%)' }} />
            <span style={{ position: 'absolute', left: '20px', bottom: '42px', fontFamily: 'var(--serif)', fontSize: '24px', fontWeight: 500, color: '#FBF9F5' }}>Rugs &amp; Carpets</span>
            <span style={{ position: 'absolute', left: '20px', bottom: '18px', fontSize: '10px', letterSpacing: '2.5px', color: 'rgba(251,249,245,0.75)', fontWeight: 500 }}>EXPLORE →</span>
          </button>
        </div>
      </section>

      {/* AI visualization */}
      <section className="sec-pad" style={{ padding: '0 56px 110px' }}>
        <div className="reveal ai-viz-box" style={{ background: '#FCFAF6', border: '1px solid rgba(33,28,22,0.05)', padding: '70px 64px', display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '48px', alignItems: 'center', boxShadow: '0 24px 60px rgba(33,28,22,0.06)' }}>
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '3.5px', color: 'var(--accent)', marginBottom: '20px', fontWeight: 500 }}>AI VISUALIZATION</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(28px, 5.5vw, 48px)', lineHeight: 1.08, marginBottom: '20px' }}>
              See Mitti <em style={{ fontStyle: 'italic' }}>in your room.</em>
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#5C554A', maxWidth: '460px' }}>
              Our AI assistant drapes, upholsters and lays Mitti into a photorealistic concept of your own space — before a single metre is cut.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', alignItems: 'flex-start' }}>
            <button 
              type="button" 
              onClick={() => { onSelectCategory('Upholstery Fabrics'); onNavigate('customize'); }}
              style={{ border: 'none', background: 'var(--accent)', color: '#fff', cursor: 'pointer', padding: '18px 36px', fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '3px', fontWeight: 500, transition: 'background-color 0.2s ease' }}
              className="visualize-ai-btn"
            >
              ✦ VISUALIZE WITH AI
            </button>
            <div style={{ fontSize: '12px', color: '#8B8272' }}>Takes about two minutes. No upload required.</div>
          </div>
        </div>
      </section>

      {/* Gallery in homes */}
      <section className="sec-pad" style={{ padding: '0 56px 120px' }}>
        <div className="reveal" style={{ marginBottom: '48px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '3.5px', color: 'var(--accent)', marginBottom: '18px', fontWeight: 500 }}>IN HOMES</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(30px, 6vw, 52px)', lineHeight: 1.05 }}>
            Already <em style={{ fontStyle: 'italic' }}>living well.</em>
          </h2>
        </div>

        <div className="reveal gallery-row" style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '64px', alignItems: 'end', marginBottom: '90px' }}>
          <div style={{ overflow: 'hidden', aspectRatio: '16/10' }}>
            <img src={mittiSofa} alt="Residence 41, Alkapuri" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }} className="zoom-hover-img" />
          </div>
          <div style={{ paddingBottom: '8px' }}>
            <div style={{ fontSize: '10.5px', letterSpacing: '2.5px', color: '#8B8272', marginBottom: '14px', fontWeight: 500 }}>RESIDENCE 41 · ALKAPURI</div>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#5C554A', marginBottom: '22px' }}>
              Full-length Mitti drapery against chalk walls, with the sofa upholstered in the same bolt.
            </p>
            <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '20px', lineHeight: 1.5, color: '#2C271F' }}>
              “We let one fabric carry the whole room.” — the design team
            </p>
          </div>
        </div>

        <div className="reveal gallery-row" style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: '64px', alignItems: 'end' }}>
          <div style={{ paddingBottom: '8px' }}>
            <div style={{ fontSize: '10.5px', letterSpacing: '2.5px', color: '#8B8272', marginBottom: '14px', fontWeight: 500 }}>FARMHOUSE · ANAND</div>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#5C554A', marginBottom: '22px' }}>
              Mitti roman blinds soften a stone kitchen; the bouclé takes the morning light without glare.
            </p>
            <p style={{ fontFamily: 'var(--serif)', fontStyle: 'italic', fontSize: '20px', lineHeight: 1.5, color: '#2C271F' }}>
              “It reads as colour from afar, texture up close.” — the design team
            </p>
          </div>
          <div className="gallery-row-img-last" style={{ overflow: 'hidden', aspectRatio: '16/10' }}>
            <img src={mittiKitchen} alt="Farmhouse, Anand" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }} className="zoom-hover-img" />
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="sec-pad" style={{ background: 'var(--deep)', color: '#EFEBE3', textAlign: 'center', padding: '130px 56px', transition: 'background-color 0.5s ease' }}>
        <div className="reveal">
          <div style={{ fontSize: '11px', letterSpacing: '4px', color: '#C98A5E', marginBottom: '28px', fontWeight: 500 }}>FABRIC OF THE YEAR · 2027</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(60px, 7vw, 96px)', lineHeight: 0.96, letterSpacing: '-1px', marginBottom: '44px' }}>
            Bring Mitti <em style={{ fontStyle: 'italic' }}>home.</em>
          </h2>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap' }}>
            <button 
              type="button" 
              onClick={() => onNavigate('visit')} 
              style={{ border: 'none', background: 'var(--accent)', color: '#fff', cursor: 'pointer', padding: '18px 36px', fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '3px', fontWeight: 500, transition: 'background-color 0.2s ease' }}
              className="accent-btn"
            >
              REQUEST A SAMPLE
            </button>
            <button 
              type="button" 
              onClick={() => onNavigate('visit')} 
              style={{ border: '1px solid rgba(239,235,227,0.5)', background: 'none', color: '#EFEBE3', cursor: 'pointer', padding: '17px 36px', fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '3px', transition: 'all 0.25s ease', fontWeight: 500 }}
              className="consult-btn"
            >
              BOOK A CONSULTATION
            </button>
            <a 
              href="/fabric-of-the-year-2027.pdf" 
              target="_blank"
              rel="noopener noreferrer"
              style={{ border: '1px solid rgba(239,235,227,0.5)', background: 'rgba(239,235,227,0.08)', color: '#EFEBE3', cursor: 'pointer', padding: '17px 36px', fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '3px', textDecoration: 'none', transition: 'all 0.25s ease', fontWeight: 500, display: 'inline-block' }}
              className="consult-btn"
            >
              DOWNLOAD PDF LOOKBOOK 📄
            </a>
            <button 
              type="button" 
              onClick={() => { onSelectCategory('Upholstery Fabrics'); onNavigate('customize'); }}
              style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '3px', color: '#C98A5E', borderBottom: '1px solid rgba(201,138,94,0.5)', paddingBottom: '5px', fontWeight: 500 }}
            >
              GENERATE AI PREVIEW →
            </button>
          </div>
        </div>
      </section>

      <style>{`
        .story-btn:hover {
          background: rgba(245,241,232,0.16) !important;
          border-color: rgba(245,241,232,0.8) !important;
        }
        .zoom-hover-img:hover {
          transform: scale(1.04);
        }
        .swatch-circle:hover {
          transform: scale(1.1);
        }
        .pair-btn:hover .pair-bg {
          transform: scale(1.04);
        }
        .pair-btn:hover {
          filter: brightness(0.94);
        }
        .visualize-ai-btn:hover {
          background-color: var(--accent-dark) !important;
        }
        .consult-btn:hover {
          border-color: #EFEBE3 !important;
          background: rgba(239,235,227,0.08) !important;
        }

        @media (max-width: 800px) {
          .story-row {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
            margin-bottom: 64px !important;
          }
          .texture-grid {
            grid-template-columns: 1fr !important;
            padding-top: 56px !important;
            padding-bottom: 56px !important;
          }
          .pattern-grid-4, .specs-grid-4 {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          .stats-grid-4 {
            grid-template-columns: repeat(2, 1fr) !important;
            row-gap: 28px !important;
          }
          .stats-item:nth-child(odd) {
            border-right: 1px solid #DAD3C7 !important;
            padding-left: 0 !important;
          }
          .stats-item:nth-child(even) {
            border-right: none !important;
            padding-left: 24px !important;
          }
          .pair-row-3 {
            grid-template-columns: 1fr !important;
            margin-bottom: 16px !important;
          }
          .pair-row-2 {
            grid-template-columns: 1fr !important;
          }
          .pair-btn {
            height: 220px !important;
          }
          .ai-viz-box {
            grid-template-columns: 1fr !important;
            padding: 40px 28px !important;
          }
          .gallery-row {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
            margin-bottom: 56px !important;
          }
          .gallery-row-img-last {
            order: -1;
          }
        }
        @media (max-width: 460px) {
          .pattern-grid-4, .specs-grid-4, .stats-grid-4 {
            grid-template-columns: 1fr !important;
          }
          .stats-item, .stats-item:nth-child(odd), .stats-item:nth-child(even) {
            border-right: none !important;
            padding-left: 0 !important;
            border-bottom: 1px solid #DAD3C7;
            padding-bottom: 24px !important;
          }
        }
      `}</style>
    </main>
  );
}
