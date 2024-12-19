import { Button, Input, Text } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { Field } from "../../components/ui/field";
import { useState } from "react";
import { PasswordInput } from "../../components/ui/password-input";
import "./createAccount.css";
import axios from "axios";
import { BASE_URL } from "../../constant";
import { useNavigate } from "react-router";

interface FormValues {
  lastName: string;
  firstName: string;
  username: string;
  password: string;
  confirmPassword: string;
}
// interface User {
//   id: number;
//   lastName: string;
//   firstName: string;
//   username: string;
//   password: string;
// }

const CreateAccount = () => {

  let navigate = useNavigate();
  const [newUser, setNewUser] = useState({
    lastName: "",
    firstName: "",
    username: "",
    password: "",
  });
  const [passwordValidation, setPasswordValidation] = useState("");
  const [confirmPasswordValidation, setConfirmPasswordValidation] =
    useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = handleSubmit(() => addUser(newUser));

  const addUser = (addingUser:{}) => {
    console.log(addingUser)
    axios
    .post(BASE_URL + "User/AddUsers", addingUser)
    .then(res => res.data)
    .catch(error => error.message)
    navigate("/login")
  }

  return (
    <>
      <Text>Add User</Text>

      <form onSubmit={onSubmit} className="formBox">
        {/* first section */}
        <div className="container">
          <div className="row">
            <div className="col-6">
              <div className="row">
                
              </div>
              {/* Last Name Input Field */}
              <Field
                label="Last Name"
                invalid={!!errors.lastName}
                errorText={errors.lastName?.message}
              >
                <Input
                  {...register("lastName", {
                    required: "Last Name is required",
                  })}
                  onChange={(e) =>
                    setNewUser({ ...newUser, lastName: e.target.value })
                  }
                ></Input>
              </Field>

              {/* Username Input Field */}
              <Field
                label="Username"
                invalid={!!errors.username}
                errorText={errors.username?.message}
              >
                <Input
                  {...register("username", {
                    required: "Username is required",
                  })}
                  onChange={(e) =>
                    setNewUser({ ...newUser, username: e.target.value })
                  }
                ></Input>
              </Field>
            </div>

            <div className="col-6">
              {/* First Name Input Field */}
              <Field
                label="First Name"
                invalid={!!errors.firstName}
                errorText={errors.firstName?.message}
              >
                <Input
                  {...register("firstName", {
                    required: "First Name is required",
                  })}
                  onChange={(e) =>
                    setNewUser({ ...newUser, firstName: e.target.value })
                  }
                ></Input>
              </Field>
            </div>
          </div>
        </div>

        {/* Password Section */}

        <div className="passwordBox">
          <div className="container">
            <div className="row">
              <div className="col-6">
                {/* Password Input Field */}
                <Field
                  label="Password"
                  invalid={!!errors.password}
                  errorText={errors.password?.message}
                >
                  <PasswordInput
                    {...register("password", {
                      required: "Password is required",
                    })}
                    onChange={(e) => (
                      setNewUser({ ...newUser, password: e.target.value }),
                      setPasswordValidation(e.target.value)
                    )}
                  ></PasswordInput>
                </Field>
              </div>
              <div className="col-6">
                {/* Confirm Password Input Field */}
                <Field
                  label="Confirm Password"
                  invalid={!!errors.confirmPassword}
                  errorText={errors.confirmPassword?.message}
                >
                  <PasswordInput
                    //  {...register("confirmPassword", { required: passwordValidation != confirmPasswordValidation ? "Passwords must match" : ""})}
                    onChange={(e) => (
                      setConfirmPasswordValidation(e.target.value)
                    )}
                  ></PasswordInput>
                  {passwordValidation != confirmPasswordValidation ? (
                    <Text color={"red"}>Passwords must match!</Text>
                  ) : null}
                </Field>
              </div>
            </div>
          </div>

          <div className="container passwordRequirement">
            <div className="row">
              <div className="col-8">
                <Text>
                  Password must be at least 8 characters in length and contain
                  at least 1 of each of the following character types{" "}
                </Text>
              </div>
              <div className="col-4">
                <Button type="submit" colorPalette={"blue"}>
                  Create User
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateAccount;
