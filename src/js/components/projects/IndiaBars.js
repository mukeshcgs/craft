import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, Route } from "react-router-dom"

import { TweenMax, Power2, TimelineLite, CSSPlugin } from "gsap/all";
import LoadingSpinner from '../loadingSpinner'

class IndiaBars extends Component {
    constructor(props) {
        super(props);
        this.state = { disAmount: 5 }
    }
    avrRegionsBars(data) {
        if (data.india) {
            var bb = data.india.splice(0, 30);
            var sorted = bb.sort(function (a, b) { return b.cases - a.cases });
            var sorted = sorted.splice(0, 10);

            let xyz = [];
            for (var i = 0; i < sorted.length; i++) {
                let a = sorted[i].cases
                let b = 100;
                let c = 96169;
                let avr = Math.round((a * b) / c)
                xyz.push(<div class="avr" key={i} >
                    <div style={{ height: 10 * (avr) }}>
                        <span className="c-name">{sorted[i].name}</span>
                        <span className="c-per">{avr}%</span>
                    </div>
                </div>);
            }
            return data.india ? xyz : < LoadingSpinner />
        }
    }

    render() {
        const { disAmount } = this.state;
        return (<div class="project-list-container" >
            <div class="page-heading">Virus cases by country</div>
            {/* <p>Increase in cases over past 24 hours — top {disAmount} countries</p> */}
            <section className="graph india">
                {this.avrRegionsBars(this.props.india)}
            </section>
        </div>)
    }
}

IndiaBars.PropTypes = { india: PropTypes.array.isRequired, };

function mapStateToProps(state) { return { india: state.india } }

export default connect(mapStateToProps)(IndiaBars);
