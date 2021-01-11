import Atom from "@src/atom";
import Tree from "@src/tree";
declare class Automaton<T, U, V> implements Automaton.Evaluator<U> {
    name: string;
    private evaluator;
    private in;
    private out;
    constructor(params: Automaton.Definition<T, U, V>);
    /**
     */
    get(input: T): V[];
    /**
     * Converts an input state using the configured evaluator
     * @param {T} input
     * @param {Automation.MetaData} meta -
     * @return {[T, Automation.MetaData]} A tuple of state and metadata
     */
    evaluate(input: U, meta: Automaton.MetaData): Array<[U, Automaton.MetaData]>;
}
declare module Automaton {
    type MetaData = {
        id: Symbol;
        index: number;
        accomplished: boolean;
    };
    type Definition<T, U, V> = {
        name?: string;
        definition: Tree.Definition | Atom.Definition;
        in: (input: T) => U;
        out: (state: U, meta: MetaData) => V;
    };
    interface Evaluator<U> {
        name: string;
        evaluate(input: U, meta: MetaData): Array<[U, MetaData]>;
    }
}
export default Automaton;
