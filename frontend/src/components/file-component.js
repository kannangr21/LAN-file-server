import React, { useState } from "react";
import axios from "axios";

function FilesUploadComponent() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [folderName, setFolderName] = useState([]);

  const handleFolderName = (e) => {
    e.preventDefault();
    const folder = e.target.value;
    setFolderName(folder);
  };

  const handleFileChange = (e) => {
    e.preventDefault();
    const files = Array.from(e.target.files);
    setSelectedFiles(files);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("folderName", folderName);
    selectedFiles.forEach((file) => {
      formData.append("", file);
    });

    let config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: "http://192.168.32.104:8000/upload",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    };
    formData.forEach((key, value) => {
      console.log(key, value);
    });
    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
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
          {selectedFiles.length > 0 && (
            <div>
              <p>Selected Files:</p>
              <ul>
                {selectedFiles.map((file, index) => (
                  <li key={index}>{file.name}</li>
                ))}
              </ul>
            </div>
          )}
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
