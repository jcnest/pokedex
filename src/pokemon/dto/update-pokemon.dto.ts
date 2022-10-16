import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from '@pokemon/dto';

export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {}
