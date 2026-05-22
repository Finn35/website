import { cn } from "@/lib/cn";

type ContainerProps = {
  className?: string;
  children: React.ReactNode;
  as?: "div" | "section" | "article" | "header" | "footer" | "main" | "nav";
};

export function Container({ className, children, as = "div" }: ContainerProps) {
  const Tag = as as keyof JSX.IntrinsicElements;
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[1280px] px-6 sm:px-8 lg:px-12",
        className
      )}
    >
      {children}
    </Tag>
  );
}
