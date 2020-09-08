import React from 'react';
import { Variant } from '@material-ui/core/styles/createTypography';

export interface CustomToolbarProps {
    center?: Boolean;
    loading?: Boolean;
    title: String;
    onAdd?: () => void;
    onRefresh?: () => void;
    padding?: Boolean;
    renderActions?: () => React.ReactNode;
    titleSize?: Variant;
}

declare const CustomToolbar: React.SFC<CustomToolbarProps>;

export default CustomToolbar;
