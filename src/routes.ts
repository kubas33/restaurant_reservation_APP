import React from 'react'
import {RestaurantsList} from "./views/restaurants/RestaurantsList.tsx";
import {RestaurantsAdminPage} from "./views/restaurants/RestaurantsAdminPage.tsx";
import {RestaurantForm} from "./components/restaurant/RestaurantForm.tsx";
import {RestaurantsTable} from "./views/restaurants/RestaurantsTable.tsx";
import {RestaurantTablesTable} from "./views/restaurants/RestaurantTablesTable.tsx";


// const RolesFormAuth = React.lazy(() => import('./views/dashboard/roles/RolesFormAuth.jsx'))
// const UsersFormAuth = React.lazy(() => import('./views/dashboard/users/UsersFormAuth.jsx'))
// const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard.jsx'))
// const Users = React.lazy(() => import('./views/dashboard/users/Users.jsx'))
// const RolesPage = React.lazy(() => import('./views/dashboard/roles/RolesPage.jsx'))
// const Settings = React.lazy(() => import('./views/dashboard/administration/Settings.jsx'));
// const Projects = React.lazy(() => import('./views/dashboard/administration/Projects.jsx'));
// const AddTicketAuth = React.lazy(() => import('./views/dashboard/tickets/AddTicketAuth.jsx'));
// const MyTicketsAuth = React.lazy(() => import('./views/dashboard/tickets/MyTicketsAuth.jsx'));
// const ProjectsPage = React.lazy(() => import('./views/dashboard/projects/ProjectsPage.jsx'))
// const ProjectsFormAuth = React.lazy(() => import('./views/dashboard/projects/ProjectsFormAuth.jsx'))
// const ProjectUsersPage = React.lazy(() => import('./views/dashboard/projects/projectUsers/ProjectUsersPage.jsx'))
// const ProjectUsersFormAuth = React.lazy(() => import('./views/dashboard/projects/projectUsers/ProjectUsersFormAuth.jsx'))
// const TicketDetails = React.lazy(() => import('./views/dashboard/tickets/TicketDetails.jsx'))
// const UserProfile = React.lazy(() => import('./views/dashboard/users/UserProfile.jsx'))
// const MyCompletedTicketsAuth = React.lazy(() => import('./views/dashboard/tickets/CompletedTickets.jsx'))

const routes = [
    {path: '/', exact: true, name: 'Home', element: RestaurantsList},
    // {path: '/login', name: 'Login', element: Login},
    // {path: '/dashboard', name: 'Dashboard', element: Dashboard},
    // {path: '/users',exact: true, name: 'Users', element: Users},
    // {path: '/users/create', exact: true, name: 'Create User', element: UsersFormAuth},
    // { path:'/users/edit/:id', exact: true, name: 'Edit User', element: UsersFormAuth },
    // {path: '/roles', exact: true, name: 'Roles', element: RolesPage},
    // {path: '/roles/create', exact: true, name: 'Create Role', element: RolesFormAuth},
    // { path: '/roles/edit/:id', exact: true, name: 'Edit Role', element: RolesFormAuth },
    { path: '/admin/restaurants', exact: true, name: 'Admin Restaurants', element: RestaurantsAdminPage },
    {path: '/admin/restaurants/create', exact: true, name: 'Create Restaurant', element: RestaurantForm},
    { path: '/admin/restaurants/:id/edit', exact: true, name: 'Edit Restaurant', element: RestaurantForm },
    { path: '/admin/restaurants/:restaurantId/tables', exact: true, name: 'Restaurant Tables', element: RestaurantTablesTable },
    // {path: '/settings',exact: true, name: 'Settings', element: Settings},
    // {path: '/projects',exact: true, name: 'Projects', element: Projects},
    // {path: '/addticket',exact: true, name: 'AddTicket', element: AddTicketAuth},
    // {path: '/mytickets',exact: true, name: 'MyTickets', element: MyTicketsAuth},
    // {path: '/myCompletetickets',exact: true, name: 'MyCompleteTickets', element: MyCompletedTicketsAuth},
    // {path: '/roles/create', exact: true, name: 'Create Role', element: RolesFormAuth},
    // { path: '/roles/edit/:id', exact: true, name: 'Edit Role', element: RolesFormAuth },
    // { path: '/projects/users', exact: true, name: 'Projects Users', element: ProjectUsersPage },
    // { path: '/projects/users/create', exact: true, name: 'Create Projects Users', element: ProjectUsersFormAuth },
    // { path: '/tickets/:ticketId', exact: true, name: 'View Detail Ticket', element: TicketDetails },
    // {path: '/profile', exact: true, name: 'User Profile', element: UserProfile}

]

export default routes

