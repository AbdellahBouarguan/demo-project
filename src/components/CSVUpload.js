import React, { useState, useRef } from "react";
import Papa from "papaparse";

const CSVUpload = (params) => {
  const [uploading, setUploading] = useState(false);
  const inputRef = useRef();

  const handleUploadCSV = () => {
    setUploading(true);
    const input = inputRef.current;
    const reader = new FileReader();
    const file = input.files[0];

    reader.onloadend = (e) => {
      const csvData = Papa.parse(e.target.result, { header: true });
      //console.log(csvData.data,params);
      params.data(csvData.data);
      setUploading(false);
    };

    reader.readAsText(file);
  };

  return (
    <div>
      <input ref={inputRef} disabled={uploading} type="file" />
      <button onClick={handleUploadCSV} disabled={uploading}>
        {uploading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default CSVUpload;
