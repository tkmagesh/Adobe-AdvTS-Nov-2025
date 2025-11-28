
import { Expect, Equal } from "type-testing";
/**
 * Type the HTTPHeaders object so that it has an `Authentication`
 * property that starts with `Bearer ` and ends with a JWT token.
 *
 * Note: JWT tokens contain 3 parts, separated by dots.
 * More info on https://jwt.io
 * 
 * Hint: You shouldn't need a conditional type here.
 */
namespace headers {
    type HTTPHeaders = {
        Authentication: `Bearer ${string}.${string}.${string}`
    };

    const test1: HTTPHeaders = {
        //  This is a correct authentication header:
        Authentication:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJtIjoiWW91J3JlIGEgbmVyZCA7KSJ9.gfB7ECp1ePeIB4Mh_3Ypci4y7jFjMH9w_BB4rZcMvQM",
    };

    const test2: HTTPHeaders = {
        // @ts-expect-error:  Authentication should start with 'Bearer'
        Authentication: "a.b.c",
    };

    const test3: HTTPHeaders = {
        // @ts-expect-error:  Authentication should start with 'Bearer'
        Authentication: "oops a.b.c",
    };

    const test4: HTTPHeaders = {
        // @ts-expect-error:  token is invalid, only 1 part.
        Authentication: "Bearer abc",
    };

    const test5: HTTPHeaders = {
        // @ts-expect-error:  token is invalid, only 2 parts.
        Authentication: "Bearer abc.123",
    };
}

/**
 * Implement a `IsYelling` generic that returns
 * true if the input string is in all caps and
 * false otherwise.
 * 
 * You shouldn't need recursion to solve this one.
 */
namespace isYelling {
    type IsYelling<Str extends string> = Str extends Uppercase<Str>
        ? true
        : false;

    type res1 = IsYelling<"HELLO">;
    type test1 = Expect<Equal<res1, true>>;

    type res2 = IsYelling<"Hello">;
    type test2 = Expect<Equal<res2, false>>;

    type res3 = IsYelling<"I am Groot">;
    type test3 = Expect<Equal<res3, false>>;

    type res4 = IsYelling<"YEAAAH">;
    type test4 = Expect<Equal<res4, true>>;
}

/**
 * Implement a `StartsWith` generic that takes
 * 2 string literals, and returns true if the
 * first string starts with the second one.
 */
namespace startsWith {
    type StartsWith<
        Str extends string,
        Start extends string
    > = Str extends `${Start}${string}` ? true : false;

    type res1 = StartsWith<"getUsers", "get">;
    type test1 = Expect<Equal<res1, true>>;

    type res2 = StartsWith<"getArticles", "post">;
    type test2 = Expect<Equal<res2, false>>;

    type res3 = StartsWith<"Type-Level Programming!", "Type">;
    type test3 = Expect<Equal<res3, true>>;
}
/**
 * Write a type-level function that transforms
 * snake_case strings into camelCase.
 */

namespace snakeToCamel {
    type SnakeToCamel<Str> = Str extends `${infer Start}_${infer Rest}`
        ? `${Start}${Capitalize<SnakeToCamel<Rest>>}`
        : Str;

    // it should let strings with no underscore in them unchanged
    type res1 = SnakeToCamel<"hello">;
    type test1 = Expect<Equal<res1, "hello">>;

    // one underscore
    type res2 = SnakeToCamel<"hello_world">;
    type test2 = Expect<Equal<res2, "helloWorld">>;

    // many underscores
    type res3 = SnakeToCamel<"hello_type_level_type_script">;
    type test3 = Expect<Equal<res3, "helloTypeLevelTypeScript">>;
}
