

// Exercise 1 – Pick only some keys(like built -in `Pick`)


type MyPick<T, K extends keyof T> = TODO;

type User = { id: number; name: string; email: string };
type IdAndName = MyPick<User, "id" | "name">;
// → { id: number; name: string }


// Solution:

type MyPick<T, K extends keyof T> = { [P in K]: T[P] };




// Exercise 2 – Omit some keys(like built -in `Omit`)


type MyOmit<T, K extends keyof T> = TODO;

type User = { id: number; name: string; password: string };
type SafeUser = MyOmit<User, "password">;
// → { id: number; name: string }


// Solution:

type MyOmit<T, K extends keyof any> = { [P in keyof T as P extends K ? never : P]: T[P] };
// or simpler (classic way):
type MyOmit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;




// Exercise 3 – Change all property types to`string`


type Stringify<T> = TODO;

type Point = { x: number; y: number; z: boolean };
type StringPoint = Stringify<Point>;
// → { x: string; y: string; z: string }


// Solution:

type Stringify<T> = { [K in keyof T]: string };




// Exercise 4 – Wrap every value in an array


type WrapInArray<T> = TODO;

type Data = { name: string; count: number };
type Wrapped = WrapInArray<Data>;
// → { name: string[]; count: number[] }


// Solution:

type WrapInArray<T> = { [K in keyof T]: T[K][] };



