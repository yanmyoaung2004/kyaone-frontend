import { BrowserRouter, Routes, Route } from "react-router-dom";
import Test from "./pages/Test"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Test />} />
      </Routes>
    </BrowserRouter>
  );
}
