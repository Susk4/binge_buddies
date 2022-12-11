import { getApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";
class FireStoreService {
  constructor(fireStore) {
    this.db = fireStore;
  }

  async addUser() {
    try {
      const docRef = await addDoc(collection(this.db, "users"), {
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
