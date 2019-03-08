import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import User from "../shared/models/User";
import { withRouter } from "react-router-dom";
import { Button } from "../../views/design/Button";
import {Spinner} from "../../views/design/Spinner";
import Player from "../game/Game";
import {Label} from "../login/Login";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const FormContainer = styled.div`
  margin-top: 2em;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 300px;
  justify-content: center;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 60%;
  height: 375px;
  font-size: 16px;
  font-weight: 300;
  padding-left: 37px;
  padding-right: 37px;
  border-radius: 5px;
  background: linear-gradient(rgb(27, 124, 186), rgb(2, 46, 101));
  transition: opacity 0.5s ease, transform 0.5s ease;
`;




class Profile extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            id : this.props.match.params.id,
            user: null};
    }
    componentDidMount() {

        fetch(`${getDomain()}/users/${this.state.id}?token=${localStorage.getItem("token")}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
  //  .then(response => response.json(), error =>
    //    {
      //      this.props.history.push("/profile");
        //})


        .catch(err => {
            console.log(err);
            alert("Something went wrong fetching the profile: " + err);
        });
}

    render() {
        if (this.state.user === null) { return null }
        return (
            <Container>
                <Label>{this.state.user.id}</Label>
                <Label>{this.state.user.username}</Label>
                <Label>{this.state.user.name}</Label>
                <Label>{this.state.user.birthDay}</Label>
                <Label>{this.state.user.creationDate}</Label>
            </Container>
        );
    }
    }


    export default withRouter(Profile)