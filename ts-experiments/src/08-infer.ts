import { Expect, Equal } from "type-testing";

namespace infer_demo {
   
    type User = {
        role: string;
        name: string;
        /* ... other keys */
    };

    type GetRole<User> = User extends {
        name : string,
        role : infer Role
    } 
    ? Role 
    : never

    type T1 = GetRole<{name : "magesh", role : "admin"}>

    // deeply nested
    type Fn<A> = A extends { a : { b : { nested : {prop : infer P}}}}
    ? P
    : never

    type T2 = Fn<{a : { b : { nested : { prop : string}}}}>

    // tuples

    type Head<tuple> = tuple extends [infer first, ...any] ? first : never

    type T3 = Head<["a", 123, "true"]>
    type T4 = Head<[string, boolean, number]>

    type Tail<tuple> = tuple extends [...any, infer last] ? last : never
    type T5 = Tail<["a", 123, "true"]>
    type T6 = Tail<[string, boolean, number]>

    type HeadAndTail<tuple> = tuple extends [infer first, ...any, infer last] ? [first, last] : never
    type T7 = HeadAndTail<[string, boolean, number]>

    // function type declaration
    type AddFn = (x : number, y : number) => number

    type AddParams = Parameters<AddFn> 
    type T8 = Expect<Equal<AddParams, [x:number, y:number]>>

    // simulating builtin "Parameters" utility type
    type FuncParameters<T extends (...args : any) => any> = T extends (...args : infer P) => any ? P : never
    type T9 = FuncParameters<AddFn>

    // simulating builtin "ReturnType" utility type
    type FuncReturnType<T extends (...args :any ) => any> = T extends (...args : any) => infer R ? R : never;
    type T10 = FuncReturnType<AddFn>

    type ConcactFn = (s1 : string, s2 : string) => string
    type T11 = FuncReturnType<ConcactFn>


}