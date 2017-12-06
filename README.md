# haskell-bruh 💪

_Notes on beginning haskell from the point of view of a javascript programmer_

# Resources

_VsCode setup article:
https://medium.com/@dogwith1eye/setting-up-haskell-in-vs-code-on-macos-d2cc1ce9f60a_
<br>_Haskell Tutorial: http://learnyouahaskell.com/_

# Notes

[REPL](#ghci)

[Primitives](#primitives)

[Lists](#lists)

* [List operations](#list-operations)
* [Ranges](#ranges)
* [List Comprehension](#list-comprehension)

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

| Node                        | Haskell                | _description_                                        |
| --------------------------- | ---------------------- | ---------------------------------------------------- |
| `require('path/to/module')` | `:l path/to/module.hs` | load a module's functions into scope                 |
| _none I know of_            | `:r`                   | refresh loaded modules after a file has been changed |
| `^C ^C`                     | `:q`                   | Exit the REPL                                        |

<br>

---

# Primitives

This section refers to the basic types (boolean, number, string, function).
_Primitive Types_ in this context may be a bit of a technical misnomer because
of differences between javascript and haskell that I don't yet understand, but I
hope it will serve well enough to get the point across.

## Booleans

| JS              | Haskell         | _notes_ |
| --------------- | --------------- | ------- |
| `true`, `false` | `True`, `False` |
| `!true`         | `not True`      |

## Numbers

| JS               | Haskell   | _notes_          |
| ---------------- | --------- | ---------------- |
| `++x`            | `succ x`  | successor method |
| `Math.min(x, y)` | `min x y` |

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
>
> <br>

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
["f", "o", "o"]
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

Tuples are a way to express a group of values with a fixed _size_, when the
_type_ of each value is also known. Tuples are grouped with parentheses, and can
contain mixed types, unlike a list. For instance, `(1, 2)` is a `number` tuple,
and `("Guy", 2)` is a tuple with a `string` as its first member, and a `number`
as its second member.

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
variable and function names. _There are some notable exceptions -- see the
`censor` example in list comprehensions._

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
