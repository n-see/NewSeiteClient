import { Container, Row, Col } from "react-bootstrap";
import { Box, Heading, Text, Image, Flex } from "@chakra-ui/react";
import homepageteach from "../assets/homepageteach.jpg";

const Homepage = () => {
  return (
    <>
   
      <Container fluid className="py-5">
    
        <Box as="section" className="whatWeDo mb-5">
          <Row className="align-items-center">
       
            <Col md={6} className="text-center mb-4 mb-md-0">
            <Image
    src={homepageteach}
    alt="Teacher with students"
    boxSize={{ base: "100%", md: "80%" }} 
    objectFit="cover"
    borderRadius="md" 
    mx="auto" 
    display="block" 
    className="teacherStudent"
  />

            </Col>

        
            <Col md={6}>
              <Flex
                direction="column"
                align={{ base: "center", md: "start" }}
                textAlign={{ base: "center", md: "left" }}
              >
                <Heading as="h1" size="lg" mb={3} color={"black"}>
                  WHAT WE DO
                </Heading>
                <Text fontSize="md" lineHeight="tall" color="gray.700">
                  The mission of SIETE is to serve as a comprehensive student
                  directory, enhancing efficiency and accuracy in special
                  education record-keeping. Accessible from any internet-connected
                  device, this application operates independently and is not
                  associated with SEIS or any similar platforms. SIETE is an
                  excellent resource for SELPA (Student Engagement & Learning
                  Profile Archive) users, providing valuable information and
                  resources to support their needs.
                </Text>
              </Flex>
            </Col>
          </Row>
        </Box>
      </Container>
    </>
  );
};

export default Homepage;
