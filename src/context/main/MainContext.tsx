import React from 'react'
import { TProductCartList } from 'types/types'
import { TActions } from './MainProvider'

export const MainContext = React.createContext<{
    state: TProductCartList[]
    dispatch: React.Dispatch<TActions>
}>({
    state: [],
    dispatch: () => {
        return
    },
})
