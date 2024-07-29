import React from "react";
import { AppContent, AppSidebar, AppHeader } from "../components/index";

export default function DefaultLayout() {
  return (
    <>
      <AppSidebar />
      <div className="wrapper d-flex flex-column min-vh-100">
        <AppHeader />
        <div className="body flex-grow-1">
          <AppContent />
        </div>
        {/*<AppFooter/>*/}
      </div>
    </>
  );
}
