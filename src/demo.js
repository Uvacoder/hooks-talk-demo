import React from "react";
import { MiniBrowser } from "./mini-browser/index.tsx";
import { MiniEditor } from "./mini-editor/mini-editor";
import { Player } from "../player/player";
import { useSpring } from "use-spring";
import { editorSteps, browserSteps, playerSteps } from "./steps";

export function Demo() {
  const [state, setState] = React.useState({
    currentIndex: 0,
    stepProgress: 0,
    isPlaying: true,
  });

  const [progress] = useSpring(state.currentIndex, {
    decimals: 3,
    stiffness: 80,
    damping: 48,
    mass: 8,
  });

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        height: "calc(100vh - 16px)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          height: 600,
          width: "100%",
        }}
      >
        <MiniEditor
          style={{ width: 600 }}
          progress={progress}
          steps={editorSteps}
        />
        <div style={{ width: 30 }} />
        <div style={{}}>
          <MiniBrowser url="http://localhost:3000/" height={385}>
            {browserSteps[state.currentIndex]}
          </MiniBrowser>
          <div style={{ height: 30 }} />
          <Player
            videoId="dpw9EHDh2bM"
            style={{ height: 185 }}
            steps={playerSteps}
            stepIndex={state.currentIndex}
            stepProgress={state.stepProgress}
            isPlaying={state.isPlaying}
            onChange={({ stepIndex, stepProgress, isPlaying }) =>
              setState(() => ({
                isPlaying,
                currentIndex: stepIndex,
                stepProgress,
              }))
            }
          />
        </div>
      </div>
    </div>
  );
}
