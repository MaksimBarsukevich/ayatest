import { Button, CardActionArea } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { createStyles, makeStyles } from '@mui/styles'
import { MainContext } from 'context/main'
import React, { useContext } from 'react'
import { SizeEnum, TProductCartList } from 'types/types'
import { v4 as uuidv4 } from 'uuid'

const useStyles = makeStyles((theme) =>
    createStyles({
        listPageContainer: {
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
        },
        listContainer: {
            display: 'flex',
            gap: '15px',
            flexWrap: 'wrap',
        },
    })
)

export const ShoppingCart: React.FC = () => {
    const classes = useStyles()

    const { state, dispatch } = useContext(MainContext)

    return (
        <Box className={classes.listPageContainer}>
            <Box className={classes.listContainer}>
                {state.map((card: TProductCartList) => {
                    if (state.indexOf(card)) {
                        return null
                    }
                    return (
                        <Card
                            key={uuidv4()}
                            sx={{
                                maxWidth: 345,
                                padding: '10px',
                                display: 'flex',
                                gap: '10px',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <CardActionArea>
                                <CardMedia
                                    component="img"
                                    height="auto"
                                    image={card.color.image}
                                    alt="Фото картинки"
                                />
                                <CardContent>
                                    <Typography
                                        gutterBottom
                                        variant="h5"
                                        component="div"
                                    >
                                        {card.id === 1 ? 'Футболка' : 'Майка'}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        {
                                            SizeEnum[
                                                (card.color.size as number) - 1
                                            ]
                                        }
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                    >
                                        Количество штук:
                                        {
                                            state.filter(
                                                (product) =>
                                                    product.id === card.id &&
                                                    product.color.colorId ===
                                                        card.color.colorId
                                            ).length
                                        }
                                    </Typography>
                                </CardContent>
                            </CardActionArea>
                            <Button
                                onClick={() => {
                                    dispatch({
                                        type: 'DELETE_PRODUCT',
                                        value: card,
                                    })
                                }}
                                variant="outlined"
                            >
                                Удалить из корзины
                            </Button>
                        </Card>
                    )
                })}
            </Box>
        </Box>
    )
}

export default ShoppingCart
