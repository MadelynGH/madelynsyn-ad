
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDAOucStI8IyIjHhm_pz_cr0mg0GnWt-Ys",
    authDomain: "madelynsyn-ad-club.firebaseapp.com",
    projectId: "madelynsyn-ad-club",
    storageBucket: "madelynsyn-ad-club.appspot.com",
    messagingSenderId: "1093071059050",
    appId: "1:1093071059050:web:d296e8dbe568746e0ff213",
    measurementId: "G-DR5B61L78H"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = firebase.firestore();

export default db;