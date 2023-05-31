import {
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    Typography,
} from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { MainContext } from 'context/main'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { SizeEnum, TProductListCard } from 'types/types'
import { v4 as uuidv4 } from 'uuid'
import { getProductColor } from '../../api/api'

const useStyles = makeStyles((theme) =>
    createStyles({
        cardBox: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '15px',
        },
        btn: {
            maxWidth: '250px',
        },
        select: {
            minWidth: '300px',
        },
    })
)
export const ProductCard: React.FC = () => {
    const classes = useStyles()
    const { id, colorId } = useParams()
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0)
    const [size, setSize] = React.useState('')

    const handleChangeSize = (event: SelectChangeEvent) => {
        setSize(event.target.value)
    }
    const [card, setCard] = useState<TProductListCard>({
        id: 0,
        name: '',
        images: [],
        price: '',
        description: '',
        sizes: [],
    })

    const {  dispatch } = useContext(MainContext)

    useEffect(() => {
        getProductColor(id, colorId)
            .then((res: TProductListCard) => {
                setCard(res)
            })
            .catch((err: unknown) => console.log(err))
    }, [])

    return (
        <Box className={classes.cardBox}>
            <Typography>Цвет: {card.name}</Typography>
            <Typography>{card.description}</Typography>
            <Box>
                <img
                    width={'300px'}
                    src={card.images[currentPhotoIndex]}
                    alt={card.description}
                />
            </Box>
            {currentPhotoIndex !== card.images.length - 1 && (
                <Button
                    className={classes.btn}
                    onClick={() => setCurrentPhotoIndex((prev) => prev + 1)}
                >
                    След. фото
                </Button>
            )}

            {currentPhotoIndex !== 0 && (
                <Button
                    className={classes.btn}
                    onClick={() => setCurrentPhotoIndex((prev) => prev - 1)}
                >
                    Пред. фото
                </Button>
            )}
            <Box>Выберите размер: </Box>
            <FormControl>
                <InputLabel>Выберите размер</InputLabel>
                <Select
                    value={size}
                    label="Выберите размер"
                    onChange={handleChangeSize}
                    className={classes.select}
                >
                    {card.sizes.map((size) => (
                        <MenuItem key={uuidv4()} value={size}>
                            {SizeEnum[size - 1]}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button
                disabled={!size}
                onClick={() => {
                    id &&
                        colorId &&
                        dispatch({
                            type: 'ADD_PRODUCT',
                            value: {
                                id: id,
                                color: {
                                    colorId: card.id,
                                    size: size,
                                    image: card.images[0],
                                },
                            },
                        })
                }}
                variant="outlined"
                className={classes.btn}
            >
                Добавить в корзину
            </Button>
        </Box>
    )
}

export default ProductCard
