import React from 'react';
import _ from 'lodash';
import { Meteor } from 'meteor/meteor';
import { Segment, Grid, Card, Loader, Button, Checkbox, List, Dropdown, Menu, Search } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import Location from '../components/Locations';
import { Locations } from '../../api/location/Locations';
import { LocationsQualities } from '../../api/location/LocationQualities';

/** Capacity amount for each place */
const options = [
  { key: 1, text: '1', value: 1 },
  { key: 2, text: '2', value: 2 },
  { key: 3, text: '3', value: 3 },
  { key: 4, text: '4', value: 4 },
  { key: 5, text: '5', value: 5 },
  { key: 6, text: '6', value: 6 },
  { key: 7, text: '7', value: 7 },
  { key: 8, text: '8', value: 8 },
  { key: 9, text: '9', value: 9 },
  { key: 10, text: '10', value: 10 },
];

/** Location items */
const initialState = { isLoading: false, results: [], value: '' };

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class SearchPage extends React.Component {
  state = initialState;

  handleResultSelect = (e, { result }) => this.setState({ value: result.title });

  handleSearchChange = (e, { value }) => {
    this.setState({ isLoading: true, value });

    // eslint-disable-next-line consistent-return
    setTimeout(() => {
      if (this.state.value.length < 1) return this.setState(initialState);

      const source = Locations.find({}).fetch();
      const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
      const isMatch = (result) => re.test(result.locationName);

      const searchResults = _.filter(source, isMatch);
      const ret = _.map(searchResults, function (location) {
        return {
          title: location.locationName,
          description: location.description,
          image: location.image,
        };
      })
      this.setState({
        isLoading: false,
        results: ret,
      });
    }, 300);
  };

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const { isLoading, value, results } = this.state;
    return (
        <Grid centered>
          <Grid.Column width={3}>
            <Segment>
              <Grid columns='equal'>
                <Grid.Column>
                  <Button.Group>
                    <Button>Free</Button>
                    <Button>$</Button>
                    <Button>$$</Button>
                  </Button.Group>
                </Grid.Column>
                <Grid.Column textAlign='right'>
                  <Menu compact>
                    <Dropdown text='Capacity' options={options} simple item />
                  </Menu>
                </Grid.Column>
                <Grid.Row>
                  <Grid.Column>
                    <List>
                      <List.Item><Checkbox label='Open Now' /></List.Item>
                      <List.Item><Checkbox label='On Campus' /></List.Item>
                      <List.Item><Checkbox label='Off Campus' /></List.Item>
                      <List.Item><Checkbox label='Noisy' /></List.Item>
                      <List.Item> <Checkbox label='Quiet' /></List.Item>
                    </List>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
          </Grid.Column>
          <Grid.Column width={7} textAlign='center'>
            <Segment>
              <Search
                  fluid
                  loading={isLoading}
                  onResultSelect={this.handleResultSelect}
                  onSearchChange={_.debounce(this.handleSearchChange, 500, {
                    leading: true,
                  })}
                  results={results}
                  value={value}
                  {...this.props}
              />
            </Segment>
            <Segment>
            <Card.Group>
              {this.props.locations.map((spot, index) => <Location key={index}
                                                                   spot={spot}
                                                                   Locations={Locations} />)}
            </Card.Group>
            </Segment>
          </Grid.Column>
        </Grid>
    );
  }
}

/** qualities={this.props.locationqualities.filter(quality => (quality.location === location.location))} */

/** Require an array of Stuff documents in the props. */
SearchPage.propTypes = {
  locations: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  locationqualities: PropTypes.array.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to subscriptions.
  const subscription = Meteor.subscribe('Locations');
  const subscription2 = Meteor.subscribe('LocationQualities');
  return {
    locations: Locations.find({}).fetch(),
    locationqualities: LocationsQualities.find({}).fetch(),
    ready: subscription.ready() && subscription2.ready(),
  };
})(SearchPage);
