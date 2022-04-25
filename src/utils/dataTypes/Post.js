import { serverTimestamp } from 'firebase/firestore';

class Post {
  constructor(content, desc, name, photo, type, createdAt, updatedAt) {
    this.content = content;
    this.desc = desc;
    this.name = name;
    this.photo = photo;
    this.type = type;
    this.createdAt = createdAt.toDate().toString();
    this.updatedAt = updatedAt.toDate().toString();
  }
}

export const postConverter = {
  toFirestore: (post) => {
    return {
      content: post.content,
      desc: post.desc,
      name: post.name,
      photo: post.photo,
      type: post.type,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    const { content, desc, name, photo, type, createdAt, updatedAt } = data;

    return new Post(content, desc, name, photo, type, createdAt, updatedAt);
  },
};
