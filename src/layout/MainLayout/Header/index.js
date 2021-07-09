import React from 'react';
import { Box, Grid, makeStyles, IconButton, Hidden } from '@material-ui/core';

import MenuTwoToneIcon from '@material-ui/icons/MenuTwoTone';

import ProfileSection from './ProfileSection';
import NotificationSection from './NotificationSection';

import logo from './../../../assets/images/ProcurementCalabarMini.png';
import { drawerWidth } from './../../../store/constant';

const useStyles = makeStyles((theme) => ({
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(1.25),
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    menuIcon: {
        fontSize: '1.5rem',
    },
}));

const Header = (props) => {
    const { drawerToggle } = props;
    const classes = useStyles();

    return (
        <React.Fragment>
            <Box width={drawerWidth}>
                <Grid container justify="space-between" alignItems="center" style={{ marginLeft: 200 }}>
                    <Grid item style={{ borderRightWidth: 1, borderRightColor: 'grey', borderRightStyle: 'solid' }}>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            color="black"
                            aria-label="open drawer"
                            onClick={drawerToggle}
                        >
                            <MenuTwoToneIcon className={classes.menuIcon} />
                        </IconButton>
                    </Grid>
                    <Hidden smDown>
                        <Grid item>
                            <Box mt={0.5}>
                                <img src={logo} alt="Logo" />
                            </Box>
                        </Grid>
                    </Hidden>
                </Grid>
            </Box>
            <div className={classes.grow} />
            <div style={{ backgroundColor: '#2dba68', borderRadius: 18 }}>
                <NotificationSection />
            </div>

            {/* <ProfileSection style={{ color: 'green' }} /> */}
        </React.Fragment>
    );
};

export default Header;
