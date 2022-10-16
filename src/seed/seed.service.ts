import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import axios, { AxiosInstance } from 'axios';
import { Model } from 'mongoose';
import { Pokemon } from '@pokemon/entities';
import { PokeResponse } from './interfaces';

@Injectable()
export class SeedService {
    private readonly axios: AxiosInstance = axios;

    constructor(
        @InjectModel(Pokemon.name)
        private readonly pokemonModel: Model<Pokemon>,
    ) {}

    async executeSeed() {
        const { data } = await this.axios.get<PokeResponse>(
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
