import { CNavItem, CNavGroup } from '@coreui/react';
import { useTranslation } from 'react-i18next';

const useNavigationItems = () => {
    const { t } = useTranslation();

    return [
        {
            component: CNavItem,
            name: t('nav.dashboard'),
            to: '/',
            // permissions: ['BASE_USER_ACCESS'],
        },
        {
            component: CNavGroup,
            name: t('nav.administration'),
            to: '/administration',
            // permissions: ['ADMIN_PANEL_ACCESS'],
            items: [
                {
                    component: CNavItem,
                    name: t('nav.users'),
                    to: '/admin/users',
                    // permissions: ['USERS_VIEW'],
                },
                {
                    component: CNavItem,
                    name: t('nav.restaurants'),
                    to: '/admin/restaurants',
                    // permissions: ['PROJECTS_VIEW'],
                },
            ],
        }
    ];
};

export default useNavigationItems;
