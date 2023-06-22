import {doc, getDoc, getFirestore} from "firebase/firestore";

export const loadData = async ({setUserData, id}) => {
  const db = getFirestore();
  const userDoc = await getDoc(doc(db, 'users', id));
  const userData = userDoc.data();
  setUserData(userData);
};