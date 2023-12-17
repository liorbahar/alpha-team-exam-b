import { Injectable } from '@nestjs/common';
import { Address } from './address.entities';

@Injectable()
export class AddressService {
    public addresses: string[] = [];
    
    constructor() {
        this.addresses.push('rehovot');
        this.addresses.push('tel aviv');
        this.addresses.push('ramat gan');
        this.addresses.push('netania')
    }

    public async getAddresses(): Promise<string[]> {
        return Promise.resolve(this.addresses);
    }
}
