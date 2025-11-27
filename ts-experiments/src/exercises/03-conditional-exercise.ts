namespace conditional_exercise {
    
    // Exercise 1 – `IsString`(Basic Conditional Type)
    // Task : Create a type `IsString<T>` that returns `true` if `T` is`string`, otherwise`false`.


    type IsString<T> = TODO;

    type T1 = IsString<string>;     // true
    type T2 = IsString<number>;     // false
    type T3 = IsString<"hello">;    // true
    type T4 = IsString<any>;        // false


    // Exercise 2 – `ArrayOf<T>`(Conditional + Generic)
    // Task : Create `ArrayOf<T>` that returns `T[]` if `T` is not already an array, otherwise returns`T`.


    type ArrayOf<T> = TODO;

    type A1 = ArrayOf<string>;        // string[]
    type A2 = ArrayOf<number[]>;      // number[] (unchanged)
    type A3 = ArrayOf<never>;         // never[]


        



    // Exercise 3 – `First<T>`(Basic`infer`)
    // Task : Extract the first element of a tuple / array type.


    type First<T extends any[]> = TODO;

    type F1 = First<[string, number, boolean]>;  // string
    type F2 = First<[]>;                          // never
    type F3 = First<[undefined]>;                 // undefined


        



    // Exercise 4 – `Last<T>`(infer in tuple)
    // Task : Get the ** last ** element of a tuple.


    type Last<T extends any[]> = TODO;

    type L1 = Last<[1, 2, 3]>;        // 3
    type L2 = Last<["a"]>;            // "a"
    type L3 = Last<[]>;               // never


    // Exercise 5 – `ReturnType<T>`(Reimplement built -in)
    // Task : Reimplement `ReturnType` using`infer`.


    type MyReturnType<T> = TODO;

    type R1 = MyReturnType<() => string>;        // string
    type R2 = MyReturnType<() => Promise<number>>; // Promise<number>
    type R3 = MyReturnType<() => void>;          // void


        
    // Exercise 6 – `Parameters<T>`(Reimplement)
    // Task : Extract tuple of function parameters.


    type MyParameters<T> = TODO;

    type P1 = MyParameters<(a: string, b: number) => void>;  // [a: string, b: number]
    type P2 = MyParameters<() => boolean>;                  // []


    // Exercise 7 – `UnpackPromise<T>`
    // Task : Extract the type inside a Promise.


    type UnpackPromise<T> = TODO;

    type U1 = UnpackPromise<Promise<string>>;           // string
    type U2 = UnpackPromise<Promise<Promise<number>>>;  // Promise<number>
    type U3 = UnpackPromise<string>;                    // never

}

