import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import queryString from 'query-string'

//import logo from './logo.svg';
import Page from './components/page/Page'
import Login from './components/user/Login'
import HomePage from './components/HomePage'
import ModifyPage from './components/page/ModifyPage'
import ModifySection from './components/section/ModifySection'
import { Container, Box, Paper } from '@material-ui/core';

function App() {
  return (
    <Container maxWidth='lg'>
      <Box mt={5}>
        <Paper elevation={15}>
          <Box p={4}>
            <Router>
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => {
                    if (sessionStorage.jwtToken)
                      return <HomePage />
                    else
                      return <Login />
                  }}
                />

                <Route
                  path="/page/:id"
                  component={Page}
                />

                <Route
                  path="/authcallback"
                  render={() => {
                    const parsed = queryString.parse(window.location.search);

                    fetch(`https://api-links.montanari.live/google/oauthcallback`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({ code: parsed.code })
                    })
                      .then(res => res.json())
                      .then((result) => {
                        if (result.apiToken)
                          sessionStorage.setItem('jwtToken', result.apiToken)
                        window.location.href = "https://links.montanari.live/";
                      })
                  }}
                />

                <Route
                  path="/modify/page/:id"
                  component={ModifyPage}
                />

                <Route
                  path="/modify/section/:id"
                  component={ModifySection}
                />

              </Switch>
            </Router>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default App;
