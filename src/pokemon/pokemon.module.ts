import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonController } from '@pokemon/pokemon.controller';
import { PokemonService } from '@pokemon/pokemon.service';
import { Pokemon, PokemonSchema } from '@pokemon/entities';

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
