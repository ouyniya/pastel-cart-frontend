import AppRoutes from "./routes/App-routes";
import useThemeStore from "./stores/overall-store";
import { ToastContainer } from 'react-toastify';

function App() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <>
      <div
        data-theme={theme ? "pastel" : "forest"}
      >
        <ToastContainer />
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
