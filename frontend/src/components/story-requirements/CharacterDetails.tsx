import { AddIcon, ChatIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Fade,
  Flex,
  HStack,
  Text,
  // Textarea,
  VStack,
} from "@chakra-ui/react";
import { characterDetails } from "../../data/data";
import useDetailsModal from "../../hooks/useDetailsModal";
import { RootState } from "../../app/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteFromArray, updateStoryField } from "../../app/storySlice";
import { generateCharacters } from "../../api/apiCalls";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const CharacterDetails = ({ animation }: { animation: string }) => {
  const dispatch = useDispatch();
  const [isCharactersGenerating, setIsCharactersGenerating] = useState(false);
  const story = useSelector((state: RootState) => state.story);
  const session = useSelector((state: RootState) => state.control.session);
  const fieldName = "character_details";
  const fieldSaveAs = "array";
  const storedCharacters = useSelector(
    (state: RootState) => state.story[fieldName]
  );
  const storedSynopsis = useSelector(
    (state: RootState) => state.story.synopsis
  );
  const [characters, setCharacters] = useState(storedCharacters || []);
  console.log(storedCharacters, "storedCharacters");

  const handleGenerateCharacters = async ({
    generateSingle,
  }: {
    generateSingle?: boolean;
  }) => {
    if (
      typeof storedSynopsis === "object" &&
      !Array.isArray(storedSynopsis) &&
      storedSynopsis?.synopsis !== ""
    ) {
      try {
        setIsCharactersGenerating(true);
        const characterResponse = await generateCharacters(
          session,
          story?.synopsis,
          generateSingle,
          storedCharacters as { [key: string]: string | number }[]
        );
        const characterDetails = characterResponse?.data?.character_details;

        if (characterDetails) {
          setCharacters(characterDetails);
          dispatch(
            updateStoryField({
              field: fieldName,
              values: characterDetails,
            })
          );

          console.log(characterDetails, "characterDetails");

          if (generateSingle) {
            return characterDetails;
          }
          console.log(characterResponse);
        } else {
          throw new Error("Character details not found in response.");
        }
      } catch (error) {
        console.error("Error generating characters:", error);
        toast.error("An error occurred while generating characters.");
      } finally {
        setIsCharactersGenerating(false);
      }
    } else {
      toast.info("Please complete the Synopsis first.");
    }
  };

  const { ModalComponent, openModal } = useDetailsModal(
    characterDetails, //Input Fields Array
    fieldName, //field Name to save in Redux
    "Character Profile Template", // Modal Title
    fieldSaveAs, //Field Type needed for Redux
    handleGenerateCharacters // function to run on AI generate in modal
  );

  const handleEditCharacter = (characterId: number | undefined) => {
    console.log(characterId, "characterId");
    if (characterId) {
      openModal(characterId);
    }
  };

  const handleDeleteCharacter = (characterId: number | undefined) => {
    if (characterId) {
      dispatch(deleteFromArray({ field: fieldName, id: characterId }));
    }
  };

  const truncateString = (str: string, numWords: number) => {
    const words = str.split(" ");
    const truncatedWords = words.slice(0, numWords);
    const truncatedString = truncatedWords.join(" ");
    return words.length > numWords ? truncatedString + "..." : truncatedString;
  };

  useEffect(() => {
    setCharacters(storedCharacters || []);
  }, [storedCharacters]);

  return (
    <>
      <ModalComponent />
      <Box width={"full"}>
        <Fade
          in={animation === "character"}
          transition={{ enter: { duration: 1.3 } }}>
          <VStack
            alignItems={"flex-start"}
            minH={"67vh"}
            width={"full"}>
            <Flex
              gap={8}
              alignItems={"center"}
              direction={{ base: "column-reverse", md: "row" }}
              justifyContent={"space-between"}
              width={"full"}>
              <Text
                fontSize={"2xl"}
                textAlign={{ base: "center", md: "start" }}>
                Character Details
              </Text>
              <HStack
                width={{ base: "full", md: "auto" }}
                justifyContent={{ base: "space-between", md: "flex-end" }}>
                <Button
                  isLoading={isCharactersGenerating}
                  onClick={() =>
                    handleGenerateCharacters({ generateSingle: false })
                  }
                  variant={"primary"}
                  mr={4}>
                  AI Generate
                </Button>
                <Button
                  variant={"primary"}
                  leftIcon={<ChatIcon />}>
                  Chat
                </Button>
              </HStack>
            </Flex>
            <Text color={"brand.secondary"}>
              Please specify the character template for each character
              generated.
            </Text>
            <Box
              maxH={"46vh"}
              overflowY={"auto"}
              css={{
                "&::-webkit-scrollbar": {
                  width: "0.6em",
                },
                "&::-webkit-scrollbar-thumb": {
                  backgroundColor: "#9699A0",
                  borderRadius: "0.25em",
                },
              }}
              pr={4}
              mt={6}
              width={"full"}>
              <Text fontSize={"xl"}>Characters List</Text>
              {!characters || characters.length === 0 ? (
                <VStack mt={16}>
                  <Text fontSize={"2xl"}>
                    {isCharactersGenerating
                      ? "Generating Characters..."
                      : "No characters found."}
                  </Text>
                  <Text color={"brand.secondary"}>
                    {isCharactersGenerating
                      ? "Please wait.. We are generating characters for you"
                      : "Please click on Add Character below to add one."}
                  </Text>
                </VStack>
              ) : null}
              {Array.isArray(characters) &&
                characters?.map((character, index) => (
                  <HStack
                    key={index}
                    gap={8}>
                    <HStack
                      bg="#191919"
                      borderRadius={"16px"}
                      width={"full"}
                      my={4}
                      p={3}
                      gap={4}
                      border="2px solid"
                      borderColor={"brand.darkGray"}>
                      <Text
                        flex={1}
                        fontWeight={"bold"}>
                        Basic Info:
                      </Text>
                      <Text
                        textAlign={"justify"}
                        flex={5}
                        color={"brand.secondary"}
                        fontSize={"sm"}>
                        {truncateString(character.basic_info as string, 15)}
                      </Text>
                    </HStack>
                    <VStack
                      flex={1}
                      gap={4}>
                      <EditIcon
                        onClick={() => handleEditCharacter(character.id)}
                        color="skyblue"
                        cursor={"pointer"}
                      />
                      <DeleteIcon
                        onClick={() => handleDeleteCharacter(character.id)}
                        cursor={"pointer"}
                        color={"red"}
                      />
                    </VStack>
                  </HStack>
                ))}

              {/* <Textarea
                minH={"30vh"}
                border={"2px solid"}
                borderColor={"brand.darkGray"}
                my={4}
                variant={"primary"}
                placeholder="Enter the character list description.."
              /> */}
            </Box>
          </VStack>
          <Box
            width={"full"}
            textAlign={"end"}>
            <Button
              leftIcon={<AddIcon />}
              onClick={() => openModal()}
              variant={"primary"}
              mt={4}>
              Add Character
            </Button>
          </Box>
        </Fade>
      </Box>
    </>
  );
};

export default CharacterDetails;
