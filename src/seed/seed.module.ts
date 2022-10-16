import { Module } from '@nestjs/common';
import { CommonModule } from '@common/common.module';
import { PokemonModule } from '@pokemon/pokemon.module';
import { SeedService } from '@seed/seed.service';
import { SeedController } from '@seed/seed.controller';

@Module({
    imports: [PokemonModule, CommonModule],
    controllers: [SeedController],
    providers: [SeedService],
})
export class SeedModule {}
