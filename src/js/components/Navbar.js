import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from "react-redux"
import { Link, BrowserRouter as Router, Route, Switch } from "react-router-dom"
import ReactDOM from "react-dom"
import { TimelineLite, CSSPlugin } from "gsap/all";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.logoContainer = null;
    this.logoTween = null;
    this.state = {
      isOn: false,
      isToggleOn: true
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
  }
  componentDidMount() {
    this.logoTween = new TimelineLite({ paused: false }).from(this.logoContainer, 1, { y: -50, alpha: 0 })
  }
  componantDidUpdate(nextProps) {
    if (nextProps.pages.pages) { }
  }
  componantDidUpdate() { }
  createListItems(data) {
    return data.pages.filter(page => {
      return page.parent === 0
    }).map((page, i) => {
      return (<li class="fade-in" key={page.id}>
        <Link to={"/" + page.slug} >{page.slug}</Link>
      </li>)
    })
  }
  render() {

    return (<div class="navigation" ref={ss => this.logoContainer = ss} >
      <div className="logo">
        COVID-19
      </div>
      <div id="threeLines" onClick={this.handleClick} class={this.state.isToggleOn ? ' ' : 'active'} >
        <button id="el" ></button>
      </div>
      <ul class={this.state.isToggleOn ? 'closed' : 'open'}>
        <li onClick={this.handleClick}><Link to={"/information"} >INFO</Link></li>
        <li onClick={this.handleClick}><Link to={"/"} >CORONA TRACKER</Link></li>
        <li onClick={this.handleClick}><Link to={"/statistics"} >STATS</Link></li>
        <li onClick={this.handleClick}><Link to={"/india"} >INDIA</Link></li>
        {/* <li className="logo">
          <Link to={"/"} ></Link>
        </li> */}
        {/* <li><Link to={"/home"} >HOME</Link></li>
        <li><Link to={"/me"} >ME</Link></li> */}
      </ul>
      {/* <ul >{this.createListItems(this.props.pages)}</ul> */}
    </div>)
  }
}


Navbar.PropTypes = {
  pages: PropTypes.array.isRequired,
};

function mapStateToProps(state) {
  return {
    pages: state.pages
  }
}

export default connect(mapStateToProps)(Navbar);