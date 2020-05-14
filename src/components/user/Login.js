import React, { Component } from 'react'
import { Box, Container, Button } from '@material-ui/core';

export class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            googleAuthenticationUrl: ''
        }
    }

    componentDidMount() {
        this.setGoogleAuthenticationUrl()
    }

    setGoogleAuthenticationUrl() {
        fetch(`https://api-links.montanari.live/google/generateurl`)
            .then(res => res.json())
            .then((result) => {
                if (result.url)
                    this.setState({
                        googleAuthenticationUrl: result.url
                    })
            })
    }

    render() {
        return (
            <Box mt={7} mb={7} m="auto">
                <Container maxWidth="xs">
                    <img 
                        src="https://img.icons8.com/clouds/100/000000/lock--v1.png" 
                        alt="lockIcon" 
                        style={{
                            display: "block",
                            margin: "auto",
                            marginBottom: '30px',
                        }}
                    />

                    <Button 
                        variant="contained"
                        fullWidth
                        color="primary"
                        href={this.state.googleAuthenticationUrl}
                        size="large"
                    >
                        {/* <img src="https://img.icons8.com/ios-filled/30/000000/google.png"/> */}
                        Login with Google
                    </Button>
                </Container>
            </Box>
        )
    }
}

export default Login
