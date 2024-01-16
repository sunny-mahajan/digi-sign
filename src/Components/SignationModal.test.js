import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import SignationModal from "./SignationModal";
import { setupJestCanvasMock } from "jest-canvas-mock";

describe("SignationModal", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    setupJestCanvasMock();
  });

  it("renders without errors", () => {
    render(<SignationModal />);
    // You can add assertions based on your component's rendering
  });

  it("opens the signatureModal when the sign button is clicked", async () => {
    const { getByText, queryByTestId } = render(<SignationModal />);

    // Initially, the modal should not be in the document
    expect(queryByTestId("signatureModal")).toBeNull();

    // Click the "sign" button to open the modal
    fireEvent.click(getByText("sign"));

    // Wait for the modal to be in the document
    await waitFor(() => {
      expect(queryByTestId("signatureModal")).toBeInTheDocument();
    });
  });

  it('switches tabs when clicking on the "Draw" and "Type" tabs', async () => {
    const onSaveMock = jest.fn();
    const { getByText, getByTestId } = render(
      <SignationModal onSave={onSaveMock} />
    );

    // Open the modal
    fireEvent.click(getByText("sign"));

    // Initially, the "Type" tab should be active
    expect(getByTestId("signatureModalCanvas")).toBeInTheDocument();
    expect(getByText("Type")).toHaveClass("active");
    expect(getByText("Draw")).not.toHaveClass("active");

    // Switch to the "Type" tab
    fireEvent.click(getByText("Draw"));

    // Wait for the tab switch to complete
    await waitFor(() => {
      // Now, the "Draw" tab should be active
      expect(getByTestId("signatureModalCanvas")).toBeInTheDocument();
      expect(getByText("Type")).not.toHaveClass("active");
      expect(getByText("Draw")).toHaveClass("active");
    });
  });
});
