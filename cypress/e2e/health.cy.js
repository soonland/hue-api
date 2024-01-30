describe('Server finds services', () => {
  
  context('Found service', () => {
    it('Found AirPlay', () => {
      cy.request({ method: 'POST', url: 'http://localhost:5000/api/discovery' });
    });
  });
});
