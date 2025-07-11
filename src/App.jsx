import AppRoutes from "./routes/App-routes";
import useThemeStore from "./stores/overall-store";

function App() {
  const theme = useThemeStore((state) => state.theme);

  return (
    <>
      <div
        data-theme={theme ? "pastel" : "dim"}
        className="min-h-screen antialiased"
      >
        <AppRoutes />
      </div>
    </>
  );
}

export default App;
