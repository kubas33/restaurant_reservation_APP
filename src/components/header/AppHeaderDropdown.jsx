import React from "react";
import {
  CAvatar,
  CDropdown,
  CDropdownDivider,
  CDropdownHeader,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { cilLockLocked, cilSettings, cilUser } from "@coreui/icons";
import CIcon from "@coreui/icons-react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/redux/auth";

const AppHeaderDropdown = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const handleLogout = async () => {
    dispatch(authActions.logout());
    navigate("/login");
  };

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle
        placement="bottom-end"
        className="py-0 pe-0"
        caret={false}
      >
        <CAvatar size="md" color="primary">
          DI
        </CAvatar>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownHeader className="bg-body-secondary fw-semibold mb-2">
          {t("appHeader.account")}
        </CDropdownHeader>
        {/*<CDropdownItem onClick={() => navigate("/profile")}>*/}
        {/*  <CIcon icon={cilUser} className="me-2" />*/}
        {/*  {t("appHeader.profile")}*/}
        {/*</CDropdownItem>*/}
        {/*<CDropdownDivider />*/}
        <CDropdownItem as="button" onClick={() => handleLogout()}>
          <CIcon icon={cilLockLocked} className="me-2" />
          {t("appHeader.logOut")}
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
