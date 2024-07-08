import * as React from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { IoMdClose } from 'react-icons/io';

import { cn } from '../../utils';

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = DialogPrimitive.Portal;

const DialogClose = DialogPrimitive.Close;

// eslint-disable-next-line react/prop-types
const DialogOverlay = React.forwardRef(({ className, ...props }, ref) => (
    <DialogPrimitive.Overlay
        ref={ref}
        className={cn(
            'fixed inset-0 z-50 bg-black/80  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
            className
        )}
        {...props}
    />
));
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

// eslint-disable-next-line react/prop-types
const DialogContent = React.forwardRef(({ className, onClose, children, ...props }, ref) => (
    <DialogPortal>
        <DialogOverlay />
        <DialogPrimitive.Content
            ref={ref}
            className={cn(
                'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border border-slate-200 bg-white p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg dark:border-slate-800 dark:bg-slate-950',
                className
            )}
            {...props}
        >
            {children}
            <DialogPrimitive.Close
                onClick={onClose}
                className="absolute right-6 top-6 rounded-full opacity-70 hover:border-slate border-[1px] p-1"
            >
                <IoMdClose size={24} className="text-xl h-6 w-6 items-center" />
                <span className="sr-only">Close</span>
            </DialogPrimitive.Close>
        </DialogPrimitive.Content>
    </DialogPortal>
));
DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
    // eslint-disable-next-line react/prop-types
    className,
    ...props
}) => <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />;
DialogHeader.displayName = 'DialogHeader';

const DialogFooter = ({
    // eslint-disable-next-line react/prop-types
    className,
    ...props
}) => <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />;
DialogFooter.displayName = 'DialogFooter';

// eslint-disable-next-line react/prop-types
const DialogTitle = React.forwardRef(({ className, ...props }, ref) => (
    <DialogPrimitive.Title
        ref={ref}
        className={cn('text-lg font-semibold leading-none tracking-tight', className)}
        {...props}
    />
));
DialogTitle.displayName = DialogPrimitive.Title.displayName;

// eslint-disable-next-line react/prop-types
const DialogDescription = React.forwardRef(({ className, ...props }, ref) => (
    <DialogPrimitive.Description
        ref={ref}
        className={cn('text-sm text-slate-500 dark:text-slate-400', className)}
        {...props}
    />
));
DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
    Dialog,
    DialogPortal,
    DialogOverlay,
    DialogClose,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogFooter,
    DialogTitle,
    DialogDescription,
};
