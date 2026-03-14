
  import { createRoot } from "react-dom/client";
  import App from "./App.tsx";
  import "./index.css";

// Toto je úplný štartovací bod React aplikácie.
// Funkcia createRoot hľadá v našom jedinom index.html súbore značku <div id="root"></div>.
// Keď ju nájde, celú našu aplikáciu (<App />) naklikuje (vyrenderuje) presne do toho jedného miesta.
  createRoot(document.getElementById("root")!).render(<App />);