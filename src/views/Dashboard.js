import React from "react";
import ChartistGraph from "react-chartist";
import x from "../p2p/test";
import BrowserP2P from "../p2p/BrowserP2P";
import Account from "../p2p/Account";
// react-bootstrap components
import {
  Badge,
  Button,
  Card,
  Navbar,
  Nav,
  Table,
  Container,
  Row,
  Col,
  Form,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import GraphComponent from "components/Graph";

function Dashboard({ ...props }) {
  // let acc = Account.getAccount();
  console.log("DASHBOARD props ---->", props);
  const acc = props.acc;
  const graph = props.graph;
  const p2p = props.p2p;
  console.log("ACC PROP PASSED", acc);
  console.log("GRAPH DAHBOARD passed", graph);
  const [disoveryTopic, setDiscoveryTopic] = React.useState("");
  // let p = new BrowserP2P();
  return (
    <>
      <Container fluid>
        {/* <Row className="justify-content-center align-items-center"> */}
        <Row>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-light-3 text-success"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Discovery ID</p>
                      <Card.Title as="h4">{acc.userID}</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-calendar-alt mr-1"></i>
                  Last day
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-favourite-28 text-primary"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Direct Connections</p>
                      <Card.Title as="h4">
                        {graph.getTotalDirectConnections(acc.publicKey)}
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update now
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-vector text-danger"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Total Peers</p>
                      <Card.Title as="h4">
                        {graph.getTotalPeers() - 1}
                      </Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="far fa-clock-o mr-1"></i>
                  In the last hour
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col lg="3" sm="6">
            <Card className="card-stats">
              <Card.Body>
                <Row>
                  <Col xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-chart text-warning"></i>
                    </div>
                  </Col>
                  <Col xs="7">
                    <div className="numbers">
                      <p className="card-category">Storage Used</p>
                      <Card.Title as="h4">150GB</Card.Title>
                    </div>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-redo mr-1"></i>
                  Update Now
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 8, order: 1 }} xs={{ span: 12, order: 2 }}>
            <Card>
              <Card.Header>
                <Card.Title as="h4">Social Graph</Card.Title>
                <p className="card-category">Web of Trust</p>
              </Card.Header>
              <Card.Body>
                <GraphComponent graph={graph}></GraphComponent>
              </Card.Body>
              <Card.Footer>
                <div className="legend">
                  <i className="fas fa-circle text-success"></i>
                  You <i className="fas fa-circle text-primary"></i>
                  Peers
                </div>
                <hr></hr>
                <div className="stats">
                  <i className="fas fa-history"></i>
                  Updated 3 minutes ago
                </div>
              </Card.Footer>
            </Card>
          </Col>
          <Col md={{ span: 4, order: 2 }} xs={{ span: 12, order: 1 }}>
            <Card>
              <Card.Header>
                <Card.Title as="h4">Connect</Card.Title>
                <p className="card-category">Discover your peers</p>
              </Card.Header>
              <Card.Body>
                <Form>
                  <Row className="justify-content-center">
                    <Col className="px-1" md="8" xs="8">
                      <Form.Group>
                        {/* <label>Connect with peers</label> */}
                        <Form.Control
                          placeholder="Discovery ID"
                          type="text"
                          onChange={(event) => {
                            setDiscoveryTopic(event.target.value);
                          }}
                        ></Form.Control>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row className="justify-content-center">
                    <Col xs="auto">
                      <br></br>
                      <Button
                        className="btn-fill pull-right"
                        type="button"
                        variant="info"
                        onClick={() => {
                          p2p.connectToTopic(disoveryTopic);
                        }}
                      >
                        CONNECT
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

export default Dashboard;
