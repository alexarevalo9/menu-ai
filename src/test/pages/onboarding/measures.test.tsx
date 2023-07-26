import { render } from "@testing-library/react";
import MeasuresPage from "@/pages/onboarding/measures";
import * as rtNextRouter from "next/router";

const nextRouter: any = rtNextRouter as jest.MockOptions;
nextRouter.useRouter = jest.fn();
const mockPush = jest.fn();

describe("Test <MeasuresPage/> ", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  beforeEach(() => {
    nextRouter.useRouter.mockImplementation(() => ({
      push: mockPush,
      pathname: "/",
    }));
  });

  describe("When render measures page", () => {
    it("should show inputs and controls", () => {
      const screen = render(<MeasuresPage />);

      expect(screen.getByText("Back")).toBeInTheDocument();
      expect(screen.getByText("Next")).toBeInTheDocument();
    });
  });
});
