import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
} from '@loopback/rest';
import {MedicineDetails} from '../models';
import {MedicineDetailsRepository} from '../repositories';

export class MedicineController {
  constructor(
    @repository(MedicineDetailsRepository)
    public medicineDetailsRepository : MedicineDetailsRepository,
  ) {}

  @post('/medicine-details', {
    responses: {
      '200': {
        description: 'MedicineDetails model instance',
        content: {'application/json': {schema: getModelSchemaRef(MedicineDetails)}},
      },
    },
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedicineDetails, {
            title: 'NewMedicineDetails',
            exclude: ['id'],
          }),
        },
      },
    })
    medicineDetails: Omit<MedicineDetails, 'id'>,
  ): Promise<MedicineDetails> {
    return this.medicineDetailsRepository.create(medicineDetails);
  }

  @get('/medicine-details/count', {
    responses: {
      '200': {
        description: 'MedicineDetails model count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async count(
    @param.where(MedicineDetails) where?: Where<MedicineDetails>,
  ): Promise<Count> {
    return this.medicineDetailsRepository.count(where);
  }

  @get('/medicine-details', {
    responses: {
      '200': {
        description: 'Array of MedicineDetails model instances',
        content: {
          'application/json': {
            schema: {
              type: 'array',
              items: getModelSchemaRef(MedicineDetails, {includeRelations: true}),
            },
          },
        },
      },
    },
  })
  async find(
    @param.filter(MedicineDetails) filter?: Filter<MedicineDetails>,
  ): Promise<MedicineDetails[]> {
    return this.medicineDetailsRepository.find(filter);
  }

  @patch('/medicine-details', {
    responses: {
      '200': {
        description: 'MedicineDetails PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedicineDetails, {partial: true}),
        },
      },
    })
    medicineDetails: MedicineDetails,
    @param.where(MedicineDetails) where?: Where<MedicineDetails>,
  ): Promise<Count> {
    return this.medicineDetailsRepository.updateAll(medicineDetails, where);
  }

  @get('/medicine-details/{id}', {
    responses: {
      '200': {
        description: 'MedicineDetails model instance',
        content: {
          'application/json': {
            schema: getModelSchemaRef(MedicineDetails, {includeRelations: true}),
          },
        },
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(MedicineDetails, {exclude: 'where'}) filter?: FilterExcludingWhere<MedicineDetails>
  ): Promise<MedicineDetails> {
    return this.medicineDetailsRepository.findById(id, filter);
  }

  @patch('/medicine-details/{id}', {
    responses: {
      '204': {
        description: 'MedicineDetails PATCH success',
      },
    },
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MedicineDetails, {partial: true}),
        },
      },
    })
    medicineDetails: MedicineDetails,
  ): Promise<void> {
    await this.medicineDetailsRepository.updateById(id, medicineDetails);
  }

  @put('/medicine-details/{id}', {
    responses: {
      '204': {
        description: 'MedicineDetails PUT success',
      },
    },
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() medicineDetails: MedicineDetails,
  ): Promise<void> {
    await this.medicineDetailsRepository.replaceById(id, medicineDetails);
  }

  @del('/medicine-details/{id}', {
    responses: {
      '204': {
        description: 'MedicineDetails DELETE success',
      },
    },
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.medicineDetailsRepository.deleteById(id);
  }
}
