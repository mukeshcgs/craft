import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { Link, Route } from "react-router-dom"
import ReactDOM from "react-dom"

export default class Footer extends Component {
  render() {
    return (<footer>
      <div id="copyright">© 2020 </div>
    </footer>)
  }
}


