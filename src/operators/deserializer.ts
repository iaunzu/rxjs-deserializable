import { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { Class, IsArray } from '../core/interfaces';
import { deserialize } from '../core/deserialize'

export function deserializeAs<T>(c: Class<T>): OperatorFunction<any, T>;
export function deserializeAs<T>(c: Class<T>, isArray?: IsArray): OperatorFunction<any, T[]>;
export function deserializeAs<T>(c: Class<T>, isArray?: any): OperatorFunction<any, T | T[]> {
  return map(s => deserialize(s).as(c, isArray));
}
