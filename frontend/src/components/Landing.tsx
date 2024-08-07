import {
  Box,
  Button,
  Fade,
  Flex,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { Link } from "react-router-dom";
import landingBg from "../assets/landing_bg.png";
import Navbar from "./Navbar";
import { StyledInputGroup } from "./StyledComponents";
import { useDispatch } from "react-redux";
import { updateStoryField } from "../app/storySlice";

const AfterStartCreation = () => {
  const dispatch = useDispatch();
  const suggestions = ["Save the cat", "Love Healer", "Old Autumn"];
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");

  const handleUpdate = () => {
    dispatch(updateStoryField({ field: "basic", values: { title, author } }));
  };
  return (
    <>
      <VStack
        gap={{ base: 8, md: 12 }}
        alignItems={{ base: "center", lg: "start" }}
        pt={"5vh"}
        px={{ lg: "15vh" }}>
        <Text fontSize={"3xl"}>Create a New Story</Text>
        <Box width={{ base: "95%", sm: "500px", lg: "600px" }}>
          <StyledInputGroup
            label="Story Title"
            value={title}
            onChange={setTitle}
            placeholder="Enter the story title..."
          />
          <Flex
            display={{ base: "none", sm: "flex" }}
            alignItems={"center"}
            justifyContent={{ base: "center", lg: "start" }}
            direction={{ base: "column", lg: "row" }}>
            <Text my={{ base: 4, lg: 0 }}>Suggestions:</Text>
            <HStack
              justifyContent={"center"}
              wrap={"wrap"}
              color={"brand.secondary"}>
              {suggestions.map((suggestion) => (
                <Text
                  minW={"120px"}
                  onClick={() => setTitle(suggestion)}
                  cursor={"pointer"}
                  border={"1px solid"}
                  mx={4}
                  my={2}
                  py={1}
                  px={2}
                  borderRadius={"md"}
                  _hover={{ bg: "brand.darkGray" }}
                  key={suggestion}>
                  {suggestion}
                </Text>
              ))}
            </HStack>
          </Flex>
        </Box>
        <Box width={{ base: "95%", sm: "500px", lg: "600px" }}>
          <StyledInputGroup
            label="Author Name"
            value={author}
            onChange={setAuthor}
            placeholder="Enter the author name..."
          />
        </Box>
        <Button
          as={Link}
          onClick={handleUpdate}
          to={"/create"}
          variant={"primary"}
          rightIcon={<ArrowForwardIcon />}>
          Proceed
        </Button>
      </VStack>
    </>
  );
};
const Landing = () => {
  const [creationStarted, setCreationStarted] = useState(false);

  return (
    <Box
      bgImage={`url(${landingBg})`}
      bgSize={"100% 100%"}
      bgPosition={"center"}
      bgRepeat={"no-repeat"}
      minH={"100vh"}
      color={"brand.main"}
      width={"100%"}>
      <Navbar />
      {creationStarted ? (
        <AfterStartCreation />
      ) : (
        <Fade
          transition={{ enter: { duration: 2 } }}
          in={true}>
          <VStack
            gap={12}
            alignItems={"flex-start"}
            width={{ lg: "70%", xl: "53%" }}
            pt={"5vh"}
            pl={{ lg: "15vh" }}>
            <Box
              fontFamily={"Rosarivo"}
              mx={{ base: "auto", lg: "0" }}
              textAlign={{ base: "center", lg: "left" }}
              fontSize={{ base: "3xl", sm: "5xl", md: "6xl", xl: "6xl" }}>
              <Text>Dive into Dreams,</Text>
              <Text as="i">Your Stories Our Creation</Text>
            </Box>

            <Text
              px={{ base: 8, lg: 0 }}
              fontSize={"xl"}
              textAlign={{ base: "center", lg: "justify" }}
              color={"brand.secondary"}>
              Transform your ideas into captivating narratives effortlessly.
              Explore the boundless possibilities of AI-powered storytelling and
              embark on a journey where every click sparks a new adventure.
            </Text>

            <Button
              onClick={() => setCreationStarted(true)}
              mx={{ base: "auto", lg: "0" }}
              rightIcon={<ArrowForwardIcon />}
              p={6}
              color={"brand.main"}
              variant={"outline"}
              border={"1px solid"}
              borderColor={"brand.secondary"}>
              Start Creating
            </Button>
          </VStack>
        </Fade>
      )}
    </Box>
  );
};

export default Landing;
