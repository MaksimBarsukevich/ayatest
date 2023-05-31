import DataObjectIcon from '@mui/icons-material/DataObject'
import { Badge, Box, Container, Typography } from '@mui/material'
import { createStyles, makeStyles } from '@mui/styles'
import { ResponsiveSideMenu } from 'components/ResponsiveSideMenu'
import { MainContext } from 'context/main'
import React, { useContext } from 'react'

const useStyles = makeStyles((theme) =>
    createStyles({
        containerBox: {
            width: 'calc(100vw - 90px)',
            height: '100vh',
        },
        box: {
            display: 'flex',
            height: '100vh',
            background: '#f9f9f9',
            alignItems: 'flex-end',
        },
        container: {
            height: '100vh',
            padding: '20px',
        },
        menuTitleBox: {
            display: 'inline-flex',
            padding: '0 16px',
            marginRight: 'auto',
        },
        menuTitle: {
            fontSize: '32px',
            marginLeft: '10px',
            fontWeight: '700',
            lineHeight: '32px',
        },
        menu: {
            '& .MuiPaper-root .MuiList-root .MuiListItem-root .MuiButtonBase-root':
                {
                    paddingLeft: '10px',
                },
            '& .MuiPaper-root > div.MuiBox-root:first-child': {
                marginTop: '20px',
            },
        },
    })
)

export const MainLayout: React.FC<{
    children?: React.ReactNode
}> = ({ children }) => {
    const clasess = useStyles()
    const { state } = useContext(MainContext)

    return (
        <Box className={clasess.box}>
            <ResponsiveSideMenu
                menuLink={[
                    {
                        title: 'Список товров',
                        icon: <DataObjectIcon sx={{ fontSize: '18px' }} />,
                        buttonHref: '/products',
                    },
                    {
                        title: 'Корзина',
                        icon: (
                            <Badge badgeContent={state.length} color="primary">
                                <DataObjectIcon sx={{ fontSize: '18px' }} />
                            </Badge>
                        ),
                        buttonHref: '/cart',
                    },
                ]}
                logoText={
                    <Box className={clasess.menuTitleBox}>
                        <Typography className={clasess.menuTitle}>
                            Магазин
                        </Typography>
                    </Box>
                }
            />
            <Box className={clasess.containerBox}>
                <Container className={clasess.container} maxWidth={'xl'}>
                    {children}
                </Container>
            </Box>
        </Box>
    )
}

export default MainLayout
