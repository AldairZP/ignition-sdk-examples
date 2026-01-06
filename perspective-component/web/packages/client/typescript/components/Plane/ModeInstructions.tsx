import { MODES, type Mode } from "./types";

interface ModeInstructionsProps {
  mode: Mode;
}

const INSTRUCTIONS: Record<Mode, string> = {
  [MODES.VIEW]: "Modo ver: Solo visualiza los puntos",
  [MODES.CREATE]: "Modo crear: Click en el plano para crear un punto",
  [MODES.EDIT]: "Modo modificar: Arrastra los puntos para moverlos",
  [MODES.DELETE]: "Modo eliminar: Click en un punto para eliminarlo",
};

export function ModeInstructions({ mode }: ModeInstructionsProps) {
  return (
    <div style={{ marginBottom: 10, fontSize: 14, color: "#666" }}>
      {INSTRUCTIONS[mode]}
    </div>
  );
}
