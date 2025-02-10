<<<<<<< HEAD
import { useToast } from "@/hooks/use-toast"
=======
"use client";

import { useToast } from "@/hooks/use-toast";
>>>>>>> 2b603828913a9c65c6aed59f8a8475b3e3b90c33
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
<<<<<<< HEAD
} from "@/components/ui/toast"

export function Toaster() {
  const { toasts } = useToast()
=======
} from "@/components/ui/toast";

export function Toaster() {
  const { toasts } = useToast();
>>>>>>> 2b603828913a9c65c6aed59f8a8475b3e3b90c33

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
<<<<<<< HEAD
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
=======
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
>>>>>>> 2b603828913a9c65c6aed59f8a8475b3e3b90c33
}
