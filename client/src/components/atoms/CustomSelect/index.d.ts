import React from 'react';
import { SelectProps } from '@material-ui/core';

interface CustomSelectProps extends SelectProps {
    required?: Boolean;
    error?: Boolean;
    value: String | Array | Object;
    multiple?: Boolean;
    onChange: Function;
    placeholder: String;
    MenuProps: any;
    disabled: Boolean;
    renderValue: Function;
    simple: Boolean;
}

declare const CustomSelect: React.SFC<CustomSelectProps>;

export default CustomSelect;
