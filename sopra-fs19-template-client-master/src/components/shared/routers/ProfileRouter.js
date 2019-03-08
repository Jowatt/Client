import React from "react";
import styled from "styled-components";
import { Redirect, Route } from "react-router-dom";
import Profile from "../../profile/Profile";
import User from "../models/User";

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

class ProfileRouter extends React.Component {
    render() {
        /**
         * "this.props.base" is "/app" because as been passed as a prop in the parent of GameRouter, i.e., App.js
         */
        return (
            <Container>
                <Route
                    exact
                    path={`${this.props.base}/profile/${this.props.user.username}`}
                    render={() =>
                        <Profile user={this.props.base}/>
                    }
                />

                <Route
                    exact
                    path={`${this.props.base}`}
                    render={() => <Redirect to={`${this.props.base}/dashboard`} />}
                />
            </Container>
        );
    }
}
/*
* Don't forget to export your component!
 */
export default ProfileRouter;
