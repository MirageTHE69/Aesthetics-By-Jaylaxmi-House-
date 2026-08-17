import React, { useState, useRef, useEffect } from 'react';
import heroLiving from '../assets/hero-living.jpg';
import aiShelves from '../assets/ai-shelves.jpg';
import aiChair from '../assets/ai-chair.jpg';
import aiBridge from '../assets/ai-bridge.jpg';
import aiKitchen from '../assets/ai-kitchen.jpg';
import { getStoredCategories, getStoredCategoryMeta, getStoredProducts, getStoredBrands, getStoredClients } from '../data/storage';

export default function HomeView({ onNavigate, onSelectCategory }) {
  const [hoverCat, setHoverCat] = useState(-1);
  const [previewPos, setPreviewPos] = useState({ x: 0, y: 0 });
  const previewRef = useRef(null);

  const [categories, setCategories] = useState(getStoredCategories());
  const [categoryMeta, setCategoryMeta] = useState(getStoredCategoryMeta());
  const [products, setProducts] = useState(getStoredProducts());
  const [brands, setBrands] = useState(getStoredBrands());
  const [clients, setClients] = useState(getStoredClients());

  useEffect(() => {
    const handleUpdate = () => {
      setCategories(getStoredCategories());
      setCategoryMeta(getStoredCategoryMeta());
      setProducts(getStoredProducts());
      setBrands(getStoredBrands());
      setClients(getStoredClients());
    };
    window.addEventListener('aesthetics_data_updated', handleUpdate);
    return () => window.removeEventListener('aesthetics_data_updated', handleUpdate);
  }, []);

  const handleMouseMove = (e) => {
    const container = e.currentTarget.getBoundingClientRect();
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
      {/* 1. Hero Section */}
      <section className="sec-pad home-hero" style={{
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
            marginBottom: '26px',
            fontWeight: 500
          }}>VADODARA · FIVE DECADES OF HERITAGE</div>
          <h1 style={{
            fontFamily: 'var(--serif)',
            fontWeight: 500,
            fontSize: 'clamp(44px, 8.5vw, 88px)',
            lineHeight: 0.94,
            letterSpacing: '-1px',
            marginBottom: '28px'
          }}>
            The home,<br />
            <em style={{ fontStyle: 'italic', fontWeight: 500 }}>considered.</em>
          </h1>
          <p style={{
            fontSize: '16px',
            lineHeight: 1.8,
            color: '#5C554A',
            maxWidth: '440px',
            marginBottom: '36px'
          }}>
            Curtains, upholstery fabrics, custom furniture, wallpapers, and bespoke flooring — crafted in our Vadodara atelier to the measure of your space.
          </p>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => onNavigate('collections')}
              style={{
                border: 'none',
                background: 'var(--accent)',
                color: '#fff',
                cursor: 'pointer',
                padding: '16px 32px',
                fontFamily: 'var(--sans)',
                fontSize: '11px',
                letterSpacing: '3px',
                fontWeight: 500,
                transition: 'background-color 0.2s ease'
              }}
              className="accent-button"
            >
              EXPLORE COLLECTIONS →
            </button>
            <button
              type="button"
              onClick={() => onNavigate('visit')}
              style={{
                border: 'none',
                background: 'none',
                cursor: 'pointer',
                padding: 0,
                fontFamily: 'var(--sans)',
                fontSize: '11px',
                letterSpacing: '2.5px',
                color: '#211C16',
                borderBottom: '1px solid #211C16',
                paddingBottom: '4px',
                fontWeight: 500
              }}
            >
              SCHEDULE A STUDIO VISIT
            </button>
          </div>
        </div>

        <div className="home-hero-img" style={{
          aspectRatio: '4/4.4',
          background: `#DED7CB url(${heroLiving}) center/cover no-repeat`,
          boxShadow: '0 20px 50px rgba(33,28,22,0.08)'
        }}></div>
      </section>

      {/* 2. Fabric of the Year Band */}
      <button
        type="button"
        onClick={() => onNavigate('fabric')}
        className="sec-pad fabric-band-btn"
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
      >
        <span className="fabric-band-eyebrow" style={{
          fontFamily: 'var(--sans)',
          fontSize: '10.5px',
          letterSpacing: '3px',
          color: 'var(--accent)',
          whiteSpace: 'nowrap',
          fontWeight: 500
        }}>FABRIC OF THE YEAR · 2027</span>
        <span className="fabric-band-title" style={{
          fontFamily: 'var(--serif)',
          fontStyle: 'italic',
          fontSize: '24px',
          color: '#2C271F',
          flex: 1,
          paddingLeft: '20px',
          paddingRight: '20px'
        }}>Mitti — a handloom bouclé from the earth of Kutch.</span>
        <span className="fabric-band-cta" style={{
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

      {/* 3. OUR STORY SECTION (Exact authentic brand narrative) */}
      <section className="sec-pad" style={{
        padding: '110px 56px',
        background: '#FAF7F2',
        borderBottom: '1px solid rgba(33,28,22,0.08)'
      }}>
        <div className="reveal story-container" style={{
          maxWidth: '1080px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: '1fr 1.2fr',
          gap: '64px',
          alignItems: 'start'
        }}>
          <div>
            <div style={{
              fontSize: '11px',
              letterSpacing: '3.5px',
              color: 'var(--accent)',
              marginBottom: '20px',
              fontWeight: 600
            }}>OUR STORY</div>
            <h2 style={{
              fontFamily: 'var(--serif)',
              fontWeight: 500,
              fontSize: 'clamp(34px, 6vw, 54px)',
              lineHeight: 1.05,
              letterSpacing: '-0.5px',
              marginBottom: '28px',
              color: '#211C16'
            }}>
              Every beautiful space begins with <em style={{ fontStyle: 'italic' }}>a story.</em>
            </h2>
            <div style={{
              background: '#EAE3D5',
              padding: '24px',
              borderLeft: '3px solid var(--accent)',
              fontFamily: 'var(--serif)',
              fontSize: '19px',
              lineHeight: 1.6,
              fontStyle: 'italic',
              color: '#2C271F'
            }}>
              “History gives us our roots, but the future gives us our purpose.”
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', fontSize: '15.5px', lineHeight: 1.85, color: '#554E44' }}>
            <p style={{ margin: 0 }}>
              Our journey began <strong>nearly five decades ago as Jaylaxmi Furnishings</strong>, built on a simple promise—to offer quality, honesty, and relationships that last. These values became the foundation of everything we do and continue to guide us even today.
            </p>
            <p style={{ margin: 0 }}>
              In <strong>2017</strong>, that legacy evolved into <strong>Aesthetics</strong>—a modern home décor destination created to meet the changing aspirations of contemporary homes while staying true to the ethics that built our name.
            </p>
            <p style={{ margin: 0 }}>
              At Aesthetics, we believe history gives us our roots, but the future gives us our purpose. While we proudly honour our heritage, we continuously explore new ideas, global trends, premium furniture designs, and carefully curated soft furnishings to help create homes that are timeless, elegant, and deeply personal.
            </p>
            <p style={{ margin: 0 }}>
              Today, Aesthetics has grown into one of the most trusted names in home décor—not just in Vadodara, but among discerning homeowners, architects, and designers across India. The awards and recognitions we have received from the brands we represent are a reflection of our commitment to quality, craftsmanship, and customer satisfaction.
            </p>
            <div style={{
              marginTop: '12px',
              paddingTop: '20px',
              borderTop: '1px solid #E0D8CA',
              fontFamily: 'var(--serif)',
              fontSize: '18px',
              color: '#211C16',
              fontWeight: 500
            }}>
              For us, every project is more than furnishing a house—it's about helping our customers create a space they truly love to call home.
            </div>
          </div>
        </div>
      </section>

      {/* 4. TRUSTED COMMERCIAL & INSTITUTIONAL CLIENTS SHOWCASE */}
      <section className="sec-pad" style={{
        padding: '90px 56px',
        background: '#1F1B16',
        color: '#F5F1E8'
      }}>
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '56px' }}>
          <div style={{ fontSize: '11px', letterSpacing: '3.5px', color: '#C98A5E', marginBottom: '16px', fontWeight: 600 }}>
            PRESTIGIOUS PORTFOLIO
          </div>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontWeight: 500,
            fontSize: 'clamp(30px, 5.5vw, 48px)',
            lineHeight: 1.08,
            color: '#FFFFFF',
            margin: 0
          }}>
            Brands That Have <em style={{ fontStyle: 'italic', color: '#E8C9AF' }}>Trusted Us.</em>
          </h2>
          <p style={{ fontSize: '15px', color: '#C0B7A8', maxWidth: '580px', margin: '14px auto 0' }}>
            Trusted by India’s leading hotel chains, universities, corporate headquarters, healthcare campuses, and architecture studios.
          </p>
        </div>

        {/* Client Badges Grid */}
        <div className="reveal client-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '16px',
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          {clients.map((c, idx) => (
            <div
              key={idx}
              className="client-card"
              style={{
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.09)',
                padding: '22px 20px',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{c.icon || '🏛️'}</div>
              <div style={{
                fontFamily: 'var(--serif)',
                fontSize: '18px',
                color: '#FFFFFF',
                fontWeight: 500,
                marginBottom: '4px'
              }}>
                {c.name}
              </div>
              <div style={{
                fontSize: '11px',
                letterSpacing: '1px',
                color: '#9E978C'
              }}>
                {c.type}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 9 PRODUCT COLLECTIONS (Hover sensitive) */}
      <section className="sec-pad" style={{ padding: '96px 56px 110px', background: '#FCFAF6' }}>
        <div className="collections-head" style={{
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
            }}>OUR 9 PRODUCT DEPARTMENTS</div>
            <h2 style={{
              fontFamily: 'var(--serif)',
              fontWeight: 500,
              fontSize: 'clamp(32px, 6vw, 52px)',
              lineHeight: 1.05,
              letterSpacing: '-0.5px',
              margin: 0
            }}>
              Everything for the<br />
              <em style={{ fontStyle: 'italic' }}>considered</em> home.
            </h2>
          </div>
          <p style={{
            fontSize: '15px',
            lineHeight: 1.7,
            color: '#5C554A',
            maxWidth: '360px',
            marginBottom: '6px'
          }}>
            From bespoke drapery to flooring, wallpapers, custom furniture, and sleep systems.
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
          {categories.map((name, i) => {
            const isHovered = hoverCat === i;
            const isDimmed = hoverCat >= 0 && !isHovered;
            const meta = categoryMeta[name] || {};
            const count = (products[name] || []).length;

            return (
              <button
                key={name}
                type="button"
                onClick={() => handleCategoryClick(name)}
                onMouseEnter={() => setHoverCat(i)}
                className="cat-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '70px 1fr auto',
                  alignItems: 'center',
                  width: '100%',
                  textAlign: 'left',
                  border: 'none',
                  borderTop: '1px solid rgba(33,28,22,0.16)',
                  background: 'none',
                  cursor: 'pointer',
                  padding: '26px 8px',
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

                <span className="cat-row-name" style={{
                  fontFamily: 'var(--serif)',
                  fontSize: 'clamp(22px, 5vw, 46px)',
                  fontWeight: 500,
                  lineHeight: 1,
                  fontStyle: isHovered ? 'italic' : 'normal',
                  color: isHovered ? 'var(--accent)' : (isDimmed ? 'rgba(33,28,22,0.28)' : '#211C16'),
                  transform: isHovered ? 'translateX(18px)' : 'none',
                  transition: 'transform 0.45s cubic-bezier(0.2,0.6,0.2,1), color 0.3s ease'
                }}>
                  {name}
                </span>

                <span className="cat-row-count" style={{
                  fontFamily: 'var(--sans)',
                  fontSize: '10.5px',
                  letterSpacing: '2px',
                  color: isHovered ? 'var(--accent)' : '#8B8272',
                  opacity: isHovered ? 1 : (isDimmed ? 0.3 : 0.65),
                  transform: isHovered ? 'translateX(-8px)' : 'none',
                  transition: 'transform 0.45s cubic-bezier(0.2,0.6,0.2,1), opacity 0.3s ease, color 0.3s ease'
                }}>
                  {count > 0 ? `${count} FEATURED` : `${meta.studioCount || 25}+ SWATCHES`}&nbsp;&nbsp;→
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
            {categories.map((name, i) => {
              const meta = categoryMeta[name] || {};
              return (
                <span 
                  key={name}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundImage: `url(${meta.hero || heroLiving})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: hoverCat === i ? 1 : 0,
                    transform: hoverCat === i ? 'scale(1.05)' : 'scale(1)',
                    transition: 'opacity 0.45s ease, transform 1.4s ease'
                  }}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. BRANDS WE CARRY SHOWCASE (32 Premium Brands) */}
      <section className="sec-pad" style={{
        padding: '100px 56px',
        background: '#FAF7F2',
        borderTop: '1px solid rgba(33,28,22,0.06)'
      }}>
        <div className="reveal" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          flexWrap: 'wrap',
          gap: '24px',
          marginBottom: '48px'
        }}>
          <div>
            <div style={{ fontSize: '11px', letterSpacing: '3.5px', color: 'var(--accent)', marginBottom: '14px', fontWeight: 600 }}>
              CURATED GLOBAL ALLIANCES
            </div>
            <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(30px, 5.5vw, 48px)', margin: 0 }}>
              Brands We <em style={{ fontStyle: 'italic' }}>Carry.</em>
            </h2>
          </div>
          <p style={{ fontSize: '14.5px', color: '#6A6357', maxWidth: '420px', margin: 0, lineHeight: 1.7 }}>
            Official representatives for over 30 leading international and Indian furnishing powerhouses.
          </p>
        </div>

        {/* Brand Chips Grid */}
        <div className="reveal" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '14px'
        }}>
          {brands.map((b, idx) => (
            <div
              key={idx}
              className="brand-card"
              style={{
                background: '#FFFFFF',
                border: '1px solid #E5DFD4',
                padding: '16px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                transition: 'all 0.25s ease'
              }}
            >
              <div style={{
                fontFamily: 'var(--serif)',
                fontSize: '18px',
                fontWeight: 500,
                color: '#211C16',
                marginBottom: '4px'
              }}>
                {b.name}
              </div>
              <div style={{ fontSize: '11px', color: '#8A8274', letterSpacing: '0.5px' }}>
                {b.category}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 7. AI Teaser Section */}
      <section className="ai-teaser" style={{
        background: 'var(--deep)',
        color: '#EFEBE3',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 0,
        transition: 'background-color 0.5s ease'
      }}>
        <div className="sec-pad ai-teaser-text" style={{ padding: '96px 56px', alignSelf: 'center' }}>
          <div style={{
            fontSize: '11px',
            letterSpacing: '3.5px',
            color: '#C98A5E',
            marginBottom: '26px',
            fontWeight: 500
          }}>AI DIGITAL STUDIO</div>
          <h2 style={{
            fontFamily: 'var(--serif)',
            fontWeight: 500,
            fontSize: 'clamp(34px, 6vw, 60px)',
            lineHeight: 1.05,
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
            Pick a category. Choose your mood, colour palette and style. Our AI generates photorealistic concepts — then our Vadodara studio brings them to life.
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
        <div className="ai-teaser-imgs" style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: '14px',
          padding: '26px 26px 26px 0'
        }}>
          <div style={{ aspectRatio: '1/0.92', background: `#46564B url(${aiShelves}) center/cover no-repeat` }}></div>
          <div style={{ aspectRatio: '1/0.92', background: `#E7E2D9 url(${aiChair}) center/cover no-repeat` }}></div>
          <div style={{ aspectRatio: '1/0.92', background: `#E7E2D9 url(${aiBridge}) center/cover no-repeat` }}></div>
          <div style={{ aspectRatio: '1/0.92', background: `#46564B url(${aiKitchen}) center/cover no-repeat` }}></div>
        </div>
      </section>

      {/* 8. Showroom Flagship Centre Section */}
      <section className="sec-pad" style={{ padding: '96px 56px 110px', background: '#FCFAF6' }}>
        <div className="reveal showroom-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.2fr 1fr',
          gap: '64px',
          background: '#EAE3D5',
          border: '1px solid rgba(33,28,22,0.06)',
          overflow: 'hidden'
        }}>
          <div className="showroom-text" style={{ padding: '74px 64px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: '10px', letterSpacing: '3px', color: 'var(--accent)', marginBottom: '20px', fontWeight: 600 }}>OUR EXPERIENCE STUDIO</div>
            <h2 style={{ fontFamily: 'var(--serif)', fontWeight: 500, fontSize: 'clamp(28px, 5.5vw, 48px)', lineHeight: 1.1, marginBottom: '24px', color: '#211C16' }}>
              Visit our flagship <em style={{ fontStyle: 'italic' }}>Atelier.</em>
            </h2>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#5C554A', marginBottom: '32px', maxWidth: '440px' }}>
              Feel the weight of the weave in person. Browse our 30+ brand collections, handloom textiles, custom wallpapers, and wood flooring finishes near Race Course Circle, Vadodara.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#6B6458', marginBottom: '36px' }}>
              <div>📍 <strong>Address:</strong> Race Course Circle, Alkapuri, Vadodara, Gujarat 390007</div>
              <div>📞 <strong>Sales:</strong> +91 9913132736 &nbsp;|&nbsp; <strong>General:</strong> +91 9998852736</div>
              <div>🤝 <strong>Partner With Us:</strong> +91 9725116871</div>
              <div>✉️ <strong>Email:</strong> Aesthetics.jhv@gmail.com</div>
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
          <div className="showroom-img-wrap" style={{ overflow: 'hidden', height: '100%', minHeight: '440px' }}>
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
        .client-card:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
          transform: translateY(-2px);
        }
        .brand-card:hover {
          border-color: var(--accent) !important;
          box-shadow: 0 8px 24px rgba(33,28,22,0.06);
          transform: translateY(-2px);
        }
        .showroom-btn:hover {
          background-color: var(--accent) !important;
          color: #fff !important;
        }

        @media (max-width: 800px) {
          .home-hero {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
            padding-top: 48px !important;
            padding-bottom: 56px !important;
          }
          .home-hero-img {
            aspect-ratio: 4/3.2 !important;
          }
          .story-container {
            grid-template-columns: 1fr !important;
            gap: 36px !important;
          }
          .fabric-band-btn {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 12px !important;
            padding: 22px 24px !important;
          }
          .fabric-band-title {
            padding-left: 0 !important;
            padding-right: 0 !important;
            font-size: 19px !important;
          }
          .ai-teaser {
            grid-template-columns: 1fr !important;
          }
          .ai-teaser-text {
            padding: 64px 24px 48px !important;
          }
          .ai-teaser-imgs {
            padding: 0 24px 56px !important;
          }
          .collections-head {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }
          .cat-row {
            grid-template-columns: 32px 1fr !important;
            padding: 20px 4px !important;
            row-gap: 8px !important;
          }
          .cat-row-count {
            grid-column: 2 / 3;
            font-size: 9.5px !important;
            letter-spacing: 1.5px !important;
          }
          .showroom-grid {
            grid-template-columns: 1fr !important;
          }
          .showroom-text {
            padding: 48px 28px !important;
          }
          .showroom-img-wrap {
            min-height: 260px !important;
          }
        }
      `}</style>
    </main>
  );
}
