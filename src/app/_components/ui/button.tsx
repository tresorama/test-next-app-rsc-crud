import { cn } from '@/utils/cn';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>
  & {
    variant?: 'white' | 'black' | 'green';
  };

export const Button = ({
  variant = 'white',
  className = '',
  ...props
}: ButtonProps
) => {
  const c = cn(
    "px-4 py-2 rounded-md shadow-sm text-sm font-medium disabled:opacity-20", {
    "bg-neutral-50 text-black hover:bg-neutral-200": variant === 'white',
    "bg-neutral-950 text-neutral-50 hover:bg-neutral-800": variant === 'black',
    "bg-green-500 text-green-50 hover:bg-green-600": variant === 'green',
  },
    className,
  );
  return <button {...props} className={c} />;
};