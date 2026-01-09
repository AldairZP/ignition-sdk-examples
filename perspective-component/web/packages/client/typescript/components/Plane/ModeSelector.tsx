import { MODES, type Mode } from "./types";

interface ModeSelectorProps {
  currentMode: Mode;
  onModeChange: (mode: Mode) => void;
}

export function ModeSelector({ currentMode, onModeChange }: ModeSelectorProps) {
  return (
    <div style={{ marginBottom: 10 }}>
      {Object.values(MODES).map((m) => (
        <button
          key={m}
          onClick={() => onModeChange(m)}
          style={{
            display: "inline-block",
            height: "35px",
            marginRight: 6,
            padding: "0 16px",
            fontWeight: currentMode === m ? "bold" : "normal",
            backgroundColor: currentMode === m ? "#4CAF50" : "#e0e0e0",
            color: currentMode === m ? "white" : "black",
            border: "none",
            borderRadius: 4,
            cursor: "pointer",
          }}
        >
          {m}
        </button>
      ))}
    </div>
  );
}
