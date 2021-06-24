import firebase from '../app/config';

const defaultStore = firebase.firestore();

const notesCollection = defaultStore.collection('notes');

const notesAPI = {
    fetchMoreNotes(startAt, pageSize) {
        return notesCollection.orderBy('createdAt').startAfter(startAt).limit(pageSize).get();
    }
};

export { notesAPI }
