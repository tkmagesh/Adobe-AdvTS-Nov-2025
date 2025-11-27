import { Expect, Equal } from "type-testing";

namespace loops_demo {

    type Column = {
        name : string;
        values : unknown[]
    };

    type Table = [Column, ...Column[]]

    type UserTable = [
        { name : 'firstname' ; values : string[]},
        { name : 'age'; values : number[]},
        { name : 'isAdmin', values : boolean[]}
    ]

    const users : UserTable = [
        {name : 'firstname', values : ['Magesh', 'Suresh', 'Kannan']},
        {name : 'age', values : [45,23,54]},
        {name : 'isAdmin', values : [true, false, false]}
    ]

    const names = getColumn(users, "firstname")
    // type of names => string[]

    const ages = getColumn(users, "age")
    // type of ages => number[]

    // declare function getColumn<T extends Table, N extends string>(table : T, columnName : N) : GetColumn<T,N> 

    type t1 = GetColumn<UserTable, "firstname">
    // t1 => string[]

    type t2 = GetColumn<UserTable, "age">
    // t2 => number[]

    type t3 = GetColumn<UserTable, "isAdmin">

    type GetColumn<List, Name> =
        List extends [infer First, ... infer Rest] 
        ? First extends { name: Name , values : infer Values }
            ? Values 
            : GetColumn<Rest, Name>
        : undefined

    function getColumn<T extends Table, N extends string>(table: T, columnName: N): GetColumn<T, N> {
        const column = table.find(col => col.name === columnName)

        if (column === undefined){
            return undefined as GetColumn<T,N>
        }

        return column.values as GetColumn<T,N>
    }

    const userNames = getColumn(users, "firstname")
    const formattedNames = userNames.map(n => n.toUpperCase())

    const userAges = getColumn(users, "age")
    const serniors = userAges.filter(age => age > 50)

}

namespace map_demo {
    type Names = ToNames<[
        {id : 1, name : "magesh"},
        {id : 2, name : "suresh"}
    ]>

    type GetName<User> = User extends { id: number, name: infer Name } ? Name : "anonymous"

    // Names => ["magesh", "suresh"]
    type ToNames<List> = List extends [infer First, ...infer Rest]
        ? [ GetName<First>, ...ToNames<Rest>]
        : []

    type t1 = Expect<Equal<Names, ["magesh", "suresh"]>>
}

namespace filter_demo {
    type Numbers = OnlyNumbers<[1,3,"magesh",true,5]>

    type OnlyNumbers<List> = List extends [infer First, ...infer Rest ] 
        ? First extends number
            ? [First, ...OnlyNumbers<Rest>]
            : OnlyNumbers<Rest>
        : []

    type t1 = Expect<Equal<Numbers, [1,3,5]>>

    // Generic version of "OnlyNumbers"
    type Filter<List, U> = List extends [infer First, ...infer Rest]
        ? First extends U
        ? [First, ...Filter<Rest, U>]
        : Filter<Rest, U>
        : []

    type Strings = Filter<[1, 3, "magesh", true, 5], string>
    type t2 = Expect<Equal<Strings, ["magesh"]>>

    type Booleans = Filter<[1, 3, "magesh", true, 5], boolean>
    type t3 = Expect<Equal<Booleans, [true]>>
}