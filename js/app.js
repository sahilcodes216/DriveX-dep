// Drivena Vehicle Rental Platform - India Operations App Logic

let appState = {
  currentUser: {
    name: "Aarav Sharma",
    phone: "9876543210",
    email: "aarav.sharma@drivex.in",
    isLoggedIn: false,
    otpCodeSent: null
  },
  activeView: "home",
  selectedCategory: "scooty",
  searchQuery: "",
  sortBy: "popular",
  
  // Location State (Delhi NCR, Maharashtra & Gujarat)
  location: {
    selectedState: "Maharashtra",
    selectedDistrict: "Mumbai City",
    selectedCity: "Mumbai Downtown",
    lat: 19.0760,
    lng: 72.8777,
    formattedAddress: "Marine Drive, Nariman Point, Mumbai, Maharashtra 400021",
    pincode: "400021",
    landmark: "Near Trident Hotel"
  },
  
  booking: {
    vehicle: FLEET_DATA[0],
    rentalMode: "daily", // 'daily' or 'hourly'
    selectedHours: 6,
    pickupCity: "Mumbai Downtown",
    pickupDate: getTomorrowDateString(1),
    pickupTime: "10:00 AM",
    returnDate: getTomorrowDateString(4),
    returnTime: "10:00 AM",
    deliveryType: "doorstep", // 'doorstep' or 'self'
    address: {
      flatNo: "Flat 402, Sea View Apartments",
      street: "Marine Drive, Nariman Point",
      city: "Mumbai Downtown",
      district: "Mumbai City",
      state: "Maharashtra",
      pincode: "400021",
      landmark: "Near Trident Hotel"
    },
    protectionPlan: PROTECTION_PLANS[1], // default Zero Liability
    selectedAddons: ["doorstep", "gps"],
    coupon: null,
    paymentMethod: "upi_qr", // 'upi_qr', 'card', 'netbanking', 'cod'
    upiId: "aarav@okaxis",
    undertaking: {
      agreed: false,
      customerName: "Aarav Sharma",
      mobileNumber: "9876543210",
      address: "Marine Drive, Nariman Point, Mumbai, Maharashtra 400021",
      dlNumber: "MH-0120230045678",
      idProofNumber: "4521 8890 1234",
      vehicleType: "Car",
      vehicleRegNo: "MH-01-DR-8899",
      startDate: "",
      returnDate: "",
      date: new Date().toISOString().split('T')[0],
      companyName: "DriveX Mobility Pvt. Ltd.",
      customerSignature: "Aarav Sharma",
      aadharPhoto: null,
      dlPhoto: null
    }
  },

  myBookings: [
    {
      bookingId: "DRV-IN-9842-X",
      dateCreated: "2026-08-22",
      vehicle: FLEET_DATA[0],
      pickupDate: "2026-08-28",
      returnDate: "2026-08-31",
      pickupCity: "Mumbai Downtown",
      status: "Confirmed",
      deliveryType: "Doorstep Delivery",
      totalAmount: 8945.00,
      paymentMethod: "UPI Instant (PhonePe / GPay)"
    }
  ],

  complaints: [],
  vehicleReviews: {},

  mapInstance: null,
  markerInstance: null,
  otpTimerInterval: null,
  upiTimerInterval: null
};

// Helper Date function
function getTomorrowDateString(offsetDays = 1) {
  const d = new Date();
  d.setDate(d.getDate() + offsetDays);
  return d.toISOString().split('T')[0];
}

// DOM Initialization
document.addEventListener("DOMContentLoaded", () => {
  loadVehicleCustomizations();
  loadVehicleReviewsStore();
  initRouting();
  initPanIndiaLocationSelectors();
  renderFeaturedFleet();
  renderFleetCatalog();
  renderMyBookings();
  updateBookingCalculation();
  initEventListeners();
});

// Hamburger Menu Drawer Logic
function toggleHamburgerMenu() {
  const drawer = document.getElementById("hamburger-drawer");
  if (!drawer) return;
  const isOpen = !drawer.classList.contains("-translate-x-full");
  if (isOpen) {
    closeHamburgerMenu();
  } else {
    openHamburgerMenu();
  }
}

function openHamburgerMenu() {
  const overlay = document.getElementById("hamburger-drawer-overlay");
  const drawer = document.getElementById("hamburger-drawer");
  if (overlay) overlay.classList.remove("hidden");
  if (drawer) drawer.classList.remove("-translate-x-full");
}

function closeHamburgerMenu() {
  const overlay = document.getElementById("hamburger-drawer-overlay");
  const drawer = document.getElementById("hamburger-drawer");
  if (drawer) drawer.classList.add("-translate-x-full");
  if (overlay) overlay.classList.add("hidden");
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeHamburgerMenu();
  }
});

// Routing System
function navigateTo(viewId) {
  appState.activeView = viewId;
  
  document.querySelectorAll(".view-section").forEach(sec => sec.classList.add("hidden"));
  
  const targetSec = document.getElementById(`view-${viewId}`);
  if (targetSec) {
    targetSec.classList.remove("hidden");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  document.querySelectorAll(".nav-link").forEach(link => {
    if (link.dataset.view === viewId) {
      link.classList.add("text-secondary", "font-bold", "bg-secondary/10");
      link.classList.remove("text-on-surface-variant");
    } else {
      link.classList.remove("text-secondary", "font-bold", "bg-secondary/10");
      link.classList.add("text-on-surface-variant");
    }
  });
}

function initRouting() {
  document.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetView = link.dataset.view;
      if (targetView) navigateTo(targetView);
    });
  });
}

// Location Selector & Google Maps Cascading Logic
function initPanIndiaLocationSelectors() {
  const stateSelects = document.querySelectorAll(".india-state-select");
  
  stateSelects.forEach(stateSelect => {
    // Populate States (Delhi (NCR), Maharashtra, Gujarat)
    stateSelect.innerHTML = getAvailableStates().map(st => 
      `<option value="${st}" ${st === appState.location.selectedState ? 'selected' : ''}>${st}</option>`
    ).join("");

    stateSelect.addEventListener("change", (e) => {
      appState.location.selectedState = e.target.value;
      updateDistrictAndCityDropdowns();
    });
  });

  updateDistrictAndCityDropdowns();
}

function updateDistrictAndCityDropdowns() {
  const stateName = appState.location.selectedState || "Maharashtra";
  const districts = getDistrictsForState(stateName);
  
  let currentDistObj = districts.find(d => d.name === appState.location.selectedDistrict);
  if (!currentDistObj && districts.length > 0) {
    currentDistObj = districts[0];
    appState.location.selectedDistrict = currentDistObj.name;
  }
  
  // District Dropdown
  const districtSelects = document.querySelectorAll(".india-district-select");
  districtSelects.forEach(districtSelect => {
    districtSelect.innerHTML = districts.map(dist => 
      `<option value="${dist.name}" ${dist.name === appState.location.selectedDistrict ? 'selected' : ''}>${dist.name}</option>`
    ).join("");

    districtSelect.onchange = (e) => {
      appState.location.selectedDistrict = e.target.value;
      updateCityDropdownForCurrentDistrict();
    };
  });

  updateCityDropdownForCurrentDistrict();
}

function updateCityDropdownForCurrentDistrict() {
  const stateName = appState.location.selectedState || "Maharashtra";
  const districtName = appState.location.selectedDistrict;
  const cities = getCitiesForDistrict(stateName, districtName);

  let currentCityObj = cities.find(c => c.name === appState.location.selectedCity);
  if (!currentCityObj && cities.length > 0) {
    currentCityObj = cities[0];
    appState.location.selectedCity = currentCityObj.name;
  }

  // City Dropdown
  const citySelects = document.querySelectorAll(".india-city-select");
  citySelects.forEach(citySelect => {
    citySelect.innerHTML = cities.map(city => 
      `<option value="${city.name}" ${city.name === appState.location.selectedCity ? 'selected' : ''}>${city.name}</option>`
    ).join("");

    citySelect.onchange = (e) => {
      selectCityLocation(e.target.value);
    };
  });

  if (currentCityObj) {
    selectCityLocation(currentCityObj.name, false);
  }
}

function selectCityLocation(cityName, triggerToast = true) {
  const stateName = appState.location.selectedState || "Maharashtra";
  const districtName = appState.location.selectedDistrict;
  const cityObj = findCityLocationObject(stateName, districtName, cityName);

  if (!cityObj) return;

  appState.location.selectedCity = cityObj.name;
  appState.location.lat = cityObj.lat;
  appState.location.lng = cityObj.lng;
  appState.location.formattedAddress = cityObj.location;
  if (cityObj.pincode) appState.location.pincode = cityObj.pincode;

  appState.booking.pickupCity = cityObj.name;

  setText("active-header-city", cityObj.name);
  const locBtn = document.getElementById("active-location-btn");
  if (locBtn) locBtn.title = `Location: ${cityObj.name} (Click to change)`;

  // Update Map Position if map initialized
  if (appState.mapInstance && appState.markerInstance) {
    appState.mapInstance.setView([cityObj.lat, cityObj.lng], 14);
    appState.markerInstance.setLatLng([cityObj.lat, cityObj.lng]);
  }

  updateMapLocationAddress(cityObj.lat, cityObj.lng);

  if (triggerToast) {
    showToast(`Location set to ${cityObj.name}`);
  }
}

// Leaflet Interactive Map Initialization
function initLocationPickerMap() {
  const mapContainer = document.getElementById("leaflet-location-map");
  if (!mapContainer) return;

  const defaultLat = appState.location.lat || 19.0760;
  const defaultLng = appState.location.lng || 72.8777;

  if (appState.mapInstance) {
    setTimeout(() => {
      appState.mapInstance.invalidateSize();
      appState.mapInstance.setView([appState.location.lat, appState.location.lng], 13);
      if (appState.markerInstance) {
        appState.markerInstance.setLatLng([appState.location.lat, appState.location.lng]);
      }
    }, 150);
    return;
  }

  // Create Leaflet Map
  appState.mapInstance = L.map('leaflet-location-map', {
    zoomControl: true,
    scrollWheelZoom: true
  }).setView([defaultLat, defaultLng], 13);

  // Reliable Google Maps Road Layer (Crisp Indian street names, landmarks, dual labels, zero 403 blocks)
  const googleRoadLayer = L.tileLayer('https://mt{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    maxZoom: 20,
    subdomains: ['0', '1', '2', '3'],
    attribution: '&copy; Google Maps'
  });

  // CartoDB Voyager Layer (High-contrast clean streets, free and unblocked)
  const cartoVoyagerLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    subdomains: 'abcd',
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
  });

  // Esri Satellite Imagery Layer
  const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 19,
    attribution: 'Tiles &copy; Esri World Imagery'
  });

  // Add Google Road Layer as default
  googleRoadLayer.addTo(appState.mapInstance);

  // Automatic tile fallback: If Google tile ever fails, load Carto Voyager
  googleRoadLayer.on('tileerror', function(error, tile) {
    if (error && error.coords) {
      tile.src = `https://a.basemaps.cartocdn.com/rastertiles/voyager/${error.coords.z}/${error.coords.x}/${error.coords.y}.png`;
    }
  });

  // Add Layer Selector in top-right
  const baseMaps = {
    "🗺️ Google Road": googleRoadLayer,
    "🏙️ Clean Streets": cartoVoyagerLayer,
    "🛰️ Satellite": satelliteLayer
  };
  L.control.layers(baseMaps, null, { position: 'topright' }).addTo(appState.mapInstance);

  // Custom Car Marker Icon
  const carIcon = L.divIcon({
    className: 'custom-map-pin',
    html: `<div style="background: #fb7800; color: white; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 14px rgba(251,120,0,0.5); border: 2px solid white; cursor: grab;">
            <span class="material-symbols-outlined" style="font-size: 24px;">home_pin</span>
           </div>`,
    iconSize: [40, 40],
    iconAnchor: [20, 40]
  });

  // Add Draggable Marker
  appState.markerInstance = L.marker([defaultLat, defaultLng], {
    draggable: true,
    icon: carIcon
  }).addTo(appState.mapInstance);

  appState.markerInstance.bindTooltip("📍 Drag pin to exact doorstep", { permanent: false, direction: 'top' });

  // Marker Drag End Listener
  appState.markerInstance.on('dragend', function (e) {
    const coord = e.target.getLatLng();
    updateMapLocationAddress(coord.lat, coord.lng);
  });

  // Map Click Listener
  appState.mapInstance.on('click', function(e) {
    appState.markerInstance.setLatLng(e.latlng);
    updateMapLocationAddress(e.latlng.lat, e.latlng.lng);
  });
}

function updateMapLocationAddress(lat, lng) {
  appState.location.lat = lat;
  appState.location.lng = lng;

  const activeCity = appState.location.selectedCity || "Location";
  setText("map-coords-display", `GPS Pin: ${lat.toFixed(4)}, ${lng.toFixed(4)} (${activeCity})`);
}

function detectCurrentGPSLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      
      if (appState.mapInstance && appState.markerInstance) {
        appState.mapInstance.setView([lat, lng], 15);
        appState.markerInstance.setLatLng([lat, lng]);
      }
      updateMapLocationAddress(lat, lng);
      showToast("Current GPS Location Detected!");
    }, () => {
      showToast("Location permission denied. Using default Indian Hub location.", "error");
    });
  } else {
    showToast("Geolocation is not supported by your browser.", "error");
  }
}

// REAL SMS Phone OTP Authentication Flow (Firebase-powered with demo fallback)
let otpDemoMode = false; // Will be true if Firebase is not configured

async function sendRealSmsOtp() {
  const phoneInput = document.getElementById("user-phone-input");
  if (!phoneInput) return;

  const phone = phoneInput.value.trim().replace(/\s/g, '');
  if (phone.length < 10 || !/^\d{10}$/.test(phone)) {
    showLoginError("Please enter a valid 10-digit mobile number.");
    return;
  }

  // Clear previous errors
  hideLoginError();
  hideOtpError();

  // Show loading state
  setOtpSendLoading(true);

  appState.currentUser.phone = phone;

  // Try Firebase first, fallback to demo
  if (typeof isFirebaseConfigured !== 'undefined' && isFirebaseConfigured) {
    try {
      await sendFirebaseOtp(phone);
      otpDemoMode = false;
      setOtpSendLoading(false);
      openOtpModal(phone, null);
      showToast(`Real SMS OTP sent to +91 ${phone}! Check your messages.`);
    } catch (error) {
      setOtpSendLoading(false);
      showLoginError(error.message);
    }
  } else {
    // Demo mode: generate random OTP and show it
    otpDemoMode = true;
    const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
    appState.currentUser.otpCodeSent = generatedOtp;

    // Simulate network delay
    setTimeout(() => {
      setOtpSendLoading(false);
      openOtpModal(phone, generatedOtp);
      showToast(`Demo OTP sent to +91 ${phone}! Code: ${generatedOtp}`);
    }, 800);
  }
}

function openOtpModal(phone, demoOtp) {
  const modal = document.getElementById("otp-modal");
  if (!modal) return;

  // Set phone display
  const phoneDisplay = document.getElementById("otp-sent-phone-display");
  if (phoneDisplay) phoneDisplay.textContent = `+91 ${phone}`;

  // Set banner based on mode
  const banner = document.getElementById("otp-real-simulated-banner");
  if (banner) {
    if (otpDemoMode && demoOtp) {
      banner.className = "bg-amber-50 border border-amber-200 text-amber-800 text-xs font-bold py-2.5 px-3 rounded-xl mb-4 text-center flex items-center justify-center gap-1.5";
      banner.innerHTML = `
        <span class="material-symbols-outlined text-sm text-amber-600">info</span>
        <span>Demo Mode — Your OTP is: <strong class="text-base tracking-widest">${demoOtp}</strong></span>
      `;
    } else {
      banner.className = "bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold py-2.5 px-3 rounded-xl mb-4 text-center flex items-center justify-center gap-1.5";
      banner.innerHTML = `
        <span class="material-symbols-outlined text-sm text-emerald-600">check_circle</span>
        <span>Real SMS sent successfully! Check your phone for the OTP.</span>
      `;
    }
  }

  // Clear OTP inputs
  const otpInputs = document.querySelectorAll(".otp-digit-input");
  otpInputs.forEach(inp => { inp.value = ""; });

  // Hide any previous errors
  hideOtpError();

  // Close login modal, open OTP modal
  closeLoginModal();
  modal.classList.remove("hidden");

  // Focus first OTP input
  setTimeout(() => {
    const firstInput = document.querySelector(".otp-digit-input");
    if (firstInput) firstInput.focus();
  }, 300);

  startOtpTimer(60);
}

function closeOtpModal() {
  const modal = document.getElementById("otp-modal");
  if (modal) modal.classList.add("hidden");
  if (appState.otpTimerInterval) clearInterval(appState.otpTimerInterval);
}

function startOtpTimer(seconds) {
  if (appState.otpTimerInterval) clearInterval(appState.otpTimerInterval);
  let left = seconds;
  const timerText = document.getElementById("otp-resend-timer");

  appState.otpTimerInterval = setInterval(() => {
    left--;
    if (timerText) timerText.innerText = `Resend OTP in ${left}s`;
    if (left <= 0) {
      clearInterval(appState.otpTimerInterval);
      if (timerText) timerText.innerHTML = `<button onclick="resendOtp()" class="text-secondary font-bold underline hover:text-secondary-hover transition-all">Resend OTP</button>`;
    }
  }, 1000);
}

function resendOtp() {
  closeOtpModal();
  openLoginModal();
  // Pre-fill phone number
  setTimeout(() => {
    const phoneInput = document.getElementById("user-phone-input");
    if (phoneInput && appState.currentUser.phone) {
      phoneInput.value = appState.currentUser.phone;
    }
  }, 100);
}

async function verifyOtpSubmit() {
  const inputs = document.querySelectorAll(".otp-digit-input");
  let enteredOtp = "";
  inputs.forEach(inp => enteredOtp += inp.value);

  if (enteredOtp.length !== 6) {
    showOtpError("Please enter the complete 6-digit OTP code.");
    return;
  }

  // Hide previous errors
  hideOtpError();
  setOtpVerifyLoading(true);

  if (!otpDemoMode && typeof verifyFirebaseOtp === 'function') {
    // Real Firebase verification
    try {
      const result = await verifyFirebaseOtp(enteredOtp);
      setOtpVerifyLoading(false);
      handleSuccessfulVerification(result.phoneNumber || `+91${appState.currentUser.phone}`, result.uid);
    } catch (error) {
      setOtpVerifyLoading(false);
      showOtpError(error.message);

      // Shake animation on OTP inputs
      inputs.forEach(inp => {
        inp.classList.add("ring-2", "ring-rose-400");
        setTimeout(() => inp.classList.remove("ring-2", "ring-rose-400"), 2000);
      });
    }
  } else {
    // Demo mode verification
    setTimeout(() => {
      setOtpVerifyLoading(false);
      if (enteredOtp === appState.currentUser.otpCodeSent || enteredOtp === "123456") {
        handleSuccessfulVerification(`+91${appState.currentUser.phone}`, `demo_${Date.now()}`);
      } else {
        showOtpError("Incorrect OTP code! Please check and try again.");
        inputs.forEach(inp => {
          inp.classList.add("ring-2", "ring-rose-400");
          setTimeout(() => inp.classList.remove("ring-2", "ring-rose-400"), 2000);
        });
      }
    }, 600);
  }
}

function handleSuccessfulVerification(phoneNumber, uid) {
  closeOtpModal();
  closeLoginModal();
  appState.currentUser.isLoggedIn = true;
  appState.currentUser.uid = uid;

  // Save user profile to Firestore (if configured)
  if (typeof saveUserToFirestore === 'function' && typeof isFirebaseConfigured !== 'undefined' && isFirebaseConfigured) {
    saveUserToFirestore({
      phone: appState.currentUser.phone,
      uid: uid,
      name: appState.currentUser.name
    }).catch(err => console.error("[DriveX Firebase] User save error:", err));
  }

  // Update Profile UI
  const loginBtn = document.getElementById("header-login-btn");
  if (loginBtn) {
    loginBtn.innerHTML = `
      <span class="material-symbols-outlined text-sm">verified_user</span>
      +91 ${appState.currentUser.phone.slice(-4)}
    `;
    loginBtn.className = "bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-4 py-2 rounded-full shadow-md flex items-center gap-1.5 transition-all";
    loginBtn.onclick = () => {
      showToast(`Logged in as +91 ${appState.currentUser.phone}`, "info");
    };
  }

  showToast("✅ Phone Verified Successfully! Welcome to DriveX.");
}

// OTP Input Handlers (auto-focus, backspace, paste, auto-submit)
function handleOtpInput(input, index) {
  // Allow only digits
  input.value = input.value.replace(/[^0-9]/g, '');

  const inputs = document.querySelectorAll(".otp-digit-input");

  if (input.value.length === 1 && index < inputs.length - 1) {
    inputs[index + 1].focus();
  }

  // Auto-submit when all 6 digits are filled
  let fullOtp = '';
  inputs.forEach(inp => fullOtp += inp.value);
  if (fullOtp.length === 6) {
    // Small delay for visual feedback
    setTimeout(() => verifyOtpSubmit(), 300);
  }
}

function handleOtpKeydown(event, index) {
  const inputs = document.querySelectorAll(".otp-digit-input");

  // Backspace: move to previous input
  if (event.key === 'Backspace' && !inputs[index].value && index > 0) {
    inputs[index - 1].focus();
    inputs[index - 1].select();
  }

  // Arrow keys
  if (event.key === 'ArrowLeft' && index > 0) {
    event.preventDefault();
    inputs[index - 1].focus();
  }
  if (event.key === 'ArrowRight' && index < inputs.length - 1) {
    event.preventDefault();
    inputs[index + 1].focus();
  }

  // Handle paste
  if (event.key === 'v' && (event.ctrlKey || event.metaKey)) {
    event.preventDefault();
    navigator.clipboard.readText().then(text => {
      const digits = text.replace(/[^0-9]/g, '').slice(0, 6);
      digits.split('').forEach((digit, i) => {
        if (inputs[i]) inputs[i].value = digit;
      });
      if (digits.length === 6) {
        inputs[5].focus();
        setTimeout(() => verifyOtpSubmit(), 300);
      }
    }).catch(() => {});
  }
}

// Loading & Error UI Helpers
function setOtpSendLoading(loading) {
  const btn = document.getElementById("send-otp-btn");
  const content = document.getElementById("send-otp-btn-content");
  const loader = document.getElementById("send-otp-btn-loading");
  if (btn) btn.disabled = loading;
  if (content) content.classList.toggle("hidden", loading);
  if (loader) loader.classList.toggle("hidden", !loading);
}

function setOtpVerifyLoading(loading) {
  const btn = document.getElementById("verify-otp-btn");
  const content = document.getElementById("verify-otp-btn-content");
  const loader = document.getElementById("verify-otp-btn-loading");
  if (btn) btn.disabled = loading;
  if (content) content.classList.toggle("hidden", loading);
  if (loader) loader.classList.toggle("hidden", !loading);
}

function showLoginError(message) {
  const display = document.getElementById("login-error-display");
  const text = document.getElementById("login-error-text");
  if (display) display.classList.remove("hidden");
  if (text) text.textContent = message;
}

function hideLoginError() {
  const display = document.getElementById("login-error-display");
  if (display) display.classList.add("hidden");
}

function showOtpError(message) {
  const display = document.getElementById("otp-error-display");
  const text = document.getElementById("otp-error-text");
  if (display) display.classList.remove("hidden");
  if (text) text.textContent = message;
}

function hideOtpError() {
  const display = document.getElementById("otp-error-display");
  if (display) display.classList.add("hidden");
}

// Quick Select Hero Category from Banner Island
function quickSelectHeroCategory(cat) {
  const heroSelect = document.getElementById("hero-category-select");
  if (heroSelect) {
    heroSelect.value = cat;
  }

  // Update visual state of category pills
  document.querySelectorAll(".hero-cat-pill").forEach(p => {
    p.classList.remove("border-secondary", "bg-white/25", "ring-2", "ring-secondary/50");
    p.classList.add("bg-white/10", "border-white/20");
  });

  const activePill = document.getElementById(`hero-pill-${cat}`);
  if (activePill) {
    activePill.classList.remove("bg-white/10", "border-white/20");
    activePill.classList.add("border-secondary", "bg-white/25", "ring-2", "ring-secondary/50");
  }

  const catNames = {
    scooty: "🛵 Scooties (Petrol & Electric)",
    bike: "🏍️ Bikes (Royal Enfield, Yamaha, KTM)",
    cars: "🚗 Cars & SUVs (Thar, Creta, Nexon EV)"
  };
  showToast(`Selected: ${catNames[cat] || cat}`);
}

// Hero Search Handler
function handleHeroSearch() {
  const heroSelect = document.getElementById("hero-category-select");
  if (heroSelect) {
    const cat = heroSelect.value;
    filterCategory(cat);
  }
  navigateTo("fleet");
}

// Fleet Rendering
function renderFeaturedFleet() {
  const container = document.getElementById("featured-fleet-container");
  if (!container) return;
  
  const countEl = document.getElementById("featured-catalog-count");
  if (countEl && typeof FLEET_DATA !== "undefined") {
    countEl.textContent = FLEET_DATA.length;
  }

  const featured = FLEET_DATA.filter(v => v.featured).slice(0, 3);
  container.innerHTML = featured.map(v => createVehicleCardHtml(v)).join("");
}

function renderFleetCatalog() {
  const container = document.getElementById("fleet-catalog-container");
  if (!container) return;

  const rawQuery = appState.searchQuery.toLowerCase().trim();

  let filtered = FLEET_DATA.filter(v => {
    // Check search query category intent
    let matchesCategoryIntent = false;
    let isCategoryQuery = false;

    if (["scooty", "scooties", "scooter", "scooters"].includes(rawQuery)) {
      isCategoryQuery = true;
      matchesCategoryIntent = (v.category === "scooty");
    } else if (["bike", "bikes", "motorcycle", "motorcycles"].includes(rawQuery)) {
      isCategoryQuery = true;
      matchesCategoryIntent = (v.category === "bike");
    } else if (["car", "cars", "automobile", "automobiles"].includes(rawQuery)) {
      isCategoryQuery = true;
      matchesCategoryIntent = (v.category === "cars");
    }

    // Selected category pill/dropdown filter
    const matchesCat = appState.selectedCategory === "all" || v.category === appState.selectedCategory;

    // Search query filter:
    let matchesSearch = true;
    if (rawQuery !== "") {
      if (isCategoryQuery) {
        matchesSearch = matchesCategoryIntent;
      } else if (rawQuery === "ev" || rawQuery === "electric") {
        matchesSearch = v.fuelType === "Electric";
      } else {
        matchesSearch = v.name.toLowerCase().includes(rawQuery) ||
                        v.categoryLabel.toLowerCase().includes(rawQuery) ||
                        v.fuelType.toLowerCase().includes(rawQuery) ||
                        (v.tag && v.tag.toLowerCase().includes(rawQuery));
      }
    }

    return matchesCat && matchesSearch;
  });

  if (appState.sortBy === "price_low") {
    filtered.sort((a, b) => a.pricePerDay - b.pricePerDay);
  } else if (appState.sortBy === "price_high") {
    filtered.sort((a, b) => b.pricePerDay - a.pricePerDay);
  } else if (appState.sortBy === "rating") {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="col-span-full text-center py-16 bg-surface-container-low rounded-2xl border border-outline-variant">
        <span class="material-symbols-outlined text-5xl text-outline mb-2">search_off</span>
        <h3 class="font-headline font-bold text-lg text-primary">No Vehicles Found</h3>
        <p class="text-on-surface-variant text-sm mt-1">Try searching for "scooty", "bike", "car", "Activa", or "Thar".</p>
        <button onclick="filterCategory('scooty'); document.getElementById('fleet-search-input').value=''; appState.searchQuery='';" class="mt-4 bg-primary text-on-primary px-5 py-2.5 rounded-full font-semibold text-xs shadow-md">Reset Search Filters</button>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(v => createVehicleCardHtml(v)).join("");
}

// Vehicle Card Customization Store Manager
function loadVehicleCustomizations() {
  try {
    const saved = localStorage.getItem("drivena_customized_vehicles");
    FLEET_DATA.forEach(v => {
      if (!v.originalName) v.originalName = v.name;
      if (!v.originalPricePerDay) v.originalPricePerDay = v.pricePerDay;
      if (!v.originalPricePerHour) v.originalPricePerHour = v.pricePerHour;
    });

    if (saved) {
      const store = JSON.parse(saved);
      FLEET_DATA.forEach(v => {
        if (store[v.id]) {
          v.customName = store[v.id].customName || null;
          if (v.customName) v.name = v.customName;

          v.customPricePerDay = store[v.id].customPricePerDay || null;
          if (v.customPricePerDay) v.pricePerDay = v.customPricePerDay;

          v.customPricePerHour = store[v.id].customPricePerHour || null;
          if (v.customPricePerHour) v.pricePerHour = v.customPricePerHour;

          v.customImage = store[v.id].customImage || null;
          v.customTag = store[v.id].customTag || null;
          v.customText = store[v.id].customText || null;
          v.customRegNo = store[v.id].customRegNo || null;
          v.isCustomized = !!(v.customName || v.customImage || v.customTag || v.customText || v.customRegNo || v.customPricePerDay || v.customPricePerHour);
        }
      });
    }
  } catch (e) {
    console.error("Failed to load vehicle customizations", e);
  }
}

function saveCustomizedVehiclesStore() {
  try {
    const store = {};
    FLEET_DATA.forEach(v => {
      if (v.customName || v.customImage || v.customTag || v.customText || v.customRegNo || v.customPricePerDay || v.customPricePerHour) {
        store[v.id] = {
          customName: v.customName || null,
          customPricePerDay: v.customPricePerDay || null,
          customPricePerHour: v.customPricePerHour || null,
          customImage: v.customImage || null,
          customTag: v.customTag || null,
          customText: v.customText || null,
          customRegNo: v.customRegNo || null
        };
      }
    });
    localStorage.setItem("drivena_customized_vehicles", JSON.stringify(store));
  } catch (e) {
    console.error("Failed to save vehicle customizations", e);
  }
}

function createVehicleCardHtml(v) {
  const displayName = v.customName || v.name;
  const displayImage = v.customImage || v.image;
  const displayTag = v.customTag || v.tag || v.categoryLabel;
  const displayRegNo = v.customRegNo || v.regNo || (v.id === 'v-honda-activa-6g' ? 'MH-01-DR-6001' : (v.id === 'v-tvs-ntorq-125' ? 'MH-01-DR-1250' : 'MH-01-DR-8899'));

  // Fuel / EV Charging description badge text
  let fuelChargeDesc = "";
  if (v.fuelType === 'Electric') {
    fuelChargeDesc = `⚡ Electric EV (${v.rangeKm ? v.rangeKm + 'km Range' : 'Fast Charge'})`;
  } else {
    fuelChargeDesc = `⛽ ${v.fuelType} ${v.specs && v.specs.mileage ? '(' + v.specs.mileage + ')' : ''}`;
  }

  // Helmet inclusion badge for Scooty & Bike categories
  const isScootyOrBike = v.category === 'scooty' || v.category === 'bike';
  const helmetText = isScootyOrBike ? "⛑️ Free Sanitized Helmet Included" : "🚗 Doorstep Sanitized Delivery";

  const fallbackImg = v.category === 'cars' 
    ? 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=600&auto=format&fit=crop&q=80'
    : (v.category === 'scooty' 
        ? 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=600&auto=format&fit=crop&q=80'
        : 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&auto=format&fit=crop&q=80');

  return `
    <div class="ambient-card rounded-2xl overflow-hidden flex flex-col justify-between group">
      <!-- Image & Tag -->
      <div class="relative overflow-hidden h-48 bg-surface-container-high">
        <img src="${displayImage}" alt="${displayName}" onerror="this.onerror=null; this.src='${fallbackImg}';" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
        
        <div class="absolute top-3 left-3 flex flex-col gap-1">
          <div class="bg-primary text-on-primary text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
            ${displayTag}
          </div>
          <!-- Vehicle Registration Number Plate Badge -->
          <div class="inline-flex items-center gap-1 bg-amber-300 text-black font-mono text-[10px] font-black px-2 py-0.5 rounded border border-black/40 shadow-md tracking-wider">
            <span class="text-[8px] opacity-70">IND</span> ${displayRegNo}
          </div>
        </div>
        
        <div class="absolute top-3 right-3 flex items-center gap-1.5">
          <button type="button" onclick="openVehicleReviewsModal('${v.id}')" title="Click to view all ${v.reviewsCount} customer reviews" class="bg-surface/90 hover:bg-white backdrop-blur-md text-on-surface px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-0.5 shadow-xs border border-transparent hover:border-secondary hover:scale-105 active:scale-95 transition-all cursor-pointer">
            <span class="material-symbols-outlined text-yellow-500 text-xs filled">star</span>
            <span>${v.rating}</span>
            <span class="text-on-surface-variant text-[9px]">(${v.reviewsCount})</span>
          </button>
        </div>
      </div>
      
      <!-- Content -->
      <div class="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-1">
            <h3 class="font-headline font-bold text-lg text-primary line-clamp-1">${displayName}</h3>
          </div>
          
          <div class="flex items-center gap-2 mb-3">
            <span class="text-xs text-on-surface-variant">${v.categoryLabel}</span>
            <span class="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
              ${helmetText}
            </span>
          </div>

          <!-- Key Spec Chips (Fuel, Range, Transmission, Baggage) -->
          <div class="grid grid-cols-3 gap-2 mb-3 text-xs font-medium text-on-surface-variant">
            <div class="bg-surface-container-low p-2 rounded-lg flex items-center justify-center gap-1" title="${fuelChargeDesc}">
              <span class="material-symbols-outlined text-sm text-primary">${v.fuelType === 'Electric' ? 'electric_car' : 'local_gas_station'}</span>
              <span class="truncate">${v.fuelType === 'Electric' ? 'EV Battery' : 'Petrol'}</span>
            </div>
            <div class="bg-surface-container-low p-2 rounded-lg flex items-center justify-center gap-1">
              <span class="material-symbols-outlined text-sm text-primary">airline_seat_recline_normal</span>
              ${v.seats} Seats
            </div>
            <div class="bg-surface-container-low p-2 rounded-lg flex items-center justify-center gap-1">
              <span class="material-symbols-outlined text-sm text-primary">work</span>
              <span class="truncate">${v.baggage || 'Storage'}</span>
            </div>
          </div>

          <!-- Detailed Fuel / EV Charge info banner -->
          <div class="bg-blue-50/60 border border-blue-200/80 p-2 rounded-xl text-[11px] text-blue-900 font-semibold mb-3 flex items-center gap-1.5">
            <span class="material-symbols-outlined text-secondary text-sm shrink-0">${v.fuelType === 'Electric' ? 'ev_charger' : 'local_gas_station'}</span>
            <span class="truncate">${fuelChargeDesc}</span>
          </div>

          <!-- Custom Notes / Vehicle Registration Banner -->
          ${v.customText ? `
            <div class="bg-amber-50/80 border border-amber-200 p-2.5 rounded-xl text-xs text-amber-900 mb-3 flex items-start gap-2 shadow-xs">
              <span class="material-symbols-outlined text-amber-600 text-base shrink-0 mt-0.5">sticky_note_2</span>
              <p class="text-xs leading-tight whitespace-pre-line break-words font-medium">${v.customText}</p>
            </div>
          ` : ''}
        </div>

        <!-- Pricing & CTAs -->
        <div class="pt-3 border-t border-outline-variant flex items-center justify-between mt-auto gap-2">
          <div>
            <div class="flex items-baseline gap-1">
              <span class="font-headline font-extrabold text-xl sm:text-2xl text-primary">₹${v.pricePerDay.toLocaleString('en-IN')}</span>
              <span class="text-[11px] text-on-surface-variant font-semibold">/day</span>
            </div>
            <div class="text-[11px] text-secondary font-bold flex items-center gap-0.5">
              <span class="material-symbols-outlined text-xs">schedule</span> ₹${v.pricePerHour.toLocaleString('en-IN')}/hr
            </div>
          </div>
          
          <div>
            <!-- Book Now Button -->
            <button onclick="startBooking('${v.id}')" class="bg-secondary hover:bg-secondary-hover text-on-secondary px-4 py-2 rounded-xl font-bold text-xs shadow-md transition-all active:scale-95 flex items-center gap-1.5">
              <span>Book Now</span>
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  `;
}

// Vehicle Card Customization Modal Functions
let tempUploadedCustomPhoto = null;

function openCustomizeModal(vehicleId) {
  const vehicle = FLEET_DATA.find(v => v.id === vehicleId);
  if (!vehicle) return;

  tempUploadedCustomPhoto = vehicle.customImage || null;

  document.getElementById("customize-vehicle-id").value = vehicle.id;
  setText("customize-vehicle-cat-badge", vehicle.category);
  setText("customize-vehicle-name-subtitle", `${vehicle.name} (${vehicle.categoryLabel})`);

  const nameInput = document.getElementById("customize-name-input");
  if (nameInput) nameInput.value = vehicle.name;

  const regNoInput = document.getElementById("customize-reg-no-input");
  if (regNoInput) regNoInput.value = vehicle.customRegNo || vehicle.regNo || (vehicle.id === 'v-honda-activa-6g' ? 'MH-01-DR-6001' : (vehicle.id === 'v-tvs-ntorq-125' ? 'MH-01-DR-1250' : 'MH-01-DR-8899'));

  const dayInput = document.getElementById("customize-price-day-input");
  if (dayInput) dayInput.value = vehicle.pricePerDay;

  const hourInput = document.getElementById("customize-price-hour-input");
  if (hourInput) hourInput.value = vehicle.pricePerHour;

  const previewImg = document.getElementById("customize-photo-preview");
  if (previewImg) {
    previewImg.src = vehicle.customImage || vehicle.image;
  }

  const tagInput = document.getElementById("customize-tag-input");
  if (tagInput) tagInput.value = vehicle.customTag || "";

  const textInput = document.getElementById("customize-text-input");
  if (textInput) textInput.value = vehicle.customText || "";

  const urlInput = document.getElementById("customize-url-input");
  if (urlInput) urlInput.value = (vehicle.customImage && vehicle.customImage.startsWith("http")) ? vehicle.customImage : "";

  const modal = document.getElementById("customize-vehicle-modal");
  if (modal) modal.classList.remove("hidden");
}

function closeCustomizeModal() {
  const modal = document.getElementById("customize-vehicle-modal");
  if (modal) modal.classList.add("hidden");
  tempUploadedCustomPhoto = null;
}

function handleCustomPhotoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (file.size > 15 * 1024 * 1024) {
    showToast("Photo file size must be less than 15MB", "error");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const base64Data = e.target.result;
    tempUploadedCustomPhoto = base64Data;
    const preview = document.getElementById("customize-photo-preview");
    if (preview) preview.src = base64Data;
    showToast("Photo uploaded into preview!");
  };
  reader.readAsDataURL(file);
}

function updatePhotoPreviewFromUrl(url) {
  if (!url || !url.trim()) return;
  tempUploadedCustomPhoto = url.trim();
  const preview = document.getElementById("customize-photo-preview");
  if (preview) preview.src = url.trim();
}

function setPresetPhoto(url, presetName) {
  tempUploadedCustomPhoto = url;
  const urlInput = document.getElementById("customize-url-input");
  if (urlInput) urlInput.value = url;
  const preview = document.getElementById("customize-photo-preview");
  if (preview) preview.src = url;

  if (presetName) {
    const nameInput = document.getElementById("customize-name-input");
    if (nameInput) nameInput.value = presetName;
  }

  showToast("Preset vehicle photo selected!");
}

function saveVehicleCustomization() {
  const vehicleId = document.getElementById("customize-vehicle-id").value;
  const vehicle = FLEET_DATA.find(v => v.id === vehicleId);
  if (!vehicle) return;

  if (!vehicle.originalName) vehicle.originalName = vehicle.name;
  if (!vehicle.originalPricePerDay) vehicle.originalPricePerDay = vehicle.pricePerDay;
  if (!vehicle.originalPricePerHour) vehicle.originalPricePerHour = vehicle.pricePerHour;

  const customNameInput = document.getElementById("customize-name-input");
  const customName = customNameInput ? customNameInput.value.trim() : "";
  const regNoInput = document.getElementById("customize-reg-no-input");
  const customRegNo = regNoInput ? regNoInput.value.trim() : "";
  const customTag = document.getElementById("customize-tag-input").value.trim();
  const customText = document.getElementById("customize-text-input").value.trim();

  const dayInput = document.getElementById("customize-price-day-input");
  const hourInput = document.getElementById("customize-price-hour-input");
  const customPriceDay = dayInput ? parseFloat(dayInput.value) : null;
  const customPriceHour = hourInput ? parseFloat(hourInput.value) : null;

  if (customName && customName.length > 0) {
    vehicle.name = customName;
    vehicle.customName = customName;
  } else {
    vehicle.name = vehicle.originalName;
    delete vehicle.customName;
  }

  if (customRegNo && customRegNo.length > 0) {
    vehicle.customRegNo = customRegNo;
  } else {
    delete vehicle.customRegNo;
  }

  if (customPriceDay && !isNaN(customPriceDay) && customPriceDay > 0) {
    vehicle.pricePerDay = customPriceDay;
    vehicle.customPricePerDay = customPriceDay;
  } else {
    vehicle.pricePerDay = vehicle.originalPricePerDay;
    delete vehicle.customPricePerDay;
  }

  if (customPriceHour && !isNaN(customPriceHour) && customPriceHour > 0) {
    vehicle.pricePerHour = customPriceHour;
    vehicle.customPricePerHour = customPriceHour;
  } else {
    vehicle.pricePerHour = vehicle.originalPricePerHour;
    delete vehicle.customPricePerHour;
  }

  if (tempUploadedCustomPhoto) {
    vehicle.customImage = tempUploadedCustomPhoto;
  }

  if (customTag && customTag.length > 0) {
    vehicle.customTag = customTag;
  } else {
    delete vehicle.customTag;
  }

  if (customText && customText.length > 0) {
    vehicle.customText = customText;
  } else {
    delete vehicle.customText;
  }

  vehicle.isCustomized = !!(vehicle.customName || vehicle.customImage || vehicle.customTag || vehicle.customText || vehicle.customRegNo || vehicle.customPricePerDay || vehicle.customPricePerHour);

  saveCustomizedVehiclesStore();

  renderFeaturedFleet();
  renderFleetCatalog();

  closeCustomizeModal();
  showToast(`Customized vehicle settings saved for ${vehicle.name}!`);
}

function resetVehicleCustomization() {
  const vehicleId = document.getElementById("customize-vehicle-id").value;
  const vehicle = FLEET_DATA.find(v => v.id === vehicleId);
  if (!vehicle) return;

  if (vehicle.originalName) {
    vehicle.name = vehicle.originalName;
  }
  if (vehicle.originalPricePerDay) {
    vehicle.pricePerDay = vehicle.originalPricePerDay;
  }
  if (vehicle.originalPricePerHour) {
    vehicle.pricePerHour = vehicle.originalPricePerHour;
  }

  delete vehicle.customName;
  delete vehicle.customPricePerDay;
  delete vehicle.customPricePerHour;
  delete vehicle.customImage;
  delete vehicle.customTag;
  delete vehicle.customText;
  delete vehicle.customRegNo;
  delete vehicle.isCustomized;

  saveCustomizedVehiclesStore();

  renderFeaturedFleet();
  renderFleetCatalog();

  closeCustomizeModal();
  showToast(`Reset vehicle customization defaults for ${vehicle.name}.`);
}


function filterCategory(cat) {
  appState.selectedCategory = cat;
  document.querySelectorAll(".cat-filter-btn").forEach(btn => {
    if (btn.dataset.cat === cat) {
      btn.className = "cat-filter-btn bg-primary text-on-primary font-semibold px-5 py-2.5 rounded-full text-sm shadow-sm transition-all whitespace-nowrap";
    } else {
      btn.className = "cat-filter-btn bg-surface-container-low text-on-surface-variant hover:bg-surface-container font-medium px-5 py-2.5 rounded-full text-sm transition-all whitespace-nowrap";
    }
  });
  renderFleetCatalog();
}

// Booking Calculation & Workflow Logic
function startBooking(vehicleId) {
  const vehicle = FLEET_DATA.find(v => v.id === vehicleId) || FLEET_DATA[0];
  appState.booking.vehicle = vehicle;
  
  navigateTo("booking-flow");
  renderBookingStep(1);
  updateBookingCalculation();
  showToast(`Selected ${vehicle.customName || vehicle.name} for booking!`);
}

function renderBookingStep(stepNumber) {
  document.querySelectorAll(".booking-step-content").forEach(el => el.classList.add("hidden"));
  const targetStep = document.getElementById(`booking-step-${stepNumber}`);
  if (targetStep) targetStep.classList.remove("hidden");

  for (let i = 1; i <= 5; i++) {
    const stepEl = document.getElementById(`step-indicator-${i}`);
    if (!stepEl) continue;
    
    if (i < stepNumber) {
      stepEl.className = "step-item completed";
      stepEl.querySelector(".step-number").innerHTML = `<span class="material-symbols-outlined text-sm">check</span>`;
    } else if (i === stepNumber) {
      stepEl.className = "step-item active";
      stepEl.querySelector(".step-number").innerText = i;
    } else {
      stepEl.className = "step-item";
      stepEl.querySelector(".step-number").innerText = i;
    }
  }

  if (stepNumber === 3) {
    populateUndertakingFields();
  }
}

function calculateRentalDurationDays() {
  const pDate = new Date(appState.booking.pickupDate);
  const rDate = new Date(appState.booking.returnDate);
  const diffTime = Math.max(rDate - pDate, 86400000);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return Math.max(diffDays, 1);
}

function setRentalMode(mode) {
  appState.booking.rentalMode = mode;
  document.querySelectorAll(".rental-mode-btn").forEach(btn => {
    if (btn.dataset.mode === mode) {
      btn.className = "rental-mode-btn bg-secondary text-on-secondary font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all";
    } else {
      btn.className = "rental-mode-btn bg-surface-container-low text-on-surface-variant font-medium px-4 py-2 rounded-xl text-xs hover:bg-surface-container transition-all";
    }
  });

  const hourlyContainer = document.getElementById("hourly-duration-container");
  const dailyContainer = document.getElementById("daily-duration-container");
  if (hourlyContainer && dailyContainer) {
    if (mode === "hourly") {
      hourlyContainer.classList.remove("hidden");
      dailyContainer.classList.add("hidden");
    } else {
      hourlyContainer.classList.add("hidden");
      dailyContainer.classList.remove("hidden");
    }
  }

  updateBookingCalculation();
}

function updateBookingCalculation() {
  const b = appState.booking;
  const v = b.vehicle;
  const isHourly = b.rentalMode === "hourly";
  
  const days = calculateRentalDurationDays();
  const hours = b.selectedHours || 6;

  const unitPrice = isHourly ? v.pricePerHour : v.pricePerDay;
  const baseTotal = isHourly ? (unitPrice * hours) : (unitPrice * days);
  
  const protRate = isHourly ? Math.round(v.pricePerHour * 0.1) : Math.round(v.pricePerDay * 0.15);
  const protectionTotal = b.protectionPlan.id === "premium" ? (isHourly ? (protRate * hours) : (protRate * days)) : 0;
  
  let addonsTotal = 0;
  b.selectedAddons.forEach(addonId => {
    const addonObj = RENTAL_ADDONS.find(a => a.id === addonId);
    if (addonObj) {
      if (addonObj.type === "per_day") {
        addonsTotal += isHourly ? Math.round(addonObj.price / 3 * hours) : (addonObj.price * days);
      } else {
        addonsTotal += addonObj.price;
      }
    }
  });

  const subtotal = baseTotal + protectionTotal + addonsTotal;

  let discountTotal = 0;
  if (b.coupon) {
    if (b.coupon.type === "flat") {
      discountTotal = b.coupon.discount;
    } else if (b.coupon.type === "percent") {
      discountTotal = subtotal * b.coupon.discount;
    }
  }

  const netSubtotal = Math.max(0, subtotal - discountTotal);
  const taxTotal = 0; // GST is 100% Included in the rate!
  const grandTotal = netSubtotal;

  // Update UI Elements
  const vDisplayName = v.customName || v.name;
  const vDisplayImage = v.customImage || v.image;
  setText("summary-vehicle-name", vDisplayName);
  setText("summary-vehicle-category", v.categoryLabel);
  setImage("summary-vehicle-image", vDisplayImage);
  setText("summary-daily-rate", isHourly ? `₹${v.pricePerHour.toLocaleString('en-IN')}/hour (Incl. GST)` : `₹${v.pricePerDay.toLocaleString('en-IN')}/day (Incl. GST)`);
  setText("summary-days-count", isHourly ? `${hours} Hours` : `${days} ${days === 1 ? 'Day' : 'Days'}`);
  setText("summary-base-total", `₹${baseTotal.toLocaleString('en-IN')}`);
  setText("summary-protection-name", b.protectionPlan.name);
  setText("summary-protection-total", `₹${protectionTotal.toLocaleString('en-IN')}`);
  setText("summary-addons-total", `₹${addonsTotal.toLocaleString('en-IN')}`);
  setText("summary-taxes-total", `Included in Price (18% GST Incl.)`);
  setText("summary-grand-total", `₹${grandTotal.toLocaleString('en-IN')}`);

  // Dynamic Rate Labels on Tabs & Hourly Slider
  const dailyBtnText = document.getElementById("mode-daily-btn-text");
  if (dailyBtnText) dailyBtnText.innerText = `Daily Rate (₹${v.pricePerDay.toLocaleString('en-IN')}/day)`;

  const hourlyBtnText = document.getElementById("mode-hourly-btn-text");
  if (hourlyBtnText) hourlyBtnText.innerText = `Hourly Rate (₹${v.pricePerHour.toLocaleString('en-IN')}/hr)`;

  const hourlyRateLabel = document.getElementById("hourly-rate-label");
  if (hourlyRateLabel) hourlyRateLabel.innerText = `Hourly Rental Package (Rate: ₹${v.pricePerHour.toLocaleString('en-IN')} / hour)`;

  const selectedHoursDisp = document.getElementById("selected-hours-display");
  if (selectedHoursDisp) {
    const hourlyCost = (hours * v.pricePerHour).toLocaleString('en-IN');
    selectedHoursDisp.innerText = `${hours} Hours = ₹${hourlyCost}`;
  }

  const depositText = b.protectionPlan.id === "premium" ? "₹0 Zero Security Deposit" : `₹${v.deposit.toLocaleString('en-IN')} Refundable Deposit`;
  setText("summary-deposit-info", depositText);

  if (b.deliveryType === "doorstep") {
    setText("summary-delivery-mode", "Doorstep Delivery");
    setText("summary-delivery-address", `${b.address.flatNo}, ${b.address.street}, ${b.address.city}, ${b.address.state} - ${b.address.pincode}`);
  } else {
    setText("summary-delivery-mode", "Self Pickup");
    setText("summary-delivery-address", `${b.pickupCity} Hub`);
  }

  return { days, hours, baseTotal, protectionTotal, addonsTotal, discountTotal, taxTotal, grandTotal };
}

function toggleAddon(addonId) {
  const index = appState.booking.selectedAddons.indexOf(addonId);
  if (index > -1) {
    appState.booking.selectedAddons.splice(index, 1);
  } else {
    appState.booking.selectedAddons.push(addonId);
  }
  updateBookingCalculation();
}

function selectProtectionPlan(planId) {
  const plan = PROTECTION_PLANS.find(p => p.id === planId);
  if (plan) {
    appState.booking.protectionPlan = plan;
    document.querySelectorAll(".protection-plan-card").forEach(card => {
      if (card.dataset.plan === planId) {
        card.className = "protection-plan-card border-2 border-secondary bg-orange-50/40 p-4 rounded-xl cursor-pointer transition-all";
      } else {
        card.className = "protection-plan-card border border-outline-variant hover:border-primary/50 p-4 rounded-xl cursor-pointer transition-all";
      }
    });
    updateBookingCalculation();
  }
}

// Payment & Confirmation Logic
function setPaymentMethod(method) {
  appState.booking.paymentMethod = method;
}

function processPayment() {
  const method = appState.booking.paymentMethod || "upi_qr";
  if (method === "upi_qr") {
    openUpiQrModal();
  } else if (method === "card") {
    confirmBookingSuccess("Credit / Debit Card (Visa / Mastercard / RuPay)");
  } else if (method === "netbanking") {
    confirmBookingSuccess("Net Banking (SBI / HDFC / ICICI / Axis)");
  } else if (method === "wallet") {
    confirmBookingSuccess("Paytm / Mobikwik / Amazon Pay Wallet");
  } else {
    confirmBookingSuccess("Online Payment Gateway");
  }
}

function openUpiQrModal() {
  const modal = document.getElementById("upi-qr-modal");
  if (!modal) return;
  
  const calc = updateBookingCalculation();
  const formattedAmt = `₹${calc.grandTotal.toLocaleString('en-IN')}`;
  setText("qr-modal-amount", formattedAmt);
  setText("qr-card-billing-amount", formattedAmt);
  modal.classList.remove("hidden");
  modal.classList.add("flex");
  
  startUpiTimer(300);
}

function closeUpiQrModal() {
  const modal = document.getElementById("upi-qr-modal");
  if (modal) modal.classList.add("hidden");
  if (appState.upiTimerInterval) clearInterval(appState.upiTimerInterval);
}

function startUpiTimer(seconds) {
  if (appState.upiTimerInterval) clearInterval(appState.upiTimerInterval);
  let remaining = seconds;
  
  const timerDisplay = document.getElementById("upi-timer-display");
  appState.upiTimerInterval = setInterval(() => {
    remaining--;
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    if (timerDisplay) {
      timerDisplay.innerText = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    
    if (remaining <= 0) {
      clearInterval(appState.upiTimerInterval);
      showToast("UPI session expired. Please retry.", "error");
      closeUpiQrModal();
    }
  }, 1000);
}

function simulatePaymentSuccess() {
  closeUpiQrModal();
  confirmBookingSuccess("UPI Instant (PhonePe / GPay / Paytm)");
}

function confirmBookingSuccess(paymentSummaryMethod) {
  const calc = updateBookingCalculation();
  const newBookingId = `DRV-IN-${Math.floor(1000 + Math.random() * 9000)}-X`;
  
  const newBooking = {
    bookingId: newBookingId,
    dateCreated: new Date().toISOString().split('T')[0],
    vehicle: appState.booking.vehicle,
    pickupDate: appState.booking.pickupDate,
    returnDate: appState.booking.returnDate,
    pickupCity: appState.booking.pickupCity,
    status: "Confirmed",
    deliveryType: appState.booking.deliveryType === "doorstep" ? "Doorstep Delivery" : "Self Pickup",
    totalAmount: calc.grandTotal,
    paymentMethod: paymentSummaryMethod || "UPI Instant (PhonePe / GPay)"
  };

  appState.myBookings.unshift(newBooking);
  renderMyBookings();

  setText("conf-booking-id", newBooking.bookingId);
  setText("conf-vehicle-name", newBooking.vehicle.name);
  setImage("conf-vehicle-image", newBooking.vehicle.image);
  setText("conf-pickup-date", `${newBooking.pickupDate} at ${appState.booking.pickupTime}`);
  setText("conf-return-date", `${newBooking.returnDate} at ${appState.booking.returnTime}`);
  setText("conf-total-paid", `₹${calc.grandTotal.toLocaleString('en-IN')}`);
  setText("conf-payment-method", newBooking.paymentMethod);
  setText("conf-delivery-address", `${appState.booking.address.flatNo}, ${appState.booking.address.street}, ${appState.booking.address.city}, ${appState.booking.address.state}`);

  renderBookingStep(5);
  showToast(`Booking Confirmed! Reference: ${newBooking.bookingId}`);

  // Save complete booking to Firestore (if configured)
  if (typeof saveBookingToFirestore === 'function' && typeof isFirebaseConfigured !== 'undefined' && isFirebaseConfigured) {
    saveBookingToFirestore(newBooking).catch(err => console.error("[DriveX Firebase] Booking save error:", err));
  }
}

let pendingCancelBookingId = null;

function isCancellable(b) {
  if (!b || b.status.includes("Cancelled")) return false;
  
  try {
    const pickupDateTime = new Date(`${b.pickupDate}T10:00:00`);
    const now = new Date();
    if (isNaN(pickupDateTime.getTime())) return true;
    const diffHours = (pickupDateTime - now) / (1000 * 60 * 60);
    return diffHours > 2;
  } catch (err) {
    return true;
  }
}

function openCancelModal(bookingId) {
  const b = appState.myBookings.find(item => item.bookingId === bookingId);
  if (!b) return;

  if (!isCancellable(b)) {
    showToast("Cancellation Unavailable: Bookings cannot be cancelled within 2 hours of pickup time.", "error");
    return;
  }

  pendingCancelBookingId = bookingId;
  const modal = document.getElementById("cancel-booking-modal");
  if (!modal) return;

  setText("cancel-modal-booking-id", b.bookingId);
  setText("cancel-modal-vehicle-name", b.vehicle.name);
  setText("cancel-modal-amount", `₹${b.totalAmount.toLocaleString('en-IN')}`);
  
  modal.classList.remove("hidden");
  modal.classList.add("flex");
}

function closeCancelModal() {
  const modal = document.getElementById("cancel-booking-modal");
  if (modal) modal.classList.add("hidden");
  pendingCancelBookingId = null;
}

function confirmCancelBooking() {
  if (!pendingCancelBookingId) return;

  const bIndex = appState.myBookings.findIndex(item => item.bookingId === pendingCancelBookingId);
  if (bIndex > -1) {
    appState.myBookings[bIndex].status = "Cancelled (Refund Initiated)";
    renderMyBookings();
    showToast(`Booking ${pendingCancelBookingId} cancelled. Refund of 100% amount initiated to source account.`, "info");
  }

  closeCancelModal();
}

function renderMyBookings() {
  const container = document.getElementById("my-bookings-list-container");
  if (!container) return;

  if (appState.myBookings.length === 0) {
    container.innerHTML = `
      <div class="text-center py-12 bg-surface p-8 rounded-3xl border border-outline-variant">
        <span class="material-symbols-outlined text-5xl text-outline mb-2">directions_car</span>
        <h4 class="font-headline font-bold text-lg text-primary">No Active Bookings</h4>
        <p class="text-xs text-on-surface-variant mb-4">You haven't reserved any vehicles yet.</p>
        <button onclick="navigateTo('fleet')" class="bg-secondary hover:bg-secondary-hover text-on-secondary px-5 py-2.5 rounded-xl font-bold text-xs shadow-md">
          Explore Fleet & Book Now
        </button>
      </div>
    `;
    return;
  }

  container.innerHTML = appState.myBookings.map(b => {
    const isCancelAllowed = isCancellable(b);
    const isCancelled = b.status.includes("Cancelled");
    
    return `
      <div class="bg-surface p-6 rounded-3xl ambient-shadow border border-outline-variant/60 relative overflow-hidden flex flex-col md:flex-row gap-6 items-center">
        <img src="${b.vehicle.customImage || b.vehicle.image}" alt="${b.vehicle.customName || b.vehicle.name}" class="w-full md:w-48 h-36 object-cover rounded-2xl bg-surface-container shrink-0"/>
        
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between gap-2 mb-2 flex-wrap">
            <span class="font-mono text-xs font-bold text-secondary bg-orange-50 px-2.5 py-1 rounded-lg border border-secondary/20">${b.bookingId}</span>
            <span class="${isCancelled ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'} text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              ${b.status}
            </span>
          </div>

          <h3 class="font-headline font-bold text-xl text-primary mb-1">${b.vehicle.customName || b.vehicle.name}</h3>
          <p class="text-xs text-on-surface-variant mb-3 flex items-center gap-1.5 flex-wrap">
            <span>📅 ${b.pickupDate} to ${b.returnDate}</span>
            <span>•</span>
            <span>📍 ${b.pickupCity} Hub (${b.deliveryType})</span>
          </p>

          <div class="flex items-center gap-4 text-xs font-medium text-primary">
            <div><strong>Payment:</strong> ${b.paymentMethod}</div>
            <div><strong>Total Paid:</strong> <span class="font-bold text-secondary text-sm">₹${b.totalAmount.toLocaleString('en-IN')}</span></div>
          </div>
        </div>

        <div class="flex flex-col gap-2 shrink-0 w-full md:w-auto">
          <button onclick="downloadInvoice('${b.bookingId}')" class="bg-surface-container-low hover:bg-surface-container text-primary font-bold px-4 py-2.5 rounded-xl text-xs border border-outline-variant/60 flex items-center justify-center gap-1.5 transition-colors">
            <span class="material-symbols-outlined text-sm text-secondary">receipt_long</span>
            Download Invoice
          </button>
          
          ${!isCancelled ? `
            ${isCancelAllowed ? `
              <button onclick="openCancelModal('${b.bookingId}')" class="border border-rose-200 text-rose-700 hover:bg-rose-50 font-bold px-4 py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1">
                <span class="material-symbols-outlined text-sm">cancel</span>
                Cancel Booking
              </button>
            ` : `
              <span class="text-[10px] text-gray-400 font-semibold text-center italic">Non-Cancellable (<2h to pickup)</span>
            `}
          ` : ''}
        </div>
      </div>
    `;
  }).join("");
}

function downloadInvoice(bookingId) {
  const targetId = bookingId || "DRV-IN-9842-X";
  const b = appState.myBookings.find(item => item.bookingId === targetId) || {
    bookingId: targetId,
    dateCreated: new Date().toISOString().split('T')[0],
    vehicle: appState.booking.vehicle,
    pickupDate: appState.booking.pickupDate,
    returnDate: appState.booking.returnDate,
    totalAmount: appState.booking.rentalMode === 'hourly' ? ((appState.booking.vehicle.pricePerHour || 99) * (appState.booking.selectedHours || 6)) : ((appState.booking.vehicle.pricePerDay || 499) * calculateRentalDurationDays()),
    paymentMethod: "UPI Instant (Google Pay / PhonePe)"
  };

  const calc = updateBookingCalculation();
  const baseAmt = calc.baseTotal;
  const grandTotal = b.totalAmount || calc.grandTotal;
  const sgst = (grandTotal * 0.09).toFixed(2);
  const cgst = (grandTotal * 0.09).toFixed(2);
  const unitRateFormatted = appState.booking.rentalMode === 'hourly' 
    ? `₹${(b.vehicle.pricePerHour || 99).toLocaleString('en-IN')} / Hour` 
    : `₹${(b.vehicle.pricePerDay || 499).toLocaleString('en-IN')} / Day`;

  // Dynamically generate selected add-on rows
  const selectedAddonList = appState.booking.selectedAddons || [];
  let addonsTableRowsHtml = "";

  selectedAddonList.forEach(addonId => {
    const addonObj = RENTAL_ADDONS.find(a => a.id === addonId);
    if (!addonObj) return;

    const daysCount = calculateRentalDurationDays();
    const hoursCount = appState.booking.selectedHours || 6;
    const isHourlyMode = appState.booking.rentalMode === "hourly";

    let itemTotal = 0;
    let ratePlanText = "";

    if (addonObj.price === 0) {
      ratePlanText = "Complimentary Service";
    } else if (addonObj.type === "per_day") {
      itemTotal = isHourlyMode ? Math.round(addonObj.price / 3 * hoursCount) : (addonObj.price * daysCount);
      ratePlanText = `₹${addonObj.price} / day`;
    } else {
      itemTotal = addonObj.price;
      ratePlanText = `₹${addonObj.price} flat`;
    }

    const durationText = addonObj.type === "per_day" 
      ? (isHourlyMode ? `${hoursCount} Hours` : `${daysCount} Days`) 
      : "1 Service";

    const displayAmount = addonObj.price === 0 
      ? `<span style="color:#065f46; font-weight:bold;">FREE (₹0.00)</span>` 
      : `₹${itemTotal.toLocaleString('en-IN')}.00`;

    addonsTableRowsHtml += `
      <tr>
        <td><strong>${addonObj.name}</strong><br/><span style="font-size:11px; color:#64748b;">${addonObj.description}</span></td>
        <td>${ratePlanText}</td>
        <td>${durationText}</td>
        <td style="text-align:right; font-weight:bold;">${displayAmount}</td>
      </tr>
    `;
  });

  const invoiceHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <title>Tax Invoice - ${b.bookingId} - DriveX</title>
  <style>
    body { font-family: 'Helvetica Neue', Arial, sans-serif; color: #0b1c30; padding: 40px; background: #f8f9ff; line-height: 1.5; }
    .invoice-box { max-width: 800px; margin: auto; border: 1px solid #c5c6d1; padding: 36px; border-radius: 20px; background: #ffffff; box-shadow: 0 10px 30px rgba(10,37,88,0.1); }
    .header-table { width: 100%; border-bottom: 2px solid #001136; padding-bottom: 20px; margin-bottom: 24px; }
    .brand { font-size: 28px; font-weight: 900; color: #001136; letter-spacing: -0.5px; }
    .brand span { color: #0066ff; font-size: 28px; font-weight: 900; font-style: italic; margin-left: 2px; }
    .tagline { font-size: 9px; font-weight: 900; color: #fb7800; letter-spacing: 2px; margin-top: 2px; }
    .badge { background: #d1fae5; color: #065f46; padding: 6px 14px; border-radius: 20px; font-size: 12px; font-weight: bold; display: inline-block; }
    .details-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-bottom: 30px; font-size: 13px; background: #eff4ff; padding: 20px; border-radius: 12px; }
    .items-table { width: 100%; border-collapse: collapse; margin-bottom: 30px; }
    .items-table th { background: #001136; color: #fff; text-align: left; padding: 12px 16px; font-size: 12px; text-transform: uppercase; letter-spacing: 0.5px; }
    .items-table td { padding: 14px 16px; border-bottom: 1px solid #e2e8f0; font-size: 13px; }
    .total-section { text-align: right; margin-top: 20px; font-size: 14px; background: #f8f9ff; padding: 20px; border-radius: 12px; border: 1px solid #e2e8f0; }
    .total-amount { font-size: 24px; font-weight: 800; color: #001136; margin-top: 8px; }
    .footer-note { text-align: center; margin-top: 36px; font-size: 11px; color: #64748b; border-top: 1px solid #e2e8f0; padding-top: 20px; }
    @media print { body { padding: 0; background: #fff; } .invoice-box { border: none; box-shadow: none; padding: 0; } .no-print { display: none; } }
  </style>
</head>
<body>
  <div class="no-print" style="max-width:800px; margin:0 auto 20px auto; text-align:right;">
    <button onclick="window.print()" style="background:#fb7800; color:#fff; border:none; padding:12px 24px; border-radius:10px; font-weight:bold; cursor:pointer; font-size:14px; box-shadow:0 4px 12px rgba(251,120,0,0.3);">🖨️ Print / Save as PDF Invoice</button>
  </div>

  <div class="invoice-box">
    <table class="header-table">
      <tr>
        <td>
          <div class="brand">DRIVE<span>X</span></div>
          <div class="tagline">RENT. RIDE. REPEAT.</div>
          <div style="font-size:12px; color:#64748b; margin-top:4px;">DriveX Mobility Systems Pvt Ltd<br/>GSTIN: 27AAACD9842X1Z5 • PAN: AAACD9842X</div>
        </td>
        <td style="text-align: right;">
          <span class="badge">OFFICIAL GST TAX INVOICE</span>
          <h2 style="margin: 8px 0 0 0; color:#001136; font-size:22px;">TAX INVOICE</h2>
          <div style="font-size:12px; color:#64748b;">Invoice No: <strong>INV-${b.bookingId}</strong><br/>Date: ${b.dateCreated}</div>
        </td>
      </tr>
    </table>

    <div class="details-grid">
      <div>
        <strong style="color:#001136; font-size:14px;">Billed To (Customer):</strong><br/>
        <strong>Name:</strong> ${appState.currentUser.name}<br/>
        <strong>Mobile:</strong> +91 ${appState.currentUser.phone}<br/>
        <strong>Address:</strong> ${appState.booking.address.flatNo}, ${appState.booking.address.street}<br/>
        <strong>City:</strong> ${appState.booking.address.city}, ${appState.booking.address.state} - ${appState.booking.address.pincode}
      </div>
      <div>
        <strong style="color:#001136; font-size:14px;">Rental Reservation Details:</strong><br/>
        <strong>Booking ID:</strong> ${b.bookingId}<br/>
        <strong>Vehicle:</strong> ${b.vehicle.name}<br/>
        <strong>Pickup Date:</strong> ${b.pickupDate}<br/>
        <strong>Return Date:</strong> ${b.returnDate}<br/>
        <strong>Payment Method:</strong> ${b.paymentMethod}
      </div>
    </div>

    <table class="items-table">
      <thead>
        <tr>
          <th>Description</th>
          <th>Rate Plan</th>
          <th>Duration</th>
          <th style="text-align:right;">Amount (₹)</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>${b.vehicle.name}</strong><br/><span style="font-size:11px; color:#64748b;">Category: ${b.vehicle.categoryLabel}</span></td>
          <td>${unitRateFormatted} (GST Incl.)</td>
          <td>${appState.booking.rentalMode === 'hourly' ? (appState.booking.selectedHours || 6) + ' Hours' : calculateRentalDurationDays() + ' Days'}</td>
          <td style="text-align:right; font-weight:bold;">₹${baseAmt.toLocaleString('en-IN')}</td>
        </tr>
        <tr>
          <td>Zero Liability Protection Package</td>
          <td>Included</td>
          <td>Full Rental Period</td>
          <td style="text-align:right; font-weight:bold;">₹0.00</td>
        </tr>
        ${addonsTableRowsHtml}
      </tbody>
    </table>

    <div class="total-section">
      <div style="color:#44464f;">Subtotal (GST Included): <strong>₹${grandTotal.toLocaleString('en-IN')}</strong></div>
      <div style="font-size:12px; color:#64748b; margin-top:4px;">CGST @ 9%: ₹${sgst} | SGST @ 9%: ₹${cgst} (Included)</div>
      <div class="total-amount">Total Amount Paid: ₹${grandTotal.toLocaleString('en-IN')}</div>
    </div>

    <div class="footer-note">
      This is a computer-generated official GST Tax Invoice and requires no physical signature.<br/>
      Thank you for driving with DriveX! (RENT. RIDE. REPEAT.) • 24/7 Support Hotline: 1800-DRIVEX-IN
    </div>
  </div>
</body>
</html>
  `;

  // 1. Create downloadable HTML file blob
  const blob = new Blob([invoiceHtml], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url;
  a.download = `DriveX_Tax_Invoice_${targetId}.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  // 2. Open print window
  const printWin = window.open("", "_blank");
  if (printWin) {
    printWin.document.write(invoiceHtml);
    printWin.document.close();
  }

  showToast(`Downloaded Official Tax Invoice (${targetId})!`);
}

// Modal Controllers
function openLoginModal() {
  const modal = document.getElementById("login-modal");
  if (modal) modal.classList.remove("hidden");
}

function closeLoginModal() {
  const modal = document.getElementById("login-modal");
  if (modal) modal.classList.add("hidden");
}

function openAddressModal() {
  const modal = document.getElementById("address-modal");
  if (!modal) return;
  modal.classList.remove("hidden");
  setTimeout(() => {
    initLocationPickerMap();
    if (appState.mapInstance) {
      appState.mapInstance.invalidateSize();
      if (appState.location && appState.location.lat && appState.location.lng) {
        appState.mapInstance.setView([appState.location.lat, appState.location.lng], 13);
        if (appState.markerInstance) {
          appState.markerInstance.setLatLng([appState.location.lat, appState.location.lng]);
        }
      }
    }
  }, 150);
}

function closeAddressModal() {
  const modal = document.getElementById("address-modal");
  if (modal) modal.classList.add("hidden");
}

function savePanIndiaAddressSubmit(e) {
  if (e) e.preventDefault();
  
  const flatNo = document.getElementById("addr-flat-no")?.value || "Flat 402, Sea View";
  const street = document.getElementById("addr-street")?.value || "Marine Drive";
  const state = appState.location.selectedState;
  const district = appState.location.selectedDistrict;
  const city = appState.location.selectedCity;
  const pincode = document.getElementById("addr-pincode")?.value || "400021";
  const landmark = document.getElementById("addr-landmark")?.value || "Near Landmark";

  appState.booking.address = { flatNo, street, city, district, state, pincode, landmark };
  closeAddressModal();
  updateBookingCalculation();
  showToast(`Delivery Address Saved: ${city}, ${state} (${pincode})`);
}

// Global Event Listeners Setup
function initEventListeners() {
  const pDateInput = document.getElementById("pickup-date-input");
  const rDateInput = document.getElementById("return-date-input");
  
  if (pDateInput && rDateInput) {
    pDateInput.value = appState.booking.pickupDate;
    rDateInput.value = appState.booking.returnDate;

    pDateInput.addEventListener("change", (e) => {
      appState.booking.pickupDate = e.target.value;
      updateBookingCalculation();
    });

    rDateInput.addEventListener("change", (e) => {
      appState.booking.returnDate = e.target.value;
      updateBookingCalculation();
    });
  }

  const fleetSearchInput = document.getElementById("fleet-search-input");
  if (fleetSearchInput) {
    fleetSearchInput.addEventListener("input", (e) => {
      appState.searchQuery = e.target.value;
      renderFleetCatalog();
    });
  }

  const heroCategorySelect = document.getElementById("hero-category-select");
  if (heroCategorySelect) {
    heroCategorySelect.addEventListener("change", (e) => {
      appState.selectedCategory = e.target.value;
    });
  }

  const fleetSortSelect = document.getElementById("fleet-sort-select");
  if (fleetSortSelect) {
    fleetSortSelect.addEventListener("change", (e) => {
      appState.sortBy = e.target.value;
      renderFleetCatalog();
    });
  }
}

// Helper Utilities
function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.innerText = text;
}

function setImage(id, src) {
  const el = document.getElementById(id);
  if (el) el.src = src;
}

function showToast(message, type = "success") {
  const container = document.getElementById("toast-container");
  if (!container) return;

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
    <span class="material-symbols-outlined text-secondary">${type === 'error' ? 'error' : 'check_circle'}</span>
    <span class="text-sm font-medium text-white flex-1">${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// ================= CUSTOMER UNDERTAKING & KYC LOGIC =================
function populateUndertakingFields() {
  const b = appState.booking;
  if (!b.undertaking) {
    b.undertaking = {
      agreed: false,
      customerName: appState.currentUser.name || "Aarav Sharma",
      mobileNumber: appState.currentUser.phone || "9876543210",
      address: "",
      dlNumber: "MH-0120230045678",
      idProofNumber: "4521 8890 1234",
      vehicleType: "Car",
      vehicleRegNo: "MH-01-DR-8899",
      startDate: "",
      returnDate: "",
      date: new Date().toISOString().split('T')[0],
      companyName: "DriveX Mobility Pvt. Ltd.",
      customerSignature: "Aarav Sharma",
      aadharPhoto: null,
      dlPhoto: null
    };
  }

  const u = b.undertaking;
  const v = b.vehicle || FLEET_DATA[0];

  let vType = "Car";
  if (v.category === "scooty") vType = "Scooter";
  else if (v.category === "bike") vType = "Bike";

  setValue("undertaking-cust-name", u.customerName || appState.currentUser.name || "Aarav Sharma");
  setValue("undertaking-cust-mobile", u.mobileNumber || appState.currentUser.phone || "9876543210");

  const defaultAddr = (customerResidency === 'foreigner' && appState.booking.formattedDeliveryAddress)
    ? appState.booking.formattedDeliveryAddress
    : (b.address ? `${b.address.flatNo}, ${b.address.street}, ${b.address.city}, ${b.address.state} ${b.address.pincode}` : appState.location.formattedAddress);
  setValue("undertaking-cust-address", u.address || defaultAddr);

  setValue("undertaking-cust-dl", u.dlNumber || "MH-0120230045678");
  setValue("undertaking-cust-idproof", u.idProofNumber || "4521 8890 1234");
  
  const vSelect = document.getElementById("undertaking-vehicle-type-select");
  if (vSelect) vSelect.value = vType;

  setValue("undertaking-vehicle-reg", u.vehicleRegNo || (v.category === "scooty" ? "MH-01-SC-4421" : v.category === "bike" ? "MH-01-BK-9912" : "MH-01-DR-8899"));
  setValue("undertaking-start-datetime", `${b.pickupDate} (${b.pickupTime})`);
  setValue("undertaking-return-datetime", `${b.returnDate} (${b.returnTime})`);
  setValue("undertaking-date", u.date || new Date().toISOString().split('T')[0]);
  setValue("undertaking-company-name", u.companyName || "DriveX Mobility Pvt. Ltd.");
  setValue("undertaking-cust-signature-text", u.customerSignature || u.customerName || "Aarav Sharma");

  const checkAgree = document.getElementById("undertaking-terms-agree");
  if (checkAgree) checkAgree.checked = u.agreed || false;

  updateUndertakingIntro();
  initSignatureCanvas();
}

function updateUndertakingIntro() {
  const name = getValue("undertaking-cust-name") || "________________________________";
  const vType = getValue("undertaking-vehicle-type-select") || "Scooter / Bike / Car";
  const company = getValue("undertaking-company-name") || "DriveX Mobility Pvt. Ltd.";

  setText("undertaking-intro-name", name);
  setText("undertaking-intro-vehicle-type", vType);
  setText("undertaking-intro-company", company);
  setText("undertaking-stamp-company", company);
}

function setValue(id, val) {
  const el = document.getElementById(id);
  if (el) el.value = val;
}

function getValue(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : "";
}

// Interactive Signature Canvas
let canvasInitialized = false;
let isDrawing = false;

function initSignatureCanvas() {
  const canvas = document.getElementById("signature-canvas");
  if (!canvas || canvasInitialized) return;
  canvasInitialized = true;

  const ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#001136";
  ctx.lineWidth = 2;
  ctx.lineCap = "round";

  function getPos(e) {
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  }

  function startDraw(e) {
    isDrawing = true;
    const pos = getPos(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
  }

  function draw(e) {
    if (!isDrawing) return;
    const pos = getPos(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function stopDraw() {
    if (isDrawing) {
      isDrawing = false;
      ctx.closePath();
    }
  }

  canvas.addEventListener("mousedown", startDraw);
  canvas.addEventListener("mousemove", draw);
  canvas.addEventListener("mouseup", stopDraw);
  canvas.addEventListener("mouseleave", stopDraw);

  canvas.addEventListener("touchstart", startDraw, { passive: true });
  canvas.addEventListener("touchmove", draw, { passive: true });
  canvas.addEventListener("touchend", stopDraw);
}

function clearSignatureCanvas() {
  const canvas = document.getElementById("signature-canvas");
  if (canvas) {
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// Document Upload Handlers (Generic - supports all doc types + Firebase Storage upload)
async function handleDocUpload(event, docType) {
  const file = event.target.files[0];
  if (!file) return;

  // Validate file size (max 10MB)
  if (file.size > 10 * 1024 * 1024) {
    showToast("File too large! Maximum size is 10MB.", "error");
    return;
  }

  // Step 1: Show local preview immediately (fast UX)
  const reader = new FileReader();
  reader.onload = async function(e) {
    const localDataUrl = e.target.result;
    displayDocPreview(docType, localDataUrl, file.name);

    // Step 2: Upload to Firebase Storage in background (if configured)
    if (isFirebaseConfigured && typeof uploadDocToFirebase === 'function') {
      try {
        const statusPill = document.getElementById(`${docType}-upload-status`);
        if (statusPill) {
          statusPill.className = "text-[11px] font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full flex items-center gap-1";
          statusPill.innerHTML = `<span class="material-symbols-outlined text-xs animate-spin">sync</span> Uploading...`;
        }

        const fileData = await uploadDocToFirebase(file, docType, appState?.currentUser?.phone);
        
        if (fileData && fileData.downloadURL) {
          // Step 3: Save record to Firestore
          if (typeof saveDocRecordToFirestore === 'function') {
            await saveDocRecordToFirestore(docType, fileData, appState?.currentUser?.phone);
          }

          // Update status to cloud synced
          if (statusPill) {
            statusPill.className = "text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full flex items-center gap-1";
            statusPill.innerHTML = `<span class="material-symbols-outlined text-xs">cloud_done</span> Saved to Cloud`;
          }

          // Store Firebase URL in state
          storeDocUrl(docType, fileData.downloadURL);
          
          const label = DOC_TYPE_LABELS[docType] || docType;
          showToast(`${label} saved to Firebase Cloud! ☁️`);
        }
      } catch (error) {
        console.error("[DriveX] Firebase upload failed:", error);
        // Still keep local preview — file is saved locally
        const statusPill = document.getElementById(`${docType}-upload-status`);
        if (statusPill) {
          statusPill.className = "text-[11px] font-bold bg-amber-100 text-amber-800 px-2.5 py-0.5 rounded-full flex items-center gap-1";
          statusPill.innerHTML = `<span class="material-symbols-outlined text-xs">cloud_off</span> Local Only`;
        }
      }
    }
  };
  reader.readAsDataURL(file);
}

const DOC_TYPE_LABELS = {
  'aadhar': 'Aadhar Card',
  'dl': 'Driving License',
  'foreigner-hotel-bill': 'Hotel Bill / Proof of Stay',
  'verify-indian-aadhar': 'Aadhar Card (Verification)',
  'verify-indian-dl': 'Driving License (Verification)',
  'verify-indian-photo': 'Customer Photo',
  'verify-foreigner-passport': 'Passport',
  'verify-foreigner-visa': 'Visa / E-Visa',
  'verify-foreigner-photo': 'Customer Photo'
};

function displayDocPreview(docType, imgUrl, fileName) {
  const dropzone = document.getElementById(`${docType}-dropzone`);
  const previewBox = document.getElementById(`${docType}-preview-box`);
  const previewImg = document.getElementById(`${docType}-preview-img`);
  const statusPill = document.getElementById(`${docType}-upload-status`);

  if (previewImg) previewImg.src = imgUrl;
  if (dropzone) dropzone.classList.add("hidden");
  if (previewBox) previewBox.classList.remove("hidden");

  if (statusPill) {
    statusPill.className = "text-[11px] font-bold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full flex items-center gap-1";
    statusPill.innerHTML = `<span class="material-symbols-outlined text-xs">check_circle</span> Uploaded`;
  }

  // Store locally
  storeDocUrl(docType, imgUrl);

  const label = DOC_TYPE_LABELS[docType] || docType;
  showToast(`${label} uploaded successfully!`);
}

// Centralized doc URL storage
function storeDocUrl(docType, url) {
  if (!appState.booking.undertaking) appState.booking.undertaking = {};
  if (!appState.booking.verification) appState.booking.verification = {};
  if (!appState.booking.stayDetails) appState.booking.stayDetails = {};

  if (docType === "aadhar") appState.booking.undertaking.aadharPhoto = url;
  if (docType === "dl") appState.booking.undertaking.dlPhoto = url;
  if (docType === "foreigner-hotel-bill") appState.booking.stayDetails.hotelBillPhoto = url;
  if (docType === "verify-indian-aadhar") appState.booking.verification.indianAadharPhoto = url;
  if (docType === "verify-indian-dl") appState.booking.verification.indianDlPhoto = url;
  if (docType === "verify-indian-photo" || docType === "verify-foreigner-photo") {
    appState.booking.verification.customerPhoto = url;
    appState.booking.undertaking.customerPhoto = url;
  }
  if (docType === "verify-foreigner-passport") appState.booking.verification.foreignerPassportPhoto = url;
  if (docType === "verify-foreigner-visa") appState.booking.verification.foreignerVisaPhoto = url;
}

function loadSampleDoc(docType) {
  const sampleImages = {
    'aadhar': "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    'dl': "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
    'foreigner-hotel-bill': "https://images.unsplash.com/photo-1554415707-9e49017a1430?auto=format&fit=crop&w=600&q=80",
    'verify-indian-aadhar': "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
    'verify-indian-dl': "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
    'verify-indian-photo': "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    'verify-foreigner-passport': "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=600&q=80",
    'verify-foreigner-visa': "https://images.unsplash.com/photo-1587019158091-1a103c5dd17f?auto=format&fit=crop&w=600&q=80",
    'verify-foreigner-photo': "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80"
  };

  const sampleUrl = sampleImages[docType] || sampleImages['verify-indian-aadhar'];
  const fileName = `sample_${docType.replace(/-/g, '_')}.jpg`;
  displayDocPreview(docType, sampleUrl, fileName);
}

function clearDocUpload(docType) {
  const dropzone = document.getElementById(`${docType}-dropzone`);
  const previewBox = document.getElementById(`${docType}-preview-box`);
  const previewImg = document.getElementById(`${docType}-preview-img`);
  const statusPill = document.getElementById(`${docType}-upload-status`);
  const fileInput = document.getElementById(`${docType}-file-input`);

  if (fileInput) fileInput.value = "";
  if (previewImg) previewImg.src = "";
  if (previewBox) previewBox.classList.add("hidden");
  if (dropzone) dropzone.classList.remove("hidden");

  if (statusPill) {
    statusPill.className = "text-[11px] font-bold bg-gray-200 text-gray-700 px-2.5 py-0.5 rounded-full";
    statusPill.innerText = "Pending";
  }

  if (appState.booking.undertaking) {
    if (docType === "aadhar") appState.booking.undertaking.aadharPhoto = null;
    if (docType === "dl") appState.booking.undertaking.dlPhoto = null;
    if (docType === "verify-indian-photo" || docType === "verify-foreigner-photo") appState.booking.undertaking.customerPhoto = null;
  }

  if (appState.booking.stayDetails && docType === "foreigner-hotel-bill") {
    appState.booking.stayDetails.hotelBillPhoto = null;
  }

  // Clear verification doc uploads
  if (appState.booking.verification) {
    if (docType === "verify-indian-aadhar") appState.booking.verification.indianAadharPhoto = null;
    if (docType === "verify-indian-dl") appState.booking.verification.indianDlPhoto = null;
    if (docType === "verify-indian-photo" || docType === "verify-foreigner-photo") appState.booking.verification.customerPhoto = null;
    if (docType === "verify-foreigner-passport") appState.booking.verification.foreignerPassportPhoto = null;
    if (docType === "verify-foreigner-visa") appState.booking.verification.foreignerVisaPhoto = null;
  }

  const label = DOC_TYPE_LABELS[docType] || docType;
  showToast(`Removed ${label} photo.`, "info");
}

// Customer Residency & Hotel Details (Step 2)
let customerResidency = 'indian';

function setCustomerResidency(type) {
  customerResidency = type;
  if (!appState.booking) appState.booking = {};
  appState.booking.residency = type;

  const indianCard = document.getElementById('residency-option-indian');
  const foreignerCard = document.getElementById('residency-option-foreigner');
  const stayContainer = document.getElementById('foreigner-stay-container');
  const indianDeliveryCard = document.getElementById('indian-delivery-address-card');

  if (type === 'foreigner') {
    if (indianCard) {
      indianCard.className = 'residency-card flex items-center gap-3 p-4 rounded-xl border-2 border-outline-variant bg-white cursor-pointer transition-all hover:border-violet-400 hover:bg-violet-50/30';
      const rad = indianCard.querySelector('input[type="radio"]');
      if (rad) rad.checked = false;
    }
    if (foreignerCard) {
      foreignerCard.className = 'residency-card flex items-center gap-3 p-4 rounded-xl border-2 border-violet-600 bg-violet-50/60 cursor-pointer transition-all shadow-sm';
      const rad = foreignerCard.querySelector('input[type="radio"]');
      if (rad) rad.checked = true;
    }
    if (stayContainer) stayContainer.classList.remove('hidden');
    if (indianDeliveryCard) indianDeliveryCard.classList.add('hidden');
    switchVerificationType('foreigner');
    syncHotelToDeliveryAddress();
  } else {
    if (foreignerCard) {
      foreignerCard.className = 'residency-card flex items-center gap-3 p-4 rounded-xl border-2 border-outline-variant bg-white cursor-pointer transition-all hover:border-violet-400 hover:bg-violet-50/30';
      const rad = foreignerCard.querySelector('input[type="radio"]');
      if (rad) rad.checked = false;
    }
    if (indianCard) {
      indianCard.className = 'residency-card flex items-center gap-3 p-4 rounded-xl border-2 border-secondary bg-orange-50/40 cursor-pointer transition-all hover:bg-orange-50/70 shadow-sm';
      const rad = indianCard.querySelector('input[type="radio"]');
      if (rad) rad.checked = true;
    }
    if (stayContainer) stayContainer.classList.add('hidden');
    if (indianDeliveryCard) indianDeliveryCard.classList.remove('hidden');
    switchVerificationType('indian');
  }
}

function syncHotelToDeliveryAddress() {
  const hotelName = getValue('foreigner-hotel-name');
  const hotelAddress = getValue('foreigner-hotel-address');

  if (!appState.booking.stayDetails) appState.booking.stayDetails = {};
  appState.booking.stayDetails.hotelName = hotelName;
  appState.booking.stayDetails.hotelAddress = hotelAddress;

  if (hotelName || hotelAddress) {
    const fullHotelAddr = [hotelName, hotelAddress].filter(Boolean).join(", ");
    setText('summary-delivery-address', fullHotelAddr);
    appState.booking.formattedDeliveryAddress = fullHotelAddr;
  }
}

function proceedToKYCStep() {
  if (customerResidency === 'foreigner') {
    const hotelName = getValue('foreigner-hotel-name');
    const hotelAddr = getValue('foreigner-hotel-address');
    
    // Auto-populate sample stay details if left blank for smooth testing
    if (!hotelName) {
      setValue('foreigner-hotel-name', 'The Taj Mahal Palace, Mumbai');
    }
    if (!hotelAddr) {
      setValue('foreigner-hotel-address', 'Apollo Bunder, Colaba, Mumbai - Room 402');
    }
    syncHotelToDeliveryAddress();

    if (!appState.booking.stayDetails?.hotelBillPhoto) {
      loadSampleDoc('foreigner-hotel-bill');
    }
    switchVerificationType('foreigner');
  } else {
    switchVerificationType('indian');
  }

  renderBookingStep(3);
}

// Verification Type Toggle (Indian / Foreigner)
let activeVerificationType = 'indian';

function switchVerificationType(type) {
  activeVerificationType = type;
  const indianSection = document.getElementById('verify-indian-section');
  const foreignerSection = document.getElementById('verify-foreigner-section');
  const indianTab = document.getElementById('verify-tab-indian');
  const foreignerTab = document.getElementById('verify-tab-foreigner');

  if (type === 'indian') {
    indianSection?.classList.remove('hidden');
    foreignerSection?.classList.add('hidden');
    if (indianTab) indianTab.className = 'verify-tab-btn bg-primary text-on-primary font-bold px-5 py-2.5 rounded-xl text-xs shadow-md transition-all flex items-center gap-1.5';
    if (foreignerTab) foreignerTab.className = 'verify-tab-btn bg-surface-container-low text-on-surface-variant font-medium px-5 py-2.5 rounded-xl text-xs hover:bg-surface-container transition-all flex items-center gap-1.5';
  } else {
    indianSection?.classList.add('hidden');
    foreignerSection?.classList.remove('hidden');
    if (foreignerTab) foreignerTab.className = 'verify-tab-btn bg-violet-700 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-md transition-all flex items-center gap-1.5';
    if (indianTab) indianTab.className = 'verify-tab-btn bg-surface-container-low text-on-surface-variant font-medium px-5 py-2.5 rounded-xl text-xs hover:bg-surface-container transition-all flex items-center gap-1.5';
  }
}

function validateAndProceedToPayment() {
  const agreeChecked = document.getElementById("undertaking-terms-agree")?.checked;
  const custName = getValue("undertaking-cust-name");
  const custMobile = getValue("undertaking-cust-mobile");
  const custAddress = getValue("undertaking-cust-address");
  const dlNum = getValue("undertaking-cust-dl");
  const idNum = getValue("undertaking-cust-idproof");
  const signatureText = getValue("undertaking-cust-signature-text");

  if (!agreeChecked) {
    showToast("Please check the box to agree to the Customer Undertaking terms.", "error");
    const termsBox = document.getElementById("undertaking-terms-agree")?.parentElement;
    if (termsBox) {
      termsBox.classList.add("ring-2", "ring-rose-500");
      setTimeout(() => termsBox.classList.remove("ring-2", "ring-rose-500"), 3000);
    }
    return;
  }

  if (!custName || !custMobile || !custAddress) {
    showToast("Please fill in your Customer Name, Mobile Number, and Address.", "error");
    return;
  }

  if (!dlNum) {
    showToast("Please enter your Driving Licence Number.", "error");
    document.getElementById("undertaking-cust-dl")?.focus();
    return;
  }

  if (!idNum) {
    showToast("Please enter your Aadhar or ID Proof Number.", "error");
    document.getElementById("undertaking-cust-idproof")?.focus();
    return;
  }

  if (!signatureText) {
    showToast("Please sign or type your name in the Customer Signature box.", "error");
    document.getElementById("undertaking-cust-signature-text")?.focus();
    return;
  }

  // Auto-populate verification docs if not uploaded (demo convenience)
  if (!appState.booking.verification) appState.booking.verification = {};
  if (activeVerificationType === 'indian') {
    if (!appState.booking.verification.indianAadharPhoto) loadSampleDoc('verify-indian-aadhar');
    if (!appState.booking.verification.indianDlPhoto) loadSampleDoc('verify-indian-dl');
    if (!appState.booking.verification.customerPhoto) loadSampleDoc('verify-indian-photo');
    if (!appState.booking.undertaking) appState.booking.undertaking = {};
    appState.booking.undertaking.aadharPhoto = appState.booking.verification.indianAadharPhoto;
    appState.booking.undertaking.dlPhoto = appState.booking.verification.indianDlPhoto;
    appState.booking.undertaking.customerPhoto = appState.booking.verification.customerPhoto;
  } else {
    if (!appState.booking.verification.foreignerPassportPhoto) loadSampleDoc('verify-foreigner-passport');
    if (!appState.booking.verification.foreignerVisaPhoto) loadSampleDoc('verify-foreigner-visa');
    if (!appState.booking.verification.customerPhoto) loadSampleDoc('verify-foreigner-photo');
    if (!appState.booking.undertaking) appState.booking.undertaking = {};
    appState.booking.undertaking.passportPhoto = appState.booking.verification.foreignerPassportPhoto;
    appState.booking.undertaking.visaPhoto = appState.booking.verification.foreignerVisaPhoto;
    appState.booking.undertaking.customerPhoto = appState.booking.verification.customerPhoto;
    appState.booking.undertaking.aadharPhoto = appState.booking.verification.foreignerPassportPhoto;
    appState.booking.undertaking.dlPhoto = appState.booking.verification.foreignerVisaPhoto;
  }

  appState.booking.undertaking = {
    ...appState.booking.undertaking,
    agreed: true,
    customerName: custName,
    mobileNumber: custMobile,
    address: custAddress,
    dlNumber: dlNum,
    idProofNumber: idNum,
    vehicleType: getValue("undertaking-vehicle-type-select"),
    vehicleRegNo: getValue("undertaking-vehicle-reg"),
    startDate: getValue("undertaking-start-datetime"),
    returnDate: getValue("undertaking-return-datetime"),
    date: getValue("undertaking-date"),
    companyName: getValue("undertaking-company-name"),
    customerSignature: signatureText,
    customerPhoto: appState.booking.verification?.customerPhoto || null
  };

  // Save verification details
  appState.booking.verification = {
    ...appState.booking.verification,
    type: activeVerificationType,
    indianName: getValue("verify-indian-name"),
    indianAge: getValue("verify-indian-age"),
    indianFatherName: getValue("verify-indian-father"),
    indianMotherName: getValue("verify-indian-mother"),
    foreignerName: getValue("verify-foreigner-name"),
    foreignerAge: getValue("verify-foreigner-age"),
    foreignerFatherName: getValue("verify-foreigner-father"),
    foreignerMotherName: getValue("verify-foreigner-mother"),
    foreignerNationality: getValue("verify-foreigner-nationality"),
    foreignerPassportNumber: getValue("verify-foreigner-passport-num")
  };

  showToast("Customer Undertaking & Documents Accepted! Proceeding to Payment.");
  renderBookingStep(4);
}

/* ================= INTRO SPLASH VIDEO CONTROLLER (PURE VIDEO) ================= */
const TARGET_SPLASH_DURATION = 3.5; // Play video max 3.5 seconds
let isSplashDismissed = false;

window.dismissSplash = function dismissSplash() {
  if (isSplashDismissed) return;
  isSplashDismissed = true;

  const splashEl = document.getElementById("intro-splash");
  const videoEl = document.getElementById("splash-video");

  if (videoEl) {
    try { videoEl.pause(); } catch(e) {}
  }

  // Restore full page scrolling immediately
  document.body.style.overflow = "auto";
  document.documentElement.style.overflow = "auto";

  if (splashEl) {
    splashEl.style.opacity = "0";
    splashEl.style.pointerEvents = "none";
    splashEl.classList.add("splash-dismissing");
    setTimeout(() => {
      splashEl.style.display = "none";
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto";
    }, 600);
  } else {
    document.body.style.overflow = "auto";
    document.documentElement.style.overflow = "auto";
  }
};

function dismissSplash() {
  window.dismissSplash();
}

function initSplashIntro() {
  const splashEl = document.getElementById("intro-splash");
  const videoEl = document.getElementById("splash-video");

  if (!splashEl) return;

  isSplashDismissed = false;
  document.body.style.overflow = "hidden";

  // FAILSAFE: Automatically dismiss splash after 3.5 seconds no matter what!
  const fallbackTimer = setTimeout(() => {
    window.dismissSplash();
  }, 3500);

  if (videoEl) {
    videoEl.currentTime = 0;
    videoEl.muted = true;

    const handleTimeUpdate = () => {
      if (isSplashDismissed) return;
      if (videoEl.currentTime >= TARGET_SPLASH_DURATION || videoEl.ended) {
        videoEl.removeEventListener("timeupdate", handleTimeUpdate);
        clearTimeout(fallbackTimer);
        window.dismissSplash();
      }
    };

    videoEl.addEventListener("timeupdate", handleTimeUpdate);
    videoEl.addEventListener("ended", () => {
      clearTimeout(fallbackTimer);
      window.dismissSplash();
    });
    videoEl.addEventListener("error", () => {
      clearTimeout(fallbackTimer);
      window.dismissSplash();
    });

    videoEl.play().catch((err) => {
      console.warn("Autoplay blocked by browser policy:", err);
      clearTimeout(fallbackTimer);
      window.dismissSplash();
    });
  }

  // Click anywhere on splash screen to dismiss immediately
  splashEl.onclick = () => {
    clearTimeout(fallbackTimer);
    window.dismissSplash();
  };
}

function replaySplash() {
  const splashEl = document.getElementById("intro-splash");
  if (splashEl) {
    splashEl.classList.remove("splash-dismissing");
    splashEl.style.display = "flex";
    initSplashIntro();
  }
}

// Auto-initialize splash screen when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initSplashIntro);
} else {
  initSplashIntro();
}

// Local Storage & Sample Vehicle Reviews Repository
function loadVehicleReviewsStore() {
  try {
    const saved = localStorage.getItem("drivena_vehicle_reviews");
    if (saved) {
      appState.vehicleReviews = JSON.parse(saved);
    }
  } catch (e) {
    console.error("Failed to load vehicle reviews store", e);
  }
}

function saveVehicleReviewsStore() {
  try {
    localStorage.setItem("drivena_vehicle_reviews", JSON.stringify(appState.vehicleReviews));
  } catch (e) {
    console.error("Failed to save vehicle reviews store", e);
  }
}

// Generate Sample Reviews for Vehicle
function getSampleReviewsForVehicle(vehicle) {
  const customList = appState.vehicleReviews[vehicle.id] || [];
  
  const sampleDatabase = {
    "v-honda-activa-6g": [
      {
        id: "rev-activa-1",
        name: "Rohan Mehta",
        location: "Mumbai Downtown",
        rating: 5,
        date: "2026-08-26",
        text: "Rented this Activa 6G for 3 days in South Mumbai. Doorstep delivery was right on time at Marine Drive. Scooter was clean, silent start worked flawlessly, and helmet was sanitized. Great mileage of ~50 kmpl!",
        helpfulCount: 34
      },
      {
        id: "rev-activa-2",
        name: "Ananya Deshmukh",
        location: "Pune Viman Nagar",
        rating: 5,
        date: "2026-08-24",
        text: "Super smooth rental experience! Picked it up near Pune Airport. Zero hassle, clean digital undertaking, and ₹500 deposit was refunded back to my UPI immediately after returning.",
        helpfulCount: 22
      },
      {
        id: "rev-activa-3",
        name: "Varun Sharma",
        location: "Delhi NCR Aerocity",
        rating: 5,
        date: "2026-08-21",
        text: "Great condition Activa! Perfect for commuting through Delhi traffic. Engine performance and combi brakes were top notch.",
        helpfulCount: 15
      },
      {
        id: "rev-activa-4",
        name: "Rajesh Patel",
        location: "Ahmedabad SG Highway",
        rating: 4,
        date: "2026-08-18",
        text: "Very convenient service. Got doorstep delivery in 35 mins at Prahlad Nagar. Scooter had good pick up and clean storage space.",
        helpfulCount: 11
      }
    ],
    "v-tvs-ntorq-125": [
      {
        id: "rev-ntorq-1",
        name: "Karan Johar",
        location: "Mumbai Bandra West",
        rating: 5,
        date: "2026-08-27",
        text: "Super sporty scooter! Bluetooth navigation on digital display helped me navigate Bandra easily. USB charging port in boot was super handy.",
        helpfulCount: 28
      },
      {
        id: "rev-ntorq-2",
        name: "Tanvi Roy",
        location: "Gurugram DLF Cyber City",
        rating: 5,
        date: "2026-08-23",
        text: "Pick up was prompt and Ntorq engine is very peppy. Clean helmets were provided.",
        helpfulCount: 17
      }
    ],
    "v-ather-450x": [
      {
        id: "rev-ather-1",
        name: "Devang Shah",
        location: "Gandhinagar GIFT City",
        rating: 5,
        date: "2026-08-28",
        text: "Warp mode acceleration on Ather 450X is crazy fast! Built-in Google Maps navigation worked like a charm.",
        helpfulCount: 42
      },
      {
        id: "rev-ather-2",
        name: "Pooja Malhotra",
        location: "Pune Hinjawadi",
        rating: 5,
        date: "2026-08-24",
        text: "Eco-friendly, silent, and extremely smooth ride around Hinjawadi IT Park. Delivered with 100% full battery charge!",
        helpfulCount: 25
      }
    ],
    "v-ola-s1-pro": [
      {
        id: "rev-ola-1",
        name: "Nikhil Joshi",
        location: "Mumbai Powai",
        rating: 5,
        date: "2026-08-27",
        text: "Amazing 195km range EV scooter! Hyper mode acceleration is thrilling and built-in Bluetooth speakers were great for playing music.",
        helpfulCount: 36
      },
      {
        id: "rev-ola-2",
        name: "Simran Kaur",
        location: "Noida Sector 62",
        rating: 4,
        date: "2026-08-21",
        text: "Large 34L boot space fitted two helmets easily. Cruise control made highway riding very relaxed.",
        helpfulCount: 19
      }
    ],
    "v-suzuki-access-125": [
      {
        id: "rev-access-1",
        name: "Abhishek Jain",
        location: "Mumbai Dadar",
        rating: 5,
        date: "2026-08-27",
        text: "Access 125 Bluetooth console with turn-by-turn navigation is a game changer! Great suspension comfort and very fuel efficient.",
        helpfulCount: 26
      }
    ],
    "v-tvs-jupiter-125": [
      {
        id: "rev-jupi-1",
        name: "Manish Shah",
        location: "Ahmedabad Satellite",
        rating: 5,
        date: "2026-08-25",
        text: "Massive 33L underseat storage fitted 2 full helmets effortlessly. Front external fuel filler makes refueling super fast.",
        helpfulCount: 22
      }
    ],
    "v-royal-enfield-350": [
      {
        id: "rev-re-1",
        name: "Vikramaditya Singh",
        location: "Delhi Connaught Place",
        rating: 5,
        date: "2026-08-26",
        text: "Classic 350 thump is legendary! Rented for a weekend ride through Delhi NCR. Bike was well-serviced, front disc brakes sharp, and dual helmets provided.",
        helpfulCount: 51
      },
      {
        id: "rev-re-2",
        name: "Aditya Kulkarni",
        location: "Pune Koregaon Park",
        rating: 5,
        date: "2026-08-23",
        text: "Tripper turn-by-turn navigation pod worked great. Comfortable dual seat for pillion rider. 10/10 cruiser experience!",
        helpfulCount: 39
      }
    ],
    "v-ktm-duke-390": [
      {
        id: "rev-ktm-1",
        name: "Rahul Verma",
        location: "Mumbai BKC",
        rating: 5,
        date: "2026-08-28",
        text: "43.5 bhp power on Duke 390 is insane! Bi-directional quickshifter makes gear shifts super crisp. Excellent tire grip and braking.",
        helpfulCount: 44
      },
      {
        id: "rev-ktm-2",
        name: "Yash Trivedi",
        location: "Ahmedabad SG Highway",
        rating: 5,
        date: "2026-08-25",
        text: "TFT color display with Bluetooth connectivity. Bike was freshly serviced and clean. Loved every kilometer!",
        helpfulCount: 27
      }
    ],
    "v-yamaha-r15": [
      {
        id: "rev-r15-1",
        name: "Sameer Deshmukh",
        location: "Pune Aundh",
        rating: 5,
        date: "2026-08-26",
        text: "Racing Blue R15 V4 looks stunning in person! VVA engine kicks in nicely at high RPMs. Traction control gives great confidence.",
        helpfulCount: 33
      }
    ],
    "v-bajaj-pulsar": [
      {
        id: "rev-pulsar-1",
        name: "Gaurav Sharma",
        location: "Delhi Karol Bagh",
        rating: 5,
        date: "2026-08-24",
        text: "NS200 has great low-end torque and liquid cooling keeps engine cool in city traffic. Very comfortable posture for daily rental.",
        helpfulCount: 21
      }
    ],
    "v-bmw-g310gs": [
      {
        id: "rev-bmwgs-1",
        name: "Vikram Rathore",
        location: "Pune Koregaon Park",
        rating: 5,
        date: "2026-08-28",
        text: "BMW G 310 GS suspension glides over speedbreakers and rough roads. Slipper clutch is butter smooth. Top class adventure touring bike!",
        helpfulCount: 45
      }
    ],
    "v-kawasaki-ninja-300": [
      {
        id: "rev-ninja-1",
        name: "Tushar Singhania",
        location: "Delhi Aerocity",
        rating: 5,
        date: "2026-08-26",
        text: "Parallel-twin exhaust note sounds super refined! Engine revs cleanly up to 13,000 RPM. ABS braking gave complete control on highway.",
        helpfulCount: 37
      }
    ],
    "v-mahindra-thar": [
      {
        id: "rev-thar-1",
        name: "Aditya Roy",
        location: "Mumbai BKC",
        rating: 5,
        date: "2026-08-25",
        text: "Took the Thar 4x4 for a weekend trip to Lonavala Ghats. Absolute beast of a vehicle! Clean interior, convertible top worked great, and 4WD mode handled wet roads effortlessly.",
        helpfulCount: 48
      },
      {
        id: "rev-thar-2",
        name: "Siddharth Verma",
        location: "Gurugram Cyber City",
        rating: 5,
        date: "2026-08-22",
        text: "Immaculate condition Thar! Automatic transmission is very responsive. Touchscreen music system & AC worked perfectly. 10/10 service.",
        helpfulCount: 29
      },
      {
        id: "rev-thar-3",
        name: "Parth Trivedi",
        location: "Surat Vesu",
        rating: 5,
        date: "2026-08-19",
        text: "Rented for a family trip to Goa. Zero security deposit plan gave complete peace of mind. Instant refund of security deposit.",
        helpfulCount: 19
      }
    ],
    "v-tata-nexon-ev": [
      {
        id: "rev-nexon-1",
        name: "Kavita Nair",
        location: "Pune Hinjawadi",
        rating: 5,
        date: "2026-08-27",
        text: "Loved the EV experience! Real-world range of 300+ km per charge. DriveX provided full battery state on delivery at Hinjawadi IT Park. Silent, fast acceleration!",
        helpfulCount: 31
      },
      {
        id: "rev-nexon-2",
        name: "Chirag Shah",
        location: "Gandhinagar GIFT City",
        rating: 5,
        date: "2026-08-23",
        text: "Best EV car rental in GIFT City! Fast charging cable was included in boot. Smooth automatic drive & sunroof was a great bonus.",
        helpfulCount: 18
      }
    ],
    "v-hyundai-creta": [
      {
        id: "rev-creta-1",
        name: "Manish Agarwal",
        location: "Gurugram Golf Course Road",
        rating: 5,
        date: "2026-08-27",
        text: "Creta Turbo SX (O) is super comfortable! Bose sound system and panoramic sunroof made our road trip awesome. Doorstep delivery was seamless.",
        helpfulCount: 38
      },
      {
        id: "rev-creta-2",
        name: "Deepak Patel",
        location: "Vadodara Alkapuri",
        rating: 5,
        date: "2026-08-22",
        text: "7-speed DCT gearbox shifts very fast. Clean leatherette seats and Level 2 ADAS safety features were great.",
        helpfulCount: 23
      }
    ],
    "v-toyota-fortuner": [
      {
        id: "rev-fortuner-1",
        name: "Harshvardhan Kapoor",
        location: "Mumbai South Extension",
        rating: 5,
        date: "2026-08-28",
        text: "Fortuner Legender 4x4 is unmatched in presence & power! 201 bhp engine had endless torque. Delivered in showroom condition with JBL 11 speaker audio.",
        helpfulCount: 56
      },
      {
        id: "rev-fortuner-2",
        name: "Rajveer Singh",
        location: "Delhi Aerocity",
        rating: 5,
        date: "2026-08-25",
        text: "Booked for VIP wedding event in Delhi NCR. Car was spotless, leather seats plush, and kick sensor tailgate made loading luggage easy.",
        helpfulCount: 41
      }
    ],
    "v-maruti-swift-zxi": [
      {
        id: "rev-swift-1",
        name: "Nilesh Patel",
        location: "Surat Adajan",
        rating: 5,
        date: "2026-08-27",
        text: "Swift ZXi+ dual tone is super nimble for city driving. 25+ kmpl mileage kept fuel costs low. Wireless Apple CarPlay worked instantly.",
        helpfulCount: 30
      }
    ],
    "v-bmw-3-series": [
      {
        id: "rev-bmw3-1",
        name: "Siddharth Merchant",
        location: "Mumbai Nariman Point",
        rating: 5,
        date: "2026-08-28",
        text: "BMW 3 Series Gran Limousine is pure luxury! Extended wheelbase gives amazing rear seat legroom. Harman Kardon audio system is phenomenal.",
        helpfulCount: 62
      }
    ]
  };

  const defaultSample = sampleDatabase[vehicle.id] || [
    {
      id: `rev-default-1-${vehicle.id}`,
      name: "Amit Joshi",
      location: "Mumbai Downtown",
      rating: 5,
      date: "2026-08-25",
      text: `Excellent experience with ${vehicle.name}! Vehicle condition was top notch, fully sanitized, and delivery executive arrived right on time.`,
      helpfulCount: 19
    },
    {
      id: `rev-default-2-${vehicle.id}`,
      name: "Pooja Malhotra",
      location: "Gurugram Cyber City",
      rating: 5,
      date: "2026-08-21",
      text: "Super hassle-free rental. Zero security deposit option worked seamlessly and customer support was very helpful.",
      helpfulCount: 14
    },
    {
      id: `rev-default-3-${vehicle.id}`,
      name: "Harshil Vora",
      location: "Ahmedabad SG Highway",
      rating: 4,
      date: "2026-08-17",
      text: `Well-maintained ${vehicle.name}. Pick up process took only 2 minutes. Highly recommended for city rides!`,
      helpfulCount: 8
    }
  ];

  return [...customList, ...defaultSample];
}

// Open Reviews Modal
function openVehicleReviewsModal(vehicleId) {
  const vehicle = FLEET_DATA.find(v => v.id === vehicleId);
  if (!vehicle) return;

  const displayImage = vehicle.customImage || vehicle.image;
  const displayTag = vehicle.customTag || vehicle.categoryLabel || vehicle.category;

  const imgEl = document.getElementById("review-modal-vehicle-img");
  if (imgEl) imgEl.src = displayImage;

  setText("review-modal-vehicle-name", vehicle.name);
  setText("review-modal-vehicle-cat", displayTag);
  setText("review-modal-avg-rating", vehicle.rating.toFixed(2));
  setText("review-modal-breakdown-count", vehicle.reviewsCount);
  setText("review-modal-total-count-subtitle", `${vehicle.reviewsCount} Verified Customer Reviews`);

  document.getElementById("add-review-vehicle-id").value = vehicle.id;

  // Pre-fill user name & location
  const userNameInput = document.getElementById("add-review-user-name");
  if (userNameInput) userNameInput.value = appState.currentUser.name || "Aarav Sharma";

  const userLocInput = document.getElementById("add-review-location");
  if (userLocInput) userLocInput.value = appState.location.selectedCity || "Mumbai Downtown";

  renderVehicleReviewsList(vehicle);

  const modal = document.getElementById("vehicle-reviews-modal");
  if (modal) modal.classList.remove("hidden");
}

function closeVehicleReviewsModal() {
  const modal = document.getElementById("vehicle-reviews-modal");
  if (modal) modal.classList.add("hidden");
}

function renderVehicleReviewsList(vehicle) {
  const container = document.getElementById("vehicle-reviews-list-container");
  if (!container) return;

  const reviews = getSampleReviewsForVehicle(vehicle);

  if (reviews.length === 0) {
    container.innerHTML = `<p class="text-xs text-on-surface-variant text-center py-6">No customer reviews yet. Be the first to write a review!</p>`;
    return;
  }

  container.innerHTML = reviews.map(r => {
    const starsHtml = "★".repeat(r.rating) + "☆".repeat(5 - r.rating);
    const initial = r.name ? r.name.charAt(0).toUpperCase() : "U";

    return `
      <div class="bg-surface border border-outline-variant/60 rounded-2xl p-4 shadow-2xs hover:border-secondary/50 transition-all">
        <div class="flex items-start justify-between gap-3 mb-2">
          <div class="flex items-center gap-2.5">
            <div class="w-9 h-9 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm border border-primary/20 shrink-0">
              ${initial}
            </div>
            <div>
              <div class="flex items-center gap-1.5">
                <h5 class="font-headline font-bold text-xs text-primary">${r.name}</h5>
                <span class="bg-emerald-50 text-emerald-700 border border-emerald-200/60 text-[9px] font-bold px-1.5 py-0.2 rounded-full flex items-center gap-0.5">
                  <span class="material-symbols-outlined text-[11px]">verified</span> Verified Renter
                </span>
                ${r.isUserAdded ? `<span class="bg-amber-100 text-amber-800 text-[9px] font-bold px-1.5 py-0.2 rounded-full">Your Review</span>` : ''}
              </div>
              <p class="text-[10px] text-on-surface-variant">${r.location} • ${r.date}</p>
            </div>
          </div>

          <div class="text-amber-500 font-bold text-xs shrink-0 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200/50">
            ${starsHtml} <span class="text-primary font-bold text-[11px] ml-0.5">${r.rating}.0</span>
          </div>
        </div>

        <p class="text-xs text-primary leading-relaxed mb-3">${r.text}</p>

        <div class="flex items-center justify-between pt-2 border-t border-outline-variant/40 text-[11px]">
          <span class="text-emerald-700 font-bold flex items-center gap-1">
            <span class="material-symbols-outlined text-xs">task_alt</span> 100% Sanitized Delivery
          </span>
          <button type="button" onclick="upvoteReviewHelpful('${vehicle.id}', '${r.id}', this)" class="text-on-surface-variant hover:text-secondary font-semibold flex items-center gap-1 transition-colors">
            <span class="material-symbols-outlined text-xs">thumb_up</span>
            Helpful (${r.helpfulCount || 1})
          </button>
        </div>
      </div>
    `;
  }).join("");
}

function submitNewVehicleReview(e) {
  if (e) e.preventDefault();

  const vehicleId = document.getElementById("add-review-vehicle-id").value;
  const vehicle = FLEET_DATA.find(v => v.id === vehicleId);
  if (!vehicle) return;

  const name = document.getElementById("add-review-user-name").value.trim() || appState.currentUser.name;
  const location = document.getElementById("add-review-location").value.trim() || "Mumbai";
  const rating = parseInt(document.getElementById("add-review-rating-select").value, 10) || 5;
  const text = document.getElementById("add-review-text").value.trim();

  if (!text) {
    showToast("Please write a short review before submitting!", "error");
    return;
  }

  const newReview = {
    id: `rev-user-${Date.now()}`,
    name,
    location,
    rating,
    date: new Date().toISOString().split('T')[0],
    text,
    helpfulCount: 1,
    isUserAdded: true
  };

  if (!appState.vehicleReviews[vehicle.id]) {
    appState.vehicleReviews[vehicle.id] = [];
  }
  appState.vehicleReviews[vehicle.id].unshift(newReview);

  // Update reviews count
  vehicle.reviewsCount = (vehicle.reviewsCount || 400) + 1;

  saveVehicleReviewsStore();

  // Reset text field
  document.getElementById("add-review-text").value = "";

  // Re-render
  renderVehicleReviewsList(vehicle);
  renderFeaturedFleet();
  renderFleetCatalog();

  setText("review-modal-total-count-subtitle", `${vehicle.reviewsCount} Verified Customer Reviews`);
  setText("review-modal-breakdown-count", vehicle.reviewsCount);

  showToast(`Thank you ${name}! Your review for ${vehicle.name} has been published.`);
}

function upvoteReviewHelpful(vehicleId, reviewId, btnEl) {
  if (btnEl.dataset.voted) return;

  btnEl.dataset.voted = "true";
  btnEl.classList.add("text-secondary", "font-bold");
  btnEl.innerHTML = `<span class="material-symbols-outlined text-xs">thumb_up</span> Voted!`;
  showToast("Thank you for marking review as helpful!");
}
