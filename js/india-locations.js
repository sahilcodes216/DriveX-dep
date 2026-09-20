// DriveX Location Database — State → City (No District)
// Each state maps directly to its available cities.

const INDIA_LOCATIONS_DATA = {

  "Karnataka": {
    cities: [
      { name: "Bengaluru", location: "Bengaluru, Karnataka", lat: 12.9716, lng: 77.5946, pincode: "560001" }
    ]
  },

  "Maharashtra": {
    cities: [
      { name: "Mumbai", location: "Mumbai, Maharashtra", lat: 19.0760, lng: 72.8777, pincode: "400001" },
      { name: "Pune", location: "Pune, Maharashtra", lat: 18.5204, lng: 73.8567, pincode: "411001" }
    ]
  },

  "Telangana": {
    cities: [
      { name: "Hyderabad", location: "Hyderabad, Telangana", lat: 17.3850, lng: 78.4867, pincode: "500001" }
    ]
  },

  "Tamil Nadu": {
    cities: [
      { name: "Chennai", location: "Chennai, Tamil Nadu", lat: 13.0827, lng: 80.2707, pincode: "600001" }
    ]
  },

  "West Bengal": {
    cities: [
      { name: "Kolkata", location: "Kolkata, West Bengal", lat: 22.5726, lng: 88.3639, pincode: "700001" }
    ]
  },

  "Delhi (NCR)": {
    cities: [
      { name: "New Delhi", location: "New Delhi, Delhi", lat: 28.6139, lng: 77.2090, pincode: "110001" },
      { name: "Gurugram", location: "Gurugram, Haryana", lat: 28.4595, lng: 77.0266, pincode: "122001" },
      { name: "Noida", location: "Noida, Uttar Pradesh", lat: 28.5355, lng: 77.3910, pincode: "201301" }
    ]
  },

  "Gujarat": {
    cities: [
      { name: "Ahmedabad", location: "Ahmedabad, Gujarat", lat: 23.0225, lng: 72.5714, pincode: "380001" }
    ]
  },

  "Rajasthan": {
    cities: [
      { name: "Jaipur", location: "Jaipur, Rajasthan", lat: 26.9124, lng: 75.7873, pincode: "302001" },
      { name: "Udaipur", location: "Udaipur, Rajasthan", lat: 24.5854, lng: 73.7125, pincode: "313001" }
    ]
  },

  "Kerala": {
    cities: [
      { name: "Kochi", location: "Kochi, Kerala", lat: 9.9312, lng: 76.2673, pincode: "682001" }
    ]
  },

  "Punjab": {
    cities: [
      { name: "Chandigarh", location: "Chandigarh", lat: 30.7333, lng: 76.7794, pincode: "160001" }
    ]
  },

  "Madhya Pradesh": {
    cities: [
      { name: "Indore", location: "Indore, Madhya Pradesh", lat: 22.7196, lng: 75.8577, pincode: "452001" }
    ]
  },

  "Uttar Pradesh": {
    cities: [
      { name: "Lucknow", location: "Lucknow, Uttar Pradesh", lat: 26.8467, lng: 80.9462, pincode: "226001" },
      { name: "Agra", location: "Agra, Uttar Pradesh", lat: 27.1767, lng: 78.0081, pincode: "282001" },
      { name: "Varanasi", location: "Varanasi, Uttar Pradesh", lat: 25.3176, lng: 82.9739, pincode: "221001" }
    ]
  },

  "Uttarakhand": {
    cities: [
      { name: "Dehradun", location: "Dehradun, Uttarakhand", lat: 30.3165, lng: 78.0322, pincode: "248001" },
      { name: "Rishikesh", location: "Rishikesh, Uttarakhand", lat: 30.0869, lng: 78.2676, pincode: "249201" }
    ]
  },

  "Goa": {
    cities: [
      { name: "North Goa", location: "North Goa, Goa", lat: 15.5499, lng: 73.8173, pincode: "403001" },
      { name: "South Goa", location: "South Goa, Goa", lat: 15.1765, lng: 74.0096, pincode: "403710" }
    ]
  }

};

// ─── Helper Functions ──────────────────────────────────────────────────────────

/** Returns list of all available state names */
function getAvailableStates() {
  return Object.keys(INDIA_LOCATIONS_DATA);
}

/** Returns all cities for a given state (flat list, no districts) */
function getCitiesForState(stateName) {
  const stateData = INDIA_LOCATIONS_DATA[stateName];
  if (!stateData) return [];
  return stateData.cities || [];
}

/** Kept for backward-compatibility; ignores districtName */
function getDistrictsForState(stateName) {
  // No districts anymore — return a single pseudo-district with all cities
  const cities = getCitiesForState(stateName);
  return [{ name: stateName, cities }];
}

/** Kept for backward-compatibility; ignores districtName */
function getCitiesForDistrict(stateName, districtName) {
  return getCitiesForState(stateName);
}

/** Find a specific city object by state + city name */
function findCityLocationObject(stateName, districtName, cityName) {
  const cities = getCitiesForState(stateName);
  return cities.find(c => c.name === cityName) || cities[0];
}
