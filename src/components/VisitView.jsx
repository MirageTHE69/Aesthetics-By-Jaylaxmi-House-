import React, { useState } from 'react';
import { addBooking, getStoredContact } from '../data/storage';

export default function VisitView() {
  const contact = getStoredContact();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: 'Vadodara',
    category: 'Curtains',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    addBooking({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      city: formData.city,
      serviceType: 'Consultation & Site Visit',
      category: formData.category,
      message: formData.message || 'Consultation requested via Visit page form.'
    });

    setSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      city: 'Vadodara',
      category: 'Curtains',
      message: ''
    });
  };

  return (
    <main className="sec-pad visit-grid animate-fade" style={{
      padding: '74px 56px 100px',
      display: 'grid',
      gridTemplateColumns: '1.05fr 1.15fr',
      gap: '72px'
    }}>
      {/* Left Column: Contact & Studio Info */}
      <div>
        <div style={{
          fontSize: '11px',
          letterSpacing: '3.5px',
          color: 'var(--accent)',
          marginBottom: '20px',
          fontWeight: 600
        }}>GET IN TOUCH</div>

        <h1 style={{
          fontFamily: 'var(--serif)',
          fontWeight: 500,
          fontSize: 'clamp(38px, 7vw, 68px)',
          lineHeight: 1.02,
          letterSpacing: '-1px',
          marginBottom: '40px'
        }}>
          Visit the studio.<br />
          <em style={{ fontStyle: 'italic' }}>Or speak with us.</em>
        </h1>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '28px'
        }}>
          {/* Address & Google Maps */}
          <div>
            <div style={{
              fontSize: '10.5px',
              letterSpacing: '2.5px',
              color: 'var(--accent)',
              marginBottom: '8px',
              fontWeight: 600
            }}>◦ FLAGSHIP STUDIO &amp; ATELIER</div>
            <div style={{
              fontFamily: 'var(--serif)',
              fontSize: '22px',
              lineHeight: 1.35,
              color: '#2C271F',
              marginBottom: '8px'
            }}>
              Race Course Circle, Alkapuri,<br />
              Vadodara, Gujarat 390007
            </div>
            <a
              href={contact.googleMapsUrl || 'https://maps.google.com/?q=Race+Course+Circle+Vadodara'}
              target="_blank"
              rel="noreferrer"
              style={{
                fontSize: '11px',
                letterSpacing: '2px',
                color: '#211C16',
                fontWeight: 600,
                textDecoration: 'underline'
              }}
            >
              VIEW ON GOOGLE MAPS ↗
            </a>
          </div>

          {/* Sales Phone */}
          <div>
            <div style={{
              fontSize: '10.5px',
              letterSpacing: '2.5px',
              color: 'var(--accent)',
              marginBottom: '6px',
              fontWeight: 600
            }}>◦ SALES &amp; MEASUREMENT CONSULTATION</div>
            <div style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '20px',
              color: '#2C271F',
              fontWeight: 600
            }}>
              <a href={`tel:${contact.salesPhoneRaw || '+919913132736'}`} style={{ color: '#2C271F', textDecoration: 'none' }}>
                {contact.salesPhone || '+91 9913132736'}
              </a>
            </div>
          </div>

          {/* General Queries Phone */}
          <div>
            <div style={{
              fontSize: '10.5px',
              letterSpacing: '2.5px',
              color: 'var(--accent)',
              marginBottom: '6px',
              fontWeight: 600
            }}>◦ GENERAL QUERIES &amp; ORDERS</div>
            <div style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '20px',
              color: '#2C271F',
              fontWeight: 600
            }}>
              <a href={`tel:${contact.generalQueriesPhoneRaw || '+919998852736'}`} style={{ color: '#2C271F', textDecoration: 'none' }}>
                {contact.generalQueriesPhone || '+91 9998852736'}
              </a>
            </div>
          </div>

          {/* Partner with us Phone */}
          <div>
            <div style={{
              fontSize: '10.5px',
              letterSpacing: '2.5px',
              color: 'var(--accent)',
              marginBottom: '6px',
              fontWeight: 600
            }}>◦ ARCHITECTS &amp; TRADE PARTNERSHIPS</div>
            <div style={{
              fontFamily: 'ui-monospace, monospace',
              fontSize: '20px',
              color: '#2C271F',
              fontWeight: 600
            }}>
              <a href={`tel:${contact.partnerWithUsPhoneRaw || '+919725116871'}`} style={{ color: '#2C271F', textDecoration: 'none' }}>
                {contact.partnerWithUsPhone || '+91 9725116871'}
              </a>
            </div>
          </div>

          {/* Official Email */}
          <div>
            <div style={{
              fontSize: '10.5px',
              letterSpacing: '2.5px',
              color: 'var(--accent)',
              marginBottom: '6px',
              fontWeight: 600
            }}>◦ EMAIL US</div>
            <div style={{
              fontFamily: 'var(--serif)',
              fontSize: '22px',
              color: '#2C271F'
            }}>
              <a href={`mailto:${contact.email || 'Aesthetics.jhv@gmail.com'}`} style={{ color: '#2C271F', textDecoration: 'none' }}>
                {contact.email || 'Aesthetics.jhv@gmail.com'}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Consultation Form */}
      <div className="visit-form-box" style={{
        background: '#FCFAF6',
        padding: '48px 48px 52px',
        border: '1px solid rgba(33,28,22,0.06)',
        boxShadow: '0 10px 40px rgba(33,28,22,0.03)'
      }}>
        <div style={{
          fontSize: '11px',
          letterSpacing: '3px',
          color: 'var(--accent)',
          marginBottom: '12px',
          fontWeight: 600
        }}>SCHEDULE CONSULTATION</div>
        
        <h2 style={{
          fontFamily: 'var(--serif)',
          fontWeight: 500,
          fontSize: '34px',
          marginBottom: '28px',
          color: '#211C16'
        }}>
          Tell us about your space.
        </h2>

        {submitted ? (
          <div style={{
            background: '#FAF7F2',
            border: '1px solid #E0D8CA',
            padding: '36px 28px',
            textAlign: 'center',
            animation: 'aes-fade 0.4s ease'
          }}>
            <div style={{ fontSize: '40px', marginBottom: '12px' }}>✓</div>
            <h3 style={{ fontFamily: 'var(--serif)', fontSize: '26px', marginBottom: '10px' }}>
              Consultation Booked
            </h3>
            <p style={{ fontSize: '15px', color: '#5C554A', lineHeight: 1.7, margin: '0 0 20px' }}>
              We have recorded your consultation request in our system. A senior decorator from our Vadodara atelier will contact you shortly to confirm your visit time.
            </p>
            <button
              type="button"
              onClick={() => setSubmitted(false)}
              style={{
                background: 'var(--accent)',
                color: '#fff',
                border: 'none',
                padding: '12px 24px',
                fontSize: '11px',
                letterSpacing: '2px',
                fontWeight: 600,
                cursor: 'pointer'
              }}
            >
              SUBMIT ANOTHER INQUIRY
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="visit-form-grid" style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '22px 20px',
              marginBottom: '24px'
            }}>
              <label style={{ display: 'block' }}>
                <span style={{ display: 'block', fontSize: '10.5px', letterSpacing: '2px', color: '#8B8272', marginBottom: '8px', fontWeight: 600 }}>NAME *</span>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="e.g. Rahul Shah"
                  style={{
                    width: '100%',
                    border: 'none',
                    borderBottom: '1px solid #DAD3C7',
                    background: 'none',
                    padding: '8px 0',
                    fontFamily: 'var(--sans)',
                    fontSize: '15px',
                    color: '#211C16'
                  }}
                />
              </label>

              <label style={{ display: 'block' }}>
                <span style={{ display: 'block', fontSize: '10.5px', letterSpacing: '2px', color: '#8B8272', marginBottom: '8px', fontWeight: 600 }}>PHONE NUMBER *</span>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  placeholder="+91 98..."
                  style={{
                    width: '100%',
                    border: 'none',
                    borderBottom: '1px solid #DAD3C7',
                    background: 'none',
                    padding: '8px 0',
                    fontFamily: 'var(--sans)',
                    fontSize: '15px',
                    color: '#211C16'
                  }}
                />
              </label>

              <label style={{ display: 'block' }}>
                <span style={{ display: 'block', fontSize: '10.5px', letterSpacing: '2px', color: '#8B8272', marginBottom: '8px', fontWeight: 600 }}>EMAIL ADDRESS</span>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@domain.com"
                  style={{
                    width: '100%',
                    border: 'none',
                    borderBottom: '1px solid #DAD3C7',
                    background: 'none',
                    padding: '8px 0',
                    fontFamily: 'var(--sans)',
                    fontSize: '15px',
                    color: '#211C16'
                  }}
                />
              </label>

              <label style={{ display: 'block' }}>
                <span style={{ display: 'block', fontSize: '10.5px', letterSpacing: '2px', color: '#8B8272', marginBottom: '8px', fontWeight: 600 }}>CITY / AREA</span>
                <input 
                  type="text" 
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Vadodara, Alkapuri..."
                  style={{
                    width: '100%',
                    border: 'none',
                    borderBottom: '1px solid #DAD3C7',
                    background: 'none',
                    padding: '8px 0',
                    fontFamily: 'var(--sans)',
                    fontSize: '15px',
                    color: '#211C16'
                  }}
                />
              </label>
            </div>

            <label style={{ display: 'block', marginBottom: '20px' }}>
              <span style={{ display: 'block', fontSize: '10.5px', letterSpacing: '2px', color: '#8B8272', marginBottom: '8px', fontWeight: 600 }}>PRIMARY INTEREST</span>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{
                  width: '100%',
                  border: '1px solid #DAD3C7',
                  background: '#FFFFFF',
                  padding: '10px 12px',
                  fontFamily: 'var(--sans)',
                  fontSize: '14px',
                  color: '#211C16'
                }}
              >
                <option value="Curtains">Curtains (Sheer, Dimout, Blackout, Translucent)</option>
                <option value="Upholstery Fabrics">Upholstery Fabrics (Sofas, Chairs, Banquettes)</option>
                <option value="Blinds">Blinds (Roman, Roller, Venetian, Motorized)</option>
                <option value="Custom Furniture">Custom Furniture (Bespoke Sofas, Accent Chairs)</option>
                <option value="Wall Coverings">Wall Coverings (Wallpapers, Panelling, Veneers)</option>
                <option value="Flooring">Flooring (Engineered Wood, SPC, Laminate)</option>
                <option value="Home Linens">Home Linens (Bedding Sets, Bath Towels, Cushions)</option>
                <option value="Carpets & Rugs">Carpets &amp; Rugs (Handmade &amp; Custom Rugs)</option>
                <option value="Mattresses">Mattresses (King Koil, Latex, Memory Foam)</option>
                <option value="Complete Home Décor Project">Complete Home Décor &amp; Interior Project</option>
              </select>
            </label>

            <label style={{ display: 'block', marginBottom: '28px' }}>
              <span style={{ display: 'block', fontSize: '10.5px', letterSpacing: '2px', color: '#8B8272', marginBottom: '8px', fontWeight: 600 }}>TELL US ABOUT YOUR SPACE</span>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Window count, drop dimensions, preferred colors, site visit schedule…" 
                style={{
                  width: '100%',
                  height: '96px',
                  resize: 'none',
                  border: '1px solid #DAD3C7',
                  background: '#ffffff',
                  padding: '14px',
                  fontFamily: 'var(--sans)',
                  fontSize: '14.5px',
                  color: '#211C16',
                  lineHeight: '1.6'
                }}
              />
            </label>

            <button 
              type="submit" 
              style={{
                width: '100%',
                border: 'none',
                background: 'var(--accent)',
                color: '#ffffff',
                cursor: 'pointer',
                padding: '18px',
                fontFamily: 'var(--sans)',
                fontSize: '11.5px',
                letterSpacing: '3px',
                fontWeight: 600,
                transition: 'background-color 0.2s ease'
              }}
              className="submit-btn"
            >
              REQUEST CONSULTATION
            </button>
          </form>
        )}
      </div>

      <style>{`
        .submit-btn:hover {
          background-color: var(--accent-dark) !important;
        }
        @media (max-width: 800px) {
          .visit-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
            padding-top: 48px !important;
          }
          .visit-form-box {
            padding: 32px 24px 36px !important;
          }
        }
        @media (max-width: 460px) {
          .visit-form-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </main>
  );
}
