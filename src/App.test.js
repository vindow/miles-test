// counter.test.js
import React from 'react'
import { createStore } from 'redux'
// We're using our own custom render function and not RTL's render
// our custom utils also re-export everything from RTL
// so we can import fireEvent and screen here as well
import { render, fireEvent, screen } from './test-utils'
import '@testing-library/jest-dom/extend-expect'
import Table from './components/table/table.js'

test('can render with redux with defaults', () => {
    render(<Table />);
});

test('can render with redux with custom initial state', () => {
    render(<Table />, {
        initialState: { 
            rewards : [[true, false, false, false, false],
                        [true, true, false, false, false],
                        [false, false, true, false, false],
                        [false, false, false, true, false],
                        [false, false, false, false, true]],
            undoStates : [],
            redoStates : [],
            saved : true
        },
    });
});

test('can delete Reward', () => {
    render(<Table />, {
        initialState: { 
            rewards : [[true, false, false, false, true],
                        [false, true, false, false, false],
                        [false, false, true, false, false],
                        [false, true, false, true, false],
                        [false, false, false, true, false]],
            undoStates : [],
            redoStates : [],
            saved : true
        },
    });
    let rewards = screen.queryAllByText('X');
    fireEvent.click(rewards[0]);
    const buttons = screen.queryAllByText('X');
    expect(buttons).toHaveLength(6);
});

test('can delete multiple Rewards', () => {
    render(<Table />, {
        initialState: { 
            rewards : [[true, false, false, false, false],
                        [false, true, false, false, false],
                        [false, false, true, false, false],
                        [false, false, false, true, false],
                        [false, false, false, false, true]],
            undoStates : [],
            redoStates : [],
            saved : true
        },
    });
    let rewards = screen.queryAllByText('X');
    rewards.forEach(reward => fireEvent.click(reward));
    const buttons = screen.queryAllByText('X');
    expect(buttons).toHaveLength(0);
});

test('can undo', () => {
    render(<Table />, {
        initialState: { 
            rewards : [[true, false, false, false, false],
                        [false, true, false, false, false],
                        [false, false, true, false, false],
                        [false, false, false, true, false],
                        [false, false, false, false, true]],
            undoStates : [],
            redoStates : [],
            saved : true
        },
    });
    let rewards = screen.queryAllByText('X');
    fireEvent.click(rewards[0]);
    fireEvent.click(screen.getByText("Undo"));
    let buttons = screen.queryAllByText('X');
    expect(buttons).toHaveLength(5);
    fireEvent.click(rewards[0]);
    fireEvent.click(rewards[1]);
    fireEvent.click(screen.getByText("Undo"));
    fireEvent.click(screen.getByText("Undo"));
    buttons = screen.queryAllByText('X');
    expect(buttons).toHaveLength(5);
});

test('can redo', () => {
    render(<Table />, {
        initialState: { 
            rewards : [[true, false, false, false, false],
                        [false, true, false, false, false],
                        [false, false, true, false, false],
                        [false, false, false, true, false],
                        [false, false, false, false, true]],
            undoStates : [],
            redoStates : [],
            saved : true
        },
    });
    let rewards = screen.queryAllByText('X');
    fireEvent.click(rewards[0]);
    fireEvent.click(rewards[1]);
    fireEvent.click(screen.getByText("Undo"));
    fireEvent.click(screen.getByText("Undo"));
    fireEvent.click(screen.getByText("Redo"));
    fireEvent.click(screen.getByText("Redo"));
    const buttons = screen.queryAllByText('X');
    expect(buttons).toHaveLength(3);
});

test('can drag drop', () => {
    render(<Table />, {
        initialState: { 
            rewards : [[true, false, false, false, false],
                        [false, true, false, false, false],
                        [false, false, true, false, false],
                        [false, false, false, true, false],
                        [false, false, false, false, true]],
            undoStates : [],
            redoStates : [],
            saved : true
        },
    });
    fireEvent.drag(screen.getByTestId("R0C0"));
    fireEvent.dragEnd(screen.getByTestId("R0C1"));
    const result = screen.queryAllByText('R1');
    expect(result).toHaveLength(2);
});