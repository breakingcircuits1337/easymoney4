import type { HTMLAttributes } from 'react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface TagBadgeProps extends HTMLAttributes<HTMLDivElement> {
  tag: string;
}

export function TagBadge({ tag, className, ...props }: TagBadgeProps) {
  return (
    <Badge variant="secondary" className={cn("capitalize", className)} {...props}>
      {tag}
    </Badge>
  );
}
