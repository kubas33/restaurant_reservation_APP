import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CContainer,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CHeader,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
  useColorModes,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import {
  cilContrast,
  cilMenu,
  cilMoon,
  cilSun,
  cilLanguage,
} from "@coreui/icons";

import { AppBreadcrumb } from "./index";
import AppHeaderDropdown from "./header/AppHeaderDropdown";
import { themeActions } from "../store/redux/theme";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
// import { updateUserLanguage } from "../services/users.service.js";

const AppHeader = () => {
  const { t } = useTranslation();
  const headerRef = useRef();
  const { colorMode, setColorMode } = useColorModes(
    `${import.meta.env.VITE_STORAGE_KEY}-theme`
  );
  const [theme, setTheme] = useState(
    localStorage.getItem("deal-it-service-desk-theme") || "light"
  );
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.theme.sidebarShow);
  const [language, setLanguage] = useState(i18n.language);
  const currentUser = useSelector((state) => state.auth.currentUser);

  useEffect(() => {
    document.addEventListener("scroll", () => {
      headerRef.current &&
        headerRef.current.classList.toggle(
          "shadow-sm",
          document.documentElement.scrollTop > 0
        );
    });
  }, []);

  const handleThemeChange = (newTheme) => {
    setColorMode(newTheme);
    setTheme(newTheme);
    localStorage.setItem("deal-it-service-desk-theme", newTheme);
    window.dispatchEvent(new Event("storage")); // Force re-render across components
  };

  const handleLanguageChange = (newLanguage) => {
    // if (currentUser) {
    //   const { id, token } = currentUser;
    //   updateUserLanguage(id, token, newLanguage)
    //     .then(() => {
    //       setLanguage(newLanguage);
    //       i18n.changeLanguage(newLanguage);
    //     })
    //     .catch((error) => {
    //       console.error(
    //         "An error occurred while updating user language: ",
    //         error
    //       );
    //     });
    // } else {
    //   setLanguage(newLanguage);
    //   i18n.changeLanguage(newLanguage);
    // }
  };

  return (
    <CHeader position="sticky" className="mb-4 p-0" ref={headerRef}>
      <CContainer className="border-bottom px-4" fluid>
        <CHeaderToggler
          onClick={() => dispatch(themeActions.showSidebar(!sidebarShow))}
          style={{ marginInlineStart: "-14px" }}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>
        <CHeaderNav className="d-none d-md-flex">
          <CNavItem>
            <CNavLink to="/dashboard" as={NavLink}>
              {t("appHeader.dashboard")}
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        <CHeaderNav className="ms-auto"></CHeaderNav>
        <CHeaderNav>
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>

          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              <span>
                <CIcon icon={cilLanguage} size="lg" /> {language}
              </span>
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={language === "en"}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => handleLanguageChange("en")}
              >
                English
              </CDropdownItem>
              <CDropdownItem
                active={language === "pl"}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => handleLanguageChange("pl")}
              >
                Polski
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>

          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>

          <CDropdown variant="nav-item" placement="bottom-end">
            <CDropdownToggle caret={false}>
              {colorMode === "dark" ? (
                <CIcon icon={cilMoon} size="lg" />
              ) : colorMode === "auto" ? (
                <CIcon icon={cilContrast} size="lg" />
              ) : (
                <CIcon icon={cilSun} size="lg" />
              )}
            </CDropdownToggle>
            <CDropdownMenu>
              <CDropdownItem
                active={colorMode === "light"}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => handleThemeChange("light")}
              >
                <CIcon className="me-2" icon={cilSun} size="lg" /> Light
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === "dark"}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => handleThemeChange("dark")}
              >
                <CIcon className="me-2" icon={cilMoon} size="lg" /> Dark
              </CDropdownItem>
              <CDropdownItem
                active={colorMode === "auto"}
                className="d-flex align-items-center"
                as="button"
                type="button"
                onClick={() => handleThemeChange("auto")}
              >
                <CIcon className="me-2" icon={cilContrast} size="lg" /> Auto
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>

          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
          <AppHeaderDropdown />
          <li className="nav-item py-1">
            <div className="vr h-100 mx-2 text-body text-opacity-75"></div>
          </li>
        </CHeaderNav>
      </CContainer>
      <CContainer className="px-4" fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
