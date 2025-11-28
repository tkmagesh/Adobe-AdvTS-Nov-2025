// __tests__/reducer.test.ts
import { applyEvent } from "../src/events";
import { Event, Loan } from "../src/types";

describe("applyEvent reducer", () => {
    test("LoanApplied results in applied state", () => {
        const applied = applyEvent(undefined, {
            type: "LoanApplied",
            payload: {
                loanId: "L1",
                userId: "U1",
                amount: 5000,
                submittedAt: "2024-01-01T00:00:00Z",
            },
        });

        expect(applied.state).toBe("applied");
    });

    test("LoanApproved transitions applied → approved", () => {
        const applied = applyEvent(undefined, {
            type: "LoanApplied",
            payload: {
                loanId: "L1",
                userId: "U1",
                amount: 5000,
                submittedAt: "2024-01-01T00:00:00Z",
            },
        });

        const approved = applyEvent(applied, {
            type: "LoanApproved",
            payload: {
                loanId: "L1",
                approvedBy: "Manager",
                approvedAt: "2024-01-02T00:00:00Z",
            },
        });

        expect(approved.state).toBe("approved");

        // 🔍 Narrow before accessing "approvedBy"
        if (approved.state === "approved") {
            expect(approved.approvedBy).toBe("Manager");
        }
    });

    test("LoanDisbursed transitions approved → disbursed", () => {
        const approved = {
            loanId: "L1",
            userId: "U1",
            amount: 1000,
            state: "approved" as const,
            approvedAt: "2024-01-02T00:00:00Z",
            approvedBy: "Manager",
        };

        const disbursed = applyEvent(approved, {
            type: "LoanDisbursed",
            payload: {
                loanId: "L1",
                transactionId: "TX123",
                disbursedAt: "2024-01-03T00:00:00Z",
            },
        });

        expect(disbursed.state).toBe("disbursed");

        // Narrow
        if (disbursed.state === "disbursed") {
            expect(disbursed.transactionId).toBe("TX123");
        }
    });

    test("LoanClosed transitions disbursed → closed", () => {
        const disbursed = {
            loanId: "L1",
            userId: "U1",
            amount: 1000,
            state: "disbursed" as const,
            disbursedAt: "2024-01-03T00:00:00Z",
            transactionId: "TX123",
        };

        const closed = applyEvent(disbursed, {
            type: "LoanClosed",
            payload: {
                loanId: "L1",
                reason: "paid",
                closedAt: "2024-02-01T00:00:00Z",
            },
        });

        expect(closed.state).toBe("closed");

        // 🔍 Narrowing fixes your error
        if (closed.state === "closed") {
            expect(closed.reason).toBe("paid");
        }
    });
});
