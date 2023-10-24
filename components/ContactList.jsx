import {
    Badge,
    Box,
    Heading,
    SimpleGrid,
    Text,
    useToast,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../firebase";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteContact, toggleContactStatus } from "../api/contact";

const ContactList = () => {
    const [contacts, setContacts] = React.useState([]);
    const { user } = useAuth();
    const toast = useToast();

    const refreshData = () => {
        if (!user) {
            setContacts([]);
            return;
        }
        const q = query(collection(db, "contacts"), where("user", "==", user.uid));
        onSnapshot(q, (querySnapshot) => {
            let arr = [];
            querySnapshot.docs.forEach((doc) => {
                arr.push({ id: doc.id, ...doc.data() });
            });
            setContacts(arr);
        });
    };

    useEffect(() => {
        refreshData();
    }, [user]);

    const handleContactDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this contact?")) {
            deleteContact(id);
            toast({ title: "Contact deleted successfully", status: "success" });
        }
    };

    // Assuming you also want to toggle some status for the contacts.
    const handleToggle = async (id, status) => {
        const newStatus = status === "completed" ? "pending" : "completed";
        await toggleContactStatus({ docId: id, status: newStatus });
        toast({
            title: `Contact status marked ${newStatus}`,
            status: newStatus === "completed" ? "success" : "warning",
        });
    };

    return (
        <Box mt={5}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                {contacts && contacts.map((contact) => (
                    <Box
                        p={3}
                        boxShadow="2xl"
                        shadow={"dark-lg"}
                        transition="0.2s"
                        _hover={{ boxShadow: "sm" }}
                    >
                        <Heading as="h3" fontSize={"xl"}>
                            {contact.firstName} {contact.lastName}
                            <Badge
                                color="red.500"
                                bg="inherit"
                                transition={"0.2s"}
                                _hover={{
                                    bg: "inherit",
                                    transform: "scale(1.2)",
                                }}
                                float="right"
                                size="xs"
                                onClick={() => handleContactDelete(contact.id)}
                            >
                                <FaTrash />
                            </Badge>
                            {/* Uncomment the next badge if contacts have a status to be toggled */}
                            {/* 
                            <Badge
                                color={contact.status === "pending" ? "gray.500" : "green.500"}
                                bg="inherit"
                                transition={"0.2s"}
                                _hover={{
                                    bg: "inherit",
                                    transform: "scale(1.2)",
                                }}
                                float="right"
                                size="xs"
                                onClick={() => handleToggle(contact.id, contact.status)}
                            >
                                {contact.status === "pending" ? <FaToggleOff /> : <FaToggleOn />}
                            </Badge>
                            */}
                        </Heading>
                        <Text>{contact.email}</Text>
                        <Text>{contact.phoneNumber}</Text>
                    </Box>
                ))}
            </SimpleGrid>
        </Box>
    );
};

export default ContactList;
