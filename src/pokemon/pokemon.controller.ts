import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    HttpCode,
    HttpStatus,
    Query,
} from '@nestjs/common';
import { ParseMongoIdPipe } from '@common/pipes';
import { PaginationDto } from '@common/dto';
import { PokemonService } from '@pokemon/pokemon.service';
import { CreatePokemonDto, UpdatePokemonDto } from '@pokemon/dto';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED) // Aquí se puede personalizar el codígo de respuesta.
    create(@Body() createPokemonDto: CreatePokemonDto) {
        return this.pokemonService.create(createPokemonDto);
    }

    @Get()
    findAll(@Query() pagination: PaginationDto) {
        return this.pokemonService.findAll(pagination);
    }

    @Get(':term')
    findOne(@Param('term') term: string) {
        return this.pokemonService.findOne(term);
    }

    @Patch(':term')
    update(
        @Param('term') term: string,
        @Body() updatePokemonDto: UpdatePokemonDto,
    ) {
        return this.pokemonService.update(term, updatePokemonDto);
    }

    @Delete(':id')
    remove(@Param('id', ParseMongoIdPipe) id: string) {
        return this.pokemonService.remove(id);
    }
}
