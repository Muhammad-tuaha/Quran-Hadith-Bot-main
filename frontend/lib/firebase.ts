// lib/firebase.ts
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}
// const firebaseConfig = {
//   apiKey: "AIzaSyDiUJoJfprhlyvWg8NdJzs6HghvksOLUCA",
//   authDomain: "ai-islamic-assistant.firebaseapp.com",
//   projectId: "ai-islamic-assistant",
//   storageBucket: "ai-islamic-assistant.firebasestorage.app",
//   messagingSenderId: "680055263698",
//   appId: "1:680055263698:web:56e568d2e901dc4232780b"
// };
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
