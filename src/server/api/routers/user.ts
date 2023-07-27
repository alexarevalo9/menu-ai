import { z } from "zod";
import { createTRPCRouter, privateProcedure, publicProcedure } from "../trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.create({
        data: {
          userId: input.userId,
        },
        include: {
          onBoarding: true,
        },
      });

      return user;
    }),
  getOnBoardingByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.userId,
        },
      });

      if (!user) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "User not found",
        });
      }

      return user.isOnboardingDone;
    }),
  createOnBoarding: privateProcedure
    .input(
      z.object({
        goal: z.string(),
        active: z.string(),
        gender: z.string(),
        birthdate: z.date(),
        country: z.string(),
        height: z.number(),
        weight: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const onboarding = await ctx.prisma.onboarding.create({
        data: {
          goal: input.goal,
          active: input.active,
          birthdate: input.birthdate,
          country: input.country,
          gender: input.gender,
          height: input.height,
          weight: input.weight,
          userId: ctx.userId,
        },
      });

      return onboarding;
    }),
});
