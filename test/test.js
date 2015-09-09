var assert = require('chai').assert
  , mod = require('../index')
  , validate = mod.validate
  , generate = mod.generate

describe( 'validate', function () {

  it('will validate credit card numbers', function () {
    // Data from http://www.getcreditcardnumbers.com/
    assert.equal( validate( '4929474127112453' ), true )
    assert.equal( validate( '4929474127112452' ), false )
  })

  it('will ignore non-numeric characters', function () {
    assert.equal( validate( '   60110 A 70319112618' ), true )
    assert.equal( validate( '60110703191  12618' ), true )
    assert.equal( validate( '60 11070 319112 618  ' ), true )
    assert.equal( validate( '60110703191126A XXX  18' ), true )
  })

})

describe( 'generate', function () {
  it('will generate numbers in a required format', function () {
    var num = generate('###')
    assert.isString( num )
    assert.match( num, /\d\d\d/ )
    assert( validate( num ) )
  })

  it('will use existing numbers when generating ', function () {
    var num = generate('4##')
    assert.isString( num )
    assert.match( num, /4\d\d/ )
    assert( validate( num ) )
  })

  it('will pass characters other than #', function () {
    var num = generate('## ABC ##')
    assert.isString( num )
    assert.match( num, /\d\d ABC \d\d/ )
    assert( validate( num ) )
  })

  it('will return already validate sequences unchanged', function () {
    var num = generate('43')
    assert.isString( num )
    assert.equal( num, '43' )
    assert( validate( num ) )
  })

  it('will throw an exception when passed in invalid sequence', function () {
    assert.throws( function () {
      generate('44')
    })
  })

  it('will Luhnify an almost-finished sequence', function () {
    var num = generate('3779 474# 6307 647')
    assert.equal( num, '3779 4747 6307 647')
    assert( validate( num ) )
  })
})
