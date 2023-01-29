import { getApp, getFirestore } from "../config/firebase";

import { collection, getDocs, setDoc, getDoc, doc } from "firebase/firestore";
class FireStoreService {
  constructor(fireStore) {
    this.db = fireStore;
  }

  async addUser(user, filterData) {
    try {
      await setDoc(doc(this.db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        account_created: user.metadata.createdAt,
        last_ogin: user.metadata.lastLoginAt,
        photo_url: user.photoURL,
        filters: {
          ...filterData,
        },
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async getUser(uid) {
    try {
      const docRef = doc(this.db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return null;
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  async getUserFilter(uid) {
    try {
      const docRef = doc(this.db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        if (docSnap.data().filters) {
          return docSnap.data().filters;
        }
        return {};
      } else {
        return null;
      }
    } catch (e) {
      console.error("Error getting user filter: ", e);
    }
  }

  async updateUserFilter(uid, filterData) {
    try {
      const docRef = doc(this.db, "users", uid);
      await setDoc(docRef, { filters: { ...filterData } }, { merge: true });
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
