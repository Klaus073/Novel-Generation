import { useState, useEffect } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { updateStoryField } from "../../app/storySlice";
import { RootState } from "../../app/store";
import {
  incrementRequirementIndex,
  setIsStoryDetailsSectionCompleted,
} from "../../app/controlSlice";
import { generateStoryIdea } from "../../api/apiCalls";
import { toast } from "react-toastify";

const StoryDetails = ({ animation }: { animation: string }) => {
  const dispatch = useDispatch();
  const [isStoryDetailsGenerating, setIsStoryDetailsGenerating] =
    useState(false);
  const isGenreSectionCompleted = useSelector(
    (state: RootState) => state.control.isGenreSectionCompleted
  );
  const session = useSelector((state: RootState) => state.control.session);
  const story = useSelector((state: RootState) => state.story);
  const storedStoryValues = useSelector(
    (state: RootState) => state.story.story_details
  );
  const initialValue =
    typeof storedStoryValues === "object" && !Array.isArray(storedStoryValues)
      ? storedStoryValues
      : {
          briefDetails: "",
          specifyIdea: "",
        };
  const [storyValues, setStoryValues] = useState(initialValue);
  const [isDirty, setIsDirty] = useState(false);

  const storyDetailsFields = [
    {
      name: "briefDetails",
      label: "Enter the Story Details",
      placeholder: "Enter some necessary details of the story..",
      value: storyValues.briefDetails,
    },
    {
      name: "specifyIdea",
      label: "Specify Idea",
      placeholder: "Enter your idea here..",
      value: storyValues.specifyIdea,
    },
  ];

  const handleChange = (field: string, value: string) => {
    setStoryValues({ ...storyValues, [field]: value });
  };

  const handleSave = () => {
    dispatch(updateStoryField({ field: "story_details", values: storyValues }));
    setTimeout(() => {
      dispatch(incrementRequirementIndex(1));
    }, 500);
  };

  const handleGenerateStoryIdea = async () => {
    if (isGenreSectionCompleted) {
      try {
        setIsStoryDetailsGenerating(true);
        const response = await generateStoryIdea(
          session,
          story?.genre as { [key: string]: string }
        );
        if (response) {
          const storyDetails = response.data?.story_details;
          if (storyDetails) {
            setStoryValues(storyDetails);
            dispatch(
              updateStoryField({ field: "story_details", values: storyDetails })
            );
            console.log(response);
          } else {
            console.error("Story details not found in response:", response);
          }
        } else {
          console.error("No response received.");
        }
      } catch (error) {
        console.error("Error generating story idea:", error);
      } finally {
        setIsStoryDetailsGenerating(false);
      }
    } else {
      toast.info("Please complete the genre section first");
    }
  };

  useEffect(() => {
    if (
      storedStoryValues &&
      typeof storedStoryValues === "object" &&
      !Array.isArray(storedStoryValues) &&
      (storyValues.briefDetails !== storedStoryValues.briefDetails ||
        storyValues.specifyIdea !== storedStoryValues.specifyIdea)
    ) {
      setIsDirty(true);
    } else {
      setIsDirty(false);
    }
    if (storyValues.briefDetails && storyValues.specifyIdea) {
      dispatch(setIsStoryDetailsSectionCompleted(true));
    } else {
      dispatch(setIsStoryDetailsSectionCompleted(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storyValues, storedStoryValues]);

  return (
    <Box width={"full"}>
      <Fade
        in={animation === "story"}
        transition={{ enter: { duration: 1.3 } }}>
        <VStack width={"full"}>
          <Flex
            gap={8}
            alignItems={"center"}
            direction={{ base: "column-reverse", md: "row" }}
            justifyContent={"space-between"}
            width={"full"}>
            <Text
              mb={{ base: 8, md: 0 }}
              fontSize={"2xl"}
              textAlign={{ base: "center", md: "start" }}>
              Story Details
            </Text>
            <HStack
              width={{ base: "full", md: "auto" }}
              justifyContent={{ base: "space-between", md: "flex-end" }}>
              <Button
                isLoading={isStoryDetailsGenerating}
                onClick={handleGenerateStoryIdea}
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
          <VStack
            justifyContent={"center"}
            width={"full"}
            minH={"59vh"}>
            {storyDetailsFields.map((field) => (
              <Box
                key={field.name}
                width={"full"}>
                <Text fontSize={"xl"}>{field.label}</Text>
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
                  isDisabled={isStoryDetailsGenerating}
                  minH={"20vh"}
                  border={"2px solid"}
                  borderColor={"brand.darkGray"}
                  my={4}
                  variant={"primary"}
                  placeholder={
                    isStoryDetailsGenerating
                      ? "Generating..."
                      : field.placeholder
                  }
                  value={isStoryDetailsGenerating ? "" : field.value}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
              </Box>
            ))}
          </VStack>
        </VStack>
        <Box
          width={"full"}
          textAlign={"end"}>
          <Button
            variant={"primary"}
            mt={4}
            onClick={handleSave}
            isDisabled={
              storedStoryValues
                ? !isDirty
                : false ||
                  (!storyValues.briefDetails && !storyValues.specifyIdea)
            }>
            {!storedStoryValues ? (
              "Save"
            ) : storedStoryValues && !isDirty ? (
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

export default StoryDetails;
