import React, { Suspense, useState } from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import { CSpinner } from "@coreui/react";
import MainNavigation from "./layout/MainNavigation.tsx";
import { ToastContainer } from "react-toastify";
import "./scss/style.scss";

const Login = React.lazy(() => import("./views/auth/login/Login.tsx"));
const Register = React.lazy(() => import("./views/auth/register/Register.tsx"));
const Page404 = React.lazy(() => import("./views/errors/page404/Page404.tsx"));
const Page500 = React.lazy(() => import("./views/errors/page500/Page500.tsx"));
const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout.tsx"));


function App() {
  return (
    <>
      <MainNavigation>
        <BrowserRouter>
          <Suspense
            fallback={
              <div className="pt-3 text-center">
                <CSpinner color="primary" variant="grow" />
              </div>
            }
          >
            <Routes>
              <Route path="/" element={<DefaultLayout />} />
              <Route path="/login" name="Login Page" element={<Login />} />
              <Route
                path="/register"
                name="Register Page"
                element={<Register />}
              />
              <Route path="/404" name="Page 404" element={<Page404 />} />
              <Route path="/500" name="Page 500" element={<Page500 />} />
              <Route path="*" element={<DefaultLayout/>} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </MainNavigation>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

export default App;
