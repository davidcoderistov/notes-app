import firebase from '../app/config';

/* Note: All count queries are not optimized. Possible solution: trigger functions */

const defaultStore = firebase.firestore();

const notesCollection = defaultStore.collection('notes');

const notesAPI = {
    fetchMoreNotes(startAt, pageSize) {
        let timestamp = startAt;
        if(startAt.hasOwnProperty('seconds') && startAt.hasOwnProperty('nanoseconds')) {
            const { seconds, nanoseconds } = startAt;
            timestamp = new firebase.firestore.Timestamp(seconds, nanoseconds);
        }
        return notesCollection.orderBy('createdAt').startAfter(timestamp).limit(pageSize).get();
    },
    getAllNotes() {
        return notesCollection.get();
    }
};

export { notesAPI }
