import z from "zod";

export const classType = z.object({
    className: z.string(),
    teacherId: z.string(),
    studentIds: z.array(z.string())
});

export const attendenceType = z.object({
    classId: z.string(),
    studentId: z.string(),
    status: z.enum(["present", "absent"])
})