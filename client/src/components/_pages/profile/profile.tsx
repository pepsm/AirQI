import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import "./css/style.css";
import { Container, Row, Col } from "react-bootstrap";

const Profile = (props: any) => {
  const { user } = props;

  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <Container className="centered wrapper" >
      <Container className="w-75" >
        <Row className="mb-5">
          <Col xs={12} md={8} className="centered">
            <div>
              <h2>
                <b>Edit profile</b>
              </h2>
              <small>
                People on AirQI will get to know you with the info below
              </small>
            </div>
          </Col>
          <Col xs={6} md={4} className="centered">
            <div>
              <button className="btn btn-sm">Cancel</button>
              <button className="btn btn-dark btn-sm ml-3">Save</button>
            </div>
          </Col>
        </Row>
        <small>Photo</small>
        <Row>
          <Col>
            <img
              className="rounded-circle"
              src="https://www.juxtapoz.com/images/Hannah%20Stouffer/Jesse%2013/Tea-Wei_10.gif"
              alt="Card image cap"
              width={"90px"}
              height={"90px"}
            ></img>

            <button className="btn btn-outline-dark btn-sm ml-4">Change</button>
          </Col>
        </Row>
        <Row>
          <Col>
            <small>First name</small>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                aria-describedby="first name"
                value={user.firstName}
              />
            </div>
          </Col>
          <Col>
            <small>Last name</small>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                aria-describedby="last name"
                value={user.lastName}
              />
            </div>
          </Col>{" "}
        </Row>

        <Row>
          <Col>
            <small>Username</small>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                aria-describedby="username"
                value={user.username}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col>
            <small>Access token</small>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                aria-describedby="token"
                value={
                  user.accessToken.substring(0, 20) +
                  " . . . " +
                  user.accessToken.substr(user.accessToken.length - 20)
                }
              />
            </div>
          </Col>
          <Col>
            <small>Authorities</small>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                aria-describedby="Roles"
                value={user.userRole}
              />
            </div>
          </Col>{" "}
        </Row>
      </Container>
    </Container>
  );
};

function mapStateToProps(state: any) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(Profile);
