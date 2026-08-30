const FLEET_DATA = [
  // ================= SCOOTY CATEGORY =================
  {
    id: "v-honda-activa-6g",
    name: "Honda Activa 6G 110cc",
    category: "scooty",
    categoryLabel: "Scooty / Gearless Scooter",
    image: "images/honda_activa.jpg",
    pricePerHour: 49,
    pricePerDay: 299,
    rating: 4.89,
    reviewsCount: 420,
    transmission: "Automatic CVTi",
    fuelType: "Petrol 110cc",
    seats: 2,
    horsepower: "7.8 bhp",
    baggage: "Underseat Storage",
    deposit: 500,
    featured: true,
    tag: "Most Popular Indian Scooty",
    specs: {
      engine: "109.51 cc PGM-FI Engine",
      mileage: "50 kmpl",
      brakes: "Combi Brake System (CBS)",
      start: "Silent Start with ACG"
    },
    features: [
      "Telescopic Front Suspension",
      "Engine Start/Stop Switch",
      "12-Inch Front Wheel for Smooth Ride",
      "External Fuel Fill Cap",
      "Helmet Included"
    ]
  },
  {
    id: "v-tvs-ntorq-125",
    name: "TVS Ntorq 125 Race Edition",
    category: "scooty",
    categoryLabel: "Sporty Scooty",
    image: "images/tvs_ntorq.jpg",
    pricePerHour: 59,
    pricePerDay: 399,
    rating: 4.91,
    reviewsCount: 310,
    transmission: "Automatic",
    fuelType: "Petrol 125cc",
    seats: 2,
    horsepower: "9.38 bhp",
    baggage: "22L Storage + USB",
    deposit: 500,
    featured: true,
    tag: "Sporty Performance Scooty",
    specs: {
      engine: "124.8 cc 3-Valve Engine",
      display: "Bluetooth SmartXonnect Digital Speedo",
      lighting: "Signature T-LED Headlamp",
      brakes: "Front Petal Disc Brake"
    },
    features: [
      "Bluetooth Navigation & Call Alerts",
      "USB Phone Charging Port in Boot",
      "Dual Steering Mode & Lap Timer",
      "Sporty Exhaust Note",
      "Helmets Included"
    ]
  },
  {
    id: "v-suzuki-access-125",
    name: "Suzuki Access 125 Ride Connect",
    category: "scooty",
    categoryLabel: "Comfort Scooty",
    image: "images/suzuki_access.jpg",
    pricePerHour: 55,
    pricePerDay: 349,
    rating: 4.88,
    reviewsCount: 240,
    transmission: "Automatic CVT",
    fuelType: "Petrol 124cc",
    seats: 2,
    horsepower: "8.7 bhp",
    baggage: "21.8L Storage",
    deposit: 500,
    featured: false,
    tag: "Top Comfort Scooty",
    specs: {
      engine: "124 cc SEP FI Engine",
      mileage: "48 kmpl",
      display: "Bluetooth Digital Speedometer"
    },
    features: [
      "Bluetooth Turn-by-Turn Navigation",
      "LED Position Lights & Headlamp",
      "Front USB Charging Socket",
      "Central Locking & Shutter Key"
    ]
  },
  {
    id: "v-tvs-jupiter-125",
    name: "TVS Jupiter 125 SmartXonnect",
    category: "scooty",
    categoryLabel: "Family Scooty",
    image: "images/tvs_jupiter.jpg",
    pricePerHour: 52,
    pricePerDay: 329,
    rating: 4.86,
    reviewsCount: 210,
    transmission: "Automatic",
    fuelType: "Petrol 124.8cc",
    seats: 2,
    horsepower: "8.15 bhp",
    baggage: "33L Extra Large Boot",
    deposit: 500,
    featured: false,
    tag: "Best Family Scooty",
    specs: {
      engine: "124.8 cc Air-Cooled Engine",
      mileage: "50 kmpl",
      brakes: "Synchronized Braking System"
    },
    features: [
      "Largest 33L Underseat Boot Space",
      "Front External Fuel Filling",
      "Longest Cushion Dual Seat",
      "Body Balance Technology"
    ]
  },

  // ================= BIKE CATEGORY =================
  {
    id: "v-hero-xtreme-160r",
    name: "Hero Xtreme 160R 4V Dual ABS",
    category: "bike",
    categoryLabel: "Street Fighter Bike",
    image: "images/hero_xtreme_bike.jpg",
    pricePerHour: 79,
    pricePerDay: 499,
    rating: 4.87,
    reviewsCount: 280,
    transmission: "5-Speed Manual",
    fuelType: "Petrol 163cc",
    seats: 2,
    horsepower: "16.9 bhp",
    baggage: "Underseat USB Charger",
    deposit: 800,
    featured: true,
    tag: "Popular Streetfighter Bike",
    specs: {
      engine: "163 cc 4-Valve Oil Cooled Engine",
      cooling: "Oil Cooling System",
      suspension: "KYB Inverted USD Front Forks"
    },
    features: [
      "KYB USD Front Telescopic Forks",
      "Dual Channel ABS Braking",
      "Full Digital Speedometer with Bluetooth",
      "Aggressive Streetfighter Styling"
    ]
  },
  {
    id: "v-royal-enfield-350",
    name: "Royal Enfield Classic 350 Reborn",
    category: "bike",
    categoryLabel: "Cruiser Bike",
    image: "images/royal_enfield_classic.jpg",
    pricePerHour: 99,
    pricePerDay: 699,
    rating: 4.95,
    reviewsCount: 540,
    transmission: "5-Speed Manual",
    fuelType: "Petrol 349cc",
    seats: 2,
    horsepower: "20.2 bhp / 27 Nm",
    baggage: "Side Pannier Mounts",
    deposit: 1000,
    featured: true,
    tag: "Iconic Indian Cruiser Bike",
    specs: {
      engine: "J-Series 349cc Air-Oil Cooled Engine",
      brakes: "Dual Channel ABS Disc Brakes",
      cluster: "LCD Digital-Analogue Cluster with Tripper Navigation"
    },
    features: [
      "Signature Royal Enfield Exhaust Thump",
      "Dual-Channel ABS Safety",
      "Comfortable Touring Dual Seat",
      "Tripper Turn-by-Turn Navigation Pod",
      "2 Helmets Included"
    ]
  },
  {
    id: "v-yamaha-r15",
    name: "Yamaha R15 V4 Racing Blue",
    category: "bike",
    categoryLabel: "Track SuperSport Bike",
    image: "images/yamaha_r15.jpg",
    pricePerHour: 119,
    pricePerDay: 799,
    rating: 4.90,
    reviewsCount: 290,
    transmission: "6-Speed Quickshifter",
    fuelType: "Petrol 155cc VVA",
    seats: 2,
    horsepower: "18.4 bhp",
    baggage: "Saddlebag Friendly",
    deposit: 1500,
    featured: false,
    tag: "Aerodynamic Racing Bike",
    specs: {
      engine: "155 cc Liquid Cooled 4-Valve VVA Engine",
      clutch: "Assist & Slipper Clutch",
      brakes: "Dual Channel ABS"
    },
    features: [
      "Variable Valve Actuation (VVA) Powerband",
      "Traction Control System (TCS)",
      "Upside Down (USD) Front Forks",
      "Track & Street Riding Modes"
    ]
  },
  {
    id: "v-ktm-duke-390",
    name: "KTM Duke 390 ABS",
    category: "bike",
    categoryLabel: "Naked Sport Bike",
    image: "images/ktm_duke_390.jpg",
    pricePerHour: 149,
    pricePerDay: 999,
    rating: 4.93,
    reviewsCount: 380,
    transmission: "6-Speed Manual",
    fuelType: "Petrol 373cc",
    seats: 2,
    horsepower: "43.5 bhp",
    baggage: "Compact Tail Mount",
    deposit: 2000,
    featured: true,
    tag: "High Performance Sport Bike",
    specs: {
      engine: "373.2 cc Liquid-Cooled DOHC Engine",
      quickshifter: "Bi-Directional Quickshifter+",
      display: "TFT Color Display with Bluetooth"
    },
    features: [
      "Cornering ABS & Traction Control",
      "Ride-by-Wire Throttle Control",
      "WP APEX Adjustable Suspension",
      "Full LED Split Headlamp"
    ]
  },

  // ================= CARS CATEGORY =================
  {
    id: "v-tata-nexon-ev",
    name: "Tata Nexon EV Max Empress",
    category: "cars",
    categoryLabel: "Electric SUV Car",
    image: "images/tata_nexon_ev.jpg",
    pricePerHour: 349,
    pricePerDay: 2199,
    rating: 4.88,
    reviewsCount: 184,
    transmission: "Automatic Single-Speed",
    fuelType: "Electric",
    seats: 5,
    rangeKm: 453,
    zeroToHundredSec: "8.9s",
    baggage: "4 Bags",
    deposit: 2000,
    featured: true,
    tag: "Best Selling Indian EV Car",
    specs: {
      battery: "40.5 kWh High Density Battery",
      fastCharging: "50 kW DC Fast Charging (10-80% in 56 mins)",
      safety: "5-Star Global NCAP Rating"
    },
    features: [
      "Multi-Mode Regenerative Braking",
      "Wireless Smartphone Charger",
      "Air Purifier with AQI Display",
      "Ventilated Front Leatherette Seats",
      "10.25\" HD Touchscreen Audio"
    ]
  },
  {
    id: "v-hyundai-creta",
    name: "Hyundai Creta SX (O) Turbo",
    category: "cars",
    categoryLabel: "Executive Crossover Car",
    image: "images/hyundai_creta.jpg",
    pricePerHour: 299,
    pricePerDay: 1899,
    rating: 4.86,
    reviewsCount: 310,
    transmission: "7-Speed DCT",
    fuelType: "Petrol Turbo",
    seats: 5,
    horsepower: "158 bhp",
    baggage: "4 Bags",
    deposit: 2000,
    featured: true,
    tag: "Most Popular Family Car",
    specs: {
      sunroof: "Voice-Enabled Panoramic Sunroof",
      audio: "Bose Premium 8-Speaker Sound",
      adas: "Level 2 ADAS Autonomous Safety"
    },
    features: [
      "Panoramic Sunroof",
      "10.25\" Dual Curved Screens",
      "360 Degree View Camera",
      "Bose 8-Speaker Premium Sound",
      "Doorstep Delivery Anywhere in City"
    ]
  },
  {
    id: "v-toyota-fortuner",
    name: "Toyota Fortuner Legender 4x4",
    category: "cars",
    categoryLabel: "Luxury 7-Seater SUV Car",
    image: "images/toyota_fortuner_legender.jpg",
    pricePerHour: 999,
    pricePerDay: 4999,
    rating: 4.96,
    reviewsCount: 175,
    transmission: "6-Speed Automatic",
    fuelType: "2.8L Diesel",
    seats: 7,
    horsepower: "201 bhp / 500 Nm",
    baggage: "6 Bags",
    deposit: 5000,
    featured: true,
    tag: "VIP Executive SUV Car",
    specs: {
      drivetrain: "Sigma 4WD System",
      seating: "Dual Tone Perforated Leather",
      tailgate: "Kick Sensor Power Tailgate"
    },
    features: [
      "JBL 11 Speaker Premium Audio",
      "Sequential LED Turn Indicators",
      "Wireless Phone Charging",
      "Electronic Differential Lock",
      "Chauffeur or Self Drive Option"
    ]
  },
  {
    id: "v-hyundai-i10-nios",
    name: "Hyundai Grand i10 Nios Sportz",
    category: "cars",
    categoryLabel: "Premium Hatchback Car",
    image: "images/hyundai_i10_nios.jpg",
    pricePerHour: 199,
    pricePerDay: 1299,
    rating: 4.85,
    reviewsCount: 350,
    transmission: "Automatic AMT",
    fuelType: "Petrol 1.2L Kappa",
    seats: 5,
    horsepower: "83 bhp",
    baggage: "3 Bags",
    deposit: 1500,
    featured: false,
    tag: "Best City Hatchback Car",
    specs: {
      engine: "1.2L Kappa Petrol Engine",
      mileage: "21 kmpl",
      infotainment: "8\" Touchscreen with Apple CarPlay"
    },
    features: [
      "Automatic Climate Control",
      "Rear AC Vents & USB Charger",
      "Wireless Apple CarPlay & Android Auto",
      "LED Projector Headlamps & DRLs"
    ]
  }
];

const PROTECTION_PLANS = [
  {
    id: "basic",
    name: "Standard Protection",
    pricePerDay: 0,
    pricePerHour: 0,
    deductible: "₹5,000 Deductible",
    description: "Standard insurance coverage included in rental price. Mandatory security deposit applies.",
    features: [
      "Third-party liability protection",
      "Collision damage waiver (₹5,000 max excess)",
      "24/7 basic roadside assistance"
    ]
  },
  {
    id: "premium",
    name: "Zero Liability (Recommended)",
    pricePerDay: 399,
    pricePerHour: 49,
    deductible: "₹0 Deductible",
    description: "Complete peace of mind. Zero deductible for scratches, windshield, and tire damage.",
    features: [
      "Zero Excess / ₹0 Security Deposit",
      "Full Glass, Tire & Paint Damage Coverage",
      "Personal Luggage Insurance up to ₹25,000",
      "Priority 24/7 Roadside Towing & Rescue"
    ]
  }
];

const RENTAL_ADDONS = [
  {
    id: "doorstep",
    name: "Doorstep Vehicle Delivery & Return",
    price: 0,
    type: "flat",
    icon: "home_pin",
    description: "We deliver the vehicle straight to your address & pick it up when done (100% Free)."
  },
  {
    id: "gps",
    name: "Satellite GPS & Fastag Fast-Pass",
    price: 0,
    type: "per_day",
    icon: "explore",
    description: "Preloaded Fastag for seamless toll booths & offline satellite maps (100% Free)."
  },
  {
    id: "helmet",
    name: "DOT/ISI Certified Rider Helmet",
    price: 49,
    type: "per_day",
    icon: "sports_motorsports",
    description: "Clean, sanitized high-grade DOT/ISI certified safety helmet."
  },
  {
    id: "child_seat",
    name: "ISOFIX Child Safety Seat",
    price: 199,
    type: "per_day",
    icon: "child_care",
    description: "Sanitized safety seat suited for infants and toddlers up to 36kg."
  },
  {
    id: "extra_driver",
    name: "Additional Registered Driver",
    price: 299,
    type: "flat",
    icon: "person_add",
    description: "Allow a second verified driver to share steering duty."
  }
];

const PROMO_COUPONS = {
  "FIRST500": { discount: 500, type: "flat", label: "₹500 Off First Booking" },
  "DRIVEX20": { discount: 0.20, type: "percent", label: "20% Discount (DriveX Offer)" },
  "DRIVENA20": { discount: 0.20, type: "percent", label: "20% Discount" },
  "FREEDELIVERY": { discount: 499, type: "flat", targetAddon: "doorstep", label: "Free Doorstep Delivery" }
};
