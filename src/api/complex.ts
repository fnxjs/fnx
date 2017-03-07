import { types, ComplexDescriptor } from '../core'

export function complex<ComplexType, PrimitiveType extends (number | string | boolean)>(
  serialize: (complexValue: ComplexType) => PrimitiveType,
  deserialize: (primitiveValue: PrimitiveType) => ComplexType,
) {
  const descriptor: ComplexDescriptor<ComplexType, PrimitiveType> = {
    type: types.complex, serialize, deserialize,
    readonly: false, optional: false,
  }
  return descriptor as any as ComplexType
};
