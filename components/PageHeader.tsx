interface PageHeaderProps {
  title: string;
  description: string;
  size?: "lg" | "md";
}

export default function PageHeader({
  title,
  description,
  size = "lg",
}: PageHeaderProps) {
  const isLarge = size === "lg";

  return (
    <div>
      <h1
        className={`font-bold text-gray-900 tracking-tight ${
          isLarge ? "text-2xl" : "text-xl"
        }`}
      >
        {title}
      </h1>
      <p className={`text-xs text-gray-500 ${isLarge ? "mt-1" : "mt-0.5"}`}>
        {description}
      </p>
    </div>
  );
}