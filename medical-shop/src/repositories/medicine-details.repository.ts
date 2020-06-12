import {DefaultCrudRepository} from '@loopback/repository';
import {MedicineDetails, MedicineDetailsRelations} from '../models';
import {MysqlDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MedicineDetailsRepository extends DefaultCrudRepository<
  MedicineDetails,
  typeof MedicineDetails.prototype.id,
  MedicineDetailsRelations
> {
  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource,
  ) {
    super(MedicineDetails, dataSource);
  }
}
