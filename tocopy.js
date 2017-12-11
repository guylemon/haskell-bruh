// maximum' :: (Ord a, Num a) => [a] -> a
// maximum'= foldl1 (\a x -> if a > x then a else x)

// reverse' :: [a] -> [a]
// -- Here is where the `flip` function can come in really handy!
// reverse' = foldl (flip (:)) []

// product' :: (Num a) => [a] -> a
// product' = foldl1 (*)

// filter' :: (a -> Bool) -> [a] -> [a]
// filter' fn = foldr (\x a -> if fn x then x:a else a) []

// head' :: [a] -> a
// -- `const` is a binary function that always returns its first argument
// -- const 1 2 ==
// head' = foldl1 const

// last' :: [a] -> a
// last' = foldr1 (flip const)
Function.prototype['¯_(ツ)_/¯'] = function(fn) {
  return x => this(fn(x));
};

function* ints() {
  let i = 1;
  while (true) {
    yield i++;
  }
}

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

function mapIt(f) {
  return function*(it) {
    for (let x of it) {
      yield f(x);
    }
  };
}

function scanIt(f, initial) {
  return function*(it) {
    let acc = initial;
    for (let x of it) {
      yield (acc = f(acc, x));
    }
  };
}

const add = (a, b) => a + b;

const squares = mapIt(x => Math.pow(x, 2));
const roots = mapIt(Math.sqrt);

const scanOfSquares = takeWhile(x => x < 1000)
  ['¯_(ツ)_/¯'](scanIt(add, 0))
  ['¯_(ツ)_/¯'](squares);

const theAnswer = [...scanOfSquares(ints())];

theAnswer; // ​​​​​[ 1, 5, 14, 30, 55, 91, 140, 204, 285, 385, 506, 650, 819 ]​​​​​
theAnswer.length; // 13

Function.prototype['¯_(ツ)_/¯'] = function(fn) {
  return x => this(fn(x));
};

const times2 = x => x * 2;
const add3 = x => x + 3;
const sayHello = x => 'hello ' + x;

const shrugs = sayHello['¯_(ツ)_/¯'](times2)['¯_(ツ)_/¯'](add3);

shrugs(2); // 10
