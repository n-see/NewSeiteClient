
import { Button, Container, DialogActionTrigger, DialogCloseTrigger, DialogFooter, Flex, Grid, GridItem, Icon, Image, Input, Link, Table, Text } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form, useLocation, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../constant';
import { RxAvatar } from 'react-icons/rx';
import { DialogBody, DialogContent, DialogHeader, DialogRoot, DialogTitle, DialogTrigger } from '../components/ui/dialog';
import { Field } from '../components/ui/field';

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
interface Goal {
  id: number,
  studentId: number,
  description: string,
  areaOfNeed: string,
  measurableAnnualGoal: string,
  baseline: string,

}


const StudentProfile = () => {
  let navigate = useNavigate();
  // const prams = useParams;

  // const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  console.log(location)

  const [data, setData] = useState<Student[]>([])
  const [allGoals, setAllGoals] = useState<Goal[]>([])
  const [newGoal, setNewGoal] = useState<Goal>({
    id: 0,
    studentId: 0,
    description: "",
    areaOfNeed: "",
    measurableAnnualGoal: "",
    baseline: ""
  })

  useEffect(() => {
    axios
      .get(BASE_URL + "Student/GetStudentById/" + "14")
      .then((response) => {
        setData(response.data);
        console.log(data);

      })
      .catch((error) => {
        console.log(error);
      });
      fetchGoal()
  }, [])

  const addGoal = () => {
    console.log(newGoal)
    axios
    .post(BASE_URL + "Goals/AddGoal", newGoal)
    .then(res => res.data)
    .catch(error => error.message)
  }
  const fetchGoal = () => {
    axios
    .get(BASE_URL + "Goals/GetGoalsByStudentId/" + "1" )
    .then((response) => {
      setAllGoals(response.data)
      console.log(allGoals)
    })
    .catch(error => error.message)
  }
  return (
    <>
      <Container>
        <Flex>
          <Link colorPalette={'blue'} variant={'underline'} onClick={() => navigate("/dashboard")}> Return to Dashboard</Link>
          <Container marginEnd={'auto'}>

            {/* Add Goal */}
            <DialogRoot>
              <DialogTrigger asChild>
                <Button colorPalette={'blue'} variant="solid" size="sm">
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
                    <Field invalid label="measure" errorText="This field is required">
                      <Input placeholder="Measurable Annual Goal" onChange={e => setNewGoal({ ...newGoal, measurableAnnualGoal: e.target.value })} />
                    </Field>
                    <Field invalid label="area of need" errorText="This field is required">
                      <Input placeholder="Area of need" onChange={e => setNewGoal({ ...newGoal, areaOfNeed: e.target.value })} />
                    </Field>
                    <Field invalid label="baseline" errorText="This field is required">
                      <Input placeholder="Baseline" onChange={e => setNewGoal({ ...newGoal, baseline: e.target.value })} />
                    </Field>
                    <Field invalid label="description" errorText="This field is required">
                      <Input placeholder="Description" onChange={e => setNewGoal({ ...newGoal, description: e.target.value })} />
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

            <Button variant={'solid'} colorPalette={'blue'} margin={2}>Edit Student</Button>
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
            {student.profilePicture == "" ? <Icon fontSize="1000%"><RxAvatar /></Icon> : <Image src={student.profilePicture}
              alt={`${student.lastName}, ${student.firstName} profile picture`}
            />}
          </GridItem>
          <GridItem colSpan={2}>
            <h1>{student.lastName}, {student.firstName}</h1>
          </GridItem>
          <GridItem colSpan={2}>
            <Text> SSID: {student.SSId}</Text>
          </GridItem>
          <GridItem colSpan={1}>
            DOB: {student.DOB}
          </GridItem>
          <GridItem colSpan={1}>
            Age:
          </GridItem>
          <GridItem colSpan={1}>
            Sex: {student.gender}
          </GridItem>
          <GridItem colSpan={1}>
            Primary Disability: {student.primaryDisability}
          </GridItem>
          <GridItem colSpan={2}>
            Primary: {student.primaryContact}
          </GridItem>
          <GridItem colSpan={2}>
            Secondary: {student.secondaryContact}
          </GridItem>
          <GridItem colSpan={4}>
            Home Address: {student.homeAddress}
          </GridItem>
        </Grid>
      ))}

      
        <Table.Root size="sm" variant="outline" marginTop={5}>
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
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {allGoals.map(goal => (
            <Table.Row key={goal.id}>
              <Table.Cell>{goal.measurableAnnualGoal}</Table.Cell>
              <Table.Cell>{goal.areaOfNeed}</Table.Cell>
              <Table.Cell>{goal.baseline}</Table.Cell>
              <Table.Cell>{goal.description}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
   
    </>
  )
}

export default StudentProfile