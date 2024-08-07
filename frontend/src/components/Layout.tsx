import {
  Box,
  Button,
  Flex,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import Navbar from "./Navbar";
import { ReactNode, useState } from "react";
import { SearchIcon, SettingsIcon } from "@chakra-ui/icons";
import { setIsSettingsActive } from "../app/controlSlice";
import { useDispatch, useSelector } from "react-redux";
import { generateNovel } from "../api/apiCalls";
import { RootState } from "../app/store";

const Layout = ({ children }: { children: ReactNode }) => {
  const dispatch = useDispatch();
  const story = useSelector((state: RootState) => state.story);
  const session = useSelector((state: RootState) => state.control.session);
  const [searchValue, setSearchValue] = useState("");

  const handleStoryGenerate = async () => {
    const response = await generateNovel(session, story);
    console.log(response);
  };
  return (
    <Box
      color={"brand.main"}
      width={"100%"}
      minH={"100vh"}
      bg={"#090808"}>
      <Navbar />
      <Flex
        gap={{ base: 0, sm: 4, md: 8 }}
        borderTop={"1px solid"}
        borderBottom={"1px solid"}
        borderColor={"brand.darkGray"}
        direction={{ base: "column-reverse", sm: "row" }}>
        <Box
          width={"95%"}
          flex={1}>
          <InputGroup m={2}>
            <Input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              py={4}
              size={"lg"}
              bg="transparent"
              placeholder="Search.. "
              variant={"primary"}
            />
            <InputRightElement
              border={"1px solid"}
              borderColor={"brand.darkGray"}
              borderRightRadius={"8px"}
              width={"4.5rem"}
              height={"full"}
              bg={"brand.darkGray"}
              cursor={"pointer"}>
              <SearchIcon color={"brand.secondary"} />
            </InputRightElement>
          </InputGroup>
        </Box>

        <HStack
          borderLeft={{ base: "none", lg: "1px solid" }}
          borderColor={{ lg: "brand.darkGray" }}
          pl={4}
          justifyContent={{ base: "flex-end", sm: "start" }}
          alignItems={"center"}
          flex={{ base: 0, lg: 1 }}>
          <Button
            onClick={() => dispatch(setIsSettingsActive(true))}
            my={2}
            py={6}
            fontSize={"lg"}
            border={"2px solid"}
            borderColor={"brand.darkGray"}
            rounded={"full"}
            color={"brand.main"}
            bgColor={"transparent"}
            leftIcon={<SettingsIcon color={"brand.secondary"} />}>
            Settings
          </Button>
        </HStack>
      </Flex>
      <Flex
        gap={8}
        mx={2}
        mt={"3vh"}
        direction={{ base: "column-reverse", lg: "row" }}>
        <VStack
          alignItems={{ base: "center", lg: "flex-end" }}
          flex={1}>
          <Textarea
            height={{ base: "20vh", lg: "67vh" }}
            variant={"primary"}
            placeholder="Fill in the required details for a story to be generated."
          />
          <Button
            onClick={handleStoryGenerate}
            my={4}
            variant={"primary"}>
            Generate Story
          </Button>
        </VStack>
        <Box flex={1}>{children}</Box>
      </Flex>
    </Box>
  );
};

export default Layout;
