import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import User from "../shared/models/User";
import { withRouter } from "react-router-dom";
import { Button } from "../../views/design/Button";
import {Spinner} from "../../views/design/Spinner";
import Player from "../game/Game";
import PLayer from "../../views/Player";
import {ButtonContainer, Label} from "../login/Login";
import {Title} from "../login/Register";
import {IconButton} from "@material-ui/core";

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
           userNow: new User()
        };
    }


    componentWillMount() {
        let id = this.props.match.params.id;
        //console.log(id);
        fetch(`${getDomain()}/users/${id}?token=${localStorage.getItem("token")}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => response.json())

            .then( user => {
               // console.log(user);
                this.setState({ userNow: user });
                console.log(this.state.userNow);
                console.log(localStorage.getItem("id"))
            });
        //console.log(this.state.userNow);
        //console.log(localStorage.getItem("token"));
        //console.log(this.state.user.username);
    }

    return(){

        this.props.history.push(`/game`)
    }

    render() {
        return (
            <Container>
                <h2>{'User: ' +this.state.userNow.username}</h2>
                <p>{'Status: ' + this.state.userNow.status}</p>
                <p>{'Creation Date: ' +this.state.userNow.creationDate === null ? this.state.userNow.creationDate : "Creationdate: " + new Date(this.state.userNow.creationDate).toLocaleDateString("de-DE")}</p>
                <p>{'Birthday: ' +this.state.userNow.birthDay === null ? this.state.userNow.birthDay : "Birthday: " + new Date(this.state.userNow.birthDay).toLocaleDateString("de-DE")}</p>
                <ButtonContainer>
                    <Button
                        width="20%"
                        onClick={() => {
                            this.return();
                        }}
                    >
                        Back
                    </Button>
                    &nbsp;&nbsp;&nbsp;
                    <Button
                        disabled={localStorage.getItem("id") !== localStorage.getItem("compId")}
                        width="20%"
                        onClick={() => {
                            localStorage.setItem("nameToChange", this.state.userNow.username);
                            localStorage.setItem("dateToChange", this.state.userNow.birthDay);
                            console.log(localStorage.getItem("nameToChange"));
                            console.log(localStorage.getItem("dateToChange"));
                            this.props.history.push(`/edit`)
                        }}
                    >
                        Edit
                    </Button>
                </ButtonContainer>
            </Container>
        );
    }

    birthDay(){
        if (this.state.user.birthDay === null) return "No Birthday available!";
        return (new Date(Number(this.state.user.birthDay))).toDateString();
    }
    creationDate(){
        return (new Date(Number(this.state.user.creationDate))).toDateString();
    }
    }


    export default withRouter(Profile)
    //<Container>
    //<Label>{this.state.user.id}</Label>
//<Label>{this.state.user.username}</Label>
//<Label>{this.state.user.name}</Label>
//<Label>{this.state.user.birthDay}</Label>
//<Label>{this.state.user.creationDate}</Label>
//</Container>