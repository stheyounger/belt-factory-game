import React, { useEffect, useRef, useState } from 'react';
import './App.css';

enum CellOccupant {
    Nothing,
    One
}
class GridCell {

  size = 10
  occupant: CellOccupant

  constructor (cellOccupant: CellOccupant) {
    this.occupant = cellOccupant
  }

  fillCell(column: number, row: number, color: string, context: CanvasRenderingContext2D) {
    
    const leftPosition = column * this.size
    const topPosition = row * this.size

    context.fillStyle = color
    context.fillRect(leftPosition, topPosition, leftPosition + this.size, topPosition + this.size)
  }
}

function App() {

  const canvasRef= useRef<HTMLCanvasElement | null>(null)

  function getGrid(gridSize: number): ReadonlyArray<ReadonlyArray<GridCell>> {
    return Array.from(Array(gridSize).keys()).map(()=>{
      return Array.from(Array(gridSize).keys()).map(()=>{
        return new GridCell(CellOccupant.Nothing)
      })
    })
  }
  const gridColumns = getGrid(10)

  useEffect(()=>{
    setInterval(()=>{
      if (canvasRef?.current != null){
        
        const context = canvasRef!.current!.getContext('2d')!;
        
        context.fillStyle = '#282c34'
        context.fillRect(0, 0, context.canvas.width, context.canvas.height)

        console.log(`gridColumns.length: ${gridColumns.length}`)
        console.log(`gridColumns[0].length: ${gridColumns[0].length}`)
        
        gridColumns.forEach((columnOfRows, columnNumber) => {
          console.log("hey")
          columnOfRows.forEach((cell, rowNumber) => {

            const changeCell = Math.random()
            if (changeCell < 0.005) {
              cell.occupant = CellOccupant.One
              console.log(`new assigned cell`)
            }
            console.log(`changeCell: ${changeCell}`)

            switch(cell.occupant) {
              case CellOccupant.Nothing:
                cell.fillCell(columnNumber, rowNumber, '#282c34', context)
                break
              case CellOccupant.One:
                cell.fillCell(columnNumber, rowNumber, '#2200a8', context)
                break
            }

          })
        });
      }
    }, 100)
  }, [])


  return (
    <div className="App">
        <canvas className="Canvas" ref={canvasRef}></canvas>
    </div>
  );
}

export default App;
