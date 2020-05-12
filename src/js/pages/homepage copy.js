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

// ...later
class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = { showPopup: false };
    this.logoContainer = null;
    this.logoTween = null;
    this.state = {
      selectValue: "US",
      craftSelectValue: "India",
      summary: null,
      craftData: {
        "data": {
          "summary": {
            "total_cases": 4229731,
            "deaths": 285152,
            "recovered": 1512902,
            "tested": 44757489,
            
          },
          "regions": {
            "asia": {
              "name": "Asia",
              "total_cases": 1370999,
              "deaths": 80870,
              "recovered": 256910,
              "tested": 9469905,
              "cities": {
                "bangkok": {
                  "name": "Bangkok",
                  "total_cases": 224327,
                  "deaths": 32140,
                  "recovered": 1007,
                  "tested": 0,
                },
                "tokyo": {
                  "name": "Tokyo",
                  "total_cases": 224327,
                  "deaths": 32140,
                  "recovered": 1007,
                  "tested": 0,
                },
              }
            },
            "india": {
              "name": "Indai",
              "total_cases": 34,
              "deaths": 26744,
              "recovered": 5675,
              "tested": 675,
              "cities": {
                "mumbai": {
                  "name": "Mumbai",
                  "total_cases": 78546546,
                  "deaths": 5646656,
                  "recovered": 756767,
                  "tested": 0,
                },
                "delhi": {
                  "name": "Delhi",
                  "total_cases": 23256,
                  "deaths": 436578,
                  "recovered": 2343,
                  "tested": 0,
                },
              }
            },
            "north_amerika": {
              "name": "North Amerika",
              "total_cases": 224327,
              "deaths": 32140,
              "recovered": 1007,
              "tested": 0,
              "cities": {
                "boston": {
                  "name": "Boston",
                  "total_cases": 224327,
                  "deaths": 32140,
                  "recovered": 1007,
                  "tested": 0,
                },
                "newyork": {
                  "name": "New York",
                  "total_cases": 224327,
                  "deaths": 32140,
                  "recovered": 1007,
                  "tested": 0,
                },
              }
            },
          }
        }
      },
    }
    this.handleChange = this.handleChange.bind(this);
    this.craftHandleChange = this.craftHandleChange.bind(this);
  }
  togglePopup() {
    this.setState({
      showPopup: !this.state.showPopup
    });
  }
  componentDidMount() {
    this.logoTween = new TimelineLite({ paused: false }).from(this.logoContainer, 1, { y: 50, alpha: 0 })
    this.setState({ summary: this.props.pages.pages.summary });
  }
  componantDidUpdate(nextProps) { if (nextProps.pages.pages) { } }
  componantDidUpdate() { }
  latestSummery(data) {
    if (data) {
      return (<div id="result"  >
        <div class="cases"><span class="count">{data.name}</span><span>Total Cases</span></div>
        <div class="cases"><span class="count">{data.total_cases}</span><span>Total Cases</span></div>
        {/* <div class="recovered"><span class="count">{data.active_cases}</span><span>Active Cases</span></div> */}
        <div class="deaths"><span class="count">{data.recovered}</span><span>Recovered</span></div>
        <div class="deaths"><span class="count">{data.deaths}</span><span>Deaths</span></div>
      </div>)
    } else {
      return (<div>...</div>)
    }
  }
  filteredItems(state) {
    const { selectValue } = this.state;
    let o = this.props.pages.pages.regions
    let rArray = Object.values(o)
    let sd = rArray.find(({ name }) => name === selectValue);
    this.setState({ summary: sd });
    console.log("SD", sd);
  }

  craftFilteredItems(state) {
    console.log("CRAFT STATE", state);

    const { craftSelectValue } = this.state;
    let o = this.state.craftData.data.regions
    let rArray = Object.values(o)
    let sd = rArray.find(({ name }) => name === craftSelectValue);
    this.setState({ summary: sd });
    console.log("SD", sd);
  }
  latestRegions(data) {
    if (data.pages.regions) {
      let allRegions = Object.values(data.pages.regions);
      return allRegions.map((region, i) => {
        return (<option key={i}>{region.name}</option>)
      })
    }
  }
  craftRegions(craftData) {
    if (craftData.data.regions) {
      let allRegions = Object.values(craftData.data.regions);
      return allRegions.map((region, i) => {
        return (<option key={i}>{region.name}</option>)
      })
    }
  }

  craftHandleChange(e) {
    this.setState({ craftSelectValue: e.target.value });
    this.craftFilteredItems(this.state, this.state.craftSelectValue)
  }
  handleChange(e) {
    this.setState({ selectValue: e.target.value });
    this.filteredItems(this.state, this.state.selectValue)
  
  }

  render() {
    const { craftSelectValue, selectValue, summary } = this.state;
    var message = 'You selected :' + selectValue;
    return (<div class="home-container">
      <div class="my-name" ref={ss => this.logoContainer = ss}>
        {/* <h1>COVID<span>-</span>19</h1>
        <p>A data visualisation project</p> */}
        {/* <p>mukeshcgs<span>@</span>gmail.com</p> */}
        <div class="map-container">
          <img class="map" src={logo} alt="logo" />
        </div>
      </div>
      {/* <div>
        <div id="1">
          <button onClick={this.togglePopup.bind(this)}>Popup-1</button>
        </div>
        <div id="2">
          <button onClick={this.togglePopup.bind(this)}>Popup-2</button>
        </div>
        <div id="3">
          <button onClick={this.togglePopup.bind(this)}>Popup-3</button>
        </div>
      </div> */}
      {/* <button onClick={this.togglePopup.bind(this)}> Click To Launch Popup</button>

      {this.state.showPopup ?
        <Popup text='Click "Close Button" to hide popup' closePopup={this.togglePopup.bind(this)} />
        : null} */}
      <select
        value={craftSelectValue}
        onChange={this.craftHandleChange}
      >
        {this.craftRegions(this.state.craftData)}
      </select>
      {/* 
      <select
        value={selectValue}
        onChange={this.handleChange}
      >
        {this.latestRegions(this.props.pages)}
      </select>
      <p>{message}</p>
      */}

      {this.latestSummery(summary)}

    </div>)
  }
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(dispatch)
// }

// export default connect(mapDispatchToProps)(HomePage);

// function mapStateToProps(state) {
//   return {pages: state.pages}
// }
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({},dispatch)
// }
//  export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

HomePage.PropTypes = {
  pages: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    pages: state.pages,
  }
}

export default connect(mapStateToProps)(HomePage);