import {
    BadRequestException,
    Injectable,
    InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

    findOne(id: string) {
        return `This action returns a #${id} pokemon`;
    }

    update(id: string, updatePokemonDto: UpdatePokemonDto) {
        return `This action updates a #${id} pokemon`;
    }

    remove(id: string) {
        return `This action removes a #${id} pokemon`;
    }
}
