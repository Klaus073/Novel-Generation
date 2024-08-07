import { useState, useRef } from "react";
import {
  Box,
  Button,
  Flex,
  HStack,
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
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

interface DetailsObject {
  categoryLabel: string;
  categoryId: string;
  fields: {
    name: string;
    label: string;
    placeholder: string;
  }[];
}

const useLocationsModal = (
  details: DetailsObject[],
  fieldName: string,
  heading: string
) => {
  const storedValues = useSelector(
    (state: RootState) => state.story[fieldName]
  );
  console.log(fieldName);
  interface EditedField {
    [key: string]:
      | string
      | number
      | boolean
      | {
          [key: string]: string | number | boolean;
        };
  }

  const isStoredValuesArray = Array.isArray(storedValues);
  console.log(isStoredValuesArray, "check array");
  const [isOpen, setIsOpen] = useState(false);
  const [openedId, setOpenedId] = useState<number | null>(null);
  const [activePage, setActivePage] = useState(0);
  const editedFieldsRef = useRef<EditedField>({});
  const dispatch = useDispatch();
  const openModal = (id?: number) => {
    console.log(id, "id");
    if (id !== undefined) {
      setOpenedId(id);
      const foundObject =
        isStoredValuesArray && storedValues?.find((obj) => obj.id === id);
      console.log(foundObject, "foundObject");
      if (foundObject) {
        console.log(foundObject, "foundObject");
        editedFieldsRef.current = { ...foundObject };
      }
    } else {
      editedFieldsRef.current = {};
    }

    console.log(editedFieldsRef.current, "editedFieldsRef.current");
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSaveDetails = () => {
    const objectToSave: EditedField = {
      name: editedFieldsRef.current.name,
      ...editedFieldsRef.current,
    };
    dispatch(
      updateStoryField({
        field: fieldName,
        values: [
          {
            id: openedId
              ? openedId
              : isStoredValuesArray && storedValues[storedValues.length - 1]?.id
              ? storedValues[storedValues.length - 1]?.id + 1
              : 1,
            ...objectToSave,
          },
        ],
      })
    );

    closeModal();
    setOpenedId(null);
  };
  const handleFieldBlur = (id: string, value: string) => {
    console.log(id, value);
    if (id === "name" && value.trim() !== "") {
      editedFieldsRef.current = {
        ...editedFieldsRef.current,
        [id]: value.trim(),
      };
    } else {
      const categoryIndex = details.findIndex((category) =>
        category.fields.some((field) => field.name === id)
      );
      if (categoryIndex !== -1) {
        const categoryName = details[categoryIndex].categoryId;
        console.log(categoryName, "Category name");
        editedFieldsRef.current[categoryName] = {
          ...(editedFieldsRef.current[categoryName] as unknown as {
            [key: string]: string;
          }),
          [id]: value.trim(),
        };
      }
    }
    console.log(editedFieldsRef.current, "editedFieldsRef.current");
  };

  const handlePagination = (option: string) => {
    if (option === "next" && activePage < details.length - 1) {
      setActivePage((prevPage) => prevPage + 1);
    } else if (option === "back" && activePage > 0) {
      setActivePage((prevPage) => prevPage - 1);
    } else {
      return;
    }
  };

  const LocationModal = () => (
    <Modal
      isCentered
      size={"6xl"}
      isOpen={isOpen}
      onClose={closeModal}>
      <ModalOverlay
        backdropFilter="auto"
        backdropBrightness={"45%"}
      />
      <ModalContent
        borderRadius={"26px"}
        border={"1px solid"}
        borderColor={"brand.darkGray"}
        bg="#1C1C1F"
        color={"brand.main"}
        minH="70vh">
        <ModalHeader
          borderBottom={"1px solid"}
          borderColor={"brand.darkGray"}
          fontSize={"xl"}
          textAlign={"center"}>
          {heading}
        </ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {activePage === 0 && (
            <Box width={{ base: "100%", md: "45%" }}>
              <Text
                fontWeight={"bold"}
                fontSize={"2xl"}
                my={8}>
                Location Name
              </Text>
              <Text>Enter the name</Text>
              <Input
                mt={2}
                borderRadius={"12px"}
                py={6}
                size={{ base: "xs", sm: "sm", md: "md" }}
                border={"1px solid"}
                borderColor={"brand.darkGray"}
                variant={"primary"}
                placeholder={"Enter name"}
                ref={(inputRef) => {
                  if (inputRef && editedFieldsRef.current["name"]) {
                    inputRef.value = editedFieldsRef.current["name"] as string;
                  }
                }}
                onBlur={(e) => handleFieldBlur("name", e.target.value)}
              />
            </Box>
          )}
          <Text
            fontWeight={"bold"}
            fontSize={"2xl"}
            my={8}>
            {details[activePage]?.categoryLabel}
          </Text>
          <Flex
            direction={{ base: "column", md: "row" }}
            gap={"4vh"}
            justifyContent={"space-between"}
            wrap={"wrap"}>
            {details[activePage]?.fields.map((field, index) => (
              <Box
                key={index}
                width={{ base: "100%", md: "45%" }}>
                <Text>{field.label}</Text>
                <Tooltip
                  bg="brand.main"
                  color={"brand.darkGray"}
                  p={4}
                  borderRadius={"10px"}
                  hasArrow
                  label={
                    editedFieldsRef.current[details[activePage]?.categoryId]
                      ? (
                          editedFieldsRef.current[
                            details[activePage]?.categoryId
                          ] as { [key: string]: string }
                        )[field.name]
                      : ""
                  }>
                  <Input
                    mt={2}
                    borderRadius={"12px"}
                    py={6}
                    size={{ base: "xs", sm: "sm", md: "md" }}
                    border={"1px solid"}
                    borderColor={"brand.darkGray"}
                    variant={"primary"}
                    placeholder={field.placeholder}
                    ref={(inputRef) => {
                      if (inputRef) {
                        inputRef.value =
                          (editedFieldsRef.current[
                            details[activePage]?.categoryId
                          ] &&
                            (
                              editedFieldsRef.current[
                                details[activePage]?.categoryId
                              ] as { [key: string]: string }
                            )[field.name]) ||
                          "";
                      }
                    }}
                    onBlur={(e) => handleFieldBlur(field.name, e.target.value)}
                  />
                </Tooltip>
              </Box>
            ))}
          </Flex>
        </ModalBody>
        <ModalFooter
          position={"relative"}
          alignItems={"center"}
          as={HStack}
          width={"full"}
          mx="auto">
          <HStack
            // mt={12}
            mx="auto"
            width={"300px"}
            justifyContent={"center"}>
            {/* <Text>Page {currentPage} of {totalPages}</Text> */}

            <HStack
              gap={12}
              alignItems="center">
              <Button
                bg=" #151313"
                p={0}
                width={12}
                height={12}
                cursor="pointer"
                borderRadius="full"
                border="1px solid"
                borderColor={"brand.darkGray"}
                color="brand.secondary"
                onClick={() => {
                  handlePagination("back");
                }}
                fontSize="4xl">
                <ChevronLeftIcon
                  width={12}
                  height={12}
                />
              </Button>

              <Text fontSize={"xl"}>
                {activePage + 1}/ {details.length}
              </Text>
              <Button
                bg=" #151313"
                p={0}
                width={12}
                height={12}
                border="1px solid"
                borderColor={"brand.darkGray"}
                color="brand.secondary"
                cursor="pointer"
                borderRadius="full"
                onClick={() => {
                  handlePagination("next");
                }}
                fontSize="4xl">
                <ChevronRightIcon
                  width={12}
                  height={12}
                />
              </Button>
            </HStack>
          </HStack>
          <Button
            position={"absolute"}
            variant={"primary"}
            ml={6}
            onClick={handleSaveDetails}>
            Save Details
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );

  return { LocationModal, openModal, closeModal };
};

export default useLocationsModal;
