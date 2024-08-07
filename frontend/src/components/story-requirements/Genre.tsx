import { ChatIcon, CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Fade,
  HStack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { StyledInputGroup } from "../StyledComponents";
import { useEffect, useState } from "react";
import { updateStoryField } from "../../app/storySlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import {
  incrementRequirementIndex,
  setIsGenreSectionCompleted,
} from "../../app/controlSlice";

const Genre = ({ animation }: { animation: string }) => {
  const dispatch = useDispatch();
  const storedGenre = useSelector((state: RootState) => state.story.genre);
  const [isDirty, setIsDirty] = useState(false);
  const [genre, setGenre] = useState(
    typeof storedGenre === "object" && !Array.isArray(storedGenre)
      ? storedGenre.genre || ""
      : ""
  );
  const [subGenre, setSubGenre] = useState(
    typeof storedGenre === "object" && !Array.isArray(storedGenre)
      ? storedGenre.subGenre || ""
      : ""
  );

  const [brainstorm, setBrainstorm] = useState(
    typeof storedGenre === "object" && !Array.isArray(storedGenre)
      ? storedGenre.brainstorm || ""
      : ""
  );

  const handleUpdateGenre = async () => {
    dispatch(
      updateStoryField({
        field: "genre",
        values: { genre, subGenre, brainstorm },
      })
    );
    setTimeout(() => {
      dispatch(incrementRequirementIndex(1));
    }, 500);
  };

  useEffect(() => {
    if (
      storedGenre &&
      typeof storedGenre === "object" &&
      !Array.isArray(storedGenre) &&
      (genre !== storedGenre.genre ||
        subGenre !== storedGenre.subGenre ||
        brainstorm !== storedGenre.brainstorm)
    ) {
      console.log("dirty true ran");
      setIsDirty(true);
    } else {
      console.log("dirty false ran");
      setIsDirty(false);
    }

    if (genre && subGenre && brainstorm) {
      dispatch(setIsGenreSectionCompleted(true));
    } else {
      dispatch(setIsGenreSectionCompleted(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [genre, subGenre, storedGenre, brainstorm]);

  return (
    <Box width={"full"}>
      <Fade
        in={animation === "genre"}
        transition={{ enter: { duration: 1.3 } }}>
        <Box
          width={"full"}
          flex={1}
          minH={{ base: "35vh", sm: "67vh" }}>
          <VStack
            gap={"2vh"}
            alignItems={"flex-start"}>
            <HStack
              width={"full"}
              justifyContent={"space-between"}>
              <Text fontSize={"2xl"}>Genre</Text>
              <Button
                variant={"primary"}
                leftIcon={<ChatIcon color={"brand.secondary"} />}>
                Chat
              </Button>
            </HStack>
            <Box width={"full"}>
              <StyledInputGroup
                value={genre}
                onChange={setGenre}
                label="Select Genre"
                placeholder="Enter the genre of the story.."
              />

              <StyledInputGroup
                value={subGenre}
                onChange={setSubGenre}
                label="Sub Genre"
                placeholder="Enter the sub genre of the story.."
              />
              <Box width={"full"}>
                <Text fontSize={"xl"}>Brainstorm Idea</Text>
                <Textarea
                  css={{
                    "&::-webkit-scrollbar": {
                      width: "0.6em",
                    },
                    "&::-webkit-scrollbar-thumb": {
                      backgroundColor: "#9699A0",
                      borderRadius: "0.25em",
                    },
                  }}
                  minH={"12vh"}
                  border={"2px solid"}
                  borderColor={"brand.darkGray"}
                  my={4}
                  variant={"primary"}
                  placeholder="Brainstorm on the details of the story.."
                  value={brainstorm}
                  onChange={(e) => setBrainstorm(e.target.value)}
                />
              </Box>
            </Box>
          </VStack>
        </Box>
        <Box
          width={"full"}
          textAlign={"end"}>
          <Button
            isDisabled={
              storedGenre
                ? !isDirty
                : false || (!genre && !subGenre && !brainstorm)
            }
            onClick={handleUpdateGenre}
            variant={"primary"}
            mt={4}>
            {!storedGenre ? (
              "Save"
            ) : storedGenre && !isDirty ? (
              <CheckIcon fontSize={"3xl"} />
            ) : (
              "Update"
            )}
          </Button>
        </Box>
      </Fade>
    </Box>
  );
};

export default Genre;
