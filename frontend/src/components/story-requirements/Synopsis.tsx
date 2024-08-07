import { ChatIcon, CheckIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Fade,
  Flex,
  HStack,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStoryField } from "../../app/storySlice";
import { RootState } from "../../app/store";
import { generateSynopsis } from "../../api/apiCalls";
import { toast } from "react-toastify";
import { incrementRequirementIndex } from "../../app/controlSlice";

const Synopsis = ({ animation }: { animation: string }) => {
  const dispatch = useDispatch();
  const [isSynopsisGenerating, setIsSynopsisGenerating] = useState(false);
  const isStoryDetailsSectionCompleted = useSelector(
    (state: RootState) => state.control.isStoryDetailsSectionCompleted
  );
  const isGenreSectionCompleted = useSelector(
    (state: RootState) => state.control.isGenreSectionCompleted
  );
  const [isDirty, setIsDirty] = useState(false);
  const session = useSelector((state: RootState) => state.control.session);
  const story = useSelector((state: RootState) => state.story);
  const storedSynopsis = useSelector(
    (state: RootState) => state.story.synopsis
  );
  const [synopsis, setSynopsis] = useState(
    typeof storedSynopsis === "object" && !Array.isArray(storedSynopsis)
      ? storedSynopsis.synopsis || ""
      : ""
  );
  const handleSaveSynopsis = () => {
    dispatch(updateStoryField({ field: "synopsis", values: { synopsis } }));
    setTimeout(() => {
      dispatch(incrementRequirementIndex(1));
    }, 500);
  };

  const handleGenerateSynopsis = async () => {
    if (isGenreSectionCompleted && isStoryDetailsSectionCompleted) {
      try {
        setIsSynopsisGenerating(true);
        const synopsisResponse = await generateSynopsis(session, story);
        const synopsis = synopsisResponse?.data?.synopsis?.synopsis;

        if (synopsis) {
          setSynopsis(synopsis);
          dispatch(
            updateStoryField({
              field: "synopsis",
              values: synopsisResponse?.data?.synopsis,
            })
          );
          console.log(synopsisResponse);
        } else {
          throw new Error("Synopsis not found in response.");
        }
      } catch (error) {
        console.error("Error generating synopsis:", error);
        toast.error("An error occurred while generating synopsis.");
      } finally {
        setIsSynopsisGenerating(false);
      }
    } else {
      toast.info("Please complete the genre and story details sections first.");
    }
  };

  useEffect(() => {
    if (
      storedSynopsis &&
      typeof storedSynopsis === "object" &&
      !Array.isArray(storedSynopsis) &&
      synopsis !== storedSynopsis.synopsis
    ) {
      setIsDirty(true);
    } else {
      setIsDirty(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [synopsis, storedSynopsis]);

  return (
    <Box width={"full"}>
      <Fade
        in={animation === "synopsis"}
        transition={{ enter: { duration: 1.3 } }}>
        <VStack
          height={"67vh"}
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
              Synopsis
            </Text>
            <HStack
              width={{ base: "full", md: "auto" }}
              justifyContent={{ base: "space-between", md: "flex-end" }}>
              <Button
                isLoading={isSynopsisGenerating}
                onClick={handleGenerateSynopsis}
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
          <Box
            mt={12}
            width={"full"}>
            <Text fontSize={"xl"}>Synopsis of the story</Text>
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
              isDisabled={isSynopsisGenerating}
              value={isSynopsisGenerating ? "" : synopsis}
              onChange={(e) => setSynopsis(e.target.value)}
              minH={"30vh"}
              border={"2px solid"}
              borderColor={"brand.darkGray"}
              my={4}
              variant={"primary"}
              placeholder={
                isSynopsisGenerating
                  ? "Generating..."
                  : "Enter the summary of the story.."
              }
            />
          </Box>
        </VStack>
        <Box
          width={"full"}
          textAlign={"end"}>
          <Button
            variant={"primary"}
            mt={4}
            onClick={handleSaveSynopsis}
            isDisabled={
              storedSynopsis && synopsis ? !isDirty : false || !synopsis
            }>
            {!storedSynopsis ? (
              "Save"
            ) : storedSynopsis && !isDirty ? (
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

export default Synopsis;
