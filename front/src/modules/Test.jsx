import React from 'react';
import { useDrag } from 'react-dnd';

/**
 * Your Component
 */
export default function Card({ text = 'test' }) {
  return (
    <div>
      {text}
    </div>
  );
}
