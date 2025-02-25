import {
  Button,
  Container,
  DialogActionTrigger,
  DialogCloseTrigger,
  DialogFooter,
  Flex,
  Grid,
  GridItem,
  Icon,
  Image,
  Input,
  Link,
  Table,
  Text
} from "@chakra-ui/react";
import axios, { all } from "axios";
import { useEffect, useState } from "react";
import { RxAvatar } from "react-icons/rx";
import { Form, useNavigate, useParams } from "react-router-dom";
import {
  DialogBody,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Field } from "../components/ui/field";
import { BASE_URL } from "../constant";

interface Student {
  id: number;
  userId: number;
  firstName: string;
  lastName: string;
  ssId: number;
  dob: number;
  gender: string;
  primaryDisability: string;
  primaryContact: string;
  secondaryContact: string;
  homeAddress: string;
  profilePicture: string;
  isEnrolled: boolean;
  isDeleted: boolean;
}
interface Goal {
  id: number;
  studentId: number;
  description: string;
  areaOfNeed: string;
  measurableAnnualGoal: string;
  baseline: string;
  isDeleted: boolean;
}

const StudentProfile = () => {
  let navigate = useNavigate();
  const prams = useParams();


  // const [searchParams, setSearchParams] = useSearchParams();
  // const location = useLocation();

  const [data, setData] = useState<Student[]>([]);
  const [allGoals, setAllGoals] = useState<Goal[]>([]);
  const [studentSSID, setStudentSSID] = useState(0);
  const [newGoal, setNewGoal] = useState<Goal>({
    id: 0,
    studentId: 0,
    description: "",
    areaOfNeed: "",
    measurableAnnualGoal: "",
    baseline: "",
    isDeleted: false
  });
  const [Age, setAge] = useState(0)
  useEffect(() => {
    console.log("Updated Goal: ", newGoal)
  }, [newGoal])
  

  const [runCode, setRunCode] = useState<Boolean>(false)

  const changeId = () => {
    const studentData = JSON.parse(localStorage.getItem("StudentData")!) 
    setStudentSSID(Number(studentData.ssId))
    setNewGoal(prevGoal => ({
      ...prevGoal,
      studentId: studentData.ssId
    }));
    console.log(newGoal)
  };

  const handleDelete = (id:number) => {
    const editDelete =(allGoals.filter(goal => goal.id))
    // setEditDelete({...editDelete, isDeleted: true})
    axios.put(BASE_URL + "Student/GetStudentById/" + id, editDelete)
  }


  const fetchStudentInfo = async () => {
    await axios.get(BASE_URL + "Student/GetStudentById/" + prams.id ).then(
      res => {setData(res.data)
      localStorage.setItem("StudentData", JSON.stringify(res.data[0]))      
    }
    ).finally(() => setRunCode(true))
  };
  function calculateAge(dobString:string) {
    // Parse the date string into a Date object
    const birthDate = new Date(dobString);

    // Validate parsed date
 

    // Get today's date
    const today = new Date();

    // Calculate age
    let age = today.getFullYear() - birthDate.getFullYear();

    // Adjust if birthday hasn't happened yet this year
    if (
        today.getMonth() < birthDate.getMonth() || 
        (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
    ) {
        age--;
    }

    setAge(Number(age))
}


  

  useEffect(() => {
    fetchStudentInfo();
    changeId();
  }, []);
  

  const addGoal =  () => {
    changeId()
    setNewGoal({ ...newGoal, studentId: studentSSID  });
    axios
      .post(BASE_URL + "Goals/AddGoal", newGoal)
      .then((res) => res.data)
      .catch((error) => error.message);
  };
  const fetchGoal = () => {
    axios
      .get(BASE_URL + "Goals/GetGoalsByStudentId/" + studentSSID)
      .then((response) => {
        setAllGoals(response.data);
      })
      .catch((error) => error.message);
  };
if(runCode){

  fetchGoal();
  calculateAge(String(data.map(newData => newData.dob)))
  setRunCode(false)
}


  return (
    <>
      <Container>
        <Flex>
          <Link
            colorPalette={"blue"}
            variant={"underline"}
            onClick={() => navigate("/dashboard")}
          >
            {" "}
            Return to Dashboard
          </Link>
          <Container marginEnd={"auto"}>
            {/* Add Goal */}
            <DialogRoot>
              <DialogTrigger asChild>
                <Button colorPalette={"blue"} variant="solid" size="sm">
                  Add Goal
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create a Goal</DialogTitle>
                </DialogHeader>
                <DialogBody>
                  {/* Form */}

                  <Form>
                    <Field
                      
                      label="Measurable Annual Goal"
                      errorText="This field is required"
                    >
                      <Input
                        placeholder="Measurable Annual Goal"
                        onChange={(e) =>
                          setNewGoal({
                            ...newGoal,
                            measurableAnnualGoal: e.target.value,
                          })
                        }
                      />
                    </Field>
                    <Field
                      
                      label="Area of Need"
                      errorText="This field is required"
                    >
                      <Input
                        placeholder="Area of need"
                        onChange={(e) =>
                          setNewGoal({ ...newGoal, areaOfNeed: e.target.value })
                        }
                      />
                    </Field>
                    <Field
                      
                      label="Baseline"
                      errorText="This field is required"
                    >
                      <Input
                        placeholder="Baseline"
                        onChange={(e) =>
                          setNewGoal({ ...newGoal, baseline: e.target.value })
                        }
                      />
                    </Field>
                    <Field
                      
                      label="Description"
                      errorText="This field is required"
                    >
                      <Input
                        placeholder="Description"
                        onChange={(e) =>
                          setNewGoal({
                            ...newGoal,
                            description: e.target.value,
                          })
                        }
                      />
                    </Field>
                  </Form>
                </DialogBody>
                <DialogFooter>
                  <DialogActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogActionTrigger>
                  <Button onClick={addGoal}>Add</Button>
                </DialogFooter>
                <DialogCloseTrigger />
              </DialogContent>
            </DialogRoot>

            <Button variant={"solid"} colorPalette={"blue"} margin={2}>
              Edit Student
            </Button>
          </Container>
        </Flex>
      </Container>
      {data.map((student) => (
        <Grid
          key={student.id}
          h="200px"
          templateRows="repeat(2, 1fr)"
          templateColumns="repeat(5, 1fr)"
          gap={4}
        >
          {/* Profile Picture */}
          <GridItem rowSpan={4} colSpan={1}>
            {student.profilePicture == "" ? (
              <Icon fontSize="1000%">
                <RxAvatar />
              </Icon>
            ) : (
              <Image
                marginLeft={"15%"}
                marginTop={"1rem"}
                width={"12rem"}
                src={student.profilePicture}
                alt={`${student.lastName}, ${student.firstName} profile picture`}
              />
            )}
          </GridItem>
          <GridItem colSpan={2}>
            <h1>
              {student.lastName}, {student.firstName}
            </h1>
          </GridItem>
          <GridItem colSpan={2}>
            <Text> SSID: {student.ssId}</Text>
          </GridItem>
          <GridItem colSpan={1}>DOB: {student.dob}</GridItem>
          <GridItem colSpan={1}>Age: {Age}</GridItem>
          <GridItem colSpan={1}>Sex: {student.gender}</GridItem>
          <GridItem colSpan={1}>
            Primary Disability: {student.primaryDisability}
          </GridItem>
          <GridItem colSpan={2}>Primary: {student.primaryContact}</GridItem>
          <GridItem colSpan={2}>Secondary: {student.secondaryContact}</GridItem>
          <GridItem colSpan={4}>Home Address: {student.homeAddress}</GridItem>
        </Grid>
      ))}

      <Table.Root
        size="sm"
        variant={"outline"}
        striped
        appearance={"light"}
        marginTop={10}
        marginBottom={10}
        // colorPalette={"gray"}
      >
        <Table.ColumnGroup>
          <Table.Column htmlWidth="50%" />
          <Table.Column htmlWidth="40%" />
          <Table.Column />
        </Table.ColumnGroup>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>Measurable Annual Goal</Table.ColumnHeader>
            <Table.ColumnHeader>Area of Need</Table.ColumnHeader>
            <Table.ColumnHeader>Baseline</Table.ColumnHeader>
            <Table.ColumnHeader>Description</Table.ColumnHeader>
            <Table.ColumnHeader></Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {allGoals.filter(goal => !goal.isDeleted).map((goal) => (
            <Table.Row key={goal.id}>
              <Table.Cell>{goal.measurableAnnualGoal}</Table.Cell>
              <Table.Cell>{goal.areaOfNeed}</Table.Cell>
              <Table.Cell>{goal.baseline}</Table.Cell>
              <Table.Cell>{goal.description}</Table.Cell>
              <Table.Cell><Button colorPalette={"red"} onClick={() => handleDelete(goal.id)}>Delete</Button></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </>
  );
};

export default StudentProfile;
