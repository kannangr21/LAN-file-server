import React, { useState } from "react";
import axios from "axios";

function FilesUploadComponent() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [folderName, setFolderName] = useState([]);

  const handleFolderName = (e) => {
    const folder = e.target.value;
    setFolderName(folder);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleUpload = async () => {
    console.log(selectedFiles);
    const formData = new FormData();
    formData.append("folderName", folderName);
    selectedFiles.forEach((file) => {
      formData.append("", file);
    });
    const response = await axios.post(
      "http://IP-ADDRESS-HERE:8000/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    // fetch("http://IP-ADDRESS-HERE:8000/upload", {
    //   method: "POST",
    //   body: formData,
    // }).then((response) => {
    //   console.log(response);
    // });

    try {
    } catch (error) {
      console.error("Error in uploading files:", error);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <form>
          <h3 className="p-5">
            Local Area Network (LAN) <br /> Storage Server
          </h3>
          <div className="form-group">
            <input
              className="form-control my-5"
              type="text"
              name="folderName"
              placeholder="Enter Folder Name"
              onChange={handleFolderName}
            />
          </div>
          <div className="form-group">
            <input type="file" multiple onChange={handleFileChange} />
          </div>
          <div className="form-group">
            <button
              className="btn btn-primary"
              type="submit"
              onClick={handleUpload}
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FilesUploadComponent;
