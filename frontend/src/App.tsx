import { createBrowserRouter, RouterProvider } from "react-router-dom";
import JoinChat from "./Join&Chat";
import Welcome from "./components/Welcome";



function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Welcome />
    },
    {
      path: '/join-chat',
      element: <JoinChat />
    },
  ]);

  return (
    <RouterProvider router={router} />
  );
}

export default App;

