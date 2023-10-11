import { db } from "../firebase";
import {
    collection,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
} from "firebase/firestore";
const shoppingListItem = async ({ userId, title, description, status }) => {
    try {
        await addDoc(collection(db, "shoppingList"), {
            user: userId,
            title: title,
            description: description,
            status: status,
            createdAt: new Date().getTime(),
        });
    } catch (err) { }
};
const toggleShoppingListItemStatus = async ({ docId, status }) => {
    try {
        const todoRef = doc(db, "shoppingList", docId);
        await updateDoc(todoRef, {
            status,
        });
    } catch (err) {
        console.log(err);
    }
};
const deleteShoppingListItem = async (docId) => {
    try {
        const todoRef = doc(db, "shoppingList", docId);
        await deleteDoc(todoRef);
    } catch (err) {
        console.log(err);
    }
};
export { shoppingListItem, toggleShoppingListItemStatus, deleteShoppingListItem };