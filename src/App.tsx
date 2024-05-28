import { useState } from 'react';
import './App.css';

function App() {
  const [value, setValue] = useState<number>(3);
  const [color, setColor] = useState<number>(0);
  const [squareColors, setSquareColors] = useState<string[]>(Array(25).fill('bg-slate-700'));
  const [isMousePressed, setIsMousePressed] = useState<boolean>(false);

  const editValue = (e: number) => {
    if (value + e > 0 && value + e <= 25) {
      const newValue = value + e;
      setValue(newValue);
      setSquareColors(Array(newValue * newValue).fill('bg-slate-700'));
    }
  };

  const editColor = () => {
    setColor((prevColor) => (prevColor === 6 ? 0 : prevColor + 1));
  };

  const handleSquareClick = (index: number) => {
    const colors = ['bg-red-400', 'bg-blue-400', 'bg-yellow-400', 'bg-green-400', 'bg-black', 'bg-white', 'bg-slate-700'];
    setSquareColors((prevColors) => {
      const newColors = [...prevColors];
      newColors[index] = colors[color];
      return newColors;
    });
  };

  const handleMouseDown = (index: number) => {
    setIsMousePressed(true);
    handleSquareClick(index);
  };

  const handleMouseUp = () => {
    setIsMousePressed(false);
  };

  const handleMouseOver = (index: number) => {
    if (isMousePressed) {
      handleSquareClick(index);
    }
  };

  return (
    <div
      className='w-full h-[100dvh] flex lg:flex-row flex-col-reverse items-center justify-center gap-10 bg-slate-800'
      onMouseUp={handleMouseUp}
    >
      <div className='colors flex-1'></div>
      <div className='flex flex-col items-center justify-center gap-10'>
        <div
          className='square w-[75vmin] bg-slate-500 rounded-md grid gap-[1px] p-[2px]'
          style={{
            gridTemplateColumns: `repeat(${value}, 1fr)`,
            gridTemplateRows: `repeat(${value}, 1fr)`,
          }}
        >
          {Array.from({ length: value * value }).map((_, index) => (
            <button
              key={index}
              className={`aspect-square rounded-sm ${squareColors[index]}`}
              onMouseDown={() => handleMouseDown(index)}
              onMouseOver={() => handleMouseOver(index)}
            ></button>
          ))}
        </div>
        <div className='number-of-squares flex items-center justify-center w-max h-max gap-3'>
          <button onClick={() => editValue(-1)} className='fa-solid fa-minus text-slate-100 bg-slate-900 p-5 rounded-full'></button>
          <p className='flex-1 text-3xl text-white'>{value}</p>
          <button onClick={() => editValue(1)} className='fa-solid fa-plus text-slate-100 bg-slate-900 p-5 rounded-full'></button>
        </div>
      </div>
      <div className='colors flex-1 flex items-center justify-center'>
        <button onClick={() => editColor()} className='color aspect-square w-[10vmin] my-5 md:w-[5vmin] rounded-full border-white border-2 p-2'>
          <div className={`w-full h-full rounded-full ${color === 0 ? "bg-red-400" : color === 1 ? "bg-blue-400" : color === 2 ? "bg-yellow-400" : color === 3 ? 'bg-green-400' : color === 4 ? 'bg-black' : color === 5 ? 'bg-white' : color === 6 ? 'bg-slate-700' : ''}`}></div>
        </button>
      </div>
    </div>
  );
}

export default App;
