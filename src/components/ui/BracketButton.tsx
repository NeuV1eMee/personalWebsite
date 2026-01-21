import Link from "next/link";
import { cn } from "@/lib/utils";

interface BracketButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  className?: string;
  active?: boolean;
}

export function BracketButton({ text, href, onClick, className, active }: BracketButtonProps) {
  const content = (
    <span className={cn(
      "group relative inline-flex items-center justify-center px-4 py-2 font-sans text-lg transition-colors duration-300",
      active ? "text-white" : "text-gray-400 hover:text-white",
      className
    )}>
      <span className="mr-2 opacity-50 group-hover:opacity-100 transition-opacity">[</span>
      <span className="tracking-widest uppercase">{text}</span>
      <span className="ml-2 opacity-50 group-hover:opacity-100 transition-opacity">]</span>
    </span>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return <button onClick={onClick}>{content}</button>;
}
