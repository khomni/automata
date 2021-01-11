# Automata

Compose and execute finite state machines with JSON

## Philosophy

## Glossary

### Automaton

An **Automaton** is a Finite State Automaton comprised of the modules available in this system.

An automaton takes in an input of a particular type, converts it to an initial state, runs that initial state through a set of evaluators, and returns a list of states

### Tree

A **Tree** is a declaration of atoms and how they relate to each other.

### Atom

An **Atom** is a single node of an Automata system that describes a transformation of inputs.

## Examples

```
{
  "name": "Inventory"
}

```

```
// index.js
import Automaton from "automata";

import definition from "./definition.json";

const automaton = new Automaton({
  definition,
  in: (input) => input,
  out: ({assertion, counter}) => counter)
});

automaton.get({
  name: "widget",
  inventory: 12,
  cost: 1024
})


```
