import Automaton from "@src/automaton";

class Atom<U> implements Automaton.Evaluator<U> {
    id: string;
    name: string = "Atom";

    private transform: (input: U) => U | void = (input: U) => input; // NOOP

    constructor(definition: Atom.Definition) {
        this.ingestAtomDefinition(definition);
    }

    /**
     * @private
     * @param {Atom.Definition} definition - An object describing the transformation rule for this atom
     * @return {this}
     */
    private ingestAtomDefinition(definition: Atom.Definition): this {
        if (definition.name) this.name = definition.name;

        // TODO: interpret Atomic modification through definition
        return this;
    }

    /**
     *
     * @param {U} input -
     * @param {Automation.MetaData} meta -
     * @return {[U, Automation.MetaData]} A tuple of state and metadata
     */
    evaluate(
        input: U,
        meta: Automaton.MetaData
    ): Array<[U, Automaton.MetaData]> {
        const transformation = this.transform(input);

        return [
            [
                transformation || input,
                {
                    id: Symbol(this.name),
                    index: meta.index + 1,
                    accomplished: meta.accomplished && Boolean(transformation),
                },
            ],
        ];
    }
}

module Atom {
    export type Definition = {
        name?: string;
    };
}

export default Atom;
