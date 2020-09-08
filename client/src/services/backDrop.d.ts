import React from 'react';

interface BackDropServiceProps {
    showBackDrop: () => void;
    closeBackDrop: () => void;
}

declare const BackDropService: BackDropServiceProps;

export const setBackDropRef: (instance: any) => {};
export default BackDropService;
