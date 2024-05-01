import soundFile from "./Music Sounds Better with You.mp3";

export function SoundFile() {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          fontSize: "3rem",
          color: "rgb(87, 56, 5)",
        }}
      >
        <div style={{ marginRight: "25px" }}>Feel the Vibe</div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          margin: "30px",
        }}
      >
        <audio
          style={{
            borderRadius: "40px",
            border: "solid black",
            backgroundColor: "#04AA6D",
          }}
          controls
          autoPlay
        >
          <source src={soundFile} type="audio/mpeg" />
        </audio>
      </div>
    </>
  );
}
