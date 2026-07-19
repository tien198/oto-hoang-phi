import { v7 as uuidv7 } from 'uuid'
import { FieldHook } from 'payload'

export const generateUUID7: FieldHook = ({ value, operation }) => {
  if (operation === 'create') {
    return uuidv7()
  }
  return value
}
