import { Box } from "@chakra-ui/react";
import Landing from "./components/Landing";
import { Routes, Route } from "react-router-dom";
import StoryCreation from "./components/StoryCreation";
import AccountsPanel from "./components/auth/AccountsPanel";
import Auth from "./components/auth/Auth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

const App = () => {
  useEffect(() => {
    let sessionId = sessionStorage.getItem("session_id");
    if (!sessionId) {
      sessionId = uuidv4();
      sessionStorage.setItem("session_id", sessionId as string);
    }
    console.log("Session ID:", sessionId);
  }, []);

  return (
    <Box>
      <Auth />
      <Routes>
        <Route
          path="/"
          element={<Landing />}
        />
        <Route
          path="/create"
          element={<StoryCreation />}
        />
        <Route
          path="/auth"
          element={<AccountsPanel />}
        />
      </Routes>
      <ToastContainer
        autoClose={2000}
        position="top-center"
      />
    </Box>
  );
};

export default App;
