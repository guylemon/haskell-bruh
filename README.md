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
| `Math.min(x, y)` | `min x y`      |
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

### The `let` keyword

`let` can be used to define a name inside of `ghci`.

In a module, there is a different use for `let` which I do not know yet, but
will get there soon.
