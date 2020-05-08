import React from 'react';
import { Grid, Card, Image, Label, Icon, Divider } from 'semantic-ui-react';

const LeaderBoardList = ({ leaderBoard }) => {
  return leaderBoard.map((user, index) => {
    return (
      <Card fluid centered key={user.uid}>
        <Card.Content textAlign='left'>
          {
            index < 3 && (
              <Label style={{backgroundColor: '#a6a6a6'}} corner='left' > 
                <Icon 
                  name='trophy' 
                  style={{color: index === 0? '#D4AF37': index === 1? '#C0C0C0' : index === 2? '#cd7f32' : '' }} 
                />
              </Label>
            )
          }
          <Grid columns='three' divided verticalAlign='middle'>
            <Grid.Row>
              <Grid.Column width={4}>  
                <Image
                  floated='left'
                  size='small'
                  circular
                  src={user.avatarUrl}
                />
              </Grid.Column>
                
              <Grid.Column width={8}>
                <h3 style={{textTransform: 'capitalize', marginBottom: 25, fontSize: 35, fontWeight: 'bold'}}>{user.username}</h3>
                <span style={{fontWeight: 'bold'}}>Answered questions</span>
                <span style={{fontWeight: 'bold', float:'right'}}>{user.answeredQuestions}</span>
                <Divider fitted style={{marginTop: 15, marginBottom: 15}} />
                <span style={{fontWeight: 'bold'}}>Created questions</span>
                <span style={{fontWeight: 'bold', float:'right'}}>{user.createdQuestions}</span>
              </Grid.Column>
              <Grid.Column width={4}>
                <Card>
                  <Card.Content textAlign='center' style={{backgroundColor: '#ececec'}}>
                    <Card.Header><h3>Score</h3></Card.Header>
                  </Card.Content>
                  <Card.Content textAlign='center' >
                    <Label horizontal color='red' size='huge' circular style={{margin: '12% auto'}}>
                      <span>{user.total}</span>
                    </Label>
                  </Card.Content>
                </Card>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Card.Content>
      </Card>
    )
  })
}

export default LeaderBoardList;
