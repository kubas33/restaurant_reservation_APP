import React from 'react'
import {RestaurantsList} from "./views/restaurants/RestaurantsList.tsx";
import {RestaurantsAdminPage} from "./views/restaurants/RestaurantsAdminPage.tsx";
import {RestaurantForm} from "./components/restaurant/RestaurantForm.tsx";
import {RestaurantsTable} from "./views/restaurants/RestaurantsTable.tsx";
import {RestaurantTablesTable} from "./views/restaurants/RestaurantTablesTable.tsx";
import {RestaurantTableForm} from "./components/restaurant/RestaurantTableForm.tsx";
import {UsersTable} from "./views/users/UsersTable.tsx";
import Login from "./views/auth/login/Login.tsx";
import {UserForm} from "./components/user/UserForm.tsx";



const routes = [
    {path: '/', exact: true, name: 'Home', element: RestaurantsList},
    {path: '/login', name: 'Login', element: Login},
    {path: '/admin/users',exact: true, name: 'Users', element: UsersTable},
    {path: '/admin/users/edit/:id', exact: true, name: 'Edit User', element: UserForm},
    {path: '/admin/users/create', exact: true, name: 'Create User', element: UserForm},
    {path: '/admin/restaurants', exact: true, name: 'Admin Restaurants', element: RestaurantsAdminPage },
    {path: '/admin/restaurants/create', exact: true, name: 'Create Restaurant', element: RestaurantForm},
    { path: '/admin/restaurants/:id/edit', exact: true, name: 'Edit Restaurant', element: RestaurantForm },
    { path: '/admin/restaurants/:restaurantId/tables', exact: true, name: 'Restaurant Tables', element: RestaurantTablesTable },
    { path: '/admin/restaurants/:restaurantId/tables/create', exact: true, name: 'Create Restaurant Table', element: RestaurantTableForm },
    { path: '/admin/restaurants/:restaurantId/tables/:tableId/edit', exact: true, name: 'Create Restaurant Table', element: RestaurantTableForm },

]

export default routes

