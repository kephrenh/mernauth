import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { Container } from "react-bootstrap";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <>
      <Header />
      <Container className="my-2">
        <Outlet />
      </Container>
      <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
    </>
  );
};

export default App;
