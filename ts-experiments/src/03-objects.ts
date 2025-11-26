import { Expect, Equal } from "type-testing";

namespace ObjectWorld {
    // type
    type Product = { id: number, name: string, cost: number }

    type IdType = Product["id"]
    type t1 = Expect<Equal<IdType, number>>

    type NameAndCost1 = Product["name"] | Product["cost"]
    type t2 = Expect<Equal<NameAndCost1, string | number>>

    type NameAndCost2 = Product["name" | "cost"]
    type t3 = Expect<Equal<NameAndCost2, string | number>>

    type ProductKeys = keyof Product
    type t4 = Expect<Equal<ProductKeys, "id" | "name" | "cost">>

    // type ProductKeyTypes = Product["id" | "name" | "cost"]
    type ProductKeyTypes = Product[keyof Product]
    type t5 = Expect<Equal<ProductKeyTypes, number | string | number>>


    // values
    let p1 : Product = { id : 100, name : "Pen", cost : 10}
    let id = p1["id"]
}

