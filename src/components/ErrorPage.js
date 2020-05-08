import React from 'react';
import { Grid } from 'semantic-ui-react';

const ErrorPage = () => {
  return (
    <Grid centered padded stackable >
      <Grid.Column textAlign='center' style={{margin: '5% auto'}}>
        <h1 style={{color: 'red', fontSize: 40}}>404 - Page Not Found</h1>
      </Grid.Column>           
    </Grid>
  );
}

export default ErrorPage;