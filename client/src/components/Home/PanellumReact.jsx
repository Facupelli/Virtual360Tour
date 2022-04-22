import React from "react";
import { Pannellum } from "pannellum-react";
import scenesArray from "../../utils/scenesArray";

export default function PanellumReact({scene, setScene, setCreate, setViewTour, setFiles}) {
  const [currentScene, setCurrentScene] = React.useState(0);
  const [yaw, setYaw] = React.useState(0);
  const [pitch, setPitch] = React.useState(0);
  const [sceneImg, setSceneImg] = React.useState(
    scene[currentScene].scenePanoImg
  );
  const panImage = React.useRef(null);

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

  const handleCreateTour = () => {
    setScene([])
    setFiles([])
    setViewTour(false)
    setCreate(false)
  }

  return (  
    <>
      <div><button onClick={handleCreateTour}>Create Tour</button></div>
      <div> Pitch: {pitch} </div>
      <div> Yaw: {yaw} </div>
      <Pannellum
        ref={panImage}
        width="80%"
        height="500px"
        image={scene[currentScene].scenePanoImg + "?resize=800%2C600"}
        pitch={10}
        yaw={180}
        hfov={110}
        autoLoad
        showZoomCtrl={false}
        onMouseup={(event) => {
          setPitch(panImage.current.getViewer().mouseEventToCoords(event)[0]);
          setYaw(panImage.current.getViewer().mouseEventToCoords(event)[1]);
        }}
      >
        {scene[currentScene].hotSpotsArr.map((hotSpot, i) => {
          return (
            <Pannellum.Hotspot
              key={i}
              type="custom"
              pitch={hotSpot.pitch}
              yaw={hotSpot.yaw}
              tooltip={hotspotIcon}
              handleClick={(evt, name) => setCurrentScene(hotSpot.transition)}
              name="image info"
            />
          );
        })}
      </Pannellum>
    </>
  );
}
