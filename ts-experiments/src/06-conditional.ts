/* 
// Conditional types - Syntax
type TypeName = A extends B ? true : false
 */
// A extends B => Is A assignable to B

type a = "a"
type b = "b"

// type TorF = a extends "a" ? true : false
// type TorF = a extends string ? true : false
type TorF = a extends "a" | "b" | "c" ? "true" : "false"

type If<A extends boolean, B, C> = A extends true ? B : C;

type t1 = If<true, true, false>
type t2 = If<false, "sorry", "it works">

// nested conditions
type GetColor<I> = I extends 0 ? "white"
    : I extends 1 ? "blue" 
    : I extends 2 ? "red"
    : "green"

type c1 = GetColor<2>

type GetColor2<I extends 0 | 1 | 2 | 3> = {
    0 : "white",
    1 : "blue",
    2 : "red",
    3 : "green"
}[I]

type c2 = GetColor<2>

// Pattern Matching

/* 
type IsUser<U> = U extends { name : string, role : string} ? true : false

type u1 = IsUser<10>

type u2 = IsUser<true>

type u3 = IsUser<{name : "Magesh", role : "admin"}>
*/

type IsUser<U> = U extends {
    name : string,
    team : {
        memberCount : number
    }
} ? true : false

type u1 = IsUser<{ 
    name : "Magesh", 
    team : { 
        memberCount : 5,
        name : "bug warriors"
    }
}>

type u2 = IsUser<{ name: "Magesh" }>




