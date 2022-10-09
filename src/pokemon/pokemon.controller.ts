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
} from '@nestjs/common';
import { ParseMongoIdPipe } from '@pipes/parse-mongo-id.pipe';
import { PokemonService } from './pokemon.service';
import { CreatePokemonDto, UpdatePokemonDto } from './dto';

@Controller('pokemon')
export class PokemonController {
    constructor(private readonly pokemonService: PokemonService) {}

    @Post()
    @HttpCode(HttpStatus.CREATED) // Aquí se puede personalizar el codígo de respuesta.
    create(@Body() createPokemonDto: CreatePokemonDto) {
        return this.pokemonService.create(createPokemonDto);
    }

    @Get()
    findAll() {
        return this.pokemonService.findAll();
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
