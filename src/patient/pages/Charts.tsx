import React, {useState} from 'react'
// import AreaChart from '../components/AreaChart';
// import BarGraph from '../components/BarChart';


// export const Charts = () => {
//     const [isOpen, setIsOpen] = useState<string | null>(null);

//   return (
//     <div>
//         <div className="grid grid-cols-2 grid-rows-2 grid-flow-col gap-10 p-10">
//             <div className='border-8 border-white rounded-lg'>
//                 <div className='flex flex-row relative'>
//                     <div className='flex items-center h-16 w-full justify-center bg-white'>
//                         Blood rate
//                     </div>
//                     <button onClick={() => setIsOpen(isOpen === 'graph1' ? null : 'graph1')} className="w-12 bg-white">
//                         <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path fill-rule="evenodd" d="M6 12a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 11-4 0 2 2 0 014 0zm6 2a2 2 0 100-4 2 2 0 000 4z"/>
//                         </svg>
//                     </button>
//                     {isOpen === 'graph1' && (
//                         <div className="mt-11 absolute bg-white rounded-lg shadow-xl right-0">
//                             <ul className="list-reset">
//                                 <li className="py-2 px-4">More</li>
//                             </ul>
//                         </div>
//                     )}
//                 </div>

//                 <div className='bg-white'>
//                     {/* <AreaChart/> */}
//                 </div>
//             </div>

//             <div className='border-8 border-white rounded-lg'>
//                 <div className='flex flex-row relative'>
//                     <div className='flex items-center h-16 w-full justify-center bg-white'>
//                         Pulse rate
//                     </div>
//                     <button onClick={() => setIsOpen(isOpen === 'graph2' ? null : 'graph2')} className="w-12 bg-white">
//                         <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path fill-rule="evenodd" d="M6 12a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 11-4 0 2 2 0 014 0zm6 2a2 2 0 100-4 2 2 0 000 4z"/>
//                         </svg>
//                     </button>
//                     {isOpen === 'graph2' && (
//                         <div className="mt-11 absolute bg-white rounded-lg shadow-xl right-0">
//                         <ul className="list-reset">
//                             <li className="py-2 px-4">More</li>
//                         </ul>
//                         </div>
//                     )}
//                 </div>
//                 <div className='bg-white'>
//                     <BarGraph/>
//                 </div>
//             </div>

//             <div className='border-8 border-white rounded-lg'>
//                 <div className='flex flex-row relative'>
//                     <div className='flex items-center h-16 w-full justify-center bg-white'>
//                         Glucose saturation
//                     </div>
//                     <button onClick={() => setIsOpen(isOpen === 'graph3' ? null : 'graph3')} className="w-12 bg-white">
//                         <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path fill-rule="evenodd" d="M6 12a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 11-4 0 2 2 0 014 0zm6 2a2 2 0 100-4 2 2 0 000 4z"/>
//                         </svg>
//                     </button>
//                     {isOpen === 'graph3' && (
//                         <div className="mt-11 absolute bg-white rounded-lg shadow-xl right-0">
//                         <ul className="list-reset">
//                             <li className="py-2 px-4">More</li>
//                         </ul>
//                         </div>
//                     )}
//                 </div>
//                 <div className='bg-white'>
//                     <BarGraph/>
//                 </div>
//             </div>

//             <div className='border-8 border-white rounded-lg'>
//                 <div className='flex flex-row relative'>
//                     <div className='flex items-center h-16 w-full justify-center bg-white'>
//                         Blood pressure
//                     </div>
//                     <button onClick={() => setIsOpen(isOpen === 'graph4' ? null : 'graph4')} className="w-12 bg-white">
//                         <svg width="24px" height="24px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
//                             <path fill-rule="evenodd" d="M6 12a2 2 0 11-4 0 2 2 0 014 0zm8 0a2 2 0 11-4 0 2 2 0 014 0zm6 2a2 2 0 100-4 2 2 0 000 4z"/>
//                         </svg>
//                     </button>
//                     {isOpen === 'graph4' && (
//                         <div className="mt-11 absolute bg-white rounded-lg shadow-xl right-0">
//                         <ul className="list-reset">
//                             <li className="py-2 px-4">More</li>
//                         </ul>
//                         </div>
//                     )}
//                 </div>
//                 <div className='bg-white'>
//                     {/* <AreaChart/> */}
//                 </div>
//             </div>
//         </div>
//     </div>
//   )
// }
