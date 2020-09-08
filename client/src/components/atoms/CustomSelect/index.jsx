import React from 'react';
import styles from './styles';

import { withStyles, FormControl, Select, OutlinedInput } from '@material-ui/core';

const CustomSelect = ({
    required,
    error,
    value,
    multiple = false,
    onChange,
    MenuProps,
    disabled = false,
    renderValue,
    placeholder = '',
    simple = false,
    children,
    classes,
    ...restProps
}) => {
    return (
        <FormControl variant={'outlined'} fullWidth margin={'normal'}>
            <Select
                value={value}
                placeholder={placeholder}
                onChange={onChange}
                multiple={multiple}
                input={!simple ? <OutlinedInput /> : null}
                MenuProps={MenuProps}
                renderValue={renderValue || null}
                disabled={disabled}
                {...restProps}
            >
                {children}
            </Select>
        </FormControl>
    );
};

export default withStyles(styles)(CustomSelect);
