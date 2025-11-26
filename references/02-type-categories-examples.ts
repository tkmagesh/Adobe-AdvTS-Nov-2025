type RedType = "red"
type YellowType = "yellow"
type GreenType = "green"

type TrafficSignal = RedType | YellowType | GreenType

let signal : TrafficSignal
signal = "red"
signal = "green"
signal = "yellow"

type GoSignal = YellowType | GreenType
let goSignal : GoSignal;
goSignal = "yellow"
goSignal = "green"

// @ts-expect-error
goSignal = "red"


type StopSignal = RedType | YellowType
type WaitSignal = GoSignal & StopSignal

let wait : WaitSignal = "yellow" 


type TupleType = [number, string, boolean]
type MarksType = number[]

/* 
type CustomType = TupleType | MarksType
let ct : CustomType 
ct = [10, "nagesh", true]
ct = [10,20,30,40] 
*/

type CustomType = TupleType & MarksType
let ct: CustomType


// Exercise
type WithName = { id: number, name: string }
type WithSalary = { id: number, salary: string }

// type Employee = WithName | WithSalary
type Employee = WithName & WithSalary

let wt1 : WithName
let wt2 : WithName




type Product = { id : number, name : string, cost : number}

// let p1 : Product = { id : 100, name : "Pen", cost : 10}

// @ts-expect-error
let p1: Product = { id: 100, name: "Pen", cost: 10, category : "stationary" }

let o = { id: 100, name: "Pen", cost: 10, category: "stationary" }
let p2 : Product
p2 = o // works fine!




