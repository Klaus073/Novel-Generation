import { FC, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  Button,
  InputRightElement,
  Checkbox,
  Center,
  Text,
  FormLabel,
  Spinner,
  Image,
  Divider,
  AbsoluteCenter,
} from "@chakra-ui/react";
import { EmailIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { Formik, Field, Form, ErrorMessage, FieldProps } from "formik";
import { useNavigate } from "react-router-dom";
import { handleSignin } from "../../api/supabaseCalls.ts";
import google_logo from "../../assets/google_logo.png";
import apple_logo from "../../assets/apple_logo.png";
import * as Yup from "yup";

interface InstantLogin {
  provider: "google" | "apple";
  logo: string;
  desc: string;
}

const instantLogins = [
  {
    provider: "google",
    logo: google_logo,
    desc: "Continue with Google",
  },
  {
    provider: "apple",
    logo: apple_logo,
    desc: "Continue with Apple",
  },
];
const initialState = {
  email: "",
  password: "",
};

const Signin: FC = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = async (values: { email: string; password: string }) => {
    setIsLoading(true);
    const isSignSuccessful = await handleSignin(values);
    if (isSignSuccessful) {
      navigate("/", { replace: true });
    }
    setIsLoading(false);
  };

  const handleForgotPassword = () => {
    navigate("/reset-password");
  };

  return (
    <Box
      maxW="450px"
      mx={"auto"}
      px={4}
      pt={6}>
      <Heading
        color={"brand.main"}
        textAlign={{ base: "center", md: "left" }}
        fontWeight={{ base: "bold", sm: "semibold" }}
        fontSize={{ base: "lg", sm: "3xl" }}
        mb={"3vh"}>
        Log In to your account
      </Heading>
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
        <Form>
          <FormLabel
            // fontWeight="bold"
            color="brand.main">
            Email
          </FormLabel>
          <Field name="email">
            {({ field }: FieldProps) => (
              <InputGroup
                color={"brand.main"}
                width={{ base: "full", sm: "420px" }}
                size="md">
                <InputRightElement>
                  <EmailIcon color="brand.main" />
                </InputRightElement>
                <Input
                  type="text"
                  placeholder="Enter your email"
                  variant="flushed"
                  {...field}
                  _focus={{}}
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
            my={2}
            // fontWeight="bold"
            color="brand.main">
            Password
          </FormLabel>
          <Field name="password">
            {({ field }: FieldProps) => (
              <InputGroup
                color={"brand.main"}
                width={{ base: "full", sm: "420px" }}
                size="md">
                <Input
                  pr="4.5rem"
                  variant="flushed"
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
                  {...field}
                  _focus={{}}
                />
                <InputRightElement>
                  {show ? (
                    <ViewOffIcon
                      color="brand.main"
                      onClick={handleClick}
                    />
                  ) : (
                    <ViewIcon
                      color="brand.main"
                      onClick={handleClick}
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

          <Flex
            width="full"
            justify="space-between"
            align="center"
            my={4}>
            <Checkbox colorScheme="blue">
              <Text color="brand.main">Remember me</Text>
            </Checkbox>

            <Text
              cursor={"pointer"}
              onClick={handleForgotPassword}
              color="brand.main">
              Forgot password?
            </Text>
          </Flex>

          <Center mt={4}>
            <Button
              isDisabled={isLoading}
              width="full"
              variant={"primary"}
              type="submit">
              {isLoading ? <Spinner /> : "Sign In"}
            </Button>
          </Center>
        </Form>
      </Formik>
      <Box
        position="relative"
        padding={6}>
        <Divider />
        <AbsoluteCenter
          bg="brand.darkGray"
          px={4}
          color="brand.main">
          Instant Logins
        </AbsoluteCenter>
      </Box>
      {(instantLogins as InstantLogin[])?.map((company, i) => {
        return (
          <Button
            key={i}
            my={2}
            variant="outline"
            borderRadius="md"
            border="1px"
            borderColor="brand.main"
            // onClick={async () => {
            //   await loginWithThirdParty(to as string, company.provider);
            // }}
            width="full">
            <Flex align="center">
              <Image
                src={company.logo}
                alt="Company Logo"
              />
              <Text
                ml={2}
                color={"brand.main"}>
                {company.desc}
              </Text>
            </Flex>
          </Button>
        );
      })}
    </Box>
  );
};

export default Signin;
