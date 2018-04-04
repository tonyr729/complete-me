import { expect } from 'chai';
import Trie from '../scripts/Trie'

describe('TDD with Trie', () => {
  let myTrie = new Trie();

  let animaleArray = [ "cat", "dog", "horse", "zebra" ]
  myTrie.populate(animaleArray);
 
  

  console.log(JSON.stringify(myTrie, null, 2));

})
