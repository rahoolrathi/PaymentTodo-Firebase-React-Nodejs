importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging.js");
// Initialize the Firebase app in the service worker by passing the generated config

const firebaseConfig = {
  apiKey: "AIzaSyB1U4SQDi4ISA2SsHSkopKPiCEi8TK84Y4",
  authDomain: "paymentremainderapp.firebaseapp.com",
  projectId: "paymentremainderapp",
  storageBucket: "paymentremainderapp.appspot.com",
  messagingSenderId: "388466062682",
  appId: "1:388466062682:web:98fa34786f2a96cb972f63",
  measurementId: "G-JN972X7PJ7",
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log("Received background message ", payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
