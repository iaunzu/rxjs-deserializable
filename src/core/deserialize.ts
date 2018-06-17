import { Json, Class, IsArray } from './interfaces';
import fromJson from './from-json';

class DeserializatorBuilder {
  constructor(private json: Json) { }

  as<T>(clazz: Class<T>): T;
  as<T>(clazz: Class<T>, isArray: IsArray): T[];
  as<T>(clazz: Class<T>, isArray?: IsArray): T | T[] {
    return fromJson(clazz, this.json, isArray);
  }
}

export function deserialize(json: Json): DeserializatorBuilder {
  return new DeserializatorBuilder(json);
}
