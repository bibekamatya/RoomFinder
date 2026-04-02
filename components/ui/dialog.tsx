"use client";

import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { useEffect, ReactNode } from "react";
import { X } from "lucide-react";

interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  title?: string;
  maxWidth?: string;
  variant?: "default" | "bottom-sheet";
}

export function Dialog({
  open,
  onOpenChange,
  children,
  title,
  maxWidth = "max-w-lg",
  variant = "default",
}: DialogProps) {
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

  const isBottomSheet = variant === "bottom-sheet";

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className={`fixed inset-0 z-50 flex ${isBottomSheet ? "md:items-center md:justify-center items-end" : "items-center justify-center p-4"}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <motion.div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => onOpenChange(false)}
          />

          <motion.div
            className={`relative w-full ${maxWidth} ${isBottomSheet ? "md:max-h-[90vh] max-h-[85vh]" : "max-h-[90vh]"} overflow-y-auto ${isBottomSheet ? "md:rounded-2xl rounded-t-2xl" : "rounded-2xl"} bg-white dark:bg-gray-900 shadow-2xl ${isBottomSheet ? "md:m-4" : ""}`}
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
          >
            {isBottomSheet && (
              <div className="md:hidden sticky top-0 z-10 bg-white dark:bg-gray-900 pt-2 pb-1 flex justify-center">
                <div className="w-12 h-1 bg-gray-300 dark:bg-gray-700 rounded-full" />
              </div>
            )}

            {title && (
              <div className="sticky top-0 z-10 flex items-center justify-between border-b p-4 dark:border-gray-800 bg-white dark:bg-gray-900">
                <h2 className="text-lg font-semibold">{title}</h2>
                <button
                  onClick={() => onOpenChange(false)}
                  className={`${isBottomSheet ? "md:block hidden" : ""} rounded-lg p-1 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors`}
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            )}
            <div className="p-4">{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
