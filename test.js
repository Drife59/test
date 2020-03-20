/*
20/30/2020

Benjamin GRASSART

Reduce tutorial.
This file is a test file which implement all the method in the following tutorial:
https://medium.com/@hkairi/reduce-le-couteau-suisse-du-d%C3%A9veloppeur-javascript-8cf4b6f98304

I was training in reduce.
*/

var tab=[1,2,3,4,5];

const add = (x,y) => x+y;
let total = tab.reduce( add, 0);
console.log("Total: " + total);


const addOne = (x) => x+1;
const newMap = function(transfo, collection){
    return collection.reduce( 
        function(acc, currentValue) {
            return acc.concat(transfo(currentValue));
        }, []);
    }
    
let newTab = newMap(addOne, tab);
console.log("tabMapped: " + newTab);

const filterTest = (x) => x > 2 ? x : null;

const newFilter = function(filterFct, collection){
    return collection.reduce( 
        function(acc, currentValue) {
            if(filterFct(currentValue) != null)
                return acc.concat(currentValue);
            else
                return acc;
        }, []);
    }

let tabFiltered = newFilter(filterTest, tab);
console.log("Tab filtered: " + tabFiltered);


let tabCarre = tab.reduce( 
    function(acc, currentValue) {
        return acc.concat(currentValue*currentValue);
    }, []);
console.log("Tab carre: " + tabCarre);

let tabInverse = tab.reduce( 
    function(acc, currentValue, currentIndex) {
        return acc.concat(tab[tab.length-1-currentIndex])
    }, []);

console.log("Tab inverse: " + tabInverse);

let tabWithDoublon = [1,1,2,3,4,4,4,5];

let tabUnique = tab.reduce( 
    function(acc, currentValue, currentIndex) {
        if(acc.includes(currentValue)){
            return acc;
        }
        return acc.concat(currentValue)
    }, []);

console.log("Tab unique: " + tabUnique);

const take = function(take, collection){
    return collection.reduce( 
        function(acc, currentValue) {
            if(acc < take)
                return acc.concat(currentValue);
            return acc;
        }, []);
    }

let tabTake = take(2, tab);
console.log("tabTake: " + tabTake);

let condition3 = (x) => x == 3;

const any = function(condition, collection){
    return collection.reduce( 
        function(acc, currentValue) {
            return acc || condition(currentValue);
            /*if(acc == true)
                return true;
            if(condition(currentValue))
                return true;
            return false;*/
        }, false);
    }

let anyTest = any(condition3, tab);

console.log("anyTest: " + anyTest);

const every = function(condition, collection){
    return collection.reduce( 
        function(acc, currentValue) {
            return acc && condition(currentValue);
            /*if(acc == true)
                return true;
            if(condition(currentValue))
                return true;
            return false;*/
        }, true);
    }

const tabEvery = [3,3,3,31];

let everyTest = every(condition3, tabEvery);
console.log("everyTest: " + everyTest);