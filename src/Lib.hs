module Lib (maximum', reverse', product') where 

  maximum' :: (Ord a, Num a) => [a] -> a
  maximum'= foldl1 (\a x -> if a > x then a else x)

  reverse' :: [a] -> [a]
  -- Here is where the `flip` function can come in really handy!
  reverse' = foldl (flip (:)) []

  product' :: (Num a) => [a] -> a
  product' = foldl1 (*)

  filter' :: (a -> Bool) -> [a] -> [a]
  filter' fn = foldr (\x a -> if fn x then x:a else a) []

  head' :: [a] -> a
  -- `const` is a binary function that always returns its first argument
  -- const 1 2 == 
  head' = foldl1 const

  last' :: [a] -> a
  last' = foldr1 (flip const)

  sumOfSquares' = length 
                $ takeWhile (< 1000) 
                $ scanl1 (+) 
                $ map (^2) [1..]

  f' = map $ (*3) . (+2) 
