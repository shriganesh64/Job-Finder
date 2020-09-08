interface OptionsProps {
	destructive: Boolean;
	positiveText?: String;
	negativeText?: String;
	cancelable: Boolean;
	onAgree: () => void;
	onCancel: () => void;
}

interface DialogServiceProps {
	showDialog: (title: String, message: String, options: OptionsProps) => void;
	closeDialog: () => void;
}

declare const DialogService: DialogServiceProps;

export const setDialogRef: (instance: any) => {};
export default DialogService;
