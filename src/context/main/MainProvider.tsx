import React, { Reducer, useReducer } from 'react'
import { TProductCartList } from 'types/types'
import { MainContext } from './MainContext'

export type TActions =
    | {
          type: 'DELETE_PRODUCT'
          value: TProductCartList
      }
    | {
          type: 'ADD_PRODUCT'
          value: TProductCartList
      }
type TReducer = Reducer<TProductCartList[], TActions>

const reducer: TReducer = (state: TProductCartList[], action: TActions) => {
    switch (action.type) {
        case 'DELETE_PRODUCT':
            return state.filter((item) => item !== action.value)
        case 'ADD_PRODUCT':
            return [...state, action.value]
        default:
            return state
    }
}
const initialState: TProductCartList[] = []

export const MainProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <MainContext.Provider
            value={{
                state,
                dispatch,
            }}
        >
            {children}
        </MainContext.Provider>
    )
}

export default MainProvider
