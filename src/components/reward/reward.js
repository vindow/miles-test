import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { remove } from '../../actions.js';

const Body = styled.div`
    flex-grow: 1;
    flex-basis: 0;
    height: 50px;
    border: 1px black solid;
`;

class Reward extends React.Component {
    constructor(props) {
        super(props);
    }

    remove = () => {
        this.props.dispatch(remove({rIndex: this.props.row, cIndex: this.props.col}));
    }

    onDragStart = (event) => {
        event.dataTransfer.setData("row", this.props.row);
        event.dataTransfer.setData("col", this.props.col);
    }

    render() { 
        return(
            <Body onDragStart={(event) => this.onDragStart(event)} draggable>
                R{this.props.row + 1}
                <button onClick={this.remove}>X</button>
            </Body>
        );
    }
}

function mapStateToProps(state) {
    return{

    };
}

export default connect(mapStateToProps)(Reward);