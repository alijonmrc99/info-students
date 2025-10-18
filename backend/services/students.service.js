import prisma from '../prisma/client.js';

export async function listStudents({ skip = 0, take = 50, classId, gradeId } = {}) {
    return prisma.student.findMany({
        skip,
        take,
        include: {
            class: true,
            grade: true,
            files: true
        },
        where: {
            class: { id: classId ? Number(classId) : undefined },
            grade: { id: gradeId ? Number(gradeId) : undefined }
        },
    });
}

export async function countStudents() {
    return prisma.student.count({});
}

export async function getStudentById(id) {
    return prisma.student.findUnique({
        where: { id: Number(id) },
        include: { class: true, grade: true, files: true }
    });
}

export async function createStudent(data) {
    // data may contain classId OR class.name (since Class.name is unique)
    const payload = {
        fullName: data.fullName,
        birthDate: data.birthDate ? new Date(data.birthDate) : null,
        email: data.email,
        gender: data.gender,
        phone: data.phone,
        imagePath: data.imagePath ?? null
    };

    // Handle relations: prefer ids, fallback to connect by unique name
    if (data.classId) payload.class = { connect: { id: Number(data.classId) } };
    else if (data.className) payload.class = { connect: { name: data.className } };

    if (data.gradeId) payload.grade = { connect: { id: Number(data.gradeId) } };
    else if (data.gradeName) payload.grade = { connect: { name: data.gradeName } };



    return prisma.student.create({
        data: payload,
        include: {
            class: true, grade: true
        }
    });
}

export async function updateStudent(id, data) {
    const payload = {};
    if (data.fullName !== undefined) payload.fullName = data.fullName;
    if (data.birthDate !== undefined) payload.birthDate = data.birthDate ? new Date(data.birthDate) : null;
    if (data.email !== undefined) payload.email = data.email;
    if (data.phone !== undefined) payload.phone = data.phone;
    if (data.gender !== undefined) payload.gender = data.gender;
    if (data.imagePath !== undefined) payload.imagePath = data.imagePath;

    // relations
    if (data.classId) payload.class = { connect: { id: Number(data.classId) } };
    else if (data.className) payload.class = { connect: { name: data.className } };
    else if (data.classId === null) payload.class = { disconnect: true };

    if (data.gradeId) payload.grade = { connect: { id: Number(data.gradeId) } };
    else if (data.gradeName) payload.grade = { connect: { name: data.gradeName } };
    else if (data.gradeId === null) payload.grade = { disconnect: true };



    if (data.files) payload.files = {
        connect: data.files.map(id => (
            { id: Number(id) }
        ))
    };

    return prisma.student.update({
        where: { id: Number(id) },
        data: payload,
        include: { class: true, grade: true, files: true }
    });
}

export async function deleteStudent(id) {
    return prisma.student.delete({ where: { id: Number(id) } });
}


export async function studentsFiles(req, res) {
    try {
        if (!req.files) {
            return res.status(400).json({ error: "No file uploaded" });
        }

        const data = req.files.map(item => ({
            name: item.originalname,
            path: item.path,
        }))



        const files = await prisma.$transaction(
            data.map(file =>
                prisma.file.create({
                    data: file,
                    select: {
                        id: true
                    }
                })
            )
        );






        return res.status(201).json(files.map(f => f.id));
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to upload files" });
    }
}