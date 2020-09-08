import React from 'react';
import { Button, LinearProgress } from '@material-ui/core';

const LoadingButton = ({ loading = false, disabled, children, ...props }) => (
    <Button disabled={loading || disabled} {...props}>
        {children}
        {loading && <LinearProgress style={{ position: 'absolute', bottom: 0, width: '100%' }} />}
    </Button>
);

export default LoadingButton;
