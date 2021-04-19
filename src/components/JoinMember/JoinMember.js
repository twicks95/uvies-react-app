// import React, { Component } from "react";
import { Button, Form, FormControl } from "react-bootstrap";
import Styles from "./JoinMember.module.css";

const JoinMember = () => {
  return (
    <section
      className={`d-flex flex-column align-items-md-center justify-content-center ${Styles.joinAMember}`}
    >
      <p>
        Be the vanguard of the
        <br />
        <span>Moviegoers</span>
      </p>
      {/* <form className="d-flex flex-column flex-md-row">
        <input
          type="email"
          className={`form-control ${Styles.inputEmail}`}
          id="input-email"
          placeholder="Type your email"
        />
        <button
          type="submit"
          className={`btn btn-primary ${Styles.btnJoinNow}`}
        >
          Join now
        </button>
      </form> */} 
      <Form className={`d-flex flex-column flex-md-row`}>
        <FormControl type="email" placeholder="Type your email" className={`mr-sm-2 ${Styles.inputEmail}`} />
        <Button variant="primary" className={`${Styles.btnJoinNow}`}>
          Join now
        </Button>
      </Form>
      <p>
        By joining you as a Tickitz member,
        <br />
        we will always send you the latest updates via email .
      </p>
    </section>
  );
}

export default JoinMember
