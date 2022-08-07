import { Module } from '@nestjs/common';
import Service from 'src/services/SmsService';
import { DatabaseModule } from 'src/config/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [Service],
  exports: [Service], // 👈 export for DI
})
export default class SmsModule {}
