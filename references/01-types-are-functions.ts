// let name : string = "Magesh"

// get type from a value

let user = { id : 100, name : "Magesh" }
type userType = typeof user
// userType is inferred as { id : number, name : string } (data that will be used during the compilation type)

/* 
type DomainTypeWithNumberIdentity = { id : number, name : string }

type DomainTypeWithStringIdentity = { id : string, name : string} 
*/

/* 
DomainType => function
IdType => parameter to the DomainType function

*/
type DomainType<IdType> = { id : IdType, name : string }

type DomainTypeWithNumberIdentity = DomainType<number>
type DomainTypeWithStringIdentity = DomainType<string>

let employee : DomainTypeWithNumberIdentity;
let product : DomainTypeWithStringIdentity;










