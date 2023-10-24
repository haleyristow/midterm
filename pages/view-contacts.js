import { Container } from "@chakra-ui/react";
import Auth from "../components/Auth";
import ContactList from "../components/ContactList";
export default function Home() {
    return (
        <Container maxW="7xl">
            <Auth />
            <ContactList />
        </Container>
    );
}