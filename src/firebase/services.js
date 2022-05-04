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
} from 'firebase/firestore';
import { postConverter } from '../utils/dataTypes/Post';
import { sectionConverter } from '../utils/dataTypes/Section';
import { auth, db, storage } from './config';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const fetchPostsByType = async (type) => {
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
};

export const createPost = async (file, post) => {
  try {
    await uploadBytes(ref(storage, post.photo), file);

    // Fetch file from cloud storage
    const image = await getImage(post.photo);

    // console.log(data);
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
      updatedAt: serverTimestamp(),
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
  await deleteDoc(doc(db, sectionId, id));
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
  await deleteDoc(doc(db, 'handbook', id));
};

export const updateSection = async (id, section) => {
  await updateDoc(doc(db, 'handbook', id).withConverter(sectionConverter), {
    ...section,
    updatedAt: serverTimestamp(),
  });

  const updatedSection = await getDoc(
    doc(db, 'handbook', id).withConverter(sectionConverter)
  );

  return { ...updatedSection.data(), id };
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
    console.log(error);
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
    console.log(error);
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
