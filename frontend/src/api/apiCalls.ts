import { Session } from "@supabase/supabase-js";
import axios from "axios";
import { StoryState } from "../app/storySlice";

const VITE_SITE_URL = import.meta.env.VITE_SITE_URL;

export const generateNovel = async (
  session: Session | null,
  payload: StoryState
) => {
  console.log("finalOutput", payload, session);
  const session_id = sessionStorage.getItem("session_id") || "123456";
  try {
    const response = await axios.post(
      `${VITE_SITE_URL}/api/generateNovel`,
      { payload, session_id },
      {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const generateStoryIdea = async (
  session: Session | null,
  genreValues: { [key: string]: string }
) => {
  const session_id = sessionStorage.getItem("session_id") || "123456";
  try {
    const response = await axios.post(
      `${VITE_SITE_URL}/api/generateStory`,
      { payload: { genre: genreValues }, session_id },
      {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const generateSynopsis = async (
  session: Session | null,
  story: StoryState
) => {
  const session_id = sessionStorage.getItem("session_id") || "123456";
  try {
    const response = await axios.post(
      `${VITE_SITE_URL}/api/generateSynopsis`,
      {
        payload: { genre: story?.genre, story_details: story?.story_details },
        session_id,
      },
      {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const generateCharacters = async (
  session: Session | null,
  synopsis: any,
  generateSingle = false,
  storedCharacters: { [key: string]: string | number }[] = []
) => {
  const session_id = sessionStorage.getItem("session_id") || "123456";
  console.log("synopsis", synopsis);
  try {
    const response = await axios.post(
      `${VITE_SITE_URL}/api/generateCharacterList`,
      {
        payload: {
          synopsis: synopsis,
          generate_single: generateSingle,
          character_details: storedCharacters,
        },
        session_id,
      },
      {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const generateOutlines = async (session: Session | null, story: any) => {
  const session_id = sessionStorage.getItem("session_id") || "123456";
  try {
    const response = await axios.post(
      `${VITE_SITE_URL}/api/generateOutline`,
      {
        payload: {
          genre: story?.genre,
          story_details: story?.story_details,
          story_structure: story?.story_structure,
          character_details: story?.character_details,
          synopsis: story?.synopsis,
        },
        session_id,
      },
      {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const generateWorld = async (
  session: Session | null,
  story: any,
  refineValue?: string | undefined
) => {
  const session_id = sessionStorage.getItem("session_id") || "123456";
  try {
    const response = await axios.post(
      `${VITE_SITE_URL}/api/generateWorld`,
      {
        payload: {
          ...story,
          refine: refineValue ? refineValue : "",
        },
        session_id,
      },
      {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const generateLocation = async (session: Session | null, story: any) => {
  const session_id = sessionStorage.getItem("session_id") || "123456";
  try {
    const response = await axios.post(
      `${VITE_SITE_URL}/api/generateLocation`,
      {
        payload: story,
        session_id,
      },
      {
        headers: {
          Authorization: `Bearer ${session?.access_token}`,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
