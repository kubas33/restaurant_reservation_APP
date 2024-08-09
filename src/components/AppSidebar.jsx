import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
    CCloseButton,
    CSidebar,
    CSidebarBrand,
    CSidebarFooter,
    CSidebarHeader,
} from '@coreui/react';
// import CIcon from '@coreui/icons-react';
import { AppSidebarNav } from './AppSidebarNav.jsx';
// import { logo } from '../assets/brand/logo.js';
// import { sygnet } from '../assets/brand/sygnet';
import { themeActions } from "../store/redux/theme";
// import { confrontNavbarWithPermissions } from "../utils/index.js";
import useNavigationItems from '../_nav';  // Update the import for navigation items
const AppSidebar = () => {
    const dispatch = useDispatch();
    const unfoldable = useSelector((state) => state.theme.sidebarUnfoldable);
    const sidebarShow = useSelector((state) => state.theme.sidebarShow);
    const currentUser = useSelector((state) => state.auth.currentUser);
    const { i18n } = useTranslation();
    const navigation = useNavigationItems();
    // const newNavbar = useMemo(() => {
    //     return confrontNavbarWithPermissions(currentUser?.permissions, navigation);
    // }, [currentUser?.permissions, i18n.language]);
    return (
        <CSidebar
            className="border-end"
            colorScheme="dark"
            position="fixed"
            unfoldable={unfoldable}
            visible={sidebarShow}
            onVisibleChange={(visible) => dispatch(themeActions.showSidebar(visible))}
        >
            <CSidebarHeader className="border-bottom">
                <CCloseButton
                    className="d-lg-none"
                    dark
                    onClick={() => dispatch(themeActions.showSidebar(false))}
                />
            </CSidebarHeader>
            <AppSidebarNav items={navigation} />
            <CSidebarFooter className="border-top d-none d-lg-flex">
                {/* <CSidebarToggler
                    onClick={() => dispatch(themeActions.foldSidebar(!unfoldable))}
                /> */}
            </CSidebarFooter>
        </CSidebar>
    );
};
export default React.memo(AppSidebar);