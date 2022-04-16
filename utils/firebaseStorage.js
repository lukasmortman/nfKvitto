const { initializeApp } = require("firebase/app");
const { getStorage } = require("firebase/storage");
const firebaseConfig = {

    apiKey: "AIzaSyC3Okk1Aa2n5P_4ovSGoqwH7Q5cfjZO_l4",
    authDomain: "nfkvitton.firebaseapp.com",
    projectId: "nfkvitton",
    storageBucket: "nfkvitton.appspot.com",
    messagingSenderId: "773494506675",
    appId: "1:773494506675:web:82c77ade0673e7cc651cc6",
    measurementId: "G-8YPG6B5MDF"
};

const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage(firebaseApp)
export { storage }
