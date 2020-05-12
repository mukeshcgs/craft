import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, Route } from "react-router-dom"

import { TweenMax, Power2, TimelineLite, CSSPlugin } from "gsap/all";
import LoadingSpinner from '../loadingSpinner'

class RegionBars extends Component {
    constructor(props) {
        super(props);
        this.state = { disAmount: 10 }
        //CARDS
        this.cards = [];
        this.tl = new TimelineLite({ paused: true });
        this.cardsTween;
    }

    componentDidMount() {
        this.tl.staggerTo(this.cards, 0.5, { autoAlpha: 1, y: -20 }, 0.1);
    }
    componantDidUpdate(nextProps) {
        if (nextProps.pages.pages) {
            this.tl.staggerTo(this.cards, 0.5, { autoAlpha: 1, y: -20 }, 0.1);
        }
    }
    componantDidUpdate() {
        this.tl.staggerTo(this.cards, 0.5, { autoAlpha: 1, y: -20 }, 0.1);
    }

    avrRegionsBars(data) {
        if (data.pages.regions) {
            let dd = Object.values(data.pages.regions);
            let xyz = [];

            for (var i = 0; i < this.state.disAmount; i++) {
                var rmd = Math.floor((Math.random() * 100) + 1)
                let a = dd[i].total_cases
                let b = 100
                let c = data.pages.summary.total_cases
                let avr = Math.round((a * b) / c)
                xyz.push(<div class="avr" key={i} ref={div => this.cards[i] = div}>
                    <div style={{ height: 10 * (avr) }}>
                        <span className="c-name">{dd[i].name}</span>
                        <span className="c-per">{avr}%</span>

                    </div>
                </div>);
            }
            return data.pages.regions ? xyz : < LoadingSpinner />
        }
    }

    render() {
        const { disAmount } = this.state;
        return (<div class="project-list-container" >
            <div class="page-heading">Virus cases by country</div>
            {/* <p>Increase in cases over past 24 hours — top {disAmount} countries</p> */}
            <section className="graph">
                {this.avrRegionsBars(this.props.pages)}
            </section>
        </div>)
    }
}

RegionBars.PropTypes = { pages: PropTypes.array.isRequired, };

function mapStateToProps(state) { return { pages: state.pages } }

export default connect(mapStateToProps)(RegionBars);



