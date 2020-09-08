import React, { Component } from 'react';
import Styles from './styles';
import { withStyles } from '@material-ui/styles';
import { Backdrop, CircularProgress } from '@material-ui/core';

const BackDropContext = React.createContext();

export const withDialog = RCTComponent =>
    React.forwardRef((props, ref) => (
        <BackDropContext.Consumer>
            {context => <RCTComponent {...props} ref={ref} showBackDrop={context.showBackDrop} closeBackDrop={context.closeBackDrop} />}
        </BackDropContext.Consumer>
    ));

class BackDropProvider extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            context: {
                showBackDrop: this._showBackDrop.bind(this),
                closeBackDrop: this._closeBackDrop.bind(this)
            }
        };
    }

    _showBackDrop() {
        this.setState({ open: true });
    }

    _closeBackDrop() {
        this.setState({ open: false });
    }

    render() {
        let { context, open } = this.state;
        let { children, classes } = this.props;

        return (
            <BackDropContext.Provider value={context}>
                {children}
                <Backdrop className={classes.backdrop} open={open}>
                    <CircularProgress color={'inherit'} />
                </Backdrop>
            </BackDropContext.Provider>
        );
    }
}

export default withStyles(Styles)(BackDropProvider);
