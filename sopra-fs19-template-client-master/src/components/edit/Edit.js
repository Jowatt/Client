import React from "react";
import styled from "styled-components";
import { BaseContainer } from "../../helpers/layout";
import { getDomain } from "../../helpers/getDomain";
import Player from "../../views/Player";
import { Spinner } from "../../views/design/Spinner";
import { Button } from "../../views/design/Button";
import { withRouter } from "react-router-dom";
import User from "../shared/models/User";

const Container = styled(BaseContainer)`
  color: white;
  text-align: center;
`;

const InputField = styled.input`
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
  height: 35px;
  padding-left: 15px;
  margin-left: -4px;
  border: none;
  border-radius: 20px;
  margin-bottom: 20px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;

class Edit extends React.Component {

    constructor(props) {
        super(props);
        this.state={
            username: null
            //birthDay: null
        }


    }

    handleInputChange(key, value) {
        // Example: if the key is username, this statement is the equivalent to the following one:
        // this.setState({'username': value});
        localStorage.setItem(key, value);
        this.setState({[key]: value});
    }
    return(){
        this.props.history.push(`/game`)
    }

    submit(){
        fetch(`${getDomain()}/users/${localStorage.getItem("id")}?token=${localStorage.getItem("token")}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',
                "Access-Control-Allow-Origin": "*"

            },
            body: JSON.stringify({
                username: localStorage.getItem("username"),
                birthDay: localStorage.getItem("birthday")
            })
        })
            .then(response => {
                if (response.status === 409) alert("This username already exists! Can not change to this username.");
                else alert ("User has been updated.");
                localStorage.removeItem("birthday");
                localStorage.removeItem("username");
                this.props.history.push(`/game`);
            })
            .catch(err => {
                console.log(err);
            });

    }

    render() {
        return (
            <Container>
                <p>{'User: ' +localStorage.getItem("nameToChange")}</p>
                <InputField
                    placeholder="Enter here.."
                    onChange={e => {
                        this.handleInputChange("username", e.target.value);
                    }}
                />
                <br/>
                <p>{localStorage.getItem("dateToChange")=== null ? localStorage.getItem("dateToChange") :'Birthday: ' +  new Date(localStorage.getItem("dateToChange")).toLocaleDateString("de-DE")}</p>
                <InputField
                    type="date"
                    placeholder="Enter here.."
                    onChange={e => {
                        this.handleInputChange("birthday", e.target.value);
                    }}
                />
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
                        //disabled={!this.state.username && !this.state.birthDay}
                        width="20%"
                        onClick={() => {

                            this.submit();
                        }}
                    >
                        submit
                    </Button>
                </ButtonContainer>
            </Container>
        );
    }
}

export default withRouter(Edit);