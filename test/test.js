describe('test',function(){
    var todoList;
    beforeEach(module('todo'));
    beforeEach(inject(function(_TodoList_){
        todoList = _TodoList_;
    }));

    describe('todo',function(){
        it('should work',function(){
            expect(new todoList).to.have.deep.property('todos[0].text','Learn Angular');
            expect(new todoList).to.have.deep.property('todos[1].text','Work hads');
        })
    })
})