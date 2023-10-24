import { Container } from "@chakra-ui/react";
import AddEventList from "../components/AddEventList";
import Auth from "../components/Auth";
export default function eventList() {
    return (
        <Container maxW="7xl">
            <Auth />
            <AddEventList />
        </Container>
    );
}