import { Class, Transformer } from '../core/interfaces';

export function generic<T>(k: Class<T>, transformer: Transformer, className = k.name): Class<T> {
  const NewClass = class { } as Class<T>;
  Object.defineProperty(NewClass, 'name', { value: className });
  NewClass.prototype = Object.create(k.prototype);
  NewClass.prototype.constructor = NewClass;
  NewClass.prototype.transformer = transformer;
  return NewClass;
}
