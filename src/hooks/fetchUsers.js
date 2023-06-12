import {collection, getDocs, getFirestore} from "firebase/firestore";

export const fetchUsers = async () => {
    const db = getFirestore();

    // Получите все документы из коллекции 'users'
    const userSnapshot = await getDocs(collection(db, "users"));

    // Преобразуйте каждый документ в данные пользователя и верните их
    const users = userSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return users;
}