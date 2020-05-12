import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { bindActionCreators } from 'redux'
import ReactDOM from "react-dom"
import { Motion, spring } from 'react-motion';
import { TimelineMax } from "gsap";
import { TimelineLite, CSSPlugin } from "gsap/all";
import Popup from '../components/Popup';

import logo from '../../images/map.svg';
import jsonData from '../data.json'

// ...later
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { showPopup: false };
    this.logoContainer = null;
    this.logoTween = null;
    this.state = {
      selectValue: "US",
      craftSelectValue: "Select Country",
      summary: null,
      craftData: jsonData
    }
    this.craftHandleChange = this.craftHandleChange.bind(this);
  }
  // getInitialState() {
  //   return { selectValue: 'India' };
  // }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  componentDidMount() {
    this.logoTween = new TimelineLite({ paused: false }).from(this.logoContainer, 1, { y: 50, alpha: 0 })
    // this.setState({ selectValue: "India" })
  }

  componantDidUpdate(nextProps) { if (nextProps.pages.pages) { } }
  componantDidUpdate() {
    this.setState({ summary: this.props.pages.pages.summary });
    this.setState({ summary: this.props.pages.pages.summary });
  }
  latestSummery(data) {
    if (data) {
      return (<div className="status-container">
        <div className="city-container">
          <div className="single-city-container head">
            <div className="name">City Name</div>
            <div className="total">Total Cases</div>
            <div className="death">Death</div>
            <div className="recovered">Recoverd</div>
          </div>
          {this.craftRegionCities(data.name)}
        </div>
        <div id="result" >
          <div class="cases"><span class="count">{data.name}</span><span>Total Cases</span></div>
          <div class="cases"><span class="count">{data.total_cases}</span><span>Total Cases</span></div>
          <div class="deaths"><span class="count">{data.recovered}</span><span>Recovered</span></div>
          <div class="deaths"><span class="count">{data.deaths}</span><span>Deaths</span></div>
        </div>
      </div>)
    } else {
      return (<div className="status-container">
      <div id="result">
        <div class="cases"><span class="count">{this.state.craftData.data.summary.name}</span><span>World Cases</span></div>
        <div class="cases"><span class="count">{this.state.craftData.data.summary.total_cases}</span><span>Total Cases</span></div>
        <div class="deaths"><span class="count">{this.state.craftData.data.summary.recovered}</span><span>Recovered</span></div>
        <div class="deaths"><span class="count">{this.state.craftData.data.summary.deaths}</span><span>Deaths</span></div>
        </div>
      </div>)
    }
  }

  craftFilteredItems(state, newVal) {
    console.log("CRAFT STATE", state);
    let o = this.state.craftData.data.regions
    let rArray = Object.values(o)
    let sd = rArray.find(({ name }) => name === newVal);
    this.setState({ summary: sd });
    console.log("SD", sd);
  }

  craftRegions(craftData) {
    if (craftData.data.regions) {
      let allRegions = Object.values(craftData.data.regions);
      return allRegions.map((region, i) => {
        return (<option key={i}>{region.name}</option>)
      })
    }
  }
  craftRegionCities(regionName) {
    console.log("regionName", regionName);
    if (regionName) {
      let citiesObj = this.state.craftData.data.regions;
      let rArray = Object.values(citiesObj);
      let newSelectedRegionData = rArray.find(({ name }) => name === regionName);
      console.log(newSelectedRegionData.cities);
      let allCities = Object.values(newSelectedRegionData.cities);
      return allCities.map((citi, i) => {
        return (<div className="single-city-container" key={i}>
          <div className="name">{citi.name} </div>
          <div className="total">{citi.total_cases} </div>
          <div className="death">{citi.deaths} </div>
          <div className="recovered">{citi.recovered} </div>
        </div>)
      })
    }
  }
  craftHandleChange(e) {
    this.setState({ craftSelectValue: e.target.value });
    console.log("STATE 1:", this.state.craftSelectValue);
    this.craftFilteredItems(this.state, e.target.value)
    console.log("STATE 2 :", this.state.craftSelectValue);
  }

  render() {
    const { craftSelectValue, selectValue, summary } = this.state;
    return (<div class="home-container">
      <select
        value={craftSelectValue}
        onChange={this.craftHandleChange}
      ><option>Select Country</option>
        {this.craftRegions(this.state.craftData)}
      </select>
      {/* <div className="city-container">
        <div className="single-city-container">
          <div className="name">City Name</div>
          <div className="total">Total Cases</div>
          <div className="death">Death</div>
          <div className="recovered">Recoverd</div>
          <div className="tested">Tested</div>
        </div>
      </div> */}

      <div class="my-name" ref={ss => this.logoContainer = ss}>
        <div class="map-container">
          <img class="map" src="https://craftww-india.co.in/Corona_tracker/images/b236c03d60d0ed87f8a8f3af02fd6d0a.svg" alt="logo" />
        </div>
      </div>
      {this.latestSummery(summary)}
    </div>)
  }
}

HomePage.PropTypes = {
  pages: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    pages: state.pages,
  }
}

export default connect(mapStateToProps)(HomePage);