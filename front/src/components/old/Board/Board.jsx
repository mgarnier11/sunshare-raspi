import React from 'react';
import { BoardSquare } from './BoardSquare';

const Board = () => (
  <div className="board">
    {[...Array(5)].map((n, x) => {
      return [...Array(5)].map((n, y) => {
        return <BoardSquare x={x} y={y} />;
      });
    })}
  </div>
);

export default Board;
