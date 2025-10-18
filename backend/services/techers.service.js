import prisma from '../prisma/client.js';

export async function listTeachers({ skip = 0, take = 50 } = {}) {
    return prisma.homeRoomTeacher.findMany({
        skip,
        take,
        include: {
            grades: true
        }
    });
}

export async function getTeacherById(id) {
    return prisma.homeRoomTeacher.findUnique({
        where: { id: Number(id) },
        include: {
            grades: {
                include: {
                    students: true
                }
            }
        }
    });
}

export async function createTeacher(data) {
    // Require classId or className to assign the teacher to a class
    if (!data.gradeIds) {
        throw new Error('classId or gradeName is required to assign a teacher to a class');
    }

    const payload = {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone
    };
    if (data.gradeIds) payload.grades = {
        connect: data.gradeIds.map(id => (
            { id: Number(id) }
        ))
    };


    // classId is unique at DB level; if class already has teacher, Prisma will throw P2002
    return prisma.homeRoomTeacher.create({
        data: payload,
    });
}

export async function updateTeacher(id, data) {
    const payload = {};
    console.log(data);

    if (data.fullName !== undefined) payload.fullName = data.fullName;
    if (data.email !== undefined) payload.email = data.email;
    if (data.phone !== undefined) payload.phone = data.phone;


    if (data.gradeIds !== undefined) {
        payload.grades = { set: [] };
        prisma.homeRoomTeacher.update({
            where: { id: Number(id) },
            data: payload,
        });
        // Replace existing grade relations with the given IDs.
        // Use `set` so old connections are removed and only the provided ids remain.
        {
            payload.grades = {
                set: data.gradeIds.map(id => ({ id: Number(id) }))
            };
        }
    }

    return prisma.homeRoomTeacher.update({
        where: { id: Number(id) },
        data: payload,
    });
}

export async function deleteTeacher(id) {
    // before deleting, you might want to nullify teacher references from students
    // here we'll just delete the teacher record
    return prisma.homeRoomTeacher.delete({ where: { id: Number(id) } });
}
