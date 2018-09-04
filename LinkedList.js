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

  //adaugaitem la inceputul listei
  addToHead(element) {
    var node = new Node(element)
    node.next = this.head
    this.head = node
    this.length++
    return this
  }

  //o functie ce adauga iteme la finalul unei liste
  addLast(element) {
    var node = new Node(element) //vom crea nodul

    var current //loc in care sa stockezi nodul curent

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
  deleteFrom(index) {
    if (index > 0 && index > this.length) {
      return -1
    } else {
      var current, previous
      var iteration = 0
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
    var current = this.head
    var previous = null

    //itereaza peste lista
    while (current != null) {
      //compara elementul cu cel curent, daca-l gaseste
      //il sterge si returneaza true
      if (current.element === element) {
        if (previous == null) {
          this.head = current.next
        } else {
          previous.head = current.next
        }
        this.length--
        return current.element
      }
      previous = current
      current = current.next
    }
    return false
  }

  //localizarea unui item
  find(element) {
    var current = this.head
    while (current) {
      if (current.element === element) {
        return this.current
      }
      current = current.next
    }
    return current
  }

  //adauga un element la positia indicata intr-un index
  insertAt(element, index) {
    if (index > 0 && index > this.length) {
      return false
    } else {
      //cream un nou nod
      var node = new Node(element)
      var current, previous
      var iteration = 0

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
  // verifica daca lista este goala
  isEmpty() {
    return this.length == 0
  }
  //afiseaza lungimea listei
  size_of_list() {
    console.log('Size of list is: ' + this.length)
  }

  //printeaza continutul unei liste
  printList() {
    var current = this.head
    var string = ''
    while (current) {
      string += current.element + ' '
      current = current.next
    }
    console.log('Current list is: ' + string)
  }
}
var SinglyLinkedList = new LinkedList()
console.log('Is the list empty? ' + SinglyLinkedList.isEmpty())
SinglyLinkedList.addLast(3)
SinglyLinkedList.addLast(4)
SinglyLinkedList.addToHead(1)
SinglyLinkedList.printList()
SinglyLinkedList.insertAt(5, 2)
'Current list is: ' + SinglyLinkedList.printList()
SinglyLinkedList.addLast(6)
SinglyLinkedList.addLast(7)
'Current list is: ' + SinglyLinkedList.printList()
SinglyLinkedList.size_of_list()
SinglyLinkedList.deleteFrom(3)
console.log('Is element removed? ' + SinglyLinkedList.delete(3))
SinglyLinkedList.printList()
console.log('Is element removed? ' + SinglyLinkedList.delete(10))
console.log('Found this element! ' + SinglyLinkedList.find(3))
