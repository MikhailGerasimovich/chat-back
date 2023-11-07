import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { CoreModule } from './core/core.module';
import { getEnvironmentFilename } from './common';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `./${getEnvironmentFilename(process.env.NODE_ENV)}`,
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get('DATABASE_URL'),
      }),
    }),
    CoreModule,
  ],
})
export class AppModule {}
