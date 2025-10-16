import "@testing-library/jest-dom";
import { server } from "./tests/mocks/server";

// Start MSW mock server before tests
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
