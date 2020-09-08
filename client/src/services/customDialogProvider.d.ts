import React from 'react';
import { DialogProps } from '@material-ui/core';

interface OptionsProps {
	renderDialog: () => React.ReactNode;
	renderDialogActions?: () => React.ReactNode;
	paperClassName?: string;
	destructive?: Boolean;
	title?: String;
	onClose?: Function;
	keepMounted?: Boolean;
	DialogProps?: DialogProps;
}

interface CustomDialogServiceProps {
	showDialog: (options: OptionsProps) => void;
	closeDialog: () => void;
}

declare const CustomDialogService: CustomDialogServiceProps;

export const setCustomDialogRef: (instance: any) => {};
export default CustomDialogService;
