import { getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  getDoc,
  doc,
} from "firebase/firestore";
class FireStoreService {
  constructor(fireStore) {
    this.db = fireStore;
  }
  async getUser(uid) {
    try {
      const docRef = doc(this.db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return { uid: docSnap.id, ...docSnap.data() };
      } else {
        return null;
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async addUser(user) {
    try {
      await setDoc(doc(this.db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        createdAt: user.metadata.createdAt,
        lastLogin: user.metadata.lastLoginAt,
        photoUrl: user.photoURL,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  async getUsers() {
    try {
      const snapShot = await getDocs(collection(this.db, "users"));
      const users = [];
      snapShot.forEach((doc) => {
        const user = { uid: doc.id, ...doc.data() };
        users.push(user);
      });
      return users;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}
export default new FireStoreService(getFirestore(getApp()));
