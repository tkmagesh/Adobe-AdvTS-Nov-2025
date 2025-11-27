namespace Conditional_applied {
    type Plan = "basic" | "pro" | "premium";
    type Role = "viewer" | "editor" | "admin";

    // branching on several types by wrapping
    // them in a tuple:
    type CanEdit<P extends Plan, R extends Role> =
        [P, R] extends ["pro" | "premium", "editor" | "admin"]
        ? true
        : false;

    type T1 = CanEdit<"basic", "editor">; // => false
    type T2 = CanEdit<"premium", "viewer">; // => false
    type T3 = CanEdit<"pro", "editor">; // => true
    type T4 = CanEdit<"premium", "admin">; // => true

    type User = {
        plan: Plan;
        role: Role;
        name: string;
        /* ... other keys */
    };

    type ReadonlyBlog = {
        content: string;
    };

    type EditableBlog = {
        content: string;
        edit: (newContent: string) => void;
    };

    declare function getBlog<U extends User>(
        user: U,
    ): CanEdit<U["plan"], U["role"]> extends true
        ? EditableBlog
        : ReadonlyBlog;

    declare function getCurrentUser(): User

    const currentUser: User = getCurrentUser();
    const Blog = getBlog(currentUser);

    // @ts-expect-error
    Blog.edit("new content");

    function isEditableUser(user: User): user is User & {
        plan: "pro" | "premium";
        role: "editor" | "admin";
    } {
        return (
            (user.plan === "pro" || user.plan === "premium") &&
            (user.role === "editor" || user.role === "admin")
        );
    }

    if (isEditableUser(currentUser)) {
        const res1 = getBlog(currentUser); // =>

        // We can edit the Blog!
        res1.edit("hello");
    }
}