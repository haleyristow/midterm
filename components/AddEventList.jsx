import React from "react";
import {
    Box,
    Input,
    Button,
    Textarea,
    Stack,
    Select,
    useToast,
} from "@chakra-ui/react";
import useAuth from "../hooks/useAuth";
import { eventListItem } from "../api/event";
const AddEventList = () => {
    const [title, setTitle] = React.useState("");
    const [description, setDescription] = React.useState("");
    const [status, setStatus] = React.useState("pending");
    const [isLoading, setIsLoading] = React.useState(false);
    const toast = useToast();
    const { isLoggedIn, user } = useAuth();
    const handleEventCreate = async () => {
        if (!isLoggedIn) {
            toast({
                title: "You must be logged in to create an event",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        setIsLoading(true);
        const eventList = {
            title,
            description,
            status,
            userId: user.uid,
        };
        await eventListItem(eventList);
        setIsLoading(false);
        setTitle("");
        setDescription("");
        setStatus("pending");
        toast({ title: "Event item added successfully", status: "success" });
    };
    return (
        <Box w="40%" margin={"0 auto"} display="block" mt={5}>
            <Stack direction="column">
                <Input
                    placeholder="Event Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Textarea
                    placeholder="Event Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option
                        value={"pending"}
                        style={{ color: "yellow", fontWeight: "bold" }}
                    >
                        Pending ⌛
                    </option>
                    <option
                        value={"completed"}
                        style={{ color: "green", fontWeight: "bold" }}
                    >
                        Completed ✅
                    </option>
                </Select>
                <Button
                    onClick={() => handleEventCreate()}
                    disabled={title.length < 1 || description.length < 1 || isLoading}
                    variantColor="teal"
                    variant="solid"
                >
                    Add
                </Button>
            </Stack>
        </Box>
    );
};
export default AddEventList;