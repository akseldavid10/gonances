
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model ExchangeRateCache
 * 
 */
export type ExchangeRateCache = $Result.DefaultSelection<Prisma.$ExchangeRateCachePayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model Transaction
 * 
 */
export type Transaction = $Result.DefaultSelection<Prisma.$TransactionPayload>
/**
 * Model RefreshSession
 * 
 */
export type RefreshSession = $Result.DefaultSelection<Prisma.$RefreshSessionPayload>
/**
 * Model RateLimitBucket
 * 
 */
export type RateLimitBucket = $Result.DefaultSelection<Prisma.$RateLimitBucketPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const AuthMethod: {
  local: 'local',
  google: 'google'
};

export type AuthMethod = (typeof AuthMethod)[keyof typeof AuthMethod]


export const MovementType: {
  INCOME: 'INCOME',
  EXPENSE: 'EXPENSE'
};

export type MovementType = (typeof MovementType)[keyof typeof MovementType]


export const CurrencyCode: {
  USD: 'USD',
  EUR: 'EUR',
  JPY: 'JPY',
  GBP: 'GBP',
  COP: 'COP'
};

export type CurrencyCode = (typeof CurrencyCode)[keyof typeof CurrencyCode]

}

export type AuthMethod = $Enums.AuthMethod

export const AuthMethod: typeof $Enums.AuthMethod

export type MovementType = $Enums.MovementType

export const MovementType: typeof $Enums.MovementType

export type CurrencyCode = $Enums.CurrencyCode

export const CurrencyCode: typeof $Enums.CurrencyCode

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.PrismaClientConstructorArgs<ClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.exchangeRateCache`: Exposes CRUD operations for the **ExchangeRateCache** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ExchangeRateCaches
    * const exchangeRateCaches = await prisma.exchangeRateCache.findMany()
    * ```
    */
  get exchangeRateCache(): Prisma.ExchangeRateCacheDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.transaction`: Exposes CRUD operations for the **Transaction** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Transactions
    * const transactions = await prisma.transaction.findMany()
    * ```
    */
  get transaction(): Prisma.TransactionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.refreshSession`: Exposes CRUD operations for the **RefreshSession** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RefreshSessions
    * const refreshSessions = await prisma.refreshSession.findMany()
    * ```
    */
  get refreshSession(): Prisma.RefreshSessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.rateLimitBucket`: Exposes CRUD operations for the **RateLimitBucket** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more RateLimitBuckets
    * const rateLimitBuckets = await prisma.rateLimitBucket.findMany()
    * ```
    */
  get rateLimitBucket(): Prisma.RateLimitBucketDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.10.0
   * Query Engine version: 0edf323efd1d98336f3f0a68684b56f689b900d3
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * Resolved type of the argument passed to the `PrismaClient` constructor.
   *
   * When called without a narrower options type (the common case), this resolves
   * to `PrismaClientOptions` directly, which produces a clear TypeScript error
   * message (`not assignable to parameter of type 'PrismaClientOptions'`) when
   * the argument is missing or incomplete. When the user supplies a narrower
   * options type (e.g. via a literal), it falls back to `Subset` to keep
   * filtering out unknown properties.
   */
  export type PrismaClientConstructorArgs<Options extends PrismaClientOptions> =
    [PrismaClientOptions] extends [Options] ? PrismaClientOptions : Subset<Options, PrismaClientOptions>;

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      ((Without<T, U> & U) | (Without<U, T> & T)) & object
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    ExchangeRateCache: 'ExchangeRateCache',
    Category: 'Category',
    Transaction: 'Transaction',
    RefreshSession: 'RefreshSession',
    RateLimitBucket: 'RateLimitBucket'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "exchangeRateCache" | "category" | "transaction" | "refreshSession" | "rateLimitBucket"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      ExchangeRateCache: {
        payload: Prisma.$ExchangeRateCachePayload<ExtArgs>
        fields: Prisma.ExchangeRateCacheFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ExchangeRateCacheFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeRateCachePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ExchangeRateCacheFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeRateCachePayload>
          }
          findFirst: {
            args: Prisma.ExchangeRateCacheFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeRateCachePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ExchangeRateCacheFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeRateCachePayload>
          }
          findMany: {
            args: Prisma.ExchangeRateCacheFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeRateCachePayload>[]
          }
          create: {
            args: Prisma.ExchangeRateCacheCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeRateCachePayload>
          }
          createMany: {
            args: Prisma.ExchangeRateCacheCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ExchangeRateCacheCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeRateCachePayload>[]
          }
          delete: {
            args: Prisma.ExchangeRateCacheDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeRateCachePayload>
          }
          update: {
            args: Prisma.ExchangeRateCacheUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeRateCachePayload>
          }
          deleteMany: {
            args: Prisma.ExchangeRateCacheDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ExchangeRateCacheUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ExchangeRateCacheUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeRateCachePayload>[]
          }
          upsert: {
            args: Prisma.ExchangeRateCacheUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ExchangeRateCachePayload>
          }
          aggregate: {
            args: Prisma.ExchangeRateCacheAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateExchangeRateCache>
          }
          groupBy: {
            args: Prisma.ExchangeRateCacheGroupByArgs<ExtArgs>
            result: $Utils.Optional<ExchangeRateCacheGroupByOutputType>[]
          }
          count: {
            args: Prisma.ExchangeRateCacheCountArgs<ExtArgs>
            result: $Utils.Optional<ExchangeRateCacheCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CategoryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CategoryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      Transaction: {
        payload: Prisma.$TransactionPayload<ExtArgs>
        fields: Prisma.TransactionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TransactionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TransactionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findFirst: {
            args: Prisma.TransactionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TransactionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          findMany: {
            args: Prisma.TransactionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          create: {
            args: Prisma.TransactionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          createMany: {
            args: Prisma.TransactionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.TransactionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          delete: {
            args: Prisma.TransactionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          update: {
            args: Prisma.TransactionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          deleteMany: {
            args: Prisma.TransactionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TransactionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.TransactionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>[]
          }
          upsert: {
            args: Prisma.TransactionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TransactionPayload>
          }
          aggregate: {
            args: Prisma.TransactionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTransaction>
          }
          groupBy: {
            args: Prisma.TransactionGroupByArgs<ExtArgs>
            result: $Utils.Optional<TransactionGroupByOutputType>[]
          }
          count: {
            args: Prisma.TransactionCountArgs<ExtArgs>
            result: $Utils.Optional<TransactionCountAggregateOutputType> | number
          }
        }
      }
      RefreshSession: {
        payload: Prisma.$RefreshSessionPayload<ExtArgs>
        fields: Prisma.RefreshSessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RefreshSessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshSessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RefreshSessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshSessionPayload>
          }
          findFirst: {
            args: Prisma.RefreshSessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshSessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RefreshSessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshSessionPayload>
          }
          findMany: {
            args: Prisma.RefreshSessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshSessionPayload>[]
          }
          create: {
            args: Prisma.RefreshSessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshSessionPayload>
          }
          createMany: {
            args: Prisma.RefreshSessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RefreshSessionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshSessionPayload>[]
          }
          delete: {
            args: Prisma.RefreshSessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshSessionPayload>
          }
          update: {
            args: Prisma.RefreshSessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshSessionPayload>
          }
          deleteMany: {
            args: Prisma.RefreshSessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RefreshSessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RefreshSessionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshSessionPayload>[]
          }
          upsert: {
            args: Prisma.RefreshSessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RefreshSessionPayload>
          }
          aggregate: {
            args: Prisma.RefreshSessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRefreshSession>
          }
          groupBy: {
            args: Prisma.RefreshSessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<RefreshSessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.RefreshSessionCountArgs<ExtArgs>
            result: $Utils.Optional<RefreshSessionCountAggregateOutputType> | number
          }
        }
      }
      RateLimitBucket: {
        payload: Prisma.$RateLimitBucketPayload<ExtArgs>
        fields: Prisma.RateLimitBucketFieldRefs
        operations: {
          findUnique: {
            args: Prisma.RateLimitBucketFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitBucketPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.RateLimitBucketFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitBucketPayload>
          }
          findFirst: {
            args: Prisma.RateLimitBucketFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitBucketPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.RateLimitBucketFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitBucketPayload>
          }
          findMany: {
            args: Prisma.RateLimitBucketFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitBucketPayload>[]
          }
          create: {
            args: Prisma.RateLimitBucketCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitBucketPayload>
          }
          createMany: {
            args: Prisma.RateLimitBucketCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.RateLimitBucketCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitBucketPayload>[]
          }
          delete: {
            args: Prisma.RateLimitBucketDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitBucketPayload>
          }
          update: {
            args: Prisma.RateLimitBucketUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitBucketPayload>
          }
          deleteMany: {
            args: Prisma.RateLimitBucketDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.RateLimitBucketUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.RateLimitBucketUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitBucketPayload>[]
          }
          upsert: {
            args: Prisma.RateLimitBucketUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$RateLimitBucketPayload>
          }
          aggregate: {
            args: Prisma.RateLimitBucketAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateRateLimitBucket>
          }
          groupBy: {
            args: Prisma.RateLimitBucketGroupByArgs<ExtArgs>
            result: $Utils.Optional<RateLimitBucketGroupByOutputType>[]
          }
          count: {
            args: Prisma.RateLimitBucketCountArgs<ExtArgs>
            result: $Utils.Optional<RateLimitBucketCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * A driver adapter that PrismaClient uses to connect to your database, such as the ones provided by `@prisma/adapter-pg`, `@prisma/adapter-libsql`, `@prisma/adapter-planetscale`, etc.
     * 
     * A driver adapter is **required** unless you connect to your database through Prisma Accelerate (in which case use `accelerateUrl` instead).
     * 
     * Learn more: https://pris.ly/d/driver-adapters
     * 
     * @example
     * ```ts
     * import { PrismaPg } from '@prisma/adapter-pg'
     * import { PrismaClient } from './generated/prisma/client'
     * 
     * const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL })
     * const prisma = new PrismaClient({ adapter })
     * ```
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * The Prisma Accelerate connection URL. Use this option to connect to your database through Prisma Accelerate instead of using a driver adapter to connect directly.
     * 
     * Learn more: https://pris.ly/d/accelerate
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    exchangeRateCache?: ExchangeRateCacheOmit
    category?: CategoryOmit
    transaction?: TransactionOmit
    refreshSession?: RefreshSessionOmit
    rateLimitBucket?: RateLimitBucketOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    categories: number
    transactions: number
    refreshSessions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categories?: boolean | UserCountOutputTypeCountCategoriesArgs
    transactions?: boolean | UserCountOutputTypeCountTransactionsArgs
    refreshSessions?: boolean | UserCountOutputTypeCountRefreshSessionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountRefreshSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshSessionWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    transactions: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    transactions?: boolean | CategoryCountOutputTypeCountTransactionsArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountTransactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    tokenVersion: number | null
  }

  export type UserSumAggregateOutputType = {
    tokenVersion: number | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    hashedPassword: string | null
    username: string | null
    metodoAutenticacion: $Enums.AuthMethod | null
    avatarUrl: string | null
    googleId: string | null
    currency: $Enums.CurrencyCode | null
    tokenVersion: number | null
    createdAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    hashedPassword: string | null
    username: string | null
    metodoAutenticacion: $Enums.AuthMethod | null
    avatarUrl: string | null
    googleId: string | null
    currency: $Enums.CurrencyCode | null
    tokenVersion: number | null
    createdAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    hashedPassword: number
    username: number
    metodoAutenticacion: number
    avatarUrl: number
    googleId: number
    currency: number
    tokenVersion: number
    createdAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    tokenVersion?: true
  }

  export type UserSumAggregateInputType = {
    tokenVersion?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    hashedPassword?: true
    username?: true
    metodoAutenticacion?: true
    avatarUrl?: true
    googleId?: true
    currency?: true
    tokenVersion?: true
    createdAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    hashedPassword?: true
    username?: true
    metodoAutenticacion?: true
    avatarUrl?: true
    googleId?: true
    currency?: true
    tokenVersion?: true
    createdAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    hashedPassword?: true
    username?: true
    metodoAutenticacion?: true
    avatarUrl?: true
    googleId?: true
    currency?: true
    tokenVersion?: true
    createdAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    hashedPassword: string | null
    username: string
    metodoAutenticacion: $Enums.AuthMethod
    avatarUrl: string | null
    googleId: string | null
    currency: $Enums.CurrencyCode
    tokenVersion: number
    createdAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    hashedPassword?: boolean
    username?: boolean
    metodoAutenticacion?: boolean
    avatarUrl?: boolean
    googleId?: boolean
    currency?: boolean
    tokenVersion?: boolean
    createdAt?: boolean
    categories?: boolean | User$categoriesArgs<ExtArgs>
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    refreshSessions?: boolean | User$refreshSessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    hashedPassword?: boolean
    username?: boolean
    metodoAutenticacion?: boolean
    avatarUrl?: boolean
    googleId?: boolean
    currency?: boolean
    tokenVersion?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    hashedPassword?: boolean
    username?: boolean
    metodoAutenticacion?: boolean
    avatarUrl?: boolean
    googleId?: boolean
    currency?: boolean
    tokenVersion?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    hashedPassword?: boolean
    username?: boolean
    metodoAutenticacion?: boolean
    avatarUrl?: boolean
    googleId?: boolean
    currency?: boolean
    tokenVersion?: boolean
    createdAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "hashedPassword" | "username" | "metodoAutenticacion" | "avatarUrl" | "googleId" | "currency" | "tokenVersion" | "createdAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categories?: boolean | User$categoriesArgs<ExtArgs>
    transactions?: boolean | User$transactionsArgs<ExtArgs>
    refreshSessions?: boolean | User$refreshSessionsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      categories: Prisma.$CategoryPayload<ExtArgs>[]
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
      refreshSessions: Prisma.$RefreshSessionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      hashedPassword: string | null
      username: string
      metodoAutenticacion: $Enums.AuthMethod
      avatarUrl: string | null
      googleId: string | null
      currency: $Enums.CurrencyCode
      tokenVersion: number
      createdAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    categories<T extends User$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, User$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    transactions<T extends User$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, User$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    refreshSessions<T extends User$refreshSessionsArgs<ExtArgs> = {}>(args?: Subset<T, User$refreshSessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly hashedPassword: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly metodoAutenticacion: FieldRef<"User", 'AuthMethod'>
    readonly avatarUrl: FieldRef<"User", 'String'>
    readonly googleId: FieldRef<"User", 'String'>
    readonly currency: FieldRef<"User", 'CurrencyCode'>
    readonly tokenVersion: FieldRef<"User", 'Int'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.categories
   */
  export type User$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    cursor?: CategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * User.transactions
   */
  export type User$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * User.refreshSessions
   */
  export type User$refreshSessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshSession
     */
    select?: RefreshSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshSession
     */
    omit?: RefreshSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshSessionInclude<ExtArgs> | null
    where?: RefreshSessionWhereInput
    orderBy?: RefreshSessionOrderByWithRelationInput | RefreshSessionOrderByWithRelationInput[]
    cursor?: RefreshSessionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: RefreshSessionScalarFieldEnum | RefreshSessionScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model ExchangeRateCache
   */

  export type AggregateExchangeRateCache = {
    _count: ExchangeRateCacheCountAggregateOutputType | null
    _min: ExchangeRateCacheMinAggregateOutputType | null
    _max: ExchangeRateCacheMaxAggregateOutputType | null
  }

  export type ExchangeRateCacheMinAggregateOutputType = {
    id: string | null
    fetchedAt: Date | null
    nextRefreshAt: Date | null
  }

  export type ExchangeRateCacheMaxAggregateOutputType = {
    id: string | null
    fetchedAt: Date | null
    nextRefreshAt: Date | null
  }

  export type ExchangeRateCacheCountAggregateOutputType = {
    id: number
    rates: number
    fetchedAt: number
    nextRefreshAt: number
    _all: number
  }


  export type ExchangeRateCacheMinAggregateInputType = {
    id?: true
    fetchedAt?: true
    nextRefreshAt?: true
  }

  export type ExchangeRateCacheMaxAggregateInputType = {
    id?: true
    fetchedAt?: true
    nextRefreshAt?: true
  }

  export type ExchangeRateCacheCountAggregateInputType = {
    id?: true
    rates?: true
    fetchedAt?: true
    nextRefreshAt?: true
    _all?: true
  }

  export type ExchangeRateCacheAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExchangeRateCache to aggregate.
     */
    where?: ExchangeRateCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExchangeRateCaches to fetch.
     */
    orderBy?: ExchangeRateCacheOrderByWithRelationInput | ExchangeRateCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ExchangeRateCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExchangeRateCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExchangeRateCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ExchangeRateCaches
    **/
    _count?: true | ExchangeRateCacheCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ExchangeRateCacheMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ExchangeRateCacheMaxAggregateInputType
  }

  export type GetExchangeRateCacheAggregateType<T extends ExchangeRateCacheAggregateArgs> = {
        [P in keyof T & keyof AggregateExchangeRateCache]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateExchangeRateCache[P]>
      : GetScalarType<T[P], AggregateExchangeRateCache[P]>
  }




  export type ExchangeRateCacheGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ExchangeRateCacheWhereInput
    orderBy?: ExchangeRateCacheOrderByWithAggregationInput | ExchangeRateCacheOrderByWithAggregationInput[]
    by: ExchangeRateCacheScalarFieldEnum[] | ExchangeRateCacheScalarFieldEnum
    having?: ExchangeRateCacheScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ExchangeRateCacheCountAggregateInputType | true
    _min?: ExchangeRateCacheMinAggregateInputType
    _max?: ExchangeRateCacheMaxAggregateInputType
  }

  export type ExchangeRateCacheGroupByOutputType = {
    id: string
    rates: JsonValue
    fetchedAt: Date
    nextRefreshAt: Date
    _count: ExchangeRateCacheCountAggregateOutputType | null
    _min: ExchangeRateCacheMinAggregateOutputType | null
    _max: ExchangeRateCacheMaxAggregateOutputType | null
  }

  type GetExchangeRateCacheGroupByPayload<T extends ExchangeRateCacheGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ExchangeRateCacheGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ExchangeRateCacheGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ExchangeRateCacheGroupByOutputType[P]>
            : GetScalarType<T[P], ExchangeRateCacheGroupByOutputType[P]>
        }
      >
    >


  export type ExchangeRateCacheSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rates?: boolean
    fetchedAt?: boolean
    nextRefreshAt?: boolean
  }, ExtArgs["result"]["exchangeRateCache"]>

  export type ExchangeRateCacheSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rates?: boolean
    fetchedAt?: boolean
    nextRefreshAt?: boolean
  }, ExtArgs["result"]["exchangeRateCache"]>

  export type ExchangeRateCacheSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    rates?: boolean
    fetchedAt?: boolean
    nextRefreshAt?: boolean
  }, ExtArgs["result"]["exchangeRateCache"]>

  export type ExchangeRateCacheSelectScalar = {
    id?: boolean
    rates?: boolean
    fetchedAt?: boolean
    nextRefreshAt?: boolean
  }

  export type ExchangeRateCacheOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "rates" | "fetchedAt" | "nextRefreshAt", ExtArgs["result"]["exchangeRateCache"]>

  export type $ExchangeRateCachePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ExchangeRateCache"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      rates: Prisma.JsonValue
      fetchedAt: Date
      nextRefreshAt: Date
    }, ExtArgs["result"]["exchangeRateCache"]>
    composites: {}
  }

  type ExchangeRateCacheGetPayload<S extends boolean | null | undefined | ExchangeRateCacheDefaultArgs> = $Result.GetResult<Prisma.$ExchangeRateCachePayload, S>

  type ExchangeRateCacheCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ExchangeRateCacheFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ExchangeRateCacheCountAggregateInputType | true
    }

  export interface ExchangeRateCacheDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ExchangeRateCache'], meta: { name: 'ExchangeRateCache' } }
    /**
     * Find zero or one ExchangeRateCache that matches the filter.
     * @param {ExchangeRateCacheFindUniqueArgs} args - Arguments to find a ExchangeRateCache
     * @example
     * // Get one ExchangeRateCache
     * const exchangeRateCache = await prisma.exchangeRateCache.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ExchangeRateCacheFindUniqueArgs>(args: SelectSubset<T, ExchangeRateCacheFindUniqueArgs<ExtArgs>>): Prisma__ExchangeRateCacheClient<$Result.GetResult<Prisma.$ExchangeRateCachePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ExchangeRateCache that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ExchangeRateCacheFindUniqueOrThrowArgs} args - Arguments to find a ExchangeRateCache
     * @example
     * // Get one ExchangeRateCache
     * const exchangeRateCache = await prisma.exchangeRateCache.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ExchangeRateCacheFindUniqueOrThrowArgs>(args: SelectSubset<T, ExchangeRateCacheFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ExchangeRateCacheClient<$Result.GetResult<Prisma.$ExchangeRateCachePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExchangeRateCache that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeRateCacheFindFirstArgs} args - Arguments to find a ExchangeRateCache
     * @example
     * // Get one ExchangeRateCache
     * const exchangeRateCache = await prisma.exchangeRateCache.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ExchangeRateCacheFindFirstArgs>(args?: SelectSubset<T, ExchangeRateCacheFindFirstArgs<ExtArgs>>): Prisma__ExchangeRateCacheClient<$Result.GetResult<Prisma.$ExchangeRateCachePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ExchangeRateCache that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeRateCacheFindFirstOrThrowArgs} args - Arguments to find a ExchangeRateCache
     * @example
     * // Get one ExchangeRateCache
     * const exchangeRateCache = await prisma.exchangeRateCache.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ExchangeRateCacheFindFirstOrThrowArgs>(args?: SelectSubset<T, ExchangeRateCacheFindFirstOrThrowArgs<ExtArgs>>): Prisma__ExchangeRateCacheClient<$Result.GetResult<Prisma.$ExchangeRateCachePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ExchangeRateCaches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeRateCacheFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ExchangeRateCaches
     * const exchangeRateCaches = await prisma.exchangeRateCache.findMany()
     * 
     * // Get first 10 ExchangeRateCaches
     * const exchangeRateCaches = await prisma.exchangeRateCache.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const exchangeRateCacheWithIdOnly = await prisma.exchangeRateCache.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ExchangeRateCacheFindManyArgs>(args?: SelectSubset<T, ExchangeRateCacheFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExchangeRateCachePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ExchangeRateCache.
     * @param {ExchangeRateCacheCreateArgs} args - Arguments to create a ExchangeRateCache.
     * @example
     * // Create one ExchangeRateCache
     * const ExchangeRateCache = await prisma.exchangeRateCache.create({
     *   data: {
     *     // ... data to create a ExchangeRateCache
     *   }
     * })
     * 
     */
    create<T extends ExchangeRateCacheCreateArgs>(args: SelectSubset<T, ExchangeRateCacheCreateArgs<ExtArgs>>): Prisma__ExchangeRateCacheClient<$Result.GetResult<Prisma.$ExchangeRateCachePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ExchangeRateCaches.
     * @param {ExchangeRateCacheCreateManyArgs} args - Arguments to create many ExchangeRateCaches.
     * @example
     * // Create many ExchangeRateCaches
     * const exchangeRateCache = await prisma.exchangeRateCache.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ExchangeRateCacheCreateManyArgs>(args?: SelectSubset<T, ExchangeRateCacheCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ExchangeRateCaches and returns the data saved in the database.
     * @param {ExchangeRateCacheCreateManyAndReturnArgs} args - Arguments to create many ExchangeRateCaches.
     * @example
     * // Create many ExchangeRateCaches
     * const exchangeRateCache = await prisma.exchangeRateCache.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ExchangeRateCaches and only return the `id`
     * const exchangeRateCacheWithIdOnly = await prisma.exchangeRateCache.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ExchangeRateCacheCreateManyAndReturnArgs>(args?: SelectSubset<T, ExchangeRateCacheCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExchangeRateCachePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ExchangeRateCache.
     * @param {ExchangeRateCacheDeleteArgs} args - Arguments to delete one ExchangeRateCache.
     * @example
     * // Delete one ExchangeRateCache
     * const ExchangeRateCache = await prisma.exchangeRateCache.delete({
     *   where: {
     *     // ... filter to delete one ExchangeRateCache
     *   }
     * })
     * 
     */
    delete<T extends ExchangeRateCacheDeleteArgs>(args: SelectSubset<T, ExchangeRateCacheDeleteArgs<ExtArgs>>): Prisma__ExchangeRateCacheClient<$Result.GetResult<Prisma.$ExchangeRateCachePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ExchangeRateCache.
     * @param {ExchangeRateCacheUpdateArgs} args - Arguments to update one ExchangeRateCache.
     * @example
     * // Update one ExchangeRateCache
     * const exchangeRateCache = await prisma.exchangeRateCache.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ExchangeRateCacheUpdateArgs>(args: SelectSubset<T, ExchangeRateCacheUpdateArgs<ExtArgs>>): Prisma__ExchangeRateCacheClient<$Result.GetResult<Prisma.$ExchangeRateCachePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ExchangeRateCaches.
     * @param {ExchangeRateCacheDeleteManyArgs} args - Arguments to filter ExchangeRateCaches to delete.
     * @example
     * // Delete a few ExchangeRateCaches
     * const { count } = await prisma.exchangeRateCache.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ExchangeRateCacheDeleteManyArgs>(args?: SelectSubset<T, ExchangeRateCacheDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExchangeRateCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeRateCacheUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ExchangeRateCaches
     * const exchangeRateCache = await prisma.exchangeRateCache.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ExchangeRateCacheUpdateManyArgs>(args: SelectSubset<T, ExchangeRateCacheUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ExchangeRateCaches and returns the data updated in the database.
     * @param {ExchangeRateCacheUpdateManyAndReturnArgs} args - Arguments to update many ExchangeRateCaches.
     * @example
     * // Update many ExchangeRateCaches
     * const exchangeRateCache = await prisma.exchangeRateCache.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ExchangeRateCaches and only return the `id`
     * const exchangeRateCacheWithIdOnly = await prisma.exchangeRateCache.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ExchangeRateCacheUpdateManyAndReturnArgs>(args: SelectSubset<T, ExchangeRateCacheUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ExchangeRateCachePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ExchangeRateCache.
     * @param {ExchangeRateCacheUpsertArgs} args - Arguments to update or create a ExchangeRateCache.
     * @example
     * // Update or create a ExchangeRateCache
     * const exchangeRateCache = await prisma.exchangeRateCache.upsert({
     *   create: {
     *     // ... data to create a ExchangeRateCache
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ExchangeRateCache we want to update
     *   }
     * })
     */
    upsert<T extends ExchangeRateCacheUpsertArgs>(args: SelectSubset<T, ExchangeRateCacheUpsertArgs<ExtArgs>>): Prisma__ExchangeRateCacheClient<$Result.GetResult<Prisma.$ExchangeRateCachePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ExchangeRateCaches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeRateCacheCountArgs} args - Arguments to filter ExchangeRateCaches to count.
     * @example
     * // Count the number of ExchangeRateCaches
     * const count = await prisma.exchangeRateCache.count({
     *   where: {
     *     // ... the filter for the ExchangeRateCaches we want to count
     *   }
     * })
    **/
    count<T extends ExchangeRateCacheCountArgs>(
      args?: Subset<T, ExchangeRateCacheCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ExchangeRateCacheCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ExchangeRateCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeRateCacheAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ExchangeRateCacheAggregateArgs>(args: Subset<T, ExchangeRateCacheAggregateArgs>): Prisma.PrismaPromise<GetExchangeRateCacheAggregateType<T>>

    /**
     * Group by ExchangeRateCache.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ExchangeRateCacheGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ExchangeRateCacheGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ExchangeRateCacheGroupByArgs['orderBy'] }
        : { orderBy?: ExchangeRateCacheGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ExchangeRateCacheGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetExchangeRateCacheGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ExchangeRateCache model
   */
  readonly fields: ExchangeRateCacheFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ExchangeRateCache.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ExchangeRateCacheClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ExchangeRateCache model
   */
  interface ExchangeRateCacheFieldRefs {
    readonly id: FieldRef<"ExchangeRateCache", 'String'>
    readonly rates: FieldRef<"ExchangeRateCache", 'Json'>
    readonly fetchedAt: FieldRef<"ExchangeRateCache", 'DateTime'>
    readonly nextRefreshAt: FieldRef<"ExchangeRateCache", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ExchangeRateCache findUnique
   */
  export type ExchangeRateCacheFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeRateCache
     */
    select?: ExchangeRateCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeRateCache
     */
    omit?: ExchangeRateCacheOmit<ExtArgs> | null
    /**
     * Filter, which ExchangeRateCache to fetch.
     */
    where: ExchangeRateCacheWhereUniqueInput
  }

  /**
   * ExchangeRateCache findUniqueOrThrow
   */
  export type ExchangeRateCacheFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeRateCache
     */
    select?: ExchangeRateCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeRateCache
     */
    omit?: ExchangeRateCacheOmit<ExtArgs> | null
    /**
     * Filter, which ExchangeRateCache to fetch.
     */
    where: ExchangeRateCacheWhereUniqueInput
  }

  /**
   * ExchangeRateCache findFirst
   */
  export type ExchangeRateCacheFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeRateCache
     */
    select?: ExchangeRateCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeRateCache
     */
    omit?: ExchangeRateCacheOmit<ExtArgs> | null
    /**
     * Filter, which ExchangeRateCache to fetch.
     */
    where?: ExchangeRateCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExchangeRateCaches to fetch.
     */
    orderBy?: ExchangeRateCacheOrderByWithRelationInput | ExchangeRateCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExchangeRateCaches.
     */
    cursor?: ExchangeRateCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExchangeRateCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExchangeRateCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExchangeRateCaches.
     */
    distinct?: ExchangeRateCacheScalarFieldEnum | ExchangeRateCacheScalarFieldEnum[]
  }

  /**
   * ExchangeRateCache findFirstOrThrow
   */
  export type ExchangeRateCacheFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeRateCache
     */
    select?: ExchangeRateCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeRateCache
     */
    omit?: ExchangeRateCacheOmit<ExtArgs> | null
    /**
     * Filter, which ExchangeRateCache to fetch.
     */
    where?: ExchangeRateCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExchangeRateCaches to fetch.
     */
    orderBy?: ExchangeRateCacheOrderByWithRelationInput | ExchangeRateCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ExchangeRateCaches.
     */
    cursor?: ExchangeRateCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExchangeRateCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExchangeRateCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExchangeRateCaches.
     */
    distinct?: ExchangeRateCacheScalarFieldEnum | ExchangeRateCacheScalarFieldEnum[]
  }

  /**
   * ExchangeRateCache findMany
   */
  export type ExchangeRateCacheFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeRateCache
     */
    select?: ExchangeRateCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeRateCache
     */
    omit?: ExchangeRateCacheOmit<ExtArgs> | null
    /**
     * Filter, which ExchangeRateCaches to fetch.
     */
    where?: ExchangeRateCacheWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ExchangeRateCaches to fetch.
     */
    orderBy?: ExchangeRateCacheOrderByWithRelationInput | ExchangeRateCacheOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ExchangeRateCaches.
     */
    cursor?: ExchangeRateCacheWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ExchangeRateCaches from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ExchangeRateCaches.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ExchangeRateCaches.
     */
    distinct?: ExchangeRateCacheScalarFieldEnum | ExchangeRateCacheScalarFieldEnum[]
  }

  /**
   * ExchangeRateCache create
   */
  export type ExchangeRateCacheCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeRateCache
     */
    select?: ExchangeRateCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeRateCache
     */
    omit?: ExchangeRateCacheOmit<ExtArgs> | null
    /**
     * The data needed to create a ExchangeRateCache.
     */
    data: XOR<ExchangeRateCacheCreateInput, ExchangeRateCacheUncheckedCreateInput>
  }

  /**
   * ExchangeRateCache createMany
   */
  export type ExchangeRateCacheCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ExchangeRateCaches.
     */
    data: ExchangeRateCacheCreateManyInput | ExchangeRateCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExchangeRateCache createManyAndReturn
   */
  export type ExchangeRateCacheCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeRateCache
     */
    select?: ExchangeRateCacheSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeRateCache
     */
    omit?: ExchangeRateCacheOmit<ExtArgs> | null
    /**
     * The data used to create many ExchangeRateCaches.
     */
    data: ExchangeRateCacheCreateManyInput | ExchangeRateCacheCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ExchangeRateCache update
   */
  export type ExchangeRateCacheUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeRateCache
     */
    select?: ExchangeRateCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeRateCache
     */
    omit?: ExchangeRateCacheOmit<ExtArgs> | null
    /**
     * The data needed to update a ExchangeRateCache.
     */
    data: XOR<ExchangeRateCacheUpdateInput, ExchangeRateCacheUncheckedUpdateInput>
    /**
     * Choose, which ExchangeRateCache to update.
     */
    where: ExchangeRateCacheWhereUniqueInput
  }

  /**
   * ExchangeRateCache updateMany
   */
  export type ExchangeRateCacheUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ExchangeRateCaches.
     */
    data: XOR<ExchangeRateCacheUpdateManyMutationInput, ExchangeRateCacheUncheckedUpdateManyInput>
    /**
     * Filter which ExchangeRateCaches to update
     */
    where?: ExchangeRateCacheWhereInput
    /**
     * Limit how many ExchangeRateCaches to update.
     */
    limit?: number
  }

  /**
   * ExchangeRateCache updateManyAndReturn
   */
  export type ExchangeRateCacheUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeRateCache
     */
    select?: ExchangeRateCacheSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeRateCache
     */
    omit?: ExchangeRateCacheOmit<ExtArgs> | null
    /**
     * The data used to update ExchangeRateCaches.
     */
    data: XOR<ExchangeRateCacheUpdateManyMutationInput, ExchangeRateCacheUncheckedUpdateManyInput>
    /**
     * Filter which ExchangeRateCaches to update
     */
    where?: ExchangeRateCacheWhereInput
    /**
     * Limit how many ExchangeRateCaches to update.
     */
    limit?: number
  }

  /**
   * ExchangeRateCache upsert
   */
  export type ExchangeRateCacheUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeRateCache
     */
    select?: ExchangeRateCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeRateCache
     */
    omit?: ExchangeRateCacheOmit<ExtArgs> | null
    /**
     * The filter to search for the ExchangeRateCache to update in case it exists.
     */
    where: ExchangeRateCacheWhereUniqueInput
    /**
     * In case the ExchangeRateCache found by the `where` argument doesn't exist, create a new ExchangeRateCache with this data.
     */
    create: XOR<ExchangeRateCacheCreateInput, ExchangeRateCacheUncheckedCreateInput>
    /**
     * In case the ExchangeRateCache was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ExchangeRateCacheUpdateInput, ExchangeRateCacheUncheckedUpdateInput>
  }

  /**
   * ExchangeRateCache delete
   */
  export type ExchangeRateCacheDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeRateCache
     */
    select?: ExchangeRateCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeRateCache
     */
    omit?: ExchangeRateCacheOmit<ExtArgs> | null
    /**
     * Filter which ExchangeRateCache to delete.
     */
    where: ExchangeRateCacheWhereUniqueInput
  }

  /**
   * ExchangeRateCache deleteMany
   */
  export type ExchangeRateCacheDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ExchangeRateCaches to delete
     */
    where?: ExchangeRateCacheWhereInput
    /**
     * Limit how many ExchangeRateCaches to delete.
     */
    limit?: number
  }

  /**
   * ExchangeRateCache without action
   */
  export type ExchangeRateCacheDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ExchangeRateCache
     */
    select?: ExchangeRateCacheSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ExchangeRateCache
     */
    omit?: ExchangeRateCacheOmit<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    type: $Enums.MovementType | null
    icon: string | null
    color: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    type: $Enums.MovementType | null
    icon: string | null
    color: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    type: number
    icon: number
    color: number
    userId: number
    createdAt: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    type?: true
    icon?: true
    color?: true
    userId?: true
    createdAt?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    type?: true
    icon?: true
    color?: true
    userId?: true
    createdAt?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    type?: true
    icon?: true
    color?: true
    userId?: true
    createdAt?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    name: string
    type: $Enums.MovementType
    icon: string | null
    color: string
    userId: string | null
    createdAt: Date
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    icon?: boolean
    color?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | Category$userArgs<ExtArgs>
    transactions?: boolean | Category$transactionsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    icon?: boolean
    color?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | Category$userArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    type?: boolean
    icon?: boolean
    color?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | Category$userArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>

  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    type?: boolean
    icon?: boolean
    color?: boolean
    userId?: boolean
    createdAt?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "type" | "icon" | "color" | "userId" | "createdAt", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Category$userArgs<ExtArgs>
    transactions?: boolean | Category$transactionsArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type CategoryIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Category$userArgs<ExtArgs>
  }
  export type CategoryIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | Category$userArgs<ExtArgs>
  }

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
      transactions: Prisma.$TransactionPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      type: $Enums.MovementType
      icon: string | null
      color: string
      userId: string | null
      createdAt: Date
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Categories and returns the data saved in the database.
     * @param {CategoryCreateManyAndReturnArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CategoryCreateManyAndReturnArgs>(args?: SelectSubset<T, CategoryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories and returns the data updated in the database.
     * @param {CategoryUpdateManyAndReturnArgs} args - Arguments to update many Categories.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Categories and only return the `id`
     * const categoryWithIdOnly = await prisma.category.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CategoryUpdateManyAndReturnArgs>(args: SelectSubset<T, CategoryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends Category$userArgs<ExtArgs> = {}>(args?: Subset<T, Category$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    transactions<T extends Category$transactionsArgs<ExtArgs> = {}>(args?: Subset<T, Category$transactionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
    readonly type: FieldRef<"Category", 'MovementType'>
    readonly icon: FieldRef<"Category", 'String'>
    readonly color: FieldRef<"Category", 'String'>
    readonly userId: FieldRef<"Category", 'String'>
    readonly createdAt: FieldRef<"Category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category createManyAndReturn
   */
  export type CategoryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category updateManyAndReturn
   */
  export type CategoryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.user
   */
  export type Category$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Category.transactions
   */
  export type Category$transactionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    cursor?: TransactionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model Transaction
   */

  export type AggregateTransaction = {
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  export type TransactionAvgAggregateOutputType = {
    amount: Decimal | null
  }

  export type TransactionSumAggregateOutputType = {
    amount: Decimal | null
  }

  export type TransactionMinAggregateOutputType = {
    id: string | null
    amount: Decimal | null
    type: $Enums.MovementType | null
    description: string | null
    date: Date | null
    userId: string | null
    categoryId: string | null
    createdAt: Date | null
  }

  export type TransactionMaxAggregateOutputType = {
    id: string | null
    amount: Decimal | null
    type: $Enums.MovementType | null
    description: string | null
    date: Date | null
    userId: string | null
    categoryId: string | null
    createdAt: Date | null
  }

  export type TransactionCountAggregateOutputType = {
    id: number
    amount: number
    type: number
    description: number
    date: number
    userId: number
    categoryId: number
    createdAt: number
    _all: number
  }


  export type TransactionAvgAggregateInputType = {
    amount?: true
  }

  export type TransactionSumAggregateInputType = {
    amount?: true
  }

  export type TransactionMinAggregateInputType = {
    id?: true
    amount?: true
    type?: true
    description?: true
    date?: true
    userId?: true
    categoryId?: true
    createdAt?: true
  }

  export type TransactionMaxAggregateInputType = {
    id?: true
    amount?: true
    type?: true
    description?: true
    date?: true
    userId?: true
    categoryId?: true
    createdAt?: true
  }

  export type TransactionCountAggregateInputType = {
    id?: true
    amount?: true
    type?: true
    description?: true
    date?: true
    userId?: true
    categoryId?: true
    createdAt?: true
    _all?: true
  }

  export type TransactionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transaction to aggregate.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Transactions
    **/
    _count?: true | TransactionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TransactionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TransactionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TransactionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TransactionMaxAggregateInputType
  }

  export type GetTransactionAggregateType<T extends TransactionAggregateArgs> = {
        [P in keyof T & keyof AggregateTransaction]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTransaction[P]>
      : GetScalarType<T[P], AggregateTransaction[P]>
  }




  export type TransactionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TransactionWhereInput
    orderBy?: TransactionOrderByWithAggregationInput | TransactionOrderByWithAggregationInput[]
    by: TransactionScalarFieldEnum[] | TransactionScalarFieldEnum
    having?: TransactionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TransactionCountAggregateInputType | true
    _avg?: TransactionAvgAggregateInputType
    _sum?: TransactionSumAggregateInputType
    _min?: TransactionMinAggregateInputType
    _max?: TransactionMaxAggregateInputType
  }

  export type TransactionGroupByOutputType = {
    id: string
    amount: Decimal
    type: $Enums.MovementType
    description: string | null
    date: Date
    userId: string
    categoryId: string
    createdAt: Date
    _count: TransactionCountAggregateOutputType | null
    _avg: TransactionAvgAggregateOutputType | null
    _sum: TransactionSumAggregateOutputType | null
    _min: TransactionMinAggregateOutputType | null
    _max: TransactionMaxAggregateOutputType | null
  }

  type GetTransactionGroupByPayload<T extends TransactionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TransactionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TransactionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TransactionGroupByOutputType[P]>
            : GetScalarType<T[P], TransactionGroupByOutputType[P]>
        }
      >
    >


  export type TransactionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    type?: boolean
    description?: boolean
    date?: boolean
    userId?: boolean
    categoryId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    type?: boolean
    description?: boolean
    date?: boolean
    userId?: boolean
    categoryId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    amount?: boolean
    type?: boolean
    description?: boolean
    date?: boolean
    userId?: boolean
    categoryId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["transaction"]>

  export type TransactionSelectScalar = {
    id?: boolean
    amount?: boolean
    type?: boolean
    description?: boolean
    date?: boolean
    userId?: boolean
    categoryId?: boolean
    createdAt?: boolean
  }

  export type TransactionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "amount" | "type" | "description" | "date" | "userId" | "categoryId" | "createdAt", ExtArgs["result"]["transaction"]>
  export type TransactionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }
  export type TransactionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $TransactionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Transaction"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      category: Prisma.$CategoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      amount: Prisma.Decimal
      type: $Enums.MovementType
      description: string | null
      date: Date
      userId: string
      categoryId: string
      createdAt: Date
    }, ExtArgs["result"]["transaction"]>
    composites: {}
  }

  type TransactionGetPayload<S extends boolean | null | undefined | TransactionDefaultArgs> = $Result.GetResult<Prisma.$TransactionPayload, S>

  type TransactionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TransactionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TransactionCountAggregateInputType | true
    }

  export interface TransactionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Transaction'], meta: { name: 'Transaction' } }
    /**
     * Find zero or one Transaction that matches the filter.
     * @param {TransactionFindUniqueArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TransactionFindUniqueArgs>(args: SelectSubset<T, TransactionFindUniqueArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Transaction that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TransactionFindUniqueOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TransactionFindUniqueOrThrowArgs>(args: SelectSubset<T, TransactionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TransactionFindFirstArgs>(args?: SelectSubset<T, TransactionFindFirstArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Transaction that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindFirstOrThrowArgs} args - Arguments to find a Transaction
     * @example
     * // Get one Transaction
     * const transaction = await prisma.transaction.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TransactionFindFirstOrThrowArgs>(args?: SelectSubset<T, TransactionFindFirstOrThrowArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Transactions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Transactions
     * const transactions = await prisma.transaction.findMany()
     * 
     * // Get first 10 Transactions
     * const transactions = await prisma.transaction.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const transactionWithIdOnly = await prisma.transaction.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TransactionFindManyArgs>(args?: SelectSubset<T, TransactionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Transaction.
     * @param {TransactionCreateArgs} args - Arguments to create a Transaction.
     * @example
     * // Create one Transaction
     * const Transaction = await prisma.transaction.create({
     *   data: {
     *     // ... data to create a Transaction
     *   }
     * })
     * 
     */
    create<T extends TransactionCreateArgs>(args: SelectSubset<T, TransactionCreateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Transactions.
     * @param {TransactionCreateManyArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TransactionCreateManyArgs>(args?: SelectSubset<T, TransactionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Transactions and returns the data saved in the database.
     * @param {TransactionCreateManyAndReturnArgs} args - Arguments to create many Transactions.
     * @example
     * // Create many Transactions
     * const transaction = await prisma.transaction.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends TransactionCreateManyAndReturnArgs>(args?: SelectSubset<T, TransactionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Transaction.
     * @param {TransactionDeleteArgs} args - Arguments to delete one Transaction.
     * @example
     * // Delete one Transaction
     * const Transaction = await prisma.transaction.delete({
     *   where: {
     *     // ... filter to delete one Transaction
     *   }
     * })
     * 
     */
    delete<T extends TransactionDeleteArgs>(args: SelectSubset<T, TransactionDeleteArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Transaction.
     * @param {TransactionUpdateArgs} args - Arguments to update one Transaction.
     * @example
     * // Update one Transaction
     * const transaction = await prisma.transaction.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TransactionUpdateArgs>(args: SelectSubset<T, TransactionUpdateArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Transactions.
     * @param {TransactionDeleteManyArgs} args - Arguments to filter Transactions to delete.
     * @example
     * // Delete a few Transactions
     * const { count } = await prisma.transaction.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TransactionDeleteManyArgs>(args?: SelectSubset<T, TransactionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TransactionUpdateManyArgs>(args: SelectSubset<T, TransactionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Transactions and returns the data updated in the database.
     * @param {TransactionUpdateManyAndReturnArgs} args - Arguments to update many Transactions.
     * @example
     * // Update many Transactions
     * const transaction = await prisma.transaction.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Transactions and only return the `id`
     * const transactionWithIdOnly = await prisma.transaction.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends TransactionUpdateManyAndReturnArgs>(args: SelectSubset<T, TransactionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Transaction.
     * @param {TransactionUpsertArgs} args - Arguments to update or create a Transaction.
     * @example
     * // Update or create a Transaction
     * const transaction = await prisma.transaction.upsert({
     *   create: {
     *     // ... data to create a Transaction
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Transaction we want to update
     *   }
     * })
     */
    upsert<T extends TransactionUpsertArgs>(args: SelectSubset<T, TransactionUpsertArgs<ExtArgs>>): Prisma__TransactionClient<$Result.GetResult<Prisma.$TransactionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Transactions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionCountArgs} args - Arguments to filter Transactions to count.
     * @example
     * // Count the number of Transactions
     * const count = await prisma.transaction.count({
     *   where: {
     *     // ... the filter for the Transactions we want to count
     *   }
     * })
    **/
    count<T extends TransactionCountArgs>(
      args?: Subset<T, TransactionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TransactionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TransactionAggregateArgs>(args: Subset<T, TransactionAggregateArgs>): Prisma.PrismaPromise<GetTransactionAggregateType<T>>

    /**
     * Group by Transaction.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TransactionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TransactionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TransactionGroupByArgs['orderBy'] }
        : { orderBy?: TransactionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TransactionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTransactionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Transaction model
   */
  readonly fields: TransactionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Transaction.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TransactionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Transaction model
   */
  interface TransactionFieldRefs {
    readonly id: FieldRef<"Transaction", 'String'>
    readonly amount: FieldRef<"Transaction", 'Decimal'>
    readonly type: FieldRef<"Transaction", 'MovementType'>
    readonly description: FieldRef<"Transaction", 'String'>
    readonly date: FieldRef<"Transaction", 'DateTime'>
    readonly userId: FieldRef<"Transaction", 'String'>
    readonly categoryId: FieldRef<"Transaction", 'String'>
    readonly createdAt: FieldRef<"Transaction", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Transaction findUnique
   */
  export type TransactionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findUniqueOrThrow
   */
  export type TransactionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction findFirst
   */
  export type TransactionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findFirstOrThrow
   */
  export type TransactionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transaction to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction findMany
   */
  export type TransactionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter, which Transactions to fetch.
     */
    where?: TransactionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Transactions to fetch.
     */
    orderBy?: TransactionOrderByWithRelationInput | TransactionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Transactions.
     */
    cursor?: TransactionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Transactions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Transactions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Transactions.
     */
    distinct?: TransactionScalarFieldEnum | TransactionScalarFieldEnum[]
  }

  /**
   * Transaction create
   */
  export type TransactionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to create a Transaction.
     */
    data: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
  }

  /**
   * Transaction createMany
   */
  export type TransactionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Transaction createManyAndReturn
   */
  export type TransactionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to create many Transactions.
     */
    data: TransactionCreateManyInput | TransactionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction update
   */
  export type TransactionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The data needed to update a Transaction.
     */
    data: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
    /**
     * Choose, which Transaction to update.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction updateMany
   */
  export type TransactionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
  }

  /**
   * Transaction updateManyAndReturn
   */
  export type TransactionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * The data used to update Transactions.
     */
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyInput>
    /**
     * Filter which Transactions to update
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Transaction upsert
   */
  export type TransactionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * The filter to search for the Transaction to update in case it exists.
     */
    where: TransactionWhereUniqueInput
    /**
     * In case the Transaction found by the `where` argument doesn't exist, create a new Transaction with this data.
     */
    create: XOR<TransactionCreateInput, TransactionUncheckedCreateInput>
    /**
     * In case the Transaction was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TransactionUpdateInput, TransactionUncheckedUpdateInput>
  }

  /**
   * Transaction delete
   */
  export type TransactionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
    /**
     * Filter which Transaction to delete.
     */
    where: TransactionWhereUniqueInput
  }

  /**
   * Transaction deleteMany
   */
  export type TransactionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Transactions to delete
     */
    where?: TransactionWhereInput
    /**
     * Limit how many Transactions to delete.
     */
    limit?: number
  }

  /**
   * Transaction without action
   */
  export type TransactionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Transaction
     */
    select?: TransactionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Transaction
     */
    omit?: TransactionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TransactionInclude<ExtArgs> | null
  }


  /**
   * Model RefreshSession
   */

  export type AggregateRefreshSession = {
    _count: RefreshSessionCountAggregateOutputType | null
    _min: RefreshSessionMinAggregateOutputType | null
    _max: RefreshSessionMaxAggregateOutputType | null
  }

  export type RefreshSessionMinAggregateOutputType = {
    id: string | null
    userId: string | null
    currentRefreshTokenId: string | null
    previousRefreshTokenId: string | null
    currentIssuedAt: Date | null
    expiresAt: Date | null
    rotatedAt: Date | null
    revokedAt: Date | null
    createdAt: Date | null
  }

  export type RefreshSessionMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    currentRefreshTokenId: string | null
    previousRefreshTokenId: string | null
    currentIssuedAt: Date | null
    expiresAt: Date | null
    rotatedAt: Date | null
    revokedAt: Date | null
    createdAt: Date | null
  }

  export type RefreshSessionCountAggregateOutputType = {
    id: number
    userId: number
    currentRefreshTokenId: number
    previousRefreshTokenId: number
    currentIssuedAt: number
    expiresAt: number
    rotatedAt: number
    revokedAt: number
    createdAt: number
    _all: number
  }


  export type RefreshSessionMinAggregateInputType = {
    id?: true
    userId?: true
    currentRefreshTokenId?: true
    previousRefreshTokenId?: true
    currentIssuedAt?: true
    expiresAt?: true
    rotatedAt?: true
    revokedAt?: true
    createdAt?: true
  }

  export type RefreshSessionMaxAggregateInputType = {
    id?: true
    userId?: true
    currentRefreshTokenId?: true
    previousRefreshTokenId?: true
    currentIssuedAt?: true
    expiresAt?: true
    rotatedAt?: true
    revokedAt?: true
    createdAt?: true
  }

  export type RefreshSessionCountAggregateInputType = {
    id?: true
    userId?: true
    currentRefreshTokenId?: true
    previousRefreshTokenId?: true
    currentIssuedAt?: true
    expiresAt?: true
    rotatedAt?: true
    revokedAt?: true
    createdAt?: true
    _all?: true
  }

  export type RefreshSessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshSession to aggregate.
     */
    where?: RefreshSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshSessions to fetch.
     */
    orderBy?: RefreshSessionOrderByWithRelationInput | RefreshSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RefreshSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RefreshSessions
    **/
    _count?: true | RefreshSessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RefreshSessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RefreshSessionMaxAggregateInputType
  }

  export type GetRefreshSessionAggregateType<T extends RefreshSessionAggregateArgs> = {
        [P in keyof T & keyof AggregateRefreshSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRefreshSession[P]>
      : GetScalarType<T[P], AggregateRefreshSession[P]>
  }




  export type RefreshSessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RefreshSessionWhereInput
    orderBy?: RefreshSessionOrderByWithAggregationInput | RefreshSessionOrderByWithAggregationInput[]
    by: RefreshSessionScalarFieldEnum[] | RefreshSessionScalarFieldEnum
    having?: RefreshSessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RefreshSessionCountAggregateInputType | true
    _min?: RefreshSessionMinAggregateInputType
    _max?: RefreshSessionMaxAggregateInputType
  }

  export type RefreshSessionGroupByOutputType = {
    id: string
    userId: string
    currentRefreshTokenId: string
    previousRefreshTokenId: string | null
    currentIssuedAt: Date
    expiresAt: Date
    rotatedAt: Date | null
    revokedAt: Date | null
    createdAt: Date
    _count: RefreshSessionCountAggregateOutputType | null
    _min: RefreshSessionMinAggregateOutputType | null
    _max: RefreshSessionMaxAggregateOutputType | null
  }

  type GetRefreshSessionGroupByPayload<T extends RefreshSessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RefreshSessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RefreshSessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RefreshSessionGroupByOutputType[P]>
            : GetScalarType<T[P], RefreshSessionGroupByOutputType[P]>
        }
      >
    >


  export type RefreshSessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    currentRefreshTokenId?: boolean
    previousRefreshTokenId?: boolean
    currentIssuedAt?: boolean
    expiresAt?: boolean
    rotatedAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshSession"]>

  export type RefreshSessionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    currentRefreshTokenId?: boolean
    previousRefreshTokenId?: boolean
    currentIssuedAt?: boolean
    expiresAt?: boolean
    rotatedAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshSession"]>

  export type RefreshSessionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    currentRefreshTokenId?: boolean
    previousRefreshTokenId?: boolean
    currentIssuedAt?: boolean
    expiresAt?: boolean
    rotatedAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["refreshSession"]>

  export type RefreshSessionSelectScalar = {
    id?: boolean
    userId?: boolean
    currentRefreshTokenId?: boolean
    previousRefreshTokenId?: boolean
    currentIssuedAt?: boolean
    expiresAt?: boolean
    rotatedAt?: boolean
    revokedAt?: boolean
    createdAt?: boolean
  }

  export type RefreshSessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "currentRefreshTokenId" | "previousRefreshTokenId" | "currentIssuedAt" | "expiresAt" | "rotatedAt" | "revokedAt" | "createdAt", ExtArgs["result"]["refreshSession"]>
  export type RefreshSessionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RefreshSessionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type RefreshSessionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $RefreshSessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RefreshSession"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      currentRefreshTokenId: string
      previousRefreshTokenId: string | null
      currentIssuedAt: Date
      expiresAt: Date
      rotatedAt: Date | null
      revokedAt: Date | null
      createdAt: Date
    }, ExtArgs["result"]["refreshSession"]>
    composites: {}
  }

  type RefreshSessionGetPayload<S extends boolean | null | undefined | RefreshSessionDefaultArgs> = $Result.GetResult<Prisma.$RefreshSessionPayload, S>

  type RefreshSessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RefreshSessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RefreshSessionCountAggregateInputType | true
    }

  export interface RefreshSessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RefreshSession'], meta: { name: 'RefreshSession' } }
    /**
     * Find zero or one RefreshSession that matches the filter.
     * @param {RefreshSessionFindUniqueArgs} args - Arguments to find a RefreshSession
     * @example
     * // Get one RefreshSession
     * const refreshSession = await prisma.refreshSession.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RefreshSessionFindUniqueArgs>(args: SelectSubset<T, RefreshSessionFindUniqueArgs<ExtArgs>>): Prisma__RefreshSessionClient<$Result.GetResult<Prisma.$RefreshSessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RefreshSession that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RefreshSessionFindUniqueOrThrowArgs} args - Arguments to find a RefreshSession
     * @example
     * // Get one RefreshSession
     * const refreshSession = await prisma.refreshSession.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RefreshSessionFindUniqueOrThrowArgs>(args: SelectSubset<T, RefreshSessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RefreshSessionClient<$Result.GetResult<Prisma.$RefreshSessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshSession that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshSessionFindFirstArgs} args - Arguments to find a RefreshSession
     * @example
     * // Get one RefreshSession
     * const refreshSession = await prisma.refreshSession.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RefreshSessionFindFirstArgs>(args?: SelectSubset<T, RefreshSessionFindFirstArgs<ExtArgs>>): Prisma__RefreshSessionClient<$Result.GetResult<Prisma.$RefreshSessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RefreshSession that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshSessionFindFirstOrThrowArgs} args - Arguments to find a RefreshSession
     * @example
     * // Get one RefreshSession
     * const refreshSession = await prisma.refreshSession.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RefreshSessionFindFirstOrThrowArgs>(args?: SelectSubset<T, RefreshSessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__RefreshSessionClient<$Result.GetResult<Prisma.$RefreshSessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RefreshSessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshSessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RefreshSessions
     * const refreshSessions = await prisma.refreshSession.findMany()
     * 
     * // Get first 10 RefreshSessions
     * const refreshSessions = await prisma.refreshSession.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const refreshSessionWithIdOnly = await prisma.refreshSession.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends RefreshSessionFindManyArgs>(args?: SelectSubset<T, RefreshSessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshSessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RefreshSession.
     * @param {RefreshSessionCreateArgs} args - Arguments to create a RefreshSession.
     * @example
     * // Create one RefreshSession
     * const RefreshSession = await prisma.refreshSession.create({
     *   data: {
     *     // ... data to create a RefreshSession
     *   }
     * })
     * 
     */
    create<T extends RefreshSessionCreateArgs>(args: SelectSubset<T, RefreshSessionCreateArgs<ExtArgs>>): Prisma__RefreshSessionClient<$Result.GetResult<Prisma.$RefreshSessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RefreshSessions.
     * @param {RefreshSessionCreateManyArgs} args - Arguments to create many RefreshSessions.
     * @example
     * // Create many RefreshSessions
     * const refreshSession = await prisma.refreshSession.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RefreshSessionCreateManyArgs>(args?: SelectSubset<T, RefreshSessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RefreshSessions and returns the data saved in the database.
     * @param {RefreshSessionCreateManyAndReturnArgs} args - Arguments to create many RefreshSessions.
     * @example
     * // Create many RefreshSessions
     * const refreshSession = await prisma.refreshSession.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RefreshSessions and only return the `id`
     * const refreshSessionWithIdOnly = await prisma.refreshSession.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RefreshSessionCreateManyAndReturnArgs>(args?: SelectSubset<T, RefreshSessionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshSessionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RefreshSession.
     * @param {RefreshSessionDeleteArgs} args - Arguments to delete one RefreshSession.
     * @example
     * // Delete one RefreshSession
     * const RefreshSession = await prisma.refreshSession.delete({
     *   where: {
     *     // ... filter to delete one RefreshSession
     *   }
     * })
     * 
     */
    delete<T extends RefreshSessionDeleteArgs>(args: SelectSubset<T, RefreshSessionDeleteArgs<ExtArgs>>): Prisma__RefreshSessionClient<$Result.GetResult<Prisma.$RefreshSessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RefreshSession.
     * @param {RefreshSessionUpdateArgs} args - Arguments to update one RefreshSession.
     * @example
     * // Update one RefreshSession
     * const refreshSession = await prisma.refreshSession.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RefreshSessionUpdateArgs>(args: SelectSubset<T, RefreshSessionUpdateArgs<ExtArgs>>): Prisma__RefreshSessionClient<$Result.GetResult<Prisma.$RefreshSessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RefreshSessions.
     * @param {RefreshSessionDeleteManyArgs} args - Arguments to filter RefreshSessions to delete.
     * @example
     * // Delete a few RefreshSessions
     * const { count } = await prisma.refreshSession.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RefreshSessionDeleteManyArgs>(args?: SelectSubset<T, RefreshSessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshSessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RefreshSessions
     * const refreshSession = await prisma.refreshSession.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RefreshSessionUpdateManyArgs>(args: SelectSubset<T, RefreshSessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RefreshSessions and returns the data updated in the database.
     * @param {RefreshSessionUpdateManyAndReturnArgs} args - Arguments to update many RefreshSessions.
     * @example
     * // Update many RefreshSessions
     * const refreshSession = await prisma.refreshSession.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RefreshSessions and only return the `id`
     * const refreshSessionWithIdOnly = await prisma.refreshSession.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RefreshSessionUpdateManyAndReturnArgs>(args: SelectSubset<T, RefreshSessionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RefreshSessionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RefreshSession.
     * @param {RefreshSessionUpsertArgs} args - Arguments to update or create a RefreshSession.
     * @example
     * // Update or create a RefreshSession
     * const refreshSession = await prisma.refreshSession.upsert({
     *   create: {
     *     // ... data to create a RefreshSession
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RefreshSession we want to update
     *   }
     * })
     */
    upsert<T extends RefreshSessionUpsertArgs>(args: SelectSubset<T, RefreshSessionUpsertArgs<ExtArgs>>): Prisma__RefreshSessionClient<$Result.GetResult<Prisma.$RefreshSessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RefreshSessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshSessionCountArgs} args - Arguments to filter RefreshSessions to count.
     * @example
     * // Count the number of RefreshSessions
     * const count = await prisma.refreshSession.count({
     *   where: {
     *     // ... the filter for the RefreshSessions we want to count
     *   }
     * })
    **/
    count<T extends RefreshSessionCountArgs>(
      args?: Subset<T, RefreshSessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RefreshSessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RefreshSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshSessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RefreshSessionAggregateArgs>(args: Subset<T, RefreshSessionAggregateArgs>): Prisma.PrismaPromise<GetRefreshSessionAggregateType<T>>

    /**
     * Group by RefreshSession.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RefreshSessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RefreshSessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RefreshSessionGroupByArgs['orderBy'] }
        : { orderBy?: RefreshSessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RefreshSessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRefreshSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RefreshSession model
   */
  readonly fields: RefreshSessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RefreshSession.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RefreshSessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RefreshSession model
   */
  interface RefreshSessionFieldRefs {
    readonly id: FieldRef<"RefreshSession", 'String'>
    readonly userId: FieldRef<"RefreshSession", 'String'>
    readonly currentRefreshTokenId: FieldRef<"RefreshSession", 'String'>
    readonly previousRefreshTokenId: FieldRef<"RefreshSession", 'String'>
    readonly currentIssuedAt: FieldRef<"RefreshSession", 'DateTime'>
    readonly expiresAt: FieldRef<"RefreshSession", 'DateTime'>
    readonly rotatedAt: FieldRef<"RefreshSession", 'DateTime'>
    readonly revokedAt: FieldRef<"RefreshSession", 'DateTime'>
    readonly createdAt: FieldRef<"RefreshSession", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RefreshSession findUnique
   */
  export type RefreshSessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshSession
     */
    select?: RefreshSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshSession
     */
    omit?: RefreshSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshSessionInclude<ExtArgs> | null
    /**
     * Filter, which RefreshSession to fetch.
     */
    where: RefreshSessionWhereUniqueInput
  }

  /**
   * RefreshSession findUniqueOrThrow
   */
  export type RefreshSessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshSession
     */
    select?: RefreshSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshSession
     */
    omit?: RefreshSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshSessionInclude<ExtArgs> | null
    /**
     * Filter, which RefreshSession to fetch.
     */
    where: RefreshSessionWhereUniqueInput
  }

  /**
   * RefreshSession findFirst
   */
  export type RefreshSessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshSession
     */
    select?: RefreshSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshSession
     */
    omit?: RefreshSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshSessionInclude<ExtArgs> | null
    /**
     * Filter, which RefreshSession to fetch.
     */
    where?: RefreshSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshSessions to fetch.
     */
    orderBy?: RefreshSessionOrderByWithRelationInput | RefreshSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshSessions.
     */
    cursor?: RefreshSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshSessions.
     */
    distinct?: RefreshSessionScalarFieldEnum | RefreshSessionScalarFieldEnum[]
  }

  /**
   * RefreshSession findFirstOrThrow
   */
  export type RefreshSessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshSession
     */
    select?: RefreshSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshSession
     */
    omit?: RefreshSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshSessionInclude<ExtArgs> | null
    /**
     * Filter, which RefreshSession to fetch.
     */
    where?: RefreshSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshSessions to fetch.
     */
    orderBy?: RefreshSessionOrderByWithRelationInput | RefreshSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RefreshSessions.
     */
    cursor?: RefreshSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshSessions.
     */
    distinct?: RefreshSessionScalarFieldEnum | RefreshSessionScalarFieldEnum[]
  }

  /**
   * RefreshSession findMany
   */
  export type RefreshSessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshSession
     */
    select?: RefreshSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshSession
     */
    omit?: RefreshSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshSessionInclude<ExtArgs> | null
    /**
     * Filter, which RefreshSessions to fetch.
     */
    where?: RefreshSessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RefreshSessions to fetch.
     */
    orderBy?: RefreshSessionOrderByWithRelationInput | RefreshSessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RefreshSessions.
     */
    cursor?: RefreshSessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RefreshSessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RefreshSessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RefreshSessions.
     */
    distinct?: RefreshSessionScalarFieldEnum | RefreshSessionScalarFieldEnum[]
  }

  /**
   * RefreshSession create
   */
  export type RefreshSessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshSession
     */
    select?: RefreshSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshSession
     */
    omit?: RefreshSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshSessionInclude<ExtArgs> | null
    /**
     * The data needed to create a RefreshSession.
     */
    data: XOR<RefreshSessionCreateInput, RefreshSessionUncheckedCreateInput>
  }

  /**
   * RefreshSession createMany
   */
  export type RefreshSessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RefreshSessions.
     */
    data: RefreshSessionCreateManyInput | RefreshSessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RefreshSession createManyAndReturn
   */
  export type RefreshSessionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshSession
     */
    select?: RefreshSessionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshSession
     */
    omit?: RefreshSessionOmit<ExtArgs> | null
    /**
     * The data used to create many RefreshSessions.
     */
    data: RefreshSessionCreateManyInput | RefreshSessionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshSessionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshSession update
   */
  export type RefreshSessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshSession
     */
    select?: RefreshSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshSession
     */
    omit?: RefreshSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshSessionInclude<ExtArgs> | null
    /**
     * The data needed to update a RefreshSession.
     */
    data: XOR<RefreshSessionUpdateInput, RefreshSessionUncheckedUpdateInput>
    /**
     * Choose, which RefreshSession to update.
     */
    where: RefreshSessionWhereUniqueInput
  }

  /**
   * RefreshSession updateMany
   */
  export type RefreshSessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RefreshSessions.
     */
    data: XOR<RefreshSessionUpdateManyMutationInput, RefreshSessionUncheckedUpdateManyInput>
    /**
     * Filter which RefreshSessions to update
     */
    where?: RefreshSessionWhereInput
    /**
     * Limit how many RefreshSessions to update.
     */
    limit?: number
  }

  /**
   * RefreshSession updateManyAndReturn
   */
  export type RefreshSessionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshSession
     */
    select?: RefreshSessionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshSession
     */
    omit?: RefreshSessionOmit<ExtArgs> | null
    /**
     * The data used to update RefreshSessions.
     */
    data: XOR<RefreshSessionUpdateManyMutationInput, RefreshSessionUncheckedUpdateManyInput>
    /**
     * Filter which RefreshSessions to update
     */
    where?: RefreshSessionWhereInput
    /**
     * Limit how many RefreshSessions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshSessionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * RefreshSession upsert
   */
  export type RefreshSessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshSession
     */
    select?: RefreshSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshSession
     */
    omit?: RefreshSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshSessionInclude<ExtArgs> | null
    /**
     * The filter to search for the RefreshSession to update in case it exists.
     */
    where: RefreshSessionWhereUniqueInput
    /**
     * In case the RefreshSession found by the `where` argument doesn't exist, create a new RefreshSession with this data.
     */
    create: XOR<RefreshSessionCreateInput, RefreshSessionUncheckedCreateInput>
    /**
     * In case the RefreshSession was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RefreshSessionUpdateInput, RefreshSessionUncheckedUpdateInput>
  }

  /**
   * RefreshSession delete
   */
  export type RefreshSessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshSession
     */
    select?: RefreshSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshSession
     */
    omit?: RefreshSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshSessionInclude<ExtArgs> | null
    /**
     * Filter which RefreshSession to delete.
     */
    where: RefreshSessionWhereUniqueInput
  }

  /**
   * RefreshSession deleteMany
   */
  export type RefreshSessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RefreshSessions to delete
     */
    where?: RefreshSessionWhereInput
    /**
     * Limit how many RefreshSessions to delete.
     */
    limit?: number
  }

  /**
   * RefreshSession without action
   */
  export type RefreshSessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RefreshSession
     */
    select?: RefreshSessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RefreshSession
     */
    omit?: RefreshSessionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: RefreshSessionInclude<ExtArgs> | null
  }


  /**
   * Model RateLimitBucket
   */

  export type AggregateRateLimitBucket = {
    _count: RateLimitBucketCountAggregateOutputType | null
    _avg: RateLimitBucketAvgAggregateOutputType | null
    _sum: RateLimitBucketSumAggregateOutputType | null
    _min: RateLimitBucketMinAggregateOutputType | null
    _max: RateLimitBucketMaxAggregateOutputType | null
  }

  export type RateLimitBucketAvgAggregateOutputType = {
    count: number | null
  }

  export type RateLimitBucketSumAggregateOutputType = {
    count: number | null
  }

  export type RateLimitBucketMinAggregateOutputType = {
    key: string | null
    count: number | null
    windowStartedAt: Date | null
    expiresAt: Date | null
  }

  export type RateLimitBucketMaxAggregateOutputType = {
    key: string | null
    count: number | null
    windowStartedAt: Date | null
    expiresAt: Date | null
  }

  export type RateLimitBucketCountAggregateOutputType = {
    key: number
    count: number
    windowStartedAt: number
    expiresAt: number
    _all: number
  }


  export type RateLimitBucketAvgAggregateInputType = {
    count?: true
  }

  export type RateLimitBucketSumAggregateInputType = {
    count?: true
  }

  export type RateLimitBucketMinAggregateInputType = {
    key?: true
    count?: true
    windowStartedAt?: true
    expiresAt?: true
  }

  export type RateLimitBucketMaxAggregateInputType = {
    key?: true
    count?: true
    windowStartedAt?: true
    expiresAt?: true
  }

  export type RateLimitBucketCountAggregateInputType = {
    key?: true
    count?: true
    windowStartedAt?: true
    expiresAt?: true
    _all?: true
  }

  export type RateLimitBucketAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RateLimitBucket to aggregate.
     */
    where?: RateLimitBucketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RateLimitBuckets to fetch.
     */
    orderBy?: RateLimitBucketOrderByWithRelationInput | RateLimitBucketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: RateLimitBucketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RateLimitBuckets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RateLimitBuckets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned RateLimitBuckets
    **/
    _count?: true | RateLimitBucketCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: RateLimitBucketAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: RateLimitBucketSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: RateLimitBucketMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: RateLimitBucketMaxAggregateInputType
  }

  export type GetRateLimitBucketAggregateType<T extends RateLimitBucketAggregateArgs> = {
        [P in keyof T & keyof AggregateRateLimitBucket]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateRateLimitBucket[P]>
      : GetScalarType<T[P], AggregateRateLimitBucket[P]>
  }




  export type RateLimitBucketGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: RateLimitBucketWhereInput
    orderBy?: RateLimitBucketOrderByWithAggregationInput | RateLimitBucketOrderByWithAggregationInput[]
    by: RateLimitBucketScalarFieldEnum[] | RateLimitBucketScalarFieldEnum
    having?: RateLimitBucketScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: RateLimitBucketCountAggregateInputType | true
    _avg?: RateLimitBucketAvgAggregateInputType
    _sum?: RateLimitBucketSumAggregateInputType
    _min?: RateLimitBucketMinAggregateInputType
    _max?: RateLimitBucketMaxAggregateInputType
  }

  export type RateLimitBucketGroupByOutputType = {
    key: string
    count: number
    windowStartedAt: Date
    expiresAt: Date
    _count: RateLimitBucketCountAggregateOutputType | null
    _avg: RateLimitBucketAvgAggregateOutputType | null
    _sum: RateLimitBucketSumAggregateOutputType | null
    _min: RateLimitBucketMinAggregateOutputType | null
    _max: RateLimitBucketMaxAggregateOutputType | null
  }

  type GetRateLimitBucketGroupByPayload<T extends RateLimitBucketGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<RateLimitBucketGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof RateLimitBucketGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], RateLimitBucketGroupByOutputType[P]>
            : GetScalarType<T[P], RateLimitBucketGroupByOutputType[P]>
        }
      >
    >


  export type RateLimitBucketSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    count?: boolean
    windowStartedAt?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["rateLimitBucket"]>

  export type RateLimitBucketSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    count?: boolean
    windowStartedAt?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["rateLimitBucket"]>

  export type RateLimitBucketSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    key?: boolean
    count?: boolean
    windowStartedAt?: boolean
    expiresAt?: boolean
  }, ExtArgs["result"]["rateLimitBucket"]>

  export type RateLimitBucketSelectScalar = {
    key?: boolean
    count?: boolean
    windowStartedAt?: boolean
    expiresAt?: boolean
  }

  export type RateLimitBucketOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"key" | "count" | "windowStartedAt" | "expiresAt", ExtArgs["result"]["rateLimitBucket"]>

  export type $RateLimitBucketPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "RateLimitBucket"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      key: string
      count: number
      windowStartedAt: Date
      expiresAt: Date
    }, ExtArgs["result"]["rateLimitBucket"]>
    composites: {}
  }

  type RateLimitBucketGetPayload<S extends boolean | null | undefined | RateLimitBucketDefaultArgs> = $Result.GetResult<Prisma.$RateLimitBucketPayload, S>

  type RateLimitBucketCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<RateLimitBucketFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: RateLimitBucketCountAggregateInputType | true
    }

  export interface RateLimitBucketDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['RateLimitBucket'], meta: { name: 'RateLimitBucket' } }
    /**
     * Find zero or one RateLimitBucket that matches the filter.
     * @param {RateLimitBucketFindUniqueArgs} args - Arguments to find a RateLimitBucket
     * @example
     * // Get one RateLimitBucket
     * const rateLimitBucket = await prisma.rateLimitBucket.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends RateLimitBucketFindUniqueArgs>(args: SelectSubset<T, RateLimitBucketFindUniqueArgs<ExtArgs>>): Prisma__RateLimitBucketClient<$Result.GetResult<Prisma.$RateLimitBucketPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one RateLimitBucket that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {RateLimitBucketFindUniqueOrThrowArgs} args - Arguments to find a RateLimitBucket
     * @example
     * // Get one RateLimitBucket
     * const rateLimitBucket = await prisma.rateLimitBucket.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends RateLimitBucketFindUniqueOrThrowArgs>(args: SelectSubset<T, RateLimitBucketFindUniqueOrThrowArgs<ExtArgs>>): Prisma__RateLimitBucketClient<$Result.GetResult<Prisma.$RateLimitBucketPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RateLimitBucket that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitBucketFindFirstArgs} args - Arguments to find a RateLimitBucket
     * @example
     * // Get one RateLimitBucket
     * const rateLimitBucket = await prisma.rateLimitBucket.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends RateLimitBucketFindFirstArgs>(args?: SelectSubset<T, RateLimitBucketFindFirstArgs<ExtArgs>>): Prisma__RateLimitBucketClient<$Result.GetResult<Prisma.$RateLimitBucketPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first RateLimitBucket that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitBucketFindFirstOrThrowArgs} args - Arguments to find a RateLimitBucket
     * @example
     * // Get one RateLimitBucket
     * const rateLimitBucket = await prisma.rateLimitBucket.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends RateLimitBucketFindFirstOrThrowArgs>(args?: SelectSubset<T, RateLimitBucketFindFirstOrThrowArgs<ExtArgs>>): Prisma__RateLimitBucketClient<$Result.GetResult<Prisma.$RateLimitBucketPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more RateLimitBuckets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitBucketFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all RateLimitBuckets
     * const rateLimitBuckets = await prisma.rateLimitBucket.findMany()
     * 
     * // Get first 10 RateLimitBuckets
     * const rateLimitBuckets = await prisma.rateLimitBucket.findMany({ take: 10 })
     * 
     * // Only select the `key`
     * const rateLimitBucketWithKeyOnly = await prisma.rateLimitBucket.findMany({ select: { key: true } })
     * 
     */
    findMany<T extends RateLimitBucketFindManyArgs>(args?: SelectSubset<T, RateLimitBucketFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RateLimitBucketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a RateLimitBucket.
     * @param {RateLimitBucketCreateArgs} args - Arguments to create a RateLimitBucket.
     * @example
     * // Create one RateLimitBucket
     * const RateLimitBucket = await prisma.rateLimitBucket.create({
     *   data: {
     *     // ... data to create a RateLimitBucket
     *   }
     * })
     * 
     */
    create<T extends RateLimitBucketCreateArgs>(args: SelectSubset<T, RateLimitBucketCreateArgs<ExtArgs>>): Prisma__RateLimitBucketClient<$Result.GetResult<Prisma.$RateLimitBucketPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many RateLimitBuckets.
     * @param {RateLimitBucketCreateManyArgs} args - Arguments to create many RateLimitBuckets.
     * @example
     * // Create many RateLimitBuckets
     * const rateLimitBucket = await prisma.rateLimitBucket.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends RateLimitBucketCreateManyArgs>(args?: SelectSubset<T, RateLimitBucketCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many RateLimitBuckets and returns the data saved in the database.
     * @param {RateLimitBucketCreateManyAndReturnArgs} args - Arguments to create many RateLimitBuckets.
     * @example
     * // Create many RateLimitBuckets
     * const rateLimitBucket = await prisma.rateLimitBucket.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many RateLimitBuckets and only return the `key`
     * const rateLimitBucketWithKeyOnly = await prisma.rateLimitBucket.createManyAndReturn({
     *   select: { key: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends RateLimitBucketCreateManyAndReturnArgs>(args?: SelectSubset<T, RateLimitBucketCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RateLimitBucketPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a RateLimitBucket.
     * @param {RateLimitBucketDeleteArgs} args - Arguments to delete one RateLimitBucket.
     * @example
     * // Delete one RateLimitBucket
     * const RateLimitBucket = await prisma.rateLimitBucket.delete({
     *   where: {
     *     // ... filter to delete one RateLimitBucket
     *   }
     * })
     * 
     */
    delete<T extends RateLimitBucketDeleteArgs>(args: SelectSubset<T, RateLimitBucketDeleteArgs<ExtArgs>>): Prisma__RateLimitBucketClient<$Result.GetResult<Prisma.$RateLimitBucketPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one RateLimitBucket.
     * @param {RateLimitBucketUpdateArgs} args - Arguments to update one RateLimitBucket.
     * @example
     * // Update one RateLimitBucket
     * const rateLimitBucket = await prisma.rateLimitBucket.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends RateLimitBucketUpdateArgs>(args: SelectSubset<T, RateLimitBucketUpdateArgs<ExtArgs>>): Prisma__RateLimitBucketClient<$Result.GetResult<Prisma.$RateLimitBucketPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more RateLimitBuckets.
     * @param {RateLimitBucketDeleteManyArgs} args - Arguments to filter RateLimitBuckets to delete.
     * @example
     * // Delete a few RateLimitBuckets
     * const { count } = await prisma.rateLimitBucket.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends RateLimitBucketDeleteManyArgs>(args?: SelectSubset<T, RateLimitBucketDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RateLimitBuckets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitBucketUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many RateLimitBuckets
     * const rateLimitBucket = await prisma.rateLimitBucket.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends RateLimitBucketUpdateManyArgs>(args: SelectSubset<T, RateLimitBucketUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more RateLimitBuckets and returns the data updated in the database.
     * @param {RateLimitBucketUpdateManyAndReturnArgs} args - Arguments to update many RateLimitBuckets.
     * @example
     * // Update many RateLimitBuckets
     * const rateLimitBucket = await prisma.rateLimitBucket.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more RateLimitBuckets and only return the `key`
     * const rateLimitBucketWithKeyOnly = await prisma.rateLimitBucket.updateManyAndReturn({
     *   select: { key: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends RateLimitBucketUpdateManyAndReturnArgs>(args: SelectSubset<T, RateLimitBucketUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$RateLimitBucketPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one RateLimitBucket.
     * @param {RateLimitBucketUpsertArgs} args - Arguments to update or create a RateLimitBucket.
     * @example
     * // Update or create a RateLimitBucket
     * const rateLimitBucket = await prisma.rateLimitBucket.upsert({
     *   create: {
     *     // ... data to create a RateLimitBucket
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the RateLimitBucket we want to update
     *   }
     * })
     */
    upsert<T extends RateLimitBucketUpsertArgs>(args: SelectSubset<T, RateLimitBucketUpsertArgs<ExtArgs>>): Prisma__RateLimitBucketClient<$Result.GetResult<Prisma.$RateLimitBucketPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of RateLimitBuckets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitBucketCountArgs} args - Arguments to filter RateLimitBuckets to count.
     * @example
     * // Count the number of RateLimitBuckets
     * const count = await prisma.rateLimitBucket.count({
     *   where: {
     *     // ... the filter for the RateLimitBuckets we want to count
     *   }
     * })
    **/
    count<T extends RateLimitBucketCountArgs>(
      args?: Subset<T, RateLimitBucketCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], RateLimitBucketCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a RateLimitBucket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitBucketAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends RateLimitBucketAggregateArgs>(args: Subset<T, RateLimitBucketAggregateArgs>): Prisma.PrismaPromise<GetRateLimitBucketAggregateType<T>>

    /**
     * Group by RateLimitBucket.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {RateLimitBucketGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends RateLimitBucketGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: RateLimitBucketGroupByArgs['orderBy'] }
        : { orderBy?: RateLimitBucketGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, RateLimitBucketGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetRateLimitBucketGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the RateLimitBucket model
   */
  readonly fields: RateLimitBucketFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for RateLimitBucket.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__RateLimitBucketClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the RateLimitBucket model
   */
  interface RateLimitBucketFieldRefs {
    readonly key: FieldRef<"RateLimitBucket", 'String'>
    readonly count: FieldRef<"RateLimitBucket", 'Int'>
    readonly windowStartedAt: FieldRef<"RateLimitBucket", 'DateTime'>
    readonly expiresAt: FieldRef<"RateLimitBucket", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * RateLimitBucket findUnique
   */
  export type RateLimitBucketFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimitBucket
     */
    select?: RateLimitBucketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimitBucket
     */
    omit?: RateLimitBucketOmit<ExtArgs> | null
    /**
     * Filter, which RateLimitBucket to fetch.
     */
    where: RateLimitBucketWhereUniqueInput
  }

  /**
   * RateLimitBucket findUniqueOrThrow
   */
  export type RateLimitBucketFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimitBucket
     */
    select?: RateLimitBucketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimitBucket
     */
    omit?: RateLimitBucketOmit<ExtArgs> | null
    /**
     * Filter, which RateLimitBucket to fetch.
     */
    where: RateLimitBucketWhereUniqueInput
  }

  /**
   * RateLimitBucket findFirst
   */
  export type RateLimitBucketFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimitBucket
     */
    select?: RateLimitBucketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimitBucket
     */
    omit?: RateLimitBucketOmit<ExtArgs> | null
    /**
     * Filter, which RateLimitBucket to fetch.
     */
    where?: RateLimitBucketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RateLimitBuckets to fetch.
     */
    orderBy?: RateLimitBucketOrderByWithRelationInput | RateLimitBucketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RateLimitBuckets.
     */
    cursor?: RateLimitBucketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RateLimitBuckets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RateLimitBuckets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RateLimitBuckets.
     */
    distinct?: RateLimitBucketScalarFieldEnum | RateLimitBucketScalarFieldEnum[]
  }

  /**
   * RateLimitBucket findFirstOrThrow
   */
  export type RateLimitBucketFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimitBucket
     */
    select?: RateLimitBucketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimitBucket
     */
    omit?: RateLimitBucketOmit<ExtArgs> | null
    /**
     * Filter, which RateLimitBucket to fetch.
     */
    where?: RateLimitBucketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RateLimitBuckets to fetch.
     */
    orderBy?: RateLimitBucketOrderByWithRelationInput | RateLimitBucketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for RateLimitBuckets.
     */
    cursor?: RateLimitBucketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RateLimitBuckets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RateLimitBuckets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RateLimitBuckets.
     */
    distinct?: RateLimitBucketScalarFieldEnum | RateLimitBucketScalarFieldEnum[]
  }

  /**
   * RateLimitBucket findMany
   */
  export type RateLimitBucketFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimitBucket
     */
    select?: RateLimitBucketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimitBucket
     */
    omit?: RateLimitBucketOmit<ExtArgs> | null
    /**
     * Filter, which RateLimitBuckets to fetch.
     */
    where?: RateLimitBucketWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of RateLimitBuckets to fetch.
     */
    orderBy?: RateLimitBucketOrderByWithRelationInput | RateLimitBucketOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing RateLimitBuckets.
     */
    cursor?: RateLimitBucketWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` RateLimitBuckets from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` RateLimitBuckets.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of RateLimitBuckets.
     */
    distinct?: RateLimitBucketScalarFieldEnum | RateLimitBucketScalarFieldEnum[]
  }

  /**
   * RateLimitBucket create
   */
  export type RateLimitBucketCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimitBucket
     */
    select?: RateLimitBucketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimitBucket
     */
    omit?: RateLimitBucketOmit<ExtArgs> | null
    /**
     * The data needed to create a RateLimitBucket.
     */
    data: XOR<RateLimitBucketCreateInput, RateLimitBucketUncheckedCreateInput>
  }

  /**
   * RateLimitBucket createMany
   */
  export type RateLimitBucketCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many RateLimitBuckets.
     */
    data: RateLimitBucketCreateManyInput | RateLimitBucketCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RateLimitBucket createManyAndReturn
   */
  export type RateLimitBucketCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimitBucket
     */
    select?: RateLimitBucketSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimitBucket
     */
    omit?: RateLimitBucketOmit<ExtArgs> | null
    /**
     * The data used to create many RateLimitBuckets.
     */
    data: RateLimitBucketCreateManyInput | RateLimitBucketCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * RateLimitBucket update
   */
  export type RateLimitBucketUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimitBucket
     */
    select?: RateLimitBucketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimitBucket
     */
    omit?: RateLimitBucketOmit<ExtArgs> | null
    /**
     * The data needed to update a RateLimitBucket.
     */
    data: XOR<RateLimitBucketUpdateInput, RateLimitBucketUncheckedUpdateInput>
    /**
     * Choose, which RateLimitBucket to update.
     */
    where: RateLimitBucketWhereUniqueInput
  }

  /**
   * RateLimitBucket updateMany
   */
  export type RateLimitBucketUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update RateLimitBuckets.
     */
    data: XOR<RateLimitBucketUpdateManyMutationInput, RateLimitBucketUncheckedUpdateManyInput>
    /**
     * Filter which RateLimitBuckets to update
     */
    where?: RateLimitBucketWhereInput
    /**
     * Limit how many RateLimitBuckets to update.
     */
    limit?: number
  }

  /**
   * RateLimitBucket updateManyAndReturn
   */
  export type RateLimitBucketUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimitBucket
     */
    select?: RateLimitBucketSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimitBucket
     */
    omit?: RateLimitBucketOmit<ExtArgs> | null
    /**
     * The data used to update RateLimitBuckets.
     */
    data: XOR<RateLimitBucketUpdateManyMutationInput, RateLimitBucketUncheckedUpdateManyInput>
    /**
     * Filter which RateLimitBuckets to update
     */
    where?: RateLimitBucketWhereInput
    /**
     * Limit how many RateLimitBuckets to update.
     */
    limit?: number
  }

  /**
   * RateLimitBucket upsert
   */
  export type RateLimitBucketUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimitBucket
     */
    select?: RateLimitBucketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimitBucket
     */
    omit?: RateLimitBucketOmit<ExtArgs> | null
    /**
     * The filter to search for the RateLimitBucket to update in case it exists.
     */
    where: RateLimitBucketWhereUniqueInput
    /**
     * In case the RateLimitBucket found by the `where` argument doesn't exist, create a new RateLimitBucket with this data.
     */
    create: XOR<RateLimitBucketCreateInput, RateLimitBucketUncheckedCreateInput>
    /**
     * In case the RateLimitBucket was found with the provided `where` argument, update it with this data.
     */
    update: XOR<RateLimitBucketUpdateInput, RateLimitBucketUncheckedUpdateInput>
  }

  /**
   * RateLimitBucket delete
   */
  export type RateLimitBucketDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimitBucket
     */
    select?: RateLimitBucketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimitBucket
     */
    omit?: RateLimitBucketOmit<ExtArgs> | null
    /**
     * Filter which RateLimitBucket to delete.
     */
    where: RateLimitBucketWhereUniqueInput
  }

  /**
   * RateLimitBucket deleteMany
   */
  export type RateLimitBucketDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which RateLimitBuckets to delete
     */
    where?: RateLimitBucketWhereInput
    /**
     * Limit how many RateLimitBuckets to delete.
     */
    limit?: number
  }

  /**
   * RateLimitBucket without action
   */
  export type RateLimitBucketDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the RateLimitBucket
     */
    select?: RateLimitBucketSelect<ExtArgs> | null
    /**
     * Omit specific fields from the RateLimitBucket
     */
    omit?: RateLimitBucketOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    hashedPassword: 'hashedPassword',
    username: 'username',
    metodoAutenticacion: 'metodoAutenticacion',
    avatarUrl: 'avatarUrl',
    googleId: 'googleId',
    currency: 'currency',
    tokenVersion: 'tokenVersion',
    createdAt: 'createdAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ExchangeRateCacheScalarFieldEnum: {
    id: 'id',
    rates: 'rates',
    fetchedAt: 'fetchedAt',
    nextRefreshAt: 'nextRefreshAt'
  };

  export type ExchangeRateCacheScalarFieldEnum = (typeof ExchangeRateCacheScalarFieldEnum)[keyof typeof ExchangeRateCacheScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    type: 'type',
    icon: 'icon',
    color: 'color',
    userId: 'userId',
    createdAt: 'createdAt'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const TransactionScalarFieldEnum: {
    id: 'id',
    amount: 'amount',
    type: 'type',
    description: 'description',
    date: 'date',
    userId: 'userId',
    categoryId: 'categoryId',
    createdAt: 'createdAt'
  };

  export type TransactionScalarFieldEnum = (typeof TransactionScalarFieldEnum)[keyof typeof TransactionScalarFieldEnum]


  export const RefreshSessionScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    currentRefreshTokenId: 'currentRefreshTokenId',
    previousRefreshTokenId: 'previousRefreshTokenId',
    currentIssuedAt: 'currentIssuedAt',
    expiresAt: 'expiresAt',
    rotatedAt: 'rotatedAt',
    revokedAt: 'revokedAt',
    createdAt: 'createdAt'
  };

  export type RefreshSessionScalarFieldEnum = (typeof RefreshSessionScalarFieldEnum)[keyof typeof RefreshSessionScalarFieldEnum]


  export const RateLimitBucketScalarFieldEnum: {
    key: 'key',
    count: 'count',
    windowStartedAt: 'windowStartedAt',
    expiresAt: 'expiresAt'
  };

  export type RateLimitBucketScalarFieldEnum = (typeof RateLimitBucketScalarFieldEnum)[keyof typeof RateLimitBucketScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const JsonNullValueInput: {
    JsonNull: typeof JsonNull
  };

  export type JsonNullValueInput = (typeof JsonNullValueInput)[keyof typeof JsonNullValueInput]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'AuthMethod'
   */
  export type EnumAuthMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuthMethod'>
    


  /**
   * Reference to a field of type 'AuthMethod[]'
   */
  export type ListEnumAuthMethodFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AuthMethod[]'>
    


  /**
   * Reference to a field of type 'CurrencyCode'
   */
  export type EnumCurrencyCodeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CurrencyCode'>
    


  /**
   * Reference to a field of type 'CurrencyCode[]'
   */
  export type ListEnumCurrencyCodeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'CurrencyCode[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'MovementType'
   */
  export type EnumMovementTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MovementType'>
    


  /**
   * Reference to a field of type 'MovementType[]'
   */
  export type ListEnumMovementTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MovementType[]'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Decimal[]'
   */
  export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    hashedPassword?: StringNullableFilter<"User"> | string | null
    username?: StringFilter<"User"> | string
    metodoAutenticacion?: EnumAuthMethodFilter<"User"> | $Enums.AuthMethod
    avatarUrl?: StringNullableFilter<"User"> | string | null
    googleId?: StringNullableFilter<"User"> | string | null
    currency?: EnumCurrencyCodeFilter<"User"> | $Enums.CurrencyCode
    tokenVersion?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    categories?: CategoryListRelationFilter
    transactions?: TransactionListRelationFilter
    refreshSessions?: RefreshSessionListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    hashedPassword?: SortOrderInput | SortOrder
    username?: SortOrder
    metodoAutenticacion?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    googleId?: SortOrderInput | SortOrder
    currency?: SortOrder
    tokenVersion?: SortOrder
    createdAt?: SortOrder
    categories?: CategoryOrderByRelationAggregateInput
    transactions?: TransactionOrderByRelationAggregateInput
    refreshSessions?: RefreshSessionOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    googleId?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    hashedPassword?: StringNullableFilter<"User"> | string | null
    username?: StringFilter<"User"> | string
    metodoAutenticacion?: EnumAuthMethodFilter<"User"> | $Enums.AuthMethod
    avatarUrl?: StringNullableFilter<"User"> | string | null
    currency?: EnumCurrencyCodeFilter<"User"> | $Enums.CurrencyCode
    tokenVersion?: IntFilter<"User"> | number
    createdAt?: DateTimeFilter<"User"> | Date | string
    categories?: CategoryListRelationFilter
    transactions?: TransactionListRelationFilter
    refreshSessions?: RefreshSessionListRelationFilter
  }, "id" | "email" | "googleId">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    hashedPassword?: SortOrderInput | SortOrder
    username?: SortOrder
    metodoAutenticacion?: SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    googleId?: SortOrderInput | SortOrder
    currency?: SortOrder
    tokenVersion?: SortOrder
    createdAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    hashedPassword?: StringNullableWithAggregatesFilter<"User"> | string | null
    username?: StringWithAggregatesFilter<"User"> | string
    metodoAutenticacion?: EnumAuthMethodWithAggregatesFilter<"User"> | $Enums.AuthMethod
    avatarUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    googleId?: StringNullableWithAggregatesFilter<"User"> | string | null
    currency?: EnumCurrencyCodeWithAggregatesFilter<"User"> | $Enums.CurrencyCode
    tokenVersion?: IntWithAggregatesFilter<"User"> | number
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ExchangeRateCacheWhereInput = {
    AND?: ExchangeRateCacheWhereInput | ExchangeRateCacheWhereInput[]
    OR?: ExchangeRateCacheWhereInput[]
    NOT?: ExchangeRateCacheWhereInput | ExchangeRateCacheWhereInput[]
    id?: StringFilter<"ExchangeRateCache"> | string
    rates?: JsonFilter<"ExchangeRateCache">
    fetchedAt?: DateTimeFilter<"ExchangeRateCache"> | Date | string
    nextRefreshAt?: DateTimeFilter<"ExchangeRateCache"> | Date | string
  }

  export type ExchangeRateCacheOrderByWithRelationInput = {
    id?: SortOrder
    rates?: SortOrder
    fetchedAt?: SortOrder
    nextRefreshAt?: SortOrder
  }

  export type ExchangeRateCacheWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ExchangeRateCacheWhereInput | ExchangeRateCacheWhereInput[]
    OR?: ExchangeRateCacheWhereInput[]
    NOT?: ExchangeRateCacheWhereInput | ExchangeRateCacheWhereInput[]
    rates?: JsonFilter<"ExchangeRateCache">
    fetchedAt?: DateTimeFilter<"ExchangeRateCache"> | Date | string
    nextRefreshAt?: DateTimeFilter<"ExchangeRateCache"> | Date | string
  }, "id">

  export type ExchangeRateCacheOrderByWithAggregationInput = {
    id?: SortOrder
    rates?: SortOrder
    fetchedAt?: SortOrder
    nextRefreshAt?: SortOrder
    _count?: ExchangeRateCacheCountOrderByAggregateInput
    _max?: ExchangeRateCacheMaxOrderByAggregateInput
    _min?: ExchangeRateCacheMinOrderByAggregateInput
  }

  export type ExchangeRateCacheScalarWhereWithAggregatesInput = {
    AND?: ExchangeRateCacheScalarWhereWithAggregatesInput | ExchangeRateCacheScalarWhereWithAggregatesInput[]
    OR?: ExchangeRateCacheScalarWhereWithAggregatesInput[]
    NOT?: ExchangeRateCacheScalarWhereWithAggregatesInput | ExchangeRateCacheScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ExchangeRateCache"> | string
    rates?: JsonWithAggregatesFilter<"ExchangeRateCache">
    fetchedAt?: DateTimeWithAggregatesFilter<"ExchangeRateCache"> | Date | string
    nextRefreshAt?: DateTimeWithAggregatesFilter<"ExchangeRateCache"> | Date | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    type?: EnumMovementTypeFilter<"Category"> | $Enums.MovementType
    icon?: StringNullableFilter<"Category"> | string | null
    color?: StringFilter<"Category"> | string
    userId?: StringNullableFilter<"Category"> | string | null
    createdAt?: DateTimeFilter<"Category"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    transactions?: TransactionListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    icon?: SortOrderInput | SortOrder
    color?: SortOrder
    userId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    transactions?: TransactionOrderByRelationAggregateInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    name?: StringFilter<"Category"> | string
    type?: EnumMovementTypeFilter<"Category"> | $Enums.MovementType
    icon?: StringNullableFilter<"Category"> | string | null
    color?: StringFilter<"Category"> | string
    userId?: StringNullableFilter<"Category"> | string | null
    createdAt?: DateTimeFilter<"Category"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
    transactions?: TransactionListRelationFilter
  }, "id">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    icon?: SortOrderInput | SortOrder
    color?: SortOrder
    userId?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
    type?: EnumMovementTypeWithAggregatesFilter<"Category"> | $Enums.MovementType
    icon?: StringNullableWithAggregatesFilter<"Category"> | string | null
    color?: StringWithAggregatesFilter<"Category"> | string
    userId?: StringNullableWithAggregatesFilter<"Category"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
  }

  export type TransactionWhereInput = {
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    id?: StringFilter<"Transaction"> | string
    amount?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    type?: EnumMovementTypeFilter<"Transaction"> | $Enums.MovementType
    description?: StringNullableFilter<"Transaction"> | string | null
    date?: DateTimeFilter<"Transaction"> | Date | string
    userId?: StringFilter<"Transaction"> | string
    categoryId?: StringFilter<"Transaction"> | string
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }

  export type TransactionOrderByWithRelationInput = {
    id?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    description?: SortOrderInput | SortOrder
    date?: SortOrder
    userId?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    category?: CategoryOrderByWithRelationInput
  }

  export type TransactionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TransactionWhereInput | TransactionWhereInput[]
    OR?: TransactionWhereInput[]
    NOT?: TransactionWhereInput | TransactionWhereInput[]
    amount?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    type?: EnumMovementTypeFilter<"Transaction"> | $Enums.MovementType
    description?: StringNullableFilter<"Transaction"> | string | null
    date?: DateTimeFilter<"Transaction"> | Date | string
    userId?: StringFilter<"Transaction"> | string
    categoryId?: StringFilter<"Transaction"> | string
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }, "id">

  export type TransactionOrderByWithAggregationInput = {
    id?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    description?: SortOrderInput | SortOrder
    date?: SortOrder
    userId?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
    _count?: TransactionCountOrderByAggregateInput
    _avg?: TransactionAvgOrderByAggregateInput
    _max?: TransactionMaxOrderByAggregateInput
    _min?: TransactionMinOrderByAggregateInput
    _sum?: TransactionSumOrderByAggregateInput
  }

  export type TransactionScalarWhereWithAggregatesInput = {
    AND?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    OR?: TransactionScalarWhereWithAggregatesInput[]
    NOT?: TransactionScalarWhereWithAggregatesInput | TransactionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Transaction"> | string
    amount?: DecimalWithAggregatesFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    type?: EnumMovementTypeWithAggregatesFilter<"Transaction"> | $Enums.MovementType
    description?: StringNullableWithAggregatesFilter<"Transaction"> | string | null
    date?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
    userId?: StringWithAggregatesFilter<"Transaction"> | string
    categoryId?: StringWithAggregatesFilter<"Transaction"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Transaction"> | Date | string
  }

  export type RefreshSessionWhereInput = {
    AND?: RefreshSessionWhereInput | RefreshSessionWhereInput[]
    OR?: RefreshSessionWhereInput[]
    NOT?: RefreshSessionWhereInput | RefreshSessionWhereInput[]
    id?: StringFilter<"RefreshSession"> | string
    userId?: StringFilter<"RefreshSession"> | string
    currentRefreshTokenId?: StringFilter<"RefreshSession"> | string
    previousRefreshTokenId?: StringNullableFilter<"RefreshSession"> | string | null
    currentIssuedAt?: DateTimeFilter<"RefreshSession"> | Date | string
    expiresAt?: DateTimeFilter<"RefreshSession"> | Date | string
    rotatedAt?: DateTimeNullableFilter<"RefreshSession"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"RefreshSession"> | Date | string | null
    createdAt?: DateTimeFilter<"RefreshSession"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type RefreshSessionOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    currentRefreshTokenId?: SortOrder
    previousRefreshTokenId?: SortOrderInput | SortOrder
    currentIssuedAt?: SortOrder
    expiresAt?: SortOrder
    rotatedAt?: SortOrderInput | SortOrder
    revokedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type RefreshSessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    currentRefreshTokenId?: string
    AND?: RefreshSessionWhereInput | RefreshSessionWhereInput[]
    OR?: RefreshSessionWhereInput[]
    NOT?: RefreshSessionWhereInput | RefreshSessionWhereInput[]
    userId?: StringFilter<"RefreshSession"> | string
    previousRefreshTokenId?: StringNullableFilter<"RefreshSession"> | string | null
    currentIssuedAt?: DateTimeFilter<"RefreshSession"> | Date | string
    expiresAt?: DateTimeFilter<"RefreshSession"> | Date | string
    rotatedAt?: DateTimeNullableFilter<"RefreshSession"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"RefreshSession"> | Date | string | null
    createdAt?: DateTimeFilter<"RefreshSession"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id" | "currentRefreshTokenId">

  export type RefreshSessionOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    currentRefreshTokenId?: SortOrder
    previousRefreshTokenId?: SortOrderInput | SortOrder
    currentIssuedAt?: SortOrder
    expiresAt?: SortOrder
    rotatedAt?: SortOrderInput | SortOrder
    revokedAt?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: RefreshSessionCountOrderByAggregateInput
    _max?: RefreshSessionMaxOrderByAggregateInput
    _min?: RefreshSessionMinOrderByAggregateInput
  }

  export type RefreshSessionScalarWhereWithAggregatesInput = {
    AND?: RefreshSessionScalarWhereWithAggregatesInput | RefreshSessionScalarWhereWithAggregatesInput[]
    OR?: RefreshSessionScalarWhereWithAggregatesInput[]
    NOT?: RefreshSessionScalarWhereWithAggregatesInput | RefreshSessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"RefreshSession"> | string
    userId?: StringWithAggregatesFilter<"RefreshSession"> | string
    currentRefreshTokenId?: StringWithAggregatesFilter<"RefreshSession"> | string
    previousRefreshTokenId?: StringNullableWithAggregatesFilter<"RefreshSession"> | string | null
    currentIssuedAt?: DateTimeWithAggregatesFilter<"RefreshSession"> | Date | string
    expiresAt?: DateTimeWithAggregatesFilter<"RefreshSession"> | Date | string
    rotatedAt?: DateTimeNullableWithAggregatesFilter<"RefreshSession"> | Date | string | null
    revokedAt?: DateTimeNullableWithAggregatesFilter<"RefreshSession"> | Date | string | null
    createdAt?: DateTimeWithAggregatesFilter<"RefreshSession"> | Date | string
  }

  export type RateLimitBucketWhereInput = {
    AND?: RateLimitBucketWhereInput | RateLimitBucketWhereInput[]
    OR?: RateLimitBucketWhereInput[]
    NOT?: RateLimitBucketWhereInput | RateLimitBucketWhereInput[]
    key?: StringFilter<"RateLimitBucket"> | string
    count?: IntFilter<"RateLimitBucket"> | number
    windowStartedAt?: DateTimeFilter<"RateLimitBucket"> | Date | string
    expiresAt?: DateTimeFilter<"RateLimitBucket"> | Date | string
  }

  export type RateLimitBucketOrderByWithRelationInput = {
    key?: SortOrder
    count?: SortOrder
    windowStartedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type RateLimitBucketWhereUniqueInput = Prisma.AtLeast<{
    key?: string
    AND?: RateLimitBucketWhereInput | RateLimitBucketWhereInput[]
    OR?: RateLimitBucketWhereInput[]
    NOT?: RateLimitBucketWhereInput | RateLimitBucketWhereInput[]
    count?: IntFilter<"RateLimitBucket"> | number
    windowStartedAt?: DateTimeFilter<"RateLimitBucket"> | Date | string
    expiresAt?: DateTimeFilter<"RateLimitBucket"> | Date | string
  }, "key">

  export type RateLimitBucketOrderByWithAggregationInput = {
    key?: SortOrder
    count?: SortOrder
    windowStartedAt?: SortOrder
    expiresAt?: SortOrder
    _count?: RateLimitBucketCountOrderByAggregateInput
    _avg?: RateLimitBucketAvgOrderByAggregateInput
    _max?: RateLimitBucketMaxOrderByAggregateInput
    _min?: RateLimitBucketMinOrderByAggregateInput
    _sum?: RateLimitBucketSumOrderByAggregateInput
  }

  export type RateLimitBucketScalarWhereWithAggregatesInput = {
    AND?: RateLimitBucketScalarWhereWithAggregatesInput | RateLimitBucketScalarWhereWithAggregatesInput[]
    OR?: RateLimitBucketScalarWhereWithAggregatesInput[]
    NOT?: RateLimitBucketScalarWhereWithAggregatesInput | RateLimitBucketScalarWhereWithAggregatesInput[]
    key?: StringWithAggregatesFilter<"RateLimitBucket"> | string
    count?: IntWithAggregatesFilter<"RateLimitBucket"> | number
    windowStartedAt?: DateTimeWithAggregatesFilter<"RateLimitBucket"> | Date | string
    expiresAt?: DateTimeWithAggregatesFilter<"RateLimitBucket"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    hashedPassword?: string | null
    username: string
    metodoAutenticacion?: $Enums.AuthMethod
    avatarUrl?: string | null
    googleId?: string | null
    currency?: $Enums.CurrencyCode
    tokenVersion?: number
    createdAt?: Date | string
    categories?: CategoryCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
    refreshSessions?: RefreshSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    hashedPassword?: string | null
    username: string
    metodoAutenticacion?: $Enums.AuthMethod
    avatarUrl?: string | null
    googleId?: string | null
    currency?: $Enums.CurrencyCode
    tokenVersion?: number
    createdAt?: Date | string
    categories?: CategoryUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
    refreshSessions?: RefreshSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    metodoAutenticacion?: EnumAuthMethodFieldUpdateOperationsInput | $Enums.AuthMethod
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: EnumCurrencyCodeFieldUpdateOperationsInput | $Enums.CurrencyCode
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: CategoryUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
    refreshSessions?: RefreshSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    metodoAutenticacion?: EnumAuthMethodFieldUpdateOperationsInput | $Enums.AuthMethod
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: EnumCurrencyCodeFieldUpdateOperationsInput | $Enums.CurrencyCode
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: CategoryUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
    refreshSessions?: RefreshSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    hashedPassword?: string | null
    username: string
    metodoAutenticacion?: $Enums.AuthMethod
    avatarUrl?: string | null
    googleId?: string | null
    currency?: $Enums.CurrencyCode
    tokenVersion?: number
    createdAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    metodoAutenticacion?: EnumAuthMethodFieldUpdateOperationsInput | $Enums.AuthMethod
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: EnumCurrencyCodeFieldUpdateOperationsInput | $Enums.CurrencyCode
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    metodoAutenticacion?: EnumAuthMethodFieldUpdateOperationsInput | $Enums.AuthMethod
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: EnumCurrencyCodeFieldUpdateOperationsInput | $Enums.CurrencyCode
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExchangeRateCacheCreateInput = {
    id: string
    rates: JsonNullValueInput | InputJsonValue
    fetchedAt: Date | string
    nextRefreshAt: Date | string
  }

  export type ExchangeRateCacheUncheckedCreateInput = {
    id: string
    rates: JsonNullValueInput | InputJsonValue
    fetchedAt: Date | string
    nextRefreshAt: Date | string
  }

  export type ExchangeRateCacheUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rates?: JsonNullValueInput | InputJsonValue
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nextRefreshAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExchangeRateCacheUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    rates?: JsonNullValueInput | InputJsonValue
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nextRefreshAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExchangeRateCacheCreateManyInput = {
    id: string
    rates: JsonNullValueInput | InputJsonValue
    fetchedAt: Date | string
    nextRefreshAt: Date | string
  }

  export type ExchangeRateCacheUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    rates?: JsonNullValueInput | InputJsonValue
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nextRefreshAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ExchangeRateCacheUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    rates?: JsonNullValueInput | InputJsonValue
    fetchedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    nextRefreshAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    id?: string
    name: string
    type: $Enums.MovementType
    icon?: string | null
    color: string
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutCategoriesInput
    transactions?: TransactionCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    name: string
    type: $Enums.MovementType
    icon?: string | null
    color: string
    userId?: string | null
    createdAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumMovementTypeFieldUpdateOperationsInput | $Enums.MovementType
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutCategoriesNestedInput
    transactions?: TransactionUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumMovementTypeFieldUpdateOperationsInput | $Enums.MovementType
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: string
    name: string
    type: $Enums.MovementType
    icon?: string | null
    color: string
    userId?: string | null
    createdAt?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumMovementTypeFieldUpdateOperationsInput | $Enums.MovementType
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumMovementTypeFieldUpdateOperationsInput | $Enums.MovementType
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    type: $Enums.MovementType
    description?: string | null
    date: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTransactionsInput
    category: CategoryCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    type: $Enums.MovementType
    description?: string | null
    date: Date | string
    userId: string
    categoryId: string
    createdAt?: Date | string
  }

  export type TransactionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumMovementTypeFieldUpdateOperationsInput | $Enums.MovementType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput
    category?: CategoryUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumMovementTypeFieldUpdateOperationsInput | $Enums.MovementType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    type: $Enums.MovementType
    description?: string | null
    date: Date | string
    userId: string
    categoryId: string
    createdAt?: Date | string
  }

  export type TransactionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumMovementTypeFieldUpdateOperationsInput | $Enums.MovementType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumMovementTypeFieldUpdateOperationsInput | $Enums.MovementType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshSessionCreateInput = {
    id: string
    currentRefreshTokenId: string
    previousRefreshTokenId?: string | null
    currentIssuedAt: Date | string
    expiresAt: Date | string
    rotatedAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutRefreshSessionsInput
  }

  export type RefreshSessionUncheckedCreateInput = {
    id: string
    userId: string
    currentRefreshTokenId: string
    previousRefreshTokenId?: string | null
    currentIssuedAt: Date | string
    expiresAt: Date | string
    rotatedAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RefreshSessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    currentRefreshTokenId?: StringFieldUpdateOperationsInput | string
    previousRefreshTokenId?: NullableStringFieldUpdateOperationsInput | string | null
    currentIssuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rotatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutRefreshSessionsNestedInput
  }

  export type RefreshSessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    currentRefreshTokenId?: StringFieldUpdateOperationsInput | string
    previousRefreshTokenId?: NullableStringFieldUpdateOperationsInput | string | null
    currentIssuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rotatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshSessionCreateManyInput = {
    id: string
    userId: string
    currentRefreshTokenId: string
    previousRefreshTokenId?: string | null
    currentIssuedAt: Date | string
    expiresAt: Date | string
    rotatedAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RefreshSessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    currentRefreshTokenId?: StringFieldUpdateOperationsInput | string
    previousRefreshTokenId?: NullableStringFieldUpdateOperationsInput | string | null
    currentIssuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rotatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshSessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    currentRefreshTokenId?: StringFieldUpdateOperationsInput | string
    previousRefreshTokenId?: NullableStringFieldUpdateOperationsInput | string | null
    currentIssuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rotatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RateLimitBucketCreateInput = {
    key: string
    count: number
    windowStartedAt: Date | string
    expiresAt: Date | string
  }

  export type RateLimitBucketUncheckedCreateInput = {
    key: string
    count: number
    windowStartedAt: Date | string
    expiresAt: Date | string
  }

  export type RateLimitBucketUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    windowStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RateLimitBucketUncheckedUpdateInput = {
    key?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    windowStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RateLimitBucketCreateManyInput = {
    key: string
    count: number
    windowStartedAt: Date | string
    expiresAt: Date | string
  }

  export type RateLimitBucketUpdateManyMutationInput = {
    key?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    windowStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RateLimitBucketUncheckedUpdateManyInput = {
    key?: StringFieldUpdateOperationsInput | string
    count?: IntFieldUpdateOperationsInput | number
    windowStartedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type EnumAuthMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthMethod | EnumAuthMethodFieldRefInput<$PrismaModel>
    in?: $Enums.AuthMethod[] | ListEnumAuthMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthMethod[] | ListEnumAuthMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthMethodFilter<$PrismaModel> | $Enums.AuthMethod
  }

  export type EnumCurrencyCodeFilter<$PrismaModel = never> = {
    equals?: $Enums.CurrencyCode | EnumCurrencyCodeFieldRefInput<$PrismaModel>
    in?: $Enums.CurrencyCode[] | ListEnumCurrencyCodeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CurrencyCode[] | ListEnumCurrencyCodeFieldRefInput<$PrismaModel>
    not?: NestedEnumCurrencyCodeFilter<$PrismaModel> | $Enums.CurrencyCode
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type CategoryListRelationFilter = {
    every?: CategoryWhereInput
    some?: CategoryWhereInput
    none?: CategoryWhereInput
  }

  export type TransactionListRelationFilter = {
    every?: TransactionWhereInput
    some?: TransactionWhereInput
    none?: TransactionWhereInput
  }

  export type RefreshSessionListRelationFilter = {
    every?: RefreshSessionWhereInput
    some?: RefreshSessionWhereInput
    none?: RefreshSessionWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type CategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type TransactionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type RefreshSessionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    hashedPassword?: SortOrder
    username?: SortOrder
    metodoAutenticacion?: SortOrder
    avatarUrl?: SortOrder
    googleId?: SortOrder
    currency?: SortOrder
    tokenVersion?: SortOrder
    createdAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    tokenVersion?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    hashedPassword?: SortOrder
    username?: SortOrder
    metodoAutenticacion?: SortOrder
    avatarUrl?: SortOrder
    googleId?: SortOrder
    currency?: SortOrder
    tokenVersion?: SortOrder
    createdAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    hashedPassword?: SortOrder
    username?: SortOrder
    metodoAutenticacion?: SortOrder
    avatarUrl?: SortOrder
    googleId?: SortOrder
    currency?: SortOrder
    tokenVersion?: SortOrder
    createdAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    tokenVersion?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type EnumAuthMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthMethod | EnumAuthMethodFieldRefInput<$PrismaModel>
    in?: $Enums.AuthMethod[] | ListEnumAuthMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthMethod[] | ListEnumAuthMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthMethodWithAggregatesFilter<$PrismaModel> | $Enums.AuthMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuthMethodFilter<$PrismaModel>
    _max?: NestedEnumAuthMethodFilter<$PrismaModel>
  }

  export type EnumCurrencyCodeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CurrencyCode | EnumCurrencyCodeFieldRefInput<$PrismaModel>
    in?: $Enums.CurrencyCode[] | ListEnumCurrencyCodeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CurrencyCode[] | ListEnumCurrencyCodeFieldRefInput<$PrismaModel>
    not?: NestedEnumCurrencyCodeWithAggregatesFilter<$PrismaModel> | $Enums.CurrencyCode
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCurrencyCodeFilter<$PrismaModel>
    _max?: NestedEnumCurrencyCodeFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type JsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonFilterBase<$PrismaModel>>, 'path'>>

  export type JsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type ExchangeRateCacheCountOrderByAggregateInput = {
    id?: SortOrder
    rates?: SortOrder
    fetchedAt?: SortOrder
    nextRefreshAt?: SortOrder
  }

  export type ExchangeRateCacheMaxOrderByAggregateInput = {
    id?: SortOrder
    fetchedAt?: SortOrder
    nextRefreshAt?: SortOrder
  }

  export type ExchangeRateCacheMinOrderByAggregateInput = {
    id?: SortOrder
    fetchedAt?: SortOrder
    nextRefreshAt?: SortOrder
  }
  export type JsonWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedJsonFilter<$PrismaModel>
    _max?: NestedJsonFilter<$PrismaModel>
  }

  export type EnumMovementTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MovementType | EnumMovementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MovementType[] | ListEnumMovementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MovementType[] | ListEnumMovementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMovementTypeFilter<$PrismaModel> | $Enums.MovementType
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    icon?: SortOrder
    color?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    icon?: SortOrder
    color?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    type?: SortOrder
    icon?: SortOrder
    color?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumMovementTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MovementType | EnumMovementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MovementType[] | ListEnumMovementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MovementType[] | ListEnumMovementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMovementTypeWithAggregatesFilter<$PrismaModel> | $Enums.MovementType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMovementTypeFilter<$PrismaModel>
    _max?: NestedEnumMovementTypeFilter<$PrismaModel>
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type CategoryScalarRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type TransactionCountOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    description?: SortOrder
    date?: SortOrder
    userId?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionAvgOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type TransactionMaxOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    description?: SortOrder
    date?: SortOrder
    userId?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionMinOrderByAggregateInput = {
    id?: SortOrder
    amount?: SortOrder
    type?: SortOrder
    description?: SortOrder
    date?: SortOrder
    userId?: SortOrder
    categoryId?: SortOrder
    createdAt?: SortOrder
  }

  export type TransactionSumOrderByAggregateInput = {
    amount?: SortOrder
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type RefreshSessionCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    currentRefreshTokenId?: SortOrder
    previousRefreshTokenId?: SortOrder
    currentIssuedAt?: SortOrder
    expiresAt?: SortOrder
    rotatedAt?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshSessionMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    currentRefreshTokenId?: SortOrder
    previousRefreshTokenId?: SortOrder
    currentIssuedAt?: SortOrder
    expiresAt?: SortOrder
    rotatedAt?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type RefreshSessionMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    currentRefreshTokenId?: SortOrder
    previousRefreshTokenId?: SortOrder
    currentIssuedAt?: SortOrder
    expiresAt?: SortOrder
    rotatedAt?: SortOrder
    revokedAt?: SortOrder
    createdAt?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type RateLimitBucketCountOrderByAggregateInput = {
    key?: SortOrder
    count?: SortOrder
    windowStartedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type RateLimitBucketAvgOrderByAggregateInput = {
    count?: SortOrder
  }

  export type RateLimitBucketMaxOrderByAggregateInput = {
    key?: SortOrder
    count?: SortOrder
    windowStartedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type RateLimitBucketMinOrderByAggregateInput = {
    key?: SortOrder
    count?: SortOrder
    windowStartedAt?: SortOrder
    expiresAt?: SortOrder
  }

  export type RateLimitBucketSumOrderByAggregateInput = {
    count?: SortOrder
  }

  export type CategoryCreateNestedManyWithoutUserInput = {
    create?: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput> | CategoryCreateWithoutUserInput[] | CategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutUserInput | CategoryCreateOrConnectWithoutUserInput[]
    createMany?: CategoryCreateManyUserInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type TransactionCreateNestedManyWithoutUserInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type RefreshSessionCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshSessionCreateWithoutUserInput, RefreshSessionUncheckedCreateWithoutUserInput> | RefreshSessionCreateWithoutUserInput[] | RefreshSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshSessionCreateOrConnectWithoutUserInput | RefreshSessionCreateOrConnectWithoutUserInput[]
    createMany?: RefreshSessionCreateManyUserInputEnvelope
    connect?: RefreshSessionWhereUniqueInput | RefreshSessionWhereUniqueInput[]
  }

  export type CategoryUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput> | CategoryCreateWithoutUserInput[] | CategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutUserInput | CategoryCreateOrConnectWithoutUserInput[]
    createMany?: CategoryCreateManyUserInputEnvelope
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type RefreshSessionUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<RefreshSessionCreateWithoutUserInput, RefreshSessionUncheckedCreateWithoutUserInput> | RefreshSessionCreateWithoutUserInput[] | RefreshSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshSessionCreateOrConnectWithoutUserInput | RefreshSessionCreateOrConnectWithoutUserInput[]
    createMany?: RefreshSessionCreateManyUserInputEnvelope
    connect?: RefreshSessionWhereUniqueInput | RefreshSessionWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type EnumAuthMethodFieldUpdateOperationsInput = {
    set?: $Enums.AuthMethod
  }

  export type EnumCurrencyCodeFieldUpdateOperationsInput = {
    set?: $Enums.CurrencyCode
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type CategoryUpdateManyWithoutUserNestedInput = {
    create?: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput> | CategoryCreateWithoutUserInput[] | CategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutUserInput | CategoryCreateOrConnectWithoutUserInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutUserInput | CategoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CategoryCreateManyUserInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutUserInput | CategoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutUserInput | CategoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type TransactionUpdateManyWithoutUserNestedInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutUserInput | TransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutUserInput | TransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutUserInput | TransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type RefreshSessionUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshSessionCreateWithoutUserInput, RefreshSessionUncheckedCreateWithoutUserInput> | RefreshSessionCreateWithoutUserInput[] | RefreshSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshSessionCreateOrConnectWithoutUserInput | RefreshSessionCreateOrConnectWithoutUserInput[]
    upsert?: RefreshSessionUpsertWithWhereUniqueWithoutUserInput | RefreshSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshSessionCreateManyUserInputEnvelope
    set?: RefreshSessionWhereUniqueInput | RefreshSessionWhereUniqueInput[]
    disconnect?: RefreshSessionWhereUniqueInput | RefreshSessionWhereUniqueInput[]
    delete?: RefreshSessionWhereUniqueInput | RefreshSessionWhereUniqueInput[]
    connect?: RefreshSessionWhereUniqueInput | RefreshSessionWhereUniqueInput[]
    update?: RefreshSessionUpdateWithWhereUniqueWithoutUserInput | RefreshSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshSessionUpdateManyWithWhereWithoutUserInput | RefreshSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshSessionScalarWhereInput | RefreshSessionScalarWhereInput[]
  }

  export type CategoryUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput> | CategoryCreateWithoutUserInput[] | CategoryUncheckedCreateWithoutUserInput[]
    connectOrCreate?: CategoryCreateOrConnectWithoutUserInput | CategoryCreateOrConnectWithoutUserInput[]
    upsert?: CategoryUpsertWithWhereUniqueWithoutUserInput | CategoryUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: CategoryCreateManyUserInputEnvelope
    set?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    disconnect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    delete?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    connect?: CategoryWhereUniqueInput | CategoryWhereUniqueInput[]
    update?: CategoryUpdateWithWhereUniqueWithoutUserInput | CategoryUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: CategoryUpdateManyWithWhereWithoutUserInput | CategoryUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput> | TransactionCreateWithoutUserInput[] | TransactionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutUserInput | TransactionCreateOrConnectWithoutUserInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutUserInput | TransactionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: TransactionCreateManyUserInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutUserInput | TransactionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutUserInput | TransactionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type RefreshSessionUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<RefreshSessionCreateWithoutUserInput, RefreshSessionUncheckedCreateWithoutUserInput> | RefreshSessionCreateWithoutUserInput[] | RefreshSessionUncheckedCreateWithoutUserInput[]
    connectOrCreate?: RefreshSessionCreateOrConnectWithoutUserInput | RefreshSessionCreateOrConnectWithoutUserInput[]
    upsert?: RefreshSessionUpsertWithWhereUniqueWithoutUserInput | RefreshSessionUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: RefreshSessionCreateManyUserInputEnvelope
    set?: RefreshSessionWhereUniqueInput | RefreshSessionWhereUniqueInput[]
    disconnect?: RefreshSessionWhereUniqueInput | RefreshSessionWhereUniqueInput[]
    delete?: RefreshSessionWhereUniqueInput | RefreshSessionWhereUniqueInput[]
    connect?: RefreshSessionWhereUniqueInput | RefreshSessionWhereUniqueInput[]
    update?: RefreshSessionUpdateWithWhereUniqueWithoutUserInput | RefreshSessionUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: RefreshSessionUpdateManyWithWhereWithoutUserInput | RefreshSessionUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: RefreshSessionScalarWhereInput | RefreshSessionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<UserCreateWithoutCategoriesInput, UserUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCategoriesInput
    connect?: UserWhereUniqueInput
  }

  export type TransactionCreateNestedManyWithoutCategoryInput = {
    create?: XOR<TransactionCreateWithoutCategoryInput, TransactionUncheckedCreateWithoutCategoryInput> | TransactionCreateWithoutCategoryInput[] | TransactionUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutCategoryInput | TransactionCreateOrConnectWithoutCategoryInput[]
    createMany?: TransactionCreateManyCategoryInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type TransactionUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<TransactionCreateWithoutCategoryInput, TransactionUncheckedCreateWithoutCategoryInput> | TransactionCreateWithoutCategoryInput[] | TransactionUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutCategoryInput | TransactionCreateOrConnectWithoutCategoryInput[]
    createMany?: TransactionCreateManyCategoryInputEnvelope
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
  }

  export type EnumMovementTypeFieldUpdateOperationsInput = {
    set?: $Enums.MovementType
  }

  export type UserUpdateOneWithoutCategoriesNestedInput = {
    create?: XOR<UserCreateWithoutCategoriesInput, UserUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: UserCreateOrConnectWithoutCategoriesInput
    upsert?: UserUpsertWithoutCategoriesInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutCategoriesInput, UserUpdateWithoutCategoriesInput>, UserUncheckedUpdateWithoutCategoriesInput>
  }

  export type TransactionUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<TransactionCreateWithoutCategoryInput, TransactionUncheckedCreateWithoutCategoryInput> | TransactionCreateWithoutCategoryInput[] | TransactionUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutCategoryInput | TransactionCreateOrConnectWithoutCategoryInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutCategoryInput | TransactionUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: TransactionCreateManyCategoryInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutCategoryInput | TransactionUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutCategoryInput | TransactionUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type TransactionUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<TransactionCreateWithoutCategoryInput, TransactionUncheckedCreateWithoutCategoryInput> | TransactionCreateWithoutCategoryInput[] | TransactionUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: TransactionCreateOrConnectWithoutCategoryInput | TransactionCreateOrConnectWithoutCategoryInput[]
    upsert?: TransactionUpsertWithWhereUniqueWithoutCategoryInput | TransactionUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: TransactionCreateManyCategoryInputEnvelope
    set?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    disconnect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    delete?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    connect?: TransactionWhereUniqueInput | TransactionWhereUniqueInput[]
    update?: TransactionUpdateWithWhereUniqueWithoutCategoryInput | TransactionUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: TransactionUpdateManyWithWhereWithoutCategoryInput | TransactionUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    connect?: UserWhereUniqueInput
  }

  export type CategoryCreateNestedOneWithoutTransactionsInput = {
    create?: XOR<CategoryCreateWithoutTransactionsInput, CategoryUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutTransactionsInput
    connect?: CategoryWhereUniqueInput
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type UserUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTransactionsInput
    upsert?: UserUpsertWithoutTransactionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTransactionsInput, UserUpdateWithoutTransactionsInput>, UserUncheckedUpdateWithoutTransactionsInput>
  }

  export type CategoryUpdateOneRequiredWithoutTransactionsNestedInput = {
    create?: XOR<CategoryCreateWithoutTransactionsInput, CategoryUncheckedCreateWithoutTransactionsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutTransactionsInput
    upsert?: CategoryUpsertWithoutTransactionsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutTransactionsInput, CategoryUpdateWithoutTransactionsInput>, CategoryUncheckedUpdateWithoutTransactionsInput>
  }

  export type UserCreateNestedOneWithoutRefreshSessionsInput = {
    create?: XOR<UserCreateWithoutRefreshSessionsInput, UserUncheckedCreateWithoutRefreshSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshSessionsInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutRefreshSessionsNestedInput = {
    create?: XOR<UserCreateWithoutRefreshSessionsInput, UserUncheckedCreateWithoutRefreshSessionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutRefreshSessionsInput
    upsert?: UserUpsertWithoutRefreshSessionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutRefreshSessionsInput, UserUpdateWithoutRefreshSessionsInput>, UserUncheckedUpdateWithoutRefreshSessionsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumAuthMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthMethod | EnumAuthMethodFieldRefInput<$PrismaModel>
    in?: $Enums.AuthMethod[] | ListEnumAuthMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthMethod[] | ListEnumAuthMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthMethodFilter<$PrismaModel> | $Enums.AuthMethod
  }

  export type NestedEnumCurrencyCodeFilter<$PrismaModel = never> = {
    equals?: $Enums.CurrencyCode | EnumCurrencyCodeFieldRefInput<$PrismaModel>
    in?: $Enums.CurrencyCode[] | ListEnumCurrencyCodeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CurrencyCode[] | ListEnumCurrencyCodeFieldRefInput<$PrismaModel>
    not?: NestedEnumCurrencyCodeFilter<$PrismaModel> | $Enums.CurrencyCode
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumAuthMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AuthMethod | EnumAuthMethodFieldRefInput<$PrismaModel>
    in?: $Enums.AuthMethod[] | ListEnumAuthMethodFieldRefInput<$PrismaModel>
    notIn?: $Enums.AuthMethod[] | ListEnumAuthMethodFieldRefInput<$PrismaModel>
    not?: NestedEnumAuthMethodWithAggregatesFilter<$PrismaModel> | $Enums.AuthMethod
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAuthMethodFilter<$PrismaModel>
    _max?: NestedEnumAuthMethodFilter<$PrismaModel>
  }

  export type NestedEnumCurrencyCodeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.CurrencyCode | EnumCurrencyCodeFieldRefInput<$PrismaModel>
    in?: $Enums.CurrencyCode[] | ListEnumCurrencyCodeFieldRefInput<$PrismaModel>
    notIn?: $Enums.CurrencyCode[] | ListEnumCurrencyCodeFieldRefInput<$PrismaModel>
    not?: NestedEnumCurrencyCodeWithAggregatesFilter<$PrismaModel> | $Enums.CurrencyCode
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumCurrencyCodeFilter<$PrismaModel>
    _max?: NestedEnumCurrencyCodeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }
  export type NestedJsonFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string[]
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    lte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gt?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    gte?: InputJsonValue | JsonFieldRefInput<$PrismaModel>
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedEnumMovementTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MovementType | EnumMovementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MovementType[] | ListEnumMovementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MovementType[] | ListEnumMovementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMovementTypeFilter<$PrismaModel> | $Enums.MovementType
  }

  export type NestedEnumMovementTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MovementType | EnumMovementTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MovementType[] | ListEnumMovementTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MovementType[] | ListEnumMovementTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMovementTypeWithAggregatesFilter<$PrismaModel> | $Enums.MovementType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMovementTypeFilter<$PrismaModel>
    _max?: NestedEnumMovementTypeFilter<$PrismaModel>
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | ListDecimalFieldRefInput<$PrismaModel>
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type CategoryCreateWithoutUserInput = {
    id?: string
    name: string
    type: $Enums.MovementType
    icon?: string | null
    color: string
    createdAt?: Date | string
    transactions?: TransactionCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutUserInput = {
    id?: string
    name: string
    type: $Enums.MovementType
    icon?: string | null
    color: string
    createdAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutUserInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput>
  }

  export type CategoryCreateManyUserInputEnvelope = {
    data: CategoryCreateManyUserInput | CategoryCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type TransactionCreateWithoutUserInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    type: $Enums.MovementType
    description?: string | null
    date: Date | string
    createdAt?: Date | string
    category: CategoryCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutUserInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    type: $Enums.MovementType
    description?: string | null
    date: Date | string
    categoryId: string
    createdAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutUserInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput>
  }

  export type TransactionCreateManyUserInputEnvelope = {
    data: TransactionCreateManyUserInput | TransactionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type RefreshSessionCreateWithoutUserInput = {
    id: string
    currentRefreshTokenId: string
    previousRefreshTokenId?: string | null
    currentIssuedAt: Date | string
    expiresAt: Date | string
    rotatedAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RefreshSessionUncheckedCreateWithoutUserInput = {
    id: string
    currentRefreshTokenId: string
    previousRefreshTokenId?: string | null
    currentIssuedAt: Date | string
    expiresAt: Date | string
    rotatedAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type RefreshSessionCreateOrConnectWithoutUserInput = {
    where: RefreshSessionWhereUniqueInput
    create: XOR<RefreshSessionCreateWithoutUserInput, RefreshSessionUncheckedCreateWithoutUserInput>
  }

  export type RefreshSessionCreateManyUserInputEnvelope = {
    data: RefreshSessionCreateManyUserInput | RefreshSessionCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type CategoryUpsertWithWhereUniqueWithoutUserInput = {
    where: CategoryWhereUniqueInput
    update: XOR<CategoryUpdateWithoutUserInput, CategoryUncheckedUpdateWithoutUserInput>
    create: XOR<CategoryCreateWithoutUserInput, CategoryUncheckedCreateWithoutUserInput>
  }

  export type CategoryUpdateWithWhereUniqueWithoutUserInput = {
    where: CategoryWhereUniqueInput
    data: XOR<CategoryUpdateWithoutUserInput, CategoryUncheckedUpdateWithoutUserInput>
  }

  export type CategoryUpdateManyWithWhereWithoutUserInput = {
    where: CategoryScalarWhereInput
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyWithoutUserInput>
  }

  export type CategoryScalarWhereInput = {
    AND?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    OR?: CategoryScalarWhereInput[]
    NOT?: CategoryScalarWhereInput | CategoryScalarWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    type?: EnumMovementTypeFilter<"Category"> | $Enums.MovementType
    icon?: StringNullableFilter<"Category"> | string | null
    color?: StringFilter<"Category"> | string
    userId?: StringNullableFilter<"Category"> | string | null
    createdAt?: DateTimeFilter<"Category"> | Date | string
  }

  export type TransactionUpsertWithWhereUniqueWithoutUserInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutUserInput, TransactionUncheckedUpdateWithoutUserInput>
    create: XOR<TransactionCreateWithoutUserInput, TransactionUncheckedCreateWithoutUserInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutUserInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutUserInput, TransactionUncheckedUpdateWithoutUserInput>
  }

  export type TransactionUpdateManyWithWhereWithoutUserInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutUserInput>
  }

  export type TransactionScalarWhereInput = {
    AND?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    OR?: TransactionScalarWhereInput[]
    NOT?: TransactionScalarWhereInput | TransactionScalarWhereInput[]
    id?: StringFilter<"Transaction"> | string
    amount?: DecimalFilter<"Transaction"> | Decimal | DecimalJsLike | number | string
    type?: EnumMovementTypeFilter<"Transaction"> | $Enums.MovementType
    description?: StringNullableFilter<"Transaction"> | string | null
    date?: DateTimeFilter<"Transaction"> | Date | string
    userId?: StringFilter<"Transaction"> | string
    categoryId?: StringFilter<"Transaction"> | string
    createdAt?: DateTimeFilter<"Transaction"> | Date | string
  }

  export type RefreshSessionUpsertWithWhereUniqueWithoutUserInput = {
    where: RefreshSessionWhereUniqueInput
    update: XOR<RefreshSessionUpdateWithoutUserInput, RefreshSessionUncheckedUpdateWithoutUserInput>
    create: XOR<RefreshSessionCreateWithoutUserInput, RefreshSessionUncheckedCreateWithoutUserInput>
  }

  export type RefreshSessionUpdateWithWhereUniqueWithoutUserInput = {
    where: RefreshSessionWhereUniqueInput
    data: XOR<RefreshSessionUpdateWithoutUserInput, RefreshSessionUncheckedUpdateWithoutUserInput>
  }

  export type RefreshSessionUpdateManyWithWhereWithoutUserInput = {
    where: RefreshSessionScalarWhereInput
    data: XOR<RefreshSessionUpdateManyMutationInput, RefreshSessionUncheckedUpdateManyWithoutUserInput>
  }

  export type RefreshSessionScalarWhereInput = {
    AND?: RefreshSessionScalarWhereInput | RefreshSessionScalarWhereInput[]
    OR?: RefreshSessionScalarWhereInput[]
    NOT?: RefreshSessionScalarWhereInput | RefreshSessionScalarWhereInput[]
    id?: StringFilter<"RefreshSession"> | string
    userId?: StringFilter<"RefreshSession"> | string
    currentRefreshTokenId?: StringFilter<"RefreshSession"> | string
    previousRefreshTokenId?: StringNullableFilter<"RefreshSession"> | string | null
    currentIssuedAt?: DateTimeFilter<"RefreshSession"> | Date | string
    expiresAt?: DateTimeFilter<"RefreshSession"> | Date | string
    rotatedAt?: DateTimeNullableFilter<"RefreshSession"> | Date | string | null
    revokedAt?: DateTimeNullableFilter<"RefreshSession"> | Date | string | null
    createdAt?: DateTimeFilter<"RefreshSession"> | Date | string
  }

  export type UserCreateWithoutCategoriesInput = {
    id?: string
    email: string
    hashedPassword?: string | null
    username: string
    metodoAutenticacion?: $Enums.AuthMethod
    avatarUrl?: string | null
    googleId?: string | null
    currency?: $Enums.CurrencyCode
    tokenVersion?: number
    createdAt?: Date | string
    transactions?: TransactionCreateNestedManyWithoutUserInput
    refreshSessions?: RefreshSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutCategoriesInput = {
    id?: string
    email: string
    hashedPassword?: string | null
    username: string
    metodoAutenticacion?: $Enums.AuthMethod
    avatarUrl?: string | null
    googleId?: string | null
    currency?: $Enums.CurrencyCode
    tokenVersion?: number
    createdAt?: Date | string
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
    refreshSessions?: RefreshSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutCategoriesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutCategoriesInput, UserUncheckedCreateWithoutCategoriesInput>
  }

  export type TransactionCreateWithoutCategoryInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    type: $Enums.MovementType
    description?: string | null
    date: Date | string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutTransactionsInput
  }

  export type TransactionUncheckedCreateWithoutCategoryInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    type: $Enums.MovementType
    description?: string | null
    date: Date | string
    userId: string
    createdAt?: Date | string
  }

  export type TransactionCreateOrConnectWithoutCategoryInput = {
    where: TransactionWhereUniqueInput
    create: XOR<TransactionCreateWithoutCategoryInput, TransactionUncheckedCreateWithoutCategoryInput>
  }

  export type TransactionCreateManyCategoryInputEnvelope = {
    data: TransactionCreateManyCategoryInput | TransactionCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutCategoriesInput = {
    update: XOR<UserUpdateWithoutCategoriesInput, UserUncheckedUpdateWithoutCategoriesInput>
    create: XOR<UserCreateWithoutCategoriesInput, UserUncheckedCreateWithoutCategoriesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutCategoriesInput, UserUncheckedUpdateWithoutCategoriesInput>
  }

  export type UserUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    metodoAutenticacion?: EnumAuthMethodFieldUpdateOperationsInput | $Enums.AuthMethod
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: EnumCurrencyCodeFieldUpdateOperationsInput | $Enums.CurrencyCode
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUpdateManyWithoutUserNestedInput
    refreshSessions?: RefreshSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    metodoAutenticacion?: EnumAuthMethodFieldUpdateOperationsInput | $Enums.AuthMethod
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: EnumCurrencyCodeFieldUpdateOperationsInput | $Enums.CurrencyCode
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
    refreshSessions?: RefreshSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type TransactionUpsertWithWhereUniqueWithoutCategoryInput = {
    where: TransactionWhereUniqueInput
    update: XOR<TransactionUpdateWithoutCategoryInput, TransactionUncheckedUpdateWithoutCategoryInput>
    create: XOR<TransactionCreateWithoutCategoryInput, TransactionUncheckedCreateWithoutCategoryInput>
  }

  export type TransactionUpdateWithWhereUniqueWithoutCategoryInput = {
    where: TransactionWhereUniqueInput
    data: XOR<TransactionUpdateWithoutCategoryInput, TransactionUncheckedUpdateWithoutCategoryInput>
  }

  export type TransactionUpdateManyWithWhereWithoutCategoryInput = {
    where: TransactionScalarWhereInput
    data: XOR<TransactionUpdateManyMutationInput, TransactionUncheckedUpdateManyWithoutCategoryInput>
  }

  export type UserCreateWithoutTransactionsInput = {
    id?: string
    email: string
    hashedPassword?: string | null
    username: string
    metodoAutenticacion?: $Enums.AuthMethod
    avatarUrl?: string | null
    googleId?: string | null
    currency?: $Enums.CurrencyCode
    tokenVersion?: number
    createdAt?: Date | string
    categories?: CategoryCreateNestedManyWithoutUserInput
    refreshSessions?: RefreshSessionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTransactionsInput = {
    id?: string
    email: string
    hashedPassword?: string | null
    username: string
    metodoAutenticacion?: $Enums.AuthMethod
    avatarUrl?: string | null
    googleId?: string | null
    currency?: $Enums.CurrencyCode
    tokenVersion?: number
    createdAt?: Date | string
    categories?: CategoryUncheckedCreateNestedManyWithoutUserInput
    refreshSessions?: RefreshSessionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTransactionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
  }

  export type CategoryCreateWithoutTransactionsInput = {
    id?: string
    name: string
    type: $Enums.MovementType
    icon?: string | null
    color: string
    createdAt?: Date | string
    user?: UserCreateNestedOneWithoutCategoriesInput
  }

  export type CategoryUncheckedCreateWithoutTransactionsInput = {
    id?: string
    name: string
    type: $Enums.MovementType
    icon?: string | null
    color: string
    userId?: string | null
    createdAt?: Date | string
  }

  export type CategoryCreateOrConnectWithoutTransactionsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutTransactionsInput, CategoryUncheckedCreateWithoutTransactionsInput>
  }

  export type UserUpsertWithoutTransactionsInput = {
    update: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
    create: XOR<UserCreateWithoutTransactionsInput, UserUncheckedCreateWithoutTransactionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTransactionsInput, UserUncheckedUpdateWithoutTransactionsInput>
  }

  export type UserUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    metodoAutenticacion?: EnumAuthMethodFieldUpdateOperationsInput | $Enums.AuthMethod
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: EnumCurrencyCodeFieldUpdateOperationsInput | $Enums.CurrencyCode
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: CategoryUpdateManyWithoutUserNestedInput
    refreshSessions?: RefreshSessionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    metodoAutenticacion?: EnumAuthMethodFieldUpdateOperationsInput | $Enums.AuthMethod
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: EnumCurrencyCodeFieldUpdateOperationsInput | $Enums.CurrencyCode
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: CategoryUncheckedUpdateManyWithoutUserNestedInput
    refreshSessions?: RefreshSessionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CategoryUpsertWithoutTransactionsInput = {
    update: XOR<CategoryUpdateWithoutTransactionsInput, CategoryUncheckedUpdateWithoutTransactionsInput>
    create: XOR<CategoryCreateWithoutTransactionsInput, CategoryUncheckedCreateWithoutTransactionsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutTransactionsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutTransactionsInput, CategoryUncheckedUpdateWithoutTransactionsInput>
  }

  export type CategoryUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumMovementTypeFieldUpdateOperationsInput | $Enums.MovementType
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutCategoriesNestedInput
  }

  export type CategoryUncheckedUpdateWithoutTransactionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumMovementTypeFieldUpdateOperationsInput | $Enums.MovementType
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: StringFieldUpdateOperationsInput | string
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutRefreshSessionsInput = {
    id?: string
    email: string
    hashedPassword?: string | null
    username: string
    metodoAutenticacion?: $Enums.AuthMethod
    avatarUrl?: string | null
    googleId?: string | null
    currency?: $Enums.CurrencyCode
    tokenVersion?: number
    createdAt?: Date | string
    categories?: CategoryCreateNestedManyWithoutUserInput
    transactions?: TransactionCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateWithoutRefreshSessionsInput = {
    id?: string
    email: string
    hashedPassword?: string | null
    username: string
    metodoAutenticacion?: $Enums.AuthMethod
    avatarUrl?: string | null
    googleId?: string | null
    currency?: $Enums.CurrencyCode
    tokenVersion?: number
    createdAt?: Date | string
    categories?: CategoryUncheckedCreateNestedManyWithoutUserInput
    transactions?: TransactionUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserCreateOrConnectWithoutRefreshSessionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutRefreshSessionsInput, UserUncheckedCreateWithoutRefreshSessionsInput>
  }

  export type UserUpsertWithoutRefreshSessionsInput = {
    update: XOR<UserUpdateWithoutRefreshSessionsInput, UserUncheckedUpdateWithoutRefreshSessionsInput>
    create: XOR<UserCreateWithoutRefreshSessionsInput, UserUncheckedCreateWithoutRefreshSessionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutRefreshSessionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutRefreshSessionsInput, UserUncheckedUpdateWithoutRefreshSessionsInput>
  }

  export type UserUpdateWithoutRefreshSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    metodoAutenticacion?: EnumAuthMethodFieldUpdateOperationsInput | $Enums.AuthMethod
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: EnumCurrencyCodeFieldUpdateOperationsInput | $Enums.CurrencyCode
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: CategoryUpdateManyWithoutUserNestedInput
    transactions?: TransactionUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutRefreshSessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    hashedPassword?: NullableStringFieldUpdateOperationsInput | string | null
    username?: StringFieldUpdateOperationsInput | string
    metodoAutenticacion?: EnumAuthMethodFieldUpdateOperationsInput | $Enums.AuthMethod
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    googleId?: NullableStringFieldUpdateOperationsInput | string | null
    currency?: EnumCurrencyCodeFieldUpdateOperationsInput | $Enums.CurrencyCode
    tokenVersion?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: CategoryUncheckedUpdateManyWithoutUserNestedInput
    transactions?: TransactionUncheckedUpdateManyWithoutUserNestedInput
  }

  export type CategoryCreateManyUserInput = {
    id?: string
    name: string
    type: $Enums.MovementType
    icon?: string | null
    color: string
    createdAt?: Date | string
  }

  export type TransactionCreateManyUserInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    type: $Enums.MovementType
    description?: string | null
    date: Date | string
    categoryId: string
    createdAt?: Date | string
  }

  export type RefreshSessionCreateManyUserInput = {
    id: string
    currentRefreshTokenId: string
    previousRefreshTokenId?: string | null
    currentIssuedAt: Date | string
    expiresAt: Date | string
    rotatedAt?: Date | string | null
    revokedAt?: Date | string | null
    createdAt?: Date | string
  }

  export type CategoryUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumMovementTypeFieldUpdateOperationsInput | $Enums.MovementType
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumMovementTypeFieldUpdateOperationsInput | $Enums.MovementType
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    transactions?: TransactionUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    type?: EnumMovementTypeFieldUpdateOperationsInput | $Enums.MovementType
    icon?: NullableStringFieldUpdateOperationsInput | string | null
    color?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumMovementTypeFieldUpdateOperationsInput | $Enums.MovementType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumMovementTypeFieldUpdateOperationsInput | $Enums.MovementType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumMovementTypeFieldUpdateOperationsInput | $Enums.MovementType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    categoryId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshSessionUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    currentRefreshTokenId?: StringFieldUpdateOperationsInput | string
    previousRefreshTokenId?: NullableStringFieldUpdateOperationsInput | string | null
    currentIssuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rotatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshSessionUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    currentRefreshTokenId?: StringFieldUpdateOperationsInput | string
    previousRefreshTokenId?: NullableStringFieldUpdateOperationsInput | string | null
    currentIssuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rotatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type RefreshSessionUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    currentRefreshTokenId?: StringFieldUpdateOperationsInput | string
    previousRefreshTokenId?: NullableStringFieldUpdateOperationsInput | string | null
    currentIssuedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    rotatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    revokedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionCreateManyCategoryInput = {
    id?: string
    amount: Decimal | DecimalJsLike | number | string
    type: $Enums.MovementType
    description?: string | null
    date: Date | string
    userId: string
    createdAt?: Date | string
  }

  export type TransactionUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumMovementTypeFieldUpdateOperationsInput | $Enums.MovementType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutTransactionsNestedInput
  }

  export type TransactionUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumMovementTypeFieldUpdateOperationsInput | $Enums.MovementType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TransactionUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    amount?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    type?: EnumMovementTypeFieldUpdateOperationsInput | $Enums.MovementType
    description?: NullableStringFieldUpdateOperationsInput | string | null
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}