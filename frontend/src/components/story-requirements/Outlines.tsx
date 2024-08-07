import { ChatIcon, CheckIcon, ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Fade,
  Flex,
  HStack,
  Text,
  Textarea,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateStoryField } from "../../app/storySlice";
import { RootState } from "../../app/store";
import { incrementRequirementIndex } from "../../app/controlSlice";
import { storyStructures } from "../../data/data";
import { toast } from "react-toastify";
import { generateOutlines } from "../../api/apiCalls";

const Outlines = ({ animation }: { animation: string }) => {
  const dispatch = useDispatch();
  const session = useSelector((state: RootState) => state.control.session);
  const story = useSelector((state: RootState) => state.story);
  const [isOutlinesGenerating, setIsOutlinesGenerating] = useState(false);
  const storedOutlines = useSelector(
    (state: RootState) => state.story.story_structure_outlines
  );
  const storedStructure = useSelector(
    (state: RootState) => state.story.story_structure
  );
  const [isDirty, setIsDirty] = useState(false);
  const [outlines, setOutlines] = useState((storedOutlines as string) || "");
  const [selectedStructure, setSelectedStructure] = useState(
    (storedStructure as string) || ""
  );

  const handleStructureSelect = (structure: string) => {
    setSelectedStructure(structure);
    dispatch(updateStoryField({ field: "story_structure", values: structure }));
  };

  const handleSaveOutlines = () => {
    dispatch(
      updateStoryField({
        field: "story_structure_outlines",
        values: outlines,
      })
    );
    setTimeout(() => {
      dispatch(incrementRequirementIndex(1));
    }, 500);
  };

  const handleGenerateOutlines = async () => {
    if (selectedStructure) {
      try {
        setIsOutlinesGenerating(true);
        console.log(selectedStructure);
        const outlinesResponse = await generateOutlines(session, story);
        const outlines = outlinesResponse?.data?.story_structure_outlines;
        console.log(outlinesResponse, "outlinesResponse");
        if (outlines) {
          setOutlines(outlines);
          dispatch(
            updateStoryField({
              field: "story_structure_outlines",
              values: outlines,
            })
          );
          console.log(outlinesResponse);
        } else {
          throw new Error("Outlines not found in response.");
        }
      } catch (error) {
        console.error("Error generating outlines:", error);
        toast.error("An error occurred while generating outlines.");
      } finally {
        setIsOutlinesGenerating(false);
      }
    } else {
      toast.info("Please select the story structure first");
    }
  };

  useEffect(() => {
    if (storedOutlines !== outlines) {
      setIsDirty(true);
    } else {
      setIsDirty(false);
    }
  }, [outlines, storedOutlines]);

  return (
    <Box width={"full"}>
      <Fade
        in={animation === "outlines"}
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
              Outlines
            </Text>
            <HStack
              width={{ base: "full", md: "auto" }}
              justifyContent={{ base: "space-between", md: "flex-end" }}>
              <Button
                isLoading={isOutlinesGenerating}
                onClick={handleGenerateOutlines}
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
            mt={6}
            width={"full"}>
            <Text fontSize={"xl"}>Story Structure</Text>
            <Menu matchWidth>
              <MenuButton
                _active={{ bg: "brand.darkGray" }}
                _hover={{ bg: "brand.darkGray" }}
                my={4}
                py={8}
                border={"2px solid"}
                borderColor={"brand.darkGray"}
                bg={"#252528"}
                width={"full"}
                size={"lg"}
                color={"brand.secondary"}
                as={Button}
                rightIcon={<ChevronDownIcon />}>
                {selectedStructure || "Please select the story structure"}
              </MenuButton>
              <MenuList
                overflowY={"auto"}
                maxH={"45vh"}
                css={{
                  "&::-webkit-scrollbar": {
                    width: "0.6em",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#9699A0",
                    borderRadius: "0.25em",
                  },
                }}
                bg={"#252528"}
                borderColor={"brand.darkGray"}
                color={"brand.secondary"}>
                {storyStructures.map((structure, index) => (
                  <MenuItem
                    onClick={() => handleStructureSelect(structure)}
                    _hover={{ bg: "brand.darkGray" }}
                    key={index}
                    bg={"#252528"}>
                    {index + 1} - {structure}
                  </MenuItem>
                ))}
              </MenuList>
            </Menu>
          </Box>
          <Box width={"full"}>
            <Text fontSize={"xl"}>Specify Story Outline</Text>
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
              value={isOutlinesGenerating ? "" : outlines}
              onChange={(e) => setOutlines(e.target.value)}
              minH={"30vh"}
              border={"2px solid"}
              borderColor={"brand.darkGray"}
              my={4}
              isDisabled={isOutlinesGenerating}
              variant={"primary"}
              placeholder={
                isOutlinesGenerating ? "Generating..." : "Story Outlines"
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
            onClick={handleSaveOutlines}
            isDisabled={
              storedOutlines && outlines ? !isDirty : false || !outlines
            }>
            {!storedOutlines ? (
              "Save"
            ) : storedOutlines && !isDirty ? (
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

export default Outlines;
