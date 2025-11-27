
//  Exercise 1 – `IsString`(Basic Conditional Type)
// Task : Create a type `IsString<T>` that returns `true` if `T` is`string`, otherwise`false`.
// Solution

type IsString<T> = T extends string ? true : false;


//  Exercise 2 – `ArrayOf<T>`(Conditional + Generic)
// Task : Create `ArrayOf<T>` that returns `T[]` if `T` is not already an array, otherwise returns`T`.
// Solution

type ArrayOf<T> = T extends any[] ? T : T[];


//  Exercise 3 – `First<T>`(Basic`infer`)
// Task : Extract the first element of a tuple / array type.
// Solution

type First<T extends any[]> = T extends [infer First, ...any[]] ? First : never;


//  Exercise 4 – `Last<T>`(infer in tuple)
// Task : Get the ** last ** element of a tuple.
// Solution

type Last<T extends any[]> = T extends [...any[], infer L] ? L : never;


//  Exercise 5 – `ReturnType<T>`(Reimplement built -in)
// Task : Reimplement `ReturnType` using`infer`.
// Solution

type MyReturnType<T> = T extends (...args: any) => infer R ? R : never;


//  Exercise 6 – `Parameters<T>`(Reimplement)
// Task : Extract tuple of function parameters.
// Solution

type MyParameters<T extends (...args: any) => any> = 
  T extends (...args: infer P) => any ? P : never;


//  Exercise 7 – `UnpackPromise<T>`
// Task : Extract the type inside a Promise.

// Solution
type UnpackPromise<T> = T extends Promise<infer U> ? U : never;

