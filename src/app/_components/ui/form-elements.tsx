import { cn } from "@/utils/cn";
import React from "react";

// Whole Form
export const FormGeneralErrorMessage = ({ message, ...props }: { message: string; } & React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span {...props} className="block mt-2 p-2 text-sm bg-red-500 text-red-50 rounded dark:bg-red-300 dark:text-red-900">
      {message}
    </span>
  );
};
export const FormGeneralSuccessMessage = ({ message, ...props }: { message: string; } & React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span {...props} className="block mt-2 p-2 text-sm bg-green-500 text-green-50 rounded dark:bg-green-300 dark:text-green-900">
      {message}
    </span>
  );
};

// Form Field
export const FormControl = ({ children }: { children: React.ReactNode; }) => {
  return <div className="mb-4">{children}</div>;
};
export const FormLabel = (props: React.LabelHTMLAttributes<HTMLLabelElement>) => {
  return <label {...props} className="block mb-1 text-sm font-normal tracking-wide text-neutral-700 dark:text-neutral-200" />;
};
export const FormHelperText = (props: React.HTMLAttributes<HTMLSpanElement>) => {
  return <span {...props} className="block mt-2 text-sm text-neutral-500 dark:text-neutral-200" />;
};
export const FormErrorMessage = ({ messages, ...props }: { messages: string[]; } & React.HTMLAttributes<HTMLSpanElement>) => {
  return (
    <span {...props} className="block mt-2 text-sm text-red-500 dark:text-red-300">
      {messages.join('\n')}
    </span>
  );
};



// Form Field Inputs
export const Input = ({ leftAddon, ...props }: React.InputHTMLAttributes<HTMLInputElement> & { leftAddon?: React.ReactNode; }) => {
  const c = cn(
    "block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm dark:bg-neutral-800", {
    "pl-[2.5rem]": Boolean(leftAddon),
  }
  );
  const input = <input {...props} className={c} />;

  if (!leftAddon) return input;

  return (
    <div className="relative">
      <span className="absolute left-0 top-0 h-full w-[2rem] flex justify-center items-center bg-neutral-200 rounded-l-md scale-[0.95]">
        {leftAddon}
      </span>
      {input}
    </div>
  );
};
export const Textarea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => {
  return <textarea {...props} className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm dark:bg-neutral-800" />;
};

export const Select = (props: React.SelectHTMLAttributes<HTMLSelectElement>) => {
  return <select {...props} className="mt-1 block w-full px-3 py-2 border border-neutral-300 rounded-md shadow-sm focus:outline-none focus:ring-lime-500 focus:border-lime-500 sm:text-sm dark:bg-neutral-800" />;
};