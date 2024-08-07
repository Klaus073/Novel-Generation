import { AddIcon, ChatIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Fade,
  Flex,
  HStack,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { updateStoryField } from "../../app/storySlice";
import { RootState } from "../../app/store";
import { useState } from "react";
import useLocationsModal from "../../hooks/useLocationsModal";
import { locationDetails } from "../../data/data";
import { toast } from "react-toastify";
import { generateLocation } from "../../api/apiCalls";

const Locations = ({ animation }: { animation: string }) => {
  const dispatch = useDispatch();
  const session = useSelector((state: RootState) => state.control.session);
  //   const [isLocationGenerating, setIsLocationGenerating] = useState(false);
  const story = useSelector((state: RootState) => state.story);
  const storedLocations = useSelector(
    (state: RootState) => state.story.locations
  );

  const isStoredValuesArray = Array.isArray(storedLocations);
  const [location, setLocation] = useState({
    name: "",
    description: "",
  });
  const fieldName = "locations";
  const { LocationModal, openModal } = useLocationsModal(
    locationDetails, //Input Fields Array
    fieldName, //field Name to save in Redux
    "Location Profile Template" // Modal Title
  );

  const handleAddLocation = () => {
    dispatch(
      updateStoryField({
        field: "locations",
        values: [
          {
            id:
              isStoredValuesArray &&
              storedLocations[storedLocations.length - 1]?.id
                ? storedLocations[storedLocations.length - 1]?.id + 1
                : 1,
            ...location,
            isTemplateFilled: false,
          },
        ],
      })
    );
    setLocation({ name: "", description: "" });
  };
  const handleGenerateLocation = async () => {
    if (
      story?.genre &&
      story?.story_details &&
      story?.story_structure &&
      story?.story_structure_outlines &&
      story?.synopsis &&
      story?.world_details
    ) {
      try {
        // setIsLocationGenerating(true);

        const locationResponse = await generateLocation(session, story);
        console.log(locationResponse, "locationResponse");
      } catch (error) {
        console.error("Error generating world details:", error);
        toast.error("An error occurred while generating location.");
      } finally {
        // setIsLocationGenerating(false);
      }
    } else {
      toast.info("Please complete the other sections first");
    }
  };

  return (
    <>
      <LocationModal />
      <Box width={"full"}>
        <Fade
          in={animation === "locations"}
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
                Locations
              </Text>
              <HStack
                width={{ base: "full", md: "auto" }}
                justifyContent={{ base: "space-between", md: "flex-end" }}>
                <Button
                  onClick={handleGenerateLocation}
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
              <Text fontSize={"xl"}>Location List</Text>
              <VStack alignItems={"flex-end"}>
                <Button
                  onClick={() => openModal()}
                  variant={"primary"}
                  leftIcon={<AddIcon />}>
                  New Location
                </Button>
                <Box width={"full"}>
                  <Text fontSize={"xl"}>Name</Text>
                  <Input
                    value={location.name}
                    onChange={(e) =>
                      setLocation({ ...location, name: e.target.value })
                    }
                    py={6}
                    size={"lg"}
                    border={"2px solid"}
                    borderColor={"brand.darkGray"}
                    my={4}
                    variant={"primary"}
                    placeholder="Enter name of the location.."
                  />
                </Box>
                <Box width={"full"}>
                  <Text fontSize={"xl"}>Description</Text>
                  <Input
                    value={location.description}
                    onChange={(e) =>
                      setLocation({ ...location, description: e.target.value })
                    }
                    py={6}
                    size={"lg"}
                    border={"2px solid"}
                    borderColor={"brand.darkGray"}
                    my={4}
                    variant={"primary"}
                    placeholder="Enter description of the location.."
                  />
                </Box>
                <Button
                  isDisabled={!location.name}
                  onClick={handleAddLocation}
                  variant={"primary"}>
                  Add to list
                </Button>
              </VStack>
            </Box>
            <HStack gap={4}>
              {storedLocations &&
                isStoredValuesArray &&
                storedLocations.map((location) => {
                  return (
                    <Button
                      onClick={() => openModal(location.id)}
                      key={location.id}
                      bg={location.isTemplateFilled ? "green" : "transparent"}
                      color={
                        location.isTemplateFilled
                          ? "brand.main"
                          : "brand.secondary"
                      }
                      borderRadius={"10px"}
                      variant={location.isTemplateFilled ? "solid" : "outline"}>
                      {location.name}
                    </Button>
                  );
                })}
            </HStack>
          </VStack>
        </Fade>
      </Box>
    </>
  );
};

export default Locations;
