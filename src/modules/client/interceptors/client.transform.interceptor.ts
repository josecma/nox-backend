import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrimitiveClient } from '../domain/client';
import ClientDomainEntity from '../domain/client.domain.entity';
import ClientMapper from '../mappers/client.mapper';

export interface Response<T> {
    data: T;
}

@Injectable()
export class ClientTransformInterceptor implements NestInterceptor<ClientDomainEntity, Response<PrimitiveClient | PrimitiveClient[]>> {

    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<PrimitiveClient | PrimitiveClient[]>> {
        return next.handle().pipe(map(data => {
            if (Array.isArray(data)) {
                return { data: this.transformToPrimitiveArray(data) };
            }
            return { data: this.transformToPrimitive(data) };
        }));
    };

    private transformToPrimitiveArray(domainEntities: ClientDomainEntity[]): PrimitiveClient[] {
        return domainEntities.map(domainEntity => this.transformToPrimitive(domainEntity));
    }

    private transformToPrimitive(domainEntity: ClientDomainEntity): PrimitiveClient {
        return ClientMapper.toPrimitive(domainEntity);
    };
};