class Node {
  constructor(element) {
    this.element = element //pastreaza data
    this.next = null //pastreaza pointerul catre urmatorul nod
  }
}

//vom crea o lista simpla
class LinkedList {
  //lista noastra va contine lungimea si un capat
  constructor() {
    this.length = 0
    this.head = null
  }

  //adauga item la inceputul listei
  addToHead(element) {
    let node = new Node(element) // declari nodul
    node.next = this.head  // urmatorul nod o sa fie capatul
    this.head = node //nodul curent este nodul
    this.length++ 
    return this
  }

  deletefromHead() {
    if ( this.length === 0){ //daca lungimea este = 0
      return undefined
    }
    const element = this.head.element //
    this.head = this.head.next
    this.length--
    
    return element
  }

  //o functie ce adauga iteme la finalul unei liste
  addLast(element) {
    let node = new Node(element) //vom crea nodul

    let current //loc in care sa stockezi nodul curent

    // cat timp lista este goala seteaza nodul
    //sa fie inceputul listei
    if (this.head === null) {
      this.head = node
    } else {
      current = this.head //setam nodul curent ca a fi capatul si
      while (current.next) {
        //iteream pana la finalul listei
        current = current.next
      }
      //adauga nodul
      current.next = node
    }
    this.length += 1
    console.log('Current length is: ', this.length)
  }

  //sterge un element din pozitia specificata
  deleteAt(index) {
    if (index > 0 && index > this.length) {
      return -1
    } else {
      let current, previous
      let iteration = 0
      current = this.head
      previous = current
      if (index === 0) {
        this.head = current.next
      } else {
        //itereaza in lista pana la pozitia unde sterge elementul
        while (iteration < index) {
          iteration++
          previous = current
          current = current.next
        }
        previous.next = current.next
      }
      this.length--
      console.log('Deleted item is: ' + current.element)
    }
  }

  //sterge un element din lista. Returneaza elementul
  //sters, daca nu,returneaza false
  delete(element) {
    let current = this.head
    let previous = this.head

    //itereaza peste lista
    while (current !== null) {
      //compara elementul cu cel curent, daca-l gaseste
      //il sterge si returneaza true
      if (current.element === element) {
        previous.next = current.next
        return current
      }
      else {
        previous = current
        current = current.next
      }
    }
    return false
  }

  //localizarea unui item
  find(element) {
    let current = this.head
    while (current !== null) {
      if (current.element === element) {
        return true
      }
      current = current.next
    }
    return false
  }

  //adauga un element la positia indicata intr-un index
  insertAt(element, index) {
    if (index > 0 && index > this.length) {
      return false
    } else {
      //cream un nou nod
      let node = new Node(element)
      let current, previous
      let iteration = 0

      current = this.head

      //adaugam elementul la primul index
      if (index === 0) {
        node.next = head
        this.head = node
      } else {
        current = this.head

        //iterate over the list fo find the position to insert

        while (iteration < index) {
          iteration++
          previous = current
          current = current.next
        }
        //adauga un element
        node.next = current
        previous.next = node
      }
      this.length++
    }
  }

  sort(){
    let array = []
    let current = this.head
    while(current !== null){
      array.push(current.element)
      current = current.next
    }

    let arrayLength = array.length

    for( let i = arrayLength - 1; i >= 0; i-- ){
      for( let index = 1; index <= i; index++ ) {
        if( array[index - 1] > array[index] ) {
          let temp = array[index - 1]
          array[index - 1] = array[index]
          array[index] = temp
        }
      }
    }
    return array.join(' ')
  }

  // verifica daca lista este goala
  isEmpty() {
    return this.length == 0
  }
  //afiseaza lungimea listei
  size_of_list() {
    return this.length
  }

  //printeaza continutul unei liste
  printList() {
    let current = this.head
    let string = ''
    while (current) {
      string += current.element + ' '
      current = current.next
    }
    return string
  }
}

module.exports = LinkedList

let SinglyLinkedList = new LinkedList()
console.log('Is the list empty? ' + SinglyLinkedList.isEmpty())
SinglyLinkedList.deletefromHead()
SinglyLinkedList.addLast(3)
SinglyLinkedList.addLast(4)
SinglyLinkedList.addToHead(1)
console.log('Current list is: ' + SinglyLinkedList.printList())
SinglyLinkedList.insertAt(5, 2)
console.log('Current list is: ' + SinglyLinkedList.printList())
SinglyLinkedList.deletefromHead()
console.log('Current list is: ' + SinglyLinkedList.printList())
SinglyLinkedList.addLast(6)
SinglyLinkedList.addLast(7)
console.log('Current list is: ' + SinglyLinkedList.printList())
console.log('Size of list is: ' + SinglyLinkedList.size_of_list())
SinglyLinkedList.deleteAt(3)
console.log('Is element removed? ', SinglyLinkedList.delete(3))
SinglyLinkedList.printList()
console.log('Is element removed? ', SinglyLinkedList.delete(10))
console.log('Current list is: ' + SinglyLinkedList.printList())
console.log('Found this element! ', SinglyLinkedList.find(6))
