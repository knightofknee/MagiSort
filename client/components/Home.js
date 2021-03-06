import React from 'react'
// import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Row, Button, Icon} from 'react-materialize'
import axios from 'axios'
import DisplayResults from './DisplayResults'

/**
 * COMPONENT
 */
export default class Home extends React.Component {

  constructor() {
    super()
    this.state = {text: '', result: [], submitted: false}

    this.textHandler = this.textHandler.bind(this)
    this.submitHandler = this.submitHandler.bind(this)
  }
  textHandler(e){
    this.setState({ text: e.target.value })
  }
  submitHandler(e){
    e.preventDefault()
    const textSent = this.state.text
    return axios.post('/api/test', {textSent})
    .then(res => {
      return res.data})
    .then((result) => this.setState({result, submitted: true}))
    .catch((err) => {
      this.setState({result: ['Your text was too short, too long, or too devoid of any human sentiment', '']})
      console.log(err.response.data)
    })
  }

  render(){

  return (
    <div className="container">
      <Row>
        <h3 id="welcome" >Welcome, Word Wizard!</h3>
        <p>Look into the water and see whose voice you echo</p>
      </Row>
      <Row>
        <textarea onChange={this.textHandler} rows="10" cols="70" placeholder="Enter Your Harry Potter fanfiction in here, and see whose attitude you reflect most" />
      </Row>
      <Row>
        <Button className="center" onClick={this.submitHandler} waves='light'>Submit your text for evaluation<Icon left>local_pizza</Icon></Button>
      </Row>
      <div className="center">
        <Row>
          {this.state.submitted ?
          <div className="center">
            <p id="result">{this.state.result[0]}</p>
            <img src={this.state.result[1]} />
          </div>: null
            }
        </Row>
      </div>
    </div>
  )
}}

/**
 * CONTAINER
 */
// const mapState = (state) => {
//   return {
//     email: state.user.email
//   }
// }

/**
 * PROP TYPES
 */
// Home.propTypes = {
//   email: PropTypes.string
// }
