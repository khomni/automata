import Automaton from "@src/automaton";
import Atom from "@src/atom";
declare class Tree<U> implements Automaton.Evaluator<U> {
    name: string;
    private nodes;
    constructor(definition: Tree.Definition);
    private ingestTreeDefinition;
    /**
     * pipes the input state through each of the nodes in series
     * @param {U} input -
     * @param {Automation.MetaData} meta -
     * @return {[U, Automation.MetaData]} A tuple of state and metadata
     */
    evaluate(input: U, meta: Automaton.MetaData): Array<[U, Automaton.MetaData]>;
}
declare module Tree {
    type Definition = {
        name?: string;
        children: Array<Definition | Atom.Definition>;
    };
}
export default Tree;
