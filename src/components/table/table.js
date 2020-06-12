import React from 'react';
import { connect } from 'react-redux';
import Reward from '../reward/reward.js';
import styled from 'styled-components';
import { undo, redo, remove, add } from '../../actions.js';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 70%;
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    flex-grow: 1;
    flex-basis: 0;
`;

const EmptyElement = styled.div`
    flex-grow: 1;
    flex-basis: 0;
    height: 50px;
    border: 1px solid black;
`;

const HeaderSmall = styled.div`
    flex-grow: 1;
    flex-basis: 0;
`;

const HeaderLarge = styled.div`
    text-align: center;
    flex-grow: 5;
    flex-basis: 0;
`;

class Table extends React.Component {
    constructor(props) {
        super(props);
    }

    createHeader = () => {
        let header = [];
        header.push(
            <Row key={0}>
                <HeaderSmall>Rewards</HeaderSmall>
                <HeaderLarge>Categories</HeaderLarge>
            </Row>
        );
        header.push(
            <Row key={1}> 
                <HeaderSmall></HeaderSmall>
                <HeaderSmall>C1</HeaderSmall>
                <HeaderSmall>C2</HeaderSmall>
                <HeaderSmall>C3</HeaderSmall>
                <HeaderSmall>C4</HeaderSmall>
                <HeaderSmall>C5</HeaderSmall>
            </Row>
        );
        return header;
    }

    onDrop = (e, row, col) => {
        let oldRow = e.dataTransfer.getData("row");
        let oldCol = e.dataTransfer.getData("col");
        if (row == oldRow) {
            this.props.dispatch(remove({rIndex: oldRow, cIndex: oldCol}));
            this.props.dispatch(add({rIndex: row, cIndex: col}));
        }
    }

    onDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    createTableRow = (rowNum) => {
        let row = [];
        row.push(<HeaderSmall key={-1}>R{rowNum}</HeaderSmall>);
        for (let i = 0; i < 5; i++) {
            if (this.props.rewards[rowNum][i]) {
                row.push(<Reward row={rowNum} col={i} key={i}></Reward>);
            } else {
                row.push(<EmptyElement onDragOver={(e) => this.onDragOver(e, rowNum)} onDrop={(e) => this.onDrop(e, rowNum, i)}key={i}></EmptyElement>)
            }
        }
        return row;
    }

    createTableBody = () => {
        let body = [];
        for (let i = 0; i < 5; i++) {
            body.push(<Row key={i}>{this.createTableRow(i)}</Row>);
        }
        return body;
    }

    undo = () => {
        this.props.dispatch(undo());
    }

    redo = () => {
        this.props.dispatch(redo());
    }

    save = () => {
        localStorage.setItem("react.miles.test.rewards", JSON.stringify(this.props.rewards));
    }

    render() { 
        return(
            <div>
                <button onClick={this.undo} disabled={this.props.undoStates.length === 0}>undo</button>
                <button onClick={this.redo} disabled={this.props.redoStates.length === 0}>redo</button>
                <button onClick={this.save}>Save</button>
                <Container>
                    {this.createHeader()}
                    {this.createTableBody()}
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return{
        rewards : state.rewards,
        undoStates : state.undoStates,
        redoStates : state.redoStates
    };
}

export default connect(mapStateToProps)(Table);