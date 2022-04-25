import { serverTimestamp } from 'firebase/firestore';

class Section {
  constructor(title, createdAt, updatedAt) {
    this.title = title;
    this.createdAt = createdAt.toDate().toString();
    this.updatedAt = updatedAt.toDate().toString();
  }
}

export const sectionConverter = {
  toFirestore: (section) => {
    return {
      title: section.title,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
  },

  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    const { title, createdAt, updatedAt } = data;

    return new Section(title, createdAt, updatedAt);
  },
};
