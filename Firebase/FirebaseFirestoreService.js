import firebase from "./FirebaseConfig";
import { db } from "./FirebaseConfig";

import {
    addDoc,
    doc,
    getDoc,
    collection as firestoreCollection,
    query,
    where,
    orderBy,
    limit,
    startAfter,
    getDocs,
    updateDoc,
    deleteDoc,
} from "firebase/firestore/lite";

// CREATE
const createDocument = (collection, document) => {
    return addDoc(firestoreCollection(db), document);
};

const readDocuments = async (collection) => {
    const collectionRef = firestoreCollection(db, "Products");
    const data = await getDocs(collectionRef);  
    return data;
};

const readDocument = (collection, id) => {
    return getDoc(doc(firestoreCollection(db, collection), id));
};

const updateDocument = (collection, id, document) => {
    return updateDoc(
        doc(firestoreCollection(db, collection), id),
        document
    );
};

const deleteDocument = (collection, id) => {
    return deleteDoc(doc(firestoreCollection(db, collection), id));
};

const FirebaseFirestoreService = {
    createDocument,
    readDocuments,
    updateDocument,
    deleteDocument,
};

export default FirebaseFirestoreService;

// queries,
// orderByField,
// orderByDirection,
// perPage,
// cursorId,

// const readDocuments = async ({ collection }) => {
//     const collectionRef = firestoreCollection(firestore, collection);
//     const queryConstraints = [];
//     if (queries && queries.length > 0) {
//         for (const query of queries) {
//             queryConstraints.push(
//                 where(query.field, query.condition, query.value)
//             );
//         }
//         if (orderByField && orderByDirection) {
//             queryConstraints.push(orderBy(orderByField, orderByDirection));
//         }

//         if (perPage) {
//             queryConstraints.push(limit(perPage));
//         }
//         if (cursorId) {
//             const document = await readDocument(collection, cursorId);
//             queryConstraints.push(startAfter(document));
//         }

//         const firestoreQuery = query(collectionRef, ...queryConstraints);
//         return getDocs(firestoreQuery);
//     }
// };
