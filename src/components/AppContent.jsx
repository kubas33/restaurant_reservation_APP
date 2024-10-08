import React, {Suspense} from 'react'
import {Navigate, Route, Routes} from 'react-router-dom'
import {CContainer, CSpinner} from '@coreui/react'

// routes config
import routes from '../routes'
import {boolean} from "yup";

export const AppContent = React.memo(() => {
    return (
        <CContainer className="px-4" fluid={true}>
            <Suspense fallback={<CSpinner color="primary"/>}>
                <Routes>
                    {routes.map((
                        route, idx) => {
                        return (
                            route.element && (
                                <Route
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    element={<route.element/>}
                                />
                            )
                        )
                    })}
                    {/*<Route path="/" element={<Navigate to="dashboard" replace/>}/>*/}

                </Routes>
            </Suspense>
        </CContainer>
    )
});

