// eslint-disable-next-line import/no-anonymous-default-export
export default {
  providers: [
    {
      // domain: process.env.NEXT_PUBLIC_CONVEX_AUTH_ISSUER_URL,
      domain: "https://famous-goldfish-47.clerk.accounts.dev/",
      applicationID: "convex",
    },
  ],
};
