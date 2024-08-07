import { useState, useRef } from "react";
import {
  Box,
  Button,
  Flex,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { updateStoryField } from "../app/storySlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../app/store";

interface DetailsObject {
  id: string;
  label: string;
  placeholder: string;
}

const useDetailsModal = (
  details: DetailsObject[],
  fieldName: string,
  heading: string,
  fieldSaveAs: string,
  handleAIGenerate?: ({
    generateSingle,
  }: {
    generateSingle: boolean;
  }) => Promise<any>
) => {
  const storedValues = useSelector(
    (state: RootState) => state.story[fieldName]
  );
  console.log(fieldName);

  const isStoredValuesArray = Array.isArray(storedValues);
  console.log(isStoredValuesArray, "check array");
  const [isOpen, setIsOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const editedFieldsRef = useRef<{ [key: string]: string | number | boolean }>(
    {}
  );
  const [page, setPage] = useState(0);
  const dispatch = useDispatch();
  const openModal = (id?: number) => {
    if (id !== undefined) {
      const foundObject =
        isStoredValuesArray && storedValues?.find((obj) => obj.id === id);
      console.log(foundObject, "foundObject");
      if (foundObject) {
        editedFieldsRef.current = { ...foundObject };
      }
    } else {
      if (
        storedValues &&
        typeof storedValues === "object" &&
        !isStoredValuesArray
      ) {
        editedFieldsRef.current = { ...storedValues } as unknown as {
          [key: string]: string;
        };
      } else {
        editedFieldsRef.current = {};
      }
    }

    console.log(editedFieldsRef.current, "editedFieldsRef.current");
    setPage(0);
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSaveDetails = () => {
    const objectToSave = { ...editedFieldsRef.current };
    if (fieldSaveAs === "array") {
      dispatch(
        updateStoryField({
          field: fieldName,
          values: [
            {
              id:
                isStoredValuesArray && storedValues[storedValues.length - 1]?.id
                  ? storedValues[storedValues.length - 1]?.id + 1
                  : 1,
              ...objectToSave,
            },
          ],
        })
      );
    } else {
      dispatch(
        updateStoryField({
          field: fieldName,
          values: objectToSave as unknown as { [key: string]: string },
        })
      );
    }

    console.log("in use ");

    closeModal();
  };

  const handleFieldBlur = (id: string, value: string) => {
    console.log(id, value);
    if (value.trim() !== "") {
      editedFieldsRef.current = {
        ...editedFieldsRef.current,
        [id]: value.trim(),
      };
    }
  };
  const totalPages = Math.ceil(details.length / 8);

  const handleNextPage = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleGenerate = async () => {
    if (handleAIGenerate) {
      setIsGenerating(true);
      const response = await handleAIGenerate({ generateSingle: true });
      console.log(response, "single generate response ");
      if (response) {
        editedFieldsRef.current = { ...response[0] };
      }
      setIsGenerating(false);
    }
  };
  const ModalComponent = () => (
    <Modal
      isCentered
      size={"6xl"}
      isOpen={isOpen}
      onClose={closeModal}>
      <ModalOverlay />
      <ModalContent
        borderRadius={"26px"}
        bg="brand.darkGray"
        color={"brand.main"}
        minH="70vh">
        <ModalHeader
          fontSize={"xl"}
          textAlign={"center"}>
          {heading}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Flex
            direction={{ base: "column", md: "row" }}
            gap={"4vh"}
            justifyContent={"space-around"}
            wrap={"wrap"}>
            {details.slice(page * 8, page * 8 + 8).map((item, index) => (
              <Box
                key={index}
                width={{ base: "100%", md: "45%" }}>
                <Text>{item.label}</Text>
                <Tooltip
                  bg="brand.main"
                  color={"brand.darkGray"}
                  p={4}
                  borderRadius={"10px"}
                  hasArrow
                  label={editedFieldsRef.current[item.id]}>
                  <Input
                    isDisabled={isGenerating}
                    mt={2}
                    borderRadius={"12px"}
                    py={6}
                    size={{ base: "xs", sm: "sm", md: "md" }}
                    border={"2px solid"}
                    borderColor={"brand.secondary"}
                    variant={"primary"}
                    placeholder={
                      isGenerating ? "Generating..." : item.placeholder
                    }
                    ref={(inputRef) => {
                      if (inputRef) {
                        inputRef.value = isGenerating
                          ? ""
                          : (editedFieldsRef.current[item.id] as string) || "";
                      }
                    }}
                    onBlur={(e) => handleFieldBlur(item.id, e.target.value)}
                  />
                </Tooltip>
              </Box>
            ))}
          </Flex>
        </ModalBody>
        <ModalFooter mx="auto">
          {handleAIGenerate && (
            <Button
              isDisabled={isGenerating}
              onClick={handleGenerate}
              variant={"primary"}
              ml={6}>
              {isGenerating ? "Generating..." : "AI Generate"}
            </Button>
          )}

          {page > 0 && (
            <Button
              ml={6}
              variant={"primary"}
              onClick={handlePreviousPage}>
              Previous
            </Button>
          )}
          {page < totalPages - 1 ? (
            <Button
              ml={6}
              variant={"primary"}
              onClick={handleNextPage}>
              Next
            </Button>
          ) : (
            <Button
              isDisabled={isGenerating}
              variant={"primary"}
              ml={6}
              onClick={handleSaveDetails}>
              Save Details
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return { ModalComponent, openModal, closeModal };
};

export default useDetailsModal;
