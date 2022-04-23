import React, { useEffect, useRef, useState } from "react";
import { Pannellum } from "pannellum-react";
import s from "./LinkPhotos.module.scss";

export const LinkPhotos = ({
  files,
  scene,
  setScene,
  sceneName,
  setCreate,
  setViewTour,
}) => {
  const hotspotIcon = (hotSpotDiv) => {
    const image = document.createElement("img");
    image.classList.add("image");
    image.setAttribute("width", "30");
    image.setAttribute("height", "30");
    image.setAttribute(
      "src",
      "https://img.icons8.com/material/4ac144/256/camera.png"
    );
    hotSpotDiv.appendChild(image);
  };

  const [yaw, setYaw] = useState(0);
  const [pitch, setPitch] = useState(0);
  const panImage = useRef(null);

  const [currentImg, setCurrentImg] = useState(0);

  console.log("SCENE CREATE TOUR", scene);
  console.log("CURRENT IMG", currentImg);

  useEffect(() => {
    const sceneFiles = files.map((img) => {
      return {
        name: img.name,
        sceneName,
        scenePanoImg: img.img,
        hotSpotsArr: [],
      };
    });
    setScene(sceneFiles);
  }, []);

  //   useEffect(() => {
  //     if (scene.length > 0) {
  //       setCurrentImg(scene[0]);
  //     }
  //   }, [scene]);

  const handleClickPhoto = (imgUrl, name) => {};

  const [selectImg, setSelectImg] = useState(false);

  const handleSelectImg = () => {
    setSelectImg(true);
  };

  const handleAddSpot = (imgName) => {
    const newScene = [...scene];

    const index = scene.map((img) => img.name).indexOf(imgName);

    newScene[currentImg].hotSpotsArr.push({
      pitch: pitch,
      yaw: yaw,
      transition: String(index),
    });

    setScene(newScene);
    setSelectImg(false);
  };

  const handleDone = () => {
    setCreate(false);
    setViewTour(true);
  };

  return (
    <div>
      <p className={s.title}>Link Photos</p>
      {scene.length > 0 && (
        <>
          <div className={s.list_and_photo}>
            <div>
              <Pannellum
                ref={panImage}
                width="100%"
                height="350px"
                image={scene[currentImg].scenePanoImg + "?resize=800%2C600"}
                pitch={10}
                yaw={180}
                hfov={110}
                autoLoad
                showZoomCtrl={false}
                onMouseup={(event) => {
                  setPitch(
                    panImage.current.getViewer().mouseEventToCoords(event)[0]
                  );
                  setYaw(
                    panImage.current.getViewer().mouseEventToCoords(event)[1]
                  );
                }}
              >
                {scene[currentImg].hotSpotsArr.map((hotSpot, i) => {
                  return (
                    <Pannellum.Hotspot
                      key={i}
                      type="custom"
                      pitch={hotSpot.pitch}
                      yaw={hotSpot.yaw}
                      tooltip={hotspotIcon}
                      handleClick={(evt, name) =>
                        setCurrentImg(hotSpot.transition)
                      }
                      name="image info"
                    />
                  );
                })}
              </Pannellum>
            </div>

            <div>
              {files.length > 0 &&
                files.map((file) => (
                  <p
                    key={file.name}
                    onClick={() => handleClickPhoto(file.img, file.name)}
                  >
                    {file.name}
                  </p>
                ))}
              <div>
                {pitch && <p>Pitch: {pitch}</p>}
                {yaw && <p>Yaw: {yaw}</p>}
              </div>
            </div>
          </div>
          <div className={s.link_photo}>
            <div></div>
            <div>
              <div>
                <button onClick={handleSelectImg}>Crear Enlace</button>
              </div>
              <div>
                {selectImg &&
                  files.length > 0 &&
                  files.map((file) => (
                    <p key={file.name} onClick={() => handleAddSpot(file.name)}>
                      {file.name}
                    </p>
                  ))}
              </div>
            </div>
          </div>
          <div className={s.btn_container_done}>
            <button onClick={handleDone}>Hecho</button>
          </div>
        </>
      )}
    </div>
  );
};
