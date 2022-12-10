class Kalender {

    #dagen = null

    constructor(dagen) {
        this.#dagen = dagen;
    }

    * getVieringen() {
        for (const dag in this.#dagen) {
            yield new Viering(dag)
        }
    }
}


class Viering {
    constructor(dag) {
        this.dag = dag;
    }
}