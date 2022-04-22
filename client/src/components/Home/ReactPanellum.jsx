import React, { useEffect, useState } from "react";
import ReactPannellum, {
  getConfig,
  getCurrentScene,
  getAllScenes,
  isLoaded,
} from "react-pannellum";
import image2 from "../images/image2.avif";

export default function ReactPanellum() {
  console.log(isLoaded(), getCurrentScene(), getAllScenes());


  function click() {
    console.log(getConfig());
  }

  const hotSpot1 = {
    pitch: 10,
    yaw: 100,
    type: "scene",
    text: "PRUEBA DE HOTPSOT SCENE",
    sceneId: 'secondScene',
    targetPitch: "same",
    targetYaw: 100,
    targetHfov: 40,
    id: 1,
  };

  const config = {
    autoRotate: 0,
    autoLoad: true,
    hotSpots: [hotSpot1],
    sceneFadeDuration: 3000,
  };

  const scene2 = (
    <ReactPannellum
      id="2"
      sceneId="secondScene"
      imageSource={image2}
      config={config}
      style={{
        width: "70%",
        height: "400px",
        background: "#000000",
      }}
    />
  );

  return (
    <div>
      <ReactPannellum
        id="1"
        sceneId="firstScene"
        imageSource="https://pannellum.org/images/alma.jpg"
        config={config}
        style={{
          width: "70%",
          height: "400px",
          background: "#000000",
        }}
      />
      <div onClick={click}>Click me</div>
    </div>
  );
}
