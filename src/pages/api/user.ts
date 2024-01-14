import { appRouter } from "@/server/api/root";
import { createTRPCContext } from "@/server/api/trpc";
import { type User } from "@clerk/nextjs/dist/types/server";
import { TRPCError } from "@trpc/server";
import { getHTTPStatusCodeFromError } from "@trpc/server/http";
import { type NextApiRequest, type NextApiResponse } from "next";

interface UserRequest {
  data: User;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const ctx = createTRPCContext({ req, res });
    const caller = appRouter.createCaller(ctx);
    try {
      const userObj = req.body as UserRequest;
      if (userObj?.data?.id) {
        const user = await caller.user.createUser({
          userId: userObj.data.id,
        });
        res.status(200).json(user);
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (cause) {
      if (cause instanceof TRPCError) {
        const httpCode = getHTTPStatusCodeFromError(cause);
        return res.status(httpCode).json(cause);
      }
      console.error(cause);
      res.status(500).json({ message: "Internal server error" });
    }
  }
}
