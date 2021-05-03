import React, { Component } from 'react';
import PropTypes from 'prop-types';
import p5 from "p5";

import { connect } from "react-redux"
// import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom"
// import ReactDOM from "react-dom"

// import sketch from "../p5/sketch";
import Sketch2 from "../p5/sketch2";
import RegionBars from "../components/projects/RegionBars";
import RegionPiaChart from "../components/projects/RegionPiaChart";
import RegionTable from "../components/projects/RegionTable";
// import ProjectPage from "../pages/projectpage"
// import { getProjects } from "../actions/projects/projectActions";
// import { Motion, spring } from 'react-motion';

class ProjectsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
    // this.myRef = React.createRef()
  }

  componantDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1500); // simulates loading of data
    // this.myP5 = new p5(this.p5s, this.myRef.current)
  }

  componantWillMount() { }

  render() {
    return (<div >
      <Sketch2 />
      <div class="project-container">
        <RegionBars projects={this.props.pages} />
        <RegionPiaChart projects={this.props.pages} />
        <RegionTable projects={this.props.pages} />
      </div>
    </div>)
  }

}

ProjectsPage.PropTypes = {
  pages: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    pages: state.pages,
  }
}

export default connect(mapStateToProps)(ProjectsPage);