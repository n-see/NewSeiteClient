
import { Container } from "react-bootstrap";

const ThankYouPage = () => {
  return (
    <Container
      fluid
      className="d-flex flex-column align-items-center justify-content-center vh-100 bg-light"
    >
      <div className="text-center bg-white p-5 rounded shadow">
        <h5>Thank you for contacting us.</h5>
        <p>
          A member of our team will respond to your inquiry within one business
          day. <br />
          We appreciate your interest in our services.
        </p>
      </div>
    </Container>
  );
}

export default ThankYouPage;
