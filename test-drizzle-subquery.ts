import { sql, eq, and } from 'drizzle-orm'
import { getPayload } from 'payload'
import payloadConfig from './src/payload.config'
import { products, products_rels, vehicle_models } from './src/payload-generated-schema'

async function run() {
  const { db: { drizzle } } = await getPayload({ config: payloadConfig })
  
  const q = drizzle.select({
    id: products.id,
    fitments: drizzle.select({ names: sql<string[]>`array_remove(array_agg(${vehicle_models.name}), NULL)` })
      .from(products_rels)
      .leftJoin(vehicle_models, eq(vehicle_models.id, products_rels['vehicle-modelsID']))
      .where(and(eq(products_rels.parent, products.id), eq(products_rels.path, 'model-fitments')))
  }).from(products).limit(1)

  console.log(await q)
  process.exit(0)
}

run().catch(console.error)
