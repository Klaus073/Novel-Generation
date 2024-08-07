import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setSession, setIsSessionLoading } from "../../app/controlSlice.ts";
import supabase from "../../services/supabase.ts";

function Auth() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setIsSessionLoading(true));
    const fetchSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error("Error fetching session:", error.message);
          return;
        }
        if (data && data.session) {
          dispatch(setSession(data.session));
        }
      } catch (error) {
        console.error("Error fetching session:", error);
      }
    };
    fetchSession();
    const authListener = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === "SIGNED_IN") {
          dispatch(setSession(session));
        } else if (event === "SIGNED_OUT") {
          dispatch(setSession(null));
        } else if (event === "USER_UPDATED") {
          dispatch(setSession(session));
        }
      }
    );

    dispatch(setIsSessionLoading(false));
    return () => {
      authListener.data.subscription.unsubscribe();
    };
  }, [dispatch]);
  return null;
}
export default Auth;
