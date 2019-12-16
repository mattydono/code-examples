import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';

const App = () => {

  // You know how to shallow copy objects and what it means {…obj}

  const obj = {a: 'a', b: 'b', c: 'c'}
  const newObj = obj
  newObj.a = 'A'

  console.log(obj.a) // A

  const obj2 = {a: 'a', b: 'b', c: 'c'}
  const newObj2 = {...obj2}
  newObj2.a = 'A'

  console.log(obj2.a) // a

  // Dynamic keys object[someProperty]

  const stocks = {
    AAPL: {
      symbol: 'AAPL',
      price: 100,
    },
    AMZN: {
      symbol: 'AMZN',
      price: 200,
    }
  }

  const deleteStock = symbol => {
    delete stocks[symbol]
  }

  deleteStock('AAPL')

  console.log(stocks) // {AMZN: {...}}

  // useState((prev)=>newState) -> why do we use a fn instead of an object here.

  // It allows us to access previous state whilst bypassing the need to list the dep in the dep array
  // this allows us to prevent any unnecessary re-renders & to safely mutate data without mutating state directly

  const initialGrads = {
    matt: {
      name: 'Matthew',
      age: 28,
    },
    alex: {
      name: 'Alex',
      age: 23,
    }
  }

  const [grads, setGrads] = useState(initialGrads)

  const deleteGrad = grad => {
    setGrads(prevGrads => {
      const newGrads = {...prevGrads}
      delete newGrads[grad]
      return newGrads
    })
  }

  console.log(grads) // {Alex: {...}}

  // How to delete a object property

  const keyObj = {
    matt: 'matt'
  }

  delete keyObj.matt
  console.log(keyObj) // {}

  // Object.values, Object.keys and Object.entries

  const ObjArr = {
    matt: 'matt donovan',
    alex: 'alex stein',
    cindy: 'cindy zhou',
    dan: 'dan abbassi',
  }

  Object.values(ObjArr) // ['matt donovan', 'alex stein', 'cindy zhou', 'dan abbassi']
  Object.keys(ObjArr) // ['matt', 'alex', 'cindy', 'dan']
  Object.entries(ObjArr) // [['matt', 'matt donovan'], ['alex', 'alex stein'], ['cindy', 'cindy zhou'], ['dan', 'dan abbassi']]

  // Sets, Maps, and objects - when to use them

  // sets = prevent duplicate values, key based as opposed to index based - easier to navigate, simpler syntax

  const ids = [1, 2, 3, 4, 5, 6, 3, 5, 7, 8, 9]

  const newArr = [...new Set(ids)]

  console.log(newArr) // [1 2 3 4 5 6 7 8 9]

  // objects = key/value pairs, keys are string/number/symbols, fast to create, simpler syntax, faster to create/access than a Map, direct JSON support

  const users = {
    matt: {
      name: 'matt',
      age: 28,
    },
    alex: {
      name: 'alex',
      age: 23,
    }
  }

  console.log(users.matt.name)

  // maps = preserves order of its keys, keys can be any primitive value + object, better performance for large data sets, built in iteration, a lot of adding/removing Map performs better than plain objects

  const myMap = new Map()

  myMap.set('matt', {age: 28}).set({name: 'alex'}, 23)

  myMap.forEach((key, value) => console.log(key, value))

  // Closures in relation hooks -> useEffect 

  // they close over the state owned by that render thus referring to the initial value of the component 

  const [count, setCount] = useState(0);

  useEffect(function() {
    setInterval(() => console.log(`Count is: ${count}`), 1000); // will always log 0
  }, []);

  // useEffect(function() {
  //   const interval = setInterval(() => console.log(`Count is: ${count}`), 1000); // will run when count changes and clears interval before next one is set - cleanup
  //   return () => clearInterval(interval)
  // }, [count]);

  // useRef - not just for dom elements

  // useRef provides us with a mutatable object that exists for the entire lifetime of the component

  const intervalRef = useRef()

  useEffect(() => {
    const id = setInterval(() => {
      console.log('hi')
    }, 1000)
    intervalRef.current = id
    return () => clearInterval(intervalRef.current)
  }, [])

  const cancelInterval = () => {
    clearInterval(intervalRef.current)
  }

  // useMemo

  // this will return a memoised value - if the inputs don't change it won't re-run

  const myTable = useMemo((columns, rows) => {
    return columns * rows
  })

  // you can use this on a component so that if props passed down don't change it won't re-render the component
  // it isn't guaranteed and should be used more as an optimisation

  // useCallback

  // similar to useMemo but returns a memoised callback, it will only change if deps change ie. use same values

  const age = 28

  const calcYearsLeft = useCallback(() => {
    return 100 - age
  }, [age])

  return (
    <div>
      Hi
      <button onClick={() => deleteGrad('matt')}>Bye Matt</button>
      <button onClick={() => setCount(count + 1)}>Inc</button>
      <button onClick={() => cancelInterval(count + 1)}>cancel interval</button>
    </div>
  );
}

export default App;
