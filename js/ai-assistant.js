/**
 * DriveX - Intelligent AI Customer Assistant Engine ("Zip")
 * Handles natural language customer queries, fleet recommendations,
 * location coverage, booking assistance, safety policies, complaint registration & instant solutions.
 */

class DriveXAIAssistant {
  constructor() {
    this.isOpen = false;
    this.isListening = false;
    this.recognition = null;
    this.messages = [];
    
    // Knowledge Base FAQ & Policies
    this.policies = {
      documents: `📋 **Required Documents for Rental:**\n\n1. **Original Driving License (DL)** - Valid Indian DL (LMV for cars, Two-wheeler DL for scooters/bikes).\n2. **Govt ID Proof** - Aadhaar Card, Passport, or Voter ID for identity verification.\n3. **Age Limit:** Minimum 18 years for scooters/bikes, 21 years for cars/SUVs.\n\n*Note: Physical DL must be shown during doorstep delivery or pickup.*`,
      
      deposit: `💰 **Security Deposit Policy:**\n\n• **Scooters & Scooties:** ₹500 - ₹1,000 refund deposit.\n• **Bikes:** ₹1,000 - ₹2,000.\n• **Hatchbacks & Sedans:** ₹2,000 - ₹3,000.\n• **SUVs & Luxury:** ₹3,000 - ₹5,000.\n\n⚡ *Deposits are 100% refunded instantly to your UPI / Bank account upon safe vehicle return!*`,
      
      undertaking: `🛡️ **Vehicle Rental Undertaking Form:**\n\nBefore taking delivery, every customer signs a digital Vehicle Rental Undertaking Form agreeing to:\n• Maximum speed limit: 80 km/h (Scooters: 60 km/h).\n• No drunk driving or commercial sub-letting.\n• Helmet compulsion for both rider & pillion.\n• Zero liability for accidental damages if **Zero Liability Plan (₹299)** is chosen.`,
      
      cancellation: `🔄 **Cancellation & 100% Refund Policy:**\n\n• **Free Cancellation (>2 Hours before pickup):** 100% instant refund back to your UPI account within 10 minutes.\n• **Less than 2 Hours:** 1-day rental fee charged as nominal cancellation fee.\n• **No-Show:** 50% refund credited.`,

      delivery: `📍 **Doorstep Delivery & Self Pickup:**\n\n• **Doorstep Delivery (₹199):** Delivered right to your doorstep, hotel, home, or railway station within 45 minutes.\n• **Self Pickup (FREE):** Pick up directly from our nearest DriveX Hub / Airport station.`,

      support: `📞 **Customer Support & Assistance:**\n\n• **24x7 Helpline:** 1800-DRIVEX-IN (1800-374839)\n• **WhatsApp Support:** +91 98765 43210\n• **Emergency Roadside Assistance (RSA):** Press 'RSA Assistance' or call our dedicated breakdown team active 24/7 across Delhi NCR, Maharashtra & Gujarat.`
    };

    this.init();
  }

  init() {
    this.initSpeechRecognition();
    this.addInitialWelcomeMessage();
    this.initLauncherInteractions();
  }

  initLauncherInteractions() {
    const trigger = document.getElementById('ai-chat-trigger');
    const tooltip = document.getElementById('ai-trigger-tooltip');
    if (trigger && tooltip) {
      // Laptop / Desktop Mouse Hover
      trigger.addEventListener('mouseenter', () => {
        if (!this.isOpen) {
          tooltip.classList.add('flash-active');
        }
      });
      trigger.addEventListener('mouseleave', () => {
        tooltip.classList.remove('flash-active');
      });

      // Mobile Phone Touch & Periodic Auto-Flash Behavior
      const showMobileFlash = () => {
        if (!this.isOpen) {
          tooltip.classList.add('flash-active', 'mobile-visible');
          setTimeout(() => {
            if (!this.isOpen) {
              tooltip.classList.remove('flash-active', 'mobile-visible');
            }
          }, 3800);
        }
      };

      // Initial auto-flash on mobile after 1.5s
      setTimeout(showMobileFlash, 1500);

      // Periodic auto-flash every 8s on touch / mobile screens
      setInterval(showMobileFlash, 8000);
    }
  }

  addInitialWelcomeMessage() {
    this.messages = [
      {
        sender: 'bot',
        text: `Hello! 👋 I'm **Zip**, your AI Assistant.\n\nHow can I help you?`,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: [
          "🚗 Rent Car under ₹2000",
          "⚡ Electric Scooters",
          "⚠️ Lodge a Complaint",
          "📜 Required Documents",
          "📍 Available Cities",
          "📦 Track My Booking"
        ]
      }
    ];
  }

  initSpeechRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      this.recognition = new SpeechRecognition();
      this.recognition.continuous = false;
      this.recognition.interimResults = false;
      this.recognition.lang = 'en-IN';

      this.recognition.onstart = () => {
        this.isListening = true;
        this.updateMicUI();
      };

      this.recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        const inputEl = document.getElementById('ai-chat-input');
        if (inputEl) {
          inputEl.value = transcript;
          this.handleSendMessage();
        }
      };

      this.recognition.onerror = () => {
        this.isListening = false;
        this.updateMicUI();
      };

      this.recognition.onend = () => {
        this.isListening = false;
        this.updateMicUI();
      };
    }
  }

  toggleVoiceInput() {
    if (!this.recognition) {
      alert("Voice recognition is not supported in your browser. Please type your query!");
      return;
    }
    if (this.isListening) {
      this.recognition.stop();
    } else {
      this.recognition.start();
    }
  }

  updateMicUI() {
    const micBtn = document.getElementById('ai-mic-btn');
    if (!micBtn) return;
    if (this.isListening) {
      micBtn.classList.add('bg-red-500', 'text-white', 'animate-pulse');
      micBtn.classList.remove('bg-surface-container-low', 'text-on-surface-variant');
      micBtn.title = "Listening... Speak now";
    } else {
      micBtn.classList.remove('bg-red-500', 'text-white', 'animate-pulse');
      micBtn.classList.add('bg-surface-container-low', 'text-on-surface-variant');
      micBtn.title = "Voice Input";
    }
  }

  toggleChat() {
    this.isOpen = !this.isOpen;
    const panel = document.getElementById('ai-chat-panel');
    const badge = document.getElementById('ai-trigger-badge');
    const tooltip = document.getElementById('ai-trigger-tooltip');

    if (panel) {
      if (this.isOpen) {
        panel.classList.remove('hidden');
        panel.classList.add('flex');
        if (badge) badge.classList.add('hidden');
        if (tooltip) tooltip.style.display = 'none';
        this.renderMessages();
        const input = document.getElementById('ai-chat-input');
        if (input) input.focus();
      } else {
        panel.classList.add('hidden');
        panel.classList.remove('flex');
        if (tooltip) tooltip.style.display = '';
      }
    }
  }

  handleSendMessage(text = null) {
    const inputEl = document.getElementById('ai-chat-input');
    const query = text || (inputEl ? inputEl.value.trim() : '');
    if (!query) return;

    if (inputEl) inputEl.value = '';

    // Add user message
    const userMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    this.messages.push(userMsg);
    this.renderMessages();

    // Show bot typing indicator
    this.showTypingIndicator();

    // Process AI logic with natural slight delay
    setTimeout(() => {
      this.removeTypingIndicator();
      const response = this.processUserQuery(query);
      this.messages.push(response);
      this.renderMessages();
    }, 600);
  }

  showTypingIndicator() {
    const container = document.getElementById('ai-messages-container');
    if (!container) return;
    const typingHtml = `
      <div id="ai-typing-indicator" class="flex gap-2.5 items-end max-w-[85%] animate-fade-in">
        <img src="images/zip_icon.svg" alt="Zip" class="w-8 h-8 rounded-full object-contain shrink-0 shadow-sm"/>
        <div class="bg-surface-container-low border border-outline-variant/50 p-3 rounded-2xl rounded-bl-none text-xs text-on-surface-variant flex items-center gap-1.5 shadow-sm">
          <span class="w-2 h-2 bg-secondary rounded-full animate-ping"></span>
          <span class="font-medium text-primary">Zip is thinking...</span>
        </div>
      </div>
    `;
    container.insertAdjacentHTML('beforeend', typingHtml);
    container.scrollTop = container.scrollHeight;
  }

  removeTypingIndicator() {
    const indicator = document.getElementById('ai-typing-indicator');
    if (indicator) indicator.remove();
  }

  processUserQuery(query) {
    const q = query.toLowerCase();
    const currentCity = appState.location?.selectedCity || 'Mumbai';

    // 0. COMPLAINT & ISSUE LODGING INTENT
    if (q.includes('complain') || q.includes('complaint') || q.includes('issue') || q.includes('problem') || q.includes('bad service') || q.includes('breakdown') || q.includes('damage') || q.includes('dispute') || q.includes('lodge') || q.includes('report')) {
      return {
        sender: 'bot',
        text: `⚠️ **Customer Grievance & Complaint Desk:**\n\nWe are extremely sorry for any inconvenience caused! You can write your specific complaint in detail, and Zip will issue an instant resolution & priority support ticket for you.`,
        actionButton: {
          label: "✍️ Write & Submit Your Complaint",
          action: "window.aiAssistant.openComplaintModal()"
        },
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ["📞 Call 24x7 Support", "📦 Track Active Ticket", "🚗 Rent another car"]
      };
    }

    // CHECK FOR TRACKING TICKET ID (e.g. TKT-...)
    if (q.includes('tkt-') || q.includes('ticket')) {
      const ticketMatch = query.match(/TKT-[A-Z0-9-]+/i);
      const ticketId = ticketMatch ? ticketMatch[0].toUpperCase() : null;
      
      const found = (appState.complaints || []).find(c => c.ticketId === ticketId);
      if (found) {
        return {
          sender: 'bot',
          text: `🔍 **Complaint Ticket Status:**\n\n• **Ticket ID:** \`${found.ticketId}\`\n• **Category:** ${found.category}\n• **Booking ID:** \`${found.bookingId}\`\n• **Status:** 🟢 **${found.status}**\n• **Resolution Summary:** ${found.resolutionText}\n• **Filed Date:** ${found.createdAt}`,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: ["📞 Contact Support Officer", "⚠️ Submit Another Complaint", "🚗 Browse Fleet"]
        };
      } else {
        return {
          sender: 'bot',
          text: `I searched your registered tickets, but could not find matching Ticket ID. You can submit a new complaint anytime!`,
          actionButton: {
            label: "✍️ File a New Complaint",
            action: "window.aiAssistant.openComplaintModal()"
          },
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: ["⚠️ Lodge a Complaint", "📞 Customer Helpline"]
        };
      }
    }

    // 1. CHEAP / BUDGET VEHICLE QUERIES
    if (q.includes('under') || q.includes('budget') || q.includes('cheap') || q.includes('affordable') || q.includes('low price')) {
      let maxPrice = 3000;
      const numbers = q.match(/\d+/g);
      if (numbers && numbers.length > 0) {
        maxPrice = parseInt(numbers[0], 10);
      } else if (q.includes('cheap') || q.includes('affordable')) {
        maxPrice = 1000;
      }

      const matchingVehicles = FLEET_DATA.filter(v => (v.pricePerDay <= maxPrice) || (v.pricePerHour <= maxPrice / 10));
      matchingVehicles.sort((a, b) => a.pricePerDay - b.pricePerDay);

      if (matchingVehicles.length > 0) {
        const topVehicles = matchingVehicles.slice(0, 3);
        return {
          sender: 'bot',
          text: `Great budget choice! Here are top vehicles available in **${currentCity}** under **₹${maxPrice}** per day:`,
          vehicles: topVehicles,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: ["🚗 Filter Cars", "🛵 Scooters", "⚡ Electric Vehicles", "📜 Document Check"]
        };
      }
    }

    // 2. SCOOTY / SCOOTER QUERIES
    if (q.includes('scooty') || q.includes('scooter') || q.includes('activa') || q.includes('ntorq') || q.includes('two wheeler')) {
      const scooties = FLEET_DATA.filter(v => v.category === 'scooty');
      return {
        sender: 'bot',
        text: `Here are our most popular **Scooters & Scooties** available for instant booking in **${currentCity}** starting from just **₹299/day** (₹49/hour):`,
        vehicles: scooties.slice(0, 3),
        actionButton: {
          label: "View All Scooties in Fleet",
          action: "showCategory('scooty')"
        },
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ["⚡ Electric Scooters", "🏍️ Royal Enfield Bikes", "📜 DL Rules"]
      };
    }

    // 3. ELECTRIC VEHICLES (EV)
    if (q.includes('ev') || q.includes('electric') || q.includes('battery') || q.includes('ather') || q.includes('ola') || q.includes('nexon ev')) {
      const evs = FLEET_DATA.filter(v => v.fuelType?.toLowerCase().includes('electric') || v.category === 'ev' || v.name.toLowerCase().includes('ev'));
      return {
        sender: 'bot',
        text: `🌱 **Eco-Friendly Electric Vehicles (EVs)** in **${currentCity}** with zero emissions & fast charging:`,
        vehicles: evs.slice(0, 3),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ["🔋 EV Charging Stations", "🚗 Rent SUV", "💰 Deposit Info"]
      };
    }

    // 4. SUV & THAR / LUXURY CARS
    if (q.includes('suv') || q.includes('thar') || q.includes('creta') || q.includes('xuv') || q.includes('luxury') || q.includes('fortuner') || q.includes('scorpio') || q.includes('seltos')) {
      const suvs = FLEET_DATA.filter(v => v.category === 'cars' && (v.name.toLowerCase().includes('thar') || v.name.toLowerCase().includes('scorpio') || v.name.toLowerCase().includes('fortuner') || v.name.toLowerCase().includes('creta') || v.name.toLowerCase().includes('seltos') || v.name.toLowerCase().includes('brezza') || v.name.toLowerCase().includes('punch')));
      return {
        sender: 'bot',
        text: `🏔️ Looking for power, comfort, & style? Check out our top **SUVs & Cars**:`,
        vehicles: suvs.slice(0, 3),
        actionButton: {
          label: "Explore All Cars & SUVs",
          action: "showCategory('cars')"
        },
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ["🛡️ Zero Liability Plan", "📍 Airport Delivery", "📜 Undertaking Terms"]
      };
    }

    // 5. CAR RENTAL GENERAL
    if (q.includes('car') || q.includes('four wheeler') || q.includes('sedan') || q.includes('swift') || q.includes('hatchback')) {
      const cars = FLEET_DATA.filter(v => v.category === 'cars');
      return {
        sender: 'bot',
        text: `🚘 We have a wide range of hatchbacks, sedans, & SUVs available in **${currentCity}**:`,
        vehicles: cars.slice(0, 3),
        actionButton: {
          label: "Browse Full Car Fleet",
          action: "showCategory('cars')"
        },
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ["🚗 Hatchbacks under ₹1500", "⚡ Nexon EV", "📜 Required Docs"]
      };
    }

    // 6. LOCATION / CITY AVAILABILITY
    if (q.includes('city') || q.includes('cities') || q.includes('location') || q.includes('mumbai') || q.includes('pune') || q.includes('delhi') || q.includes('noida') || q.includes('gurugram') || q.includes('ahmedabad') || q.includes('surat') || q.includes('vadodara') || q.includes('rajkot') || q.includes('gandhinagar') || q.includes('state') || q.includes('district')) {
      const matchedState = Object.keys(INDIA_LOCATIONS_DATA).find(s => q.includes(s.toLowerCase()));
      let textContent = `🗺️ **DriveX Operations & Google Maps Location Support:**\n\nWe operate exclusively across **Delhi (NCR), Maharashtra, & Gujarat** with full district Google Maps support, doorstep delivery & instant GPS pin picking!`;
      
      if (matchedState) {
        const districts = INDIA_LOCATIONS_DATA[matchedState].districts || [];
        const distNames = districts.map(d => d.name).join(', ');
        textContent += `\n\n📍 **${matchedState} Districts:** ${distNames}`;
      } else {
        textContent += `\n\n📍 **States Covered:**\n• **Delhi (NCR):** New Delhi, South Delhi, Gurugram, Noida, West Delhi, Central Delhi\n• **Maharashtra:** Mumbai City, Mumbai Suburban, Pune, Thane, Nagpur, Nashik, Sambhajinagar\n• **Gujarat:** Ahmedabad, Gandhinagar, Surat, Vadodara, Rajkot`;
      }

      return {
        sender: 'bot',
        text: textContent,
        actionButton: {
          label: "📍 Open District Location & Map Picker",
          action: "openAddressModal()"
        },
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ["🗺️ Delhi NCR Districts", "📍 Mumbai & Pune Districts", "🚗 Gujarat Hubs"]
      };
    }

    // 7. REQUIRED DOCUMENTS
    if (q.includes('document') || q.includes('license') || q.includes('dl') || q.includes('aadhaar') || q.includes('id proof') || q.includes('age') || q.includes('requirement')) {
      return {
        sender: 'bot',
        text: this.policies.documents,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ["🛡️ Security Deposit", "📜 Undertaking Form", "🚗 Rent a Car"]
      };
    }

    // 8. SECURITY DEPOSIT
    if (q.includes('deposit') || q.includes('security') || q.includes('refund') || q.includes('money back')) {
      return {
        sender: 'bot',
        text: this.policies.deposit,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ["📜 Cancellation Terms", "💳 Payment Options", "🚗 Book Now"]
      };
    }

    // 9. UNDERTAKING & SPEED LIMIT
    if (q.includes('undertaking') || q.includes('rules') || q.includes('speed') || q.includes('policy') || q.includes('insurance') || q.includes('damage') || q.includes('protection')) {
      return {
        sender: 'bot',
        text: this.policies.undertaking,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ["📜 Required Docs", "💰 Security Deposit", "🚗 Explore Fleet"]
      };
    }

    // 10. CANCELLATION & REFUND
    if (q.includes('cancel') || q.includes('cancellation') || q.includes('refund time') || q.includes('money back')) {
      return {
        sender: 'bot',
        text: this.policies.cancellation,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ["📦 Track My Booking", "📞 Customer Care", "🚗 New Booking"]
      };
    }

    // 11. TRACK ACTIVE BOOKINGS
    if (q.includes('my booking') || q.includes('track') || q.includes('status') || q.includes('drv-in') || q.includes('booking id')) {
      const bookings = appState.myBookings || [];
      if (bookings.length > 0) {
        const latest = bookings[0];
        return {
          sender: 'bot',
          text: `📦 **Active Booking Details:**\n\n• **Booking ID:** \`${latest.bookingId}\`\n• **Vehicle:** ${latest.vehicle.name}\n• **Pickup Date:** ${latest.pickupDate}\n• **Return Date:** ${latest.returnDate}\n• **City:** ${latest.pickupCity}\n• **Status:** 🟢 **${latest.status}**\n• **Total Amount:** ₹${latest.totalAmount.toLocaleString()}`,
          actionButton: {
            label: "Open My Bookings Tab",
            action: "navigateTo('bookings')"
          },
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: ["🔄 Cancel Booking", "⚠️ Submit Complaint", "📞 Customer Care"]
        };
      } else {
        return {
          sender: 'bot',
          text: `You currently have no active bookings in your account. Ready to plan your road trip?`,
          actionButton: {
            label: "Explore Fleet Catalog",
            action: "navigateTo('fleet')"
          },
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          suggestions: ["🚗 Scooty under ₹300", "🚘 Hatchback Cars", "⚡ Electric Scooters"]
        };
      }
    }

    // 12. HUMAN / HELP DESK / CONTACT
    if (q.includes('human') || q.includes('support') || q.includes('contact') || q.includes('call') || q.includes('phone') || q.includes('whatsapp') || q.includes('helpline') || q.includes('agent')) {
      return {
        sender: 'bot',
        text: this.policies.support,
        actionButton: {
          label: "🟢 Connect on WhatsApp",
          action: "window.open('https://wa.me/919876543210?text=Hi%20DriveX%20Support,%20I%20need%20assistance', '_blank')"
        },
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ["📜 Required Documents", "⚠️ File a Complaint", "📦 Track My Booking"]
      };
    }

    // GENERAL FALLBACK WITH SMART CATALOG MATCHING
    const matchingAny = FLEET_DATA.filter(v => v.name.toLowerCase().includes(q) || v.category.toLowerCase().includes(q) || v.fuelType?.toLowerCase().includes(q));

    if (matchingAny.length > 0) {
      return {
        sender: 'bot',
        text: `Here are vehicles matching "${query}":`,
        vehicles: matchingAny.slice(0, 3),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ["🚗 View All Fleet", "📜 Document Checklist", "📍 Delivery Cities"]
      };
    }

    // Smart default response
    return {
      sender: 'bot',
      text: `I'm **Zip**, your AI Assistant! I'm here to help with your rental questions:\n\n• **Vehicle recommendations** (e.g. *"Show SUVs under ₹3000"* or *"Rent Honda Activa"*)\n• **City coverage** (e.g. *"Is service in Pune or Mumbai?"*)\n• **Documents required** (Driving License & Aadhaar rules)\n• **Security deposit & cancellation policy**\n• **Submitting a customer complaint & getting instant solution**`,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      suggestions: [
        "🚗 Cars under ₹2000",
        "🛵 Activa Scooty",
        "⚡ EV Scooters",
        "⚠️ Lodge a Complaint",
        "📜 Documents Required"
      ]
    };
  }

  // ================= COMPLAINT SYSTEM METHODS =================
  openComplaintModal() {
    const modal = document.getElementById('complaint-modal');
    if (modal) {
      modal.classList.remove('hidden');
      modal.classList.add('flex');
      
      // Auto-populate booking ID if available
      const bInput = document.getElementById('complaint-booking-id');
      if (bInput && appState.myBookings?.length > 0) {
        bInput.value = appState.myBookings[0].bookingId;
      }
    }
  }

  closeComplaintModal() {
    const modal = document.getElementById('complaint-modal');
    if (modal) {
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    }
  }

  submitComplaintForm(event) {
    if (event) event.preventDefault();

    const name = document.getElementById('complaint-name')?.value || appState.currentUser.name;
    const phone = document.getElementById('complaint-phone')?.value || appState.currentUser.phone;
    const bookingId = document.getElementById('complaint-booking-id')?.value || "DRV-IN-9842-X";
    const category = document.getElementById('complaint-category')?.value || "Vehicle Condition / Cleanliness";
    const details = document.getElementById('complaint-details')?.value || "General complaint submitted by customer.";

    // Generate unique Ticket ID
    const ticketId = `TKT-DRV-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date().toLocaleString([], { dateStyle: 'medium', timeStyle: 'short' });

    // AI Keyword & Category Solution Engine
    let resolutionText = "";
    let actionCTA = null;
    const dLower = details.toLowerCase();

    if (category.includes('Breakdown') || dLower.includes('breakdown') || dLower.includes('puncture') || dLower.includes('engine') || dLower.includes('starter')) {
      resolutionText = `🚨 **Emergency RSA Dispatched!**\n\n• **Action Taken:** Our 24x7 Roadside Assistance team has been dispatched to your GPS location.\n• **ETA:** ~25 minutes.\n• **Replacement:** A replacement vehicle is assigned free of cost.\n• **Compensation:** ₹500 DriveX wallet credit added to your account for the inconvenience.`;
      actionCTA = {
        label: "📞 Call Emergency Breakdown Officer",
        action: "window.open('tel:18003748362')"
      };
    } else if (category.includes('Deposit') || dLower.includes('deposit') || dLower.includes('refund') || dLower.includes('bank')) {
      resolutionText = `💰 **Security Deposit Refund Escalated!**\n\n• **Action Taken:** Priority refund flag attached to UPI transaction.\n• **Bank Status:** Instant 100% refund of security deposit approved.\n• **Timeline:** Will be credited back to your UPI app (PhonePe / GPay) within 15-30 minutes.`;
      actionCTA = {
        label: "💳 Check Refund Status",
        action: "window.aiAssistant.handleSendMessage('Status of ticket " + ticketId + "')"
      };
    } else if (category.includes('Delay') || dLower.includes('late') || dLower.includes('wait') || dLower.includes('delivery')) {
      resolutionText = `🚚 **Delivery Delay Compensation Applied!**\n\n• **Action Taken:** Doorstep Delivery Fee (₹199) is instantly waived & refunded.\n• **Delivery Status:** Delivery executive assigned priority express route.\n• **Discount:** Extra 10% discount promo code **'SORRY10'** generated for your next ride.`;
    } else if (category.includes('Cleanliness') || dLower.includes('dirty') || dLower.includes('smell') || dLower.includes('scratch')) {
      resolutionText = `✨ **Vehicle Quality Resolution:**\n\n• **Action Taken:** Cleanliness voucher of ₹300 credited to your account.\n• **Quality Audit:** Delivery partner flagged for quality re-training.\n• **Damage Note:** Pre-existing scratches logged in rental undertaking form—you will not be charged!`;
    } else {
      resolutionText = `📝 **Senior Grievance Officer Assigned:**\n\n• **Action Taken:** Complaint registered under Ticket ID \`${ticketId}\`.\n• **Status:** Senior Operations Lead assigned for review.\n• **Callback Guarantee:** You will receive a direct phone call on **${phone}** within 15 minutes.`;
      actionCTA = {
        label: "💬 Chat on WhatsApp Support",
        action: "window.open('https://wa.me/919876543210?text=Issue%20Ticket%20" + ticketId + "', '_blank')"
      };
    }

    // Save ticket to appState
    const ticketObj = {
      ticketId,
      customerName: name,
      phone,
      bookingId,
      category,
      details,
      status: "Resolved & Dispatched",
      createdAt: now,
      resolutionText
    };

    appState.complaints.unshift(ticketObj);

    // Close Modal
    this.closeComplaintModal();

    // Reset Form
    const form = document.getElementById('complaint-form');
    if (form) form.reset();

    // Open AI Chat Panel & Post Instant AI Resolution
    if (!this.isOpen) this.toggleChat();

    // Post resolution to AI Chat
    setTimeout(() => {
      this.messages.push({
        sender: 'bot',
        text: `✅ **Complaint Registered & Solved Instantaneously!**\n\n• **Ticket ID:** \`${ticketId}\`\n• **Category:** ${category}\n• **Booking Ref:** \`${bookingId}\`\n\n---\n\n${resolutionText}`,
        actionButton: actionCTA,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestions: ["📦 Track Ticket Status", "📞 Helpline Number", "🚗 Return to Home"]
      });
      this.renderMessages();
    }, 400);

    // Show toast notification
    if (typeof showToast === 'function') {
      showToast(`Complaint submitted! Ticket ID: ${ticketId}`, 'success');
    }
  }

  renderMessages() {
    const container = document.getElementById('ai-messages-container');
    if (!container) return;

    container.innerHTML = '';

    this.messages.forEach(msg => {
      if (msg.sender === 'user') {
        const userHtml = `
          <div class="flex gap-2.5 items-end justify-end max-w-[85%] ml-auto animate-fade-in">
            <div class="bg-primary text-on-primary p-3 rounded-2xl rounded-br-none text-xs leading-relaxed shadow-sm font-body">
              ${this.escapeHtml(msg.text)}
              <div class="text-[9px] text-white/60 text-right mt-1 font-mono">${msg.time}</div>
            </div>
            <div class="w-7 h-7 rounded-full bg-secondary text-on-secondary flex items-center justify-center text-[11px] font-bold shrink-0">
              👤
            </div>
          </div>
        `;
        container.insertAdjacentHTML('beforeend', userHtml);
      } else {
        // Formatted Markdown text
        let formattedText = this.formatMarkdown(msg.text);

        // Vehicle Recommendation Cards inside chat
        let vehiclesCardHtml = '';
        if (msg.vehicles && msg.vehicles.length > 0) {
          vehiclesCardHtml = `
            <div class="mt-3 space-y-2.5">
              ${msg.vehicles.map(v => `
                <div class="bg-white border border-outline-variant/60 hover:border-secondary rounded-xl p-2.5 shadow-sm transition-all flex items-center gap-3">
                  <img src="${v.image}" alt="${v.name}" class="w-16 h-14 object-cover rounded-lg shrink-0 border border-gray-100"/>
                  <div class="flex-1 min-w-0">
                    <div class="flex items-center justify-between gap-1">
                      <h4 class="font-headline font-bold text-xs text-primary truncate">${v.name}</h4>
                      <span class="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-1.5 py-0.5 rounded">★ ${v.rating}</span>
                    </div>
                    <div class="text-[10px] text-gray-500 font-medium truncate">${v.categoryLabel} • ${v.transmission || v.fuelType}</div>
                    <div class="flex items-center justify-between mt-1">
                      <span class="font-headline font-extrabold text-xs text-secondary">₹${v.pricePerDay}<span class="text-[9px] font-normal text-gray-500">/day</span></span>
                      <button onclick="window.aiAssistant.selectAndBookVehicle('${v.id}')" class="bg-primary hover:bg-primary-container text-white text-[10px] font-bold px-2.5 py-1 rounded-lg shadow-sm transition-all active:scale-95 flex items-center gap-1">
                        Book Now
                        <span class="material-symbols-outlined text-[12px]">arrow_forward</span>
                      </button>
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          `;
        }

        // Action Button CTA inside chat
        let actionBtnHtml = '';
        if (msg.actionButton) {
          actionBtnHtml = `
            <div class="mt-3">
              <button onclick="${msg.actionButton.action}" class="w-full bg-secondary hover:bg-secondary-hover text-on-secondary font-bold text-xs py-2 rounded-xl shadow-sm transition-all active:scale-95 flex items-center justify-center gap-1.5">
                ${msg.actionButton.label}
              </button>
            </div>
          `;
        }

        // Quick Suggestion Chips
        let suggestionsHtml = '';
        if (msg.suggestions && msg.suggestions.length > 0) {
          suggestionsHtml = `
            <div class="mt-3 flex flex-wrap gap-1.5">
              ${msg.suggestions.map(s => `
                <button onclick="window.aiAssistant.handleSendMessage('${this.escapeHtml(s)}')" class="bg-surface-container border border-outline-variant/60 hover:border-secondary hover:bg-secondary/10 text-primary text-[10px] font-semibold px-2.5 py-1 rounded-full transition-all">
                  ${s}
                </button>
              `).join('')}
            </div>
          `;
        }

        const botHtml = `
          <div class="flex gap-2.5 items-start max-w-[90%] animate-fade-in">
            <img src="images/zip_icon.svg" alt="Zip" class="w-8 h-8 rounded-full object-contain shrink-0 shadow-sm mt-0.5"/>
            <div class="bg-surface-container-low border border-outline-variant/50 p-3 rounded-2xl rounded-tl-none text-xs text-on-surface leading-relaxed shadow-sm font-body">
              <div>${formattedText}</div>
              ${vehiclesCardHtml}
              ${actionBtnHtml}
              ${suggestionsHtml}
              <div class="text-[9px] text-gray-400 text-right mt-1.5 font-mono">${msg.time}</div>
            </div>
          </div>
        `;
        container.insertAdjacentHTML('beforeend', botHtml);
      }
    });

    container.scrollTop = container.scrollHeight;
  }

  selectAndBookVehicle(vehicleId) {
    const v = FLEET_DATA.find(item => item.id === vehicleId);
    if (!v) return;

    // Switch to fleet catalog view or launch booking directly
    if (typeof navigateTo === 'function') {
      navigateTo('fleet');
    }
    if (typeof openBookingModal === 'function') {
      setTimeout(() => {
        openBookingModal(v);
      }, 200);
    }
    
    // Close AI Chat to let user complete booking
    this.toggleChat();
  }

  escapeHtml(text) {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
  }

  formatMarkdown(text) {
    if (!text) return '';
    return text
      .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold text-primary">$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`([^`]+)`/g, '<code class="bg-surface-container-high px-1 py-0.5 rounded text-[11px] font-mono text-primary">$1</code>')
      .replace(/\n/g, '<br/>');
  }

  clearChat() {
    this.addInitialWelcomeMessage();
    this.renderMessages();
  }
}

// Global Category Helper for AI Action Buttons
function showCategory(category) {
  const cat = (category === 'car' || category === 'suv' || category === 'luxury') ? 'cars' : category;
  if (typeof filterCategory === 'function') {
    filterCategory(cat);
  } else if (typeof selectCategory === 'function') {
    selectCategory(cat);
  }
  if (typeof navigateTo === 'function') {
    navigateTo('fleet');
  }
  if (window.aiAssistant && window.aiAssistant.isOpen) {
    window.aiAssistant.toggleChat();
  }
}

// Initialize AI Assistant on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  window.aiAssistant = new DriveXAIAssistant();
});
