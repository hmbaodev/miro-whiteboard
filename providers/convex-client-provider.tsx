"use client";

import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ClerkProvider, RedirectToSignIn, SignUpButton, useAuth } from "@clerk/nextjs";
import {
  Authenticated,
  AuthLoading,
  ConvexReactClient,
  Unauthenticated,
} from "convex/react";

import Loading from "@/components/auth/loading";
import { RedirectStatusCode } from "next/dist/client/components/redirect-status-code";

interface ConvexClientProviderProps {
  children: React.ReactNode;
}

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export const ConvexClientProvider = ({
  children,
}: ConvexClientProviderProps) => {
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY!}
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        {/* If user is not authenticated, ask to sign up */}
        <Unauthenticated>
          <RedirectToSignIn />
        </Unauthenticated>
        {/* When user completed signin, direct to dashboard */}
        <Authenticated>{children}</Authenticated>
        {/* When user signing in, load the logo and wait */}
        <AuthLoading>
          <Loading />
        </AuthLoading>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};
