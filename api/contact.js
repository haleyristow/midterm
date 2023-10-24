import { db } from "../firebase";
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
const contactItem = async ({ userId, firstName, lastName, email, phoneNumber }) => {
    try {
        await addDoc(collection(db, "contacts"), {
            user: userId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phoneNumber: phoneNumber,
            createdAt: new Date().getTime(),
        });
    } catch (err) { }
};
const toggleContactStatus = async ({ docId, status }) => {
    try {
        const todoRef = doc(db, "contacts", docId);
        await updateDoc(todoRef, {
            status,
        });
    } catch (err) {
        console.log(err);
    }
};
const deleteContact = async (docId) => {
    try {
        const todoRef = doc(db, "contacts", docId);
        await deleteDoc(todoRef);
    } catch (err) {
        console.log(err);
    }
};
export { contactItem, toggleContactStatus, deleteContact };