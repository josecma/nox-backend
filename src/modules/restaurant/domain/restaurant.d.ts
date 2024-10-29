import { PrimitiveClient } from "src/modules/client/domain/client";
import ClientDomainEntity from "src/modules/client/domain/client.domain.entity";

export type PrimitiveRestaurant = {
    id?: string;
    name: string;
    capacity: string;
    address: {
        street: string,
        city: string,
        state: string;
        country: string;
    };
} & { clients: ClientDomainEntity[] = [] };

export type PrimitiveAddress = Pick<PrimitiveRestaurant['address'], 'street' | 'city' | 'state' | 'country'>;