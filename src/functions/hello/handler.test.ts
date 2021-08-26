describe('Teste Exemplo',() => {

    it('should exec funtion hello', ()=>{
        const number = 1;
    
        expect(number).toBe(1);
        expect(number).not.toBe(2);
        expect(number).toBeGreaterThan(0);
        expect(number).toEqual(1); // use object
    });

    it('should  check object', ()=>{
        const object = {name:"Felipe"};
        const other = {...object};
    
      
        expect(object).toEqual(other);
        expect(object).toHaveProperty('name');
        expect(object).toHaveProperty('name','Felipe');
    });

})

