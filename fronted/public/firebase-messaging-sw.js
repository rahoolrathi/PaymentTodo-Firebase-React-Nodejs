// // Import Firebase modules

// // Initialize Firebase with your configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyB1U4SQDi4ISA2SsHSkopKPiCEi8TK84Y4",
//   authDomain: "paymentremainderapp.firebaseapp.com",
//   projectId: "paymentremainderapp",
//   storageBucket: "paymentremainderapp.appspot.com",
//   messagingSenderId: "388466062682",
//   appId: "1:388466062682:web:98fa34786f2a96cb972f63",
//   measurementId: "G-JN972X7PJ7",
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// // Retrieve an instance of Firebase Messaging to handle background messages
// const messaging = firebase.messaging();

// // Handle background messages
// messaging.onBackgroundMessage((payload) => {
//   console.log("Received background message ", payload);

//   const notificationTitle = payload.notification.title;
//   const notificationOptions = {
//     body: payload.notification.body,
//     icon: "path/to/icon.png", // Optional: specify an icon for the notification
//   };

//   // Show notification
//   self.registration.showNotification(notificationTitle, notificationOptions);
// });
