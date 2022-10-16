import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AxiosAdapter } from '@common/adapters';
import { Pokemon } from '@pokemon/entities';
import { PokeResponse } from '@seed/interfaces';

@Injectable()
export class SeedService {
    constructor(
        @InjectModel(Pokemon.name)
        private readonly pokemonModel: Model<Pokemon>,
        private readonly http: AxiosAdapter,
    ) {}

    async executeSeed() {
        const data = await this.http.get<PokeResponse>(
            'https://pokeapi.co/api/v2/pokemon?limit=512',
        );

        await this.pokemonModel.deleteMany();

        const pokemons = data.results.map(({ name, url }) => {
            const no = +url.split('/').at(-2);
            return { name, no };
        });

        const rows = (await this.pokemonModel.insertMany(pokemons)).length;

        return `Seed successfully executed, ${rows} pokemons inserted.`;
    }
}
