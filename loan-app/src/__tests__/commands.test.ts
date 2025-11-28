// __tests__/commands.test.ts
import { handleCommand } from "../commands";
import { applyEvent } from "../events";
import { Command, Event, DomainError } from "../types";

/**
 * Rebuild aggregate state via reducer
 */
function replay(events: Event[]) {
    return events.reduce((acc, e) => applyEvent(acc, e), undefined as any);
}

describe("handleCommand", () => {
    test("ApplyLoan produces LoanApplied event", () => {
        const cmd: Command = {
            type: "ApplyLoan",
            payload: { loanId: "L1", userId: "U1", amount: 1000 },
        };

        const events = handleCommand(undefined, cmd);

        expect(events).toHaveLength(1);
        expect(events[0].type).toBe("LoanApplied");
    });

    test("ApproveLoan allowed after ApplyLoan", () => {
        const applyEvents = handleCommand(undefined, {
            type: "ApplyLoan",
            payload: { loanId: "L1", userId: "U1", amount: 2000 },
        });

        const loan = replay(applyEvents);

        const approveEvents = handleCommand(loan, {
            type: "ApproveLoan",
            payload: { loanId: "L1", approver: "Manager" },
        });

        expect(approveEvents[0].type).toBe("LoanApproved");

        // 🔍 Narrow the union BEFORE accessing approvedBy
        if (approveEvents[0].type === "LoanApproved") {
            expect(approveEvents[0].payload.approvedBy).toBe("Manager");
        }
    });

    test("ApproveLoan fails unless loan is applied", () => {
        const events1 = handleCommand(undefined, {
            type: "ApplyLoan",
            payload: { loanId: "L1", userId: "U1", amount: 2000 },
        });

        const loan1 = replay(events1);

        const events2 = handleCommand(loan1, {
            type: "ApproveLoan",
            payload: { loanId: "L1", approver: "Manager" },
        });

        const loan2 = replay([...events1, ...events2]);

        expect(() =>
            handleCommand(loan2, {
                type: "ApproveLoan",
                payload: { loanId: "L1", approver: "Boss" },
            })
        ).toThrow(DomainError);
    });

    test("DisburseLoan allowed only after approval", () => {
        const e1 = handleCommand(undefined, {
            type: "ApplyLoan",
            payload: { loanId: "L2", userId: "U2", amount: 5000 },
        });

        const loan1 = replay(e1);

        const e2 = handleCommand(loan1, {
            type: "ApproveLoan",
            payload: { loanId: "L2", approver: "Officer" },
        });

        const loan2 = replay([...e1, ...e2]);

        const e3 = handleCommand(loan2, {
            type: "DisburseLoan",
            payload: { loanId: "L2", transactionId: "TX123" },
        });

        expect(e3[0].type).toBe("LoanDisbursed");

        if (e3[0].type === "LoanDisbursed") {
            expect(e3[0].payload.transactionId).toBe("TX123");
        }
    });

    test("DisburseLoan rejects if not approved", () => {
        const applied = handleCommand(undefined, {
            type: "ApplyLoan",
            payload: { loanId: "L3", userId: "U3", amount: 10000 },
        });

        const loan = replay(applied);

        expect(() =>
            handleCommand(loan, {
                type: "DisburseLoan",
                payload: { loanId: "L3", transactionId: "XFAIL" },
            })
        ).toThrow(DomainError);
    });

    test("CloseLoan allowed only after disbursement", () => {
        const e1 = handleCommand(undefined, {
            type: "ApplyLoan",
            payload: { loanId: "L4", userId: "U4", amount: 7000 },
        });

        const loan1 = replay(e1);

        const e2 = handleCommand(loan1, {
            type: "ApproveLoan",
            payload: { loanId: "L4", approver: "Officer" },
        });

        const loan2 = replay([...e1, ...e2]);

        const e3 = handleCommand(loan2, {
            type: "DisburseLoan",
            payload: { loanId: "L4", transactionId: "TX777" },
        });

        const loan3 = replay([...e1, ...e2, ...e3]);

        const e4 = handleCommand(loan3, {
            type: "CloseLoan",
            payload: { loanId: "L4", reason: "paid" },
        });

        expect(e4[0].type).toBe("LoanClosed");

        if (e4[0].type === "LoanClosed") {
            expect(e4[0].payload.reason).toBe("paid");
        }
    });

    test("CloseLoan rejects if loan not disbursed", () => {
        const e1 = handleCommand(undefined, {
            type: "ApplyLoan",
            payload: { loanId: "L5", userId: "U5", amount: 9000 },
        });

        const loan1 = replay(e1);

        const e2 = handleCommand(loan1, {
            type: "ApproveLoan",
            payload: { loanId: "L5", approver: "Officer" },
        });

        const loan2 = replay([...e1, ...e2]);

        expect(() =>
            handleCommand(loan2, {
                type: "CloseLoan",
                payload: { loanId: "L5", reason: "paid" },
            })
        ).toThrow(DomainError);
    });
});
