import { Container } from "@chakra-ui/react";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router";

const ContactForm = () => {

  const navigate = useNavigate() 

  return (
    <>
     <h2 className="contactUs">Contact Us</h2>
  
    <Container>
      <Row>
        <Col>
          <div className="bg-light rounded shadow">
           
            <p className="text-muted mb-3">
              Thank you for your interest in SIETE. We are excited to show you
              what SIETE is all about. If you are not a current SIETE user and
              would like more information about SIETE or to schedule a
              demonstration, please complete the form below.
            </p>
            <p className="text-muted mb-3">
              If you are a current SIETE user and would like access to training
              materials, please log into SIETE and click on the Training
              Materials section of the upper navigation bar.
            </p>
            <p className="text-muted mb-3">
              If you are interested in a SIETE training, please reach out to
              your district or SELPA office to see if local trainings are
              available. If the district/SELPA wishes to contract with SIETE to
              provide the training, the request must come from a district/SELPA
              level user.
            </p>
            <Form>
              <Row className="mb-3">
                <Col sm={6}>
                  <Form.Group controlId="firstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your first name"
                      required
                    />
                  </Form.Group>
                </Col>
                <Col sm={6}>
                  <Form.Group controlId="lastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your last name"
                      required
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group controlId="email" className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter your email"
                  required
                />
              </Form.Group>
              <Form.Group controlId="phone" className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="tel"
                  placeholder="Enter your phone number"
                />
              </Form.Group>
              <Form.Group controlId="comments" className="mb-4">
                <Form.Label>Comments</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="Write your comments here"
                />
              </Form.Group>
              <Button
              onClick={() => navigate('/ThankYou')}
                type="submit"
                className="submitButton"
                style={{
                  backgroundColor: "#0279AE",
                  color: "white",
                  border: "none",
                  borderRadius:"none"
                }}
              >
                Submit Inquiry
              </Button>
            </Form>
          </div>
        </Col>
      </Row>
    </Container>
    </>
  ); 
}


export default ContactForm;
