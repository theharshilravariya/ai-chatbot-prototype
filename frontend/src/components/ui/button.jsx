import { cn } from '@/lib/utils';

export const Button = ({ 
  children, 
  className, 
  variant = 'primary',
  size = 'md',
  ...props 
}) => {
  const baseStyles = 'font-semibold rounded-lg transition transform active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variants = {
    primary: 'bg-purple-600 text-white hover:bg-purple-700',
    secondary: 'bg-white/10 backdrop-blur text-white hover:bg-white/20',
    success: 'bg-green-600 text-white hover:bg-green-700',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    ghost: 'text-white hover:bg-white/10',
  };
  
  const sizes = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      {children}
    </button>
  );
};
