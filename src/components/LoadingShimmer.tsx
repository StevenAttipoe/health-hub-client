import React from 'react';

type LoadingShimmerProps = {
  rows: number;
  columns: number;
};

const LoadingShimmer: React.FC<LoadingShimmerProps> = ({ rows, columns }) => {
  return (
    <table className="min-w-full divide-y divide-gray-200 animate-pulse">
            <thead className="bg-gray-50">
        <tr>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Surname
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            First Names
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Date of Birth
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Height
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Nationality
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Personal ID Number
          </th>
          <th
            scope="col"
            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
          >
            Sex
          </th>
          <th scope="col" className="relative px-6 py-3">
            <span className="sr-only">Details</span>
          </th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {Array.from({ length: rows }).map((_, index) => (
          <tr key={index}>
            {Array.from({ length: columns }).map((_, index) => (
              <td
                key={index}
                className="px-6 py-4 whitespace-nowrap"
              >
                <div className="w-16 h-5 bg-gray-400 rounded-sm">&nbsp;</div>
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default LoadingShimmer;
