import "./App.css";
import { Theme } from "@radix-ui/themes";
import { routeTree } from "./routeTree.gen";
import { createRouter, RouterProvider } from "@tanstack/react-router";
import { AuthProvider } from "./core/contexts/AuthContext";
import { Provider } from "react-redux";
import store from "./core/redux/store";
import ErrorPage from "./components/pages/error-page/ErrorPage";

const router = createRouter({
  routeTree,
  defaultNotFoundComponent: ErrorPage,
});

function App() {
  return (
    <>
      <Theme>
        <Provider store={store}>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </Provider>
      </Theme>
    </>
  );
}

export default App;
