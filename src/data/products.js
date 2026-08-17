import heroLiving from '../assets/hero-living.jpg';
import atelierDetail from '../assets/atelier-detail.png';
import atelierWide from '../assets/atelier-wide.png';
import mittiCraft from '../assets/mitti-craft.png';
import mittiCurtains from '../assets/mitti-curtains.png';
import mittiKitchen from '../assets/mitti-kitchen.png';
import mittiSofa from '../assets/mitti-sofa.png';
import patternGrid from '../assets/pattern-grid.png';
import patternHerringbone from '../assets/pattern-herringbone.png';
import patternSolid from '../assets/pattern-solid.png';
import patternStripe from '../assets/pattern-stripe.png';

// High-resolution curated editorial imagery for all 9 categories
const U1 = 'https://images.unsplash.com/photo-1691036561573-4b76998b60de?w=1600&q=80';
const U2 = 'https://images.unsplash.com/photo-1544691560-fc2053d97726?w=1600&q=80';
const U3 = 'https://images.unsplash.com/photo-1558882224-dda166733046?w=1600&q=80';
const U4 = 'https://images.unsplash.com/photo-1615875605825-5eb9bb5d52ac?w=1600&q=80';
const U5 = 'https://images.unsplash.com/photo-1618220179428-22790b461013?w=1600&q=80';
const U6 = 'https://images.unsplash.com/photo-1619459075136-2b53c6153d4f?w=1600&q=80';
const U7 = 'https://images.unsplash.com/photo-1631049552057-403cdb8f0658?w=1600&q=80';
const U8 = 'https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=1600&q=80';
const U9 = 'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=1600&q=80';
const U10 = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600&q=80';
const U11 = 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=1600&q=80';
const U12 = 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=1600&q=80';
const U13 = 'https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?w=1600&q=80';
const U14 = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1600&q=80';
const U15 = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1600&q=80';

// EXACT 9 PRODUCT CATEGORIES
export const CATEGORIES = [
  'Curtains',
  'Upholstery Fabrics',
  'Blinds',
  'Custom Furniture',
  'Wall Coverings',
  'Flooring',
  'Home Linens',
  'Carpets & Rugs',
  'Mattresses'
];

export const CATEGORY_TAXONOMY = {
  'Curtains': {
    types: ['Sheer Curtains', 'Dimout Curtains', 'Blackout Curtains', 'Translucent Curtains'],
    fabrics: ['Cotton', 'Linen', 'Polyester', 'Vegan Leather', 'Viscose', 'Multi-Blends']
  },
  'Upholstery Fabrics': {
    types: ['Heavy Upholstery', 'Accent Fabrics', 'Banquette & Chair Weaves', 'Outdoor & Performance'],
    fabrics: ['Cotton', 'Linen', 'Polyester', 'Viscose', 'Multi-Blends']
  },
  'Blinds': {
    types: ['Roman Blinds', 'Roller Blinds', 'Venetian Blinds', 'Bamboo & Wooden Blinds', 'Motorized Blinds'],
    fabrics: ['Raw Cotton', 'Linen Voile', 'Polyester Mesh', 'Natural Bamboo', 'Basswood']
  },
  'Custom Furniture': {
    types: ['Bespoke Sofas', 'Accent Armchairs', 'Dining Seating', 'Bespoke Headboards', 'Consoles & Low Tables'],
    fabrics: ['Full Grain Leather', 'Handloom Bouclé', 'Velvet', 'Cotton-Linen Weave']
  },
  'Wall Coverings': {
    types: ['Wallpapers', 'Fabric Panelling', 'Veneer Wallpapers'],
    fabrics: ['Non-Woven Paper', 'Acoustic Linen Panelling', 'Natural Wood Veneer', 'Textured Grasscloth']
  },
  'Flooring': {
    types: ['Laminate Wooden Flooring', 'Engineered Wood Flooring', 'PVC Flooring', 'SPC Flooring', 'Wall-to-Wall Carpets'],
    fabrics: ['European Oak', 'American Walnut', 'Teak Wood', 'Heavy SPC Polymer', 'Wool Blend']
  },
  'Home Linens': {
    types: ['Bedroom Sets', 'Bath Linens', 'Decorative Cushions', 'Cushion Covers'],
    fabrics: ['Cotton Percale 300TC', 'Mulberry Silk', 'Pure Belgian Linen', 'Hand Block Printed Cotton']
  },
  'Carpets & Rugs': {
    types: ['Handmade Rugs', 'Customized Rugs', 'Carpets'],
    fabrics: ['Hand-Spun Wool', 'Pit-Loomed Cotton', 'Jute Blends', 'Silk-Touch Persian Weaves']
  },
  'Mattresses': {
    types: ['Memory Foam', 'Natural Latex', 'Hybrid Pocket Spring', 'Orthopedic Coir', 'Custom-Sized Sleep Systems'],
    fabrics: ['Organic Cotton Quilted', 'Natural Latex Core', 'Rubberised Coir', 'High Resilient Foam']
  }
};

export const CATEGORY_META = {
  'Curtains': {
    eyebrow: 'MADE-TO-MEASURE DRAPERY',
    heading: 'Light, framed by hand.',
    description: 'Sheer, Dimout, Blackout & Translucent curtains in pure cotton, linen, viscose, vegan leather, and bespoke multi-blends — tailored to the drop of your window in Vadodara.',
    hero: U1,
    studioCount: 42,
    subtypes: ['Sheer Curtains', 'Dimout Curtains', 'Blackout Curtains', 'Translucent Curtains']
  },
  'Upholstery Fabrics': {
    eyebrow: 'SOFAS, CHAIRS & BANQUETTES',
    heading: 'Fabric that earns a decade of use.',
    description: 'Heavy-duty weaves engineered for everyday living — cotton, linen, polyester, viscose, and multi-blends tested up to 75,000 Martindale rubs.',
    hero: U2,
    studioCount: 68,
    subtypes: ['Cotton', 'Linen', 'Polyester', 'Viscose', 'Multi-Blends']
  },
  'Blinds': {
    eyebrow: 'ROMAN, ROLLER & VENETIAN',
    heading: 'Light control, tailored quietly.',
    description: 'Roman, roller, venetian, natural bamboo, and smart motorized blinds — custom engineered for exact window recess fit and smooth operation.',
    hero: U4,
    studioCount: 24,
    subtypes: ['Roman Blinds', 'Roller Blinds', 'Venetian Blinds', 'Bamboo & Wooden', 'Motorized']
  },
  'Custom Furniture': {
    eyebrow: 'BESPOKE HANDMADE PIECES',
    heading: 'Timeless furniture, tailored to your space.',
    description: 'Custom sofas, reading armchairs, tailored dining chairs, and bespoke headboards built in solid seasoned teak wood and upholstered in our atelier fabrics.',
    hero: U14,
    studioCount: 28,
    subtypes: ['Bespoke Sofas', 'Accent Armchairs', 'Dining Seating', 'Headboards', 'Consoles']
  },
  'Wall Coverings': {
    eyebrow: 'WALLPAPERS, PANELLING & VENEERS',
    heading: 'Walls that speak with quiet elegance.',
    description: 'Curated wallpapers, architectural fabric panelling, and natural veneer wall coverings from global design houses and Indian heritage ateliers.',
    hero: U3,
    studioCount: 120,
    subtypes: ['Wallpapers', 'Fabric Panelling', 'Veneer Wallpapers']
  },
  'Flooring': {
    eyebrow: 'WOODEN, SPC & CARPET SOLUTIONS',
    heading: 'Underfoot warmth & enduring durability.',
    description: 'Laminate wooden flooring, engineered wood, PVC, heavy-duty SPC flooring, and wall-to-wall carpets professionally installed by our specialist crew.',
    hero: U5,
    studioCount: 32,
    subtypes: ['Laminate Flooring', 'Engineered Wood', 'PVC Flooring', 'SPC Flooring', 'Wall-to-Wall Carpets']
  },
  'Home Linens': {
    eyebrow: 'BEDDING, BATH & CUSHIONS',
    heading: 'What the home remembers.',
    description: 'Pure 300TC cotton percale bedroom sets, absorbent luxury bath linens, hand block-printed cushion covers, and decorative throws crafted in-house.',
    hero: U6,
    studioCount: 46,
    subtypes: ['Bedroom Sets', 'Bath Linens', 'Decorative Cushions', 'Cushion Covers']
  },
  'Carpets & Rugs': {
    eyebrow: 'HANDMADE & CUSTOMIZED RUGS',
    heading: 'Underfoot, pure storytelling.',
    description: 'Handmade wool rugs, customized rugs tailored to your room dimensions, and luxury carpets hand-knotted by traditional weaving families.',
    hero: U8,
    studioCount: 54,
    subtypes: ['Handmade Rugs', 'Customized Rugs', 'Carpets']
  },
  'Mattresses': {
    eyebrow: 'ENGINEERED SLEEP SYSTEMS',
    heading: 'Rest, engineered quietly.',
    description: 'Natural latex, memory foam, orthopedic coir, and hybrid pocket spring sleep systems — custom crafted to standard and non-standard Indian bed sizes.',
    hero: U7,
    studioCount: 16,
    subtypes: ['Memory Foam', 'Natural Latex', 'Hybrid Pocket Spring', 'Orthopedic Coir']
  }
};

// 32 OFFICIAL BRANDS WE CARRY
export const BRANDS_WE_CARRY = [
  { name: 'Asian paints Nilaya + Sabyasachi', category: 'Wall Coverings & Fabrics', tag: 'Luxury Designer' },
  { name: 'Ddecor', category: 'Curtains & Upholstery', tag: 'Premium Textiles' },
  { name: 'Sansaar by Ddecor', category: 'Sustainable Fabrics', tag: 'Eco Luxe' },
  { name: 'Sarom', category: 'Curtains & Upholstery', tag: 'Fine Furnishings' },
  { name: 'Vaya', category: 'Luxury Silks & Weaves', tag: 'High Craft' },
  { name: 'F&F', category: 'Drapery & Sheers', tag: 'Curated Fabrics' },
  { name: 'Nu Home décor', category: 'Home Linens & Soft Furnishings', tag: 'Modern Living' },
  { name: 'V&J furnishings', category: 'Velvets & Textures', tag: 'Bespoke' },
  { name: 'Warwick', category: 'Performance Upholstery', tag: 'Global Standards' },
  { name: 'Rumors', category: 'Contemporary Prints', tag: 'Design Forward' },
  { name: 'GM homes', category: 'Soft Furnishings', tag: 'Everyday Luxury' },
  { name: 'Li Dimora', category: 'Italian Inspired Drapery', tag: 'Artisanal' },
  { name: 'Maspar', category: 'Luxury Bedding & Linens', tag: 'Pure Cotton' },
  { name: 'Monte carlo', category: 'Throws & Blankets', tag: 'Warm Comfort' },
  { name: 'Pluchi', category: 'Knitted Cushions & Throws', tag: 'Nordic Craft' },
  { name: 'Sadyaska', category: 'Bespoke Linens', tag: 'Heritage' },
  { name: 'Labham', category: 'Curtains & Drapes', tag: 'Classic' },
  { name: 'Welspun / Spaces', category: 'Bedding & Bath Linens', tag: 'Premium Home' },
  { name: 'Trident', category: 'Luxury Bath Towels', tag: 'Pure Absorbency' },
  { name: 'Himeya', category: 'Organic Bedding', tag: 'Sustainable' },
  { name: 'La Casa', category: 'Curtain Hardware & Textures', tag: 'Modern' },
  { name: 'Aplito', category: 'Architectural Wallpapers', tag: 'Textures' },
  { name: 'Obsessions', category: 'Bath Mats & Decorative Rugs', tag: 'Contemporary' },
  { name: 'Excel Wall coverings', category: 'Wallpapers & Panelling', tag: 'Global Collection' },
  { name: 'Divine carpets', category: 'Handmade Rugs & Carpets', tag: 'Handloom' },
  { name: 'Jaipur Rugs', category: 'Artisan Knotted Carpets', tag: 'Master Weavers' },
  { name: 'Adorn Blinds', category: 'Motorized & Roller Blinds', tag: 'Precision' },
  { name: 'NBT', category: 'Specialized Blinds', tag: 'Commercial' },
  { name: 'MAC Blinds', category: 'Architectural Window Solutions', tag: 'Engineered' },
  { name: 'Vision Blinds', category: 'Day & Night Blinds', tag: 'Light Control' },
  { name: 'King Koil Mattresses', category: 'Orthopedic Sleep Systems', tag: 'Global Leader' },
  { name: 'Millbrook Beds', category: 'Handmade British Mattresses', tag: 'Luxury Sleep' },
  { name: 'Buoninfante Mattresses', category: 'Italian Ergonomic Mattresses', tag: 'Made in Italy' }
];

// 14 COMMERCIAL & INSTITUTIONAL BRANDS THAT HAVE TRUSTED US
export const TRUSTED_CLIENTS = [
  { name: 'TATA Projects', type: 'Corporate & Infrastructure', icon: '🏛️' },
  { name: 'Marriott Group', type: 'Luxury Hospitality', icon: '🏨' },
  { name: 'ITC Hotels', type: '5-Star Luxury Hotels', icon: '🌟' },
  { name: 'Inox CVA', type: 'Industrial & Headquarters', icon: '🏢' },
  { name: 'BANCO', type: 'Manufacturing & Commercial', icon: '🏭' },
  { name: 'Cube Constructions', type: 'Premium Real Estate', icon: '🏗️' },
  { name: 'Gujarat Kidney Hospital', type: 'Healthcare Facility', icon: '🏥' },
  { name: 'KPGU', type: 'University Campus', icon: '🎓' },
  { name: 'Parul University', type: 'Educational Institutions', icon: '🏫' },
  { name: 'Sumandeep Vidyapeeth', type: 'Medical & Healthcare Campus', icon: '🏛️' },
  { name: 'Navrachana International School', type: 'Premier International School', icon: '📚' },
  { name: 'Bhailal Amin General Hospital', type: 'Multi-Specialty Hospital', icon: '🏥' },
  { name: 'Loksatta News', type: 'Media & Broadcasting House', icon: '📰' },
  { name: 'Regenta Hotels', type: 'Hospitality Chain', icon: '🏨' },
  { name: 'Hotel Hilton', type: 'Global Luxury Hospitality', icon: '✨' }
];

// OFFICIAL CONTACT DETAILS
export const CONTACT_DETAILS = {
  address: 'Race Course Circle, Alkapuri, Vadodara, Gujarat 390007',
  googleMapsUrl: 'https://maps.google.com/?q=Aesthetics+Jaylaxmi+House+Race+Course+Circle+Vadodara',
  email: 'Aesthetics.jhv@gmail.com',
  salesPhone: '+91 9913132736',
  salesPhoneRaw: '+919913132736',
  generalQueriesPhone: '+91 9998852736',
  generalQueriesPhoneRaw: '+919998852736',
  partnerWithUsPhone: '+91 9725116871',
  partnerWithUsPhoneRaw: '+919725116871'
};

// COMPREHENSIVE INITIAL PRODUCTS CATALOG FOR ALL 9 CATEGORIES
export const PRODUCTS = {
  'Curtains': [
    {
      id: 'curtains-kharif-sheer',
      name: 'Kharif Slub Sheer',
      curtainType: 'Sheer Curtains',
      fabricType: 'Cotton',
      price: 3400,
      unit: 'per metre',
      badge: 'Best Seller',
      description: 'A raw slub-cotton sheer that softens midday glare without darkening your room. Finished with a natural unlined drop in our Vadodara studio.',
      colors: [{ name: 'Kharif Sand', hex: '#D9C6A5' }, { name: 'Chalk White', hex: '#EFE9DD' }],
      images: [U1, patternSolid],
      specs: { CurtainType: 'Sheer Curtains', Fabric: '100% Slub Cotton', Drop: 'Made to measure up to 14 ft', Care: 'Gentle machine wash or dry clean' }
    },
    {
      id: 'curtains-neem-dimout',
      name: 'Neem Shadow Dimout Drape',
      curtainType: 'Dimout Curtains',
      fabricType: 'Linen',
      price: 4600,
      unit: 'per metre',
      badge: 'Hand Finished',
      description: 'A medium-heavy linen blend designed to filter 80% of outdoor light with a calm, tactile presence. Ideal for bedrooms and TV lounges.',
      colors: [{ name: 'Neem Green', hex: '#33443A' }, { name: 'Earthy Charcoal', hex: '#2B2622' }],
      images: [mittiCurtains, atelierDetail],
      specs: { CurtainType: 'Dimout Curtains', Fabric: '75% Natural Linen, 25% Cotton', LightDimming: '80% Light Reduction', Care: 'Dry clean recommended' }
    },
    {
      id: 'curtains-nightfall-blackout',
      name: 'Indigo Nightfall Triple-Weave Blackout',
      curtainType: 'Blackout Curtains',
      fabricType: 'Polyester',
      price: 5200,
      unit: 'per metre',
      badge: '100% Light Block',
      description: 'Triple-woven thermal blackout drapery with deep indigo dye tones. Provides sound dampening and complete bedroom darkness.',
      colors: [{ name: 'Indigo Navy', hex: '#25303F' }, { name: 'Iron Black', hex: '#1C1A19' }],
      images: [heroLiving, patternSolid],
      specs: { CurtainType: 'Blackout Curtains', Fabric: 'High-Density Micro-Polyester Blend', ThermalLining: 'Triple Layer Integrated', Care: 'Dry clean only' }
    },
    {
      id: 'curtains-translucent-ochre',
      name: 'Ochre Horizon Translucent Drape',
      curtainType: 'Translucent Curtains',
      fabricType: 'Viscose',
      price: 4100,
      unit: 'per metre',
      badge: 'Editorial Choice',
      description: 'A luminous viscose-linen translucent fabric that catches golden afternoon sun and fills the space with an amber glow.',
      colors: [{ name: 'Ochre Glow', hex: '#B4832E' }, { name: 'Terracotta', hex: '#B4592F' }],
      images: [U11, patternStripe],
      specs: { CurtainType: 'Translucent Curtains', Fabric: '60% Viscose, 40% Linen', Drape: 'Fluid, high sheen', Care: 'Professional dry clean' }
    }
  ],
  'Upholstery Fabrics': [
    {
      id: 'upholstery-mitti-boucle',
      name: 'Mitti Handloom Bouclé',
      curtainType: 'Heavy Upholstery',
      fabricType: 'Multi-Blends',
      price: 4600,
      unit: 'per metre',
      badge: 'Fabric of the Year',
      description: 'Our signature handloom cotton-silk-linen bouclé, hand-finished in Gujarat. Rated for heavy everyday sofa and banquette use.',
      colors: [{ name: 'Mitti Earth', hex: '#B4592F' }, { name: 'Chalk Cream', hex: '#EFE9DD' }],
      images: [U13, atelierWide],
      specs: { Composition: '62% Cotton, 28% Silk, 10% Linen', Weight: '480 GSM', RubCount: '60,000 Martindale', Care: 'Spot clean or dry clean' }
    },
    {
      id: 'upholstery-charcoal-twill',
      name: 'Heritage Charcoal Heavy Weave',
      curtainType: 'Heavy Upholstery',
      fabricType: 'Cotton',
      price: 3200,
      unit: 'per metre',
      badge: 'Stain Guarded',
      description: 'High-density cotton twill reinforced with stain protection for high-traffic living rooms and commercial lounges.',
      colors: [{ name: 'Charcoal', hex: '#2B2A27' }, { name: 'Raw Sand', hex: '#D9C6A5' }],
      images: [U2, patternHerringbone],
      specs: { Composition: '75% Cotton, 25% Poly-Structure', Weight: '520 GSM', RubCount: '75,000 Martindale', Finish: 'Stain-Resistant Coated' }
    },
    {
      id: 'upholstery-sable-herringbone',
      name: 'Sable Wool-Linen Herringbone',
      curtainType: 'Accent Fabrics',
      fabricType: 'Linen',
      price: 3900,
      unit: 'per metre',
      badge: 'Tailored Finish',
      description: 'A tailored herringbone chevron weave in rich sable brown, offering a menswear-inspired texture for armchairs and statement headboards.',
      colors: [{ name: 'Sable Brown', hex: '#4A3A2E' }, { name: 'Muted Sand', hex: '#D9C6A5' }],
      images: [patternHerringbone, atelierDetail],
      specs: { Composition: '50% Pure Linen, 50% Wool Blend', Weight: '495 GSM', RubCount: '55,000 Martindale', Care: 'Dry clean only' }
    },
    {
      id: 'upholstery-viscose-plush',
      name: 'Alkapuri Velvet Viscose Touch',
      curtainType: 'Banquette & Chair Weaves',
      fabricType: 'Viscose',
      price: 4400,
      unit: 'per metre',
      badge: 'Luxury Handfeel',
      description: 'A deeply opulent viscose blend with soft tactile pile, styled here for accent ottomans and dining chairs.',
      colors: [{ name: 'Ivory Cream', hex: '#F1EDE6' }, { name: 'Forest Moss', hex: '#33443A' }],
      images: [mittiSofa, U14],
      specs: { Composition: '80% Viscose, 20% Cotton', Weight: '460 GSM', RubCount: '50,000 Martindale', Care: 'Dry clean only' }
    }
  ],
  'Blinds': [
    {
      id: 'blinds-raw-cotton-roman',
      name: 'Raw Cotton Roman Fold Blind',
      curtainType: 'Roman Blinds',
      fabricType: 'Raw Cotton',
      price: 1450,
      unit: 'per sq.ft',
      badge: 'Custom Sized',
      description: 'A structured roman fold in unbleached raw cotton, engineered to your exact recess dimensions with smooth chain operation.',
      colors: [{ name: 'Terracotta', hex: '#B4592F' }, { name: 'Kharif Sand', hex: '#D9C6A5' }],
      images: [U4, patternStripe],
      specs: { Mechanism: 'Precision Roman Pulley', Material: '100% Raw Cotton', Mount: 'Inside or Outside Recess', Lining: 'Blackout or Sheer Option' }
    },
    {
      id: 'blinds-bamboo-slat',
      name: 'Natural Bamboo Slat Blind',
      curtainType: 'Bamboo & Wooden Blinds',
      fabricType: 'Natural Bamboo',
      price: 980,
      unit: 'per sq.ft',
      badge: 'Organic Craft',
      description: 'Hand-strung natural bamboo slats that cast horizontal stripes of warm, diffused light across kitchens, studies, and verandas.',
      colors: [{ name: 'Natural Honey Bamboo', hex: '#C9A660' }],
      images: [mittiKitchen, atelierDetail],
      specs: { Material: 'Sustainable Bamboo Slat', LightFiltration: 'Gentle Day Diffusion', Hardware: 'Brass/Anodized Alloy', Care: 'Dust or dry wipe' }
    },
    {
      id: 'blinds-motorized-roller',
      name: 'Adorn Smart Motorized Roller Blind',
      curtainType: 'Motorized Blinds',
      fabricType: 'Polyester Mesh',
      price: 2200,
      unit: 'per sq.ft',
      badge: 'Smart Automation',
      description: 'Whisper-quiet motorized roller blind integrated with smart home apps and Alexa/Google Home. Screen fabric with 3% openness.',
      colors: [{ name: 'Chalk White', hex: '#EFE9DD' }, { name: 'Slate Grey', hex: '#6B7A6E' }],
      images: [U10, heroLiving],
      specs: { Motor: 'Somfy / Adorn Smart RF Motor', Power: 'Rechargeable Li-Ion / Hardwired', Openness: '3% Solar Screen', Warranty: '5 Years Motor' }
    }
  ],
  'Custom Furniture': [
    {
      id: 'furniture-alkapuri-lounge-sofa',
      name: 'The Alkapuri 3-Seater Lounge Sofa',
      curtainType: 'Bespoke Sofas',
      fabricType: 'Handloom Bouclé',
      price: 115000,
      unit: 'per unit',
      badge: 'Custom Crafted',
      description: 'Handcrafted solid teak frame with high-resilience multi-density foam and feather-down wrap, upholstered in our Mitti 2027 handloom bouclé.',
      colors: [{ name: 'Terracotta Earth', hex: '#B4592F' }, { name: 'Chalk Bouclé', hex: '#EFE9DD' }],
      images: [U14, mittiSofa],
      specs: { Frame: 'Kiln-Dried CP Teak Wood', Foam: 'High Density 40D + Down Feathers', Dimensions: '90" W x 38" D x 32" H', LeadTime: '3-4 Weeks' }
    },
    {
      id: 'furniture-kutch-accent-armchair',
      name: 'The Kutch Wingback Accent Armchair',
      curtainType: 'Accent Armchairs',
      fabricType: 'Cotton-Linen Weave',
      price: 48000,
      unit: 'per unit',
      badge: 'Architectural',
      description: 'An ergonomic curved wingback chair framed in oiled natural teak and upholstered in bespoke textured weave.',
      colors: [{ name: 'Forest Neem', hex: '#33443A' }, { name: 'Ochre Glow', hex: '#B4832E' }],
      images: [U15, atelierWide],
      specs: { Frame: 'Solid Teak with Brass Tips', Cushioning: 'Ergonomic Molded HR Foam', Finish: 'Matte Polyurethane Clear Coat', Customization: 'Any Atelier Fabric' }
    }
  ],
  'Wall Coverings': [
    {
      id: 'wallpapers-sabyasachi-nilaya',
      name: 'Asian Paints Nilaya × Sabyasachi Royal Bengal Motif',
      curtainType: 'Wallpapers',
      fabricType: 'Non-Woven Paper',
      price: 8900,
      unit: 'per roll',
      badge: 'Designer Exclusive',
      description: 'Authentic Sabyasachi designed wallpaper featuring hand-drawn botanical flora and royal Indian heritage motifs on luxury non-woven substrate.',
      colors: [{ name: 'Royal Terracotta & Gold', hex: '#B4592F' }, { name: 'Heritage Indigo', hex: '#41567F' }],
      images: [U3, patternGrid],
      specs: { Brand: 'Asian Paints Nilaya × Sabyasachi', RollDimensions: '10m x 53cm', Substrate: 'Luxury Non-Woven', Match: 'Straight Match 64cm' }
    },
    {
      id: 'wallpapers-acoustic-fabric-panelling',
      name: 'Acoustic Fabric Feature Panelling',
      curtainType: 'Fabric Panelling',
      fabricType: 'Acoustic Linen Panelling',
      price: 450,
      unit: 'per sq.ft',
      badge: 'Sound Dampening',
      description: 'Modular padded wall panelling wrapped in tailored linen fabric with sound-absorbing acoustic foam backing for home theatres and bedrooms.',
      colors: [{ name: 'Sand Linen', hex: '#D9C6A5' }, { name: 'Charcoal Slate', hex: '#2B2A27' }],
      images: [U11, patternSolid],
      specs: { NRC: '0.75 Sound Absorption', Thickness: '25 mm / 50 mm', Installation: 'Concealed Z-Clip System', Fabric: 'FR-Treated Linen Blend' }
    },
    {
      id: 'wallpapers-natural-veneer',
      name: 'Excel Natural Teak Veneer Wall Covering',
      curtainType: 'Veneer Wallpapers',
      fabricType: 'Natural Wood Veneer',
      price: 620,
      unit: 'per sq.ft',
      badge: 'Pure Wood',
      description: 'Micro-thin flexible real wood veneer backed with fleece for curved walls, feature headboards, and executive boardrooms.',
      colors: [{ name: 'Golden Teak', hex: '#8A6A4A' }, { name: 'Smoked Walnut', hex: '#4A3A2E' }],
      images: [heroLiving, U5],
      specs: { Material: '100% Genuine Teak / Walnut Veneer', Flexibility: 'Bends around 50mm radius', Finish: 'Matte Protective Seal', Care: 'Dry microfiber wipe' }
    }
  ],
  'Flooring': [
    {
      id: 'flooring-golden-oak-plank',
      name: 'Golden Oak Engineered Hardwood Plank',
      curtainType: 'Engineered Wood Flooring',
      fabricType: 'European Oak',
      price: 420,
      unit: 'per sq.ft',
      badge: 'Best Seller',
      description: 'Wide-plank engineered European oak with UV-cured matte lacquer, engineered for lasting stability across Indian climatic variations.',
      colors: [{ name: 'Golden Honey Oak', hex: '#C9A660' }],
      images: [U5, heroLiving],
      specs: { Species: 'European White Oak', Dimensions: '190mm W x 1900mm L x 14mm T', TopLayer: '3mm Solid Oak Wear Layer', Warranty: '15 Years Residential' }
    },
    {
      id: 'flooring-smoked-walnut-herringbone',
      name: 'Smoked Walnut Parquet Herringbone',
      curtainType: 'Engineered Wood Flooring',
      fabricType: 'American Walnut',
      price: 560,
      unit: 'per sq.ft',
      badge: 'Architectural Favorite',
      description: 'Precision-cut herringbone blocks of deep American walnut that impart quiet architectural grandeur underfoot.',
      colors: [{ name: 'Smoked Walnut', hex: '#4A3A2E' }],
      images: [U12, patternHerringbone],
      specs: { Species: 'American Walnut', Pattern: 'Classic 90° Herringbone', Finish: 'Natural Hardwax Oil', Installation: 'Glue-Down Parquet' }
    },
    {
      id: 'flooring-heavy-spc',
      name: 'Rigid Core SPC Waterproof Flooring',
      curtainType: 'SPC Flooring',
      fabricType: 'Heavy SPC Polymer',
      price: 185,
      unit: 'per sq.ft',
      badge: '100% Waterproof',
      description: 'Stone plastic composite flooring with integrated IXPE acoustic underlay. Scratch-proof, pet-friendly, and completely impervious to water.',
      colors: [{ name: 'Nordic Ash', hex: '#8C8880' }, { name: 'Warm Teak', hex: '#8A6A4A' }],
      images: [U10, U5],
      specs: { Core: 'Stone Polymer Composite 5.5mm', WearLayer: '0.55mm Commercial Grade', ClickSystem: 'Unilin Easy-Lock', Underlay: '1.5mm Acoustic Foam' }
    }
  ],
  'Home Linens': [
    {
      id: 'linens-kutch-cotton-bedset',
      name: 'Kutch Hand Block-Printed 300TC Cotton Bedding Set',
      curtainType: 'Bedroom Sets',
      fabricType: 'Cotton Percale 300TC',
      price: 7400,
      unit: 'per set',
      badge: 'Hand Block Print',
      description: 'Cool, crisp 300-thread-count cotton percale hand-printed with wooden blocks by Kutch artisans. Includes 1 King sheet and 2 pillowcases.',
      colors: [{ name: 'Terracotta & Sand', hex: '#B4592F' }, { name: 'Indigo Flora', hex: '#41567F' }],
      images: [U6, heroLiving],
      specs: { ThreadCount: '300 TC 100% Long-Staple Cotton', SetIncludes: '1 King Fitted Sheet, 2 Pillowcases', Dye: 'AZO-Free Natural Washes', Care: 'Cold Machine Wash' }
    },
    {
      id: 'linens-mulberry-silk-cushions',
      name: 'Mulberry Silk & Linen Decorative Cushion Set',
      curtainType: 'Decorative Cushions',
      fabricType: 'Mulberry Silk',
      price: 3600,
      unit: 'set of 2',
      badge: 'Luxury Accent',
      description: 'Set of two decorative 18×18 inch cushion covers featuring pure mulberry silk front and textured natural linen backing.',
      colors: [{ name: 'Chalk Ivory', hex: '#EFE9DD' }, { name: 'Ochre Amber', hex: '#B4832E' }],
      images: [mittiSofa, patternSolid],
      specs: { Dimensions: '45 x 45 cm (18 x 18 inches)', FillOption: 'Microfiber Feather Touch Included', Closure: 'Concealed YKK Zipper', Care: 'Dry Clean Recommended' }
    },
    {
      id: 'linens-trident-bath-collection',
      name: 'Trident Grandeur 700 GSM Egyptian Cotton Towel Set',
      curtainType: 'Bath Linens',
      fabricType: 'Cotton',
      price: 2800,
      unit: 'set of 3',
      badge: 'Ultra Absorbent',
      description: 'Plush 700 GSM combed cotton bath towel set offering hotel-grade softness and rapid drying capability.',
      colors: [{ name: 'Muted Sand', hex: '#D9C6A5' }, { name: 'Charcoal Grey', hex: '#2B2A27' }],
      images: [U6, U13],
      specs: { Weight: '700 GSM Heavyweight', Set: '1 Bath Towel, 1 Hand Towel, 1 Face Towel', Material: '100% Combed Zero-Twist Cotton', Care: 'Machine wash 40°C' }
    }
  ],
  'Carpets & Rugs': [
    {
      id: 'rugs-bhujodi-pitloom-dhurrie',
      name: 'Bhujodi Handwoven Heritage Dhurrie',
      curtainType: 'Handmade Rugs',
      fabricType: 'Pit-Loomed Cotton',
      price: 24000,
      unit: 'per unit',
      badge: 'Master Weaver Craft',
      description: 'Flat-woven by master weavers in Bhujodi on traditional pit looms using organic indigenous cotton and sheep wool.',
      colors: [{ name: 'Indigo & Terracotta', hex: '#41567F' }],
      images: [mittiCraft, U8],
      specs: { Origin: 'Bhujodi, Kutch', Technique: 'Pit-Loom Flatweave', Dimensions: '5 ft x 8 ft (Custom Available)', Care: 'Professional Rug Clean' }
    },
    {
      id: 'rugs-jaipur-hand-knotted',
      name: 'Jaipur Rugs Artisan Wool Knotted Carpet',
      curtainType: 'Carpets',
      fabricType: 'Hand-Spun Wool',
      price: 58000,
      unit: 'per unit',
      badge: 'Hand Knotted',
      description: 'High knot-count virgin wool carpet crafted in Rajasthan, offering rich underfoot texture and generational durability.',
      colors: [{ name: 'Terracotta Rust', hex: '#B4592F' }, { name: 'Chalk Cream', hex: '#EFE9DD' }],
      images: [U8, mittiCraft],
      specs: { Brand: 'Jaipur Rugs Collection', KnotDensity: '120 Knots per sq. inch', Dimensions: '6 ft x 9 ft', PileHeight: '12 mm Soft Plush' }
    }
  ],
  'Mattresses': [
    {
      id: 'mattress-king-koil-ortho',
      name: 'King Koil World Luxury Orthopedic Spine-Guard',
      curtainType: 'Hybrid Pocket Spring',
      fabricType: 'Organic Cotton Quilted',
      price: 54000,
      unit: 'per unit',
      badge: 'Doctor Recommended',
      description: 'Independently encased 5-zone pocket springs topped with high-density contour foam and breathable natural cotton quilting.',
      colors: [{ name: 'Chalk White & Deep Grey', hex: '#EFE9DD' }],
      images: [U7, U10],
      specs: { Brand: 'King Koil Mattresses', Core: '5-Zone Pocket Springs + Contour Foam', ComfortLevel: 'Medium Firm', Warranty: '10 Years Comprehensive' }
    },
    {
      id: 'mattress-buoninfante-latex',
      name: 'Buoninfante Pure Italian Dunlop Latex Sleep System',
      curtainType: 'Natural Latex',
      fabricType: 'Natural Latex Core',
      price: 72000,
      unit: 'per unit',
      badge: 'Made in Italy',
      description: '100% botanical Dunlop latex with open-cell micro-ventilation, offering pinpoint orthopedic spine alignment with zero partner disturbance.',
      colors: [{ name: 'Pure Ivory Knit', hex: '#F1EDE6' }],
      images: [U13, U7],
      specs: { Brand: 'Buoninfante Mattresses', Core: '100% Natural Dunlop Latex', Firmness: 'Adaptive Ergonomic', Certification: 'OEKO-TEX Standard 100' }
    }
  ]
};

// Fallback lookup functions
export function getProductsByCategory(category) {
  return PRODUCTS[category] || [];
}

export function findProduct(productId) {
  for (const category of CATEGORIES) {
    const match = (PRODUCTS[category] || []).find(p => p.id === productId);
    if (match) return { ...match, category };
  }
  return null;
}
