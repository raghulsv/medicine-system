import {Entity, model, property} from '@loopback/repository';

@model()
export class MedicineDetails extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  medicine_name: string;

  @property({
    type: 'string',
    required: true,
  })
  description: string;

  @property({
    type: 'string',
    required: true,
  })
  manufacture_date: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @property({
    type: 'string',
    required: true,
  })
  brand: string;




  constructor(data?: Partial<MedicineDetails>) {
    super(data);
  }
}

export interface MedicineDetailsRelations {
  // describe navigational properties here
}

export type MedicineDetailsWithRelations = MedicineDetails & MedicineDetailsRelations;
