import Image from "next/image";

type BrandMarkProps = {
  variant?: "dark" | "light";
  className?: string;
};

export function EsraMark({ variant = "dark", className = "h-12 w-auto" }: BrandMarkProps) {
  const src =
    variant === "light" ? "/brand/esra-derman-light.svg" : "/brand/esra-derman.svg";
  return (
    <Image
      src={src}
      alt="Esra Derman"
      width={210}
      height={36}
      className={className}
      priority
      unoptimized
    />
  );
}

export function KwMark({ variant = "dark", className = "h-10 w-auto" }: BrandMarkProps) {
  const src = variant === "light" ? "/brand/kw-platin-light.svg" : "/brand/kw-platin.svg";
  return (
    <Image
      src={src}
      alt="Keller Williams Platin"
      width={168}
      height={29}
      className={className}
      unoptimized
    />
  );
}
