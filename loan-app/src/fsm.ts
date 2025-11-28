
import { Loan, LoanStateType } from "./types";

/**
 * Allowed transitions
 */
export const allowedTransitions = {
    applied: ["approved"] as const,
    approved: ["disbursed"] as const,
    disbursed: ["closed"] as const,
    closed: [] as const,
} as const;

export type AllowedTransitions = typeof allowedTransitions;
export type NextStatesOf<S extends LoanStateType> = AllowedTransitions[S][number];


export function canTransition(from: LoanStateType, to: LoanStateType): boolean {
    const next = allowedTransitions[from] as readonly LoanStateType[];
    return next.includes(to);
}

/**
 * Base payload types per target state
 */
export type TransitionPayloadBase = {
    approved: {
        approvedBy: string;
        approvedAt?: string;
    };
    disbursed: {
        transactionId: string;
        disbursedAt?: string;
    };
    closed: {
        reason: "paid" | "written-off";
        closedAt?: string;
    };
};

/**
 * Derived payload map
 */
export type TransitionPayload = {
    [F in keyof AllowedTransitions]: {
        [T in AllowedTransitions[F][number]]: TransitionPayloadBase[T];
    };
};

export type PayloadFor<
    From extends LoanStateType,
    To extends NextStatesOf<From>
> = TransitionPayload[From][To];

/**
 * Narrowed return types (no generics inside switch)
 */
export type ApprovedLoan = Extract<Loan, { state: "approved" }>;
export type DisbursedLoan = Extract<Loan, { state: "disbursed" }>;
export type ClosedLoan = Extract<Loan, { state: "closed" }>;

export function transitionLoan(
    loan: Loan,
    to: LoanStateType,
    payload: any
): Loan {
    if (!canTransition(loan.state, to)) {
        throw new Error(`Invalid transition: ${loan.state} -> ${to}`);
    }

    const now = new Date().toISOString();

    switch (to) {
        case "approved":
            return {
                ...loan,
                state: "approved",
                approvedAt: payload.approvedAt ?? now,
                approvedBy: payload.approvedBy,
            };

        case "disbursed":
            return {
                ...loan,
                state: "disbursed",
                disbursedAt: payload.disbursedAt ?? now,
                transactionId: payload.transactionId,
            };

        case "closed":
            return {
                ...loan,
                state: "closed",
                closedAt: payload.closedAt ?? now,
                reason: payload.reason,
            };

        default:
            throw new Error(`Unhandled target state: ${to}`);
    }
}
