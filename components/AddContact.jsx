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
import { contactItem } from "../api/contact";
const AddContact = () => {
    const [firstName, setFirstName] = React.useState("");
    const [lastName, setLastName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [isLoading, setIsLoading] = React.useState(false);

    const toast = useToast();
    const { isLoggedIn, user } = useAuth();

    const handleContactCreate = async () => {
        if (!isLoggedIn) {
            toast({
                title: "You must be logged in to add a contact",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
            return;
        }
        setIsLoading(true);
        const contact = {
            firstName,
            lastName,
            email,
            phoneNumber,
            userId: user.uid,
        };
        await contactItem(contact);
        setIsLoading(false);
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhoneNumber("");
        toast({ title: "Contact added successfully", status: "success" });
    };

    return (
        <Box w="40%" margin={"0 auto"} display="block" mt={5}>
            <Stack direction="column">
                <Input
                    placeholder="First Name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <Input
                    placeholder="Last Name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />
                <Input
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <Input
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <Button
                    onClick={handleContactCreate}
                    disabled={!firstName || !lastName || !email || !phoneNumber || isLoading}
                    variantColor="teal"
                    variant="solid"
                >
                    Add Contact
                </Button>
            </Stack>
        </Box>
    );
};

export default AddContact;