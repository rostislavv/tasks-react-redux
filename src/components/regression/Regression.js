import React, { Component } from 'react';
import { isLoggedOut } from '../../lib/auth';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { Button }  from 'semantic-ui-react';
import { Header, Container, Divider, Icon, Modal }  from 'semantic-ui-react';

import { fetchRegression } from '../../actions/regression-actions';

import {
  XYPlot, LineSeries,
  VerticalGridLines, HorizontalGridLines,
  XAxis, YAxis
} from 'react-vis';


class Regression extends Component {
    constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
  }
  componentWillMount() {
    const { dispatch  } = this.props;
    dispatch(fetchRegression());

    if (isLoggedOut()){
      this.props.history.push('/');
    }
  }
  componentWillUpdate() {
    if (isLoggedOut()) {
      this.props.history.push('/');
    }
  }

  logOut(e) {
    e.preventDefault();
    const { dispatch } = this.props;
    dispatch(fetchLogout());
  }
  render() {
    return (
      <Container>
        <div  style={{ 'display' : 'block', 'height' : 45}}>
            <Header style={{ 'marginTop' : 15 }} floated='left' size='large'>Tasks</Header>
            <Button style={{ 'marginTop' : 15 }} floated='right' icon onClick={this.logOut} >
              <Icon name='sign out' /> Logout
            </Button>
       </div>
        <Divider/>
        <Header size='small'>Regression</Header>
        <div></div>
        <div>
          <XYPlot width={800} height={500} style={{'marginLeft': '14%'}}>
            <LineSeries data={this.props.data} />
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis />
            <YAxis />
          </XYPlot>
        </div>
      </Container>
    )
  }
}

Regression.propTypes = {
  error: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired,
}

function mapStateToProps({auth, regression}){
  return {
    error: auth.error,
    loading: auth.loading,
    message: auth.message,
    data: regression.regression.data
  }
}

export default withRouter(connect(mapStateToProps)(Regression));
