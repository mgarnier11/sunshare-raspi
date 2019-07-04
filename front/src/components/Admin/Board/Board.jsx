import React from 'react';
import { BoardSquare } from './BoardSquare';

const Board = () => (
  <div className="board">
    {[...Array(10)].map((n, x) => {
      return [...Array(10)].map((n, y) => {
        return <BoardSquare x={x} y={y} />;
      });
    })}
  </div>
);

export default Board;
