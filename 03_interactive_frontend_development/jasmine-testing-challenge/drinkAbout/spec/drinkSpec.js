describe('Drink About', function() {
  describe('Age tests', function() {
    it('should return, "Sorry. I can\'t tell what drink because that age is incorrect!"', function() {
      expect(whatCanIDrink(-1)).toBe(
        "Sorry. I can't tell what drink because that age is incorrect!"
      );
    });
    it('should return, "Sorry. I can\'t tell what drink because that age is incorrect!" if not a number', function() {
      expect(whatCanIDrink('Rick')).toBe(
        "Sorry. I can't tell what drink because that age is incorrect!"
      );
    });
    it('should return, "Drink Toddy"', function() {
      expect(whatCanIDrink(10)).toBe('Drink Toddy');
    });
    it('should return, "Drink Coke"', function() {
      expect(whatCanIDrink(17)).toBe('Drink Coke');
    });
    it('should return, "Drink Beer"', function() {
      expect(whatCanIDrink(18)).toBe('Drink Beer');
    });
    it('should return, "Drink Beer"', function() {
      expect(whatCanIDrink(19)).toBe('Drink Beer');
    });
    it('should return, "Drink Coke"', function() {
      expect(whatCanIDrink(120)).toBe('Drink Whisky');
    });
    it('should return, "Drink Coke"', function() {
      expect(whatCanIDrink(17)).toBe('Drink Coke');
    });
  });
});
