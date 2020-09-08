import React from 'react';
import { Toolbar, Typography, Fab, Tooltip, LinearProgress } from '@material-ui/core';
import { makeStyles, lighten } from '@material-ui/core/styles';
import { Add, Refresh } from '@material-ui/icons';

const useToolbarStyles = makeStyles(theme => ({
    highlight:
        theme.palette.type === 'light'
            ? {
                  color: theme.palette.secondary.main,
                  backgroundColor: lighten(theme.palette.secondary.light, 0.85)
              }
            : {
                  color: theme.palette.text.primary,
                  backgroundColor: theme.palette.secondary.dark
              },
    spacer: {
        flex: '1 1 100%'
    },
    actions: {
        marginLeft: theme.spacing(2)
    },
    title: {
        flexGrow: 1
    }
}));

const CustomToolbar = ({ center = false, loading, title, onAdd, onRefresh, padding, renderActions, titleSize = 'h2' }) => {
    const classes = useToolbarStyles();

    return (
        <React.Fragment>
            <Toolbar disableGutters={!padding}>
                <div className={classes.title}>
                    <Typography variant={titleSize} id='tableTitle' align={center ? 'center' : 'left'} style={{ whiteSpace: 'nowrap' }}>
                        {title || 'Title'}
                    </Typography>
                </div>

                <div className={classes.actions}>{renderActions && renderActions()}</div>
                {onRefresh && (
                    <div className={classes.actions}>
                        <Tooltip title='Refresh'>
                            <Fab color={'primary'} aria-label='refresh' size={'small'} onClick={onRefresh} disabled={loading}>
                                <Refresh />
                            </Fab>
                        </Tooltip>
                    </div>
                )}
                {onAdd && (
                    <div className={classes.actions}>
                        <Tooltip title='Create New'>
                            <Fab color={'primary'} aria-label='add' size={'small'} onClick={onAdd} disabled={loading}>
                                <Add />
                            </Fab>
                        </Tooltip>
                    </div>
                )}
            </Toolbar>
            {loading && <LinearProgress />}
        </React.Fragment>
    );
};

export default CustomToolbar;
