import { Controller, Get } from '@nestjs/common';
import { SeedService } from '@seed/seed.service';

@Controller('seed')
export class SeedController {
    constructor(private readonly seedService: SeedService) {}

    @Get()
    create() {
        return this.seedService.executeSeed();
    }
}
