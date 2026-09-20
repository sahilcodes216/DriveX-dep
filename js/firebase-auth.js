/* ===============================================================
   FIREBASE INTEGRATION — PHONE AUTH + STORAGE + FIRESTORE
   ===============================================================
   
   HOW TO SET UP:
   1. Go to https://console.firebase.google.com/
   2. Create a new project (or use existing)
   3. Enable these services:
      a) Authentication > Sign-in method > Phone → Enable
      b) Cloud Firestore > Create database > Start in TEST mode
      c) Storage > Get started > Start in TEST mode
   4. Add your domain to Authorized domains
   5. Copy your Firebase config below
   
   FREE SPARK PLAN (No credit card required):
   - Phone Auth: 10K SMS/month
   - Cloud Storage: 5 GB storage, 1 GB/day download
   - Firestore: 1 GB storage, 50K reads/day, 20K writes/day
   
   =============================================================== */

// ==================== FIREBASE CONFIGURATION ====================
// 🔴 REPLACE THIS WITH YOUR FIREBASE PROJECT CONFIG
const FIREBASE_CONFIG = {
  apiKey: "YOUR_API_KEY_HERE",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// ==================== STATE ====================
let firebaseInitialized = false;
let recaptchaVerifier = null;
let confirmationResult = null;
let isFirebaseConfigured = false;
let db = null;         // Firestore reference
let storage = null;    // Storage reference

// ==================== INITIALIZATION ====================
function initFirebaseAuth() {
  try {
    // Check if Firebase config has been replaced with real values
    if (FIREBASE_CONFIG.apiKey === "YOUR_API_KEY_HERE") {
      console.warn("[DriveX Firebase] Firebase config not set. Running in DEMO mode.");
      isFirebaseConfigured = false;
      
      const notice = document.getElementById('firebase-config-notice');
      if (notice) notice.classList.remove('hidden');
      return;
    }

    // Initialize Firebase
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
    }
    
    // Initialize services
    db = firebase.firestore();
    storage = firebase.storage();
    
    firebaseInitialized = true;
    isFirebaseConfigured = true;
    console.log("[DriveX Firebase] ✅ All services initialized (Auth + Storage + Firestore)");

  } catch (error) {
    console.error("[DriveX Firebase] Initialization error:", error);
    isFirebaseConfigured = false;
  }
}

// ==================== reCAPTCHA SETUP ====================
function setupRecaptcha() {
  if (!firebaseInitialized) return false;

  try {
    if (recaptchaVerifier) {
      recaptchaVerifier.clear();
      recaptchaVerifier = null;
    }

    const container = document.getElementById('recaptcha-container');
    if (!container) return false;
    container.innerHTML = '';

    recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container', {
      'size': 'invisible',
      'callback': () => console.log("[DriveX Firebase] reCAPTCHA solved."),
      'expired-callback': () => { setupRecaptcha(); }
    });

    return true;
  } catch (error) {
    console.error("[DriveX Firebase] reCAPTCHA setup error:", error);
    return false;
  }
}

// ==================== PHONE AUTH: SEND OTP ====================
async function sendFirebaseOtp(phoneNumber) {
  if (!firebaseInitialized) throw new Error("Firebase not initialized.");

  if (!recaptchaVerifier) {
    if (!setupRecaptcha()) throw new Error("Failed to setup reCAPTCHA.");
  }

  try {
    const fullPhone = `+91${phoneNumber}`;
    confirmationResult = await firebase.auth().signInWithPhoneNumber(fullPhone, recaptchaVerifier);
    console.log("[DriveX Firebase] OTP sent to", fullPhone);
    return true;
  } catch (error) {
    console.error("[DriveX Firebase] Send OTP error:", error);
    recaptchaVerifier = null;
    
    const msgs = {
      'auth/invalid-phone-number': 'Invalid phone number. Enter a valid 10-digit number.',
      'auth/too-many-requests': 'Too many requests. Wait a few minutes.',
      'auth/quota-exceeded': 'SMS quota exceeded. Try again later.',
      'auth/captcha-check-failed': 'Security check failed. Refresh and try again.',
      'auth/operation-not-allowed': 'Phone auth not enabled. Enable in Firebase Console.',
      'auth/app-not-authorized': 'Domain not authorized. Add it in Firebase Console.'
    };
    throw new Error(msgs[error.code] || `Failed: ${error.message}`);
  }
}

// ==================== PHONE AUTH: VERIFY OTP ====================
async function verifyFirebaseOtp(otpCode) {
  if (!confirmationResult) throw new Error("No OTP sent yet.");

  try {
    const result = await confirmationResult.confirm(otpCode);
    const user = result.user;
    console.log("[DriveX Firebase] ✅ Verified! UID:", user.uid);
    
    return {
      success: true,
      uid: user.uid,
      phoneNumber: user.phoneNumber,
      isNewUser: result.additionalUserInfo?.isNewUser || false
    };
  } catch (error) {
    const msgs = {
      'auth/invalid-verification-code': 'Incorrect OTP. Please try again.',
      'auth/code-expired': 'OTP expired. Request a new one.',
      'auth/session-expired': 'Session expired. Request a new OTP.'
    };
    throw new Error(msgs[error.code] || `Verification failed: ${error.message}`);
  }
}

// ==================== FIREBASE STORAGE: UPLOAD DOCUMENT ====================
/**
 * Upload a file to Firebase Storage
 * @param {File} file - The file object to upload
 * @param {string} docType - Document type (aadhar, dl, passport, etc.)
 * @param {string} userPhone - User's phone number for organizing files
 * @returns {Promise<{downloadURL: string, fullPath: string}>}
 */
async function uploadDocToFirebase(file, docType, userPhone) {
  if (!storage) {
    console.warn("[DriveX Firebase] Storage not available. Skipping cloud upload.");
    return null;
  }

  try {
    const phone = userPhone || appState?.currentUser?.phone || 'unknown';
    const timestamp = Date.now();
    const ext = file.name.split('.').pop() || 'jpg';
    const filePath = `kyc-documents/${phone}/${docType}_${timestamp}.${ext}`;
    
    const storageRef = storage.ref(filePath);
    
    // Add metadata
    const metadata = {
      contentType: file.type,
      customMetadata: {
        docType: docType,
        userPhone: phone,
        uploadedAt: new Date().toISOString(),
        originalName: file.name
      }
    };

    console.log(`[DriveX Firebase] ⬆️ Uploading ${docType} → ${filePath}...`);
    
    const uploadTask = storageRef.put(file, metadata);
    
    // Return a promise that resolves when upload completes
    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed',
        // Progress
        (snapshot) => {
          const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          console.log(`[DriveX Firebase] Upload ${docType}: ${progress}%`);
          updateUploadProgress(docType, progress);
        },
        // Error
        (error) => {
          console.error(`[DriveX Firebase] Upload error:`, error);
          reject(error);
        },
        // Complete
        async () => {
          const downloadURL = await uploadTask.snapshot.ref.getDownloadURL();
          console.log(`[DriveX Firebase] ✅ ${docType} uploaded! URL:`, downloadURL);
          
          resolve({
            downloadURL: downloadURL,
            fullPath: filePath,
            fileName: file.name,
            fileSize: file.size,
            contentType: file.type
          });
        }
      );
    });

  } catch (error) {
    console.error("[DriveX Firebase] Upload error:", error);
    throw error;
  }
}

/**
 * Upload a base64 data URL to Firebase Storage (for sample/demo docs)
 */
async function uploadBase64ToFirebase(dataUrl, docType, userPhone) {
  if (!storage) return null;

  try {
    const phone = userPhone || appState?.currentUser?.phone || 'unknown';
    const timestamp = Date.now();
    const filePath = `kyc-documents/${phone}/${docType}_${timestamp}.jpg`;
    
    const storageRef = storage.ref(filePath);
    
    const uploadTask = await storageRef.putString(dataUrl, 'data_url', {
      contentType: 'image/jpeg',
      customMetadata: {
        docType: docType,
        userPhone: phone,
        uploadedAt: new Date().toISOString(),
        source: 'base64'
      }
    });

    const downloadURL = await uploadTask.ref.getDownloadURL();
    console.log(`[DriveX Firebase] ✅ ${docType} (base64) uploaded!`);
    
    return { downloadURL, fullPath: filePath };
  } catch (error) {
    console.error("[DriveX Firebase] Base64 upload error:", error);
    return null;
  }
}

// ==================== FIRESTORE: SAVE USER & KYC DATA ====================
/**
 * Save user profile to Firestore
 */
async function saveUserToFirestore(userData) {
  if (!db) {
    console.warn("[DriveX Firebase] Firestore not available. Skipping save.");
    return null;
  }

  try {
    const phone = userData.phone || appState?.currentUser?.phone;
    if (!phone) return null;

    const userRef = db.collection('users').doc(phone);
    
    await userRef.set({
      phone: phone,
      uid: userData.uid || null,
      name: userData.name || null,
      loginCount: firebase.firestore.FieldValue.increment(1),
      lastLoginAt: firebase.firestore.FieldValue.serverTimestamp(),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    }, { merge: true });

    console.log("[DriveX Firebase] ✅ User profile saved:", phone);
    return userRef.id;
  } catch (error) {
    console.error("[DriveX Firebase] Save user error:", error);
    return null;
  }
}

/**
 * Save KYC document record to Firestore
 */
async function saveDocRecordToFirestore(docType, fileData, userPhone) {
  if (!db) return null;

  try {
    const phone = userPhone || appState?.currentUser?.phone || 'unknown';
    
    const docRef = await db.collection('kyc_documents').add({
      userPhone: phone,
      docType: docType,
      docLabel: DOC_TYPE_LABELS?.[docType] || docType,
      downloadURL: fileData.downloadURL || null,
      storagePath: fileData.fullPath || null,
      fileName: fileData.fileName || null,
      fileSize: fileData.fileSize || null,
      contentType: fileData.contentType || null,
      status: 'uploaded',
      verified: false,
      uploadedAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    console.log(`[DriveX Firebase] ✅ KYC record saved: ${docType} → ${docRef.id}`);
    return docRef.id;
  } catch (error) {
    console.error("[DriveX Firebase] Save doc record error:", error);
    return null;
  }
}

/**
 * Save complete booking data to Firestore
 */
async function saveBookingToFirestore(bookingData) {
  if (!db) return null;

  try {
    const phone = appState?.currentUser?.phone || 'unknown';
    
    const bookingRef = await db.collection('bookings').add({
      userPhone: phone,
      userUid: appState?.currentUser?.uid || null,
      vehicle: bookingData.vehicle ? {
        name: bookingData.vehicle.name,
        category: bookingData.vehicle.category,
        priceDaily: bookingData.vehicle.priceDaily
      } : null,
      pickupDate: bookingData.pickupDate || null,
      returnDate: bookingData.returnDate || null,
      totalAmount: bookingData.totalAmount || null,
      protectionPlan: bookingData.protectionPlan || null,
      address: bookingData.address || null,
      undertaking: bookingData.undertaking ? {
        customerName: bookingData.undertaking.customerName,
        mobileNumber: bookingData.undertaking.mobileNumber,
        address: bookingData.undertaking.address,
        dlNumber: bookingData.undertaking.dlNumber,
        idProofNumber: bookingData.undertaking.idProofNumber,
        vehicleType: bookingData.undertaking.vehicleType,
        agreed: bookingData.undertaking.agreed
      } : null,
      verification: bookingData.verification ? {
        type: bookingData.verification.type,
        name: bookingData.verification.type === 'indian' 
          ? bookingData.verification.indianName 
          : bookingData.verification.foreignerName,
        age: bookingData.verification.type === 'indian'
          ? bookingData.verification.indianAge
          : bookingData.verification.foreignerAge,
        fatherName: bookingData.verification.type === 'indian'
          ? bookingData.verification.indianFatherName
          : bookingData.verification.foreignerFatherName,
        motherName: bookingData.verification.type === 'indian'
          ? bookingData.verification.indianMotherName
          : bookingData.verification.foreignerMotherName,
        nationality: bookingData.verification.foreignerNationality || 'Indian',
        passportNumber: bookingData.verification.foreignerPassportNumber || null
      } : null,
      status: 'confirmed',
      paymentMethod: bookingData.paymentMethod || 'upi_qr',
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    console.log(`[DriveX Firebase] ✅ Booking saved: ${bookingRef.id}`);
    return bookingRef.id;
  } catch (error) {
    console.error("[DriveX Firebase] Save booking error:", error);
    return null;
  }
}

/**
 * Retrieve all documents for a user
 */
async function getUserDocuments(userPhone) {
  if (!db) return [];

  try {
    const snapshot = await db.collection('kyc_documents')
      .where('userPhone', '==', userPhone)
      .orderBy('uploadedAt', 'desc')
      .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("[DriveX Firebase] Get docs error:", error);
    return [];
  }
}

/**
 * Retrieve all bookings for a user
 */
async function getUserBookings(userPhone) {
  if (!db) return [];

  try {
    const snapshot = await db.collection('bookings')
      .where('userPhone', '==', userPhone)
      .orderBy('createdAt', 'desc')
      .get();

    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("[DriveX Firebase] Get bookings error:", error);
    return [];
  }
}

// ==================== UI HELPER: UPLOAD PROGRESS ====================
function updateUploadProgress(docType, progress) {
  const statusPill = document.getElementById(`${docType}-upload-status`);
  if (statusPill && progress < 100) {
    statusPill.className = "text-[11px] font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded-full flex items-center gap-1";
    statusPill.innerHTML = `<span class="material-symbols-outlined text-xs animate-spin">sync</span> ${progress}%`;
  }
}

// ==================== SIGN OUT ====================
async function firebaseSignOut() {
  try {
    if (firebase.auth) {
      await firebase.auth().signOut();
      console.log("[DriveX Firebase] Signed out.");
    }
  } catch (error) {
    console.error("[DriveX Firebase] Sign out error:", error);
  }
}

// ==================== INIT ON PAGE LOAD ====================
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    if (typeof firebase !== 'undefined') {
      initFirebaseAuth();
    } else {
      console.warn("[DriveX Firebase] Firebase SDK not loaded.");
      isFirebaseConfigured = false;
    }
  }, 500);
});
