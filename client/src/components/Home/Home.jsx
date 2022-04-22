import React, { useState } from "react";
import { CreateTour } from "../CreateTour/CreateTour";
import { UploadTour } from "../UploadImages/UploadImages";
import PanellumReact from "./PanellumReact";

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
      <h1>VIRTUAL 360 TOUR</h1>
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
        <CreateTour
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
