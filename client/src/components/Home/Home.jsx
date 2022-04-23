import React, { useState } from "react";
import { LinkPhotos } from "../LinkPhotos/LinkPhotos";
import { UploadTour } from "../UploadImages/UploadImages";
import PanellumReact from "./PanellumReact/PanellumReact";
import s from './Home.module.scss'

export const Home = ({ files, setFiles }) => {
  const [viewTour, setViewTour] = useState(false);
  const [sceneName, setSceneName] = useState("PRUEBA1");
  const [scene, setScene] = useState([]);
  const [portadaImg, setPortadaImg] = useState()

  console.log("SCENE", scene);
  console.log("PORTADA", portadaImg);


  const [create, setCreate] = useState(false);

  return (
    <div>
      <h2 className={s.title}>VIRTUAL 360 TOUR</h2>
      {viewTour && !create && (
        <PanellumReact
          scene={scene}
          setScene={setScene}
          setFiles={setFiles}
          setCreate={setCreate}
          setViewTour={setViewTour}
        />
      )}

      {!viewTour && !create && (
        <UploadTour
          files={files}
          setFiles={setFiles}
          create={create}
          setCreate={setCreate}
          portadaImg={portadaImg}
          setPortadaImg={setPortadaImg}
        />
      )}
      {create && (
        <LinkPhotos
          files={files}
          create={create}
          setCreate={setCreate}
          scene={scene}
          setScene={setScene}
          sceneName={sceneName}
          setViewTour={setViewTour}
        />
      )}
    </div>
  );
};
