import React from "react";
import FileUpload from "../components/FileUpload";

const Home = () => {
  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Upload your UPI CSV</h1>
      <FileUpload />
    </div>
  );
};

export default Home;
