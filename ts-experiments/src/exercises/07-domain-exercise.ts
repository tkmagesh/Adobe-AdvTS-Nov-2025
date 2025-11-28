

/* At the data level, userId is JUST a number */
/* 
make the userId typesafe so that ONLY "userIds" can be used with getUser()
*/

// step :1 Declare a unique symbol (guaranteed unique at the type level (compilation))
declare const userIdBrand : unique symbol

// step :2 Defined a branded Type
type UserId = number & { [userIdBrand] : "UserId" }

// step :3 Helper function to construct the userid safely
// control access to this function ONLY to the modules that require it (typicall data access modules)
function createUserId(id : number) : UserId {
    return id as UserId // runtime is just a number; but the type system sees it as a branded value 
}

// step :4 Use it
function getUser(userId : UserId){
    console.log("Fetching user", userId)
    const next = IncrementUserId(userId)
    console.log("next user Id", next)
}

// step :5 example of manipulating it 
function IncrementUserId(userId : UserId) : UserId {
    return createUserId((userId as number)+1)
}

const userId = createUserId(123)
getUser(userId)

const rawNumber = 123

// @ts-expect-error
getUser(rawNumber) // Type error : umber is not assignable to UserId
