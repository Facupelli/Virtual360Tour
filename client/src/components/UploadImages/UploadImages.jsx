import React, { useRef, useState } from "react";
import { PlusIcon, XIcon } from '@heroicons/react/solid'
import s from "./UploadImages.module.scss";

export const UploadTour = ({ files, setFiles, create, setCreate }) => {
  // const [files, setFiles] = useState([]);

  console.log("FILES STATE UPLOAD", files, "length", files.length > 0);
  const [fileSize, setFileSize] = useState(true);
  const [filesLoading, setFilesLoading] = useState(false);

  const loadImg = async (e) => {
    setFilesLoading(true);
    const filesLoaded = Object.entries(e.target.files);

    const cloudinaryFunc = async (file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append("file", file);
      // replace this with your upload preset name
      formData.append("upload_preset", "hn1tlyfq");
      const options = {
        method: "POST",
        body: formData,
      };

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dzjz8pe0y/image/upload",
          options
        );
        const res_1 = await res.json();
        return {
          name: file.name,
          size: file.size,
          type: file.type,
          img: res_1.secure_url,
        };
      } catch (err) {
        return console.log(err);
      }
    };

    const newObj = await Promise.all(
      filesLoaded.map((file) => cloudinaryFunc(file[1]))
    );
    // filesLoaded.map((file) => newObj.push(cloudinaryFunc(file[1])));
    setFilesLoading(false);
    setFiles(newObj);
  };

  const handleDeleteImg = (fileName) => {
    setFiles((prevState) => prevState.filter((file) => file.name !== fileName));
  };

  const handleClickCreate = () => {
    setCreate(true);
  };

  const fileInput = useRef();

  return (
    <div>
      <h2>Create Tour</h2>
      <form className={s.form}>
        <input
          style={{ display: "none" }}
          type="file"
          multiple
          onChange={(e) => loadImg(e)}
          ref={fileInput}
        />
        <button
          onClick={(e) => {
            e.preventDefault()
            fileInput.current.click();
          }}
        >
          {/* Elegir Archivos */}
          <PlusIcon className={s.plus_icon}/>
        </button>
      </form>
      <div className={s.images_container}>
        {files.length > 0 &&
          files.map((file, i) => (
            <div key={i}>
              <img
                src={file.img}
                alt={file.name}
              />
              <button onClick={() => handleDeleteImg(file.name)}><XIcon className={s.x_icon} /></button>
            </div>
          ))}
        {filesLoading && <div>Loading...</div>}
      </div>
      <div>
        <button disabled={!files.length > 0} onClick={handleClickCreate}>
          Crear Tour
        </button>
      </div>
    </div>
  );
};
