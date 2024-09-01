import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { ConnectionString } from "connection-string";

import { databaseConfig } from "./database.config";

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forFeature(databaseConfig)],
      inject: [ConfigService],
      useFactory: async () => {
        const config = databaseConfig();
        const uri = new ConnectionString("", {
          user: config.username,
          password: config.password,
          protocol: config.port ? "mongodb" : "mongodb+srv",
          hosts: [{ name: config.host, port: config.port }],
        }).toString();

        return {
          uri,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
