import { expect } from 'chai';
import Trie from '../scripts/Trie'

describe('TDD with Trie', () => {
  let myTrie = new Trie();

  myTrie.insert("pizza");
  myTrie.insert("pin");
  myTrie.insert("pint");
  myTrie.insert("pie");
  myTrie.insert("pot");
 
  

  console.log(JSON.stringify(myTrie, null, 2));

  console.log(myTrie.getWords("pi"))

})
