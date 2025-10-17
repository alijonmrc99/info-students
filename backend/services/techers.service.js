import prisma from '../prisma/client.js';

export async function listTeachers({ skip = 0, take = 50 } = {}) {
    return prisma.homeRoomTeacher.findMany({
        skip,
        take,
        include: { class: true, students: true }
    });
}

export async function getTeacherById(id) {
    return prisma.homeRoomTeacher.findUnique({
        where: { id: Number(id) },
        include: { class: true, students: true }
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
        create: data.gradeIds.map(id => (
            { id: Number(id), name: String(Number(id) + 4) }
        ))
    };

    console.log(payload);

    // classId is unique at DB level; if class already has teacher, Prisma will throw P2002
    return prisma.homeRoomTeacher.create({
        data: payload,
        include: {
            grades: {
                include: { grade: true },
            }
        }
    });
}

export async function updateTeacher(id, data) {
    const payload = {};
    if (data.fullName !== undefined) payload.fullName = data.fullName;
    if (data.email !== undefined) payload.email = data.email;
    if (data.phone !== undefined) payload.phone = data.phone;

    if (data.classId) payload.class = { connect: { id: Number(data.classId) } };
    else if (data.className) payload.class = { connect: { name: data.className } };
    else if (data.classId === null) payload.class = { disconnect: true };

    return prisma.homeRoomTeacher.update({
        where: { id: Number(id) },
        data: payload,
        include: { class: true, students: true }
    });
}

export async function deleteTeacher(id) {
    // before deleting, you might want to nullify teacher references from students
    // here we'll just delete the teacher record
    return prisma.homeRoomTeacher.delete({ where: { id: Number(id) } });
}
