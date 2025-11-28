
import { Event, Loan, DomainError } from "./types";
import { transitionLoan } from "./fsm";

export function applyEvent(current: Loan | undefined, ev: Event): Loan {
    switch (ev.type) {
        case "LoanApplied":
            if (current) throw new DomainError("Aggregate already exists");
            return {
                loanId: ev.payload.loanId,
                userId: ev.payload.userId,
                amount: ev.payload.amount,
                state: "applied",
                submittedAt: ev.payload.submittedAt,
            };

        case "LoanApproved":
            if (!current) throw new DomainError("Loan not found");
            if (current.state !== "applied") {
                throw new DomainError("Loan must be in 'applied' state to approve");
            }
            return transitionLoan(current, "approved", {
                approvedBy: ev.payload.approvedBy,
                approvedAt: ev.payload.approvedAt,
            });

        case "LoanDisbursed":
            if (!current) throw new DomainError("Loan not found");
            if (current.state !== "approved") {
                throw new DomainError("Loan must be in 'approved' state to disburse");
            }
            return transitionLoan(current, "disbursed", {
                transactionId: ev.payload.transactionId,
                disbursedAt: ev.payload.disbursedAt,
            });

        case "LoanClosed":
            if (!current) throw new DomainError("Loan not found");
            if (current.state !== "disbursed") {
                throw new DomainError("Loan must be in 'disbursed' state to close");
            }
            return transitionLoan(current, "closed", {
                reason: ev.payload.reason,
                closedAt: ev.payload.closedAt,
            });

        default:
            const _exhaustive: never = ev;
            throw new DomainError(`Unhandled event: ${_exhaustive}`);
    }
}
