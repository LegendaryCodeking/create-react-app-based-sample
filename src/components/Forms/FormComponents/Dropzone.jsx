import React, { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import ExcelIcon from "../../../assets/images/Excel-icon.png";
import CsvIcon from "../../../assets/images/csv-icon.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import BasicAlert from "../../Alerts/BasicAlert";
import LoadingButton from "../../Buttons/LoadingButton";

const thumbsContainer = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  marginTop: 16,
};

const DataDropzone = ({ onUploadDocument }) => {
  const [files, setFiles] = useState([]);
  const [alert, setAlert] = useState({
    show: false,
    text: "",
    type: "",
  });

  const [uploadButtonDisabled, setUploadButtonDisabled] = useState(true);
  const [uploadLoading, setUploadLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: file.type === "text/csv" ? CsvIcon : ExcelIcon,
        })
      )
    );
    checkUploadStatus(acceptedFiles);
    onUploadDocument(acceptedFiles[0]);
  }, []);

  const { getRootProps, fileRejections, acceptedFiles, getInputProps } =
    useDropzone({
      accept: {
        "application/vnd.ms-excel": [],
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [],
        "text/csv": [],
      },
      multiple: false,
      onDrop: (acceptedFiles) => onDrop(acceptedFiles),
      maxFiles: 1,
    });

  const checkUploadStatus = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      setAlert({ show: false, text: "", type: "" });
      setUploadButtonDisabled(false);
    } else {
      setUploadButtonDisabled(true);
      setAlert({
        show: true,
        text: "File was not accepted, check the type and upload again.",
        type: "error",
      });
    }
  };
  const acceptedFileItems = acceptedFiles.map((file) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
    </li>
  ));

  const fileRejectionItems = fileRejections.map(({ file, errors }) => (
    <li key={file.path}>
      {file.path} - {file.size} bytes
      <ul>
        {errors.map((e) => (
          <li key={e.code}>{e.message}</li>
        ))}
      </ul>
    </li>
  ));

  const thumbs = files.map((file) => (
    <div
      key={file.path}
      className="bg-white shadow-md p-4 rounded-lg border border-gray-300"
    >
      <img
        src={file.preview}
        alt="Thumbnail"
        className="w-12 h-12 object-cover mb-2 rounded-lg"
        onLoad={() => {
          URL.revokeObjectURL(file.preview);
        }}
      />
      <p className="text-center text-gray-700 text-xs">{file.name}</p>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const clearFiles = () => {
    setFiles([]);
    setUploadButtonDisabled(true);
  };

  const submitFiles = () => {
    //e.preventDefault();
    console.log("submitting files...", files[0]);
  };

  return (
    <div className="">
      <div className="flex mt-2 text-white text-sm justify-between mx-auto">
        <div className="">Upload your excel or csv file</div>
        <span
          onClick={clearFiles}
          className="hover:font-bold text-red-500 hover:cursor-pointer"
        >
          <FontAwesomeIcon className="mr-1" icon={faTrashCan} /> Clear
        </span>
      </div>
      <div className={alert.show ? "my-4" : "hidden"}>
        <BasicAlert text={alert.text} type={alert.type} />
      </div>
      <div
        {...getRootProps()}
        className="px-4 py-12 border-2 border-dashed border-gray-300 rounded-lg mt-6"
      >
        <input {...getInputProps()} />
        {files.length > 0 ? (
          <aside style={thumbsContainer}>{thumbs}</aside>
        ) : (
          <p className="text-center text-gray-500">
            Drag 'n' drop some files here, or click to select files
          </p>
        )}
      </div>

      <div className="flex justify-end mt-6">
        <LoadingButton
          text="Next 1"
          onButtonClicked={submitFiles}
          icon="upload"
          className="py-2 px-4 float-right"
          disabled={uploadButtonDisabled}
          loading={uploadLoading}
          float="right"
        />
      </div>
    </div>
  );
};

export default DataDropzone;
