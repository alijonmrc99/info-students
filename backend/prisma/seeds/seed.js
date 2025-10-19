import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import bcrypt from 'bcrypt'


async function main() {
    const hashedPassword = await bcrypt.hash("Admin123", 10); // 10 = salt rounds
    // data Admin if not exists
    await prisma.User.upsert({
        where: { email: 'alijonmrc@gmail.com' },
        update: {},
        create: {
            role: 'ADMIN',
            email: 'alijonmrc@gmail.com',
            fullName: "Alijon Kuvondikov",
            password: hashedPassword
        },
    })
    await prisma.User.upsert({
        where: { email: 'teacher@gmail.com' },
        update: {},
        create: {
            role: 'TEACHER',
            email: 'teacher1@gmail.com',
            fullName: "Teacher Kuvondikov",
            password: hashedPassword
        },
    })

    const classGreen = await prisma.class.create({
        data: {
            name: "Green"
        }
    })
    const classBlue = await prisma.class.create({
        data: {
            name: "Blue"
        }
    })

    const grade5 = await prisma.grade.create({
        data: {
            name: "5"
        }
    })
    const grade6 = await prisma.grade.create({
        data: {
            name: "6"
        }
    })
    const grade7 = await prisma.grade.create({
        data: {
            name: "7"
        }
    })
    const grade8 = await prisma.grade.create({
        data: {
            name: "8"
        }
    })
    const grade9 = await prisma.grade.create({
        data: {
            name: "9"
        }
    })
    const grade10 = await prisma.grade.create({
        data: {
            name: "10"
        }
    })
    const grade11 = await prisma.grade.create({
        data: {
            name: "11"
        }
    })
    const grade_finish = await prisma.grade.create({
        data: {
            name: "finish"
        }
    })

    // data Student if not exists
    await prisma.student.createMany({
        data: [
            {
                fullName: "Karimboyev Elchinbek",
                birthDate: new Date("2014-12-18"),
                phone: "123456789",
                gender: true,
                classId: classBlue.id,
                gradeId: grade5.id,
            },
            {
                fullName: "Student A",
                birthDate: new Date("2010-01-01"),
                email: "a@school.com",
                gender: true,
                phone: "123456",
                classId: classGreen.id,
                gradeId: grade5.id,
            },
            {
                fullName: "Student B",
                birthDate: new Date("2010-02-01"),
                email: "b@school.com",
                gender: false,
                phone: "987654",
                classId: classBlue.id,
                gradeId: grade6.id,
            },
            {
                fullName: "Student C",
                birthDate: new Date("2010-03-01"),
                email: "c@school.com",
                gender: false,
                phone: "555555",
                classId: classGreen.id,
                gradeId: grade7.id,
            }

        ]
    })

    await prisma.homeRoomTeacher.upsert({
        where: { email: "fasdfaasad@gmail.com" },
        update: {},
        create: {
            fullName: "Karimboyev Elchinbek",
            email: "fasdfaasad@gmail.com",
            phone: "123456789",

            phone: "98955985"
        }
    })







}

main()
    .then(() => console.log("✅ Seed complete!"))
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect())