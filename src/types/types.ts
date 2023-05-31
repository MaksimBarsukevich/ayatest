export type TProductListCard = {
    id: number
    name: string
    images: string[]
    price: string
    description: string
    sizes: number[]
}

export type TProductList = {
    colors: TProductListCard[]
    id: number
    name: string
}

export type TProductCartList = {
    color: {
        colorId: number
        size: number | string
        image: string
    }
    id: number | string
}

export enum SizeEnum {
    XS,
    S,
    M,
    L,
    XL,
}
export type TSize = { id: number; label: string; number: number }
