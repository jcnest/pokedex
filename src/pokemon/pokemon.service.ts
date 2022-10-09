import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model, MongooseError } from 'mongoose';
import { CreatePokemonDto, UpdatePokemonDto } from './dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
    constructor(
        @InjectModel(Pokemon.name) private readonly model: Model<Pokemon>,
    ) {}

    async create(createPokemonDto: CreatePokemonDto) {
        try {
            const pokemon = await this.model.create({
                ...createPokemonDto,
                name: createPokemonDto.name.toLowerCase(),
            });
            return pokemon;
        } catch (error) {
            this.handleExceptions(error, `Can't create Pokemon`);
        }
    }

    findAll() {
        return `This action returns all pokemon`;
    }

    async findOne(term: string) {
        const pokemon: Pokemon = isValidObjectId(term)
            ? await this.model.findById(term)
            : await this.model.findOne(
                  Number.isInteger(+term)
                      ? { no: +term }
                      : { name: term.toLowerCase() },
              );

        if (!pokemon) {
            throw new NotFoundException(
                `Pokemon with id, name or no '${term}' not found.`,
            );
        }

        return pokemon;
    }

    async update(term: string, updatePokemonDto: UpdatePokemonDto) {
        const pokemon = await this.findOne(term);
        if (updatePokemonDto.name)
            updatePokemonDto.name = updatePokemonDto.name.toLowerCase();

        try {
            await pokemon.updateOne(updatePokemonDto);
            return { ...pokemon.toJSON(), ...updatePokemonDto };
        } catch (error) {
            this.handleExceptions(error, `Can't update Pokemon`);
        }
    }

    async remove(term: string) {
        const pokemon = await this.findOne(term);
        await pokemon.deleteOne();
    }

    private handleExceptions(error: any, internalMessage: string) {
        if (error.code === 11000) {
            throw new BadRequestException(
                `Pokemon already exists in db: ${JSON.stringify(
                    error.keyValue,
                )}`,
            );
        }

        //TODO: Identificar otros posibles errores.
        throw new InternalServerErrorException(
            `${internalMessage || 'Ups!'} - Check server logs.`,
        );
    }
}
