const LinkedList = require('./LinkedList')

const chai = require('chai')
const assert = chai.assert

describe('Linked list tests', function() {
  let SinglyLinkedList
  beforeEach(() => (SinglyLinkedList = new LinkedList()))

  describe('Testing adding items to list', function() {
    it('should add an item at the begining of the list', function() {
      SinglyLinkedList.addLast(3)
      assert.equal(SinglyLinkedList.head.element, 3)
    })
    it('should add an item at the end of the list', function() {
      SinglyLinkedList.addToHead(1)
      assert.equal(SinglyLinkedList.head.element, 1)
    })
    it('should add an item at the bagining of the list multiple times', function() {
      SinglyLinkedList.addLast(3)
      SinglyLinkedList.addLast(4)
      SinglyLinkedList.addLast(5)
      assert.equal(SinglyLinkedList.printList(), '3 4 5 ')
    })
    it('should add an item at the end of the list multiple times', function() {
      SinglyLinkedList.addToHead(3)
      SinglyLinkedList.addToHead(4)
      SinglyLinkedList.addToHead(5)
      assert.equal(SinglyLinkedList.printList(), '5 4 3 ')
    })
  })
  describe('Testing delete from head', function() {
    it('should delete the first item in the list', function() {
      SinglyLinkedList.addLast(3)
      SinglyLinkedList.addLast(4)
      SinglyLinkedList.addLast(5)
      SinglyLinkedList.deletefromHead()
      assert.equal(SinglyLinkedList.printList(), '4 5 ')
    })
  })
  describe('Testing removing items from list', function() {
    it('should remove an item at the specified position', function() {
      SinglyLinkedList.addLast(3)
      SinglyLinkedList.addLast(4)
      SinglyLinkedList.addLast(5)
      SinglyLinkedList.addLast(6)
      SinglyLinkedList.deleteAt(2)
      assert.equal(SinglyLinkedList.printList(), '3 4 6 ')
    })
    it('should remove a specified item in a list', function() {
      SinglyLinkedList.addLast(3)
      SinglyLinkedList.addLast(4)
      SinglyLinkedList.addLast(5)
      SinglyLinkedList.addLast(6)
      SinglyLinkedList.delete(4)
      assert.equal(SinglyLinkedList.printList(), '3 5 6 ')
    })
  })
  describe('Testing finding items in a list', function() {
    it('should find an specific item in a list', function() {
      SinglyLinkedList.addLast(3)
      SinglyLinkedList.addLast(4)
      SinglyLinkedList.addLast(5)
      assert.equal(SinglyLinkedList.find(4), true)
    })
  })
  describe('Testing if the list is empty', function() {
    it('should not find any item in the list', function() {
      assert.equal(SinglyLinkedList.isEmpty(), true)
    })
  })
  describe('Testing list size', function() {
    it('should show the size of the list', function() {
      SinglyLinkedList.addLast(3)
      SinglyLinkedList.addLast(4)
      SinglyLinkedList.addLast(5)
      assert.equal(SinglyLinkedList.size_of_list(), 3)
    })
  })
  describe('Testing if the item was inserted at a defined position', function() {
    it('should find the inserted item at the defined position', function() {
      SinglyLinkedList.addLast(3)
      SinglyLinkedList.addLast(4)
      SinglyLinkedList.addLast(5)
      SinglyLinkedList.insertAt(6, 2)
      assert.equal(SinglyLinkedList.printList(), '3 4 6 5 ')
    })
  })
  describe('Testing sorting', function() {
    it('should display an array of sorted values', function() {
      SinglyLinkedList.addLast(11)
      SinglyLinkedList.addLast(7)
      SinglyLinkedList.addLast(25)
      SinglyLinkedList.addLast(31)
      SinglyLinkedList.addLast(101)
      SinglyLinkedList.addLast(-5)
      assert.equal(SinglyLinkedList.sort(), '-5 7 11 25 31 101')
    })
  })
})
