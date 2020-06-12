import React from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { remove } from '../../actions.js';

const Body = styled.div`
    flex-basis: 16.67%;
    border: 1px gray solid;
    margin: 10px;
`;

const Dummy = styled.div`
    height: 0;
    padding-bottom: 100%;
    position: relative;
`;

const Close = styled.button`
    background-color: white;
    border: none;
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 8px;
    color: gray;
`;

const Name = styled.div`
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 200%;
    color: gray;
`;

class Reward extends React.Component {

    remove = () => {
        this.props.dispatch(remove({rIndex: this.props.row, cIndex: this.props.col}));
    }

    onDragStart = (event) => {
        event.dataTransfer.setData("row", this.props.row);
        event.dataTransfer.setData("col", this.props.col);
    }

    render() { 
        let button = <div></div>
        if (this.props.col !== -1) {
            button = <Close onClick={this.remove}>X</Close>
        }
        return(
            <Body data-testid={"R"+this.props.row+"C"+this.props.col} onDragStart={(event) => this.onDragStart(event)} draggable>
                <Dummy>
                    <Name>R{this.props.row + 1}</Name>
                    {button}
                </Dummy>
            </Body>
        );
    }
}

function mapStateToProps(state) {
    return{

    };
}

export default connect(mapStateToProps)(Reward);