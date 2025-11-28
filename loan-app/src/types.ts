
export interface BaseLoan {
    loanId: string;
    userId: string;
    amount: number;
}

export type Loan =
    | (BaseLoan & {
        state: "applied";
        submittedAt: string; // ISO
    })
    | (BaseLoan & {
        state: "approved";
        approvedAt: string;
        approvedBy: string;
    })
    | (BaseLoan & {
        state: "disbursed";
        disbursedAt: string;
        transactionId: string;
    })
    | (BaseLoan & {
        state: "closed";
        closedAt: string;
        reason: "paid" | "written-off";
    });

export type LoanStateType = Loan["state"];

/* Commands */
export type Command =
    | { type: "ApplyLoan"; payload: { loanId: string; userId: string; amount: number } }
    | { type: "ApproveLoan"; payload: { loanId: string; approver: string } }
    | { type: "DisburseLoan"; payload: { loanId: string; transactionId: string } }
    | { type: "CloseLoan"; payload: { loanId: string; reason: "paid" | "written-off" } };

/* Events */
export type Event =
    | { type: "LoanApplied"; payload: { loanId: string; userId: string; amount: number; submittedAt: string } }
    | { type: "LoanApproved"; payload: { loanId: string; approvedBy: string; approvedAt: string } }
    | { type: "LoanDisbursed"; payload: { loanId: string; transactionId: string; disbursedAt: string } }
    | { type: "LoanClosed"; payload: { loanId: string; reason: "paid" | "written-off"; closedAt: string } };

export class DomainError extends Error { }
