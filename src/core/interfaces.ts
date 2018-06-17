export type Json = string | any;
export type IsArray = true | { isArray: true };

export interface Class<T> {
  new(...args): T;
};

export type Transformer = (json: Json) => { [key: string]: any };

export interface Deserializable {
  transformer: Transformer
}
