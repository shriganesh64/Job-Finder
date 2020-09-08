import * as React from 'react';

export interface MenuProps {
    options: Array<Object>;
    menuIcon: ImageBitmapSource;
    tooltipTitle: String;
}

declare const CustomMenu: React.SFC<MenuProps>;

export default CustomMenu;
