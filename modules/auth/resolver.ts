import { AuthService } from "./service.js";

export const authResolvers = {
  Query: {
    me: async (_: any, __: any, { user }: any) => {
      if (!user) throw new Error("Not authenticated");
      return user;
    },
  },
  Mutation: {
    register: async (_: any, args: any) => AuthService.register(args.name, args.email, args.password),
    login: async (_: any, args: any) => AuthService.login(args.email, args.password),
  },
};
