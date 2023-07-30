import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { APP_GUARD } from '@nestjs/core';

import { RolesGuard } from './auth/guards/roles.guard';
import { MailerModule } from '@nestjs-modules/mailer';
import { OtpModule } from './otp/otp.module';
import { ProductModule } from './product/product.module';
// import { OrderModule } from './order/order.module';
// import { CartModule } from './cart/cart.module';
import { CategoryModule } from './category/category.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    MailerModule.forRoot({
      transport: {
        host: 'smtp.sendgrid.net',
        port: 587,
        secure: false,
        auth: {
          user: 'apikey',
          pass: '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',
        },
      },
    }),
    AuthModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'codetogether',
      database: 'furnicadb',
      entities: ['src/entity/**/**/*.ts'],
      autoLoadEntities: true,
      synchronize: true,
    }),
    OtpModule,
    ProductModule,
    // OrderModule,
    // CartModule,
    CategoryModule,
    ChatModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
