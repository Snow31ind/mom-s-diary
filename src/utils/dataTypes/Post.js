import { serverTimestamp } from 'firebase/firestore';

class Post {
  constructor(content, desc, name, photo, sectionId, createdAt, updatedAt) {
    this.content = content;
    this.desc = desc;
    this.name = name;
    this.photo = photo;
    this.sectionId = sectionId;
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
      sectionId: post.sectionId,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    const { content, desc, name, photo, sectionId, createdAt, updatedAt } =
      data;

    return new Post(
      content,
      desc,
      name,
      photo,
      sectionId,
      createdAt,
      updatedAt
    );
  },
};
