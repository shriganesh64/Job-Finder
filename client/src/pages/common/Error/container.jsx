import React, { Component } from 'react';
import { Grid, Typography } from '@material-ui/core';
import { Illustrations } from '../../../shared';
import Styles from './styles';
import { withStyles } from '@material-ui/styles';

class ErrorPage extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        let {
            classes: { errorImage, container }
        } = this.props;

        return (
            <Grid spacing={2} container justify={'center'} align={'center'} className={container}>
                <img src={Illustrations?.Error404} alt={'Page not found'} className={errorImage} />
                <Typography variant={'h3'}>Page Not Found</Typography>
            </Grid>
        );
    }
}

export default withStyles(Styles)(ErrorPage);
