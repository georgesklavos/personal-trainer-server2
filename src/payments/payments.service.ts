import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { connection } from 'mongoose';
import { Clients } from 'src/entities/clients.entity';
import { Payments } from 'src/entities/Payments.entity';
import { getRepository, Raw, Repository } from 'typeorm';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payments)
    private readonly paymentsRepository: Repository<Payments>,
  ) {}

  async validatePayment(client: Clients, month, year): Promise<Payments> {
    return await getRepository(Payments).findOne({
      client: client,
      dateClientPaid: Raw(
        (alias) => `MONTH(${alias}) = ${month}` && `YEAR(${alias}) = ${year}`,
      ),
    });
  }

  async createPayment(paymentData: Payments) {
    paymentData.userVerified = null;
    paymentData.verified = false;
    paymentData.dateVerified = null;
    const newPayment = await this.paymentsRepository.create(paymentData);
    return (await this.paymentsRepository.save(newPayment)).id;
  }
}
