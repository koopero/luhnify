module.exports = luhnify
module.exports.validate = validate

var repeat = require('lodash.repeat')
  , isNumber = require('lodash.isnumber')
  , regexescape = require("regex-escape")

function validate ( str ) {
  var sum = 0
    , even = false

  str = reverseString( str )

  str.replace( /[0-9]/g, function ( digit ) {
    sum += parseDigit( digit, even )
    even = !even
  })

  return sum % 10 == 0
}


function luhnify ( str, token ) {

  if ( token === undefined )
    token = '#'

  if ( 'string' != typeof token || token.length != 1 )
    throw new TypeError('token must be single character')

  if ( isNumber( str ) )
    str = repeat( token, str )

  str = reverseString( str )

  var sum = 0
    , even = false
    , replacements = []
    , tokenEsc = regexescape( token )
    , regex = new RegExp( '[0-9'+tokenEsc+']', 'g' )

  str.replace( regex, function ( digit, index ) {
    if ( digit == token ) {
      replacements.push( {
        index: index,
        even: even
      })
    } else {
      sum += parseDigit( digit, even )
    }
    even = !even
  })

  str = str.split('')

  var i = 0
    , last = replacements.length - 1

  for ( ; i <= last ; i ++ ) {
    var replace = replacements[i]
      , digit =
        i < last ?
        randomDigit()
        : lastDigit( sum, replace.even )

    str[replace.index] = digit
    sum += parseDigit( digit, replace.even )
  }

  str = str.join('')
  str = reverseString( str )

  if ( sum % 10 != 0 )
    throw new Error('Could not resolve sequence')

  return str
}

function randomDigit() {
  return Math.floor( Math.random() * 10 ).toFixed()
}

function lastDigit( sum, even ) {
  var remain = ( 10 - sum % 10 ) % 10
  return even ?
    remain & 1 ?
      9 - ( 9 - remain ) / 2
      : remain / 2
    : remain
}


function parseDigit( digit, even ) {
  digit = parseInt( digit )
  if ( even )
    digit *= 2

  if ( digit >= 10 )
    digit -= 9

  return digit
}


function reverseString(str) {
  var newString = "";
  for (var i = str.length - 1; i >= 0; i--) {
    newString += str[i];
  }
  return newString;
}
