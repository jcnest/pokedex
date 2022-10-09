import {
    ArgumentMetadata,
    BadRequestException,
    Injectable,
    PipeTransform,
} from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform<string, string> {
    transform(value: string, metadata: ArgumentMetadata) {
        if (!isValidObjectId(value)) {
            throw new BadRequestException(
                `${metadata.data} must be a Mongo's ObjectId.`,
            );
        }
        return value;
    }
}
