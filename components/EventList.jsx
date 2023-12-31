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
import { deleteEventListItem, toggleEventListItemStatus } from "../api/event";

const EventList = () => {
    const [events, setEventList] = React.useState([]);
    const { user } = useAuth();
    const toast = useToast();
    const refreshData = () => {
        if (!user) {
            setEventList([]);
            return;
        }
        const q = query(collection(db, "EventList"), where("user", "==", user.uid));
        onSnapshot(q, (querySnapchot) => {
            let ar = [];
            querySnapchot.docs.forEach((doc) => {
                ar.push({ id: doc.id, ...doc.data() });
            });
            setEventList(ar);
        });
    };
    useEffect(() => {
        refreshData();
    }, [user]);
    const handleEventListItemDelete = async (id) => {
        if (confirm("Are you sure you wanna delete this event?")) {
            deleteEventListItem(id);
            toast({ title: "Event deleted successfully", status: "success" });
        }
    };
    const handleToggle = async (id, status) => {
        const newStatus = status == "completed" ? "pending" : "completed";
        await toggleEventListItemStatus({ docId: id, status: newStatus });
        toast({
            title: `Event status marked ${newStatus}`,
            status: newStatus == "completed" ? "success" : "warning",
        });
    };
    return (
        <Box mt={5}>
            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8}>
                {events &&
                    events.map((event) => (
                        <Box
                            key={event.userId}
                            p={3}
                            boxShadow="2xl"
                            shadow={"dark-lg"}
                            transition="0.2s"
                            _hover={{ boxShadow: "sm" }}
                        >
                            <Heading as="h3" fontSize={"xl"}>
                                {event.title}{" "}
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
                                    onClick={() => handleEventListItemDelete(event.id)}
                                >
                                    <FaTrash />
                                </Badge>
                                <Badge
                                    color={event.status == "pending" ? "gray.500" : "green.500"}
                                    bg="inherit"
                                    transition={"0.2s"}
                                    _hover={{
                                        bg: "inherit",
                                        transform: "scale(1.2)",
                                    }}
                                    float="right"
                                    size="xs"
                                    onClick={() => handleToggle(event.id, event.status)}
                                >
                                    {event.status == "pending" ? <FaToggleOff /> : <FaToggleOn />}
                                </Badge>
                                <Badge
                                    float="right"
                                    opacity="0.8"
                                    bg={event.status == "pending" ? "yellow.500" : "green.500"}
                                >
                                    {event.status}
                                </Badge>
                            </Heading>
                            <Text>{event.description}</Text>
                        </Box>
                    ))}
            </SimpleGrid>
        </Box>
    );
};
export default EventList;