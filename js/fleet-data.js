const FLEET_DATA = [
  // ==========================================
  // SCOOTY CATEGORY (PETROL & ELECTRIC SCOOTIES)
  // ==========================================
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
  {
    id: "v-ola-s1-pro",
    name: "Ola S1 Pro Gen 2",
    category: "scooty",
    categoryLabel: "Electric Scooty (EV)",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=700&q=80",
    pricePerHour: 69,
    pricePerDay: 449,
    rating: 4.93,
    reviewsCount: 380,
    transmission: "Automatic Single-Speed",
    fuelType: "Electric",
    seats: 2,
    rangeKm: 195,
    horsepower: "11 kW Peak (14.7 bhp)",
    baggage: "34L Boot Space",
    deposit: 600,
    featured: true,
    tag: "Top Selling Indian EV Scooty",
    specs: {
      battery: "4.0 kWh Lithium-ion Pack",
      topSpeed: "120 km/h",
      acceleration: "0-40 km/h in 2.6s",
      charging: "Home Socket Fast Charge (0-100% in 6.5h)"
    },
    features: [
      "195 km Certified True Range",
      "7-Inch Touchscreen with MoveOS 4",
      "Hyper, Sport, Normal & Eco Riding Modes",
      "Cruise Control & Hill Hold Assist",
      "Keyless Smartphone Bluetooth Unlocking"
    ]
  },
  {
    id: "v-ather-450x",
    name: "Ather 450X Gen 3",
    category: "scooty",
    categoryLabel: "Electric Scooty (EV)",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=700&q=80",
    pricePerHour: 69,
    pricePerDay: 449,
    rating: 4.94,
    reviewsCount: 340,
    transmission: "Automatic Belt Drive",
    fuelType: "Electric",
    seats: 2,
    rangeKm: 150,
    horsepower: "6.4 kW Peak (8.7 bhp)",
    baggage: "22L Waterproof Boot",
    deposit: 600,
    featured: true,
    tag: "Performance Electric Scooty",
    specs: {
      battery: "3.7 kWh Generation 3 Battery Pack",
      topSpeed: "90 km/h",
      acceleration: "0-40 km/h in 3.3s",
      chassis: "All-Aluminium Lightweight Frame"
    },
    features: [
      "Warp Mode Instant Torque Launch",
      "Google Maps Integrated Onboard Dashboard",
      "AutoHold Hill Assist (No Brakes Needed on Slopes)",
      "Regenerative Braking with Magic Twist",
      "Ather Grid Fast-Charging Supported"
    ]
  },
  {
    id: "v-tvs-iqube-electric",
    name: "TVS iQube Electric S",
    category: "scooty",
    categoryLabel: "Electric Scooty (EV)",
    image: "https://images.unsplash.com/photo-1593764592116-bfb2a97c642a?auto=format&fit=crop&w=700&q=80",
    pricePerHour: 59,
    pricePerDay: 399,
    rating: 4.88,
    reviewsCount: 220,
    transmission: "Automatic Hub Motor",
    fuelType: "Electric",
    seats: 2,
    rangeKm: 145,
    horsepower: "4.4 kW (5.9 bhp)",
    baggage: "32L Boot (Fits 2 Helmets)",
    deposit: 500,
    featured: false,
    tag: "Smart Family EV Scooty",
    specs: {
      battery: "3.4 kWh Dual Lithium-ion Pack",
      topSpeed: "78 km/h",
      brakes: "Regenerative Front Disc Brake",
      waterResistance: "IP67 Certified Motor & Battery"
    },
    features: [
      "Q-Park Assist (Reverse & Forward Crawl Mode)",
      "7-Inch Full Color TFT Cluster with Joystick",
      "Live Location Tracking & Geo-Fencing",
      "Comfortable Wide Pillion Footrests",
      "Whisper Silent Smooth Commute"
    ]
  },
  {
    id: "v-bajaj-chetak-ev",
    name: "Bajaj Chetak Electric Premium",
    category: "scooty",
    categoryLabel: "Electric Scooty (EV)",
    image: "https://images.unsplash.com/photo-1571188654249-7a921c1f357a?auto=format&fit=crop&w=700&q=80",
    pricePerHour: 59,
    pricePerDay: 389,
    rating: 4.90,
    reviewsCount: 260,
    transmission: "Automatic Direct Drive",
    fuelType: "Electric",
    seats: 2,
    rangeKm: 126,
    horsepower: "4.2 kW (5.6 bhp)",
    baggage: "Glove Box + Underseat Storage",
    deposit: 500,
    featured: false,
    tag: "Iconic Metal-Body EV",
    specs: {
      battery: "3.2 kWh Steel Cased Battery",
      body: "High-Strength Steel Sheet Metal Body",
      topSpeed: "73 km/h"
    },
    features: [
      "Premium Seamless Sheet Metal Bodywork",
      "Sequential LED Scrolling Blinkers",
      "Reverse Gear for Easy Parking",
      "Soft-Close Glovebox with Phone Charger",
      "Timeless Chetak Heritage Styling"
    ]
  },
  {
    id: "v-hero-vida-v1",
    name: "Hero Vida V1 Pro",
    category: "scooty",
    categoryLabel: "Electric Scooty (EV)",
    image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=700&q=80",
    pricePerHour: 65,
    pricePerDay: 429,
    rating: 4.87,
    reviewsCount: 190,
    transmission: "Automatic",
    fuelType: "Electric",
    seats: 2,
    rangeKm: 165,
    horsepower: "6 kW (8 bhp)",
    baggage: "26L Split Boot",
    deposit: 600,
    featured: false,
    tag: "Removable Dual Battery EV",
    specs: {
      battery: "3.94 kWh Dual Removable Battery Packs",
      topSpeed: "80 km/h",
      acceleration: "0-40 km/h in 3.2s"
    },
    features: [
      "Dual Removable Batteries (Charge anywhere at home/office)",
      "Custom Riding Mode with 100+ Combinations",
      "Cruise Control & SOS Emergency Button",
      "Keyless Entry with Two-Way Throttle Regen"
    ]
  },
  {
    id: "v-honda-dio-125",
    name: "Honda Dio 125 H-Smart",
    category: "scooty",
    categoryLabel: "Sporty Scooty",
    image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=700&q=80",
    pricePerHour: 55,
    pricePerDay: 349,
    rating: 4.86,
    reviewsCount: 230,
    transmission: "Automatic",
    fuelType: "Petrol 125cc",
    seats: 2,
    horsepower: "8.2 bhp",
    baggage: "Front Pocket & 18L Underseat",
    deposit: 500,
    featured: false,
    tag: "Sporty Youth Scooty",
    specs: {
      engine: "123.92 cc PGM-FI Engine with eSP",
      mileage: "48 kmpl",
      brakes: "Front Petal Wave Disc"
    },
    features: [
      "Honda Smart Key (Keyless Ignition & Safe Find)",
      "Sporty Dual-Tone Muffler with Deep Growl",
      "Full Digital Instrument Console",
      "Bold LED Position Lamp & Signature Graphics"
    ]
  },
  {
    id: "v-yamaha-fascino-125",
    name: "Yamaha Fascino 125 Fi Hybrid",
    category: "scooty",
    categoryLabel: "Retro Hybrid Scooty",
    image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=700&q=80",
    pricePerHour: 54,
    pricePerDay: 339,
    rating: 4.88,
    reviewsCount: 205,
    transmission: "Automatic V-Belt",
    fuelType: "Petrol Hybrid 125cc",
    seats: 2,
    horsepower: "8.2 bhp + Electric Power Assist",
    baggage: "21L Boot",
    deposit: 500,
    featured: false,
    tag: "Retro Hybrid Scooty",
    specs: {
      engine: "125 cc Air-Cooled Blue Core Hybrid Engine",
      mileage: "65 kmpl",
      weight: "99 kg Ultra Lightweight"
    },
    features: [
      "Smart Motor Generator (SMG) Electric Boost Assist",
      "Automatic Stop & Start System for Maximum Mileage",
      "Retro European Vintage Curves & Chrome Accents",
      "Lightweight Feather-Touch Handling"
    ]
  },
  {
    id: "v-hero-pleasure-plus",
    name: "Hero Pleasure+ 110 XTEC",
    category: "scooty",
    categoryLabel: "Lightweight City Scooty",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=700&q=80",
    pricePerHour: 45,
    pricePerDay: 279,
    rating: 4.82,
    reviewsCount: 180,
    transmission: "Automatic",
    fuelType: "Petrol 110cc",
    seats: 2,
    horsepower: "8.0 bhp",
    baggage: "Boot + Inner Storage",
    deposit: 400,
    featured: false,
    tag: "Lightweight City Scooty",
    specs: {
      engine: "110.9 cc Programmed FI Engine",
      mileage: "52 kmpl",
      lighting: "Projector LED Headlamp"
    },
    features: [
      "Bluetooth Connectivity with Call & SMS Alerts",
      "Pillion Backrest Support for Long Rides",
      "Side Stand Engine Cut-Off Safety Switch",
      "Mobile Charging Port in Glove Pocket"
    ]
  },

  // ==========================================
  // BIKE CATEGORY (COMMUTERS, CRUISERS, SPORTS & ELECTRIC)
  // ==========================================
  {
    id: "v-hero-splendor-plus",
    name: "Hero Splendor Plus XTEC",
    category: "bike",
    categoryLabel: "Commuter Motorcycle",
    image: "https://images.unsplash.com/photo-1558981408-db0ecd8a1ee4?auto=format&fit=crop&w=700&q=80",
    pricePerHour: 49,
    pricePerDay: 299,
    rating: 4.96,
    reviewsCount: 650,
    transmission: "4-Speed Manual",
    fuelType: "Petrol 97cc",
    seats: 2,
    horsepower: "7.9 bhp",
    baggage: "Carrier Rack",
    deposit: 500,
    featured: true,
    tag: "India's #1 Highest Selling Motorcycle",
    specs: {
      engine: "97.2 cc Air Cooled 4-Stroke Engine",
      mileage: "70 kmpl",
      fuelSystem: "Advanced Programmed FI with i3S"
    },
    features: [
      "i3S Idle Stop-Start Technology (70+ kmpl Mileage)",
      "Fully Digital Meter with Real-Time Mileage Display",
      "Bluetooth Connectivity & USB Mobile Charger",
      "Tubeless Tires & Long Durable Cushion Seat",
      "Unmatched Reliability Everywhere in India"
    ]
  },
  {
    id: "v-honda-shine-125",
    name: "Honda Shine 125 Drum/Disc",
    category: "bike",
    categoryLabel: "Commuter Motorcycle",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=700&q=80",
    pricePerHour: 59,
    pricePerDay: 379,
    rating: 4.91,
    reviewsCount: 440,
    transmission: "5-Speed Manual",
    fuelType: "Petrol 125cc",
    seats: 2,
    horsepower: "10.59 bhp",
    baggage: "Side Mount Hook",
    deposit: 600,
    featured: false,
    tag: "India's Most Trusted 125cc Bike",
    specs: {
      engine: "123.94 cc 4-Stroke SI Engine with eSP",
      mileage: "55 kmpl",
      transmission: "5-Speed Smooth Gearbox"
    },
    features: [
      "Silent ACG Starter Motor",
      "DC Headlamp for Consistent Night Lighting",
      "Equalizer with Combi Brake System (CBS)",
      "Ultra-Comfortable 5-Step Adjustable Suspension"
    ]
  },
  {
    id: "v-bajaj-pulsar-150",
    name: "Bajaj Pulsar 150 Twin Disc",
    category: "bike",
    categoryLabel: "Sports Commuter Bike",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=700&q=80",
    pricePerHour: 75,
    pricePerDay: 479,
    rating: 4.89,
    reviewsCount: 390,
    transmission: "5-Speed Manual",
    fuelType: "Petrol 150cc",
    seats: 2,
    horsepower: "14 bhp / 13.25 Nm",
    baggage: "Pillion Handrails",
    deposit: 800,
    featured: true,
    tag: "Iconic Indian Sports Commuter",
    specs: {
      engine: "149.5 cc Twin Spark DTS-i Engine",
      mileage: "45 kmpl",
      brakes: "Dual Disc Brakes with Single Channel ABS"
    },
    features: [
      "Twin Disc Brakes for Controlled High Speed Stopping",
      "Muscular Fuel Tank with Aerodynamic 3D Shrouds",
      "Split Seat & Clip-On Handlebars",
      "Twin LED Tail Lamp & Wolf-Eyed Headlamp"
    ]
  },
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
    featured: false,
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
    id: "v-tvs-apache-rtr-160-4v",
    name: "TVS Apache RTR 160 4V Special Edition",
    category: "bike",
    categoryLabel: "Track Tuned Naked Bike",
    image: "https://images.unsplash.com/photo-1558980664-769d59546b3d?auto=format&fit=crop&w=700&q=80",
    pricePerHour: 85,
    pricePerDay: 529,
    rating: 4.92,
    reviewsCount: 310,
    transmission: "5-Speed Manual",
    fuelType: "Petrol 160cc",
    seats: 2,
    horsepower: "17.55 bhp",
    baggage: "Tail Pillion Mount",
    deposit: 800,
    featured: true,
    tag: "Race-Tuned Performance Bike",
    specs: {
      engine: "159.7 cc Oil-Cooled 4-Valve Engine",
      modes: "3 Ride Modes (Sport, Urban, Rain)",
      exhaust: "Signature Dual-Barrel Bullpup Exhaust"
    },
    features: [
      "Glide Through Traffic (GTT) Technology for Easy Bumper Traffic",
      "SmartXonnect Bluetooth Telemetry & Lean Angle Display",
      "Radial Rear Tire with Showa Tuned Monoshock",
      "Race-Tuned Fuel Injection (RT-Fi)"
    ]
  },
  {
    id: "v-bajaj-pulsar-ns200",
    name: "Bajaj Pulsar NS200 Dual ABS",
    category: "bike",
    categoryLabel: "Naked Streetfighter",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?auto=format&fit=crop&w=700&q=80",
    pricePerHour: 99,
    pricePerDay: 649,
    rating: 4.90,
    reviewsCount: 360,
    transmission: "6-Speed Manual",
    fuelType: "Petrol 200cc",
    seats: 2,
    horsepower: "24.5 bhp / 18.7 Nm",
    baggage: "Compact Tail Mount",
    deposit: 1000,
    featured: false,
    tag: "Aggressive 200cc Streetfighter",
    specs: {
      engine: "199.5 cc Liquid Cooled Triple Spark 4-Valve Engine",
      suspension: "Upside Down (USD) Front Forks",
      frame: "Pressed Steel Perimeter Frame"
    },
    features: [
      "24.5 PS High-Revving Liquid Cooled Engine",
      "Perimeter Frame for Superb High-Speed Stability",
      "Dual Channel ABS with 300mm Front Disc",
      "Gear Position Indicator & Distance-to-Empty Console"
    ]
  },
  {
    id: "v-royal-enfield-hunter-350",
    name: "Royal Enfield Hunter 350 Dapper",
    category: "bike",
    categoryLabel: "Urban Roadster Bike",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=700&q=80",
    pricePerHour: 95,
    pricePerDay: 649,
    rating: 4.93,
    reviewsCount: 420,
    transmission: "5-Speed Manual",
    fuelType: "Petrol 350cc",
    seats: 2,
    horsepower: "20.2 bhp / 27 Nm",
    baggage: "Rear Saddle Support",
    deposit: 1000,
    featured: true,
    tag: "Modern Urban Roadster",
    specs: {
      engine: "J-Series 349 cc Air-Oil Cooled Single Cylinder",
      wheels: "17-Inch Cast Alloy Wheels",
      weight: "181 kg (Nimble & Flickable)"
    },
    features: [
      "Compact Short Wheelbase for Nimble City Maneuvering",
      "Low 790mm Seat Height (Easy for all riders)",
      "Dual Channel ABS & Tubeless Tires",
      "Refined J-Platform Engine with Minimal Vibrations"
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
    id: "v-royal-enfield-bullet-350",
    name: "Royal Enfield Bullet 350 Standard",
    category: "bike",
    categoryLabel: "Heritage Classic Cruiser",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=700&q=80",
    pricePerHour: 99,
    pricePerDay: 699,
    rating: 4.96,
    reviewsCount: 490,
    transmission: "5-Speed Manual",
    fuelType: "Petrol 349cc",
    seats: 2,
    horsepower: "20.2 bhp / 27 Nm",
    baggage: "Side Carrier",
    deposit: 1000,
    featured: false,
    tag: "The 90-Year Indian Legend",
    specs: {
      engine: "New J-Series 349 cc Counter-Balanced Engine",
      styling: "Hand-Crafted Madras Pinstripes",
      seat: "Iconic Single-Piece Long Bench Seat"
    },
    features: [
      "Pure Iron Legend with 90 Years of Royal Indian Heritage",
      "Heavy Flywheel Character & Authoritative Exhaust Note",
      "Dual Channel ABS with Broad 19-Inch Front Wheel",
      "USB Port for On-The-Go Device Charging"
    ]
  },
  {
    id: "v-yamaha-mt-15",
    name: "Yamaha MT-15 V2 Monster Energy",
    category: "bike",
    categoryLabel: "Hyper Naked Street Bike",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?auto=format&fit=crop&w=700&q=80",
    pricePerHour: 115,
    pricePerDay: 769,
    rating: 4.91,
    reviewsCount: 310,
    transmission: "6-Speed Assist & Slipper",
    fuelType: "Petrol 155cc",
    seats: 2,
    horsepower: "18.4 bhp",
    baggage: "Underseat Hooks",
    deposit: 1200,
    featured: false,
    tag: "Dark Warrior Hyper Naked",
    specs: {
      engine: "155 cc Liquid Cooled 4-Valve VVA Engine",
      forks: "37mm Gold Upside-Down (USD) Front Forks",
      swingarm: "Aluminium Swingarm"
    },
    features: [
      "Bi-Functional LED Projector Headlamp",
      "Variable Valve Actuation (VVA) for Explosive Mid-to-Top End",
      "Traction Control System (TCS) & Dual Channel ABS",
      "Y-Connect Bluetooth Smartphone App Integration"
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
  {
    id: "v-revolt-rv400-ev",
    name: "Revolt RV400 Electric Motorcycle",
    category: "bike",
    categoryLabel: "Electric Bike (EV)",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=700&q=80",
    pricePerHour: 79,
    pricePerDay: 499,
    rating: 4.88,
    reviewsCount: 195,
    transmission: "Belt Drive Automatic",
    fuelType: "Electric",
    seats: 2,
    rangeKm: 150,
    horsepower: "3 kW Mid-Drive Motor (5 kW Peak)",
    baggage: "Storage Trunk",
    deposit: 800,
    featured: true,
    tag: "India's Leading Electric Motorcycle",
    specs: {
      battery: "3.24 kWh Removable Lithium-ion Battery",
      topSpeed: "85 km/h",
      modes: "Eco (150km), Normal (100km), Sport (80km)"
    },
    features: [
      "Customizable Artificial Exhaust Sounds (Revolt, Rebel, Roar)",
      "Swappable Removable Battery (Easy Home Charging)",
      "USD Front Suspension & Rear Monoshock",
      "MyRevolt App with Geofencing & Keyless Start"
    ]
  },

  // ==========================================
  // CARS CATEGORY (HATCHBACKS, SEDANS, SUVS & ELECTRIC CARS)
  // ==========================================
  {
    id: "v-maruti-swift",
    name: "Maruti Suzuki Swift ZXi+",
    category: "cars",
    categoryLabel: "Sporty Hatchback Car",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=700&q=80",
    pricePerHour: 189,
    pricePerDay: 1199,
    rating: 4.89,
    reviewsCount: 460,
    transmission: "Automatic AMT",
    fuelType: "Petrol 1.2L DualJet",
    seats: 5,
    horsepower: "89 bhp",
    baggage: "3 Bags (268L Boot)",
    deposit: 1500,
    featured: true,
    tag: "India's #1 Favorite Sporty Hatchback",
    specs: {
      engine: "1.2L DualJet VVT Engine with Idle Start-Stop",
      mileage: "24.8 kmpl",
      infotainment: "9-Inch SmartPlay Pro+ Touchscreen"
    },
    features: [
      "Cruise Control & Automatic Climate Control",
      "Wireless Apple CarPlay & Android Auto",
      "Precision Dual-Tone Alloy Wheels",
      "6 Airbags Standard Safety Protection"
    ]
  },
  {
    id: "v-maruti-dzire",
    name: "Maruti Suzuki Dzire ZXi Automatic",
    category: "cars",
    categoryLabel: "Compact Sedan Car",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=700&q=80",
    pricePerHour: 199,
    pricePerDay: 1249,
    rating: 4.90,
    reviewsCount: 410,
    transmission: "Automatic AGS",
    fuelType: "Petrol 1.2L",
    seats: 5,
    horsepower: "89 bhp",
    baggage: "4 Bags (378L Large Boot)",
    deposit: 1500,
    featured: false,
    tag: "India's Most Popular Compact Sedan",
    specs: {
      engine: "1.2L K-Series DualJet Engine",
      mileage: "22.61 kmpl",
      bootSpace: "378 Litres Trunk Capacity"
    },
    features: [
      "Extra Rear Legroom with Rear Center Armrest & Cup Holders",
      "Rear AC Vents with Fast USB Charging Ports",
      "Electronic Stability Program (ESP) with Hill Hold",
      "Quiet Refined Highway Cruising"
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
  },
  {
    id: "v-maruti-baleno",
    name: "Maruti Suzuki Baleno Alpha",
    category: "cars",
    categoryLabel: "Premium Hatchback Car",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=700&q=80",
    pricePerHour: 219,
    pricePerDay: 1349,
    rating: 4.88,
    reviewsCount: 320,
    transmission: "Automatic AMT",
    fuelType: "Petrol 1.2L DualJet",
    seats: 5,
    horsepower: "89 bhp",
    baggage: "4 Bags (318L Boot)",
    deposit: 1500,
    featured: false,
    tag: "Feature-Packed Premium Hatchback",
    specs: {
      engine: "1.2L Dual VVT Engine",
      mileage: "22.35 kmpl",
      cameras: "360-Degree Surround View Camera"
    },
    features: [
      "Head-Up Display (HUD) Projected on Windshield",
      "360-Degree Bird's Eye View Parking Cameras",
      "Arkamys Surround Sound System",
      "UV Cut Solar Glass Windows"
    ]
  },
  {
    id: "v-tata-punch",
    name: "Tata Punch Creative Flagship",
    category: "cars",
    categoryLabel: "Micro-SUV Car",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=700&q=80",
    pricePerHour: 199,
    pricePerDay: 1249,
    rating: 4.92,
    reviewsCount: 380,
    transmission: "Automatic AMT",
    fuelType: "Petrol 1.2L Revotron",
    seats: 5,
    horsepower: "86 bhp",
    baggage: "4 Bags (366L Boot)",
    deposit: 1500,
    featured: true,
    tag: "5-Star Safety Indian Micro-SUV",
    specs: {
      safety: "5-Star Global NCAP Adult Safety Rating",
      groundClearance: "187 mm SUV Ground Clearance",
      doors: "90-Degree Wide Opening Doors"
    },
    features: [
      "5-Star Global NCAP Crash Safety Certified",
      "Traction Pro Mode for Slippery Surfaces",
      "High Ground Clearance for Indian Speedbreakers & Bad Roads",
      "7-Inch Harman Touchscreen & Digital Cluster"
    ]
  },
  {
    id: "v-maruti-brezza",
    name: "Maruti Suzuki Brezza ZXi+",
    category: "cars",
    categoryLabel: "Compact SUV Car",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=80",
    pricePerHour: 249,
    pricePerDay: 1599,
    rating: 4.88,
    reviewsCount: 340,
    transmission: "6-Speed Torque Converter AT",
    fuelType: "Petrol 1.5L Smart Hybrid",
    seats: 5,
    horsepower: "102 bhp",
    baggage: "4 Bags (328L Boot)",
    deposit: 2000,
    featured: false,
    tag: "Top Selling Indian Compact SUV",
    specs: {
      engine: "1.5L K15C DualJet Smart Hybrid Engine",
      mileage: "19.8 kmpl",
      sunroof: "Electric Single-Pane Sunroof"
    },
    features: [
      "Electric Sunroof & Paddle Shifters",
      "Head-Up Display & 360-Degree Camera",
      "Wireless Qi Smartphone Charger",
      "Suzuki Connect with 40+ Connected Car Telematics"
    ]
  },
  {
    id: "v-tata-tiago-ev",
    name: "Tata Tiago EV Long Range",
    category: "cars",
    categoryLabel: "Electric Hatchback Car (EV)",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=700&q=80",
    pricePerHour: 229,
    pricePerDay: 1399,
    rating: 4.87,
    reviewsCount: 230,
    transmission: "Automatic Single-Speed",
    fuelType: "Electric",
    seats: 5,
    rangeKm: 315,
    horsepower: "74 bhp / 114 Nm",
    baggage: "3 Bags (240L Boot)",
    deposit: 1500,
    featured: true,
    tag: "India's Most Accessible EV Car",
    specs: {
      battery: "24 kWh High Energy Density Battery",
      fastCharging: "DC Fast Charge 10-80% in 57 mins",
      safety: "4-Star Global NCAP Rating"
    },
    features: [
      "315 km Certified Driving Range",
      "Sport & City Driving Modes",
      "Harman 8-Speaker Sound System",
      "Cruise Control & Automatic Rain Sensing Wipers",
      "Silent EV Driving with Instant Overtake Torque"
    ]
  },
  {
    id: "v-tata-nexon-ev",
    name: "Tata Nexon EV Max Empress",
    category: "cars",
    categoryLabel: "Electric SUV Car (EV)",
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
    tag: "Best Selling Indian EV SUV",
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
    id: "v-mg-zs-ev",
    name: "MG ZS EV Exclusive Pro",
    category: "cars",
    categoryLabel: "Electric SUV Car (EV)",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=700&q=80",
    pricePerHour: 449,
    pricePerDay: 2699,
    rating: 4.93,
    reviewsCount: 190,
    transmission: "Automatic Single-Speed",
    fuelType: "Electric",
    seats: 5,
    rangeKm: 461,
    horsepower: "174 bhp / 280 Nm",
    baggage: "5 Bags (470L Large Boot)",
    deposit: 3000,
    featured: false,
    tag: "Premium Global EV SUV",
    specs: {
      battery: "50.3 kWh Prismatic Cell Battery Pack",
      sunroof: "Dual-Pane Panoramic SkyRoof",
      adas: "Level 2 ADAS (17 Autonomous Features)"
    },
    features: [
      "461 km Long Range on Single Charge",
      "Panoramic Dual-Pane SkyRoof Sunroof",
      "360-Degree Camera with 3D Transparent Chassis View",
      "Level 2 ADAS Adaptive Cruise & Lane Keep Assist"
    ]
  },
  {
    id: "v-mahindra-xuv400-ev",
    name: "Mahindra XUV400 EL Pro EV",
    category: "cars",
    categoryLabel: "Electric SUV Car (EV)",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=700&q=80",
    pricePerHour: 369,
    pricePerDay: 2299,
    rating: 4.90,
    reviewsCount: 165,
    transmission: "Automatic Single-Speed",
    fuelType: "Electric",
    seats: 5,
    rangeKm: 456,
    horsepower: "150 bhp / 310 Nm",
    baggage: "4 Bags (378L Boot)",
    deposit: 2500,
    featured: false,
    tag: "Fastest Indian EV SUV",
    specs: {
      battery: "39.4 kWh IP67 Battery Pack",
      acceleration: "0-100 km/h in 8.3 Seconds",
      screens: "Dual 10.25-Inch Digital Cockpit Displays"
    },
    features: [
      "0-100 km/h in 8.3s (Fastest in Class Acceleration)",
      "Linc Intelligent Connected Car with 55+ Features",
      "Wireless Android Auto & Apple CarPlay",
      "Spacious Wide 1821mm Body Width Cabin"
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
    id: "v-kia-seltos",
    name: "Kia Seltos GTX+ Turbo",
    category: "cars",
    categoryLabel: "Tech-Loaded Crossover SUV",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=700&q=80",
    pricePerHour: 329,
    pricePerDay: 1999,
    rating: 4.91,
    reviewsCount: 295,
    transmission: "7-Speed Dual Clutch (DCT)",
    fuelType: "Petrol 1.5L Turbo (160 bhp)",
    seats: 5,
    horsepower: "160 bhp / 253 Nm",
    baggage: "4 Bags (433L Large Boot)",
    deposit: 2500,
    featured: false,
    tag: "Tech-Loaded Premium SUV",
    specs: {
      engine: "1.5L Smartstream Turbo GDi Petrol",
      screens: "Seamless Dual 10.25-Inch Panoramic Glass Displays",
      adas: "Level 2 ADAS with 17 Autonomous Capabilities"
    },
    features: [
      "Dual-Zone Fully Automatic Climate Control",
      "Ventilated Front Seats for Hot Indian Summers",
      "8-Speaker Bose Premium Hi-Fi Sound System",
      "Panoramic Dual Sunroof with Voice Assist"
    ]
  },
  {
    id: "v-mahindra-thar-4x4",
    name: "Mahindra Thar LX 4x4 Hard Top",
    category: "cars",
    categoryLabel: "Adventure 4x4 Off-Roader",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=700&q=80",
    pricePerHour: 449,
    pricePerDay: 2799,
    rating: 4.97,
    reviewsCount: 520,
    transmission: "6-Speed Torque Converter AT",
    fuelType: "2.2L mHawk Diesel",
    seats: 4,
    horsepower: "130 bhp / 300 Nm",
    baggage: "3 Bags",
    deposit: 3000,
    featured: true,
    tag: "Iconic Indian 4x4 Off-Roader",
    specs: {
      drivetrain: "Shift-on-the-Fly 4WD with Low-Range Transfer Case",
      groundClearance: "226 mm Supreme Water Wading Depth (650mm)",
      differential: "Mechanical Locking Rear Differential (MLD)"
    },
    features: [
      "True 4x4 Off-Road Capability for Mountains, Beaches & Trails",
      "Factory Fitted Solid Hard Top Cabin with Roll Cage",
      "Washable Interior Floor with Drain Plugs",
      "Roof-Mounted Weather-Resistant Speakers"
    ]
  },
  {
    id: "v-mahindra-scorpio-n",
    name: "Mahindra Scorpio-N Z8L 4x4",
    category: "cars",
    categoryLabel: "Commanding 7-Seater SUV",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=700&q=80",
    pricePerHour: 499,
    pricePerDay: 2999,
    rating: 4.95,
    reviewsCount: 390,
    transmission: "6-Speed Automatic",
    fuelType: "2.2L mHawk Diesel (200 bhp)",
    seats: 7,
    horsepower: "175 bhp / 400 Nm",
    baggage: "5 Bags (Expandable)",
    deposit: 3500,
    featured: true,
    tag: "The Big Daddy of Indian SUVs",
    specs: {
      engine: "2.2L mHawk CRDe Turbo Diesel",
      terrainModes: "4XPLOR Intelligent Terrain Response (Snow, Mud, Sand)",
      audio: "Sony 12-Speaker 3D Immersive Sound System"
    },
    features: [
      "Imposing Road Presence with Commanding High Seating",
      "Frequency Dependent Damping (FDD) for Pothole Gliding",
      "Dual Zone AC with Individual 2nd & 3rd Row Air Vents",
      "Electric Sunroof & Wireless Phone Mirroring"
    ]
  },
  {
    id: "v-toyota-innova-crysta",
    name: "Toyota Innova Crysta 2.4 ZX",
    category: "cars",
    categoryLabel: "Luxury 7-Seater Tourer MPV",
    image: "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=700&q=80",
    pricePerHour: 549,
    pricePerDay: 3299,
    rating: 4.97,
    reviewsCount: 480,
    transmission: "Manual 5-Speed",
    fuelType: "2.4L D-4D Diesel",
    seats: 7,
    horsepower: "150 bhp / 343 Nm",
    baggage: "6 Large Bags",
    deposit: 3500,
    featured: true,
    tag: "King of Long Distance Touring",
    specs: {
      engine: "2.4L GD Turbo Diesel Engine",
      seating: "2nd Row Reclining Captain Seats with Armrests",
      reliability: "Legendary 10-Lakh Kilometer Toyota Durability"
    },
    features: [
      "Ultimate Royal Highway Comfort for Large Families & Business Trips",
      "Independent Roof AC Controls for Every Row",
      "Ambient Interior Lounge Illumination",
      "Eco & Power Driving Modes for Mileage or Instant Highway Pull",
      "7 Airbags & Vehicle Stability Control (VSC)"
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
