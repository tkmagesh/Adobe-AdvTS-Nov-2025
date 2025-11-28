
namespace RouterV2 {
    /**
     * Our route function type:
     */

    export declare function route<const P extends string>(
        path: ValidateRoute<P>,
    ): Route<InitialRouteState<GetMethod<P>>>;

    type RouteStateConstraint = {
        method: Method;
        isValid: boolean;
    };

    type InitialRouteState<M extends Method> = {
        method: M;
        isValid: M extends "GET" ? true : false;
    } & {};

    type Route<State extends RouteStateConstraint> = {
        isAuthenticated: () => Route<State>;

        isAdmin: () => Route<State>;

        handle: State["isValid"] extends true
        ? (
            handler: (req: ParsedRequest) => string | Promise<string>,
        ) => Route<State>
        : never;

        validateBody: State["method"] extends "GET"
        ? never
        : (
            predicate: (body: unknown) => unknown,
        ) => Route<Assign<State, { isValid: true }>>;
    };

    /**
     * The `router` function type:
     */

    export declare function router(): Router;

    type Router = {
        add: (route: Route<RouteStateConstraint>) => Router;
        start: (port: number) => void;
    };

    type ParsedRequest = {
        cookies: Record<string, string>;
        params: Record<string, string>;
        body: any;
    };

    /**
     * Type Validator
     */

    type Method = "GET" | "POST" | "PUT" | "PATCH";

    type NoSpacesError = "Spaces aren't allowed in route paths.";

    type Suggestions<Path extends string> = NoInfer<
        `${Method} ${Path}` | `${Method} /`
    >;

    type ValidateRoute<Path extends string> =
        Path extends `${string} ${string} ${string}`
        ? NoSpacesError
        : Path extends `${Method} ${string}`
        ? Path
        : Suggestions<Path>;

    /**
     * Helper functions
     */

    type GetMethod<P> = P extends `${infer M extends Method} ${string}` ? M : never;

    type Compute<T> = { [K in keyof T]: T[K] } | never;

    type Assign<A, B> = Compute<Omit<A, keyof B> & B>;

}