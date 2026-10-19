// Single source of truth for every service: the nav dropdown, the home page
// showcase and the /services page all read from here.

export type ServiceGroup = "Interiors" | "Joinery & Craft" | "Site Services";

export type Service = {
  slug: string;
  title: string;
  group: ServiceGroup;
  short: string;
  description: string;
  features: readonly string[];
  image: string | null;
  imageAlt: string;
};

export const SERVICE_GROUPS: readonly ServiceGroup[] = ["Interiors", "Joinery & Craft", "Site Services"];

export const SERVICES: readonly Service[] = [
  {
    slug: "residential",
    title: "Residential Interiors",
    group: "Interiors",
    short: "Apartments, villas and independent homes, designed and delivered end to end.",
    description:
      "Complete home interiors for apartments, villas and farmhouses — space planning, joinery, lighting and finishes handled by one accountable team from first drawing to handover.",
    features: ["Space planning & 3D design", "Living, dining & bedrooms", "Lighting & décor direction", "Turnkey handover"],
    image: "/images/curated/svc-residential.jpg",
    imageAlt: "Bright living and dining space with oak joinery, textured feature walls and warm cove lighting",
  },
  {
    slug: "commercial",
    title: "Commercial & Office",
    group: "Interiors",
    short: "Workplaces, studios and experience centres with presence.",
    description:
      "Offices, GCC fit-outs, showrooms and experience centres — glass partitions, acoustic walls, storage and lighting planned around how your team actually works.",
    features: ["Office & GCC fit-outs", "Glass partitions", "Reception & lounges", "Retail & showrooms"],
    image: "/images/curated/svc-commercial.jpg",
    imageAlt: "Office cabin with grey wall panelling, concealed door and marble floor",
  },
  {
    slug: "healthcare-hospitality",
    title: "Healthcare & Hospitality",
    group: "Interiors",
    short: "Clinics, hospitals, cafés and boutique hotels.",
    description:
      "Hygienic, easy-to-maintain clinical spaces and warm, memorable hospitality interiors — receptions, consultation suites, patient rooms, restaurants and guest rooms.",
    features: ["Clinics & hospitals", "Reception lobbies", "Restaurants & cafés", "Hotels & guest rooms"],
    image: null,
    imageAlt: "",
  },
  {
    slug: "renovation",
    title: "Renovation & Remodelling",
    group: "Interiors",
    short: "Fresh layouts and finishes for the home you already love.",
    description:
      "Full or partial makeovers — layout changes, new finishes, kitchens and bathrooms upgraded with minimum disruption to your routine.",
    features: ["Full-home makeovers", "Layout changes", "Finish upgrades", "Kitchen & bath remodels"],
    image: "/images/curated/svc-renovation.jpg",
    imageAlt: "Renovated living space with brass-framed partition, oak storage and layered ceiling lighting",
  },
  {
    slug: "modular-kitchen",
    title: "Modular Kitchens",
    group: "Joinery & Craft",
    short: "Kitchens that cook well, clean easily and look calm.",
    description:
      "L-shaped, parallel and island kitchens with soft-close hardware, glass-front wall units, under-cabinet lighting and durable worktops.",
    features: ["L, parallel & island layouts", "Soft-close hardware", "Glass-front wall units", "Under-cabinet lighting"],
    image: "/images/curated/svc-kitchen.jpg",
    imageAlt: "Modular kitchen with teak open shelves, fluted breakfast counter and lit wall units",
  },
  {
    slug: "wardrobes",
    title: "Wardrobes & Storage",
    group: "Joinery & Craft",
    short: "Made-to-measure wardrobes, study units and storage walls.",
    description:
      "Floor-to-ceiling wardrobes, lofts, study desks and window seats — built to the millimetre in our own workshop with finishes chosen for your room.",
    features: ["Hinged & sliding wardrobes", "Lofts & storage walls", "Study units", "Window seats"],
    image: "/images/curated/svc-wardrobe.jpg",
    imageAlt: "Ivory and sage wardrobe with arched shutter detail, lit display niche and study desk",
  },
  {
    slug: "pooja-units",
    title: "Pooja Units",
    group: "Joinery & Craft",
    short: "Sacred spaces crafted with care.",
    description:
      "Pooja rooms and mandir units with carved panels, brass inlays, bells and soft lighting — designed to Vastu and made by hand.",
    features: ["Pooja rooms & mandirs", "Brass inlay panels", "Vastu-aligned planning", "Soft devotional lighting"],
    image: "/images/curated/svc-pooja.jpg",
    imageAlt: "Teak pooja doors with brass deity inlays and lit bell niches",
  },
  {
    slug: "painting",
    title: "Painting",
    group: "Site Services",
    short: "Interior painting, textures and hand-painted wall art.",
    description:
      "Premium wall and ceiling painting, putty and POP punning, texture finishes and hand-painted murals — with proper surface preparation and protection of your floors and furniture.",
    features: ["Premium wall painting", "Putty & POP punning", "Texture finishes", "Hand-painted murals"],
    image: "/images/curated/svc-painting.jpg",
    imageAlt: "Hand-painted watercolour mural on a cabinet wall",
  },
  {
    slug: "civil-work",
    title: "Civil Work",
    group: "Site Services",
    short: "Walls, flooring, tiling and structural changes.",
    description:
      "New walls and demolition, floor and wall tiling, elevation cladding, waterproofing and debris removal — executed by our own supervised site team.",
    features: ["Wall creation & demolition", "Floor & wall tiling", "Elevation cladding", "Waterproofing & debris removal"],
    image: "/images/curated/svc-civil.jpg",
    imageAlt: "Finished marble flooring, stone counters and wall tiling in a renovated space",
  },
  {
    slug: "electrical",
    title: "Electrical",
    group: "Site Services",
    short: "Safe wiring, smart switches and architectural lighting.",
    description:
      "New points and boards, rewiring, profile and cove lighting, shelf lighting, fan, light and AC installation — planned with your furniture layout so every switch is where you need it.",
    features: ["New points & boards", "Rewiring & load planning", "Cove & profile lighting", "Fan, light & AC installation"],
    image: "/images/curated/svc-electrical.jpg",
    imageAlt: "Bedroom with cove lighting, profile lights, ceiling fan and planned switch points",
  },
  {
    slug: "bathroom",
    title: "Bathroom",
    group: "Site Services",
    short: "Vanities, tiling, fittings and shower partitions.",
    description:
      "Complete bathroom makeovers — waterproofing, tiling, vanities, mirrors, sanitaryware, fittings and glass shower partitions.",
    features: ["Vanities & mirrors", "Tiling & waterproofing", "Sanitaryware & fittings", "Glass shower partitions"],
    image: "/images/curated/svc-bathroom.jpg",
    imageAlt: "Floating fluted vanity with vessel basin, stone backsplash and round black mirror",
  },
  {
    slug: "false-ceiling",
    title: "False Ceiling",
    group: "Site Services",
    short: "Gypsum ceilings with cove and profile lighting.",
    description:
      "Gypsum and POP ceilings — layered, curved and coffered designs with integrated cove, spot and profile lighting.",
    features: ["Gypsum & POP ceilings", "Curved & layered designs", "Cove lighting", "Spot & profile lights"],
    image: "/images/curated/svc-ceiling.jpg",
    imageAlt: "Concentric curved gypsum ceiling with warm cove lighting",
  },
];

export const servicesByGroup = (group: ServiceGroup) => SERVICES.filter((s) => s.group === group);
