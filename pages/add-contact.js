import { Container } from "@chakra-ui/react";
import Auth from "../components/Auth";
import AddContact from "../components/AddContact";
export default function AddNewContact() {
    return (
        <Container maxW="7xl">
            <Auth />
            <AddContact />
        </Container>
    );
}