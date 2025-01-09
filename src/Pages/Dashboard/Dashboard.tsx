import { Button, HStack, Icon, IconButton, Input, Table } from "@chakra-ui/react";
import "./dashboard.css";
import { Form, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Field } from "../../components/ui/field";
import { useForm } from "react-hook-form";
import { Radio, RadioGroup } from "../../components/ui/radio";
import { useNavigate } from "react-router";
import { BASE_URL } from "../../constant";
import axios from "axios";
import { Image } from "@chakra-ui/react"
import { RxAvatar } from "react-icons/rx";
import { FaRegTrashAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

interface FormValues {
  firstName: string;
  lastName: string;
  SSID: number;
  DOB: number;
  gender: string;
  primaryDisability: string;
  primaryPhone: string;
  secondaryPhone: string;
  address: string;
}
interface Student {
  id: number,
  userId: number,
  firstName: string,
  lastName: string,
  SSId: number,
  DOB: number,
  gender: string,
  primaryDisability: string,
  primaryContact: string,
  secondaryContact: string,
  homeAddress: string,
  profilePicture: string
  isEnrolled: boolean
  isDeleted: boolean
}


const Dashboard = () => {
  const navigate = useNavigate();
  const [newStudent, setNewStudent] = useState<Student>({
    id: 0,
    userId: 0,
    firstName: "",
    lastName: "",
    SSId: 0,
    DOB: 0,
    gender: "",
    primaryDisability: "",
    primaryContact: "",
    secondaryContact: "",
    homeAddress: "",
    profilePicture: "",
    isEnrolled: true,
    isDeleted: false,
  })
  const [data, setData] = useState<Student[]>([]);

  const [localS, setLocalS] = useState(() => {
    return localStorage.getItem("UserData") ? JSON.parse(localStorage.getItem("UserData")!) : { userId: 0, publisherName: "" }
  })
  // validate if logged in
  useEffect(() => {
    if (!checkToken()) {
      navigate('/login')
    }
    else {
      setLocalS(() => {
        return localStorage.getItem("UserData") ? JSON.parse(localStorage.getItem("UserData")!) : { userId: 0, publisherName: "" }
      })


      fetchData();
    }
  }, [])

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("UserData")!);
    setNewStudent({ ...newStudent, userId: userData.userId! })
  }, [])


  const [show, setShow] = useState(false);
  const [totalStudents, setTotalStudents] = useState(0)

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const fetchData = () => {
    console.log(localS + "local")
    axios
      .get(BASE_URL + "Student/GetStudentByUserId/" + localS.userId)
      .then((response) => {
        setData(response.data);

      })
      .catch((error) => {
        console.log(error);
      });
    console.log(data);
  };

  const checkToken = () => {
    let result = false;
    let lsData = localStorage.getItem("Token");
    if (lsData && lsData != null) {
      result = true;
    }
    return result;
  };

  const handleImage = async (e: any) => {
    let file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      console.log(reader.result);
      setNewStudent({ ...newStudent, profilePicture: String(reader.result) })
    };
    reader.readAsDataURL(file);
  };

  const addStudent = () => {
    console.log(newStudent)
    axios.post(BASE_URL + "Student/AddStudent", newStudent)
      .then(res => res.data)
      .catch(error => error.message)
    handleClose()
  }

  const removeStudent = (removeId: number) => {
    console.log("remove student")
    setData((oldData) => oldData.map(studentToRemove => studentToRemove.id === removeId ? { ...studentToRemove, isDeleted: true } : studentToRemove))
    console.log(data)
  }
  useEffect(() => {
    setTotalStudents(data.length)
  }, [data])


  const onSubmit = handleSubmit(addStudent);

  return (
    <>
      <h1 className="text-center">Student Caseload</h1>

      <div className="container">
        <div className="row">
          <div className="col">
            <div className="caseloadNumber text-center">
              <h4 className="text-center">Students Add/Removed</h4>
              <div className="row">
                <div className="col ">
                  <h2>{totalStudents}</h2>
                  <p>Added Students</p>
                </div>
                <div className="col">
                  <h2>5</h2>
                  <p>Removed Students</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col d-flex justify-content-center align-items-center">
            <Button size="xl" colorPalette={"blue"} className="addStudentButton" onClick={handleShow} >Add Student to Caseload</Button>

            {/* add student modal */}
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>Add Student to Caseload</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <form onSubmit={onSubmit}>
                  {/* Student last name field */}
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
                        setNewStudent({ ...newStudent, lastName: e.target.value })
                      }
                    ></Input>
                  </Field>

                  {/* Student first name field */}
                  <Field
                    label="First Name"
                    invalid={!!errors.firstName}
                    errorText={errors.firstName?.message}
                  >
                    <Input
                      {...register("firstName", {
                        required: "First name is required",
                      })}
                      onChange={(e) =>
                        setNewStudent({ ...newStudent, firstName: e.target.value })
                      }
                    ></Input>
                  </Field>

                  {/* Student SSID field */}
                  <Field
                    label="SSID"
                    invalid={!!errors.SSID}
                    errorText={errors.SSID?.message}
                  >
                    <Input
                      type="number"
                      {...register("SSID", {
                        required: "SSID is required",
                      })}
                      onChange={(e) =>
                        setNewStudent({ ...newStudent, SSId: Number(e.target.value) })
                      }
                    ></Input>
                  </Field>

                  {/* Student DOB field */}
                  <Field
                    label="Date of Birth"
                    invalid={!!errors.DOB}
                    errorText={errors.DOB?.message}
                  >
                    <Input type="date"
                      {...register("DOB", {
                        required: "DOB is required",
                      })}
                      onChange={(e) => {
                        console.log(e.target.value)
                        setNewStudent({ ...newStudent, DOB: parseInt(e.target.value) })

                      }
                      }
                    ></Input>
                  </Field>
                  {/* Gender section */}
                  <Field label="Gender">

                    <RadioGroup defaultValue="" onValueChange={(e) => setNewStudent({ ...newStudent, gender: e.value })}>
                      <HStack gap="6">
                        <Radio value="Male"> Male</Radio>
                        <Radio value="Female"> Female</Radio>
                        <Radio value="Non-Binary"> Non-Binary</Radio>
                      </HStack>
                    </RadioGroup>
                  </Field>

                  {/* Student Disability field */}
                  <Field
                    label="Primary Disability"
                    invalid={!!errors.primaryDisability}
                    errorText={errors.primaryDisability?.message}
                  >
                    <Input
                      {...register("primaryDisability", {
                        required: "Primary Disability is required",
                      })}
                      onChange={(e) =>
                        setNewStudent({ ...newStudent, primaryDisability: e.target.value })
                      }
                    ></Input>
                  </Field>

                  {/* Student primary phone number field */}
                  <Field
                    label="Primary Phone Number"
                    invalid={!!errors.primaryPhone}
                    errorText={errors.primaryPhone?.message}
                  >
                    <Input
                      max={99999999999}
                      type="number"
                      {...register("primaryPhone", {
                        required: "Primary phone number is required",
                      })}

                      onChange={(e) =>
                        setNewStudent({ ...newStudent, primaryContact: e.target.value })
                      }
                    ></Input>
                  </Field>

                  {/* Student secondary phone number field */}
                  <Field
                    label="Secondary Phone Number"
                    invalid={!!errors.secondaryPhone}
                    errorText={errors.secondaryPhone?.message}
                  >
                    <Input
                      max={99999999999}
                      type="number"
                      {...register("secondaryPhone", {
                        required: "Secondary phone number is required",
                      })}

                      onChange={(e) =>
                        setNewStudent({ ...newStudent, secondaryContact: e.target.value })
                      }
                    ></Input>

                  </Field>
                  {/* Home address field */}
                  <Field
                    label="Home Address"
                    invalid={!!errors.address}
                    errorText={errors.address?.message}
                  >
                    <Input
                      {...register("address", {
                        required: "Home Address is required",
                      })}

                      onChange={(e) =>
                        setNewStudent({ ...newStudent, homeAddress: e.target.value })
                      }
                    ></Input>
                  </Field>
                  <Form.Group className="mb-3 " controlId="Image">
                    <Form.Label>Pick an Image</Form.Label>
                    <Form.Control type="file" placeholder="Select an Image from file" accept="image/png, image/jpg" onChange={handleImage} />

                  </Form.Group>
                  <Button type="submit" colorPalette={"blue"}>
                    Submit
                  </Button>
                </form>
              </Modal.Body>
            </Modal>

          </div>
        </div>
      </div>

      {/* Student Accordion */}
      <Table.Root size="lg" marginTop={10} marginBottom={10} >
        {/* <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>Product</Table.ColumnHeader>
          <Table.ColumnHeader>Category</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
        </Table.Row>
      </Table.Header> */}
        <Table.Body>
          {data.filter((student) => !student.isDeleted).map((student) => (

            <Table.Row key={student.id}>
              <Table.Cell className="d-flex"  colorPalette={"gray"}>
                {student.profilePicture == "" ? <Icon fontSize="3em" margin={3}><RxAvatar /></Icon> : <Image src={student.profilePicture}
                  alt={`${student.lastName}, ${student.firstName} profile picture`}
                  width="5em"
                  padding={3}
                />}

                <Link to={`/student/${student.id}`}>
                  {student.lastName}, {student.firstName}
                </Link>


                <IconButton onClick={() => removeStudent(student.id)}><FaRegTrashAlt /></IconButton>



              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default Dashboard;
