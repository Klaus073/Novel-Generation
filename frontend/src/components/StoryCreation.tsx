import {
  Box,
  Button,
  HStack,
  Icon,
  Image,
  Text,
  Tooltip,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Layout from "./Layout";
import genre from "../assets/genre.svg";
import storyDetails from "../assets/story_details.svg";
import synopsis from "../assets/synopsis.svg";
import characterDetails from "../assets/character_details.svg";
import worldDetails from "../assets/world_details.svg";
import outlines from "../assets/outlines.svg";
import locations from "../assets/locations.svg";
import { useEffect, useState } from "react";
import Genre from "./story-requirements/Genre";
import StoryDetails from "./story-requirements/StoryDetails";
import Synopsis from "./story-requirements/Synopsis";
import CharacterDetails from "./story-requirements/CharacterDetails";
import WorldDetails from "./story-requirements/WorldDetails";
import { RootState } from "../app/store";
import { useDispatch, useSelector } from "react-redux";
import Settings from "./story-requirements/Settings";
import { setIsSettingsActive, setRequirementIndex } from "../app/controlSlice";
import { HamburgerIcon } from "@chakra-ui/icons";
import Outlines from "./story-requirements/Outlines";
import Locations from "./story-requirements/Locations";

const StoryCreation = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isSettingsActive = useSelector(
    (state: RootState) => state.control.isSettingsActive
  );
  const requirementIndex = useSelector(
    (state: RootState) => state.control.requirementIndex
  );
  const requirementsDetails = [
    {
      id: "genre",
      icon: genre,
      title: "Genre",
    },
    {
      id: "story",
      icon: storyDetails,
      title: "Story Details",
    },
    {
      id: "outlines",
      icon: outlines,
      title: "Outlines",
    },
    {
      id: "synopsis",
      icon: synopsis,
      title: "Synopsis",
    },

    {
      id: "character",
      icon: characterDetails,
      title: "Character Details",
    },
    {
      id: "world",
      icon: worldDetails,
      title: "World Details",
    },
    {
      id: "locations",
      icon: locations,
      title: "Locations",
    },
  ];
  const [selected, setSelected] = useState(
    isSettingsActive ? "settings" : "genre"
  );

  useEffect(() => {
    setSelected(isSettingsActive ? "settings" : selected);
  }, [isSettingsActive, selected]);

  useEffect(() => {
    setSelected(requirementsDetails[requirementIndex].id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requirementIndex]);

  return (
    <Layout>
      <HStack alignItems={"start"}>
        {isOpen && (
          <Box
            onClick={onClose}
            bg="black"
            opacity={0.8}
            zIndex={1}
            position="fixed"
            top={0}
            width="full"
            height="full"></Box>
        )}

        <Icon
          display={{ base: "block", sm: "none" }}
          onClick={onOpen}
          position={"absolute"}
          width={12}
          height={12}
          top={"70px"}
          color={"gray"}
          as={HamburgerIcon}
        />

        <Box
          display={{ base: isOpen ? "block" : "none", sm: "block" }}
          zIndex={{ base: 2, sm: 0 }}
          top={{ base: 0 }}
          position={{ base: "fixed", sm: "relative" }}
          ml={-2}
          width={"max-content"}
          height={{ base: "100vh", sm: "70vh" }}
          bg="#191919">
          <VStack
            borderLeft={"1px solid"}
            borderColor={"brand.darkGray"}
            justifyContent={"center"}
            height={{ base: "90vh", sm: "60vh" }}>
            {requirementsDetails.map((item, index) => {
              return (
                <Tooltip
                  key={item.title}
                  hasArrow
                  placement="auto"
                  label={item.title}>
                  <HStack
                    as={Button}
                    onClick={() => {
                      dispatch(setIsSettingsActive(false));
                      setSelected(item.id);
                      dispatch(setRequirementIndex(index));
                      onClose();
                    }}
                    width={"full"}
                    height={"full"}
                    borderBottom={"1px solid"}
                    borderColor={"brand.darkGray"}
                    justifyContent={"start"}
                    borderRadius={0}
                    _hover={{ bg: "black" }}
                    bg={selected === item.id ? "black" : "transparent"}>
                    <Image
                      justifySelf={"flex-start"}
                      alt={item.title}
                      src={item.icon}
                      width={8}
                      height={8}
                    />

                    <Text
                      display={{
                        base: "block",
                        sm: "none",
                      }}
                      ml={6}
                      color={"brand.secondary"}>
                      {item.title}
                    </Text>
                  </HStack>
                </Tooltip>
              );
            })}
          </VStack>
        </Box>

        <VStack
          px={{ base: 0, sm: 2, md: 6 }}
          alignItems={"flex-end"}
          width={"full"}>
          {selected === "genre" ? (
            <Genre animation={"genre"} />
          ) : selected === "story" ? (
            <StoryDetails animation="story" />
          ) : selected === "synopsis" ? (
            <Synopsis animation="synopsis" />
          ) : selected === "character" ? (
            <CharacterDetails animation="character" />
          ) : selected === "world" ? (
            <WorldDetails animation="world" />
          ) : selected === "settings" ? (
            <Settings animation="settings" />
          ) : selected === "outlines" ? (
            <Outlines animation="outlines" />
          ) : selected === "locations" ? (
            <Locations animation="locations" />
          ) : (
            ""
          )}
        </VStack>
      </HStack>
    </Layout>
  );
};

export default StoryCreation;
