import Root from 'Root'
import { MainProvider } from 'context'
import { CertainKindList, ProductCard, ProductsList, ShoppingCart } from 'pages'
import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root />,
        children: [
            {
                path: '/products',
                element: <ProductsList />,
            },

            {
                path: '/products/:id',
                element: <CertainKindList />,
            },
            {
                path: '/products/:id/color/:colorId',
                element: <ProductCard />,
            },
            {
                path: '/cart',
                element: <ShoppingCart />,
            },
        ],
    },
])

export const App: React.FC = () => {
    return (
        <MainProvider>
            <RouterProvider router={router} fallbackElement={<>...loading</>} />
        </MainProvider>
    )
}

export default App
