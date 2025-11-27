

// Exercise 1 – Pick only some keys(like built -in `Pick`)


type MyPick<T, K extends keyof T> = TODO;

type User = { id: number; name: string; email: string };
type IdAndName = MyPick<User, "id" | "name">;
// → { id: number; name: string }




// Exercise 2 – Omit some keys(like built -in `Omit`)


type MyOmit<T, K extends keyof T> = TODO;

type User = { id: number; name: string; password: string };
type SafeUser = MyOmit<User, "password">;
// → { id: number; name: string }




// Exercise 3 – Change all property types to`string`


type Stringify<T> = TODO;

type Point = { x: number; y: number; z: boolean };
type StringPoint = Stringify<Point>;
// → { x: string; y: string; z: string }




// Exercise 4 – Wrap every value in an array


type WrapInArray<T> = TODO;

type Data = { name: string; count: number };
type Wrapped = WrapInArray<Data>;
// → { name: string[]; count: number[] }


