
export declare function router() : Router;

type Router = {
    add : (route : Route) => Router;
    start : (port : number) => void;
}

type Route = {
    isAuthenticated : () => Route;
    isAdmin : () => Route;
    validateBody : (
        predicate : (body : unknown) => boolean
    ) => Route;
    handle : (
        handler : (req : ParsedReq) => string | Promise<string>
    ) => Route;
}

type ParsedReq = {
    cookies : Record<string, string>;
    params : Record<string, string>;
    body : any;
}

// Type Validator Pattern
export declare function route<const P extends string>(
    path : ValidateRoute<P>
) : Route

// allowed methods
type Method = "GET" | "POST" | "PUT" | "PATCH"

/* 
type ValidateRoute<Path extends string> = 
    Path extends `${Method} ${string} ${string}` ? never
    : Path extends `${Method} ${string}` ? Path
    : never 
*/

// meaningful errors
type NoSpacesError = "Spaces are not allowed in route paths"
type InvalidPathError = "This path is invalid"

/* 
type ValidateRoute<Path extends string> =
    Path extends `${Method} ${string} ${string}` ? NoSpacesError
    : Path extends `${Method} ${string}` ? Path
    : InvalidPathError 
*/

// Auto complete suggestions
type Suggestions = `${Method} /`;

type ValidateRoute<Path extends string> =
    Path extends `${Method} ${string} ${string}` ? NoSpacesError
    : Path extends `${Method} ${string}` ? Path
    : Suggestions
    
// testing
route("POST /blogs/id")


