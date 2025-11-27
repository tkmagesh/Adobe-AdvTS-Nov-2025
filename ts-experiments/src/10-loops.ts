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

    declare function getColumn<T extends Table, N extends string>(table : T, columnName : N) : GetColumn<T,N> 

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
}