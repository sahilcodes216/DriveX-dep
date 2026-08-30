// Comprehensive Location Database for Delhi (NCR), Maharashtra, and Gujarat

const INDIA_LOCATIONS_DATA = {
  "Delhi (NCR)": {
    districts: [
      {
        name: "New Delhi",
        cities: [
          { name: "Connaught Place (CP Inner & Outer Circle)", location: "Connaught Place, New Delhi", lat: 28.6315, lng: 77.2167, pincode: "110001" },
          { name: "Aerocity & IGI Airport T1/T3 (DEL)", location: "Hospitality District, Aerocity, New Delhi", lat: 28.5562, lng: 77.1200, pincode: "110037" },
          { name: "Khan Market & Chanakyapuri", location: "Khan Market, New Delhi", lat: 28.6002, lng: 77.2270, pincode: "110003" },
          { name: "Parliament Street & Janpath", location: "Janpath Market, New Delhi", lat: 28.6250, lng: 77.2180, pincode: "110001" },
          { name: "Barakhamba Road & Mandi House", location: "Barakhamba Road, New Delhi", lat: 28.6300, lng: 77.2300, pincode: "110001" }
        ]
      },
      {
        name: "South Delhi",
        cities: [
          { name: "South Extension I & II", location: "Ring Road, South Extension, New Delhi", lat: 28.5684, lng: 77.2205, pincode: "110049" },
          { name: "Hauz Khas Village & IIT Gate", location: "Hauz Khas, New Delhi", lat: 28.5494, lng: 77.2001, pincode: "110016" },
          { name: "Saket District Centre & Select Citywalk", location: "Press Enclave Marg, Saket, New Delhi", lat: 28.5285, lng: 77.2192, pincode: "110017" },
          { name: "Lajpat Nagar Central Market & Defence Colony", location: "Lajpat Nagar II, New Delhi", lat: 28.5700, lng: 77.2400, pincode: "110024" },
          { name: "Vasant Kunj Malls & Vasant Vihar", location: "Nelson Mandela Marg, Vasant Kunj, New Delhi", lat: 28.5400, lng: 77.1550, pincode: "110070" },
          { name: "Greater Kailash (GK 1 & GK 2)", location: "M Block Market, Greater Kailash, New Delhi", lat: 28.5480, lng: 77.2340, pincode: "110048" },
          { name: "Nehru Place Financial Hub & Kalkaji", location: "Nehru Place, New Delhi", lat: 28.5490, lng: 77.2520, pincode: "110019" }
        ]
      },
      {
        name: "Gurugram (NCR)",
        cities: [
          { name: "DLF Cyber City & Cyber Hub (Phase 2 & 3)", location: "DLF Cyber City, Sector 24, Gurugram", lat: 28.4950, lng: 77.0890, pincode: "122002" },
          { name: "Golf Course Road & Horizon Center (Phase 5)", location: "Golf Course Road, Sector 54, Gurugram", lat: 28.4480, lng: 77.1060, pincode: "122011" },
          { name: "Golf Course Extension Road & Sector 56/57", location: "Golf Course Ext Rd, Gurugram", lat: 28.4180, lng: 77.0980, pincode: "122011" },
          { name: "Sohna Road, Subhash Chowk & Sector 48/49", location: "Sohna Road, Sector 48, Gurugram", lat: 28.4200, lng: 77.0400, pincode: "122018" },
          { name: "MG Road & IFFCO Chowk Metro Corridor", location: "MG Road, Sector 28, Gurugram", lat: 28.4790, lng: 77.0800, pincode: "122002" },
          { name: "Udyog Vihar Phase 1, 2, 3, 4, 5", location: "Udyog Vihar, Sector 18, Gurugram", lat: 28.5020, lng: 77.0820, pincode: "122016" },
          { name: "Dwarka Expressway Sector 102-113 Hub", location: "Dwarka Expressway, Sector 109, Gurugram", lat: 28.5150, lng: 77.0250, pincode: "122017" }
        ]
      },
      {
        name: "Noida & Greater Noida (NCR)",
        cities: [
          { name: "Noida Sector 18 Commercial Market & DLF Mall", location: "Sector 18, Noida", lat: 28.5708, lng: 77.3261, pincode: "201301" },
          { name: "Noida Sector 62 IT Park & Fortis", location: "Sector 62 Institutional Area, Noida", lat: 28.6280, lng: 77.3650, pincode: "201309" },
          { name: "Noida Expressway (Sector 128 / 137 / 143)", location: "Noida Expressway, Sector 137, Noida", lat: 28.5040, lng: 77.4040, pincode: "201305" },
          { name: "Noida Sector 15 & 16 Metro Belt", location: "Sector 15, Noida", lat: 28.5830, lng: 77.3130, pincode: "201301" },
          { name: "Greater Noida Pari Chowk & Knowledge Park II", location: "Knowledge Park II, Greater Noida", lat: 28.4600, lng: 77.4900, pincode: "201310" },
          { name: "Greater Noida West (Noida Ext Gaur City)", location: "Gaur City 1, Greater Noida West", lat: 28.6080, lng: 77.4280, pincode: "201318" }
        ]
      },
      {
        name: "Central & North Delhi",
        cities: [
          { name: "Karol Bagh & Pusa Road Market", location: "Pusa Road, Karol Bagh, New Delhi", lat: 28.6518, lng: 77.1910, pincode: "110005" },
          { name: "Rajendra Nagar & Patel Nagar", location: "Old Rajendra Nagar, New Delhi", lat: 28.6410, lng: 77.1820, pincode: "110060" },
          { name: "Chandni Chowk & Old Delhi Railway Station", location: "Chandni Chowk, Delhi", lat: 28.6506, lng: 77.2303, pincode: "110006" },
          { name: "New Delhi Railway Station (NDLS Paharganj)", location: "Paharganj, New Delhi", lat: 28.6427, lng: 77.2195, pincode: "110055" },
          { name: "Civil Lines & DU North Campus", location: "Mall Road, DU North Campus, Delhi", lat: 28.6890, lng: 77.2100, pincode: "110007" },
          { name: "Pitampura & Netaji Subhash Place (NSP) Hub", location: "NSP Complex, Pitampura, New Delhi", lat: 28.6980, lng: 77.1520, pincode: "110034" },
          { name: "Rohini Sector 7, 8, 9 & Swarn Jayanti Park", location: "Sector 7, Rohini, New Delhi", lat: 28.7050, lng: 77.1180, pincode: "110085" }
        ]
      },
      {
        name: "West Delhi",
        cities: [
          { name: "Dwarka Sector 21 & 22 Metro Intermodal Hub", location: "Sector 21 Dwarka, New Delhi", lat: 28.5520, lng: 77.0580, pincode: "110075" },
          { name: "Dwarka Sector 6, 10 & 12 Market", location: "Sector 6 Market, Dwarka, New Delhi", lat: 28.5800, lng: 77.0650, pincode: "110075" },
          { name: "Janakpuri District Centre & West End Mall", location: "Janakpuri District Centre, New Delhi", lat: 28.6280, lng: 77.0780, pincode: "110058" },
          { name: "Rajouri Garden Main Market & Pacific Mall", location: "Rajouri Garden, New Delhi", lat: 28.6480, lng: 77.1220, pincode: "110027" },
          { name: "Paschim Vihar & Punjabi Bagh Club Road", location: "Outer Ring Road, Paschim Vihar, New Delhi", lat: 28.6700, lng: 77.0900, pincode: "110063" }
        ]
      }
    ]
  },

  "Maharashtra": {
    districts: [
      {
        name: "Mumbai City",
        cities: [
          { name: "Mumbai Downtown (Marine Drive, Nariman Point & Churchgate)", location: "Marine Drive, Nariman Point, Mumbai", lat: 19.0760, lng: 72.8777, pincode: "400021" },
          { name: "Colaba Causeway, Taj Hotel & Gateway of India", location: "Apollo Bandar, Colaba, Mumbai", lat: 18.9220, lng: 72.8347, pincode: "400001" },
          { name: "Bandra Kurla Complex (BKC G-Block & E-Block)", location: "G Block, BKC, Bandra East, Mumbai", lat: 19.0657, lng: 72.8687, pincode: "400051" },
          { name: "Lower Parel Commercial Hub, Phoenix Palladium & World Towers", location: "Senapati Bapat Marg, Lower Parel, Mumbai", lat: 19.0010, lng: 72.8300, pincode: "400013" },
          { name: "Worli Sea Face & Annie Besant Road", location: "Worli Sea Face, Mumbai", lat: 19.0150, lng: 72.8180, pincode: "400018" },
          { name: "Dadar West, Shivaji Park & Kabutar Khana", location: "Shivaji Park, Dadar West, Mumbai", lat: 19.0260, lng: 72.8380, pincode: "400028" },
          { name: "Prabhadevi & Siddhivinayak Temple Precinct", location: "SK Bole Marg, Prabhadevi, Mumbai", lat: 19.0170, lng: 72.8300, pincode: "400025" },
          { name: "Fort, CST Railway Station & Ballard Estate", location: "DN Road, Fort, Mumbai", lat: 18.9400, lng: 72.8350, pincode: "400001" }
        ]
      },
      {
        name: "Mumbai Suburban",
        cities: [
          { name: "Andheri East (CSMI Airport T1 & T2 International Hub)", location: "Airport Road, Andheri East, Mumbai", lat: 19.0968, lng: 72.8750, pincode: "400099" },
          { name: "Andheri East Marol, MIDC & JB Nagar", location: "MIDC Central Road, Andheri East, Mumbai", lat: 19.1180, lng: 72.8690, pincode: "400093" },
          { name: "Bandra West, Linking Road & Hill Road", location: "Linking Road, Bandra West, Mumbai", lat: 19.0596, lng: 72.8295, pincode: "400050" },
          { name: "Juhu Beach, Tara Road & Vile Parle West", location: "Juhu Tara Road, Mumbai", lat: 19.0980, lng: 72.8260, pincode: "400049" },
          { name: "Andheri West, Lokhandwala Complex & Veera Desai Rd", location: "Lokhandwala Complex, Andheri West, Mumbai", lat: 19.1400, lng: 72.8250, pincode: "400053" },
          { name: "Powai Hiranandani Gardens & IIT Bombay", location: "Central Avenue, Powai, Mumbai", lat: 19.1197, lng: 72.9050, pincode: "400076" },
          { name: "Ghatkopar East, R-City Mall & LBS Marg", location: "LBS Marg, Ghatkopar West, Mumbai", lat: 19.0860, lng: 72.9080, pincode: "400086" },
          { name: "Chembur Diamond Garden & Eastern Freeway Hub", location: "Sion-Trombay Road, Chembur, Mumbai", lat: 19.0520, lng: 72.8900, pincode: "400071" },
          { name: "Malad West, Mindspace IT Park & Link Road", location: "Mindspace, Malad West, Mumbai", lat: 19.1760, lng: 72.8360, pincode: "400064" },
          { name: "Borivali West, SV Road & Gorai Hub", location: "SV Road, Borivali West, Mumbai", lat: 19.2307, lng: 72.8567, pincode: "400092" },
          { name: "Kandivali West, Mahavir Nagar & Link Road", location: "Mahavir Nagar, Kandivali West, Mumbai", lat: 19.2080, lng: 72.8380, pincode: "400067" }
        ]
      },
      {
        name: "Thane & Navi Mumbai",
        cities: [
          { name: "Thane West Ghodbunder Road, Majiwada & Viviana Mall", location: "Majiwada Junction, Thane West", lat: 19.2183, lng: 72.9781, pincode: "400601" },
          { name: "Thane West Panchpakhadi, Naupada & Station Road", location: "Station Road, Thane West", lat: 19.1860, lng: 72.9750, pincode: "400602" },
          { name: "Navi Mumbai Vashi Sector 17 & Inorbit Hub", location: "Sector 17, Vashi, Navi Mumbai", lat: 19.0771, lng: 72.9986, pincode: "400703" },
          { name: "Navi Mumbai CBD Belapur & Sector 11", location: "CBD Belapur, Navi Mumbai", lat: 19.0200, lng: 73.0400, pincode: "400614" },
          { name: "Navi Mumbai Nerul & LP Junction", location: "Nerul East, Navi Mumbai", lat: 19.0330, lng: 73.0180, pincode: "400706" },
          { name: "Navi Mumbai Kharghar Hiranandani & Central Park", location: "Kharghar, Navi Mumbai", lat: 19.0480, lng: 73.0680, pincode: "400710" },
          { name: "Navi Mumbai International Airport Hub & Panvel", location: "Panvel Station, Navi Mumbai", lat: 18.9890, lng: 73.1180, pincode: "410206" },
          { name: "Kalyan West Railway Station & Khadakpada", location: "Station Road, Kalyan West", lat: 19.2403, lng: 73.1305, pincode: "421301" },
          { name: "Dombivli East & Manpada", location: "Manpada Road, Dombivli East", lat: 19.2180, lng: 73.0860, pincode: "421201" }
        ]
      },
      {
        name: "Pune",
        cities: [
          { name: "Pune Viman Nagar & Pune Airport (PNQ) Hub", location: "Pune International Airport, Viman Nagar, Pune", lat: 18.5808, lng: 73.9197, pincode: "411014" },
          { name: "Pune Koregaon Park, North Main Road & Lane 6", location: "North Main Road, Koregaon Park, Pune", lat: 18.5362, lng: 73.8940, pincode: "411001" },
          { name: "Pune Kalyani Nagar & East Avenue", location: "Kalyani Nagar, Pune", lat: 18.5480, lng: 73.9030, pincode: "411006" },
          { name: "Pune Hinjawadi Rajiv Gandhi IT Park (Phase 1, 2, 3)", location: "Rajiv Gandhi Infotech Park, Hinjawadi, Pune", lat: 18.5912, lng: 73.7389, pincode: "411057" },
          { name: "Pune Baner, Balewadi High Street & Cummins India Rd", location: "Balewadi High Street, Baner, Pune", lat: 18.5680, lng: 73.7780, pincode: "411045" },
          { name: "Pune Wakad, Datta Mandir Road & Bhumkar Chowk", location: "Bhumkar Chowk, Wakad, Pune", lat: 18.5980, lng: 73.7620, pincode: "411057" },
          { name: "Pune Kothrud, Karve Statue & Paud Road", location: "Karve Road, Kothrud, Pune", lat: 18.5074, lng: 73.8077, pincode: "411038" },
          { name: "Pune Deccan Gymkhana, FC Road & JM Road", location: "Fergusson College Road, Deccan, Pune", lat: 18.5220, lng: 73.8420, pincode: "411004" },
          { name: "Pune Hadapsar, Magarpatta Cybercity & Seasons Mall", location: "Magarpatta City, Hadapsar, Pune", lat: 18.5180, lng: 73.9280, pincode: "411028" },
          { name: "Pune Kharadi IT Park (EON Free Zone) & WTC", location: "EON Free Zone, Kharadi, Pune", lat: 18.5520, lng: 73.9520, pincode: "411014" },
          { name: "Pune Aundh, Parihar Chowk & ITI Road", location: "Parihar Chowk, Aundh, Pune", lat: 18.5600, lng: 73.8080, pincode: "411007" },
          { name: "Pune PCMC Pimple Saudagar & Chinchwad Station", location: "Pimple Saudagar, PCMC, Pune", lat: 18.5900, lng: 73.7920, pincode: "411027" }
        ]
      },
      {
        name: "Nagpur",
        cities: [
          { name: "Nagpur Central, Sitabuldi Main Road & Station", location: "Sitabuldi Main Road, Nagpur", lat: 21.1458, lng: 79.0882, pincode: "440012" },
          { name: "Nagpur MIHAN SEZ & Dr. Ambedkar Airport (NAG)", location: "Wardha Road, MIHAN, Nagpur", lat: 21.0922, lng: 79.0472, pincode: "440005" },
          { name: "Nagpur Civil Lines, Walker's Road & High Court", location: "Civil Lines, Nagpur", lat: 21.1537, lng: 79.0689, pincode: "440001" },
          { name: "Nagpur Dharampeth, Zenda Chowk & WHC Road", location: "WHC Road, Dharampeth, Nagpur", lat: 21.1400, lng: 79.0600, pincode: "440010" }
        ]
      },
      {
        name: "Nashik",
        cities: [
          { name: "Nashik College Road, Thatte Nagar & City Center Mall", location: "College Road, Nashik", lat: 20.0059, lng: 73.7650, pincode: "422005" },
          { name: "Nashik Gangapur Road, Anandavali & Sula Precinct", location: "Gangapur Dam Road, Nashik", lat: 19.9975, lng: 73.7898, pincode: "422003" },
          { name: "Nashik Panchavati, Ramkund & Tapovan", location: "Panchavati, Nashik", lat: 20.0080, lng: 73.7950, pincode: "422003" },
          { name: "Nashik Satpur MIDC & Ambad Industrial Area", location: "Satpur MIDC, Nashik", lat: 19.9866, lng: 73.7314, pincode: "422007" }
        ]
      },
      {
        name: "Chhatrapati Sambhajinagar (Aurangabad)",
        cities: [
          { name: "Cidco Town Centre & Jalna Road Commercial Belt", location: "Jalna Road, Cidco, Sambhajinagar", lat: 19.8762, lng: 75.3433, pincode: "431003" },
          { name: "Railway Station Road, Cannaught & Nirala Bazar", location: "Station Road, Sambhajinagar", lat: 19.8660, lng: 75.3200, pincode: "431005" }
        ]
      },
      {
        name: "Other Major Maharashtra Cities & Hill Stations",
        cities: [
          { name: "Lonavala Town Centre & Khandala Hill Station Hub", location: "Lonavala Square, Lonavala", lat: 18.7557, lng: 73.4091, pincode: "410401" },
          { name: "Kolhapur City Center, Rajarampuri & Rankala", location: "Rajarampuri Main Rd, Kolhapur", lat: 16.6970, lng: 74.2400, pincode: "416008" },
          { name: "Solapur Railway Station & Saat Rasta", location: "Saat Rasta, Solapur", lat: 17.6599, lng: 75.9064, pincode: "413001" },
          { name: "Satara City & NH4 Highway Hub", location: "Powai Naka, Satara", lat: 17.6800, lng: 74.0000, pincode: "415001" }
        ]
      }
    ]
  },

  "Gujarat": {
    districts: [
      {
        name: "Ahmedabad",
        cities: [
          { name: "SG Highway, Prahlad Nagar & YMCA Club Hub", location: "SG Highway, Prahlad Nagar, Ahmedabad", lat: 23.0120, lng: 72.5100, pincode: "380015" },
          { name: "Navrangpura, CG Road & Law Garden Market", location: "CG Road, Navrangpura, Ahmedabad", lat: 23.0300, lng: 72.5600, pincode: "380009" },
          { name: "Ashram Road, Income Tax Circle & Sabarmati Riverfront", location: "Ashram Road, Ahmedabad", lat: 23.0400, lng: 72.5700, pincode: "380009" },
          { name: "Sardar Vallabhbhai Patel Airport (AMD) & Hansol", location: "Airport Road, Hansol, Ahmedabad", lat: 23.0734, lng: 72.6266, pincode: "380003" },
          { name: "Bodakdev, Judges Bungalow Road & Pakwan Cross Rd", location: "Pakwan Cross Road, Bodakdev, Ahmedabad", lat: 23.0330, lng: 72.5180, pincode: "380054" },
          { name: "Satellite, ISRO Colony & Vastrapur Lake Precinct", location: "Satellite Road, Ahmedabad", lat: 23.0280, lng: 72.5280, pincode: "380015" },
          { name: "Sindhu Bhavan Road (SBR) & Thaltej Cross Road", location: "Sindhu Bhavan Road, Thaltej, Ahmedabad", lat: 23.0450, lng: 72.5050, pincode: "380059" },
          { name: "Bopal, South Bopal & Ghuma Ring Road", location: "South Bopal, Ahmedabad", lat: 23.0200, lng: 72.4600, pincode: "380058" },
          { name: "Maninagar, Kankaria Lake & Railway Station Hub", location: "Maninagar Station Road, Ahmedabad", lat: 22.9980, lng: 72.6020, pincode: "380008" },
          { name: "Chandkheda, BRTS Corridor & Motera Stadium Hub", location: "Motera Stadium Road, Ahmedabad", lat: 23.1000, lng: 72.5900, pincode: "380005" }
        ]
      },
      {
        name: "Gandhinagar",
        cities: [
          { name: "GIFT City (Gujarat International Finance Tec-City)", location: "GIFT SEZ, Gandhinagar", lat: 23.1600, lng: 72.6800, pincode: "382355" },
          { name: "Gandhinagar Sector 11, GH Road & Secretariat Hub", location: "Sector 11, GH Road, Gandhinagar", lat: 23.2150, lng: 72.6360, pincode: "382010" },
          { name: "Gandhinagar Infocity, Kudasan & Reliance Cross Rd", location: "Infocity Complex, Kudasan, Gandhinagar", lat: 23.1880, lng: 72.6280, pincode: "382007" },
          { name: "Gandhinagar Sector 21, Town Hall & CH Road", location: "Sector 21, Gandhinagar", lat: 23.2300, lng: 72.6500, pincode: "382021" },
          { name: "PDPU Road, Bhaijipura & Raysan", location: "PDPU High Street, Raysan, Gandhinagar", lat: 23.1550, lng: 72.6620, pincode: "382007" }
        ]
      },
      {
        name: "Surat",
        cities: [
          { name: "Surat Vesu, VIP Road & University Road Belt", location: "Vesu Main Road, Surat", lat: 21.1400, lng: 72.7700, pincode: "395007" },
          { name: "Surat Airport (STV) & Dumas Road Hub", location: "Dumas Road, Magdalla, Surat", lat: 21.1140, lng: 72.7420, pincode: "395007" },
          { name: "Surat Adajan, L.P. Savani Road & Honey Park", location: "L.P. Savani Road, Adajan, Surat", lat: 21.1980, lng: 72.7950, pincode: "395009" },
          { name: "Surat Ring Road, Textile Market & Millennium Market", location: "Ring Road, Salabatpura, Surat", lat: 21.1900, lng: 72.8300, pincode: "395002" },
          { name: "Surat Piplod, VR Mall & Rahul Raj Mall Corridor", location: "Gawchar Chowk, Piplod, Surat", lat: 21.1550, lng: 72.7680, pincode: "395007" },
          { name: "Surat Varachha, Hirabaug & Diamond Market Hub", location: "Varachha Main Road, Surat", lat: 21.2180, lng: 72.8550, pincode: "395006" }
        ]
      },
      {
        name: "Vadodara",
        cities: [
          { name: "Vadodara Alkapuri, RC Dutt Road & Productivity Road", location: "RC Dutt Road, Alkapuri, Vadodara", lat: 22.3100, lng: 73.1700, pincode: "390007" },
          { name: "Vadodara Airport (BDQ) & Harni Main Road", location: "Harni Airport Area, Vadodara", lat: 22.3330, lng: 73.2260, pincode: "390022" },
          { name: "Vadodara Sayajigunj, Station Road & MS University", location: "Station Road, Sayajigunj, Vadodara", lat: 22.3180, lng: 73.1880, pincode: "390020" },
          { name: "Vadodara Fatehgunj, Seven Seas Mall & Camp Area", location: "Fatehgunj Main Road, Vadodara", lat: 22.3280, lng: 73.1860, pincode: "390002" },
          { name: "Vadodara Gotri, Vasna Road & Bhaili Station", location: "Gotri Main Road, Vadodara", lat: 22.3150, lng: 73.1380, pincode: "390021" }
        ]
      },
      {
        name: "Rajkot",
        cities: [
          { name: "Rajkot Race Course Ring Road, Yagnik Road & Zaveri Bazar", location: "Race Course Road, Rajkot", lat: 22.3000, lng: 70.7900, pincode: "360001" },
          { name: "Rajkot Kalawad Road, Kotecha Chowk & University Road", location: "Kalawad Road, Rajkot", lat: 22.2800, lng: 70.7700, pincode: "360005" },
          { name: "Rajkot 150 Feet Ring Road, Mavdi Chowkdi & Speedwell", location: "150 Feet Ring Road, Rajkot", lat: 22.2680, lng: 70.7850, pincode: "360004" },
          { name: "Rajkot Hirasar Airport Hub & Greenfield Expressway", location: "Hirasar International Airport, Rajkot", lat: 22.3700, lng: 71.0200, pincode: "360023" }
        ]
      },
      {
        name: "Other Major Gujarat Cities & Hubs",
        cities: [
          { name: "Bhavnagar Waghawadi Road & Takhteshwar Temple", location: "Waghawadi Road, Bhavnagar", lat: 21.7645, lng: 72.1519, pincode: "364002" },
          { name: "Jamnagar Imperial Hub, Digvijay Plot & Lakhota Lake", location: "Digvijay Plot, Jamnagar", lat: 22.4707, lng: 70.0577, pincode: "361001" },
          { name: "Anand Milk City & V.V. Nagar Educational Hub", location: "Anand-Vidyanagar Road, Anand", lat: 22.5645, lng: 72.9289, pincode: "388001" },
          { name: "Bharuch Zadeshwar Road & Narmada Bridge Hub", location: "Zadeshwar Road, Bharuch", lat: 21.7051, lng: 72.9959, pincode: "392011" },
          { name: "Vapi GIDC & Silvassa Border Hub", location: "GIDC Main Road, Vapi", lat: 20.3720, lng: 72.9040, pincode: "396195" }
        ]
      }
    ]
  }
};

// Helper Functions
function getAvailableStates() {
  return Object.keys(INDIA_LOCATIONS_DATA);
}

function getDistrictsForState(stateName) {
  const stateData = INDIA_LOCATIONS_DATA[stateName] || INDIA_LOCATIONS_DATA["Maharashtra"];
  return stateData ? stateData.districts : [];
}

function getCitiesForDistrict(stateName, districtName) {
  const districts = getDistrictsForState(stateName);
  const distObj = districts.find(d => d.name === districtName) || districts[0];
  if (!distObj) return [];
  return distObj.cities || [];
}

function findCityLocationObject(stateName, districtName, cityName) {
  const cities = getCitiesForDistrict(stateName, districtName);
  return cities.find(c => c.name === cityName) || cities[0];
}
