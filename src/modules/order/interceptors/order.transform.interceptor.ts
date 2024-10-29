import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import OrderMapper from '../mappers/order.mapper';
import OrderDomainEntity from '../domain/order.domain.entity';
import { PrimitiveOrder } from '../domain/order';

export interface Response<T> {
    data: T;
}

@Injectable()
export class OrderTransformInterceptor implements NestInterceptor<OrderDomainEntity, Response<PrimitiveOrder | PrimitiveOrder[]>> {
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<PrimitiveOrder | PrimitiveOrder[]>> {
        return next.handle().pipe(map(data => {
            if (Array.isArray(data)) {
                return { data: this.transformToPrimitiveArray(data) };
            }
            return { data: this.transformToPrimitive(data) };
        }));
    }

    private transformToPrimitiveArray(domainEntities: OrderDomainEntity[]): PrimitiveOrder[] {
        return domainEntities.map(domainEntity => this.transformToPrimitive(domainEntity));
    }

    private transformToPrimitive(domainEntity: OrderDomainEntity): PrimitiveOrder {
        return OrderMapper.toPrimitive(domainEntity);
    }
}
