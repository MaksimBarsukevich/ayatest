import MenuIcon from '@mui/icons-material/Menu'
import { Link, Toolbar, Typography } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import MuiDrawer from '@mui/material/Drawer'
import IconButton from '@mui/material/IconButton'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import { CSSObject, Theme, styled } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import { createStyles, makeStyles } from '@mui/styles'
import * as React from 'react'
import { Link as RouterLink, useLocation } from 'react-router-dom'
const drawerWidth = 360

type PropsSideMenu = {
    headerLogo?: JSX.Element
    menuLink: {
        title: string
        icon: JSX.Element
        buttonHref: string
        onClick?: () => void
    }[]
    logoText?: string | JSX.Element
    menuClassName?: string
    headerClassName?: string
    listClassName?: string
    window?: () => Window
}

const openedMixin = (theme: Theme): CSSObject => ({
    width: `${drawerWidth ? drawerWidth + 'px' : '360px'}`,
    [theme.breakpoints.down('sm')]: {
        width: '100%',
        minWidth: '100%',
    },
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
})

const closedMixin = (theme: Theme): CSSObject => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',

    width: '66px',

    '@media (max-width: 768px)': {
        width: '0',
    },

    '& .MuiPaper-root': {
        paddingLeft: '0 !important',
        paddingRight: '0 !important',
    },
    '& .MuiPaper-root .MuiList-root': {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '& p.MuiTypography-root': {
            display: 'none',
        },
    },
    '& .MuiPaper-root .MuiBox-root': {
        '& .MuiListItemIcon-root, & p': {
            display: 'none',
        },
        '& button': {
            alignSelf: 'center',
        },
    },
})

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper ': closedMixin(theme),
    }),
}))

interface AppBarProps extends MuiAppBarProps {
    open?: boolean
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}))
const useStyles = makeStyles(
    (theme: any) =>
        createStyles({
            loginBox: {
                marginTop: 'auto',
                display: 'flex',
                gap: '10px',
                '& .MuiBox-root': {
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                },
                '& .MuiListItemIcon-root': {
                    minWidth: 0,
                },
                '& .MuiButton-root': {
                    alignSelf: 'flex-end',
                    fontSize: '12px',
                    paddingTop: 0,
                    paddingBottom: 0,
                    textTransform: 'capitalize',
                },
            },

            loginFio: {
                fontWeight: 700,
                fontSize: '14px',
                lineHeight: '20px',
            },
            loginSubInfo: {
                fontSize: '12px',
                color: '#8E8C94',
                lineHeight: '11px',
            },
            drawer: {
                '& .MuiDrawer-paper': {
                    borderRight: 'none',
                    boxSizing: 'border-box',
                    paddingLeft: '40px',
                    paddingRight: '40px',
                    paddingBottom: '40px',
                },
            },
            logo: {
                fontSize: 32,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            },

            miniList: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            },
        }),
    { name: 'SidePanel' }
)

export const ResponsiveSideMenu: React.FC<PropsSideMenu> = ({
    logoText,
    menuLink,
    headerClassName,
    listClassName,
    headerLogo,
    ...props
}) => {
    const [open, setOpen] = React.useState(true)

    const handleDrawerOpen = () => {
        setOpen(true)
    }

    const handleDrawerClose = () => {
        setOpen(false)
    }

    const matches = useMediaQuery('(min-width:1200px)')

    const appBarMatches = useMediaQuery('(min-width:768px)') // ок, при 768 и меньше появляется хедер и убирается меню

    React.useEffect(() => {
        setOpen(matches) // при 768 и больше Open - true
    }, [matches])

    const classes = useStyles()

    const [selectedIndex, setSelectedIndex] = React.useState<number>()

    const handleListItemClick = (event: any, index: number) => {
        setSelectedIndex(index)
    }

    const locationCheck = useLocation()

    return (
        <Box sx={{ display: 'flex' }}>
            {!appBarMatches && (
                <AppBar
                    className={headerClassName}
                    position="fixed"
                    open={open}
                    sx={{ boxShadow: 'none' }}
                >
                    <Toolbar
                        sx={{
                            backgroundColor: '#fff',
                            justifyContent: 'space-between',
                        }}
                    >
                        <IconButton
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                color: '#219ade',
                                mr: 2,
                                ml: 2,
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>

                        <Box sx={{ mr: 2, ml: 2 }}>
                            {headerLogo && headerLogo}
                        </Box>
                    </Toolbar>
                </AppBar>
            )}

            <Drawer className={classes.drawer} variant="permanent" open={open}>
                <Box
                    sx={{
                        minHeight: '58px',
                        display: 'flex',
                        paddingBottom: '10px',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginLeft: '0',
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {open && (
                        <>
                            <Box className={classes.logo}>{logoText}</Box>

                            <IconButton
                                sx={{ marginLeft: 'auto' }}
                                onClick={handleDrawerClose}
                            >
                                <MenuIcon />
                            </IconButton>
                        </>
                    )}
                </Box>
                <Divider />
                <List className={listClassName}>
                    {menuLink.map(
                        (
                            { icon: IconLink, title, buttonHref, onClick },
                            index
                        ) => (
                            <Link
                                key={title}
                                underline="none"
                                component={RouterLink}
                                to={buttonHref}
                            >
                                <ListItem
                                    disablePadding
                                    selected={
                                        selectedIndex === index ||
                                        locationCheck.pathname === buttonHref
                                    }
                                >
                                    <ListItemButton
                                        onClick={(event) => {
                                            !matches && setOpen(false)
                                            onClick && onClick()
                                            handleListItemClick(event, index)
                                        }}
                                    >
                                        <ListItemIcon>{IconLink}</ListItemIcon>
                                        <Typography>{title}</Typography>
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        )
                    )}
                </List>
            </Drawer>
        </Box>
    )
}

export default ResponsiveSideMenu
