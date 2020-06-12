import React from 'react';
import { connect } from 'react-redux';
import Reward from '../reward/reward.js';
import styled from 'styled-components';
import { undo, redo, remove, add, save } from '../../actions.js';

const Container = styled.div`
    width: 50%;
    margin: auto;
`;

const TableContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const ButtonRow = styled.div`
    display: flex;
    justify-content: space-between;
`;

const UndoRedoWrapper = styled.div`
    display: flex;
`;

const Button = styled.button`
    border: none;
    background-color: #cfcfcf;
    margin: 5px 10px;
    width: 75px;
    height: 25px;
    &:disabled {
        background-color: #eeeeee;
        color: #aaaaaa;
    }
`;

const Row = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const EmptyElement = styled.div`
    flex-basis: 16.67%;
    margin: 11px;
`;

const EmptyElementDummy = styled.div`
    height: 0;
    padding-bottom: 100%;
`;

const HeaderSmall = styled.div`
    flex-basis: 16.67%;
    margin: 10px;
    padding-bottom: 10px;
    text-align: center;
    border-bottom: 1px solid gray;
`;

const EmptyHeader = styled.div`
    flex-basis: 16.67%;
    margin: 10px;
`;

const HeaderLarge = styled.div`
    text-align: center;
    flex-basis: calc(83.33% + 100px);
    box-sizing: border-box;
    margin: 10px;
    border-bottom: 1px solid gray;
`;

const Line = styled.div`
    border-left: 1px solid gray;
`;

class Table extends React.Component {

    createHeader = () => {
        let header = [];
        header.push(
            <Row key={0}>
                <HeaderSmall>Rewards</HeaderSmall>
                <Line/>
                <HeaderLarge>Categories</HeaderLarge>
                <Line/>
            </Row>
        );
        header.push(
            <Row key={1}> 
                <EmptyHeader></EmptyHeader>
                <Line/>
                <HeaderSmall>C1</HeaderSmall>
                <Line/>
                <HeaderSmall>C2</HeaderSmall>
                <Line/>
                <HeaderSmall>C3</HeaderSmall>
                <Line/>
                <HeaderSmall>C4</HeaderSmall>
                <Line/>
                <HeaderSmall>C5</HeaderSmall>
                <Line/>
            </Row>
        );
        return header;
    }

    onDrop = (e, row, col) => {
        let oldRow = e.dataTransfer.getData("row");
        let oldCol = e.dataTransfer.getData("col");
        if (row == oldRow) {
            if (oldCol !== -1) {
                this.props.dispatch(remove({rIndex: oldRow, cIndex: oldCol}));
            }
            this.props.dispatch(add({rIndex: row, cIndex: col}));
        }
    }

    onDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    }

    createTableRow = (rowNum) => {
        let row = [];
        row.push(<Reward key={-1} row={rowNum} col={-1}></Reward>);
        row.push(<Line key={"line"}></Line>)
        for (let i = 0; i < 5; i++) {
            if (this.props.rewards[rowNum][i]) {
                row.push(<Reward row={rowNum} col={i} key={i}></Reward>);
            } else {
                row.push(<EmptyElement data-testid={"R"+rowNum+"C"+i} onDragOver={(e) => this.onDragOver(e, rowNum)} onDrop={(e) => this.onDrop(e, rowNum, i)}key={i}><EmptyElementDummy/></EmptyElement>)
            }
            row.push(<Line key={"line" + i}></Line>);
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
        this.props.dispatch(save());
    }

    render() { 
        return(
            <Container>
                <ButtonRow>
                    <UndoRedoWrapper>
                        <Button onClick={this.undo} disabled={this.props.undoStates.length === 0}>Undo</Button>
                        <Button onClick={this.redo} disabled={this.props.redoStates.length === 0}>Redo</Button>
                    </UndoRedoWrapper>
                    <Button onClick={this.save} disabled={this.props.saved}>{this.props.saved ? "Saved" : "Save"}</Button>
                </ButtonRow>
                <TableContainer>
                    {this.createHeader()}
                    {this.createTableBody()}
                </TableContainer>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    return{
        rewards : state.rewards,
        undoStates : state.undoStates,
        redoStates : state.redoStates,
        saved: state.saved
    };
}

export default connect(mapStateToProps)(Table);