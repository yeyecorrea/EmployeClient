import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ListEmploye } from "./components/ListEmploye"
import { CreateEmploye } from "./components/CreateEmploye"

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListEmploye/>}/>
        <Route path="/createEmploye" element={<CreateEmploye/>}/>
        <Route/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
