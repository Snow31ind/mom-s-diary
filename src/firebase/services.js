import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as signOutWithAuth,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  limit,
  where,
  getDoc,
  orderBy,
  updateDoc,
  Firestore,
} from 'firebase/firestore';
import { postConverter } from '../utils/dataTypes/Post';
import { sectionConverter } from '../utils/dataTypes/Section';
import { auth, db, storage } from './config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { slugify } from '../utils/helpers';

export const fetchPostsByType = async (type) => {
  try {
    const querySnapshot = await getDocs(
      collection(db, type).withConverter(postConverter)
    );

    const posts = querySnapshot.docs.map((snapshot) => ({
      ...snapshot.data(),
      id: snapshot.id,
    }));

    var data = [];

    for (var post of posts) {
      const image = await getImage(post.photo);

      data = [...data, { ...post, image }];
    }

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const createPost = async (file, post) => {
  try {
    await uploadBytes(ref(storage, post.photo), file);

    // Fetch file from cloud storage
    const image = await getImage(post.photo);

    const postRef = await addDoc(
      collection(db, post.sectionId).withConverter(postConverter),
      post
    );

    return { ...post, id: postRef.id, image };
  } catch (error) {
    console.log(error.message);
  }
  // Upload file to cloud storage
};

export const updatePostById = async (file, id, post) => {
  try {
    if (file) {
      await uploadBytes(ref(storage, post.photo), file);
    }

    await updateDoc(doc(db, post.sectionId, id).withConverter(postConverter), {
      ...post,
    });

    const updatedPost = await getDoc(
      doc(db, post.sectionId, id).withConverter(postConverter)
    );

    const image = await getImage(post.photo);

    return { ...updatedPost.data(), id, image };
  } catch (error) {
    console.log(error.message);
  }
};

export const removePost = async (sectionId, id) => {
  try {
    await deleteDoc(doc(db, sectionId, id));
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchSections = async () => {
  try {
    // Query all sections
    const querySnapshot = await getDocs(
      collection(db, 'handbook').withConverter(sectionConverter)
    );

    const sections = querySnapshot.docs.map((snapshot) => ({
      ...snapshot.data(),
      id: snapshot.id,
    }));

    var data = [];
    // Query all posts that belong to each section
    for (var section of sections) {
      const posts = await fetchPostsByType(section.id);
      data = [...data, { ...section, posts }];
    }

    return data;
  } catch (error) {
    console.log(error.message);
  }
};

export const createSection = async (section, id, file) => {
  try {
    // Upload file to storage
    await uploadBytes(ref(storage, section.photo), file);

    // Create new section in collection handbook
    await setDoc(
      doc(db, 'handbook', id).withConverter(sectionConverter),
      section
    );

    // Get image that was uploaded to the storage
    const image = await getImage(section.photo);

    const newSection = {
      ...section,
      id,
      image,
      posts: [],
    };

    return newSection;
  } catch (error) {
    console.log(error.message);
  }
};

export const removeSection = async (id) => {
  try {
    await deleteDoc(doc(db, 'handbook', id));
  } catch (error) {
    console.log(error.message);
  }
};

export const updateSection = async (id, section, file) => {
  // Remove old collection
  // Create new collection
  // Put all previous docs in old collection into the new one

  try {
    const oldSectionSnapshot = await getDoc(
      doc(db, 'handbook', id).withConverter(sectionConverter)
    );

    const oldSection = {
      id: oldSectionSnapshot.id,
      ...oldSectionSnapshot.data(),
    };

    // Remove old section in collection handbook
    await deleteDoc(doc(db, 'handbook', id));

    // Add new section in collection handbook with slugified title
    const { title } = section;
    const newSectionId = slugify(title);

    await setDoc(
      doc(db, 'handbook', newSectionId).withConverter(sectionConverter),
      {
        ...section,
        createdAt: oldSection.createdAt,
      }
    );

    // Get all old posts in old section
    const oldPostsSnapshot = await getDocs(
      collection(db, oldSection.id).withConverter(postConverter)
    );

    const oldPosts = oldPostsSnapshot.docs.map((post) => ({
      ...post.data(),
      id: post.id,
    }));

    // Remove all posts in old collection secion
    for (var oldPost of oldPosts) {
      await deleteDoc(doc(db, oldPost.sectionId, oldPost.id));
    }

    // Update all posts with the field "sectionId"
    const updatedPosts = oldPosts.map((post) => ({
      ...post,
      sectionId: newSectionId,
    }));

    // Add updated posts in a new collection section
    for (var updatedPost of updatedPosts) {
      await setDoc(
        doc(db, newSectionId, updatedPost.id).withConverter(postConverter),
        updatedPost
      );
    }

    const updatedSection = await fetchSectionById(newSectionId);

    return updatedSection;
  } catch (error) {
    console.log(error.message);
  }

  // Fetch old section
};

export const updateSectionById = async (section, id, file) => {
  try {
    if (file) {
      await uploadBytes(ref(storage, file.name), file);
    }

    await updateDoc(
      doc(db, 'handbook', id).withConverter(sectionConverter),
      section
    );

    return await fetchSectionById(id);
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchSectionById = async (id) => {
  try {
    const sectionSnapshot = await getDoc(
      doc(db, 'handbook', id).withConverter(sectionConverter)
    );

    const image = await getImage(sectionSnapshot.data().photo);

    const posts = await fetchPostsByType(id);

    return {
      ...sectionSnapshot.data(),
      id,
      image,
      posts,
    };
  } catch (error) {
    console.log(error.message);
  }
};

export const signIn = async (user) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );
    const { uid, email, phoneNumber, photoURL, displayName, emailVerified } =
      userCredential.user;

    return { uid, email, phoneNumber, photoURL, displayName, emailVerified };
  } catch (error) {
    console.log(error.message);
  }
};

export const signUp = async (user) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      user.email,
      user.password
    );

    const { uid, email, phoneNumber, photoURL, displayName, emailVerified } =
      userCredential.user;

    return { uid, email, phoneNumber, photoURL, displayName, emailVerified };
  } catch (error) {
    console.log(error.message);
  }
};

export const signOut = async () => {
  try {
    await signOutWithAuth(auth);
  } catch (error) {
    console.log(error.message);
  }
};

export const getImage = async (name) => {
  try {
    const image = await getDownloadURL(ref(storage, name));

    return image;
  } catch (error) {
    console.log(error.message);
  }
};
