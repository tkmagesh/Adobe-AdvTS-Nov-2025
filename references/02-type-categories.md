
## Type Categories
1. primitive types
2. literal types
3. data structure types
4. union types
5. intersection types

### Primitive Types
- number
- string
- boolean
- symbol
- bigint
- undefined
- null

#### Special Types
- any
- unknown
- never

### Literal Types

```typescript
type Twenty = 20 // "Twenty" is a "set" with ONLY one value (20)
let twty : Twenty = 20

type Greeting = "Hello"
let g : Greeting = "Hello"

```

### Data Structure Types
- Objects
    with finite set of keys and keys can contain values of different types of data
    ```typescript
        type ObjType = { key1 : number, key2 : boolean }
    ```
- Records
    with infinite set of keys where all the keys should be of the same type and all the values should be of the same type
    ```typescript
        type RecType = { [key : string] : number }
    ```
- Tuples
    an array with a fixed number of values of different types
    ```typescript
        type TupleType = [number, string, boolean]
    ```
- Arrays
    a collection with infinite number of values and all the values should be of the same type
    ```typescript
        type MarksType = number[]
    ```

### Unions
```typescript
    type RedType = "red"
    type YellowType = "yellow"
    type GreenType = "green"

    type TrafficSignal = RedType | YellowType | GreenType

    type GoSignal = YellowType | GreenType
    type StopSignal = RedType | YellowType
```



### Intersection
```typescript

    type RedType = "red"
    type YellowType = "yellow"
    type GreenType = "green"

    type TrafficSignal = RedType | YellowType | GreenType

    type GoSignal = YellowType | GreenType
    type StopSignal = RedType | YellowType

    type WaitSignal = GoSignal & StopSignal
```


### Exercise
```typescript
type WithName = { id : number, name : string}
type WithSalary = { id : number, salary : string }

type Employee = WithName | WithSalary
```

#### Object Unions & intersections

**Intersection of Objects => Union of keys**
```typescript
type WithName = { id : number, name : string}
type WithSalary = { id : number, salary : number }

type Employee = WithName & WithSalary

// Employee variable can hold an object containing all the keys of WithName & WithSalary
/* 
Employee => {
    id : number,
    name : string,
    salary : number
} 
 */
```

**Union of Objects => Intersection of keys**
```typescript
type WithName = { id : number, name : string}
type WithSalary = { id : number, salary : number }

type Employee = WithName | WithSalary

// Employee variable can hold an object of type WithName or WithSalary

/* 
Employee => {
    id : number
}
*/
```

#### Never
- Never is used to represent an 'empty set'

**A | never => A**

**A & never => never**

#### Unknown
- Super set of ALL the types

```typescript
function f1(x : unknown){
    if (typeof x === 'number'){
        let y = x * 2
    }
    if (typeof x === 'string'){
        let z = x.length
    }
    
}

f1(100)
f1("abc")
f1(true)
```

