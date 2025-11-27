import { Expect, Equal } from "type-testing";
/**
 * Type the `all` function to take a list of promises and
 * to turn them into a single promise containing a list of values.
 */
namespace promiseAll {

    declare function all<
        // Infer `Promises` as a tuple of promises:
        Promises extends [Promise<any>, ...Promise<any>[]]
    >(promises: Promises): Promise<UnwrapAll<Promises>>;

    type UnwrapAll<Promises> = TODO

    // Two promises
    const res1 = all([Promise.resolve(20), Promise.resolve("Hello" as const)]);
    type expected1 = Promise<[number, "Hello"]>;
    type test1 = Expect<Equal<typeof res1, expected1>>;

    // Three promises
    const res2 = all([Promise.resolve(true), Promise.resolve("!"), Promise.resolve({})]);
    type expected2 = Promise<[boolean, string, {}]>;
    type test2 = Expect<Equal<typeof res2, expected2>>;

    // Five promises
    const res3 = all([
        Promise.resolve(3),
        Promise.resolve("Hello" as const),
        Promise.resolve(true),
        Promise.resolve({ key: "value" }),
        Promise.resolve(["array"]),
    ]);
    type expected3 = Promise<[number, "Hello", boolean, { key: string }, string[]]>
    type test3 = Expect<Equal<typeof res3, expected3>>;
}

/**
 * Type the `filterTable` function to take a Table,
 * a list of column names, and to return a table that
 * only contains columns with these names.
 */
namespace filterTable {

    type Column = { name: string, values: unknown[] }

    declare function filterTable<
        // Infer `T` as a tuple containing columns:
        T extends [Column, ...Column[]],
        // Infer `N` as a union of string literal type:
        N extends string
    >(table: T, columnNames: N[]): FilterTable<T, N>;

    type FilterTable<Table, NameUnion> = TODO

    declare const userTable: [
        { name: 'firstName', values: string[] },
        { name: 'lastName', values: string[] },
        { name: 'age', values: number[] },
    ]

    const res1 = filterTable(userTable, ['age']);
    type test1 = Expect<Equal<typeof res1, [
        { name: 'age', values: number[] }
    ]>>;

    const res2 = filterTable(userTable, ['firstName', 'lastName']);
    type test2 = Expect<Equal<typeof res2, [
        { name: 'firstName', values: string[] },
        { name: 'lastName', values: string[] }
    ]>>;

    const res3 = filterTable(userTable, []);
    type test3 = Expect<Equal<typeof res3, []>>;
}

/**
 * Type lodash's `zip` function. 
 * `zip` takes several arrays containing different types of 
 * values, and turn them into a single array containing
 * tuples of values for each index.
 *
 * For example, `zip([1, 2], [true, false], ['a', 'b'])`
 * returns `[[1, true, 'a'], [2, false, 'b']]`.
 */
namespace zip {
    declare function zip(...arrays: TODO): TODO;

    const res1 = zip([1, 2], [true, false]);
    // => [[1, true], [2, false]]
    type test1 = Expect<Equal<typeof res1, [number, boolean][]>>;

    const res2 = zip([1, 2], [true, false], ['a', 'b']);
    // => [[1, true, 'a'], [2, false, 'b']]
    type test2 = Expect<Equal<typeof res2, [number, boolean, string][]>>;

    const res3 = zip([1, 2, null], [true, false, undefined]);
    // => [[1, true], [2, false], [null, undefined]]
    type test3 = Expect<Equal<typeof res3, [number | null, boolean | undefined][]>>;
}
