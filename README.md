# haskell-bruh 💪

_Notes on beginning haskell from the point of view of a javascript programmer_

# Resources

_VsCode setup article:
https://medium.com/@dogwith1eye/setting-up-haskell-in-vs-code-on-macos-d2cc1ce9f60a_
<br>_Haskell Tutorial: http://learnyouahaskell.com/_

# Notes

[REPL](#ghci)

[Types](#basic-types)

* [Booleans](#booleans)
* [Chars](#chars)
* [Functions](#functions)
* [Numbers](#numbers)
* [Ordering](#ordering)

[Type Classes](#type-classes)

* [Bounded](#bounded)
* [Enum](#enum)
* [Floating](#floating)
* [Integral](#integral)
* [Num](#num)
* [Ord](#ord)
* [Read](#read)
* [Show](#show)

[Lists](#lists)

* [List Comprehension](#list-comprehension)
* [List operations](#list-operations)
* [Ranges](#ranges)

[Tuples](#tuples)

[Function Syntax](#function-syntax)

* [Pattern Matching](#pattern-matching)
* [Guards](#guards)
* [Where](#where)
* [Let](#let)
* [Case](#case)

[Recursion](#recursion)

[Miscellaneous](#miscellaneous)

### `ghci`

GHC (Glasgow Haskell Compiler) is what compiles our haskell code. In the same
way that we commonly run the `node` command from the terminal to bring up a
REPL, we can use `ghci` to run a haskell REPL. Because we are setup using
`stack`, we run the REPL with the command `stack ghci`.

**_Commands, and their `node` counterparts_** <br> I've noticed that `ghci`
commands bear more relation to commands used in the VIM editor than in the node
REPL. <br>

| Node                        | Haskell                 | _description_                                        |
| --------------------------- | ----------------------- | ---------------------------------------------------- |
| `require('path/to/module')` | `:l path/to/module.hs`  | load a module's functions into scope                 |
| _none I know of_            | `:r`                    | refresh loaded modules after a file has been changed |
| `^C ^C`                     | `:q`                    | Exit the REPL                                        |
| N/A                         | `:t <expression>`       | display `type` of an expression                      |
| N/A                         | `:t (<infix function>)` | display `type` of an infix function, e.g., `:t (==)` |
| N/A                         | `:set +m`               | enable multiline input\*                             |

\*It is also possible to enable multiline input on a case by case basis. Simply
enter the command `:{`, enter the multiline input, and then enter the command
`:}` when finished.

```haskell
> :{   -- begin multiline input
> multi
> line
> :}   -- end multiline input
```

<br>

---

# Basic Types

This section refers to the basic types (boolean, number, string, function).

## Booleans

`:: Bool`

| JS              | Haskell         | _notes_ |
| --------------- | --------------- | ------- |
| `true`, `false` | `True`, `False` |
| `!true`         | `not True`      |

## Numbers

In javascript, we can be very loose with our definition of what a `Number` is.
However, in haskell we need to be more specific. There are four types of numbers
in Haskell:

| Type      | _notes_                                                            |
| --------- | ------------------------------------------------------------------ |
| `Int`     | a **bounded**, whole number (has a size limit, can't be a decimal) |
| `Integer` | an **unbounded** whole number (can be huge! but not a decimal)     |
| `Float`   | a **single precision** floating point number (decimal)             |
| `Double`  | double the precision of a float                                    |

**Number methods**

| JS               | Haskell        | _notes_                                                  |
| ---------------- | -------------- | -------------------------------------------------------- |
| `++x`            | `succ x`       | successor method                                         |
| `%`              | `mod`          | modulo method                                            |
| `Math.min(x, y)` | `min x y`      |                                                          |
| N/A              | `fromIntegral` | used to make different number types play nicely together |

## Chars

A single character. This is denoted by single quotes, e.g., `'a'`. A `string` in
Haskell has the type `[Char]` - a list of single characters.

> An important distinction syntactically is that `"a"` is a `list` containing a
> single character. So `["a", "b"]` would have the type `[[Char]]` -- a list of
> character lists.

## Ordering

One of `GT`, `LT`, `EQ`. Used to signify _greater than_, _less than_, and
_equal_

## Functions

| JS                          | Haskell            | _notes_                                 |
| --------------------------- | ------------------ | --------------------------------------- |
| `const double = x => x + x` | `double x = x + x` | define a function                       |
| `const four = 4`            | `four = 4`         | a function that returns `4`             |
| `foo()`                     | `foo`              | call a function that takes no arguments |
| `double(1)`                 | `double 1`         | call a function with an argument        |
| `foo(bar(x))`               | `foo (bar x)`      | composition                             |

> <br>A function that takes two arguments can be converted to an `infix`
> operator by surrounding it with back ticks.
>
> ```haskell
> foo x y -- is same as
> x `foo` y
> ```
>
> ```haskell
> div 92 10 -- is same as
> 92 `div` 10
> ```

**Function type declarations**

`<functionName> :: <arg type> -> <return type>`

```haskell
fn :: Int -> Int -- this function takes and returns an `Int`
```

_Type variables_<br> `<functionName> :: <Type variable t, Type variable u> => t
-> u`

> If there are more than one type variables in a signature **without** an
> assigned type class, it does **not** mean that the two variables must be of a
> different type!

```haskell
-- a function type declaration can have one or more type variables.
fn :: Int a => a -> a -- `a` is an Int

fn :: (Int a, [Char] b) => a -> b -- this function takes a number and returns a string.

fn :: [a] -> a -- take a list of any type, and return that type.
```

**Reading a type signature**

> ```haskell
> -- 'where every `a` following the fat arrow is of type `Integral`, this function takes two Integrals and will return an Integral.'
> divide :: Integral a => a -> a -> a
> divide x y = x `div` y
> ```

 <br>

# Type Classes

Type classes are a set of types that **implement** a set of functionality unique
to the type class.

## `Eq`

A set of types that can be tested for equality.

`:: Eq a => a -> a -> Bool`

```haskell
== -- Equal

/= -- Not equal
```

## `Ord`

A set of types that can be put in order. Because they can be put in order, they
necessarily can be compared with each other.

```haskell
-- The following infix operators have the same type
:: Ord a => a -> a -> Bool
>
<
>=
<=

-- The compare function returns one of "GT", "LT", "EQ" (greater than, less than, equal to)
compare :: Ord a => a -> a -> Ordering

compare 3 4   -- LT
```

## `Show`

A set of types that can be represented as strings.

```haskell
-- print a string version of a given type
show :: Show a => a -> String
show 4   -- "4"
```

## `Read`

A set of types that can be coerced from a `String`

```haskell
-- convert a String to an inferred type (requires another operation for inference!)
read :: Read a => String -> a

read "4" + 3   -- 7

-- convert a String to a specified type
read "4" :: Float   -- 4.0
```

## `Num`

Encompasses all numeric types.

## `Floating`

Only floating point numbers (`Float`, `Double`)

## `Integral`

Only whole numbers (`Int`, `Integer`)

## `Enum`

A set of types that can be sequentially ordered

```haskell
succ :: Enum a => a -> a
succ 1   -- 2

pred :: Enum a => a -> a
pred 1   -- 0
```

## `Bounded`

A set of types which have an upper and lower bound.

```haskell
minBound :: Bounded a => a
minBound :: Bool   -- False

maxBound :: Bounded a => a
maxBound :: Int   -- 9223372036854775807
```

<br>

# Lists

Lists in haskell are different from javascript in that they are _typed_, meaning
that there can be no lists of a _mixed_ type.

```javascript
// Javscript
const a = [1, 2, 3]; // OK
const b = [1, true, 'asdf']; // Also OK
```

```haskell
-- Haskell
[1, 2, 3] -- OK
[1, true, "asdf"] -- Compile error!
```

In haskell, a string is sugar for `[Char]`, an array of Unicode `char`acters.

```haskell
['f', 'o', 'o']
"foo"
```

**Ways to refer to lists**

```haskell
-- empty list
[]

-- singleton list
[a]

-- list
[a, b, c, ..n]
```

## List operations

_For some JS comparisons, I'm showing the
[ramda library](http://ramdajs.com/docs) equivalents instead of native JS
because of the brevity, and similarity in syntax. Operations marked `N/A` in the
javascript column require a more complex operation than a single ramda function
call_

| JS (R is ramda lib)      | Haskell                | result      | _notes_                                                           |
| ------------------------ | ---------------------- | ----------- | ----------------------------------------------------------------- |
| `[1, 2].concat([3, 4]`   | `[1, 2] ++ [3, 4]`     | `[1,2,3,4]` | join two lists                                                    |
| `[2, 3].unshift(1)`      | `1 : [2, 3]`           | `[1,2,3]`   | add `1` to beginning of the list                                  |
| `'foo'[0]`               | `"foo" !! 0`           | `"f"`       | access by index                                                   |
| `R.head([1,2,3])`        | `head [1,2,3]`         | `1`         | get value of first element                                        |
| `R.tail([1,2,3])`        | `tail [1,2,3]`         | `[2,3]`     | get list without head                                             |
| `R.last([1,2,3])`        | `last [1,2,3]`         | `3`         | get last element                                                  |
| `R.init([1,2,3])`        | `init [1,2,3]`         | `[1,2]`     | get list without last element                                     |
| `R.length([1,2,3])`      | `length [1,2,3]`       | `3`         | get length of list                                                |
| `R.isEmpty([])`          | `null []`              | `True`      | check if list is empty                                            |
| `[1,2,3].reverse()`      | `reverse [1,2,3]`      | `[3,2,1]`   | reverse a list                                                    |
| `R.take(1, [1,2,3])`     | `take 1 [1,2,3]`       | `[1]`       | collect n number of elements from beginning of list into new list |
| `R.drop(1, [1,2,3])`     | `drop 1 [1,2,3]`       | `[2,3]`     | remove n number of elements from beginning of list into new list  |
| N/A                      | `maximum [1,2,3]`      | `3`         | get largest from a list of comparables                            |
| N/A                      | `minimum [1,2,3]`      | `1`         | get smallest from a list of comparables                           |
| `R.sum([1,2,3])`         | `sum [1,2,3]`          | `6`         | get sum of a list of numbers                                      |
| `R.product([1,2,3])`     | `product [1,2,3]`      | `6`         | get product of a list of numbers                                  |
| `R.contains(1, [1,2,3])` | `` 1 `elem` [1,2,3] `` | `True`      | check if element is contained in list                             |

## Ranges

In haskell, we can build ranges and numerical sequences with the `[start..end]`
syntax. This is something that would be amazing were it a built in feature of
javascript, but in reality requires some backflips in the form of custom
iterators to achieve. Because this is the case, I won't list any JS analogs here
besides noting that `Ramda.range(start, finish)` gives an approximation of this
behavior, but does not support complex sequences.

**Finite Ranges**

| Range        | output                      | notes                      |
| ------------ | --------------------------- | -------------------------- |
| `[1..5]`     | `[1,2,3,4,5]`               |
| `['a'..'e']` | `['a', 'b', 'c', 'd', 'e']` |
| `['A'..'C']` | `['A', 'B', 'C']`           |
| `[2,4..10]`  | `[2,4,6,8,10]`              | specify a stepped sequence |

> _In the case of stepped sequences, we can only specify one step_

**Infinite Ranges** If an end point is unknown, we can create an infinite
sequence, and simply say how many elements of it we would like to `take`.

```haskell
-- create a list of the first 10 multiples of 3
take 10 [3,6..]
```

`cycle` - Repeat a given list over and over until we tell it to stop.

```haskell
take 5 (cycle [3,6]) -- [3,6,3,6,3]
```

`repeat` - Given a single element, create an infinite list of that element.

```haskell
take 3 (repeat [3,6]) -- [[3,6],[3,6],[3,6]]
```

`replicate` - given _n_ times, and an element, will create a list of _n_ length
containing that element.

```haskell
replicate 3 5 -- [5,5,5]
```

## List Comprehension

> _Do something to each element in a list in which **all** of the following
> things are true about each element_.

The further I get in my journey of learning about the haskell language, the more
it becomes clear that this is a language almost tailor-made for mathematical
calculation. List comprehensions are one such example, and correspond closely
with the concept of `set comprehension` in mathematics. A set of elements
matching some requirement(s) are piped through an output function.

```haskell
-- notice how `x` is used by both the output and predicate functions
[outputFunction x | x <- someCollection, predicate1 x, predicate2 x ]

-- You can use more than one collection, and each element meeting the predicate requirements will be made into a _single_ list.
[outputFunction x y | x <- someCollection, y <- anotherCollection, predicate1 x y, predicate2 x y ]
```

The list comprehension reads a bit awkwardly at first glance, but there is a way
to simplify it mentally-

* everything to the right of the `|` will result in a _filtered_ list.
* the function to the left of the `|` is mapped over the _filtered_ list. <br>
* the `x <- someList` gives us a way to identify an element (`x`) from our
  filtered list to be used as an argument to the _output_ function OR a
  `predicate`. I think of it visually as if an `x` is being _pulled out_ of
  `someList`

**Some uses for list comprehensions**

> Given a list of `xs`, replace everything in the list with the number 1.

```haskell
[1 | _ <- xs]
-- each member of `xs` is piped into (or becomes) a `1`.  This syntax seems awkard to me right now, but is good to know.
-- the use of `_` signifies an unused variable.  We also find this convention used by some authors in javascript
```

> Given a string, replace each vowel with an `X`. <br> (remember, a string is
> actually a list of characters) <br> Note that the apostrophe **does** have a
> use in the case of describing lists of characters. In `ghci`, I would get an
> error if I used double quotes around the characters in the array.

```haskell
censor word = [if c `elem` ['a', 'e', 'i', 'o', 'u'] then '*' else c | c <- word]
censor "foo" -- "f**"
```

> List all of the possible right triangles with a maximum side length of `10`.

```haskell
let rightTriangles = [(a, b, c) | c <- [1..10], b <- [1..c], a <- [1..b], a^2 + b^2 == c^2]

-- [(3,4,5),(6,8,10)]
```

This is incredibly terse in comparison to what we would write in javascript!
Here is how it would read- "Give me a list of triples in the form `(a, b, c)`
where `c` is no larger than `10`, and `a^2 + b^2` is equal to `c^2`. Cool,
right? Well, maybe not but it should be handy.

<br>

# Tuples

`:: (t1, t2, tn)`

Tuples are a way to express a group of values with a fixed _size_, when the
_type_ of each value is also known. Tuples are grouped with parentheses, and can
contain mixed types, unlike a list. For instance, `(1, 2)` is an `Integral`
tuple (`(Integral, Integral)`), and `("Guy", 2)` is a tuple with a `string` as
its first member, and an `Integral` as its second member (`:: ([Char], Int)`).

A list of tuples must consist of the same `type` and `size`.

> Notice that since a tuple can contain a string, it can contain a list!

```haskell
-- valid
[(1, 2), (3, 4)]
[("foo", "bar"), ("hello", "there")]

-- not valid!
[(1, 2), ("b", "c")]

[(1, 2), (1, 2, 3)]
```

## `pair` operations

> A `pair` is a **tuple** with two members.

| Operation        | output | notes |
| ---------------- | ------ | ----- |
| `fst (1, "two")` | `1`    |
| `snd (1, "two")` | `"two" |

**Creating tuples from two lists with `zip`**

`zip` takes two lists, and combines the corresponding indices of both lists into
a `pair`. If one list is longer than the other, the remaining items in the
longer list will be discarded after all possible pairs have been created.

```haskell
zip [1,2,3,4] ["Apples", "Oranges", "Pears"]

-- [(1, "Apples"), (2, "Oranges"), (3, "Pears")]
```

# Function Syntax

## Pattern Matching

Pattern matching allows us to setup a default response for a function when we
have a known case. **Visually**, it looks almost like a function overload in
TypeScript.

The function below checks to see if the argument is `1` or not. If it is one, it
returns "It's one!". Any other value `x` returns "Not one...".

```haskell
isItOne :: (Eq a, Num a) => a -> String
isItOne 1 = "It's one!"
isItOne x = "Not one..."
```

**non-exhaustive pattern**

A pattern that has no default case. Don't do this :-)

```haskell
isItOne :: (Eq a, Num a) => a -> String
isItOne 1 = "It's one!"
isItOne 2 = "Not one..."

isItOne 3   -- ERROR! there isn't a default case for isItOne.
```

**pattern matching with tuples**

Note the use of `_` below. It indicates to the compiler that the variable should
be ignored.

```haskell
first :: (a, b, c) -> a
first (x, _, _) = x
```

**pattern matching with lists**

We can do something similar to the 'rest / spread' pattern in javascript for
destructuring a list in a function argument.

```javascript
const [first, ...rest] = [1, 2, 3];

first; // 1
rest; // [2,3]
```

```haskell
destructure :: [t] -> t
destructure (first:second:rest) = second

destructure [1,2,3]   -- 2
```

**'as' pattern**

Denoted with `@`, and can be used to bind a variable that represents the
entirety of a pattern. For example:

```haskell
@xs(x:rest)
-- refer to an entire list as `xs`, refer to the first item in the list as `x`, and the remaining items as `rest`
```

## Guards

Guards are a way to avoid huge `if` statements by using the `|` character. There
is a syntactic 'gotcha' here- When defining a function using guards, don't use
`=`!

During execution, the function will look for the first statement that evaluates
to `True`, executes the code to the right of the `=`, and exits the function.

```haskell
-- DO
foo :: Eq t => [t] -> [Char]
foo x
  | x == [] = "It's an empty array"
  | otherwise = "It's not an empty array"

foo [True]   -- "It's not an empty array"
foo []   -- "It's an empty array"


-- DON'T
foo :: Eq t => [t] -> [Char]
foo x =
  | x == [] = "It's an empty array"
  | otherwise = "It's not an empty array"
```

## Where

`where` is used to bind variables to a function scope **after** the body of the
function.

```haskell
<function> where <assignments>
```

## Let

`let` is used to bind variables to a function scope **before** the body of the
function. When `let` is used without its `in` counterpart, the variables are
global. In the quicksort example below, we are binding two variables in the let
block, `smalls`, and `bigs` to a list comprehension. Those two variables are
then used in the `in` block.

```haskell
-- let <assignments> in <function>

quicksort :: (Ord a ) => [a] -> [a]
quicksort [] = []
quicksort (x:xs) =
    let smalls = [a | a <- xs, a < x];
        bigs = [b | b <-xs, b > x];
    in quicksort smalls ++ [x] ++ quicksort bigs
```

## Case

```haskell
case expression of pattern -> result
                   pattern -> result
```

<br>

# Recursion

One notable aspect of using a functional programming language is a lack of
looping constructs, like the `for` loop, which exist in several languages. This
being the case, we use recursion instead of loops in haskell. For a simple
example, I grabbed a common problem: Solving for the greatest common divisor.

As we can see in the [guards section](#guards) above, haskell gives us some
nice, clean looking syntax for outlining cases where we want to stop the
recursion.

```haskell
-- recursively implement the gcd infix (greatest common divisor)
-- optimization with modulo at http://people.cs.ksu.edu/~schmidt/301s12/Exercises/euclid_alg.html

gcd' :: (Integral a) => a -> a -> a
gcd' x y
    | x == 0 || y == 0 = max x y
    | x == y = x
    | x > y = gcd' (x `mod` y) y
    | otherwise = gcd' (y `mod` x) x
```

Below is a similar implementation in javascript. A few items came to mind while
I was writing this example:

1. I realized I would need to include runtime typechecking
2. While it would be possible to make all three cases into a big ternary to try
   and emulate the terse nature of haskell, it would lose a lot of readability.
   I certainly would not want to come back in two months and look at
   ```javascript
   return x === 0 || y === 0 ? max : x === y ? x : gcd(max % min, min);
   ```
3. Even though it can be a little more verbose, we can borrow techniques from
   haskell and bring them into our javascript code.

```javascript
function gcd(x, y) {
  // would also need to include runtime typechecking, which I've omitted.

  const max = Math.max(x, y);
  const min = Math.min(x, y);

  if (x === 0 || y === 0) {
    return max;
  }

  if (x === y) {
    return x;
  }

  return gcd(max % min, min);
}
```

Here's a little collection of examples in haskell and javascript to showcase
recursion.

**maximum of a list**

In this example, we are able to take advantage of the `:` operator to
destructure our list, and also handling empty and singleton cases with
[pattern matching](#pattern-matching).

```haskell
-- The maximum of a list is the head if the head is bigger than the maximum of the tail.
maxOfList' :: Ord a => [a] -> a
maxOfList' [] = error "dude, where's my list?"
maxOfList' [x] = x
maxOfList' (x:xs) = max x (maxOfList' xs)
```

Javascript:

```javascript
function maxOfList(xs) {
  // runtime type-checking here...
  if (xs.length === 0) {
    throw new Error("dude, where's my list?");
  }

  if (xs.length === 1) {
    return xs[0];
  }

  const [x, ...rest] = xs;

  return Math.max(x, maxOfList(rest));
}
```

**replicate**

Given a length L and an item, create a list of length L containing that item.

```haskell
replicate' :: Int -> a -> [a]
replicate' l item
    | l <= 0 = []
    | otherwise = item : replicate' (l - 1) item
```

Javascript:

```javascript
function replicate(length, item) {
  // runtime typechecking here...
  if (length <= 0 || item === undefined) {
    return [];
  }

  return [item, ...replicate(length - 1, item)];
}
```

**take**

Take a specified number of elements from the front of a list, and put them in a
new list.

```haskell
take' :: Int -> [a] -> [a]
take' _ [] = []
take' n (x:xs)
    | n <= 0 = []
    | otherwise = x : take' ( n - 1 ) xs
```

Javascript:

```javascript
function take(num, list) {
  // again... type-checking would go here
  if (list.length === 0 || num <= 0) {
    return [];
  }

  const [x, ...xs] = list;

  return [x, ...take(num - 1, xs)];
}
```

**reverse**

Reverse a list

```haskell
reverse' :: [a] -> [a]
reverse' [] = []
reverse' (x:xs) = reverse' xs ++ [x]
```

Javascript:

```javascript
function reverse(list = []) {
  const [x, ...xs] = list;

  if (list.length === 0) {
    return [];
  }

  return [...reverse(xs), x];
}
```

**zip**

```haskell
zip' :: [a] -> [b] -> [(a,b)]
zip' [] _ = []
zip' _ [] = []
zip' (x:xs) (y:ys) = (x, y) : zip' xs ys
```

Javascript:

```javascript
function zip(list1, list2) {
  if (list1.length === 0 || list2.length === 0) {
    return [];
  }
  const [a, ...as] = list1;
  const [b, ...bs] = list2;

  return [[a, b], ...zip(as, bs)];
}
```

**elem**

```haskell
elem' :: ( Eq a ) => a -> [a] -> Bool
elem' _ [] = False
el `elem'` (x:xs)
    | x == el = True
    | otherwise = el `elem'` xs
```

Javascript:

```javascript
function elem(el, list = []) {
  if (list.length === 0) {
    return false;
  }

  const [x, ...xs] = list;
  return x === el ? true : elem(el, xs);
}
```

**quicksort**

```haskell
quicksort :: (Ord a ) => [a] -> [a]
quicksort [] = []
quicksort (x:xs) =
    let smalls = [a | a <- xs, a < x];
        bigs = [b | b <-xs, b > x];
    in quicksort smalls ++ [x] ++ quicksort bigs
```

Javascript:

```javascript
function quicksort(list = []) {
  if (list.length === 0) {
    return list;
  }

  const [x, ...xs] = list;
  const smalls = xs.filter(a => a < x);
  const bigs = xs.filter(a => a > x);

  return quicksort(smalls)
    .concat(x)
    .concat(quicksort(bigs));
}
```

<br>

# Miscellaneous

## Syntax

The apostrophe `'` has no special meaning in Haskell, and can be used in
variable and function names. _There are, however, some notable exceptions:_

* `'a'` represents a single `Char`.
* `"a"` is a list containing a single Char (`['a']`)

**Comments**

```haskell
-- Single line comment

{-|
  Multiline
  comment
-}
```

## Misc

### ABR - Always Be Returning

In Haskell, every expression and function _must_ return some value, including
conditional logic! For instance, this code, which is fine in javascript...

```javascript
function foo(something) {
  if (something) {
    doIt();
  }
}
```

...is **invalid** in haskell. Each code path _must_ return some value, and you
can't have an `if then` without an `else`.

```haskell
foo something = if something
                then 1
                else 2
```

### Defining a function with backticks as an infix

* TODO
