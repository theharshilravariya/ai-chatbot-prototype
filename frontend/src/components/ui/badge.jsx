import { cn } from '@/lib/utils';

export const Badge = ({ children, className, variant = 'default', ...props }) => {
  const variants = {
    default: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    success: 'bg-green-500/20 text-green-300 border-green-500/30',
    danger: 'bg-red-500/20 text-red-300 border-red-500/30',
    warning: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    info: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border',
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};
