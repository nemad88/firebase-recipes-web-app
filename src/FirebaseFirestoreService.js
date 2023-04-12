import app from "./FirebaseConfig";
import {
  doc,
  deleteDoc,
  collection,
  addDoc,
  getFirestore,
  getDoc,
  getDocs,
  query,
  where,
  updateDoc,
  orderBy,
  limit,
  startAfter,
} from "firebase/firestore";

const db = getFirestore(app);

const createDocument = (collectionName, document) => {
  return addDoc(collection(db, collectionName), document);
};

const readDocument = (collectionName, id) => {
  return getDoc(doc(db, collectionName, id));
};

const readDocuments = async ({
  collection: collectionName,
  queries,
  orderByField,
  orderByDirection,
  perPage,
  cursorId,
}) => {
  let collectionRef = collection(db, collectionName);

  if (queries && queries.length > 0) {
    for (const queryItem of queries) {
      collectionRef = query(
        collectionRef,
        where(queryItem.field, queryItem.condition, queryItem.value)
      );
    }
  }

  if (orderByField && orderByDirection) {
    collectionRef = query(
      collectionRef,
      orderBy(orderByField, orderByDirection)
    );
  }

  if (perPage) {
    collectionRef = query(collectionRef, limit(perPage));
  }

  if (cursorId) {
    const document = await readDocument(collectionName, cursorId);
    collectionRef = query(collectionRef, startAfter(document));
  }

  return getDocs(collectionRef);
};

const updateDocument = (collection, id, document) => {
  const documentRef = doc(db, collection, id);
  return updateDoc(documentRef, document);
};

const deleteDocument = (collection, id) => {
  return deleteDoc(doc(db, collection, id));
};

const FirebaseFirestoreService = {
  createDocument,
  readDocuments,
  updateDocument,
  deleteDocument,
};

export default FirebaseFirestoreService;
