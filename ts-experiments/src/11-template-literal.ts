import { Expect, Equal } from "type-testing"

namespace template_literal {
    type firstName = "magesh"
    type lastName = "kuppan"

    type fullName = `${firstName} ${lastName}`

    /*  */
    type Index = 20;

    type Accessor = `users[${Index}].isAdmin`

    type EqualsTrue = `${Accessor} == ${true}`

    /*  */

    type User = { id : number, name : string}

    type Id = User["id"]

    type Obj = { "0" : 100 }
    type ObjIndex = 0

    type Get<O, K extends keyof O> = O[K]

    // @ts-expect-error
    type t1 = Get<Obj, ObjIndex>

    type t2 = Get<Obj, `${ObjIndex}`>

    // Unions
    type Size = "sm" | "md" | "lg";
    type ClassName = `size-${Size}`

    type t3 = Expect<Equal<ClassName, "size-sm" | "size-md" | "size-lg">>

    type Variant = "primary" | "secondary"

    type InputStyle = `${Variant}-${Size}`

    // TypeScript Type utilities for strings
    type T1 = Uppercase<"magesh">

    type T2 = Lowercase<"KUPPAN">

    type T3 = Capitalize<"magesh kuppan">

    type T4 = Uncapitalize<"Magesh">

    // applied

    type Method = "get" | "post" | "put"

    type Resource = "user" | "blogPost" | "comment"

    type propName = `${Lowercase<Method>}${Capitalize<Resource>}`

    // type T5 = Expect<Equal<propName, "getUser" | "getBlogPost" | "postUser" | "postBlogPost">>

    // manually constructing the HttpService type

    /* 
    type HttpService = {
        getUser: Function;
        getBlogPost: Function;
        postUser: Function;
        postBlogPost: Function;
    } 
    */

    // Dynamic Generating the type
    type HttpService = Record<propName, Function>

   /* 
    type T6 = Expect<Equal<HttpService, {
        getUser: Function;
        getBlogPost: Function;
        postUser: Function;
        postBlogPost: Function;
    }>> 
    */

    // Pattern Matching
    type GetNameTuple<FullName> = FullName extends `${infer FirstName} ${infer LastName}`
        ? [FirstName, LastName]
        : never;

    type Names = GetNameTuple<"Magesh Kuppan">

    
    type SplitDomain<Name> =
        Name extends `${infer Sub}.${infer Domain}.${infer Extension}`
        ? [Sub, Domain, Extension]
        : never;

    type T11 = SplitDomain<"www.google.com">;
    //   =>   ["www", "google", "com"]

    type T12 = SplitDomain<"en.wikipedia.org">;
    //   =>   ["en", "wikipedia", "org"]

    type T13 = SplitDomain<"github.com">;
    //   =>   never. The subdomain part is missing.
}