import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "discount" | "new" | "bestseller" | "outofstock" | "default";
  className?: string;
}

export default function Badge({ children, variant = "default", className }: BadgeProps) {
  const variants = {
    discount: "bg-red-500 text-white",
    new: "bg-[#3e2723] text-white",
    bestseller: "bg-[#8d6e63] text-white",
    outofstock: "bg-gray-400 text-white",
    default: "bg-gray-100 text-gray-700",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
