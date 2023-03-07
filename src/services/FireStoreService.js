import { getApp, getFirestore } from "../config/firebase.config.js";

import {
  collection,
  getDocs,
  setDoc,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
  query,
  where,
  deleteDoc,
  addDoc,
} from "firebase/firestore";
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
      if (docSnap.exists() && docSnap.data()) {
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
        if (docSnap.data().filters && docSnap.data().filters) {
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

  async getUsersMovies(uid) {
    try {
      const docRef = doc(this.db, "users", uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists() && docSnap.data().movies) {
        return docSnap.data().movies;
      } else {
        return [];
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async addMovieToUser(uid, movie) {
    try {
      const docRef = doc(this.db, "users", uid);
      await updateDoc(docRef, {
        movies: arrayUnion(movie.id),
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
  async storeMovie(movie) {
    try {
      await setDoc(doc(this.db, "movies", movie.id.toString()), {
        ...movie,
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async getUsersMoviesData(uid) {
    try {
      const movies = await this.getUsersMovies(uid);
      const colRef = collection(this.db, "movies");
      const moviesData = await getDocs(colRef);
      const data = [];
      moviesData.forEach((doc) => {
        if (movies.includes(doc.data().id)) {
          data.push(doc.data());
        }
      });
      return data;
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async getContacts(uid) {
    try {
      const userAsContact = await getDocs(
        query(
          collection(this.db, "users_contacts"),
          where("contact", "==", uid),
          where("accepted", "==", true)
        )
      );
      const userAsUser = await getDocs(
        query(
          collection(this.db, "users_contacts"),
          where("user", "==", uid),
          where("accepted", "==", true)
        )
      );

      const contacts = this.getContactsSet(userAsContact, userAsUser);

      const users = await getDocs(collection(this.db, "users"));

      const data = [];
      users.forEach((user) => {
        if (contacts.has(user.id)) {
          data.push({ id: user.id, ...user.data() });
        }
      });
      return data;
    } catch (e) {
      console.error("Error getting contacts: ", e);
    }
  }

  async getPossibleContacts(uid) {
    try {
      const users = await getDocs(collection(this.db, "users"));
      const userAsContact = await getDocs(
        query(
          collection(this.db, "users_contacts"),
          where("contact", "==", uid)
        )
      );
      const userAsUser = await getDocs(
        query(collection(this.db, "users_contacts"), where("user", "==", uid))
      );

      const contacts = this.getContactsSet(userAsContact, userAsUser);

      const data = [];
      users.forEach((user) => {
        if (user.id != uid && !contacts.has(user.id)) {
          data.push({ id: user.id, ...user.data() });
        }
      });
      return data;
    } catch (e) {
      console.error("Error getting possible contacts: ", e);
    }
  }
  async getContactRequests(uid) {
    try {
      const contactRequests = await getDocs(
        query(
          collection(this.db, "users_contacts"),
          where("contact", "==", uid),
          where("accepted", "==", false)
        )
      );
      const data = [];
      contactRequests.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      const promises = [];
      data.forEach((contact) => {
        const docRef = doc(this.db, "users", contact.user);
        promises.push(getDoc(docRef));
      });

      const contactRequesters = await Promise.all(promises);

      const contactRequestersData = contactRequesters.map((doc) => {
        return {
          id: doc.id,
          contact_doc_id: data.find((contact) => contact.user === doc.id).id,
          ...doc.data(),
        };
      });
      return contactRequestersData;
    } catch (e) {
      console.error("Error getting contact requests: ", e);
    }
  }

  async getContactRequestsSent(uid) {
    try {
      const contactRequests = await getDocs(
        query(
          collection(this.db, "users_contacts"),
          where("user", "==", uid),
          where("accepted", "==", false)
        )
      );
      const data = [];
      contactRequests.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      const promises = [];
      data.forEach((contact) => {
        const docRef = doc(this.db, "users", contact.contact);
        promises.push(getDoc(docRef));
      });

      const contactRequesters = await Promise.all(promises);

      const contactRequestersData = contactRequesters.map((doc) => {
        return {
          id: doc.id,
          contact_doc_id: data.find((contact) => contact.contact === doc.id).id,
          ...doc.data(),
        };
      });

      return contactRequestersData;
    } catch (e) {
      console.error("Error getting contact requests: ", e);
    }
  }

  async acceptContactRequest(contactId) {
    try {
      const docRef = doc(this.db, "users_contacts", contactId);
      await updateDoc(docRef, {
        accepted: true,
      });
    } catch (e) {
      console.error("Error accepting contact request ", e);
    }
  }
  async sendContactRequest(uid, contactId) {
    try {
      await addDoc(collection(this.db, "users_contacts"), {
        user: uid,
        contact: contactId,
        accepted: false,
      });
    } catch (e) {
      console.error("Error sending contact request: ", e);
    }
  }

  async declineContactRequest(contactId) {
    try {
      const docRef = doc(this.db, "users_contacts", contactId);
      await deleteDoc(docRef);
    } catch (e) {
      console.error("Error declining contact request ", e);
    }
  }

  getContactsSet(contactRequesters, requestedContacts) {
    const contacts = new Set();
    contactRequesters.forEach((doc) => {
      contacts.add(doc.data().user);
    });
    requestedContacts.forEach((doc) => {
      contacts.add(doc.data().contact);
    });
    return contacts;
  }
}
export default new FireStoreService(getFirestore(getApp()));
