import React, { useState, useRef, useEffect } from 'react';
import heroLiving from '../assets/hero-living.jpg';
import aiShelves from '../assets/ai-shelves.jpg';
import aiChair from '../assets/ai-chair.jpg';
import aiBridge from '../assets/ai-bridge.jpg';
import aiKitchen from '../assets/ai-kitchen.jpg';

export default function HomeView({ onNavigate, onSelectCategory }) {
  const [hoverCat, setHoverCat] = useState(-1);
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 });
  const previewRef = useRef(null);

  const CATS = [
    'Curtains',
    'Upholstery Fabrics',
    'Wallpapers',
    'Blinds',
    'Wooden Flooring',
    'Home Linen',
    'Mattresses',
    'Rugs & Carpets'
  ];

  const IMGS = [
    'https://images.unsplash.com/photo-1691036561573-4b76998b60de?w=1600&q=80',
    'https://images.unsplash.com/photo-1544691560-fc2053d97726?w=1600&q=80',
    'https://images.unsplash.com/photo-1558882224-dda166733046?w=1600&q=80',
    'https://images.unsplash.com/photo-1615875605825-5eb9bb5d52ac?w=600&q=80',
    'https://images.unsplash.com/photo-1618220179428-22790b461013?w=1600&q=80',
    'https://images.unsplash.com/photo-1619459075136-2b53c6153d4f?w=1600&q=80',
    'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=1600&q=80',
    'https://images.unsplash.com/photo-1691036561573-4b76998b60de?w=1200&q=80'
  ];

  const CAT_COUNTS = [42, 68, 120, 24, 18, 36, 12, 54];

  const handleMouseMove = (e) => {
    const container = e.currentTarget.getBoundingClientRect();
    // Calculate cursor position relative to container
    const x = Math.max(0, Math.min(e.clientX - container.left + 56, container.width - 330));
    const y = Math.max(-40, Math.min(e.clientY - container.top - 200, container.height - 360));
    setPreviewPos({ x, y });
  };

  const handleCategoryClick = (name) => {
    onSelectCategory(name);
    onNavigate('category');
  };

  // Set up intersection observer for scroll reveal animations
  useEffect(() => {
    const revealElements = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main className="animate-fade">
      {/* Hero Section */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        alignItems: 'center',
        gap: '64px',
        padding: '74px 56px 90px'
      }}>
        <div style={{ animation: 'aes-fade 0.8s ease both' }}>
          <div style={{
            fontSize: '11px',
            letterSpacing: '3.5px',
            color: 'var(--accent)',
            marginBottom: '30px',
            fontWeight: 500
          }}>VADODARA · EST. 1972</div>
          <h1 style={{
            fontFamily: 'var(--serif)',
            fontWeight: 500,
            fontSize: '92px',
            lineHeight: 0.94,
            letterSpacing: '-1px',
            marginBottom: '30px'
          }}>
            The home,<br />
            <em style={{ fontStyle: 'italic', fontWeight: 500 }}>considered.</em>
          </h1>
          <p style={{
            fontSize: '16px',
            lineHeight: 1.75,
            color: '#5C554A',
            maxWidth: '400px',
            marginBottom: '40px'
          }}>
            Curtains, upholstery, flooring and home textiles — designed in our Vadodara atelier and made to the measure of your space.
          </p>
          <button 
            type="button" 
            onClick={() => onNavigate('collections')} 
            style={{
              border: 'none',
              background: 'none',
              cursor: 'pointer',
              padding: 0,
              fontFamily: 'var(--sans)',
              fontSize: '11px',
              letterSpacing: '3px',
              color: '#211C16',
              borderBottom: '1px solid #211C16',
              paddingBottom: '6px',
              fontWeight: 500
            }}
          >
            EXPLORE COLLECTIONS &nbsp;→
          </button>
        </div>
        <div style={{
          aspectRatio: '4/4.4',
          background: `#DED7CB url(${heroLiving}) center/cover no-repeat`
        }}></div>
      </section>

      {/* Fabric of the Year Band */}
      <button 
        type="button" 
        onClick={() => onNavigate('fabric')} 
        style={{
          display: 'flex',
          width: '100%',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '24px',
          border: 'none',
          borderTop: '1px solid rgba(33,28,22,0.12)',
          borderBottom: '1px solid rgba(33,28,22,0.12)',
          background: '#EAE3D5',
          cursor: 'pointer',
          padding: '26px 56px',
          textAlign: 'left',
          transition: 'background 0.25s ease'
        }}
        className="fabric-band-btn"
      >
        <span style={{
          fontFamily: 'var(--sans)',
          fontSize: '10.5px',
          letterSpacing: '3px',
          color: 'var(--accent)',
          whiteSpace: 'nowrap',
          fontWeight: 500
        }}>FABRIC OF THE YEAR · 2027</span>
        <span style={{
          fontFamily: 'var(--serif)',
          fontStyle: 'italic',
          fontSize: '24px',
          color: '#2C271F',
          flex: 1,
          paddingLeft: '20px',
          paddingRight: '20px'
        }}>Mitti — a handloom bouclé from the earth of Kutch.</span>
        <span style={{
          fontFamily: 'var(--sans)',
          fontSize: '10.5px',
          letterSpacing: '3px',
          color: '#211C16',
          borderBottom: '1px solid #211C16',
          paddingBottom: '4px',
          whiteSpace: 'nowrap',
          fontWeight: 500
        }}>READ THE STORY →</span>
      </button>

      {/* Philosophy & Craft Standards Section */}
      <section style={{ padding: '110px 56px', background: '#FCFAF6', borderBottom: '1px solid rgba(33,28,22,0.08)' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '80px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '3.5px', color: 'var(--accent)', marginBottom: '18px', fontWeight: 500 }}>OUR APPROACH</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: '56px', lineHeight: 1, letterSpacing: '-0.5px' }}>
            Weaving heritage <em style={{ fontStyle: 'italic' }}>into modern spaces.</em>
          </h2>
        </div>

        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '48px' }}>
          <div style={{ borderTop: '1px solid rgba(33,28,22,0.16)', paddingTop: '32px' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '24px', fontWeight: 500, marginBottom: '16px', color: '#211C16' }}>01 · Made to Measure</div>
            <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#5C554A', margin: 0 }}>
              No pre-cut rolls, no generic sizes. Every curtain, drape, and blind is engineered and tailored in our Vadodara studio to fit the unique blueprint and lighting profile of your home.
            </p>
          </div>
          <div style={{ borderTop: '1px solid rgba(33,28,22,0.16)', paddingTop: '32px' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '24px', fontWeight: 500, marginBottom: '16px', color: '#211C16' }}>02 · Heritage Clusters</div>
            <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#5C554A', margin: 0 }}>
              We partner directly with traditional weaving families in Bhujodi, Patan, and Kanodar. Sourcing organic cotton, mulberry silk, and hand-dyed yarns that tell a story of regional craftsmanship.
            </p>
          </div>
          <div style={{ borderTop: '1px solid rgba(33,28,22,0.16)', paddingTop: '32px' }}>
            <div style={{ fontFamily: 'var(--serif)', fontSize: '24px', fontWeight: 500, marginBottom: '16px', color: '#211C16' }}>03 · Intelligent Design</div>
            <p style={{ fontSize: '14.5px', lineHeight: 1.75, color: '#5C554A', margin: 0 }}>
              We combine legacy loom crafts with our custom AI visualization tool. You can experiment with fabrics, colors, and styling on photorealistic models before production starts.
            </p>
          </div>
        </div>
      </section>

      {/* Green AI Teaser */}
      <section style={{
        background: 'var(--deep)',
        color: '#EFEBE3',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 0,
        transition: 'background-color 0.5s ease'
      }}>
        <div style={{ padding: '96px 56px 96px 56px', alignSelf: 'center' }}>
          <div style={{
            fontSize: '11px',
            letterSpacing: '3.5px',
            color: '#C98A5E',
            marginBottom: '26px',
            fontWeight: 500
          }}>NEW · AI DESIGN ASSISTANT</div>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontWeight: 500,
            fontSize: '60px',
            lineHeight: 1.0,
            letterSpacing: '-0.5px',
            marginBottom: '26px'
          }}>
            See your room,<br />
            <em style={{ fontStyle: 'italic' }}>before it exists.</em>
          </h2>
          <p style={{
            fontSize: '15.5px',
            lineHeight: 1.8,
            color: '#C7C6BC',
            maxWidth: '430px',
            marginBottom: '40px'
          }}>
            Pick a category. Choose your mood, colour palette and style. Our AI generates photorealistic concept images of your space — then our atelier brings them to life.
          </p>
          <button 
            type="button" 
            onClick={() => onNavigate('customize')} 
            style={{
              border: 'none',
              background: 'var(--accent)',
              color: '#fff',
              cursor: 'pointer',
              padding: '17px 34px',
              fontFamily: 'var(--sans)',
              fontSize: '11px',
              letterSpacing: '3px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              fontWeight: 500,
              transition: 'background-color 0.2s ease'
            }}
            className="accent-button"
          >
            ✦ START DESIGNING
          </button>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: '14px',
          padding: '26px 26px 26px 0'
        }}>
          <div style={{
            aspectRatio: '1/0.92',
            background: `#46564B url(${aiShelves}) center/cover no-repeat`
          }}></div>
          <div style={{
            aspectRatio: '1/0.92',
            background: `#E7E2D9 url(${aiChair}) center/cover no-repeat`
          }}></div>
          <div style={{
            aspectRatio: '1/0.92',
            background: `#E7E2D9 url(${aiBridge}) center/cover no-repeat`
          }}></div>
          <div style={{
            aspectRatio: '1/0.92',
            background: `#46564B url(${aiKitchen}) center/cover no-repeat`
          }}></div>
        </div>
      </section>

      {/* Collections Section */}
      <section style={{ padding: '96px 56px 110px' }}>
        <div style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '44px'
        }}>
          <div>
            <div style={{
              fontSize: '11px',
              letterSpacing: '3.5px',
              color: 'var(--accent)',
              marginBottom: '16px',
              fontWeight: 500
            }}>THE COLLECTIONS</div>
            <h2 style={{
              fontFamily: 'var(--serif)',
              fontWeight: 500,
              fontSize: '52px',
              lineHeight: 1,
              letterSpacing: '-0.5px'
            }}>
              Everything for the<br />
              <em style={{ fontStyle: 'italic' }}>considered</em> home.
            </h2>
          </div>
          <p style={{
            fontSize: '15px',
            lineHeight: 1.7,
            color: '#5C554A',
            maxWidth: '320px',
            marginBottom: '6px'
          }}>
            Eight made-to-order collections, each finished by hand in Gujarat.
          </p>
        </div>

        {/* Hover-Sensitive Collections List */}
        <div 
          onMouseMove={handleMouseMove}
          onMouseLeave={() => setHoverCat(-1)}
          style={{
            position: 'relative',
            borderBottom: '1px solid rgba(33,28,22,0.16)'
          }}
        >
          {CATS.map((name, i) => {
            const isHovered = hoverCat === i;
            const isDimmed = hoverCat >= 0 && !isHovered;

            return (
              <button 
                key={name}
                type="button" 
                onClick={() => handleCategoryClick(name)}
                onMouseEnter={() => setHoverCat(i)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '80px 1fr auto',
                  alignItems: 'center',
                  width: '100%',
                  textAlign: 'left',
                  border: 'none',
                  borderTop: '1px solid rgba(33,28,22,0.16)',
                  background: 'none',
                  cursor: 'pointer',
                  padding: '30px 8px',
                  position: 'relative',
                  zIndex: 1
                }}
              >
                <span style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '11px',
                  letterSpacing: '2px',
                  color: '#8B8272'
                }}>0{i + 1}</span>

                <span style={{
                  fontFamily: 'var(--serif)',
                  fontSize: '54px',
                  fontWeight: 500,
                  lineHeight: 1,
                  fontStyle: isHovered ? 'italic' : 'normal',
                  color: isHovered ? 'var(--accent)' : (isDimmed ? 'rgba(33,28,22,0.28)' : '#211C16'),
                  transform: isHovered ? 'translateX(18px)' : 'none',
                  transition: 'transform 0.45s cubic-bezier(0.2,0.6,0.2,1), color 0.3s ease'
                }}>
                  {name}
                </span>

                <span style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '10.5px',
                  letterSpacing: '2.5px',
                  color: isHovered ? 'var(--accent)' : '#8B8272',
                  opacity: isHovered ? 1 : (isDimmed ? 0.3 : 0.65),
                  transform: isHovered ? 'translateX(-8px)' : 'none',
                  transition: 'transform 0.45s cubic-bezier(0.2,0.6,0.2,1), opacity 0.3s ease, color 0.3s ease'
                }}>
                  {CAT_COUNTS[i]} MATERIALS&nbsp;&nbsp;→
                </span>
              </button>
            );
          })}

          {/* Floating Cursor Preview Window */}
          <div 
            ref={previewRef}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '320px',
              aspectRatio: '4/5',
              pointerEvents: 'none',
              zIndex: 2,
              overflow: 'hidden',
              opacity: hoverCat >= 0 ? 1 : 0,
              boxShadow: '0 40px 90px rgba(33,28,22,0.35)',
              transform: `translate(${previewPos.x}px, ${previewPos.y}px) rotate(-2deg)`,
              transition: 'opacity 0.35s ease, transform 0.6s cubic-bezier(0.16,0.7,0.2,1)'
            }}
          >
            {CATS.map((name, i) => (
              <span 
                key={name}
                style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${IMGS[i]})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  opacity: hoverCat === i ? 1 : 0,
                  transform: hoverCat === i ? 'scale(1.05)' : 'scale(1)',
                  transition: 'opacity 0.45s ease, transform 1.4s ease'
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Curated Moodboards Section */}
      <section style={{ padding: '110px 56px', background: '#FAF6F0', borderTop: '1px solid rgba(33,28,22,0.06)' }}>
        <div className="reveal" style={{ marginBottom: '56px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '3.5px', color: 'var(--accent)', marginBottom: '18px', fontWeight: 500 }}>STYLED CONCEPT MOODBOARDS</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: '52px', lineHeight: 1, letterSpacing: '-0.5px' }}>
            Mix &amp; match <em style={{ fontStyle: 'italic' }}>our collections.</em>
          </h2>
          <p style={{ fontSize: '16.5px', lineHeight: 1.8, color: '#5C554A', maxWidth: '560px', marginTop: '16px' }}>
            Explore curated design palettes put together by our studio decorators to help you combine drapery, fabrics, and textures.
          </p>
        </div>

        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
          {/* Moodboard A */}
          <div style={{ background: '#FCFAF6', border: '1px solid rgba(33,28,22,0.06)', overflow: 'hidden', transition: 'box-shadow 0.3s ease' }} className="moodboard-card">
            <div style={{ height: '420px', overflow: 'hidden' }}>
              <img 
                src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1000&q=80" 
                alt="The Kutch Ochre Minimalist" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }} 
                className="moodboard-img"
              />
            </div>
            <div style={{ padding: '36px' }}>
              <div style={{ fontSize: '10px', letterSpacing: '2.5px', color: 'var(--accent)', marginBottom: '12px', fontWeight: 600 }}>PALETTE 01</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 500, marginBottom: '16px', color: '#211C16' }}>The Kutch Ochre Minimalist</h3>
              <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#6B6458', marginBottom: '24px' }}>
                Anchored by our 2027 Mitti fabric, this layout pairs warm sand plaster walls, golden oak flooring, and raw linen sheer curtains to create a bright, earth-bound sanctuary.
              </p>
              <button 
                type="button" 
                onClick={() => handleCategoryClick('Curtains')}
                style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '2px', color: '#211C16', borderBottom: '1px solid #211C16', paddingBottom: '4px', fontWeight: 500 }}
              >
                VIEW CORRESPONDING FABRICS →
              </button>
            </div>
          </div>

          {/* Moodboard B */}
          <div style={{ background: '#FCFAF6', border: '1px solid rgba(33,28,22,0.06)', overflow: 'hidden', transition: 'box-shadow 0.3s ease' }} className="moodboard-card">
            <div style={{ height: '420px', overflow: 'hidden' }}>
              <img 
                src="https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1000&q=80" 
                alt="The Indigo Dwelling" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }} 
                className="moodboard-img"
              />
            </div>
            <div style={{ padding: '36px' }}>
              <div style={{ fontSize: '10px', letterSpacing: '2.5px', color: 'var(--accent)', marginBottom: '12px', fontWeight: 600 }}>PALETTE 02</div>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: '28px', fontWeight: 500, marginBottom: '16px', color: '#211C16' }}>The Indigo Dwelling</h3>
              <p style={{ fontSize: '14.5px', lineHeight: 1.7, color: '#6B6458', marginBottom: '24px' }}>
                A serene contrast of deep natural indigo linen curtains, paired with fine off-white cotton upholstery and dark iron hardware accents. Ideal for cozy bedrooms and library corners.
              </p>
              <button 
                type="button" 
                onClick={() => handleCategoryClick('Upholstery Fabrics')}
                style={{ border: 'none', background: 'none', cursor: 'pointer', padding: 0, fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '2px', color: '#211C16', borderBottom: '1px solid #211C16', paddingBottom: '4px', fontWeight: 500 }}
              >
                VIEW CORRESPONDING FABRICS →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={{ padding: '110px 56px', background: '#FCFAF6', borderTop: '1px solid rgba(33,28,22,0.06)' }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '64px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '3.5px', color: 'var(--accent)', marginBottom: '18px', fontWeight: 500 }}>COMMUNITY &amp; PRESS</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: '52px', lineHeight: 1 }}>
            Living with <em style={{ fontStyle: 'italic' }}>Aesthetics.</em>
          </h2>
        </div>

        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', maxWidth: '1080px', margin: '0 auto' }}>
          <div style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '28px' }}>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '21px', fontStyle: 'italic', lineHeight: 1.6, color: '#2C271F', marginBottom: '18px' }}>
              “Aesthetics transformed our Alkapuri residence. The Mitti curtains catch the morning light beautifully, and the tailoring craftsmanship is unmatched in India.”
            </p>
            <div style={{ fontSize: '11.5px', letterSpacing: '1px', color: '#8B8272', fontWeight: 500 }}>
              ANANYA PATEL · RESIDENT, VADODARA
            </div>
          </div>
          <div style={{ borderLeft: '3px solid var(--accent)', paddingLeft: '28px' }}>
            <p style={{ fontFamily: 'var(--serif)', fontSize: '21px', fontStyle: 'italic', lineHeight: 1.6, color: '#2C271F', marginBottom: '18px' }}>
              “As an architect, I appreciate their commitment to exact custom specs. Their Pit-loomed silk and linen fabrics have become a staple in my contemporary projects.”
            </p>
            <div style={{ fontSize: '11.5px', letterSpacing: '1px', color: '#8B8272', fontWeight: 500 }}>
              DEVANG SHAH · PRINCIPAL ARCHITECT, STUDIO D
            </div>
          </div>
        </div>
      </section>

      {/* Showroom Flagship Centre Section */}
      <section style={{ padding: '0 56px 110px', background: '#FCFAF6' }}>
        <div className="reveal" style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '64px', background: '#EAE3D5', border: '1px solid rgba(33,28,22,0.06)', overflow: 'hidden' }}>
          <div style={{ padding: '74px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '10px', letterSpacing: '3px', color: 'var(--accent)', marginBottom: '20px', fontWeight: 600 }}>OUR EXPERIENCE STUDIO</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: '48px', lineHeight: 1.08, marginBottom: '24px', color: '#211C16' }}>
              Visit our flagship <em style={{ fontStyle: 'italic' }}>Atelier.</em>
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#5C554A', marginBottom: '32px', maxWidth: '440px' }}>
              Feel the weight of the weave in person. Browse our full range of loom textiles, custom wallpapers, and wood floor finishes near Race Course Circle, Vadodara.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#6B6458', marginBottom: '36px', fontFamily: 'ui-monospace, monospace' }}>
              <div>📍 Race Course Circle, Alkapuri, Vadodara — 390007</div>
              <div>🕒 Open daily: 10:00 AM – 7:30 PM</div>
              <div>📞 +91 265 235 1972</div>
            </div>
            <div>
              <button 
                type="button" 
                onClick={() => onNavigate('visit')} 
                style={{ border: 'none', background: 'var(--text)', color: 'var(--bg)', cursor: 'pointer', padding: '18px 36px', fontFamily: 'var(--sans)', fontSize: '11px', letterSpacing: '3px', fontWeight: 500, transition: 'all 0.2s ease' }}
                className="showroom-btn"
              >
                SCHEDULE A PRIVATE VISIT
              </button>
            </div>
          </div>
          <div style={{ overflow: 'hidden', height: '100%', minHeight: '440px' }}>
            <img 
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80" 
              alt="Aesthetics Vadodara Showroom" 
              style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.8s ease' }} 
              className="showroom-img"
            />
          </div>
        </div>
      </section>

      {/* Styles for hover transition fixes */}
      <style>{`
        .fabric-band-btn:hover {
          background: #E3DACA !important;
        }
        .accent-button:hover {
          background-color: var(--accent-dark) !important;
        }
        .moodboard-card:hover .moodboard-img {
          transform: scale(1.04);
        }
        .moodboard-card:hover {
          box-shadow: 0 20px 40px rgba(33,28,22,0.08) !important;
        }
        .showroom-btn:hover {
          background-color: var(--accent) !important;
          color: #fff !important;
        }
      `}</style>
    </main>
  );
}
