/* 1. Nullish Coalescing */

// ?? => ONLY for null or undefined
let userInput = null
const name = userInput ?? "anonymous"

// || => for all falsy (0, '', null, undefined, NaN, false) values
let price = 0
const productPrice = price || 100

/* 2. Optional Chaining */

let product = {
    stock : {
        units : 100
    },
    // name : "pen"
} 
    
let s = product?.stock?.units

/* 3. Custom Type Guards (value is Type)  [Type Narrowing] */

type FullTimeEmployee = { calculateSalary: () => {}}
type ContractEmployee = { calculateFees : () => {}}

type Employee = FullTimeEmployee | ContractEmployee

function isFullTimeEmployee(e : Employee) : e is FullTimeEmployee {
    return "calculateSalary" in e;
}

function processEmployee(e : Employee){
    // narrowing down the e (Employee type) to either FulltimeEmployee or ContractEmployee
    if (isFullTimeEmployee(e)){
        e.calculateSalary()
    } else {
        e.calculateFees()
    }
}

// 4. Use Getters vs direct property access
class Product {
    private _id : number ;
    private _name : string;

    constructor(id : number){
        this._id = id
    }

    // making id readonly
    get id() : number {
        return this.id
    }

    set name(val : string)  {
        // validate the data
        this._name = val
    }

    get name() : string {
        return this._name
    }

}

let p = new Product(100)
p.name = "Pen"

// 5. type narrowing
if (typeof x === "string") {

}

if (p instanceof Product){

}

