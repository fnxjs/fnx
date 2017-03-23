import { ComplexDescriptor, descriptionTypes } from '../core'

/**
 * Describes a complex type. Takes two pure function which are exact inverses of each other.
 * The first is the serialization function which should return something that can be serialized
 * successfully by JSON.stringify. The second is the deserialization function which returns the
 * result of deserializing the serialize returns.
 * https://fnx.js.org/docs/api/complex.html
 * @param serialize Serializes the complex value. Result is passed into JSON.stringify
 * @param deserialize Deserializes the value into the complex type.
 */
export function complex<ComplexType, PrimitiveType extends (number | string | boolean | object)>(
  serialize: (complexValue: ComplexType) => PrimitiveType,
  deserialize: (primitiveValue: PrimitiveType) => ComplexType,
) {
  if (arguments.length < 2) {
    throw new Error()
  }

  if (arguments.length > 2) {
    throw new Error()
  }

  if (typeof serialize !== 'function' || typeof deserialize !== 'function') {
    throw new Error()
  }

  const descriptor: ComplexDescriptor<ComplexType, PrimitiveType> = {
    type: descriptionTypes.complex, serialize, deserialize,
    readonly: false, optional: false,
  }
  return descriptor as any as ComplexType
};
