import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as signOutWithAuth,
} from 'firebase/auth';
import {
  addDoc,
  collection,
  collectionGroup,
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
  Firestore,
  orderBy,
  updateDoc,
} from 'firebase/firestore';
import { postConverter } from '../utils/dataTypes/Post';
import { sectionConverter } from '../utils/dataTypes/Section';
import { auth, db } from './config';
import * as firestore from 'firebase/firestore';
import { slugify } from '../utils/helpers';
import { RepeatOneSharp } from '@mui/icons-material';

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
    query(
      collection(db, 'handbook').withConverter(sectionConverter),
      orderBy('title', 'asc')
    )
  );

  return querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
};

export const fetchSectionBySlug = async (slug) => {
  try {
    const sections = await fetchSections();
    return sections.find((section) => slugify(section.title) === slug);
  } catch (error) {
    console.log(error.message);
  }
};

export const fetchSections = async () => {
  // Query all sections
  const sections = await fetchSectionTitles();
  // Query all posts
  const posts = await fetchPosts();

  return sections.map((section) => ({
    ...section,
    posts: posts.filter((post) => post.sectionId === section.id),
  }));
};

export const createPost = async (post) => {
  // console.log(data);
  const postRef = await addDoc(
    collection(db, 'handbook', post.sectionId, 'posts').withConverter(
      postConverter
    ),
    post
  );

  const addedPost = await getDoc(
    doc(db, 'handbook', post.sectionId, 'posts', postRef.id).withConverter(
      postConverter
    )
  );

  return { id: addedPost.id, ...addedPost.data() };
};

export const updatePostById = async (id, post) => {
  try {
    console.log(post);

    const docRef = doc(
      db,
      'handbook',
      post.sectionId,
      'posts',
      id
    ).withConverter(postConverter);

    await updateDoc(docRef, { ...post, updatedAt: serverTimestamp() });

    const updatedPost = await getDoc(docRef);

    return { id: updatedPost.id, ...updatedPost.data() };
  } catch (error) {
    console.log(error.message);
  }
};

export const createSection = async (section, post) => {
  try {
    const sectionRef = await addDoc(
      collection(db, 'handbook').withConverter(sectionConverter),
      section
    );

    const addedSection = await getDoc(
      doc(db, 'handbook', sectionRef.id).withConverter(sectionConverter)
    );

    console.log('X');

    const postRef = await addDoc(
      collection(db, 'handbook', sectionRef.id, 'posts').withConverter(
        postConverter
      ),
      { ...post, sectionId: sectionRef.id }
    );

    console.log('Y');

    const addedPost = await getDoc(
      doc(db, 'handbook', sectionRef.id, 'posts', postRef.id).withConverter(
        postConverter
      )
    );

    console.log('Z');

    const newSection = {
      id: addedSection.id,
      ...addedSection.data(),
      posts: [{ id: addedPost.id, ...addedPost.data() }],
    };

    console.log(newSection);

    return newSection;
  } catch (error) {
    console.log(error.message);
  }
};

export const removeSection = async (id) => {
  // Retrieve all posts and delete them.
  const docRef = await getDocs(collection(db, 'handbook', id, 'posts'));
  const postIds = docRef.docs.map((post) => post.id);
  // console.log(postIds);
  for (var postId of postIds) {
    await deleteDoc(doc(db, 'handbook', postId, 'posts', id));
  }

  await deleteDoc(doc(db, 'handbook', id));
};

export const removePost = async (sectionId, id) => {
  const colRef = collection(db, 'handbook', sectionId, 'posts');
  const querySnapshot = query(colRef, limit(2));
  const posts = await getDocs(querySnapshot);
  console.log(posts.docs.length);

  await deleteDoc(doc(db, 'handbook', sectionId, 'posts', id));

  if (posts.docs.length === 1) {
    await deleteDoc(doc(db, 'handbook', sectionId));
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
