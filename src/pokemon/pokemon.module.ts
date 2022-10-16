import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { Pokemon, PokemonSchema } from './entities';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Pokemon.name, schema: PokemonSchema },
        ]),
    ],
    exports: [MongooseModule],
    controllers: [PokemonController],
    providers: [PokemonService],
})
export class PokemonModule {}
