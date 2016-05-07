import React, { PropTypes } from 'react';
import Poll from './Poll';
import { connect } from 'react-redux';


const List = ({ polls })=> (
    <ul className="polls">
        { polls.map((poll)=> <Poll key={poll._id} {...poll}/>) }
    </ul>
);

const PollList = connect(
    //mapStateToProps
    (state)=> ({ polls: state.polls })
    //mapDispatchToProps
    // ()=> {
        
    // }

)(
    List
);


export default PollList;