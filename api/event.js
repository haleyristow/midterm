import { db } from "../firebase";
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
const eventListItem = async ({ userId, title, description, status }) => {
    try {
        await addDoc(collection(db, "EventList"), {
            user: userId,
            title: title,
            description: description,
            status: status,
            createdAt: new Date().getTime(),
        });
    } catch (err) { }
};
const toggleEventListItemStatus = async ({ docId, status }) => {
    try {
        const todoRef = doc(db, "EventList", docId);
        await updateDoc(todoRef, {
            status,
        });
    } catch (err) {
        console.log(err);
    }
};
const deleteEventListItem = async (docId) => {
    try {
        const todoRef = doc(db, "EventList", docId);
        await deleteDoc(todoRef);
    } catch (err) {
        console.log(err);
    }
};
export { eventListItem, toggleEventListItemStatus, deleteEventListItem };