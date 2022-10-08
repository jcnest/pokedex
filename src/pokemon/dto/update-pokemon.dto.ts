import { PartialType } from '@nestjs/mapped-types';
import { CreatePokemonDto } from '.';

export class UpdatePokemonDto extends PartialType(CreatePokemonDto) {}
