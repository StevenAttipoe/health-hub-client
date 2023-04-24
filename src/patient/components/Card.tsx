import React from 'react';

interface dataProp {
  name: string,
  value: number,
  unit: string
  bgColour: string,
  svgPaths: string[],
  viewBox: string
  colours:  string[]
}

export const Card: React.FC<dataProp> = ({name, value, unit, svgPaths, colours, bgColour, viewBox}) => {
  return (
    <div>
        <div className='h-20 w-fit flex flex-row justify-center space-x-2 border border-black rounded-3xl'>
            <div className= {bgColour + ' h-12 w-11 my-3  mx-3 flex items-center justify-center rounded-full'}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28px" height="28px" viewBox={viewBox} >
                {svgPaths.map((path, index) => (
                  <path 
                    key={index} d={path} fill={colours[index]}
                    />
                ))}
              </svg>
            </div>
            <div className='flex flex-col justify-center text-center px-3'>
              <h3>{value + " " +unit}</h3>
              <h5> {name} </h5>
            </div>
        </div>
    </div>
  );
}
