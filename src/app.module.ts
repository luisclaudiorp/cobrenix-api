import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { UsersModule } from './modules/users/users.module';
import { CompaniesModule } from './modules/companies/companies.module';
import { ProductsModule } from './modules/products/products.module';
import { CustomersModule } from './modules/customers/customers.module';
import { SingleSalesModule } from './modules/single-sales/single-sales.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SharedModule,
    UsersModule,
    CompaniesModule,
    ProductsModule,
    CustomersModule,
    SingleSalesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
