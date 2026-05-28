"use client";

import {
  ReactNode,
  useEffect,
} from "react";

import {
  PostHogProvider,
} from "posthog-js/react";

import posthog from "posthog-js";

export function Providers({
  children,
}: {
  children: ReactNode;
}) {
  useEffect(() => {
    if (
      !process.env
        .NEXT_PUBLIC_POSTHOG_KEY
    ) {
      return;
    }

    posthog.init(
      process.env
        .NEXT_PUBLIC_POSTHOG_KEY,
      {
        api_host:
          process.env
            .NEXT_PUBLIC_POSTHOG_HOST,

        capture_pageview: true,

        capture_pageleave: true,

        autocapture: true,
      }
    );
  }, []);

  return (
    <PostHogProvider client={posthog}>
      {children}
    </PostHogProvider>
  );
}