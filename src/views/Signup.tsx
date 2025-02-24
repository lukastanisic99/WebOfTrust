import * as React from "react";
import { useHistory } from 'react-router-dom';
import Account from '../p2p/Account'
// react-bootstrap components
import {
  Button,
  Card,
  Form,
  Container,
  Row,
  Col
} from "react-bootstrap";

function Signup() {

    const [name, setName] = React.useState("");
    let history = useHistory();
  
  let signup = () => {
    let acc = new Account(name);
    acc.persistAccount();
      //console.log(name);
    history.push('/user/dashboard')
    }

  return (
    <>
      <Container fluid>
        <Row className="justify-content-center align-items-center align-items-center" style={{ height: "100vh" }}>
          <Col md="8">
            <Card>
              <Card.Header>
                <Card.Title as="h4" className="text-center">Introduce yourself</Card.Title>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row className="justify-content-center">
                    <Col className="px-1" md="3">
                      <Form.Group>
                        <label>Name</label>
                        <Form.Control
                          placeholder="your name"
                          type="text"
                          onChange={(event)=>{setName(event.target.value)}}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                <Row className="justify-content-center">
                <Col xs='auto'>
                  <Button
                    className="btn-fill pull-right"
                    type="submit"
                    variant="info"
                    onClick={signup}
                  >
                    I'm ready
                  </Button>
                </Col> 
                </Row>
                  <div className="clearfix"></div>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Signup;
