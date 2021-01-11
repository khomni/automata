import Automaton from "@src/automaton";
declare class Atom<U> implements Automaton.Evaluator<U> {
    id: string;
    name: string;
    private transform;
    constructor(definition: Atom.Definition);
    /**
     * @private
     * @param {Atom.Definition} definition - An object describing the transformation rule for this atom
     * @return {this}
     */
    private ingestAtomDefinition;
    /**
     *
     * @param {U} input -
     * @param {Automation.MetaData} meta -
     * @return {[U, Automation.MetaData]} A tuple of state and metadata
     */
    evaluate(input: U, meta: Automaton.MetaData): Array<[U, Automaton.MetaData]>;
}
declare module Atom {
    type Definition = {
        name?: string;
    };
}
export default Atom;
