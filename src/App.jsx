import AppRoutes from "./routes/App-routes";
import useThemeStore from "./stores/overallStore";
import { ToastContainer } from "react-toastify";

function App() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <>
      <div data-theme={theme ? "pastel" : "forest"}>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss={false}
          draggable
          pauseOnHover
          theme="light"
        />
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
