import React, { useRef, useState } from "react";
import { PlusIcon, XIcon } from "@heroicons/react/solid";
import s from "./UploadImages.module.scss";
import { cloudinaryFunc } from "../../utils/cloudinary";

export const UploadTour = ({
  files,
  setFiles,
  create,
  setCreate,
  portadaImg,
  setPortadaImg,
}) => {
  // const [files, setFiles] = useState([]);

  console.log("FILES STATE UPLOAD", files, "length", files.length > 0);
  const [fileSize, setFileSize] = useState(true);
  const [filesLoading, setFilesLoading] = useState(false);

  const loadPortadaImg = async (e) => {
    const portadaUrl = await cloudinaryFunc(e.target.files[0]);
    setPortadaImg(portadaUrl);
  };

  const loadImg = async (e) => {
    setFilesLoading(true);
    const filesLoaded = Object.entries(e.target.files);

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
  const portadaInput = useRef();

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
        <div>
          <input type="text" placeholder="Tour Name" />
        </div>
        <div className={s.portada}>
          <label>Foto Portada</label>
          <div className={portadaImg ? s.portada_hover : ''}>
            <input
              style={{ display: "none" }}
              type="file"
              ref={portadaInput}
              onChange={(e) => loadPortadaImg(e)}
            />
            {portadaImg && <img src={portadaImg.img} alt={portadaImg.name} />}
            <button
              onClick={(e) => {
                e.preventDefault();
                portadaInput.current.click();
              }}
            >
              Click Aqui
            </button>
          </div>
        </div>
      </form>
      <div className={s.images_container}>
        <div className={s.div_title}>
          <p>Fotos 360</p>
          <button
            onClick={(e) => {
              e.preventDefault();
              fileInput.current.click();
            }}
          >
            {/* Elegir Archivos */}
            <PlusIcon className={s.plus_icon} />
          </button>
        </div>
        <div className={s.card_container}>
          {files.length > 0 &&
            files.map((file, i) => (
              <div key={i} className={s.image_card}>
                <img src={file.img} alt={file.name} />
                <p>{file.name.split(".")[0]}</p>
                <button onClick={() => handleDeleteImg(file.name)}>
                  <XIcon className={s.x_icon} />
                </button>
              </div>
            ))}
        </div>
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
