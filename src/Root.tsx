import { MainLayout } from 'domain/layouts'
import React from 'react'
import { Outlet } from 'react-router-dom'

export const Root: React.FC = () => {

    return (
        <MainLayout>
            <Outlet />
        </MainLayout>
    )
}

export default Root
