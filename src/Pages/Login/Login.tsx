import { Button, Container, Input, Text } from "@chakra-ui/react";
import { useState } from "react";
import { Field } from "../../components/ui/field";
import { useForm } from "react-hook-form";
import { PasswordInput } from "../../components/ui/password-input";
import "./login.css"
import axios from "axios";
import { BASE_URL } from "../../constant";
import { useNavigate } from "react-router-dom";


interface FormValues {
  username: string;
  password: string;

}

interface User{
  id: number,
  username: string;
  password: string;
}


const Login = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: "",
    password: ""
  })
  // const [passwordValidation, setPasswordValidation] = useState("");
  // const [confirmPasswordValidation, setConfirmPasswordValidation] =
  //   useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  let userData= {
    id:0,
    username: user.username,
    password: user.password
  }
 const login = async () => {
  let token = await axiosLogin(userData)
  if (token != null) {
    localStorage.setItem("Token", token);
    console.log(token);
    await GetLoggedInUser(user.username);
    
  }
  navigate('/Dashboard')
 }

 const axiosLogin = async (loginUser:User) => {
  let outsideData = "";
    try{
        const res = await axios.post(BASE_URL + "User/Login", loginUser);
        let data = res.data
        outsideData = data.token
        localStorage.setItem("Token", data.token)
        console.log(res);
    } catch(error) {
        console.log(error)
    }
    return outsideData
    
    
 }

 const GetLoggedInUser = async (username:string) => {
  let res = await axios 
  .get(BASE_URL + "User/GetUserByUsername/" + username)
  let userData = res.data;
      console.log(userData)
      localStorage.setItem("UserData", JSON.stringify(userData) )
}



  const onSubmit = handleSubmit(() => login());
  return (
    <>
      {/* <div className="container loginBox d-flex-justify-content-center"> */}
      <Container>
      <Text>Login</Text>

     
        <div className="row">
          <div className="col">
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
                    setUser({ ...user, username: e.target.value })
                  }
                ></Input>
              </Field>
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
                      setUser({ ...user, password: e.target.value })
                      // setPasswordValidation(e.target.value)
                    )}
                  ></PasswordInput>
                </Field>
                <Button type="submit" colorPalette={"blue"} onClick={onSubmit}>
                  Login
                </Button>
              
          </div>
        </div>
        <Text> Due to the confidentiality of student data, do not save your password to your internet browser.</Text>
      </Container>
    </>
  )
}

export default Login