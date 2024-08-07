import { ChatIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Fade,
  Flex,
  HStack,
  Text,
  VStack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Textarea,
} from "@chakra-ui/react";
import useDetailsModal from "../../hooks/useDetailsModal";
import { worldDetails } from "../../data/data";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { updateStoryField } from "../../app/storySlice";
import { generateWorld } from "../../api/apiCalls";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const WorldDetails = ({ animation }: { animation: string }) => {
  const [isWorldGenerating, setIsWorldGenerating] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [refineValue, setRefineValue] = useState("");
  const dispatch = useDispatch();
  const storedWorld = useSelector(
    (state: RootState) => state.story.world_details
  );
  const [world, setWorld] = useState(storedWorld || "");
  const session = useSelector((state: RootState) => state.control.session);
  const story = useSelector((state: RootState) => state.story);
  const fieldName = "world_details";
  const fieldSaveAs = "object";
  const { ModalComponent, openModal } = useDetailsModal(
    worldDetails,
    fieldName,
    "World Generation Details",
    fieldSaveAs
  );

  const handleGenerateWorld = async (value?: string) => {
    let worldResponse;
    if (
      story?.genre &&
      story?.story_details &&
      story?.story_structure &&
      story?.story_structure_outlines &&
      story?.synopsis
    ) {
      try {
        setIsWorldGenerating(true);
        if (value) {
          worldResponse = await generateWorld(session, story, value);
        } else {
          worldResponse = await generateWorld(session, story);
        }

        const world_details = worldResponse?.data?.world_details;
        console.log(worldResponse, "worldResponse");
        if (worldDetails) {
          setWorld(world_details);
          dispatch(
            updateStoryField({
              field: "world_details",
              values: world_details,
            })
          );
          onClose();
          setRefineValue("");
        } else {
          throw new Error("World Details not found in response.");
        }
      } catch (error) {
        console.error("Error generating world details:", error);
        toast.error("An error occurred while generating world.");
      } finally {
        setIsWorldGenerating(false);
      }
    } else {
      toast.info("Please complete the other sections first");
    }
  };

  const handleRefineWorld = () => {
    dispatch(
      updateStoryField({
        field: "refine",
        values: refineValue,
      })
    );
    handleGenerateWorld(refineValue);
  };

  useEffect(() => {
    if (story?.world_details) {
      setWorld(story?.world_details);
    }
  }, [story?.world_details]);

  return (
    <>
      <ModalComponent />
      <Box width={"full"}>
        <Modal
          size={"lg"}
          isCentered
          isOpen={isOpen}
          onClose={onClose}>
          <ModalOverlay />
          <ModalContent bg="brand.darkGray">
            <ModalHeader
              color="brand.main"
              mx="auto">
              Improve your world
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Textarea
                value={refineValue}
                onChange={(e) => setRefineValue(e.target.value)}
                minH={"45vh"}
                border={"2px solid"}
                borderColor={"brand.darkGray"}
                variant={"primary"}
              />
            </ModalBody>

            <ModalFooter>
              <Button
                isDisabled={!refineValue || isWorldGenerating}
                onClick={handleRefineWorld}
                mx="auto"
                variant="primary">
                {isWorldGenerating ? "Refining..." : "Refine World"}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Fade
          in={animation === "world"}
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
                World Generation
              </Text>
              <HStack
                width={{ base: "full", md: "auto" }}
                justifyContent={{ base: "space-between", md: "flex-end" }}>
                <Button
                  isLoading={isWorldGenerating}
                  onClick={!storedWorld ? () => handleGenerateWorld() : onOpen}
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
              Your Generated World details will be shown here
            </Text>

            {world && typeof world === "object" && !Array.isArray(world) ? (
              <Flex
                direction="column"
                css={{
                  "&::-webkit-scrollbar": {
                    width: "0.6em",
                  },
                  "&::-webkit-scrollbar-thumb": {
                    backgroundColor: "#9699A0",
                    borderRadius: "0.25em",
                  },
                }}
                gap={4}
                mt={4}
                pr={4}
                overflowY={"auto"}
                maxH={"45vh"}
                width={"full"}>
                <Box
                  borderRadius={"16px"}
                  p={4}
                  bg="#252528">
                  <Text fontWeight={"bold"}>Introduction:</Text>
                  <Text
                    textAlign="justify"
                    mt={2}
                    fontSize={"md"}
                    color={"brand.secondary"}>
                    {world?.introduction}
                  </Text>
                </Box>
                <Box
                  borderRadius={"16px"}
                  p={4}
                  bg="#252528">
                  <Text fontWeight={"bold"}>History:</Text>
                  <Text
                    textAlign="justify"
                    mt={2}
                    fontSize={"md"}
                    color={"brand.secondary"}>
                    {world?.history}
                  </Text>
                </Box>
                <Box
                  borderRadius={"16px"}
                  p={4}
                  bg="#252528">
                  <Text fontWeight={"bold"}>Geography:</Text>
                  <Text
                    textAlign="justify"
                    mt={2}
                    fontSize={"md"}
                    color={"brand.secondary"}>
                    {world?.geography}
                  </Text>
                </Box>
              </Flex>
            ) : (
              <Box
                mt={4}
                width={"full"}>
                <VStack mt={16}>
                  <Text fontSize={"2xl"}>
                    {isWorldGenerating
                      ? "Generating World..."
                      : "No Generated World found ."}
                  </Text>
                  <Text color={"brand.secondary"}>
                    {isWorldGenerating
                      ? "Please wait.. We are generating world for you"
                      : "Please click on Generate World below to add."}
                  </Text>
                </VStack>
              </Box>
            )}
          </VStack>
          <Box
            width={"full"}
            textAlign={"end"}>
            <Button
              onClick={() => openModal()}
              variant={"primary"}
              mt={4}>
              {storedWorld ? "Edit Details" : "Generate World"}
            </Button>
          </Box>
        </Fade>
      </Box>
    </>
  );
};

export default WorldDetails;
