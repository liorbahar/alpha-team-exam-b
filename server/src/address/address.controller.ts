import { Controller, Get } from '@nestjs/common';
import { AddressService } from './address.service';

@Controller('address')
export class AddressController {
    constructor(private addressService: AddressService){}

    @Get()
    public async getAllProcesses(): Promise<string[]>{
        return await this.addressService.getAddresses();
    }
}
