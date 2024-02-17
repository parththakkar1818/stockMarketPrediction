import React from "react"
import { Link } from "react-router-dom";

const predictButton = ({ startDate=[], endDate=[],selectedStock=[], stockData=[]}) => {
    // console.log("from button",selectedStock.symbol);
    return (
        <div>
            <button className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-12">
                {/* <Link to={`/predictstock/${startDate}/${endDate}/${selectedStock.symbol}`}>Predict my Stock</Link> */}
                <Link
                    to="/predict"
                    state={{stockData:stockData , startDate:startDate , endDate:endDate , stockSymbol:selectedStock.symbol , stockName: selectedStock.name}}
                >
                    Predict My Stock
                </Link>
            </button> 
        </div>
    );
          
}

export default predictButton;
