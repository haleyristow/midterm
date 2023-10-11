import { Container } from "@chakra-ui/react";
import AddShoppingList from "../components/AddShoppingList";
import Auth from "../components/Auth";
export default function shoppingList() {
    return (
        <Container maxW="7xl">
            <Auth />
            <AddShoppingList />
        </Container>
    );
}