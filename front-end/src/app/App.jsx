import "../fake-db";
import React, { Suspense } from "react";

import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import axios from "axios";
import history from "@history";
import { renderRoutes } from "react-router-config";

import routes from "./RootRoutes";
import { Store } from "./redux/Store";
import Auth from "./auth/Auth";
import RootRoutes from "./RootRoutes";
import AppContext from "./appContext";
import { Loading } from "@gull";

import "../styles/app/app.scss";

import { setupInterceptorsTo } from "./services";

setupInterceptorsTo(axios);

function App() {
  return (
    <AppContext.Provider value={{ routes }}>
      <Provider store={Store}>
        <Auth>
          <Suspense fallback={<Loading></Loading>}>
            <Router history={history}>{renderRoutes(RootRoutes)}</Router>
          </Suspense>
        </Auth>
      </Provider>
    </AppContext.Provider>
  );
}

export default App;
