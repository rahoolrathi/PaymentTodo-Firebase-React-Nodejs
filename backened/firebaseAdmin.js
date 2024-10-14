// firebaseAdmin.js
const admin = require("firebase-admin");
const serviceAccount = require("./firebaseadmin.json"); // Update this path if needed

// Initialize the Firebase admin app with service account credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// Get Firestore instance
const db = admin.firestore();

module.exports = { admin, db };
