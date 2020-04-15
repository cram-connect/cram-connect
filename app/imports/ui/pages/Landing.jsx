import React from 'react';
import { Grid, Header, Image } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const divStyle = { paddingTop: '15px', color: 'white', fontSize: '16px' };
    const attention = { paddingTop: '15px', color: 'white', fontSize: '14px' };
    const tagline = { paddingTop: '15px', color: 'white', fontSize: '30px', fontFamily: 'Pacifico' };

    return (
        <div style={divStyle} className="ui center aligned container">
          <Grid container stackable centered columns={3}>
            <Grid.Column textAlign='center'>
              <Image src="/images/uhmseal.png"
                     size='medium' centered/>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <Header as='h2' inverted> Cram Connect </Header>
              <font style={attention}>
                Are you tired of being unable to focus on your assignments because of your crazy roommate?
                Perhaps you&#39;re too comfortable in the quiet of your room and need a fast-paced environment
                to get the juices flowing?
                Cram Connect allows you to discover study spots throughout the UH Manoa campus and connect with
                other students who are looking for their perfect study environment.
              </font>
              <br/>
              <br/>
              <font style={tagline}>Find your sweet spot!</font>
            </Grid.Column>

            <Grid.Column textAlign='center'>
              <Image src="/images/books.png"
                     size='medium' centered/>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default Landing;
