import Automaton from "@src/automaton";
import Atom from "@src/atom";

class Tree<U> implements Automaton.Evaluator<U> {
    name: string = "Tree";
    private nodes: Array<Automaton.Evaluator<U>> = [];

    constructor(definition: Tree.Definition) {
        this.ingestTreeDefinition(definition);
    }

    private ingestTreeDefinition(definition: Tree.Definition): this {
        if (definition.name) this.name = definition.name;

        for (const child of definition.children) {
            if ("children" in child) {
                const tree = new Tree<U>(child);
                this.nodes.push(tree);
            } else {
                const atom = new Atom<U>(child);
                this.nodes.push(atom);
            }
        }

        return this;
    }

    /**
     * pipes the input state through each of the nodes in series
     * @param {U} input -
     * @param {Automation.MetaData} meta -
     * @return {[U, Automation.MetaData]} A tuple of state and metadata
     */
    evaluate(
        input: U,
        meta: Automaton.MetaData
    ): Array<[U, Automaton.MetaData]> {
        const results: Array<[U, Automaton.MetaData]> = [[input, meta]];

        let workingState = input;
        let workingMeta = meta;

        for (const node of this.nodes) {
            const [[lastState, lastMeta]] = results;
            const subResults = node.evaluate(lastState, lastMeta);
            results.unshift(...subResults);
        }

        return results.slice(undefined, -1);
    }
}

module Tree {
    export type Definition = {
        name?: string;
        children: Array<Definition | Atom.Definition>;
    };
}

export default Tree;
