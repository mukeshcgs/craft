import React from "react"
import { connect } from "react-redux"
import { BrowserRouter as Router, HashRouter, Route, Switch, Link, Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import Footer from '../components/footer';
import { bindActionCreators } from 'redux'

import HomePage from '../pages/homepage';
import AboutMePage from '../pages/aboutmepage';
import ProjectsPage from '../pages/projectspage';
import IndiaPage from '../pages/indiapage';
import ProjectPage from '../pages/projectpage';
import ContactPage from '../pages/contactpage';
import PageNotFound from '../pages/PageNotFound'
import browserHistory from 'react-router-dom'
import AboutPage from '../pages/aboutpage';
import { TimelineLite, CSSPlugin } from "gsap/all";
import { getPages, getIndiaData } from "../actions/pages/pagesAction";

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  buildRoutes(data) {
    return data.pages.map((page, i) => {
      return (
        <Route
          key={i}
          component={data.pages.slug}
          path={`/${page.slug}`}
          exact
        />
      )
    })
  }

  filteredItems(state) {
    const { selectValue } = this.state;
    let o = this.props.pages.pages.regions
    let rArray = Object.values(o)

    let sd = rArray.find(({ name }) => name === selectValue);
  }

  handleChange(e) {
    this.setState({ selectValue: e.target.value });
    let newRegionData = this.filteredItems(this.state, this.state.selectValue)
    console.log("newRegionData", this.state.selectValue);
  }

  render() {
    const { pages, isFetching } = this.props;
    if (isFetching) {
      return (<h1>Loading....</h1>)
    }

    // return <Router basename="/Corona_tracker">
    return <Router>
      <div id="mukesh" >
        <Navbar ref={img => this.logoContainer = img} />
        {/* <Sidebar /> */}
        <Route path="/" component={ProjectsPage} exact />
        <Route path="/statistics" component={ProjectsPage} exact />
        {/* <Route path="/me" component={AboutMePage} exact /> */}
        {/* <Route path="/statistics" component={ProjectsPage} exact projects={this.props.pages} /> */}
        {/* <Route path="/:slug" component={ProjectPage} /> */}
        <Route path="/information" component={ContactPage} exact />
        <Route path="/india" component={IndiaPage} exact india={this.props.india} />
        {/* <Route path="*" component={PageNotFound} /> */}
        {/* {this.buildRoutes(this.props.pages)} */}
        <Footer />
        {/* {this.props.pages.summary.total_cases} */}
      </div>
    </Router>
  }
}

App.PropTypes = {
  pages: PropTypes.array.isRequired,
  getPages: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    pages: state.pages,
  }
}

export default connect(mapStateToProps, getPages)(App);

// function mapStateToProps(state) {
//   return { pages: state.pages }
// }
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({}, dispatch)
// }

// export default connect(mapStateToProps, mapDispatchToProps)(App);