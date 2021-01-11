import Atom from "@src/atom";
import Tree from "@src/tree";

class Automaton<T, U, V> implements Automaton.Evaluator<U> {
  name: string = "Automaton";
  private evaluator: Automaton.Evaluator<U>;
  private in: Automaton.In<T, U>;
  private out: Automaton.Out<U, V>;

  constructor(params: {
    in: Automaton.In<T, U>;
    out: Automaton.Out<U, V>;
    definition: Automaton.Definition | Atom.Definition;
  }) {
    if (params.definition.name) {
      this.name = params.definition.name;
    }

    if (params.in) this.in = params.in;
    if (params.out) this.out = params.out;

    if ("children" in params.definition) {
      this.evaluator = new Tree(params.definition);
    } else {
      this.evaluator = new Atom(params.definition);
    }
  }

  /**
   */
  get(input: T): V[] {
    const meta = { id: Symbol(this.name), index: 0, accomplished: true };
    const state = this.in(input);

    const evaluations = this.evaluate(state, meta);
    console.log("EVALUATIONS", evaluations);

    return evaluations
      .filter(([state, meta]) => meta.accomplished)
      .map(([state, meta]) => this.out(state, meta));
  }

  /**
   * Converts an input state using the configured evaluator
   * @param {T} input
   * @param {Automation.MetaData} meta -
   * @return {[T, Automation.MetaData]} A tuple of state and metadata
   */
  evaluate(input: U, meta: Automaton.MetaData): Array<[U, Automaton.MetaData]> {
    return this.evaluator.evaluate(input, meta);
  }
}

module Automaton {
  export type MetaData = {
    id: Symbol;
    index: number;
    accomplished: boolean;
  };

  export interface In<T, U> {
    (input: T): U;
  }

  export interface Out<U, V> {
    (input: U, meta: MetaData): V;
  }

  export type Definition = Tree.Definition | Atom.Definition;

  export interface Evaluator<U> {
    name: string;
    evaluate(input: U, meta: MetaData): Array<[U, MetaData]>;
  }
}

export default Automaton;
