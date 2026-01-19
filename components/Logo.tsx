import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  size?: number;
  href?: string;
  priority?: boolean;
}

export default function Logo({ size = 120, href = "/", priority = false }: LogoProps) {
  const logo = (
    <Image
      src="/logo.png"
      alt="RoomFinder"
      width={size}
      height={size}
      priority={priority}
      className="object-contain"
    />
  );

  return href ? <Link href={href}>{logo}</Link> : logo;
}
