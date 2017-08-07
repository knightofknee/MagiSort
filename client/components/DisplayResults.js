import React from 'react'
import {connect} from 'react-redux'
import {fetchResult} from '../store/result'

class DisplayResults extends React.Component {
  componentDidMount(){
    this.props.loadInitialData()
  }

  render(){
    console.log('maybe?', this.props.result)
    return (
      <div>
        {this.props.result}
      </div>
    )
  }
}

const mapState = (state) => {
  return {
    result: state.result
  }
}
const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(fetchResult());
    },
  };
};

export default connect(mapState, mapDispatch)(DisplayResults);
