import React from 'react';
import { ButtonProps } from '@material-ui/core';

export interface LoadingButtonProps extends ButtonProps {
    loading: Boolean;
    disabled: Boolean;
}

declare const LoadingButton: React.SFC<LoadingButtonProps>;

export default LoadingButton;
