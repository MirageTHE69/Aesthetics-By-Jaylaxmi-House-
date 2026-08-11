import React, { useState } from 'react';

export default function VisitView() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    alert(`Thank you ${formData.name}. We have received your consultation enquiry and will get back to you soon.`);
    setFormData({
      name: '',
      email: '',
      phone: '',
      city: '',
      message: ''
    });
  };

  return (
    <main style={{
      padding: '74px 56px 100px',
      display: 'grid',
      gridTemplateColumns: '1fr 1.15fr',
      gap: '72px'
    }} className="animate-fade">
      {/* Left Column */}
      <div>
        <div style={{
          fontSize: '11px',
          letterSpacing: '3.5px',
          color: 'var(--accent)',
          marginBottom: '24px',
          fontWeight: 500
        }}>GET IN TOUCH</div>
        
        <h1 style={{
          fontFamily: 'var(--serif)',
          fontWeight: 500,
          fontSize: '68px',
          lineHeight: 0.98,
          letterSpacing: '-1px',
          marginBottom: '48px'
        }}>
          Visit the studio.<br />
          <em style={{ fontStyle: 'italic' }}>Or write to us.</em>
        </h1>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '30px',
          maxWidth: '320px'
        }}>
          <div>
            <div style={{
              fontSize: '10.5px',
              letterSpacing: '2.5px',
              color: 'var(--accent)',
              marginBottom: '10px',
              fontWeight: 500
            }}>◦ STUDIO</div>
            <div style={{
              fontFamily: 'var(--serif)',
              fontSize: '22px',
              lineHeight: 1.35,
              color: '#2C271F'
            }}>
              Race Course Circle,<br />
              Vadodara, Gujarat 390007
            </div>
          </div>

          <div>
            <div style={{
              fontSize: '10.5px',
              letterSpacing: '2.5px',
              color: 'var(--accent)',
              marginBottom: '10px',
              fontWeight: 500
            }}>◦ PHONE</div>
            <div style={{
              fontFamily: 'var(--serif)',
              fontSize: '22px',
              color: '#2C271F'
            }}>
              +91 98000 00000
            </div>
          </div>

          <div>
            <div style={{
              fontSize: '10.5px',
              letterSpacing: '2.5px',
              color: 'var(--accent)',
              marginBottom: '10px',
              fontWeight: 500
            }}>◦ EMAIL</div>
            <div style={{
              fontFamily: 'var(--serif)',
              fontSize: '22px',
              color: '#2C271F'
            }}>
              hello@aesthetics.house
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Consultation Form */}
      <div style={{
        background: '#FCFAF6',
        padding: '48px 48px 52px',
        border: '1px solid rgba(33,28,22,0.05)'
      }}>
        <div style={{
          fontSize: '11px',
          letterSpacing: '3px',
          color: 'var(--accent)',
          marginBottom: '12px',
          fontWeight: 500
        }}>ENQUIRY</div>
        
        <h2 style={{
          fontFamily: 'var(--serif)',
          fontWeight: 500,
          fontSize: '34px',
          marginBottom: '32px'
        }}>
          Tell us about your project.
        </h2>

        <form onSubmit={handleSubmit}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '22px 20px',
            marginBottom: '26px'
          }}>
            <label style={{ display: 'block' }}>
              <span style={{ display: 'block', fontSize: '10.5px', letterSpacing: '2px', color: '#8B8272', marginBottom: '9px', fontWeight: 500 }}>NAME *</span>
              <input 
                type="text" 
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
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
              <span style={{ display: 'block', fontSize: '10.5px', letterSpacing: '2px', color: '#8B8272', marginBottom: '9px', fontWeight: 500 }}>EMAIL *</span>
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
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
              <span style={{ display: 'block', fontSize: '10.5px', letterSpacing: '2px', color: '#8B8272', marginBottom: '9px', fontWeight: 500 }}>PHONE</span>
              <input 
                type="tel" 
                name="phone"
                value={formData.phone}
                onChange={handleChange}
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
              <span style={{ display: 'block', fontSize: '10.5px', letterSpacing: '2px', color: '#8B8272', marginBottom: '9px', fontWeight: 500 }}>CITY</span>
              <input 
                type="text" 
                name="city"
                value={formData.city}
                onChange={handleChange}
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

          <label style={{ display: 'block', marginBottom: '30px' }}>
            <span style={{ display: 'block', fontSize: '10.5px', letterSpacing: '2px', color: '#8B8272', marginBottom: '9px', fontWeight: 500 }}>TELL US ABOUT YOUR SPACE</span>
            <textarea 
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Room dimensions, style preferences, timelines…" 
              style={{
                width: '100%',
                height: '96px',
                resize: 'none',
                border: '1px solid #DAD3C7',
                background: '#ffffff',
                padding: '14px',
                fontFamily: 'var(--sans)',
                fontSize: '15px',
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
              fontSize: '11px',
              letterSpacing: '3px',
              fontWeight: 500,
              transition: 'background-color 0.2s ease'
            }}
            className="submit-btn"
          >
            REQUEST CONSULTATION
          </button>
        </form>
      </div>

      <style>{`
        .submit-btn:hover {
          background-color: var(--accent-dark) !important;
        }
      `}</style>
    </main>
  );
}
