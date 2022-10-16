import { join } from 'path';
import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonModule } from '@common/common.module';
import { PokemonModule } from '@pokemon/pokemon.module';
import { SeedModule } from './seed/seed.module';

@Module({
    imports: [
        ServeStaticModule.forRoot({
            rootPath: join(__dirname, '..', 'public'),
        }),
        MongooseModule.forRoot('mongodb://localhost:27018/pokedex'),
        CommonModule,
        PokemonModule,
        SeedModule,
    ],
})
export class AppModule {}
