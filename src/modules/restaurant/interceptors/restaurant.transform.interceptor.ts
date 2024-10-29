import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { PrimitiveRestaurant } from '../domain/restaurant';
import RestaurantDomainEntity from '../domain/restaurant.domain.entity';
import RestaurantMapper from '../mapper/restaurant.mapper';

export interface Response<T> {
    data: T;
}

@Injectable()
export class RestaurantTransformInterceptor implements NestInterceptor<RestaurantDomainEntity, Response<PrimitiveRestaurant | PrimitiveRestaurant[]>> {

    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<PrimitiveRestaurant | PrimitiveRestaurant[]>> {
        return next.handle().pipe(map(data => {
            if (Array.isArray(data)) {
                return { data: this.transformToPrimitiveArray(data) };
            }
            return { data: this.transformToPrimitive(data) };
        }));
    };

    private transformToPrimitiveArray(domainEntities: RestaurantDomainEntity[]): PrimitiveRestaurant[] {
        return domainEntities.map(domainEntity => this.transformToPrimitive(domainEntity));
    }

    private transformToPrimitive(domainEntity: RestaurantDomainEntity): PrimitiveRestaurant {
        return RestaurantMapper.toPrimitive(domainEntity);
    };
};