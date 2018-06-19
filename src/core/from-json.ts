import { Json, Class, IsArray } from './interfaces';

export default function fromJson<T>(self: Class<T>, json: Json, isArray?: IsArray): T | T[] {
  if (!json) {
    return json;
  }
  if (typeof json === 'string') {
    return JSON.parse(json, (key: string, value: any): any => {
      return key === '' ? fromJson(self, value, isArray) : value;
    }) as T | T[];
  }
  if (json instanceof Array && !isArray) {
    throw TypeError(`Object ${json} is an array instance. Use 'isArray' parameter to indicate it.`);
  }
  if (!(json instanceof Array) && isArray) {
    throw TypeError(`Object ${json} is not an array instance. Do not use 'isArray' parameter.`);
  }
  if (isArray) {
    return json.map((j: any) => create(self, j));
  } else {
    return create(self, json);
  }
}

function create<T>(self: Class<T>, json: Json): T {
  const obj = Object.create(self.prototype);
  // const obj = new self();
  (<any>Object).assign(obj, json, getTransformation(obj, json));
  return obj;
}

function getTransformation(obj: any, json: Json): { [key: string]: any } | undefined {
  const t = obj.transformer && obj.transformer(json);
  if (!t) {
    return undefined;
  }
  return removeUndefinedEntries(t);
}

function removeUndefinedEntries(t: any): any {
  for (const key in t) {
    if (t.hasOwnProperty(key) && t[key] === undefined) {
      delete t[key];
    }
  }
  return t;
}
