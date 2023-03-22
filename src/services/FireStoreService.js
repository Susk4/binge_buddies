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
        last_login: user.metadata.lastLoginAt,
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
      if (docSnap.exists() && docSnap.data() && docSnap.data().name) {
        return docSnap.data();
      } else {
        return this.getUser(uid);
      }
    } catch (e) {
      console.error("Error getting user: ", e);
    }
  }
  async getUsers(uids) {
    try {
      const users = [];
      for (const uid of uids) {
        const user = await this.getUser(uid);
        if (user) {
          users.push(user);
        }
      }
      return users;
    } catch (e) {
      console.error("Error getting users: ", e);
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
      const user = await this.getUser(uid);

      if (user && user.movies) {
        return user.movies;
      }
      return [];
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

  async deleteMovieFromUser(uid, movieId) {
    try {
      const docRef = doc(this.db, "users", uid);
      //delete movie from docRef.movies
      const user = await getDoc(docRef);
      if (user.exists()) {
        const movies = user.data().movies;
        const index = movies.indexOf(movieId);
        if (index > -1) {
          movies.splice(index, 1);
        }
        await updateDoc(docRef, {
          movies: movies,
        });
      }
    } catch (e) {
      console.error("Error deleting movies: ", movieId, e);
    }
  }

  async getMoviesData(movies) {
    try {
      const data = [];
      while (movies.length > 0) {
        const batch = movies.splice(0, 10);
        const moviesBatch = await getDocs(
          query(collection(this.db, "movies"), where("id", "in", batch))
        );
        moviesBatch.forEach((doc) => {
          data.push(doc.data());
        });
      }
      return data;
    } catch (e) {
      console.error("Error reading movies data: ", e);
    }
  }

  async getUsersMoviesData(uid) {
    try {
      const movies = await this.getUsersMovies(uid);
      return await this.getMoviesData(movies);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async getMoviesOfUsers(uids) {
    try {
      const movies = [];
      for (const uid of uids) {
        const userMovies = await this.getUsersMovies(uid);
        movies.push(userMovies);
      }
      const intersectingMovies = movies.reduce((a, b) =>
        a.filter((c) => b.includes(c))
      );

      return await this.getMoviesData(intersectingMovies);
    } catch (e) {
      console.error("Error getting movies of users document: ", e);
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

  async createGroup(name, description, userIds, creator) {
    try {
      const initializedUsers = userIds.map((id) => {
        return { id, accepted: false };
      });
      const groups = await collection(this.db, "groups");
      const querySnapshot = await getDocs(groups);
      const data = [];
      querySnapshot.forEach((doc) => {
        const allGroupUsers = [
          ...doc.data().users.map((user) => user.id),
          doc.data().creator,
        ];
        const allNewGroupUsers = [...userIds, creator];

        if (
          allGroupUsers.sort().join(",") === allNewGroupUsers.sort().join(",")
        ) {
          throw new Error("The same group already exists.");
        }
      });

      const docRef = await addDoc(collection(this.db, "groups"), {
        name,
        description,
        users: initializedUsers,
        creator,
      });
      return docRef.id;
    } catch (e) {
      console.error("Error creating group: ", e);
      return { error: e };
    }
  }

  async getAllPendingGroups(uid) {
    try {
      const groups = await collection(this.db, "groups");
      const querySnapshot = await getDocs(groups);
      const data = [];
      querySnapshot.forEach((doc) => {
        if (
          doc.data().creator === uid ||
          doc.data().users.some((user) => user.id === uid)
        ) {
          if (doc.data().users.some((user) => !user.accepted)) {
            data.push({ id: doc.id, ...doc.data() });
          }
        }
      });
      return data;
    } catch (e) {
      console.error("Error getting pending groups: ", e);
    }
  }

  async getPendingGroups(uid) {
    try {
      const groups = await getDocs(
        query(
          collection(this.db, "groups"),
          where("users", "array-contains", { id: uid, accepted: false })
        )
      );
      const data = [];
      groups.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      return data;
    } catch (e) {
      console.error("Error getting pending groups: ", e);
    }
  }
  async getSentGroupRequests(uid) {
    try {
      const groups = await getDocs(
        query(collection(this.db, "groups"), where("creator", "==", uid))
      );
      const data = [];
      groups.forEach((doc) => {
        if (doc.data().users.some((user) => !user.accepted)) {
          data.push({ id: doc.id, ...doc.data() });
        }
      });
      return data;
    } catch (e) {
      console.error("Error getting sent group requests: ", e);
    }
  }

  async getGroups(uid) {
    try {
      const joinedGroups = await getDocs(
        query(
          collection(this.db, "groups"),
          where("users", "array-contains", { id: uid, accepted: true })
        )
      );
      const createdGroups = await getDocs(
        query(collection(this.db, "groups"), where("creator", "==", uid))
      );
      const data = [];
      joinedGroups.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      createdGroups.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });

      return data.filter((group) => {
        return group.users.every((user) => user.accepted);
      });
      ata;
    } catch (e) {
      console.error("Error getting groups: ", e);
    }
  }
  async acceptGroupRequest(groupId, userId) {
    try {
      const docRef = doc(this.db, "groups", groupId);
      const docSnap = await getDoc(docRef);
      this.validateGroup(docSnap, userId);
      const users = docSnap.data().users.map((user) => {
        if (user.id === userId) {
          return { id: user.id, accepted: true };
        }
        return user;
      });
      await updateDoc(docRef, {
        users,
      });
    } catch (e) {
      console.error("Error accepting group request ", e);
    }
  }
  async declineGroupRequest(groupId, userId) {
    try {
      const docRef = doc(this.db, "groups", groupId);
      const docSnap = await getDoc(docRef);
      this.validateGroup(docSnap, userId);
      const users = docSnap.data().users.filter((user) => user.id !== userId);
      if (users.length === 0) {
        await deleteDoc(docRef);
        return;
      }
      await updateDoc(docRef, {
        users,
      });
    } catch (error) {
      console.error("Error declining group request ", e);
    }
  }
  async getGroupMovies(groupId, userId) {
    try {
      const docRef = doc(this.db, "groups", groupId);
      const docSnap = await getDoc(docRef);

      if (
        docSnap.data().creator === userId ||
        docSnap.data().users.some((user) => user.id === userId)
      ) {
        if (docSnap.data().users.some((user) => user.accepted === false)) {
          throw new Error(
            "Your group is still pending. Please check back after all the members have accepted the invitation",
            {
              cause: "group is pending",
            }
          );
        } else {
          const allGroupUsers = [
            ...docSnap.data().users.map((user) => user.id),
            docSnap.data().creator,
          ];

          const movies = this.getMoviesOfUsers(allGroupUsers);
          return movies;
        }
      } else {
        throw new Error("It looks like you are not a member of this group.", {
          cause: "not a member",
        });
      }
    } catch (e) {
      //console.error("Error checking group accessibility ", e.cause);
      return { error: e };
    }
  }

  validateGroup(docSnap, userId) {
    if (!docSnap.exists()) {
      throw new Error("Group does not exist");
    }
    if (docSnap.data().creator === userId) {
      throw new Error("User is creator");
    }
    if (!docSnap.data().users.some((user) => user.id === userId)) {
      throw new Error("User is not in group");
    }
    if (
      docSnap.data().users.some((user) => user.id === userId && user.accepted)
    ) {
      throw new Error("User already accepted");
    }
  }
}

export default new FireStoreService(getFirestore(getApp()));
