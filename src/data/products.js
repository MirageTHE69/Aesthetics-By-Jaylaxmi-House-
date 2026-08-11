import aiChair from '../assets/ai-chair.jpg';
import aiKitchen from '../assets/ai-kitchen.jpg';
import aiShelves from '../assets/ai-shelves.jpg';
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
const U13 = 'https://images.unsplash.com/photo-1528458909336-e7a0adfed0a5?w=1600&q=80';

export const CATEGORIES = [
  'Curtains',
  'Upholstery Fabrics',
  'Wallpapers',
  'Blinds',
  'Wooden Flooring',
  'Home Linen',
  'Mattresses',
  'Rugs & Carpets'
];

export const CATEGORY_META = {
  'Curtains': {
    eyebrow: 'MADE-TO-MEASURE DRAPERY',
    heading: 'Light, framed by hand.',
    description: 'Sheers, blackouts and heavy drapes — engineered to the exact drop and width of your window, then hand-finished in our Vadodara workshop.',
    hero: U1,
    studioCount: 42
  },
  'Upholstery Fabrics': {
    eyebrow: 'SOFAS, CHAIRS & BANQUETTES',
    heading: 'Fabric that earns a decade of use.',
    description: 'Heavy-duty weaves built for daily life — bouclé, herringbone and cotton-blends rated for high-traffic upholstery, sold by the metre or fully railroaded.',
    hero: U2,
    studioCount: 68
  },
  'Wallpapers': {
    eyebrow: 'WALLS & FEATURE PANELS',
    heading: 'Pattern, considered quietly.',
    description: 'Hand-block prints, ikat-inspired grids and textured linen-looks, printed to order and trimmed on-site by our installation team.',
    hero: U3,
    studioCount: 120
  },
  'Blinds': {
    eyebrow: 'ROMAN, ROLLER & VENETIAN',
    heading: 'Light control, tailored.',
    description: 'Roman, bamboo, sheer roller and slatted linen blinds — every mechanism measured and fitted for your exact window recess.',
    hero: U4,
    studioCount: 24
  },
  'Wooden Flooring': {
    eyebrow: 'ENGINEERED & SOLID WOOD',
    heading: 'The ground, warmed.',
    description: 'Oak, walnut and teak in plank and herringbone lay, finished matte or oiled and installed by our own flooring crew.',
    hero: U5,
    studioCount: 18
  },
  'Home Linen': {
    eyebrow: 'BEDDING, THROWS & CUSHIONS',
    heading: 'What the bed remembers.',
    description: 'Cotton percale, mulberry silk and hand block-printed linen sets, cut and stitched in-house for a considered bedroom.',
    hero: U6,
    studioCount: 36
  },
  'Mattresses': {
    eyebrow: 'SLEEP SYSTEMS',
    heading: 'Rest, engineered quietly.',
    description: 'Cotton, coir, latex and pocket-spring builds finished with natural fibre quilting — made to size, including non-standard Indian bed dimensions.',
    hero: U7,
    studioCount: 12
  },
  'Rugs & Carpets': {
    eyebrow: 'HANDWOVEN FLOOR TEXTILES',
    heading: 'Underfoot, storytelling.',
    description: 'Dhurries, wool rugs and jute blends, hand-knotted or flat-woven by weaving families in Bhujodi and Kutch.',
    hero: U8,
    studioCount: 54
  }
};

export const PRODUCTS = {
  'Curtains': [
    {
      id: 'curtains-kharif-sheer',
      name: 'Kharif Sheer',
      price: 3400,
      unit: 'per metre',
      description: 'A raw slub-cotton sheer that softens midday light without dimming a room. Named for the kharif harvest season, it hangs with a natural, unlined drop.',
      colors: [{ name: 'Kharif Sand', hex: '#D9C6A5' }, { name: 'Chalk', hex: '#EFE9DD' }],
      images: [U1, patternSolid],
      specs: { Composition: '100% slub cotton', Width: '140 cm, unlined', Finish: 'Soft matte, natural drape', Care: 'Gentle machine wash, line dry' }
    },
    {
      id: 'curtains-neem-shadow',
      name: 'Neem Shadow',
      price: 5200,
      unit: 'per metre',
      description: 'A heavyweight blackout-lined drape in a deep forest tone, cut for bedrooms and screening rooms that need true dark. Cotton face, triple-woven lining.',
      colors: [{ name: 'Neem', hex: '#33443A' }, { name: 'Iron Ink', hex: '#2B2622' }],
      images: [mittiCurtains, atelierDetail],
      specs: { Composition: '82% cotton, 18% blackout lining', Width: '140 cm, fully lined', Finish: 'Matte, 100% light block', Care: 'Dry clean only' }
    },
    {
      id: 'curtains-ochre-horizon',
      name: 'Ochre Horizon',
      price: 4100,
      unit: 'per metre',
      description: 'Sun-washed ochre linen with a visible slub, woven to catch and hold late-afternoon light. Pairs naturally with our Mitti upholstery range.',
      colors: [{ name: 'Ochre', hex: '#B4832E' }, { name: 'Terracotta', hex: '#B4592F' }],
      images: [U11, patternStripe],
      specs: { Composition: '70% linen, 30% cotton', Width: '140 cm, unlined', Finish: 'Textured slub weave', Care: 'Dry clean recommended' }
    },
    {
      id: 'curtains-indigo-nightfall',
      name: 'Indigo Nightfall',
      price: 4800,
      unit: 'per metre',
      description: 'A room-darkening cotton twill in natural indigo dye, deepest at the fold. A quiet, architectural drape for studies and reading corners.',
      colors: [{ name: 'Indigo', hex: '#41567F' }, { name: 'Ink Navy', hex: '#25303F' }],
      images: [heroLiving, patternSolid],
      specs: { Composition: '100% cotton twill', Width: '140 cm, mid-weight lining', Finish: 'Natural indigo dye wash', Care: 'Dry clean only' }
    }
  ],
  'Upholstery Fabrics': [
    {
      id: 'upholstery-mitti-boucle',
      name: 'Mitti Bouclé',
      price: 4600,
      unit: 'per metre',
      description: 'Our Fabric of the Year 2027 — a handloom cotton-silk bouclé from Bhujodi, rated for heavy sofa and armchair use. Improves with a decade of wear.',
      colors: [{ name: 'Mitti', hex: '#B4592F' }, { name: 'Chalk', hex: '#EFE9DD' }],
      images: [U13, atelierWide],
      specs: { Composition: '62% cotton, 28% silk, 10% linen', Weight: '480 GSM, upholstery grade', Durability: '60,000 Martindale rubs', Care: 'Dry clean; brush weekly' }
    },
    {
      id: 'upholstery-charcoal-weave',
      name: 'Charcoal Weave',
      price: 3200,
      unit: 'per metre',
      description: 'A dense, stain-guarded cotton-poly blend built for family sofas and high-traffic seating. Holds its structure under daily use.',
      colors: [{ name: 'Charcoal', hex: '#2B2A27' }, { name: 'Iron Ink', hex: '#2B2622' }],
      images: [U2, patternHerringbone],
      specs: { Composition: '65% cotton, 35% polyester', Weight: '520 GSM, heavy upholstery', Durability: '75,000 Martindale rubs', Care: 'Stain-guarded, spot clean' }
    },
    {
      id: 'upholstery-sable-herringbone',
      name: 'Sable Herringbone',
      price: 3900,
      unit: 'per metre',
      description: 'A wool-cotton herringbone in a deep sable brown, woven with a raised chevron texture that reads as menswear tailoring for furniture.',
      colors: [{ name: 'Sable', hex: '#4A3A2E' }, { name: 'Kharif Sand', hex: '#D9C6A5' }],
      images: [patternHerringbone, atelierDetail],
      specs: { Composition: '55% wool, 45% cotton', Weight: '495 GSM', Durability: '55,000 Martindale rubs', Care: 'Dry clean only' }
    },
    {
      id: 'upholstery-ivory-boucle',
      name: 'Ivory Bouclé',
      price: 4200,
      unit: 'per metre',
      description: 'A soft, textured ivory bouclé for statement chairs and low benches — the pale counterpart to Mitti, styled here on a rust-toned frame.',
      colors: [{ name: 'Ivory', hex: '#F1EDE6' }, { name: 'Chalk', hex: '#EFE9DD' }],
      images: [mittiSofa, aiChair],
      specs: { Composition: '80% cotton, 20% wool bouclé', Weight: '450 GSM', Durability: '50,000 Martindale rubs', Care: 'Dry clean; brush weekly' }
    }
  ],
  'Wallpapers': [
    {
      id: 'wallpapers-bhujodi-trellis',
      name: 'Bhujodi Trellis',
      price: 5800,
      unit: 'per roll',
      description: 'A hand-block trellis motif adapted from Bhujodi weaving patterns, printed on a paste-the-wall non-woven base.',
      colors: [{ name: 'Terracotta on Chalk', hex: '#B4592F' }, { name: 'Neem on Chalk', hex: '#33443A' }],
      images: [U3, patternGrid],
      specs: { Material: 'Non-woven, paste-the-wall', 'Roll Size': '10m x 53cm', 'Pattern Repeat': '32 cm straight match', Finish: 'Matte' }
    },
    {
      id: 'wallpapers-patan-ikat-grid',
      name: 'Patan Ikat Grid',
      price: 6400,
      unit: 'per roll',
      description: 'A geometric grid inspired by Patan Patola ikat weaving, rendered as a soft checked windowpane in warm rust and cream.',
      colors: [{ name: 'Rust & Cream', hex: '#B4592F' }],
      images: [patternGrid, patternStripe],
      specs: { Material: 'Non-woven, paste-the-wall', 'Roll Size': '10m x 53cm', 'Pattern Repeat': '18 cm half-drop', Finish: 'Matte' }
    },
    {
      id: 'wallpapers-monsoon-leaf',
      name: 'Monsoon Leaf',
      price: 5200,
      unit: 'per roll',
      description: 'A soft, watercolour-washed botanical stripe in muted sage and sand — a quiet pattern for bedrooms and reading nooks.',
      colors: [{ name: 'Sage & Sand', hex: '#6B7A6E' }],
      images: [patternStripe, U11],
      specs: { Material: 'Non-woven, paste-the-wall', 'Roll Size': '10m x 53cm', 'Pattern Repeat': '24 cm straight match', Finish: 'Matte, subtle sheen' }
    },
    {
      id: 'wallpapers-chalk-linen-weave',
      name: 'Chalk Linen Weave',
      price: 4700,
      unit: 'per roll',
      description: 'A textured, linen-look plain wallpaper for anchoring a room without competing with drapery or upholstery patterns.',
      colors: [{ name: 'Chalk', hex: '#EFE9DD' }, { name: 'Kharif Sand', hex: '#D9C6A5' }],
      images: [U11, heroLiving],
      specs: { Material: 'Non-woven, paste-the-wall', 'Roll Size': '10m x 53cm', 'Pattern Repeat': 'No repeat, textured plain', Finish: 'Matte, linen texture' }
    }
  ],
  'Blinds': [
    {
      id: 'blinds-raw-cotton-roman',
      name: 'Raw Cotton Roman Blind',
      price: 1450,
      unit: 'per sq.ft',
      description: 'A structured roman fold in raw cotton, made to measure for your recess. Shown here in terracotta over a farmhouse kitchen window.',
      colors: [{ name: 'Terracotta', hex: '#B4592F' }, { name: 'Kharif Sand', hex: '#D9C6A5' }],
      images: [U4, patternStripe],
      specs: { Material: '100% raw cotton', 'Mount Type': 'Inside or outside recess', 'Light Control': 'Semi-sheer to blackout lining', Care: 'Dry clean; spot wipe rail' }
    },
    {
      id: 'blinds-bamboo-slat',
      name: 'Bamboo Slat Blind',
      price: 980,
      unit: 'per sq.ft',
      description: 'Natural bamboo slats for kitchens and sunrooms, filtering light into warm horizontal bands.',
      colors: [{ name: 'Natural Bamboo', hex: '#C9A660' }],
      images: [mittiKitchen, atelierDetail],
      specs: { Material: 'Natural bamboo slat', 'Mount Type': 'Inside recess', 'Light Control': 'Filtered, semi-privacy', Care: 'Dry dust, avoid direct water' }
    },
    {
      id: 'blinds-sheer-voile-roller',
      name: 'Sheer Voile Roller Blind',
      price: 1150,
      unit: 'per sq.ft',
      description: 'A fine voile roller shade that diffuses harsh sun without losing the view — ideal for living rooms and studies.',
      colors: [{ name: 'Chalk', hex: '#EFE9DD' }, { name: 'Kharif Sand', hex: '#D9C6A5' }],
      images: [aiShelves, heroLiving],
      specs: { Material: '100% polyester voile', 'Mount Type': 'Inside or outside recess', 'Light Control': 'Sheer, daytime privacy', Care: 'Wipe clean, spot wash' }
    },
    {
      id: 'blinds-linen-venetian',
      name: 'Linen Venetian Blind',
      price: 1850,
      unit: 'per sq.ft',
      description: 'Linen-wrapped wooden slats with a cord-tilt mechanism, engineered for exact recess fit and quiet operation.',
      colors: [{ name: 'Sable', hex: '#4A3A2E' }, { name: 'Chalk', hex: '#EFE9DD' }],
      images: [atelierDetail, U10],
      specs: { Material: 'Linen-wrapped basswood slat', 'Mount Type': 'Inside recess', 'Light Control': 'Adjustable tilt, full block', Care: 'Dry dust; spot wipe' }
    }
  ],
  'Wooden Flooring': [
    {
      id: 'flooring-golden-oak-plank',
      name: 'Golden Oak Engineered Plank',
      price: 380,
      unit: 'per sq.ft',
      description: 'A wide-plank engineered oak with a warm honey finish, stable across Indian humidity swings.',
      colors: [{ name: 'Golden Oak', hex: '#C9A660' }],
      images: [U5, heroLiving],
      specs: { Species: 'European oak, engineered', 'Plank Size': '190 x 1900 mm', Finish: 'Matte lacquer', Installation: 'Floating or glue-down' }
    },
    {
      id: 'flooring-smoked-walnut-herringbone',
      name: 'Smoked Walnut Herringbone',
      price: 520,
      unit: 'per sq.ft',
      description: 'Deep smoked walnut laid in a classic herringbone pattern, for living rooms that want quiet drama underfoot.',
      colors: [{ name: 'Smoked Walnut', hex: '#4A3A2E' }],
      images: [aiKitchen, patternHerringbone],
      specs: { Species: 'American walnut, engineered', 'Plank Size': '90 x 450 mm herringbone', Finish: 'Oiled, low-sheen', Installation: 'Glue-down parquet' }
    },
    {
      id: 'flooring-weathered-teak-wide-plank',
      name: 'Weathered Teak Wide Plank',
      price: 460,
      unit: 'per sq.ft',
      description: 'Solid teak with a hand-distressed, weathered surface — sourced and finished by our own flooring artisans.',
      colors: [{ name: 'Weathered Teak', hex: '#8A6A4A' }],
      images: [heroLiving, atelierWide],
      specs: { Species: 'Solid teak', 'Plank Size': '150 x 1200 mm', Finish: 'Hand-distressed, oiled', Installation: 'Nail-down or glue-down' }
    },
    {
      id: 'flooring-ash-grey-matte',
      name: 'Ash Grey Matte Finish',
      price: 340,
      unit: 'per sq.ft',
      description: 'A cool, contemporary ash-grey engineered plank for minimalist interiors and studio apartments.',
      colors: [{ name: 'Ash Grey', hex: '#8C8880' }],
      images: [aiShelves, U5],
      specs: { Species: 'European oak, grey-washed', 'Plank Size': '190 x 1900 mm', Finish: 'Matte, low-sheen', Installation: 'Floating or glue-down' }
    }
  ],
  'Home Linen': [
    {
      id: 'linen-kutch-cotton-bedding',
      name: 'Kutch Cotton Bedding Set',
      price: 6800,
      unit: 'per set',
      description: 'A 300-thread-count cotton percale set, hand block-printed in Kutch — includes fitted sheet, flat sheet and two pillowcases.',
      colors: [{ name: 'Kharif Sand', hex: '#D9C6A5' }, { name: 'Terracotta', hex: '#B4592F' }],
      images: [U6, heroLiving],
      specs: { Composition: '100% cotton percale, 300 TC', Set: 'Fitted + flat sheet, 2 pillowcases', Finish: 'Hand block-printed', Care: 'Machine wash cold' }
    },
    {
      id: 'linen-mulberry-silk-pillow',
      name: 'Mulberry Silk Pillow Set',
      price: 9200,
      unit: 'per set',
      description: 'Pure mulberry silk pillowcases in a set of two, finished with a hand-rolled hem.',
      colors: [{ name: 'Chalk', hex: '#EFE9DD' }, { name: 'Ochre', hex: '#B4832E' }],
      images: [aiChair, patternSolid],
      specs: { Composition: '100% mulberry silk, 22 momme', Set: '2 pillowcases', Finish: 'Hand-rolled hem', Care: 'Dry clean or gentle hand wash' }
    },
    {
      id: 'linen-sand-linen-duvet',
      name: 'Sand Linen Duvet Set',
      price: 8400,
      unit: 'per set',
      description: 'Stonewashed European linen in a warm sand tone, softening with every wash. Includes duvet cover and two shams.',
      colors: [{ name: 'Kharif Sand', hex: '#D9C6A5' }, { name: 'Neem', hex: '#33443A' }],
      images: [patternSolid, U10],
      specs: { Composition: '100% stonewashed linen', Set: 'Duvet cover + 2 shams', Finish: 'Pre-washed, softened', Care: 'Machine wash cold, tumble dry low' }
    },
    {
      id: 'linen-block-print-quilt',
      name: 'Block-Print Quilt Set',
      price: 7600,
      unit: 'per set',
      description: 'A lightly quilted cotton throw and pillow set, hand block-printed in a Bhujodi-inspired trellis motif.',
      colors: [{ name: 'Terracotta on Chalk', hex: '#B4592F' }],
      images: [patternGrid, atelierDetail],
      specs: { Composition: '100% cotton, cotton-fill quilting', Set: 'Quilt + 2 cushion covers', Finish: 'Hand block-printed', Care: 'Machine wash gentle cycle' }
    }
  ],
  'Mattresses': [
    {
      id: 'mattress-cloud-cotton-memory',
      name: 'Cloud Cotton Memory Mattress',
      price: 42000,
      unit: 'each',
      description: 'A medium-soft memory foam core wrapped in natural cotton quilting, for side and back sleepers.',
      colors: [{ name: 'Chalk', hex: '#EFE9DD' }],
      images: [U7, U13],
      specs: { Firmness: 'Medium-soft', 'Size Options': 'Single, Queen, King, Custom', Layers: 'Memory foam + cotton quilt top', Warranty: '10 years' }
    },
    {
      id: 'mattress-coir-classic-orthopedic',
      name: 'Coir Classic Orthopedic Mattress',
      price: 28000,
      unit: 'each',
      description: 'A firm coir and rubberised-latex build for back support, finished with a breathable cotton cover.',
      colors: [{ name: 'Chalk', hex: '#EFE9DD' }],
      images: [U10, atelierDetail],
      specs: { Firmness: 'Firm', 'Size Options': 'Single, Queen, King, Custom', Layers: 'Coir + rubberised latex', Warranty: '7 years' }
    },
    {
      id: 'mattress-latex-bloom',
      name: 'Latex Bloom Mattress',
      price: 54000,
      unit: 'each',
      description: 'Natural Dunlop latex layered for pressure relief with a plush, breathable knit cover.',
      colors: [{ name: 'Ivory', hex: '#F1EDE6' }],
      images: [aiChair, U7],
      specs: { Firmness: 'Medium', 'Size Options': 'Queen, King, Custom', Layers: 'Natural latex + breathable knit', Warranty: '12 years' }
    },
    {
      id: 'mattress-hybrid-pocket-spring',
      name: 'Hybrid Pocket Spring Mattress',
      price: 68000,
      unit: 'each',
      description: 'Individually wrapped pocket springs beneath a natural fibre and foam comfort layer, for minimal partner disturbance.',
      colors: [{ name: 'Chalk', hex: '#EFE9DD' }],
      images: [atelierWide, U10],
      specs: { Firmness: 'Medium-firm', 'Size Options': 'Queen, King, Custom', Layers: 'Pocket springs + foam + fibre top', Warranty: '10 years' }
    }
  ],
  'Rugs & Carpets': [
    {
      id: 'rugs-bhujodi-handwoven-dhurrie',
      name: 'Bhujodi Handwoven Dhurrie',
      price: 22000,
      unit: 'each',
      description: 'A flat-woven cotton-wool dhurrie made on a pit loom in Bhujodi, in the indigo and rust tones of the region.',
      colors: [{ name: 'Indigo & Rust', hex: '#41567F' }],
      images: [mittiCraft, U8],
      specs: { Material: 'Cotton-wool blend', Weave: 'Flat-woven, pit loom', 'Pile Height': 'Flat, no pile', Care: 'Vacuum, professional wash' }
    },
    {
      id: 'rugs-kutch-wool-rug',
      name: 'Kutch Wool Rug',
      price: 34000,
      unit: 'each',
      description: 'A hand-knotted wool rug in deep terracotta, dense enough to anchor a full living room seating group.',
      colors: [{ name: 'Terracotta', hex: '#B4592F' }],
      images: [U8, mittiCraft],
      specs: { Material: '100% hand-spun wool', Weave: 'Hand-knotted', 'Pile Height': '12 mm', Care: 'Professional wash only' }
    },
    {
      id: 'rugs-jute-cotton-blend',
      name: 'Jute & Cotton Blend Rug',
      price: 18500,
      unit: 'each',
      description: 'A durable jute-cotton blend rug with a herringbone weave, suited to high-traffic hallways and dining rooms.',
      colors: [{ name: 'Kharif Sand', hex: '#D9C6A5' }],
      images: [patternHerringbone, mittiSofa],
      specs: { Material: 'Jute-cotton blend', Weave: 'Herringbone, flat-woven', 'Pile Height': 'Flat, low pile', Care: 'Vacuum regularly, spot clean' }
    },
    {
      id: 'rugs-silk-touch-persian-knot',
      name: 'Silk-Touch Persian Knot Rug',
      price: 52000,
      unit: 'each',
      description: 'A fine wool-and-silk-blend rug hand-knotted in a traditional Persian pattern, for formal living and dining rooms.',
      colors: [{ name: 'Chalk & Rust', hex: '#B4592F' }],
      images: [mittiSofa, patternSolid],
      specs: { Material: 'Wool with silk highlights', Weave: 'Hand-knotted', 'Pile Height': '8 mm', Care: 'Professional wash only' }
    }
  ]
};

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
