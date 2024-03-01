import { INestApplication, Injectable } from '@nestjs/common';
import { z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';
import { UserService } from '../user/user.service';
import { TrpcService } from './trpc.service';

@Injectable()
export class TrpcRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly userService: UserService, // injected service
  ) {}

  appRouter = this.trpc.router({
    getUsers: this.trpc.procedure
      .input(
        z.object({
          name: z.string(),
        }),
      )
      .query(async ({ input }) => {
        const { name } = input;
        // return await this.userService.getUsers(name); // random example showing you how you can now use dependency injection
      }),
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      `/trpc`,
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
      }),
    );
  }
}

export type AppRouter = TrpcRouter[`appRouter`];
