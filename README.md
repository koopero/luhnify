# Luhnify

A simply node.js module to generate random [Luhn algorithm](https://en.wikipedia.org/wiki/Luhn_algorithm) sequences.

## Example

``` javascipt
var luhnify = require('luhnify')

// Random visa credit card number.
var cc = luhnify( '4### #### #### ####' )

// Random Canadian social insurance number.
var sin = luhnify( '###-###-###' )

// Also, validate sequences
luhnify.validate( sin ) === true
luhnify.validate( '123' ) === false
```

## API

### luhnify( sequence, token='#' )

Replace all `token` characters in `sequence` with digits between 0-9 and return a valid Luhn sequence.  

If a `Number` is provided, a sequence of that many digits will be returned.

The `token` argument will specific a token to replace other than '#'. This token must be a single character.

If no valid sequence can be generated ( no tokens to replace ), an `Error` will be thrown.

### validate( sequence )

Return `true` if a sequence is valid or `false` if it is not.
