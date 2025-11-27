namespace mapped_demo {

    // domain type
    type User = {
        name : string;
        age : number;
        role : string;
    }

   /* 
    type UserResponse = {
        name : string | null;
        age : number | null;
    } 
    */

    /* 
    type UserResponse = {
        [Key in "name" | "age" ]: User[Key] | null
    }  
    */
   
   /*  
   type UserResponse = {
        [Key in keyof User] : User[Key] | null
    }  
    */

    type RestResponse<T> = {
        [Key in keyof T]: T[Key] | null
    } 

    type UserResponse = RestResponse<User>


    // ReadOnly
    type ToReadOnly<T> = {
        readonly [Key in keyof T] : T[Key]
    }

    type ReadOnlyUser = ToReadOnly<User>

    // Optional
    type ToOptional<T> = {
        [Key in keyof T]? : T[Key]
    } 

    type OptionalUser = ToOptional<User>

    type ToRequired<T> = {
        [Key in keyof T]-?: T[Key]
    }

    type RequiredUser = ToRequired<User>
    
}