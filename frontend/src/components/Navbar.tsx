import { HStack, Text, Link as ChakraLink, Button } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { useSelector } from "react-redux";
import { handleSignout } from "../api/supabaseCalls";

const Navbar = () => {
  const navigate = useNavigate();
  const session = useSelector((state: RootState) => state.control.session);
  return (
    <HStack
      color={"brand.main"}
      fontSize={{ base: "lg", sm: "xl" }}
      py={4}
      px={8}
      width={"full"}
      justifyContent={"space-between"}>
      <Text> Public AI</Text>
      <HStack gap={{ base: 4, sm: 8, md: 16 }}>
        <ChakraLink
          as={Link}
          fontSize={{ base: "md", md: "lg" }}
          to={"/"}>
          Home
        </ChakraLink>
        {session?.access_token ? (
          <Button
            size={"sm"}
            fontSize={{ base: "md", md: "lg" }}
            colorScheme="red"
            onClick={async () => await handleSignout(navigate)}>
            Sign Out
          </Button>
        ) : (
          <ChakraLink
            as={Link}
            to={"/auth"}>
            Login
          </ChakraLink>
        )}
      </HStack>
    </HStack>
  );
};

export default Navbar;
