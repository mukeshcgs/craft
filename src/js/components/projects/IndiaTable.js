import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link, Route } from "react-router-dom"
import { TweenMax, Power2, TimelineLite } from "gsap";
import LoadingSpinner from '../loadingSpinner'

class IndiaTable extends Component {
    constructor(props) {
        super(props);
        this.state = { disAmount: 10 }
    }
    indiaTable(data) {
        console.log("DATA", data);
        if (data.india) {
            var bb = data.india.splice(0, 30);
            var sortedTbl = bb.sort(function (a, b) { return b.cases - a.cases });
            var sortedTbl = sortedTbl.splice(0, 10);

            let xyz = [];
            for (var i = 0; i < sortedTbl.length; i++) {
                xyz.push(<div class="info-row" key={i}>
                    <div> {sortedTbl[i].name} </div>
                    <div> {sortedTbl[i].cases} </div>
                    <div> {sortedTbl[i].recovered} </div>
                    <div> {sortedTbl[i].deaths} </div>
                </div>);
            }
            return data.india ? xyz : < LoadingSpinner />
        }
    }

    render() {
        const { disAmount } = this.state;

        return (<div class="project-list-container" >
            <div class="page-heading">Virus cases by States in India</div>
            {/* <p>Increase in cases over past 24 hours — top {disAmount} countries</p> */}
            <section class="region-tbl">
                <div className="info-tbl">
                    <div class="info-row head">
                        <div>State</div>
                        <div>Cases</div>
                        <div>Recovered</div>
                        <div>Deaths</div>
                    </div>
                    {this.indiaTable(this.props.india)}
                </div>
            </section>
        </div>)
    }
}

IndiaTable.PropTypes = { india: PropTypes.array.isRequired, };

function mapStateToProps(state) { return { india: state.india } }

export default connect(mapStateToProps)(IndiaTable);



