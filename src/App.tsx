import { Outlet } from "@tanstack/react-router";

const App = () => {
  return (
    <div className="app">
      <Outlet />
    </div>
  );
};

export default App;
