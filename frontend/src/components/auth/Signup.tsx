import { FC, useState } from "react";
import {
  Box,
  Heading,
  Input,
  InputGroup,
  Button,
  InputRightElement,
  Center,
  FormLabel,
  Spinner,
  Icon,
} from "@chakra-ui/react";
import { EmailIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { FaUser } from "react-icons/fa";
import {
  Formik,
  Field,
  Form,
  ErrorMessage,
  FieldProps,
  FormikHelpers,
} from "formik";
import * as Yup from "yup";
import { handleSignUp } from "../../api/supabaseCalls";
import { useLocation } from "react-router-dom";

export interface SignupInputState {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ShowPasswordState {
  password: boolean;
  confirmPassword: boolean;
}

const Signup: FC = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const to = searchParams.get("to");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .min(8, "Password must be at least 8 characters"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const initialValues = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const [showPassword, setShowPassword] = useState<ShowPasswordState>({
    password: false,
    confirmPassword: false,
  });

  const handleToggle = (inputName: keyof ShowPasswordState) => {
    setShowPassword((prevShowPassword) => ({
      ...prevShowPassword,
      [inputName]: !prevShowPassword[inputName],
    }));
  };

  const handleSubmit = async (
    values: SignupInputState,
    { resetForm }: FormikHelpers<SignupInputState>
  ) => {
    setIsLoading(true);
    const isProcessSuccess = await handleSignUp(to as string, values);
    if (isProcessSuccess) {
      resetForm();
    }
    setIsLoading(false);
  };

  return (
    <Box
      maxW="450px"
      mx="auto"
      px={4}
      py={6}>
      <Heading
        color={"brand.main"}
        textAlign={{ base: "center", md: "left" }}
        fontWeight={{ base: "bold", sm: "semibold" }}
        fontSize={{ base: "lg", sm: "3xl" }}
        mb={"3vh"}>
        Create Your Account
      </Heading>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        <Form>
          <FormLabel
            color={"brand.main"}
            m="0">
            Name
          </FormLabel>
          <Field name="username">
            {({ field }: FieldProps<string>) => (
              <InputGroup
                color="brand.secondary"
                size="md">
                <InputRightElement>
                  <Icon
                    as={FaUser}
                    color="brand.main"
                  />
                </InputRightElement>
                <Input
                  type="text"
                  variant="flushed"
                  {...field}
                />
              </InputGroup>
            )}
          </Field>
          <Box color="red">
            <ErrorMessage
              name="username"
              component="div"
            />
          </Box>

          <FormLabel
            color={"brand.main"}
            m="0">
            Email
          </FormLabel>
          <Field name="email">
            {({ field }: FieldProps<string>) => (
              <InputGroup
                color="brand.secondary"
                size="md">
                <InputRightElement>
                  <EmailIcon color={"brand.main"} />
                </InputRightElement>
                <Input
                  type="email"
                  variant="flushed"
                  {...field}
                />
              </InputGroup>
            )}
          </Field>
          <Box color="red">
            <ErrorMessage
              name="email"
              component="div"
            />
          </Box>

          <FormLabel
            color={"brand.main"}
            m="0">
            Password
          </FormLabel>
          <Field name="password">
            {({ field }: FieldProps<string>) => (
              <InputGroup
                color="brand.secondary"
                size="md">
                <Input
                  pr="4.5rem"
                  variant="flushed"
                  type={showPassword.password ? "text" : "password"}
                  {...field}
                />
                <InputRightElement>
                  {showPassword.password ? (
                    <ViewOffIcon
                      color="brand.main"
                      onClick={() => handleToggle("password")}
                    />
                  ) : (
                    <ViewIcon
                      color="brand.main"
                      onClick={() => handleToggle("password")}
                    />
                  )}
                </InputRightElement>
              </InputGroup>
            )}
          </Field>
          <Box color="red">
            <ErrorMessage
              name="password"
              component="div"
            />
          </Box>

          <FormLabel
            color={"brand.main"}
            m="0">
            Confirm Password
          </FormLabel>
          <Field name="confirmPassword">
            {({ field }: FieldProps<string>) => (
              <InputGroup
                color="brand.secondary"
                size="md">
                <Input
                  pr="4.5rem"
                  variant="flushed"
                  type={showPassword.confirmPassword ? "text" : "password"}
                  {...field}
                />
                <InputRightElement>
                  {showPassword.confirmPassword ? (
                    <ViewOffIcon
                      color="brand.main"
                      onClick={() => handleToggle("confirmPassword")}
                    />
                  ) : (
                    <ViewIcon
                      color="brand.main"
                      onClick={() => handleToggle("confirmPassword")}
                    />
                  )}
                </InputRightElement>
              </InputGroup>
            )}
          </Field>
          <Box color="red">
            <ErrorMessage
              name="confirmPassword"
              component="div"
            />
          </Box>

          <Center mt={4}>
            <Button
              width="full"
              variant={"primary"}
              type="submit">
              {isLoading ? <Spinner /> : "Create Account"}
            </Button>
          </Center>
        </Form>
      </Formik>
    </Box>
  );
};

export default Signup;
