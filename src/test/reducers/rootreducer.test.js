import rootReducer from "../../reducers/rootreducer";

describe("Testing root reducer", () => {
    it("Calls root reducer", () => {
        expect(rootReducer.name).toBe("combination");
    });
});