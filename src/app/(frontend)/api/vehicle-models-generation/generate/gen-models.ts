import payloadConfig from '@payload-config'
import { getPayload } from 'payload'

export async function generateModels() {
  const { db, create } = await getPayload({ config: payloadConfig })
  const vehicleMakes = await db.drizzle.query.vehicle_makes.findMany()

  const toyotaModels = [
    'Innova',
    'Vios',
    'Camry',
    'Corolla Altis',
    'Wigo',
    'Raize',
    'Fortuner',
    'Hilux',
  ]
  const kiaModels = ['Morning', 'Carnival', 'K3', 'Seltos', 'Sonet', 'Carens']
  const hondaModels = ['City', 'CR-V', 'HR-V', 'Civic']

  for (const make of vehicleMakes) {
    if (make.name === 'Toyota') {
      for (const model of toyotaModels) {
        await createModel(model, make.id)
      }
    } else if (make.name === 'Kia') {
      for (const model of kiaModels) {
        await createModel(model, make.id)
      }
    } else if (make.name === 'Honda') {
      for (const model of hondaModels) {
        await createModel(model, make.id)
      }
    }
  }

  async function createModel(model: string, makeId: string) {
    await create({
      collection: 'vehicle-models',
      draft: true,
      data: {
        name: model,
        make: makeId,
      },
    })
  }

  return 1
}
