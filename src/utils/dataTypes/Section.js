import { serverTimestamp, Timestamp } from 'firebase/firestore';

class Section {
  constructor(title, name, photo, createdAt, updatedAt) {
    this.title = title;
    this.name = name;
    this.photo = photo;
    this.createdAt = createdAt.toDate().toString();
    this.updatedAt = updatedAt.toDate().toString();
  }
}

export const sectionConverter = {
  toFirestore: (section) => {
    return {
      title: section.title,
      name: section.name,
      photo: section.photo,
      createdAt: section.hasOwnProperty('createdAt')
        ? Timestamp.fromDate(new Date(section.createdAt))
        : serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
  },

  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options);
    const { title, name, photo, createdAt, updatedAt } = data;

    return new Section(title, name, photo, createdAt, updatedAt);
  },
};
