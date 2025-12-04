"use client";

import Lottie from "lottie-react";
import { useEffect, useState } from "react";

interface LottieAnimationProps {
  animationData?: object;
  url?: string;
  className?: string;
  loop?: boolean;
  autoplay?: boolean;
}

export default function LottieAnimation({
  animationData: initialData,
  url,
  className = "",
  loop = true,
  autoplay = true,
}: LottieAnimationProps) {
  const [animationData, setAnimationData] = useState<object | null>(initialData || null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (initialData) {
      setAnimationData(initialData);
      return;
    }
    
    if (!url) return;

    fetch(url)
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch");
        return response.json();
      })
      .then((data) => setAnimationData(data))
      .catch(() => setError(true));
  }, [url, initialData]);

  if (error || !animationData) {
    return null;
  }

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
    />
  );
}

