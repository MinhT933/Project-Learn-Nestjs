import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './model/user/user.module';
import { BookModule } from './book/book.module';
import { AuthModule } from './model/auth/auth.module';
import { JwtModuleShared } from './share/jwt/jwt.module';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './model/auth/auth.guard';
import { ImageModule } from './model/images/image.module';
import { OrderModule } from './model/order/order.module';
import { StripeModule } from './model/stripe/stripe.module';
import { AuctionModule } from './model/auction/auction.module';
import { ScheduleModule } from '@nestjs/schedule';
import { TrpcModule } from './model/trpc/trpc.module';
import { AllExceptionsFilter } from './http-exception.filter';

@Module({
  imports: [
    UserModule,
    BookModule,
    AuthModule,
    ImageModule,
    JwtModuleShared,
    TrpcModule,
    StripeModule,
    AuctionModule,

    OrderModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({ envFilePath: './.env' }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
