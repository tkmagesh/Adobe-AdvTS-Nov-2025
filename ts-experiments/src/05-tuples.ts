
type EmptyTuple = []

type OneTuple = [1]

type TwoTuple = [1, "2"]

// indexer
type MyTuple = [48, "Magesh"]
type Age = MyTuple[0]
type Name = MyTuple[1]

type AgeAndName = MyTuple[0|1]

// Accessing all the values
type Values = MyTuple[number]

// Concatenating Tuples
type T1 = [30,20]
type T2 = [3,5,1,...T1]

type T3 = [10,70,40]
type T4 = [...T1, ...T3]

// named indices
type NameTuple = [firstName : string, lastName : string]

type FirstName = NameTuple[0]

// optional indices
type OptTuple = [string, boolean?]
let t1 : OptTuple = ["pen", true]
let t2 : OptTuple = ["Pencil"]



// tuples applied

type FArgs = [x : number, y : boolean, z : string]

function f1(...args : FArgs){
    const [x, y, z] = args
}

function f2(...args: FArgs){

}

