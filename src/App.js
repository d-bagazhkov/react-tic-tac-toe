import React from 'react';

const ceilSize = '2.1rem';

export const App = () => (
    <div>
      <h1>Hello, null</h1>
      <Board/>
    </div>
);

class Board extends React.Component {

  state = {
    ceils: Array(9).fill(null),
    next: true
  }

  handleClick = (index) => {
    let ceils = this.state.ceils.slice();
    ceils[index] = this.state.next;
    if (gameWin(ceils)) {
      alert("You win!\n" + getSymbol(this.state.next))
      this.setState({ceils: Array(9).fill(null)})
    } else
      this.setState({ceils, next: !this.state.next})
  }

  render() {
    return (
        <div className="board">
          {this.state.ceils.map((ceil, index) =>
              <Ceil content={ceil} key={index} onClick={
                () => this.state.ceils[index] == null
                    ? this.handleClick(index)
                    : null
              }/>
          )}
        </div>
    );
  }

}

const Ceil = ({content, onClick}) => (
    <div style={{minWidth: ceilSize, minHeight: ceilSize}} className="ceil" onClick={onClick}>
      {getSymbol(content)}
    </div>
);

const getSymbol = (content) =>
    content === null
        ? ""
        : content ? "O" : "X";

const gameWin = (ceils) => {
  return winStore.some(winState =>
    ceils[winState[0]] === ceils[winState[1]]
      && ceils[winState[1]] === ceils[winState[2]]
      && ceils[winState[0]] !== null
      && ceils[winState[1]] !== null
      && ceils[winState[2]] !== null
  );
}

const winStore = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [2, 5, 8],
  [1, 4, 7],
  [0, 3, 6],
  [0, 4, 8],
  [2, 4, 6]
];