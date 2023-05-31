import { Box, CardActionArea } from '@mui/material'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { createStyles, makeStyles } from '@mui/styles'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { useParams } from 'react-router-dom'
import { TProductList, TProductListCard, TSize } from 'types/types'
import { v4 as uuidv4 } from 'uuid'
import { getProduct, getSizes } from '../../api/api'

const useStyles = makeStyles((theme) =>
    createStyles({
        listContainer: {
            display: 'flex',
            gap: '15px',
            flexWrap: 'wrap',
        },
        sizesBar: { display: 'flex', gap: '5px' },
    })
)

const CertainKindCard: React.FC<{ card: TProductListCard }> = ({ card }) => {
    const classes = useStyles()
    const navigate = useNavigate()

    const [availableSizes, setAvailableSizes] = useState<TSize[] | []>([])
    useEffect(() => {
        getSizes()
            .then((res: TSize[]) => {
                setAvailableSizes(
                    res.filter((size) => card.sizes.includes(size.id))
                )
            })
            .catch((err: unknown) => console.log(err))
    }, [])

    const handleOpenCard = (productId: number) => {
        navigate(`color/${productId}`)
    }

    return (
        <Card onClick={() => handleOpenCard(card.id)} sx={{ maxWidth: 345 }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height="auto"
                    image={card.images[0]}
                    alt={card.name}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {card.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {card.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {card.price} р
                    </Typography>
                    <Box className={classes.sizesBar}>
                        {card.sizes.length !== 0 ? (
                            availableSizes.map((item) => (
                                <Typography
                                    key={uuidv4()}
                                    variant="body2"
                                    color="text.secondary"
                                >
                                    {item.label}
                                </Typography>
                            ))
                        ) : (
                            <Typography variant="body2" color="text.secondary">
                                Нет доступных размеров
                            </Typography>
                        )}
                    </Box>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

export const CertainKindList: React.FC = () => {
    const classes = useStyles()
    const { id } = useParams()
    const [certainKindProducts, setCertainKindProducts] =
        React.useState<TProductList>({
            colors: [],
            id: 0,
            name: '',
        })

    useEffect(() => {
        getProduct(id)
            .then((res: TProductList) => {
                setCertainKindProducts(res)
            })
            .catch((err: unknown) => console.log(err))
    }, [])

    return (
        <Box className={classes.listContainer}>
            {certainKindProducts.colors.map((card) => (
                <CertainKindCard key={uuidv4()} card={card} />
            ))}
        </Box>
    )
}

export default CertainKindList
