import app from "./FirebaseConfig";
import { collection, addDoc, getFirestore } from "firebase/firestore";

const db = getFirestore(app);

const createDocument = (collectionName, document) => {
  return addDoc(collection(db, collectionName), document);
};

const FirebaseFirestoreService = {
  createDocument,
};

export default FirebaseFirestoreService;
