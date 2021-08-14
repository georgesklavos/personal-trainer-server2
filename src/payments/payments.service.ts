import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { connection } from 'mongoose';
import { ClientService } from 'src/client/clients.service';
import { Clients } from 'src/entities/clients.entity';
import { Payments } from 'src/entities/Payments.entity';
import { getRepository, Raw, Repository } from 'typeorm';
import { VerifyPaymentDto } from './verifyPayment.dto';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payments)
    private readonly paymentsRepository: Repository<Payments>,
    @InjectRepository(Clients)
    private readonly clientsRepository: Repository<Clients>,
  ) {}

  async getPayment(client: Clients, month, year): Promise<Payments> {
    return await getRepository(Payments).findOne({
      client: client,
      dateClientPaid: Raw(
        (alias) => `MONTH(${alias}) = ${month}` && `YEAR(${alias}) = ${year}`,
      ),
    });
  }

  async verifyPayment(paymentData) {
    //thelei kai allo des to palio project
    await this.paymentsRepository.update(
      {
        client: paymentData.client,
        dateClientPaid: Raw(
          (alias) =>
            `MONTH(${alias}) = ${paymentData.month}` &&
            `YEAR(${alias}) = ${paymentData.year}`,
        ),
      },
      {
        userVerified: paymentData.userVerified,
        dateVerified: paymentData.dateVerified,
        verified: true,
      },
    );
    const client = await this.clientsRepository.findOne({
      where: { id: paymentData.client },
      relations: ['program'],
    });

    client.endDate = dayjs(client.endDate)
      .add(1, client.program.value.toLowerCase() as dayjs.OpUnitType)
      .toDate();
    await this.clientsRepository.save(client);
  }
}
