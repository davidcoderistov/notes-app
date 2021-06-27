import firebase from '../app/config';

/* Note: All count queries are not optimized. Possible solution: trigger functions */

const defaultStore = firebase.firestore();

const notesCollection = defaultStore.collection('notes');

function getTimestamp(date) {
    if(date.hasOwnProperty('seconds') && date.hasOwnProperty('nanoseconds')) {
        const { seconds, nanoseconds } = date;
        return new firebase.firestore.Timestamp(seconds, nanoseconds);
    }
    return date;
}

const notesAPI = {
    loadNotes(startAt, pageSize) {
        return notesCollection
            .orderBy('createdAt')
            .startAfter(getTimestamp(startAt))
            .limit(pageSize)
            .get();
    },
    searchByTitle(titleQuery, startAt, pageSize) {
        return notesCollection
            .where('title', '>=', titleQuery)
            .where('title', '<=', `${titleQuery}\uf8ff`)
            .orderBy('title')
            .startAfter(startAt)
            .limit(pageSize)
            .get();
    },
    getAllNotes() {
        return notesCollection.get();
    },
    getAllNotesByTitle(titleQuery) {
        return notesCollection
            .where('title', '>=', titleQuery)
            .where('title', '<=', `${titleQuery}\uf8ff`)
            .get();
    }
};

export { notesAPI }
