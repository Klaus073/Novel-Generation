import { useState } from "react";
import {
  Box,
  Button,
  Fade,
  Flex,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { settingsDetails } from "../../data/data";
import { useDispatch, useSelector } from "react-redux";
import { updateStoryField } from "../../app/storySlice";
import { RootState } from "../../app/store";
import { ChatIcon } from "@chakra-ui/icons";

const Settings = ({ animation }: { animation: string }) => {
  const itemsPerPage = 3;
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(settingsDetails.length / itemsPerPage);
  const storedValues = useSelector((state: RootState) => state.story.settings);
  const [editedFields, setEditedFields] = useState(
    typeof storedValues === "object" && !Array.isArray(storedValues)
      ? { ...storedValues }
      : {}
  );

  const dispatch = useDispatch();

  const handleNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      saveDetails();
    }
  };

  const saveDetails = () => {
    const updatedValues = { ...editedFields };
    dispatch(
      updateStoryField({
        field: "settings",
        values: updatedValues,
      })
    );
    console.log("Settings:", updatedValues);
  };

  const handleFieldChange = (id: string, value: string) => {
    setEditedFields((prevFields) => ({
      ...prevFields,
      [id]: value.trim(),
    }));
  };

  return (
    <>
      <Box width={"full"}>
        <Fade
          in={animation === "settings"}
          transition={{ enter: { duration: 1.3 } }}>
          <VStack
            justifyContent={"space-between"}
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
                Settings
              </Text>
              <HStack
                width={{ base: "full", md: "auto" }}
                justifyContent={{ base: "space-between", md: "flex-end" }}>
                <Button
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
            {settingsDetails
              .slice(
                currentPage * itemsPerPage,
                (currentPage + 1) * itemsPerPage
              )
              .map((story, index) => {
                return (
                  <Box
                    key={index}
                    mt={4}
                    width={"full"}>
                    <Text fontSize={"xl"}>{story.label}</Text>
                    {story.type === "textarea" ? (
                      <Textarea
                        my={4}
                        variant={"primary"}
                        placeholder={story.placeholder}
                        value={editedFields[story.id] || ""}
                        onChange={(e) =>
                          handleFieldChange(story.id, e.target.value)
                        }
                      />
                    ) : (
                      <Input
                        my={4}
                        variant={"primary"}
                        placeholder={story.placeholder}
                        value={editedFields[story.id] || ""}
                        onChange={(e) =>
                          handleFieldChange(story.id, e.target.value)
                        }
                      />
                    )}
                  </Box>
                );
              })}
          </VStack>
          <Box
            width={"full"}
            textAlign={"end"}>
            <Button
              onClick={handleNextPage}
              variant={"primary"}
              mt={4}>
              {currentPage < totalPages - 1 ? "Next" : "Save"}
            </Button>
          </Box>
        </Fade>
      </Box>
    </>
  );
};

export default Settings;
