import {
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Modal,
  ModalContent,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Box,
} from "@chakra-ui/react";
import Signin from "./Signin.tsx";
import Signup from "./Signup.tsx";
import landingBg from "../../assets/landing_bg.png";
import { useNavigate } from "react-router-dom";

function AccountsPanel() {
  const { onClose } = useDisclosure();
  const navigate = useNavigate();
  const handleModalClose = () => {
    onClose();
    navigate("/");
  };
  return (
    <Box
      bgImage={`url(${landingBg})`}
      bgSize={"100% 100%"}
      bgPosition={"center"}
      bgRepeat={"no-repeat"}
      minH={"100vh"}
      color={"brand.main"}
      width={"100%"}>
      <Modal
        isCentered
        size={"xl"}
        isOpen={true}
        onClose={handleModalClose}>
        <ModalContent
          bg="brand.darkGray"
          width={{ base: "full", md: "700px" }}
          minH={"580px"}
          borderRadius="28px">
          <ModalCloseButton />
          <ModalBody mx="auto">
            <Tabs
              width={{ base: "full", sm: "450px" }}
              padding={2}>
              <TabList>
                <Tab
                  color={"brand.secondary"}
                  _selected={{ color: "brand.main" }}
                  fontWeight="bold"
                  fontSize={{ base: "sm", sm: "md" }}
                  width="50%">
                  Sign In
                </Tab>
                <Tab
                  color={"brand.secondary"}
                  _selected={{ color: "brand.main" }}
                  fontWeight="bold"
                  fontSize={{ base: "sm", sm: "md" }}
                  width="50%">
                  Create Account
                </Tab>
              </TabList>
              <TabIndicator
                mt="-3.5px"
                height="3px"
                bg="brand.main"
                borderRadius="1px"
              />

              <TabPanels>
                <TabPanel padding={0}>
                  <Signin />
                </TabPanel>
                <TabPanel padding={0}>
                  <Signup />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default AccountsPanel;
