var assert = require('chai').assert
  , mod = require('../index')
  , luhnify = mod
  , validate = mod.validate

describe( 'luhnify', function () {

  it('will take number as input', function () {
    var num = luhnify( 6 )
    assert.isString( num )
    assert.match( num, /\d{6}/ )
    assert( validate( num ) )
  })


  it('will luhnify numbers in a required format', function () {
    var num = luhnify('###')
    assert.isString( num )
    assert.match( num, /\d\d\d/ )
    assert( validate( num ) )
  })

  it('will use existing numbers when generating ', function () {
    var num = luhnify('4##')
    assert.isString( num )
    assert.match( num, /4\d\d/ )
    assert( validate( num ) )
  })

  it('will pass characters other than #', function () {
    var num = luhnify('## ABC ##')
    assert.isString( num )
    assert.match( num, /\d\d ABC \d\d/ )
    assert( validate( num ) )
  })

  it('will return already valid sequences unchanged', function () {
    var num = luhnify('34')
    assert.isString( num )
    assert.equal( num, '34' )
    assert( validate( num ) )
  })

  it('will throw an exception when passed in invalid sequence', function () {
    assert.throws( function () {
      luhnify('44')
    })
  })

  it('will Luhnify an almost-finished sequence', function () {
    var num = luhnify('3779 474# 6307 647')
    assert.equal( num, '3779 4747 6307 647')
    assert( validate( num ) )
  })

  it('will take a different token', function () {
    var num = luhnify('5__', '_')
    assert.isString( num )
    assert.match( num, /5\d\d/ )
    assert( validate( num ) )
  })
})


describe( 'validate', function () {

  it('will validate credit card numbers', function () {
    // Data from http://www.getcreditcardnumbers.com/
    assert.equal( validate( '4929474127112453' ), true )
    assert.equal( validate( '4929474127112452' ), false )
  })

  it('will validate more credit card numbers', function () {
    // Data from http://www.getcreditcardnumbers.com/
    assert.equal( validate( '4012888888881881' ), true )
  })

  it('will ignore non-numeric characters', function () {
    assert.equal( validate( 'A608 B188 C272' ), true )
  })

})
