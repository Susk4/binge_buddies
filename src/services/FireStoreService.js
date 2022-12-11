import { getApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
class FireStoreService {
  constructor(fireStore) {
    this.db = fireStore;
  }

  async addUser(user) {
    try {
      const docRef = await setDoc(doc(this.db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        createdAt: user.metadata.createdAt,
        lastLogin: user.metadata.lastLoginAt,
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
        users[doc.id] = doc.data();
      });
      return users;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
}
export default new FireStoreService(getFirestore(getApp()));
