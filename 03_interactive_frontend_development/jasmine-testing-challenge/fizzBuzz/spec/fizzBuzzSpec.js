describe('FizzBuzz', function() {
  beforeEach(function() {
    fb = new fizzBuzz();
  });
  describe('fizzBuzz Tests', function() {
    it('should return Error! if NaN', function() {
      expect(fizzBuzz('hi')).toBe('Error!');
    });
    it('3 should return 3', function() {
      expect(fizzBuzz(3)).toBe('Fizz');
    });
    it('9 should return Fizz', function() {
      expect(fizzBuzz(9)).toBe('Fizz');
    });
    it('5 should return Buzz', function() {
      expect(fizzBuzz(5)).toBe('Buzz');
    });
    it('15 should return FizzBuzz', function() {
      expect(fizzBuzz(15)).toBe('FizzBuzz');
    });
    it('4 should return FizzBuzz', function() {
      expect(fizzBuzz(4)).toBe(4);
    });
  });
});
