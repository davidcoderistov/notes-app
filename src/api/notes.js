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
    loadAllNotes(startAt, pageSize) {
        let query = notesCollection
            .where('status', '==', 'intact')
            .orderBy('createdAt', 'desc');

        if(startAt) {
            query = query
                .startAfter(getTimestamp(startAt));
        }

        return query
            .limit(pageSize)
            .get();
    },
    loadFavoriteNotes(startAt, pageSize) {
        let query = notesCollection
            .where('status', '==', 'favorite')
            .orderBy('createdAt', 'desc');

        if(startAt) {
            query = query
                .startAfter(getTimestamp(startAt));
        }

        return query
            .limit(pageSize)
            .get();
    },
    loadTrashedNotes(startAt, pageSize) {
        let query = notesCollection
            .where('status', '==', 'trashed')
            .orderBy('createdAt', 'desc');

        if(startAt) {
            query = query
                .startAfter(getTimestamp(startAt));
        }

        return query
            .limit(pageSize)
            .get();
    },
    searchAllNotesByTitle(title, startAt, pageSize) {
        return notesCollection
            .where('status', '==', 'intact')
            .where('title', '>=', title)
            .where('title', '<=', `${title}\uf8ff`)
            .orderBy('title')
            .startAfter(startAt)
            .limit(pageSize)
            .get();
    },
    searchFavoriteNotesByTitle(title, startAt, pageSize) {
        return notesCollection
            .where('status', '==', 'favorite')
            .where('title', '>=', title)
            .where('title', '<=', `${title}\uf8ff`)
            .orderBy('title')
            .startAfter(startAt)
            .limit(pageSize)
            .get();
    },
    searchTrashedNotesByTitle(title, startAt, pageSize) {
        return notesCollection
            .where('status', '==', 'trashed')
            .where('title', '>=', title)
            .where('title', '<=', `${title}\uf8ff`)
            .orderBy('title')
            .startAfter(startAt)
            .limit(pageSize)
            .get();
    },
    getAllNotes() {
        return notesCollection
            .where('status', '==', 'intact')
            .get();
    },
    getFavoriteNotes() {
        return notesCollection
            .where('status', '==', 'favorite')
            .get();
    },
    getTrashedNotes() {
        return notesCollection
            .where('status', '==', 'trashed')
            .get();
    },
    getAllNotesByTitle(title) {
        return notesCollection
            .where('status', '==', 'intact')
            .where('title', '>=', title)
            .where('title', '<=', `${title}\uf8ff`)
            .get();
    },
    getFavoriteNotesByTitle(title) {
        return notesCollection
            .where('status', '==', 'favorite')
            .where('title', '>=', title)
            .where('title', '<=', `${title}\uf8ff`)
            .get();
    },
    getTrashedNotesByTitle(title) {
        return notesCollection
            .where('status', '==', 'trashed')
            .where('title', '>=', title)
            .where('title', '<=', `${title}\uf8ff`)
            .get();
    },
    markNoteAsFavorite(noteId) {
        return notesCollection
            .doc(noteId)
            .update({
                'status': 'favorite'
            });
    },
    markNoteAsTrashed(noteId) {
        return notesCollection
            .doc(noteId)
            .update({
                'status': 'trashed'
            });
    },
    markNoteAsPending(noteId) {
        return notesCollection
            .doc(noteId)
            .update({
                'status': 'intact'
            });
    },
    deleteNote(noteId) {
        return notesCollection
            .doc(noteId)
            .delete();
    },
    syncNote(noteId, title, content) {
        return notesCollection
            .doc(noteId)
            .update({
                title,
                content
            });
    },
    addNote(title, content) {
        return notesCollection.add({
            title,
            content,
            createdAt: new firebase.firestore.Timestamp.fromDate(new Date())
        }).then(note => {
            return notesCollection
                .doc(note.id)
                .update({
                    id: note.id
                }).then(() => note.id).catch(error => error);
        }).catch(error => error);
    },
    getNote(noteId) {
        return notesCollection.doc(noteId).get();
    }
};

export { notesAPI }
