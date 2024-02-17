import React, { useState, useEffect } from "react";
import notifyError from "./Notifications";
import NewsCard from "./Newscard";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const NewsPage = () => {
  const [newsData, setNewsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // MUI Pagination uses 1-based indexing
  const itemsPerPage = 8; // Adjust as needed

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedData = localStorage.getItem("newsData");
        const storedDate = localStorage.getItem("newsDataDate");
        // console.log(storedData);
        const todayDate = new Date().toISOString().split("T")[0];
        var storedDataInJson = {};
        if (storedData) {
          storedDataInJson = JSON.parse(storedData).content;
        }

        if (storedData && todayDate === storedDate) {
          // console.log("data found");
          setNewsData(storedDataInJson);
          return;
        } else if (storedData && todayDate !== storedDate) {
          console.log(
            "Stored data exists but date has changed. Fetching new data..."
          );
          localStorage.removeItem("newsData"); // Remove stored news data
          localStorage.removeItem("newsDataDate"); // Remove stored date
        }

        const response = await fetch("http://localhost:3001/getnews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (response.ok) {
          const data = await response.json();
          // console.log(data);
          // console.log(data.news.content);

          setNewsData(data.news.content);
          localStorage.setItem("newsData", JSON.stringify(data.news));
          localStorage.setItem("newsDataDate", todayDate);
        } else {
          notifyError("Failed to fetch news data.");
        }
      } catch (error) {
        notifyError("hi");
        console.error("Error fetching news data from here :", error);
        notifyError(error);
      }
    };

    fetchData();
  }, []);

  // Calculate pagination variables
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = newsData.slice(indexOfFirstItem, indexOfLastItem);

  // Change page
  const handlePageChange = (event, value) => setCurrentPage(value);

  return (
    <div className="mt-8">
      <div
        className="news-container"
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-evenly", // Adjust as needed
          // padding: "25px",
        }}
      >
        {currentItems.map((newsItem, index) => (
          <NewsCard
            key={index}
            title={newsItem.title}
            author={newsItem.author}
            content={newsItem.content}
            date={newsItem.date}
            image={newsItem.image}
            link={newsItem.link}
          />
        ))}
      </div>
      <div
        style={{ textAlign: "center", marginTop: "20px", marginBottom: "60px" }}
      >
        <Stack spacing={2} direction="row" justifyContent="center" color="blue">
          <Pagination
            count={Math.ceil(newsData.length / itemsPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            sx={{
              "& .MuiPaginationItem-root.Mui-selected": {
                backgroundColor: "#2196f3", // Set color for selected page
                color: "#fff", // Text color for selected page
              },
              "& .MuiPaginationItem-root:hover": { backgroundColor: "#ccc" }, // Set color for hover
            }}
          />
        </Stack>
      </div>
    </div>
  );
};

export default NewsPage;
