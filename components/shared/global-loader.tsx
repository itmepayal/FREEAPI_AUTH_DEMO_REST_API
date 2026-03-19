"use client";

import { useEffect } from "react";
import { useIsFetching, useIsMutating } from "@tanstack/react-query";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

export function GlobalLoader() {
  const isFetching = useIsFetching();
  const isMutating = useIsMutating();

  useEffect(() => {
    if (isFetching > 0 || isMutating > 0) {
      NProgress.start();
    } else {
      NProgress.done();
    }
  }, [isFetching, isMutating]);

  return null;
}
