import { useEffect, useState } from "react";
import Routes from "./Routes/Index";
import { useDispatch } from "react-redux";
import AOS from "aos";
import "aos/dist/aos.css";

function App() {

  const searchParams = new URLSearchParams(document.location.search)

  useEffect(() => {
    AOS.init({ duration: 1200, delay: 500 });
    AOS.refresh();
  }, []);

  return (
    <div style={{ backgroundColor: "rgb(247 248 249)" }}>
      <Routes />
    </div>
  );
}

export default App;