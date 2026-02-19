import { useState } from "react";
import { ToastSileoView } from "./components/ToastSileo/ToastSileoView";

function App() {
  const [trigger, setTrigger] = useState(false)
  const handleTrigger = () => {
    setTrigger(!trigger);
  };
  return (
    <>
    <button onClick={handleTrigger}></button>
      <ToastSileoView
        trigger={trigger}
        type="error"
        title="Error de carga"
        description="No se pudo inicializar Sileo"
        position="top-right"
        duration={40000}
        fill="#fff"
        theme="dark"
      />
    </>
  );
}

export default App;
