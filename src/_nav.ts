import { CNavItem, CNavGroup } from '@coreui/react';
import { useTranslation } from 'react-i18next';

const useNavigationItems = () => {
    const { t } = useTranslation();

    return [
        {
            component: CNavItem,
            name: t('nav.dashboard'),
            to: '/dashboard',
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
                    to: '/users',
                    // permissions: ['USERS_VIEW'],
                },
                {
                    component: CNavItem,
                    name: t('nav.roles'),
                    to: '/roles',
                    // permissions: ['ROLES_VIEW'],
                },
                {
                    component: CNavItem,
                    name: t('nav.projects'),
                    to: '/projects',
                    // permissions: ['PROJECTS_VIEW'],
                },
            ],
        },
        {
            component: CNavGroup,
            name: t('nav.tickets'),
            to: '/tickets',
            // permissions: ['TICKETS_VIEW'],
            items: [
                {
                    component: CNavItem,
                    name: t('nav.myTickets'),
                    to: '/mytickets',
                },
                {
                    component: CNavItem,
                    name: t('nav.addTicket'),
                    to: '/addticket',
                },
                {
                    component: CNavItem,
                    name: t('nav.myCompleteTickets'),
                    to: '/myCompleteTickets',
                },
            ],
        }
    ];
};

export default useNavigationItems;
