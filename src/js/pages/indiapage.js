import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux"
import IndiaBars from "../components/projects/IndiaBars";
import RegionPiaChart from "../components/projects/RegionPiaChart";
import IndiaTable from "../components/projects/IndiaTable";
import { getIndiaData } from "../actions/pages/pagesAction";

class IndiaPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
    console.log("PROPS============INDIA", this.props.india);
    console.log("STATE============INDIA", this.state);
  }
  render() {
    console.log("PROPS", this.props.india);
    console.log("STATE", this.state);
    return (<div class="project-container">
      {/* <IndiaBars india={this.state.india} /> */}
      {/* <RegionPiaChart projects={this.props.india} />*/}
      <IndiaTable india={this.props.india} />
    </div>)
  }
}

IndiaPage.PropTypes = {
  india: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    india: state.india,
  }
}
export default connect(mapStateToProps, getIndiaData)(IndiaPage);

// export default connect(mapStateToProps)(IndiaPage);