import firebase from 'firebase';

var firebaseConfig = {
      apiKey: "AIzaSyBi3lCMkKgg1t31_Wd2P9zbmqDC-erC1IA",
      authDomain: "citi-gallery.firebaseapp.com",
      projectId: "citi-gallery",
      storageBucket: "citi-gallery.appspot.com",
      messagingSenderId: "101301226121",
      appId: "1:101301226121:web:6206220a6b1872c461d458"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;
