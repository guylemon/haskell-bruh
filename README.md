# haskell-bruh 💪

_Notes on beginning haskell from the point of view of a javascript programmer_

# Resources

_VsCode setup article:
https://medium.com/@dogwith1eye/setting-up-haskell-in-vs-code-on-macos-d2cc1ce9f60a_

_Haskell Tutorial: http://learnyouahaskell.com/_

_Partial Application_: https://en.wikipedia.org/wiki/Partial_application

_Currying_: https://en.wikipedia.org/wiki/Currying

_Higher order Function_: https://en.wikipedia.org/wiki/Higher-order_function

[_Interesting idea for implementing an infix composition function in javascript_](https://stackoverflow.com/questions/12350790/is-it-possible-to-define-an-infix-function)

[_Infinite sequences using generators_](https://timtaubert.de/blog/2013/05/working-with-infinite-sequences-in-javascript/)

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
* [Sectioning](#sectioning)
* [Application](#application)
* [Composition](#composition)

[Recursion](#recursion)

[Folding](#folding)

[Scanning](#scanning)

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

Functions in haskell are **higher order**. A higher order function is a function that either:

1. Can take a function as an argument, or
2. Return a function as its return value.

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

### Defining a function with infix syntax

In haskell, it is also possible to define a binary (taking two arguments) function using infix notation. As an example, let's make an addition function:

```haskell
plus x y = x + y
```

We can invoke this as an `infix` function, like so:

```haskell
3 `plus` 4   -- 7
```

Additionally (pun intended), we can **define** the function using infix notation!

```haskell
x `plus` y = x + y

plus 3 4   -- 7
3 `plus` 4   -- 7
```

**Function type definitions**

`<functionName> :: <arg type> -> <return type>`

```haskell
fn :: Int -> Int -- this function takes and returns an `Int`
```

_Type variables_<br> `<functionName> :: <Type variable t, Type variable u> => t -> u`

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

#### Currying and Partial Application

Functions that take more than one argument in haskell are said to be **curried**, that is, if they are not recieving the final argument, they return a **partially applied** function that takes the next argument, with the preceding arguments bound, and returns a function with smaller **arity**.

TODO: explain it like I'm five.

Examples of higher order functions:

**zipWith**

`zipWith'` combines two lists using a provided function. (zipWith is higher order because it takes a function as an argument)

```haskell
zipWith' :: (a -> b -> c) -> [a] -> [b] -> [c]
zipWith' _ [] _ = []
zipWith' _ _ [] = []
zipWith' fn (x:xs) (y:ys) = fn x y : zipWith' fn xs ys

zipWith' (+) [1,2,3] [1,2,3]  -- [2,4,6]
```

Javascript:

```javascript
const add = (a, b) => a + b;
function zipWith(fn = (a, b) => a, list1 = [], list2 = []) {
  if (list1.length === 0 || list2.length === 0) {
    return [];
  }
  const [x, ...xs] = list1;
  const [y, ...ys] = list2;

  return [fn(x, y), ...zipWith(fn, xs, ys)];
}

zipWith(add, [1, 2, 3], [1, 2, 3]); // [2,4,6]
```

**map**

`map` takes a function and applies it to a list. Guess what? `map` is higher order, because it takes a function as an argument. We can define map recursively:

```haskell
map' :: (a -> b) -> [a] -> [b]
map' _ [] = []
map' fn (x:xs) = fn x : map fn xs

map' (*2) [1, 2, 3]  -- [2, 4, 6]
```

Javascript:

```javascript
function map(fn, list = []) {
  if (list.length === 0) {
    return [];
  }

  const [x, ...xs] = list;

  return [fn(x), ...map(fn, xs)];
}

map(a => a * 2, [1, 2, 3]); // [2,4,6]
```

**filter**

`filter` takes a predicate (a function that returns true or false), and a list as its arguments. It returns a new list with the elements that satisfy the predicate (return true when passed into the predicate function). Notice that in the haskell example, we use [sectioning](#sectioning) to eliminate boilerplate for our predicate!

```haskell
filter' :: (a -> Bool) -> [a] -> [a]
filter' _ [] = []
filter' fn (x:xs)
  | fn x = x : filter' fn xs
  | otherwise = filter' fn xs

filter' (/= 2) [3, 2, 2, 3]   -- [3,3]
```

Javascript:

```javascript
function filter(fn, list = []) {
  if (list.length === 0) {
    return [];
  }
  const [x, ...xs] = list;

  return fn(x) ? [x, ...filter(fn, xs)] : filter(fn, xs);
}

filter(a => a !== 2, [3, 2, 2, 3]); // [3,3]
```

**largest multiple of 3829 under 100,000**
This problem introduces ways that we can use infinite sequences to our advantage in haskell.

```haskell
biggestMultiple' limit divisor = head $ filter p [limit, (limit - 1)..]
  where p x = x `mod` divisor == 0

biggestMultiple' 100000 3829   -- 99554
```

Javascript:
In javascript, we don't have lazy sequences baked in to the language, so we can use recursion to create our sequence for us.

```javascript
function biggestMultiple(limit, divisor) {
  if (limit <= 1 || divisor > limit) {
    return 1;
  }

  return limit % divisor === 0 ? limit : biggestMultiple(limit - 1, divisor);
}

biggestMultiple(100000, 3829); // 99554
```

**sum of all odd squares under a limit**

```haskell
sumOfOddSquares' :: Integral a => a -> a
sumOfOddSquares' limit = sum $ takeWhile (<limit) $ filter odd $ map (^2) [1..]
```

Javascript:
**CAVEAT** There is no longer any support for tail-call optimization for recursive calls in the v8 runtime (as of at least December 2017). Written recursively, this implementation has an upper limit at which there WILL be a stack overflow. However, 10,000 is ok for this case.

```javascript
function sumOfOddSquares(limit = 1, sum = 0, counter = 1) {
  const square = Math.pow(counter, 2);
  if (square > limit) {
    return sum;
  }

  const newSum = square % 2 !== 0 ? sum + square : sum;

  return sumOfOddSquares(limit, newSum, counter + 1);
}
```

**number of [Collatz sequences](https://en.wikipedia.org/wiki/Collatz_conjecture) above a certain length**

Of the sequences generated from a seed between 1 and 100, how many sequences have a length greater than `n`?

```haskell
  getCollatz :: Integral a => a -> [a]
  getCollatz n
    | n == 1 = [1]
    | odd n = n:getCollatz (n * 3 + 1)
    | otherwise = n: getCollatz (n `div` 2)

  bigCollatz :: Int
  bigCollatz limit = length $ filter (\x -> length x > limit) $ map getCollatz [1..100]
  bigCollatz 15  -- 66
```

Javascript:

```javascript
function getCollatz(n = 1) {
  if (n === 1) {
    return [1];
  }

  if (n % 2 !== 0) {
    return [n, ...getCollatz(n * 3 + 1)];
  }

  return [n, ...getCollatz(n / 2)];
}

function getBigCollatzes(minSize, seedLimit, acc = []) {
  if (seedLimit <= 1) {
    return acc.length;
  }

  const collatz = getCollatz(seedLimit);

  return collatz.length > minSize
    ? getBigCollatzes(minSize, seedLimit - 1, [...acc, collatz])
    : getBigCollatzes(minSize, seedLimit - 1, acc);
}

getBigCollatzes(15, 100); // 66
```

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
behavior, but does not support complex sequences. For infinite or more complex ranges, we can use generators. [See here](#infinite-sequences)

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

#### Lambda functions

In javascript, we are all familiar with lambdas, we simply know them as anonymous functions. The lamda function in haskell is notated like this:

```haskell
-- take an `x`, and add 1.
(\x -> x + 1)
```

We can use these in situations where it does not make sense to name and re-use the function later. Mapping over a list is often a good spot for this:

```haskell
incList xs = map (\x -> x + 1) xs

incList [1,2,3]   -- [2,3,4]
```

Javascript:

```javascript
function incList(list) {
  return list.map(x => x + 1);
}

incList([1, 2, 3]); // [2,3,4]
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

## Sectioning

Speaking of partial application, we can partially apply `infix` functions like `+` or `/` using **sectioning**. All this boils down to is using some parentheses. For example, let's think of a function we'll call `addTen`. This could be written:

```haskell
addTen x = x + 10

addTen 5   -- 15
```

Looking at that function, do we _really_ need the argument `x`? We can actually strip that out, because **`+`** is a function that can be partially applied!

```haskell
addTen = (+10)

addTen 5   -- 15
```

In case you were wondering, as I did: You can reverse the argument order when sectioning an infix:

```haskell
addTen = (10+)

addTen 5   -- 15
```

## Application

_AKA, `$`_

In haskell, we use spaces to provide arguments to functions, but what happens when we can't just use a space? Typically, we use parentheses for grouping, like so:

```haskell
length $ takeWhile (< 1000) (scanl1 (+) (map (^2) [1..]))
```

Yuck! We can clean this up using the `$` function. `$` tells the compiler to evaluate what is on the right hand side BEFORE it uses the result as an argument. In the example below, if we were to remove the final `$`, it would be akin to calling `scanl` with `(+)` and `map`, which is not what we are going for. So, when reading the example below, we read it from the bottom up. We are creating a list, scanning it with `(+)`, and stopping the list creation when whatever we are summing is greater than 1000. Finally, we take the length of that resulting list.

```haskell
length
  $ takeWhile (< 1000)
  $ scanl1 (+)
  $ map (^2) [1..]
```

## Composition

_AKA, `.`_

Ah, functional composition. It's wonderful! In JavaScript, we can also do this using a bunch of nested parentheses, or with utility functions like `Ramda.compose`. In haskell, we use the `.` function. The function aligns exactly with the mathematical definition:

```
(f • g)(x) = f(g(x))
```

The composition of the functions results in a function that, when executed with an argument, is equivalent to the result of the first function being executed with the result of the second function being executed with the argument. And, on and on it can go... TODO: reword this definition for clarity

Let's take an example where we map over an array of integers, and for each integer, we `+ 2` and `* 3`. We could write it like so:

```haskell
f' = map (+2) $ map (*3)

f' [1,2,3]   -- [9, 12, 15]
```

Or in Javascript:

```javascript
function f(list) {
  return list.map(add2).map(mult3);
}
```

Notice that we are iterating over a list twice, when in fact, we can get the same result by **composing** our transformation functions:

```haskell
f' = map ((*3) . (+2))

-- We can clean this up using the application function:
f' = map $ (*3) . (+2)

f' [1,2,3]   -- [9, 12, 15]
```

Javascript:

```javascript
function f(list) {
  return list.map(compose(mult3, add2));
}
```

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

# Folding

Folding in haskell is much akin to the concept of `reduce` for javascript arrays, but without some of the extra bells and whistles. For a fold in Haskell, we take a binary function (taking two arguments), an accumulator, and finally the list itself. The binary function provides as its first argument the current value of the accumulator, and the second argument is the current element in the list.

There are two flavors of folding in haskell: `foldl` (folding in a direction given a binary function and an accumulator, and later, a list), and `foldl1` (folding in a direction with the first element assigned as the initial value for the accumulator. This type can be called with just the binary, and later, the list.)

_In javascript, `Array.reduce` acts like `foldl1` unless it is given an initial value to use as an accumulator._

## Left folds

**Implementing `product` with `foldl`**

`foldl` is a left fold. All this means is that we are traversing the list from left to right while we accumulate.

```haskell
product' :: (Int a) => [a] -> a
product' list = foldl (*) 1 list

product' [1,2,3]   -- 6
```

Javascript:

```javascript
function product(list = []) {
  return list.reduce((a, b) => a * b, 1);
}

product([1, 2, 3]); // 6
```

## Right folds

Right folds operate like a left fold, which the exception being that they begin their operations from the **right hand** side of a list, and move toward the beginning.

TODO: _In haskell, the arguments for the binary accumulating function are also reversed, which does not show any immediate benefit to me at present. Is there a non-semantic reason for this?_

**implement `map` with a right fold**

Using a right fold to implement map in haskell is useful because we can take advantage of the `:` infix, which is more performant than the `++` infix (practically speaking, for really long lists). See below:

Using right fold: (note the use of `:` here, because we are starting at the end of the list)

```haskell
map' :: Foldable t => (t1 -> a) -> t t1 -> [a]
map' f = foldr (\x acc -> f x : acc) []

map' (+2) [1,2,3]  -- [3.4.5]
```

Using left fold: (note that since we start at the beginning, we are forced to use `++` to build our list)

```haskell
map' :: Foldable t => (t1 -> a) -> t t1 -> [a]
map' f = foldl (\acc x ->  acc ++ [f x]) []

map' (+2) [1,2,3]  -- [3.4.5]
```

Javascript (right fold):

```javascript
function map(fn) {
  return (list = []) => list.reduceRight(fn, []);
}

const add2Fold = (a, b) => [b + 2].concat(a);

map(add2Fold)([1, 2, 3]); // [3,4,5]
```

## Using folds

Here's a little collection of examples using folds to implement some standard built-in functions:

**maximum**

```haskell
maximum' :: (Ord a, Num a) => [a] -> a
maximum'= foldl1 (\a x -> if a > x then a else x)
```

Javascript:

```javascript
function maximum(list) {
  return list.reduce((a, b) => (a > b ? a : b));
}
```

**reverse**

```haskell
reverse' :: [a] -> [a]
-- Here is where the `flip` function can come in really handy!
reverse' = foldl (flip (:)) []
```

Javascript:

```javascript
function reverse(list) {
  return list.reduceRight((a, b) => [...a, b], []);
}
```

**product**

```haskell
product' :: (Num a) => [a] -> a
product' = foldl1 (*)
```

Javascript:

```javascript
function product(list) {
  return list.reduce((a, b) => a * b);
}
```

**filter**

```haskell
filter' :: (a -> Bool) -> [a] -> [a]
filter' fn = foldr (\x a -> if fn x then x:a else a) []
```

Javascript:

```javascript
function filter(pred) {
  return list => list.reduce((a, b) => (pred(b) ? [...a, b] : a), []);
}
```

**head**

```haskell
head' :: [a] -> a
-- `const` is a binary function that always returns its first argument
-- const 1 2 ==
head' = foldl1 const
```

Javascript:

```javascript
function head(list) {
  return list.reduce((a, _) => a);
}
```

**last**

```haskell
last' :: [a] -> a
last' = foldr1 (flip const)
```

Javascript:

```javascript
function last(list) {
  return list.reduceRight((a, _) => a);
}
```

# Scanning

'Scanning' refers to a way we can gain more information about how a fold is being executed. For instance, if we take the sum of a list of integers using `scanl`, we get back a list of the state of the sum for each step. (TODO better wording for this?) The scan functions in haskell correspond with the fold functions, and their general behavior. They are: `scanl`, `scanl1`, `scanr`, and `scanr1`.

**Tracking the state of a `sum` fold with `scanl1`**

We can see the current sum for each step in the folding process.

```haskell
sum' = scanl1 (+)

sum' [1,2,3,4,5]   -- [1,3,6,10,15]
```

Javascript:

Javascript does not have a `scan` function in its core library, but we can implement that functionality ourselves! Here is a quick and dirty implementation:

```javascript
function scanl(f) {
  return list =>
    list.reduce((a, b) => {
      const prev = a[a.length - 1];
      if (prev !== undefined) {
        return [...a, f(prev, b)];
      }
      return [...a, b];
    }, []);
}

scanl(add)([1, 2, 3, 4, 5]);
```

#### Infinite sequences

**How many times can we accumulate natural squares before we reach `1000`?**

```haskell
sumOfSquares' = length
              $ takeWhile (< 1000)
              $ scanl1 (+)
              $ map (^2) [1..]

sumOfSquares'  -- 13

-- If we remove the `length` call, we can see the results of `scanl`:
-- [1,5,14,30,55,91,140,204,285,385,506,650,819]
```

Javascript:

```javascript
// yield an infinite sequence of natural numbers.
function* ints() {
  let i = 1;
  while (true) {
    yield i++;
  }
}

// given an iterator, yield elements that satisfy a predicate until we reach one that doesn't.
function takeWhile(p) {
  return function*(iterator) {
    for (let x of iterator) {
      if (p(x)) {
        yield x;
      } else {
        return;
      }
    }
  };
}

// map an iterator
function mapIt(f) {
  return function*(it) {
    for (let x of it) {
      yield f(x);
    }
  };
}

// accumulate an iterator
function scanIt(f, initial) {
  return function*(it) {
    let acc = initial;
    for (let x of it) {
      yield (acc = f(acc, x));
    }
  };
}

const add = (a, b) => a + b;

// Get our iterator
const squares = mapIt(x => Math.pow(x, 2))(ints());

// accumulate the sum of squares until the the sum is greater than 1000.
const scanOfSquares = takeWhile(x => x < 1000)(scanIt(add, 0)(squares));

// spread all of the elements into an array so that we can count / inspect them.
const theAnswer = [...scanOfSquares];

theAnswer; // ​​​​​[ 1, 5, 14, 30, 55, 91, 140, 204, 285, 385, 506, 650, 819 ]​​​​​
theAnswer.length; // 13
```

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
