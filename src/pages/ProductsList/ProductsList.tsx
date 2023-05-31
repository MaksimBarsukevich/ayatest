import { CardActionArea } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Typography from '@mui/material/Typography'
import { createStyles, makeStyles } from '@mui/styles'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { TProductList } from 'types/types'
import { v4 as uuidv4 } from 'uuid'
import { getProducts } from '../../api/api'

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

export const ProductsList: React.FC = () => {
    const navigate = useNavigate()
    const classes = useStyles()

    const [products, setProducts] = useState<TProductList[]>([])

    console.log(products)
    useEffect(() => {
        getProducts()
            .then((res: TProductList[]) => setProducts(res))
            .catch((err: unknown) => console.log(err))
    }, [])

    const handleOpenCertainKindList = (id: number) => {
        navigate(`${id}`)
    }
    return (
        <Box className={classes.listPageContainer}>
            <Box className={classes.listContainer}>
                {products.map((card: TProductList) => (
                    <Card
                        onClick={() => handleOpenCertainKindList(card.id)}
                        key={uuidv4()}
                        sx={{ maxWidth: 345 }}
                    >
                        <CardActionArea>
                            <CardMedia
                                component="img"
                                height="auto"
                                image={card.colors[0].images[0]}
                                alt={card.name}
                            />
                            <CardContent>
                                <Typography
                                    gutterBottom
                                    variant="h5"
                                    component="div"
                                >
                                    {card.name}
                                </Typography>
                            </CardContent>
                        </CardActionArea>
                    </Card>
                ))}
            </Box>
        </Box>
    )
}

export default ProductsList
