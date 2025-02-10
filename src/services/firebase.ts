// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, push, ref, update } from "firebase/database";
import { MenuItem, Order } from "../entities/entitites";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "tienda-comida-1a7e2.firebaseapp.com",
  databaseURL:
    "https://tienda-comida-1a7e2-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "tienda-comida-1a7e2",
  storageBucket: "tienda-comida-1a7e2.firebasestorage.app",
  messagingSenderId: "1092414552129",
  appId: "1:1092414552129:web:b91dd2b90d0b1fdfb0aec0",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);

export const postMenu = async (items: MenuItem[]) => {
  const itemsRef = ref(db, "menu");
  const promises = items.map((item) => push(itemsRef, item));
  await Promise.all(promises);
};

export const lessItems = async (id: string, quantity: number) => {
  const itemsRef = ref(db, `menu/${id}`);
  await update(itemsRef, {quantity})
}

export const addOrder = async (order: Order) => {
  const itemsRef = ref(db, "orders");
  await push(itemsRef, order);
};

export const formatMenuItems = (data) => {
  return data
    ? Object.entries(data).map(([id, value]) => ({
        ...(value as MenuItem),
        id,
      }))
    : [];
};
