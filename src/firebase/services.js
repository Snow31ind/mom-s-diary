import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as signOutWithAuth,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  collectionGroup,
  connectFirestoreEmulator,
  deleteDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  Timestamp,
  limit,
} from 'firebase/firestore';
import { postConverter } from '../utils/dataTypes/Post';
import { sectionConverter } from '../utils/dataTypes/Section';
import { auth, db } from './config';

export const fetchPostsByType = async (type) => {
  const querySnapshot = await getDocs(
    collection(db, 'handbook', type, 'posts').withConverter(postConverter)
  );

  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

export const fetchPosts = async () => {
  const postsQuerySnapshop = await getDocs(
    query(collectionGroup(db, 'posts').withConverter(postConverter))
  );
  return postsQuerySnapshop.docs.map((post) => {
    // console.log('Post.data():', post.data());
    return {
      ...post.data(),
      id: post.id,
    };
  });
};

export const fetchSectionTitles = async () => {
  const querySnapshot = await getDocs(
    collection(db, 'handbook').withConverter(sectionConverter)
  );

  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

export const fetchSections = async () => {
  // Query all sections
  const sections = await fetchSectionTitles();
  // Query all posts
  const posts = await fetchPosts();

  return sections.map((section) => ({
    ...section,
    posts: posts.filter((post) => post.type === section.id),
  }));
};

export const createPost = async (data) => {
  const docRef = await addDoc(
    collection(db, 'handbook', data.type, 'posts').withConverter(postConverter),
    data
  );

  return { id: docRef.id, ...data };
};

export const createSection = async (data) => {
  const { title, titleId } = data;
  const docRef = await setDoc(
    doc(db, 'handbook', titleId).withConverter(sectionConverter),
    { title }
  );

  return { id: docRef.id, ...data };
};

export const removeSection = async (type) => {
  // Retrieve all posts and delete them.
  const docRef = await getDocs(collection(db, 'handbook', type, 'posts'));
  const postIds = docRef.docs.map((post) => post.id);
  // console.log(postIds);
  for (var id of postIds) {
    await deleteDoc(doc(db, 'handbook', type, 'posts', id));
  }

  await deleteDoc(doc(db, 'handbook', type));
};

export const removePost = async (type, id) => {
  const colRef = collection(db, 'handbook', type, 'posts');
  const querySnapshot = query(colRef, limit(2));
  const posts = await getDocs(querySnapshot);
  console.log(posts.docs.length);

  await deleteDoc(doc(db, 'handbook', type, 'posts', id));

  if (posts.docs.length === 1) {
    await deleteDoc(doc(db, 'handbook', type));
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
    console.log('userCredential:', userCredential);

    const userInfo = userCredential.user;
    console.log(userInfo);
    return userInfo;
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
