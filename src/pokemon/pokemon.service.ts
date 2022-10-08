import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
    NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
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
            if (error.code === 11000) {
                throw new BadRequestException(
                    `Pokemon already exists in db: ${JSON.stringify(
                        error.keyValue,
                    )}`,
                );
            }

            //TODO: Identificar otros posibles errores.
            console.log(error);
            throw new InternalServerErrorException(
                `Can't create Pokemon - Check server logs.`,
            );
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

    update(id: string, updatePokemonDto: UpdatePokemonDto) {
        return `This action updates a #${id} pokemon`;
    }

    remove(id: string) {
        return `This action removes a #${id} pokemon`;
    }
}
