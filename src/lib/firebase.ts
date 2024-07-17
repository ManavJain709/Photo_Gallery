import { initializeApp, getApps, FirebaseOptions } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIRE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIRE_AUTH_DOMAIN,
    databaseURL: process.env.NEXT_PUBLIC_FIRE_DATABASE_URL,
    projectId: process.env.NEXT_PUBLIC_FIRE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIRE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIRE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIRE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIRE_MEASUREMENT_ID
};

let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig as FirebaseOptions) : getApps()[0];

export const auth = getAuth(firebase_app);

export default firebase_app;