import { toast } from "react-toastify";
import supabase from "../services/supabase";
import { SignupInputState } from "../components/auth/Signup";
import { NavigateFunction } from "react-router-dom";

export const handleSignin = async (values: {
  email: string;
  password: string;
}) => {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (error instanceof Error) {
      console.error("Login error:", error.message || "Unknown error");
      toast.error(`Login error: ${error.message || "Unknown error"}`);
      return false;
    } else {
      toast.success("Successful login");
      return true;
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error during login:", error.message);
      toast.error(`Signin error: ${error.message}`);
    } else {
      console.error("Unknown error during login:", error);
      toast.error("Signin error");
    }
  }
};

export const handleSignUp = async (
  redirectPath: string,
  values: SignupInputState
) => {
  try {
    const { error } = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          full_name: values.username,
        },
        emailRedirectTo: window.location.origin + redirectPath,
      },
    });

    if (error instanceof Error) {
      toast.error(`Signup error: ${error.message}`);
      return false;
    } else {
      toast.info("Please check your email to complete the signup process.");
      return true;
    }
  } catch (error) {
    toast.error("Signup error");
  }
};

export const handleSignout = async (navigate: NavigateFunction) => {
  try {
    await supabase.auth.signOut();
    toast.info("You have signed out successfully.");
    navigate("/");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error signing out:", error.message);
    }
  }
};
