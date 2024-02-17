import React from "react";
import { formatDateString } from "./DateInput";
import * as XLSX from 'xlsx';
// import Papa from 'papaparse';

// import { saveAs } from 'file-saver';


const downloadStockData = (stockData) => {
  try {
    const ws = XLSX.utils.json_to_sheet(stockData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'StockData');

    // Instead of XLSX.write, we will use XLSX.writeFile
    XLSX.writeFile(wb, 'StockData.xlsx');
  } catch (error) {
    console.error('Error downloading stock data:', error);
  }
};
// const downloadStockData2 = (stockData) => {
//   try {
//     const csvContent = Papa.unparse(stockData, {
//       header: true, // Include headers in the CSV
//       quotes: true, // Add quotes around values
//     });

//     // Create a Blob with the CSV content
//     const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8' });

//     // Create a download link
//     const link = document.createElement('a');
//     link.href = window.URL.createObjectURL(blob);

//     // Set the download attribute and file name
//     link.setAttribute('download', 'StockData.csv');

//     // Append the link to the document
//     document.body.appendChild(link);

//     // Trigger the click event to start the download
//     link.click();

//     // Remove the link from the document
//     document.body.removeChild(link);
//   } catch (error) {
//     console.error('Error downloading stock data:', error);
//   }
// };


const StockDataTable = ({ stockData }) => {

  // console.log(stockData);

  if(!stockData){
    alert("No data found",stockData);
    return;
  }
  // console.log(stockData);

  const indexOfMaxHigh = stockData.reduce((maxIndex, currentValue, currentIndex, array) =>
    currentValue.high > array[maxIndex].high ? currentIndex : maxIndex, 0);

  const indexOfMinHigh = stockData.reduce((minIndex, currentValue, currentIndex, array) =>
    currentValue.high < array[minIndex].high ? currentIndex : minIndex, 0);

  return (
    <div>
        <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Stock Data Table</h2>
        <button
            // onClick={downloadStockData(stockData)}
            onClick={() => downloadStockData(stockData)} 
            className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
        >
            Download Data
        </button>
        </div>
        <div className="max-h-96 overflow-y-auto my-10">
        <table className="w-3/4 relative mx-auto my-5 text-sm text-left rtl:text-right text-gray-500 border border-collapse table-fixed">
            <thead>
            <tr>
                <th className="px-6 py-3 text-center rounded-tl-2xl rounded-tr border-b bg-gray-100 font-bold ">Sr. No</th>
                <th className="px-6 py-3 text-center border-b bg-gray-100 font-bold">Date</th>
                <th className="px-6 py-3 text-center border-b bg-gray-100 font-bold">Open</th>
                <th className="px-6 py-3 text-center border-b bg-gray-100 font-bold">High</th>
                <th className="px-6 py-3 text-center rounded-tr-2xl border-b bg-gray-100 font-semibold">Close</th>
            </tr>
            </thead>
            <tbody>
            {stockData?.map((item, index) => (
              <tr
                key={index}
                className={`hover:bg-gray-200 transition duration-300 ease-in-out ${
                  index === indexOfMaxHigh ? 'bg-green-300' : ''
                } ${index === indexOfMinHigh ? 'bg-red-300' : ''}`}
              >
                <td className="px-6 py-3 text-center border">{index + 1}</td>
                <td className="px-6 py-3 text-center border">{formatDateString(item.date)}</td>
                <td className="px-6 py-3 text-center border">{item.open?.toFixed(2)}</td>
                <td className="px-6 py-3 text-center border">{item.high?.toFixed(2)}</td>
                <td className="px-6 py-3 text-center border">{item.close?.toFixed(2)}</td>
              </tr>
            ))}

            </tbody>
        </table>
        </div>
    </div>
  );
};

export default StockDataTable;
