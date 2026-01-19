"use client";

import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  onConfirm: () => void;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive";
}

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  onConfirm,
  confirmText = "Continue",
  cancelText = "Cancel",
  variant = "default",
}: ConfirmDialogProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        onOpenChange(false);
      }
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open, onOpenChange]);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
          />

          <motion.div
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
              <p className="mt-2 text-sm text-gray-600">{description}</p>
            </div>

            <div className="flex justify-end gap-3 bg-gray-50 px-6 py-4">
              <Button
                variant="outline"
                onClick={() => onOpenChange(false)}
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                {cancelText}
              </Button>
              <Button
                onClick={() => {
                  onConfirm();
                  onOpenChange(false);
                }}
                className={variant === "destructive" ? "bg-red-600 hover:bg-red-700" : ""}
              >
                {confirmText}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
