import { Container } from "@chakra-ui/react";
import Auth from "../components/Auth";
import TodoList from "../components/TodoList";
import ShoppingList from "../components/ShoppingList";
export default function Home() {
    return (
        <Container maxW="7xl">
            <Auth />


            <TodoList />
            <ShoppingList />
        </Container>
    );
}