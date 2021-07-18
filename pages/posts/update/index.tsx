import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Update() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  });

  return null;
}
