import { Expect, Equal } from "type-testing";

/* sample */
namespace test {
  function add(x: number, y: number): number {
      return x + y
  }

  add(100,200)
}


/**
 * Type the `move` function so that the `direction`
 * parameter can only be assigned to "backward" or "forward".
 */
namespace move {

  function move(direction: TODO) {
    // some imaginary code that makes the thing move!
  }

  // should work
  move("backward")

  // should work
  move("forward")

  // should not work
  // @ts-expect-error
  move("left")

  // should not work
  // @ts-expect-error
  move("right")
}


/**
 * `pickOne` takes 2 arguments of potentially different
 * types and return either one or the other at random.
 * Make  generic!
 */
namespace pickOne {

  function pickOne(a: TODO, b: TODO): TODO {
    return Math.random() > 0.5 ? a : b;
  }

  const res1 = pickOne(true, false);
  type test1 = Expect<Equal<typeof res1, boolean>>;

  const res2 = pickOne(1, 2);
  type test2 = Expect<Equal<typeof res2, 1 | 2>>;

  const res3 = pickOne(2, "some string");
  type test3 = Expect<Equal<typeof res3, 2 | "some string">>;

  const res4 = pickOne(true, 7);
  type test4 = Expect<Equal<typeof res4, true | 7>>;
}


/**
 * The `merge` function accepts an object of type `A`
 * and an object of type `B`, and return an object
 * with all properties of `A` and `B`.
 * Make it generic!
 */
namespace merge {
  function merge(a: TODO, b: TODO): TODO {
    return { ...a, ...b };
  }

  const res1 = merge({ name: "Bob" }, { age: 42 });
  type test1 = Expect<Equal<typeof res1, { name: string } & { age: number }>>;

  const res2 = merge({ greeting: "Hello" }, {});
  type test2 = Expect<Equal<typeof res2, { greeting: string }>>;

  const res3 = merge({}, { greeting: "Hello" });
  type test3 = Expect<Equal<typeof res3, { greeting: string }>>;

  const res4 = merge({ a: 1, b: 2 }, { c: 3, d: 4 });
  type test4 = Expect<
    Equal<typeof res4, { a: number; b: number } & { c: number; d: number }>
  >;
}


/**
 * Type `debounceFn` as a function with a `cancel` method on it.
 *
 * Hint: To tell TS a variable is a function, you can either
 * use the type `Function` or `(() => void)`.
 */
namespace debouncedFn {

  let debouncedFn: TODO

  debouncedFn = Object.assign(() => { }, { cancel: () => { } });

  // should work
  debouncedFn();

  // should work
  debouncedFn.cancel();

  // `unknownMethod` does not exist on `debouncedFn`.
  // @ts-expect-error
  debouncedFn.unknownMethod();

  // can't assign a string to `debouncedFn`.
  // @ts-expect-error:
  debouncedFn = "Hello";
}


/**
 * Type the `stringify` function to take any kind of input.
 *
 * Don't use `any`!
 */
namespace stringify {

  function stringify(input: TODO) {
    return input instanceof Symbol ? input.toString() : `${input}`;
  }

  stringify("a string");    // should work
  stringify(12);            // should work
  stringify(true);          // should work
  stringify(Symbol("cat")); // should work
  stringify(20000n);        // should work
}


