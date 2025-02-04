import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './modules/users/users.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { ProductsModule } from './modules/products/products.module';
import { CustomersModule } from './modules/customers/customers.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SharedModule,
    UsersModule,
    CompaniesModule,
    ProductsModule,
    CustomersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
