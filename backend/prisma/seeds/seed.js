import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import bcrypt from 'bcrypt'


async function main() {
    const hashedPassword = await bcrypt.hash("Admin123", 10); // 10 = salt rounds
    // data Admin if not exists
    await prisma.User.upsert({
        where: { email: 'alijonmrc99@gmail.com' },
        update: {},
        create: {
            role: 'ADMIN',
            email: 'alijonmrc99@gmail.com',
            fullName: "Alijon Kuvondikov",
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
                phone: "998957747071",
                gender: true,
                classId: classBlue.id,
                gradeId: grade5.id,
            },
            {
                fullName: "Rabbimkulov Asilbek",
                birthDate: new Date("2014-09-25"),
                phone: "998932281093",
                gender: true,
                classId: classBlue.id,
                gradeId: grade5.id,
            },
            {
                fullName: "Sulaymonov Salamonbek",
                birthDate: new Date("2014-02-04"),
                phone: "998905056764",
                gender: true,
                classId: classBlue.id,
                gradeId: grade5.id,
            },
            {
                fullName: "Abdujalilov Muhammadaziz",
                birthDate: new Date("2014-11-11"),
                phone: "998333760707",
                gender: true,
                classId: classBlue.id,
                gradeId: grade5.id,
            },
            {
                fullName: "Himmatova Parizoda Norbek qizi",
                birthDate: new Date("2014-02-02"),
                phone: "998932266449",
                gender: false,
                classId: classBlue.id,
                gradeId: grade5.id,
            },
            {
                fullName: "Yuldashev Bobur",
                birthDate: new Date("2014-03-27"),
                phone: "998501508566",
                gender: true,
                classId: classBlue.id,
                gradeId: grade5.id,
            },
            {
                fullName: "Ulmasjonov Og'abek",
                birthDate: new Date("2014-08-13"),
                phone: "998915445343",
                gender: true,
                classId: classBlue.id,
                gradeId: grade5.id,
            },
            {
                fullName: "Mehridinov Ulug'bek",
                birthDate: new Date("2014-10-27"),
                phone: "998904743777",
                gender: true,
                classId: classBlue.id,
                gradeId: grade5.id,
            },
            {
                fullName: "Zaxirov Timur",
                birthDate: new Date("2014-09-01"),
                phone: "998951621204",
                gender: true,
                classId: classBlue.id,
                gradeId: grade5.id,
            },
            {
                fullName: "Tuxtamuratova Farzona",
                birthDate: new Date("2014-08-12"),
                phone: "998979190828",
                gender: false,
                classId: classBlue.id,
                gradeId: grade5.id,
            },
            {
                fullName: "Gulxonov Hojiakbar",
                birthDate: new Date("2014-01-23"),
                phone: "998938365885",
                gender: true,
                classId: classBlue.id,
                gradeId: grade5.id,
            },
            {
                fullName: "Xamroyev Javohirbek",
                birthDate: new Date("2014-11-11"),
                phone: "998933040622",
                gender: true,
                classId: classBlue.id,
                gradeId: grade5.id,
            },
            {
                fullName: "Baxranov Imronjon Muxiddinovich",
                birthDate: new Date("2014-08-10"),
                phone: "998932370563",
                gender: true,
                classId: classGreen.id,
                gradeId: grade5.id,
            },
            {
                fullName: "Suvonov Sarvar Azamat o'g'li",
                birthDate: new Date("2014-12-11"),
                phone: "998940373235",
                gender: true,
                classId: classGreen.id,
                gradeId: grade5.id,
            },
            {
                fullName: "Eshmanov Humoyun Bobur o'g'li",
                birthDate: new Date("2014-02-14"),
                phone: "998990416097",
                gender: true,
                classId: classGreen.id,
                gradeId: grade5.id,
            },
            {
                fullName: "Isomiddinova Dilroz",
                birthDate: new Date("2014-05-22"),
                phone: "",
                gender: false,
                classId: classGreen.id,
                gradeId: grade5.id,
            },
            {
                fullName: "Shaxobov Bekzodjon Zafar o'g'li",
                birthDate: new Date("2014-09-22"),
                phone: "998972880233",
                gender: true,
                classId: classGreen.id,
                gradeId: grade5.id,
            },
            {
                fullName: "Izzatillayev Nodirbek Ozod o'g'li",
                birthDate: new Date("2014-06-12"),
                phone: "998952711144",
                gender: true,
                classId: classGreen.id,
                gradeId: grade5.id,
            },
            {
                fullName: "Muxtarov Nurbek Muslimovich",
                birthDate: new Date("2014-12-17"),
                phone: "998885760982",
                gender: true,
                classId: classGreen.id,
                gradeId: grade5.id,
            },
            {
                fullName: "Askarov Akobir Oybek o'g'li",
                birthDate: new Date("2014-09-27"),
                phone: "998915453811",
                gender: true,
                classId: classGreen.id,
                gradeId: grade5.id,
            },
            {
                fullName: "Jozilbayev Ulug'bek Anvar o'g'li",
                birthDate: new Date("2014-05-24"),
                phone: "998933387687",
                gender: true,
                classId: classGreen.id,
                gradeId: grade5.id,
            },
            {
                fullName: "Norboyev Xasan",
                birthDate: new Date("2014-08-12"),
                phone: "",
                gender: true,
                classId: classGreen.id,
                gradeId: grade5.id,
            },
            {
                fullName: "Nurmatov Davlat Baxtiyorovich",
                birthDate: new Date("2014-09-08"),
                phone: "998979284547",
                gender: true,
                classId: classGreen.id,
                gradeId: grade5.id,
            },
            {
                fullName: "Erkinova E'zoza Sherzotovna",
                birthDate: new Date("2014-12-17"),
                phone: "998945345206",
                gender: false,
                classId: classGreen.id,
                gradeId: grade5.id,
            },
            {
                fullName: "Sultanmurodov Jasurbek Sherzod o`g`li",
                birthDate: new Date("2013-08-06"),
                phone: "999579246",
                gender: true,
                classId: classBlue.id,
                gradeId: grade6.id,
            },
            {
                fullName: "Xikmatov Asadbek Ruslanovich",
                birthDate: new Date("2013-10-29"),
                phone: "938512060",
                gender: true,
                classId: classBlue.id,
                gradeId: grade6.id,
            },
            {
                fullName: "Kilichev Murodbek G`olib o`g`li",
                birthDate: new Date("2013-06-17"),
                phone: "915359076",
                gender: true,
                classId: classBlue.id,
                gradeId: grade6.id,
            },
            {
                fullName: "Abdurazakov Anvar Otabek o`g`li",
                birthDate: new Date("2014-10-03"),
                phone: "941883005",
                gender: true,
                classId: classBlue.id,
                gradeId: grade6.id,
            },
            {
                fullName: "Nishonov G`olibjon Lazizjon o`g`li",
                birthDate: new Date("2013-11-01"),
                phone: "938504373",
                gender: true,
                classId: classBlue.id,
                gradeId: grade6.id,
            },
            {
                fullName: "Nurmatov Jahongirmirzo Bobojon o`g`li",
                birthDate: new Date("2013-09-18"),
                phone: "915250859",
                gender: true,
                classId: classBlue.id,
                gradeId: grade6.id,
            },
            {
                fullName: "Ilxomov Umarbek Maqsud o`g`li",
                birthDate: new Date("2013-06-28"),
                phone: "937258091",
                gender: true,
                classId: classBlue.id,
                gradeId: grade6.id,
            },
            {
                fullName: "Normatkulov Xondamir Xasanovich",
                birthDate: new Date("2013-07-24"),
                phone: "942440102",
                gender: true,
                classId: classBlue.id,
                gradeId: grade6.id,
            },
            {
                fullName: "Murodkulov Muxammadjon maxmud o`g`li",
                birthDate: new Date("2013-10-04"),
                phone: "979178844",
                gender: true,
                classId: classBlue.id,
                gradeId: grade6.id,
            },
            {
                fullName: "Sindarov Asadbek Sherzodovich",
                birthDate: new Date("2014-07-05"),
                phone: "933455665",
                gender: true,
                classId: classBlue.id,
                gradeId: grade6.id,
            },
            {
                fullName: "Safarov Jonibek Sadullayevich",
                birthDate: new Date("2013-06-02"),
                phone: "992830206",
                gender: true,
                classId: classBlue.id,
                gradeId: grade6.id,
            },
            {
                fullName: "Abdug`aniyev Umidjon Saydullaevich",
                birthDate: new Date("2013-01-05"),
                phone: "938308420",
                gender: true,
                classId: classBlue.id,
                gradeId: grade6.id,
            },
            {
                fullName: "Achilov Ahmedjon Zahid o'g'li",
                birthDate: new Date("2014-04-05"),
                phone: "915217325",
                gender: true,
                classId: classGreen.id,
                gradeId: grade6.id,
            },
            {
                fullName: "Ermatov Elnur Sarvarovich",
                birthDate: new Date("2013-09-24"),
                phone: "944749400",
                gender: true,
                classId: classGreen.id,
                gradeId: grade6.id,
            },
            {
                fullName: "Eshboyev Ravshan Jamshidovich",
                birthDate: new Date("2013-04-30"),
                phone: "973988002",
                gender: true,
                classId: classGreen.id,
                gradeId: grade6.id,
            },
            {
                fullName: "Ibragimov Abdumurod Ma'rufjon o'g'li",
                birthDate: new Date("2013-11-04"),
                phone: "991768890",
                gender: true,
                classId: classGreen.id,
                gradeId: grade6.id,
            },
            {
                fullName: "Ismoilova Chexroz Sherali qizi",
                birthDate: new Date("2013-03-25"),
                phone: "945322590",
                gender: false,
                classId: classGreen.id,
                gradeId: grade6.id,
            },
            {
                fullName: "Komilov Shamsiddin Dilshod o'g'li",
                birthDate: new Date("2013-10-20"),
                phone: "933373876",
                gender: true,
                classId: classGreen.id,
                gradeId: grade6.id,
            },
            {
                fullName: "Lutfillayev Boburxon Shavkiddinovich",
                birthDate: new Date("2013-07-27"),
                phone: "930620383",
                gender: true,
                classId: classGreen.id,
                gradeId: grade6.id,
            },
            {
                fullName: "Nematulloyeva Zilola Xabibullo qizi",
                birthDate: new Date("2013-06-14"),
                phone: "915572501",
                gender: false,
                classId: classGreen.id,
                gradeId: grade6.id,
            },
            {
                fullName: "Salohitdinov Saidali Ma'rufjon o'g'li",
                birthDate: new Date("2013-07-13"),
                phone: "933412727",
                gender: true,
                classId: classGreen.id,
                gradeId: grade6.id,
            },
            {
                fullName: "Shermamatov Oybek Sherbek o'g'li",
                birthDate: new Date("2013-11-16"),
                phone: "945530786",
                gender: true,
                classId: classGreen.id,
                gradeId: grade6.id,
            },
            {
                fullName: "Turkmanov Feruz Akbar o'g'li",
                birthDate: new Date("2013-10-12"),
                phone: "945308306",
                gender: true,
                classId: classGreen.id,
                gradeId: grade6.id,
            },
            {
                fullName: "Zoyirov Xondamir Abdullayevich",
                birthDate: new Date("2013-09-10"),
                phone: "933762552",
                gender: true,
                classId: classGreen.id,
                gradeId: grade6.id,
            },
            {
                fullName: "Abdusattorov Abdulloh Alisher o'g'li",
                birthDate: new Date("2012-02-03"),
                phone: "943298586",
                gender: true,
                classId: classBlue.id,
                gradeId: grade7.id,
            },
            {
                fullName: "Urokboyev Jonibek Sharafovich",
                birthDate: new Date("2012-04-18"),
                phone: "933353216",
                gender: true,
                classId: classBlue.id,
                gradeId: grade7.id,
            },
            {
                fullName: "Xamidov Farizjon Furkatovich",
                birthDate: new Date("2013-04-15"),
                phone: "979177767",
                gender: true,
                classId: classBlue.id,
                gradeId: grade7.id,
            },
            {
                fullName: "Muxtarova Gulzoda Miraziz qizi",
                birthDate: new Date("2013-09-27"),
                phone: "991482184",
                gender: false,
                classId: classBlue.id,
                gradeId: grade7.id,
            },
            {
                fullName: "Ilxomov A`zam Akbarovich",
                birthDate: new Date("2012-10-11"),
                phone: "979112772",
                gender: true,
                classId: classBlue.id,
                gradeId: grade7.id,
            },
            {
                fullName: "Saydullayev Komronbek Davron o'g'li",
                birthDate: new Date("2013-06-29"),
                phone: "941833884",
                gender: true,
                classId: classBlue.id,
                gradeId: grade7.id,
            },
            {
                fullName: "Abdurasulova Kumushbibi Ozodjonovna",
                birthDate: new Date("2012-09-01"),
                phone: "994988790",
                gender: true,
                classId: classBlue.id,
                gradeId: grade7.id,
            },
            {
                fullName: "Samardinova Lobar Sarvar qizi",
                birthDate: new Date("2012-09-24"),
                phone: "933356052",
                gender: false,
                classId: classBlue.id,
                gradeId: grade7.id,
            },
            {
                fullName: "Maxmudov Xamroz Xalil o'g'li",
                birthDate: new Date("2012-06-23"),
                phone: "945381334",
                gender: true,
                classId: classBlue.id,
                gradeId: grade7.id,
            },
            {
                fullName: "Usanov Sanjarbek Orifjon o'g'li",
                birthDate: new Date("2012-10-08"),
                phone: "992421509",
                gender: true,
                classId: classBlue.id,
                gradeId: grade7.id,
            },
            {
                fullName: "Ubaydullayev Baxtiyor Baxrom o'g'li",
                birthDate: new Date("2012-04-20"),
                phone: "888289270",
                gender: true,
                classId: classBlue.id,
                gradeId: grade7.id,
            },
            {
                fullName: "Eshmaxammadova Zulfizar Maksud qizi",
                birthDate: new Date("2013-09-23"),
                phone: "933429900",
                gender: false,
                classId: classBlue.id,
                gradeId: grade7.id,
            },
            {
                fullName: "Abdurashitov Oybek Otabekovich",
                birthDate: new Date("2012-08-16"),
                phone: "998932244272",
                gender: true,
                classId: classGreen.id,
                gradeId: grade7.id,
            },
            {
                fullName: "Amanov Xumoyun Jahongir og'li",
                birthDate: new Date("2012-06-09"),
                phone: "998889229879",
                gender: true,
                classId: classGreen.id,
                gradeId: grade7.id,
            },
            {
                fullName: "Begmuratov G'afur Erkinovich",
                birthDate: new Date("2012-05-06"),
                phone: "998950920628",
                gender: true,
                classId: classGreen.id,
                gradeId: grade7.id,
            },
            {
                fullName: "Doniyorova Madinabonu Rustam qizi",
                birthDate: new Date("2012-07-30"),
                phone: "998889132012",
                gender: false,
                classId: classGreen.id,
                gradeId: grade7.id,
            },
            {
                fullName: "Isomiddinova Mohinur G'olib qizi",
                birthDate: new Date("2012-03-31"),
                phone: "998979076551",
                gender: false,
                classId: classGreen.id,
                gradeId: grade7.id,
            },
            {
                fullName: "Mirali Muxtorov Begaliyevich",
                birthDate: new Date("2012-10-03"),
                phone: "998979202523",
                gender: true,
                classId: classGreen.id,
                gradeId: grade7.id,
            },
            {
                fullName: "Norqulov Sohibjon Suxrobovich",
                birthDate: new Date("2012-08-24"),
                phone: "998331241220",
                gender: true,
                classId: classGreen.id,
                gradeId: grade7.id,
            },
            {
                fullName: "Ramatillayev Bilol Kamol o'g'li",
                birthDate: new Date("2012-09-10"),
                phone: "998997095252",
                gender: true,
                classId: classGreen.id,
                gradeId: grade7.id,
            },
            {
                fullName: "Toshmurodova Umida Dilmurod qizi",
                birthDate: new Date("2012-07-07"),
                phone: "998938128210",
                gender: false,
                classId: classGreen.id,
                gradeId: grade7.id,
            },
            {
                fullName: "Turayev Shohruh Ikromovich",
                birthDate: new Date("2012-08-04"),
                phone: "998947892520",
                gender: true,
                classId: classGreen.id,
                gradeId: grade7.id,
            },
            {
                fullName: "Turg'unova Nafosat Jamshedovna",
                birthDate: new Date("2012-05-29"),
                phone: "998930585935",
                gender: false,
                classId: classGreen.id,
                gradeId: grade7.id,
            },
            {
                fullName: "O'roqov Sanjar Asror o'g'li",
                birthDate: new Date("2013-02-23"),
                phone: "998958402313",
                gender: true,
                classId: classGreen.id,
                gradeId: grade7.id,
            },
            {
                fullName: "Abdumajitov Asilbek Jo'rabekovich",
                birthDate: new Date("2012-06-03"),
                phone: "998942982328",
                gender: true,
                classId: classBlue.id,
                gradeId: grade8.id,
            },
            {
                fullName: "Azizova Farangiz Yashin qizi",
                birthDate: new Date("2012-05-06"),
                phone: "998979140619",
                gender: false,
                classId: classBlue.id,
                gradeId: grade8.id,
            },
            {
                fullName: "Eshqulov Xumoyun Uktamjon o'g'li",
                birthDate: new Date("2011-04-11"),
                phone: "998941807002",
                gender: true,
                classId: classBlue.id,
                gradeId: grade8.id,
            },
            {
                fullName: "Ibragimov Xurshid Ikrom o'g'li",
                birthDate: new Date("2012-10-05"),
                phone: "998914575750",
                gender: true,
                classId: classBlue.id,
                gradeId: grade8.id,
            },
            {
                fullName: "Khakimov Abdulloh Murodovich",
                birthDate: new Date("2011-11-01"),
                phone: "998991185935",
                gender: true,
                classId: classBlue.id,
                gradeId: grade8.id,
            },
            {
                fullName: "Muxtarov Bobur Miraziz o'gli",
                birthDate: new Date("2011-10-17"),
                phone: "998937218407",
                gender: true,
                classId: classBlue.id,
                gradeId: grade8.id,
            },
            {
                fullName: "Muxtarova Laylo Muslimovna",
                birthDate: new Date("2011-05-17"),
                phone: "998883972506",
                gender: false,
                classId: classBlue.id,
                gradeId: grade8.id,
            },
            {
                fullName: "Ortiqov Shoxjaxon Baxodirovich",
                birthDate: new Date("2011-10-12"),
                phone: "998939903370",
                gender: true,
                classId: classBlue.id,
                gradeId: grade8.id,
            },
            {
                fullName: "Osrayev Temurbek Faxriddinovich",
                birthDate: new Date("2011-12-31"),
                phone: "998975784700",
                gender: true,
                classId: classBlue.id,
                gradeId: grade8.id,
            },
            {
                fullName: "Shavkatov Aliakbar Komil o'gli",
                birthDate: new Date("2011-06-25"),
                phone: "998995910306",
                gender: true,
                classId: classBlue.id,
                gradeId: grade8.id,
            },
            {
                fullName: "Sherqo'ziyeva Sabrina Alisher qizi",
                birthDate: new Date("2011-08-08"),
                phone: "998934367883",
                gender: false,
                classId: classBlue.id,
                gradeId: grade8.id,
            },
            {
                fullName: "Uzoqov Alisher Alijon o'g'li",
                birthDate: new Date("2011-08-18"),
                phone: "998915562380",
                gender: true,
                classId: classBlue.id,
                gradeId: grade8.id,
            },
            {
                fullName: "Olimov Xojiakbar Obid o`g`li",
                birthDate: new Date("2011-11-04"),
                phone: "998931858922",
                gender: true,
                classId: classGreen.id,
                gradeId: grade8.id,
            },
            {
                fullName: "Toshbekov Akbar Turdibekovich",
                birthDate: new Date("2011-04-12"),
                phone: "998949735600",
                gender: true,
                classId: classGreen.id,
                gradeId: grade8.id,
            },
            {
                fullName: "Eshmanova Hulkar Bobur qizi",
                birthDate: new Date("2012-04-02"),
                phone: "998990416097",
                gender: false,
                classId: classGreen.id,
                gradeId: grade8.id,
            },
            {
                fullName: "Xudoykulov Bexruz Bahodirovich",
                birthDate: new Date("2011-07-11"),
                phone: "998944701075",
                gender: true,
                classId: classGreen.id,
                gradeId: grade8.id,
            },
            {
                fullName: "Fozilaxmadov Islom Alisher o'g'li",
                birthDate: new Date("2011-04-01"),
                phone: "998913195664",
                gender: true,
                classId: classGreen.id,
                gradeId: grade8.id,
            },
            {
                fullName: "G'aniyev Jaloliddin Bahriddin o'g'li",
                birthDate: new Date("2011-11-20"),
                phone: "998993125765",
                gender: true,
                classId: classGreen.id,
                gradeId: grade8.id,
            },
            {
                fullName: "Mannonova Mohira Ulugbekovna",
                birthDate: new Date("2012-02-07"),
                phone: "998906035529",
                gender: false,
                classId: classGreen.id,
                gradeId: grade8.id,
            },
            {
                fullName: "Kadirov Ruslan Sherzodovich",
                birthDate: new Date("2012-06-22"),
                phone: "998907430445",
                gender: true,
                classId: classGreen.id,
                gradeId: grade8.id,
            },
            {
                fullName: "Ismatillayeva Mumtozabegim Baxtiyorovna",
                birthDate: new Date("2012-08-23"),
                phone: "998942888609",
                gender: false,
                classId: classGreen.id,
                gradeId: grade8.id,
            },
            {
                fullName: "Nuriddinova Dilnura Shahobbiddin qizi",
                birthDate: new Date("2011-10-29"),
                phone: "998944879366",
                gender: false,
                classId: classGreen.id,
                gradeId: grade8.id,
            },
            {
                fullName: "Nematillayev Timur G'ayratjonovich",
                birthDate: new Date("2011-06-07"),
                phone: "998976135159",
                gender: true,
                classId: classGreen.id,
                gradeId: grade8.id,
            },
            {
                fullName: "Abdurahimov Jasur Anvar o'g'li",
                birthDate: new Date("2011-01-09"),
                phone: "998991224217",
                gender: true,
                classId: classGreen.id,
                gradeId: grade8.id,
            },
            {
                fullName: "Orolova Muslima Mansur qizi",
                birthDate: new Date("2011-03-26"),
                phone: "935215321",
                gender: false,
                classId: classBlue.id,
                gradeId: grade9.id,
            },
            {
                fullName: "Shomuratov Xushnudbek Tuxtamish o'g'li",
                birthDate: new Date("2010-11-15"),
                phone: "932281409",
                gender: true,
                classId: classBlue.id,
                gradeId: grade9.id,
            },
            {
                fullName: "Alibekov Bexruz Rustamjon o'g'li",
                birthDate: new Date("2010-06-28"),
                phone: "944778379",
                gender: true,
                classId: classBlue.id,
                gradeId: grade9.id,
            },
            {
                fullName: "Omonov Botir Baxtiyorovich",
                birthDate: new Date("2010-11-17"),
                phone: "906008478",
                gender: true,
                classId: classBlue.id,
                gradeId: grade9.id,
            },
            {
                fullName: "Karimov Azizbek Mirojiddin o'g'li",
                birthDate: new Date("2010-11-09"),
                phone: "993181329",
                gender: true,
                classId: classBlue.id,
                gradeId: grade9.id,
            },
            {
                fullName: "Abdurashitov Shaxriyor Baxtiyor o'g'li",
                birthDate: new Date("2010-12-08"),
                phone: "933565598",
                gender: true,
                classId: classBlue.id,
                gradeId: grade9.id,
            },
            {
                fullName: "Ochilov Umirzoq Asqarjon o'g'li",
                birthDate: new Date("2010-02-23"),
                phone: "333405657",
                gender: true,
                classId: classBlue.id,
                gradeId: grade9.id,
            },
            {
                fullName: "Nasimov Otabek Azamjon o'gli",
                birthDate: new Date("2010-02-13"),
                phone: "902861979",
                gender: true,
                classId: classBlue.id,
                gradeId: grade9.id,
            },
            {
                fullName: "Bazarov Shohjahon Dilmurodovich",
                birthDate: new Date("2010-02-06"),
                phone: "993506117",
                gender: true,
                classId: classBlue.id,
                gradeId: grade9.id,
            },
            {
                fullName: "Toymasova Kumush Anvar qizi",
                birthDate: new Date("2011-07-06"),
                phone: "990234500",
                gender: false,
                classId: classBlue.id,
                gradeId: grade9.id,
            },
            {
                fullName: "Ravshanov Xumoyun Orifovich",
                birthDate: new Date("2010-06-24"),
                phone: "933369745",
                gender: true,
                classId: classBlue.id,
                gradeId: grade9.id,
            },
            {
                fullName: "Raxmatullayeva Nozima Aziz qizi",
                birthDate: new Date("2010-11-22"),
                phone: "948922285",
                gender: false,
                classId: classBlue.id,
                gradeId: grade9.id,
            },
            {
                fullName: "Umirzoqov Shoxrux Foziljon o`g`li",
                birthDate: new Date("2011-06-02"),
                phone: "998942838647",
                gender: true,
                classId: classGreen.id,
                gradeId: grade9.id,
            },
            {
                fullName: "Isroilov Sardor Sherzod o`g`li",
                birthDate: new Date("2010-02-19"),
                phone: "998994577897",
                gender: true,
                classId: classGreen.id,
                gradeId: grade9.id,
            },
            {
                fullName: "Saydaliyeva Sharofatbegim Bobirxon qizi",
                birthDate: new Date("2010-04-26"),
                phone: "998906060354",
                gender: false,
                classId: classGreen.id,
                gradeId: grade9.id,
            },
            {
                fullName: "Matlabxonov Xojiahmad Mahmud o`g`li",
                birthDate: new Date("2011-01-01"),
                phone: "998889337012",
                gender: true,
                classId: classGreen.id,
                gradeId: grade9.id,
            },
            {
                fullName: "Ibodullayev Ulug`bek G`olib o`g`li",
                birthDate: new Date("2010-03-15"),
                phone: "998945301575",
                gender: true,
                classId: classGreen.id,
                gradeId: grade9.id,
            },
            {
                fullName: "Eshpo`latova Dilnoza Kamolidin qizi",
                birthDate: new Date("2010-10-11"),
                phone: "998976149282",
                gender: false,
                classId: classGreen.id,
                gradeId: grade9.id,
            },
            {
                fullName: "Qarshiboyev Javohir Umid o`g`li",
                birthDate: new Date("2011-02-14"),
                phone: "998979197887",
                gender: true,
                classId: classGreen.id,
                gradeId: grade9.id,
            },
            {
                fullName: "Baxtiyorov Azizbek Berdiyor o`g`li",
                birthDate: new Date("2010-07-20"),
                phone: "998937212385",
                gender: true,
                classId: classGreen.id,
                gradeId: grade9.id,
            },
            {
                fullName: "Hamraqulova Zarnigor Shuhrat qizi",
                birthDate: new Date("2010-11-07"),
                phone: "998331119677",
                gender: false,
                classId: classGreen.id,
                gradeId: grade9.id,
            },
            {
                fullName: "Ortiqov Isfandiyor Shuxrat o`g`li",
                birthDate: new Date("2010-06-10"),
                phone: "998937240109",
                gender: true,
                classId: classGreen.id,
                gradeId: grade9.id,
            },
            {
                fullName: "Ruziboyev Suxrobjon Mamurjon o`g`li",
                birthDate: new Date("2010-01-15"),
                phone: "998938378880",
                gender: true,
                classId: classGreen.id,
                gradeId: grade9.id,
            },
            {
                fullName: "Shodmonov Xushnudbek Xusniddin o`g`li",
                birthDate: new Date("2010-02-16"),
                phone: "998991206620",
                gender: true,
                classId: classGreen.id,
                gradeId: grade9.id,
            },
            {
                fullName: "Abdug'affarov Shaxriddin Ulug'bek o'g'li",
                birthDate: new Date("2009-05-15"),
                phone: "88 910-91-31",
                gender: true,
                classId: classBlue.id,
                gradeId: grade10.id
            },
            {
                fullName: "Abduvasiyev Sardor Jahongir o'g'li",
                birthDate: new Date("2009-04-16"),
                phone: "97 917-07-44",
                gender: false,
                classId: classGreen.id,
                gradeId: grade10.id
            },
            {
                fullName: "Baxodirova Nilufar Dilshodovna",
                birthDate: new Date("2010-05-20"),
                phone: "97 917-16-86",
                gender: true,
                classId: classBlue.id,
                gradeId: grade10.id
            },
            {
                fullName: "Baxritdinov Javoxir Yakub o'g'li",
                birthDate: new Date("2009-11-16"),
                phone: "90 603-55-27",
                gender: true,
                classId: classBlue.id,
                gradeId: grade10.id
            },
            {
                fullName: "Hasanov Javohir Sherzod o'g'li",
                birthDate: new Date("2009-06-13"),
                phone: "97 921-09-77",
                gender: true,
                classId: classBlue.id,
                gradeId: grade10.id
            },
            {
                fullName: "Mamasoliyev I'nomjon Zafar o'g'li",
                birthDate: new Date("2009-04-11"),
                phone: "93 342-00-62",
                gender: true,
                classId: classBlue.id,
                gradeId: grade10.id
            },
            {
                fullName: "Mamasoliyeva Dilnura Azimjonovna",
                birthDate: new Date("2009-11-10"),
                phone: "33-748-53-42",
                gender: false,
                classId: classGreen.id,
                gradeId: grade10.id
            },
            {
                fullName: "Mannonov Baxodirxon Akmalxon o'g'li",
                birthDate: new Date("2009-02-03"),
                phone: "91 554-15-40",
                gender: true,
                classId: classBlue.id,
                gradeId: grade10.id
            },
            {
                fullName: "Pulatov Anis Bexzodovich",
                birthDate: new Date("2009-12-30"),
                phone: "91 528-70-00",
                gender: true,
                classId: classBlue.id,
                gradeId: grade10.id
            },
            {
                fullName: "Toshmurodov Yusufbek Bektosh o'g'li",
                birthDate: new Date("2009-06-15"),
                phone: "93 239-76-59",
                gender: true,
                classId: classBlue.id,
                gradeId: grade10.id
            },
            {
                fullName: "Uktamov Javohir Sherzod o'g'li",
                birthDate: new Date("2009-09-24"),
                phone: "99 342-78-33",
                gender: true,
                classId: classBlue.id,
                gradeId: grade10.id
            },
            {
                fullName: "Xujamurodov Zohirshoh Davronovich",
                birthDate: new Date("2009-02-05"),
                phone: "998935082490",
                gender: true,
                classId: classBlue.id,
                gradeId: grade10.id
            },
            {
                fullName: "Rasulov Shoxijahon Sherbek o'g'li",
                birthDate: new Date("2009-10-31"),
                phone: "998992860408",
                gender: true,
                classId: classBlue.id,
                gradeId: grade10.id
            },
            {
                fullName: "Shayxidinov Shexroz Sharofidin o'g'li",
                birthDate: new Date("2009-10-07"),
                phone: "998901008288",
                gender: true,
                classId: classBlue.id,
                gradeId: grade10.id
            },
            {
                fullName: "Xujayarov Diyorbek Baxtiyor o'g'li",
                birthDate: new Date("2009-04-10"),
                phone: "998915303785",
                gender: true,
                classId: classBlue.id,
                gradeId: grade10.id
            },
            {
                fullName: "Ziyovadinov Xurshedjon Jamshedovich",
                birthDate: new Date("2009-04-15"),
                phone: "998997780020",
                gender: true,
                classId: classBlue.id,
                gradeId: grade10.id
            },
            {
                fullName: "Axrorov Temur Sherzod o'g'li",
                birthDate: new Date("2009-11-21"),
                phone: "998973977372",
                gender: true,
                classId: classBlue.id,
                gradeId: grade10.id
            },
            {
                fullName: "Norxujayev Komilxon Xurshid o'g'li",
                birthDate: new Date("2009-12-05"),
                phone: "998944342030",
                gender: true,
                classId: classBlue.id,
                gradeId: grade10.id
            },
            {
                fullName: "Abdullayev Lazizbek Akbar o'g'li",
                birthDate: new Date("2009-10-10"),
                phone: "998906575516",
                gender: true,
                classId: classBlue.id,
                gradeId: grade10.id
            },
            {
                fullName: "Saydullayev Shaxriyor Shuxrat o'g'li",
                birthDate: new Date("2009-09-19"),
                phone: "998940581819",
                gender: true,
                classId: classBlue.id,
                gradeId: grade10.id
            },
            {
                fullName: "Jo'raqulova Davlatoy Bahodir qizi",
                birthDate: new Date("2009-04-09"),
                phone: "998973995850",
                gender: false,
                classId: classGreen.id,
                gradeId: grade10.id
            },
            {
                fullName: "Baratov Baxtiyor Elyorjonovich",
                birthDate: new Date("2009-06-30"),
                phone: "998933470476",
                gender: true,
                classId: classBlue.id,
                gradeId: grade10.id
            },
            {
                fullName: "Baxadirova Durdona Obidjonovna",
                birthDate: new Date("2010-01-09"),
                phone: "998915591489",
                gender: false,
                classId: classGreen.id,
                gradeId: grade10.id
            },
            {
                fullName: "Artikova Zebo Abdusamat qizi",
                birthDate: new Date("2009-03-22"),
                phone: "998917027198",
                gender: false,
                classId: classGreen.id,
                gradeId: grade10.id
            },
            {
                fullName: "Toshxo'jayev Nurislom Maqsud o`g`li",
                birthDate: new Date("2008-12-10"),
                phone: "998942413366",
                gender: true,
                classId: classBlue.id,
                gradeId: grade11.id
            },
            {
                fullName: "Gulomov Diyor G`ayratovich",
                birthDate: new Date("2008-09-19"),
                phone: "998979220655",
                gender: true,
                classId: classBlue.id,
                gradeId: grade11.id
            },
            {
                fullName: "Maxmudjonov Abdulfazl Erkinovich",
                birthDate: new Date("2008-05-03"),
                phone: "998997025130",
                gender: true,
                classId: classBlue.id,
                gradeId: grade11.id
            },
            {
                fullName: "Kurozboyev Og`abek Doniyor o`g`li",
                birthDate: new Date("2008-04-28"),
                phone: "998973908782",
                gender: true,
                classId: classBlue.id,
                gradeId: grade11.id
            },
            {
                fullName: "Zokirov Islom Azizjonovich",
                birthDate: new Date("2008-07-29"),
                phone: "998997553788",
                gender: true,
                classId: classBlue.id,
                gradeId: grade11.id
            },
            {
                fullName: "Olimov Abdusaid Qobiljon o`g`li",
                birthDate: new Date("2008-04-22"),
                phone: "998997332355",
                gender: true,
                classId: classBlue.id,
                gradeId: grade11.id
            },
            {
                fullName: "Toshpulatov Bexruz Dilshod o`g`li",
                birthDate: new Date("2009-04-25"),
                phone: "998889237090",
                gender: true,
                classId: classBlue.id,
                gradeId: grade11.id
            },
            {
                fullName: "Maxmudov Asilbek Ne`matilla o`g`li",
                birthDate: new Date("2009-02-13"),
                phone: "998973955355",
                gender: true,
                classId: classBlue.id,
                gradeId: grade11.id
            },
            {
                fullName: "Baxramov Baxodir Azim o`g`li",
                birthDate: new Date("2008-11-03"),
                phone: "998955572422",
                gender: true,
                classId: classBlue.id,
                gradeId: grade11.id
            },
            {
                fullName: "Egamberdiyev Shohruz Feruzovich",
                birthDate: new Date("2008-03-14"),
                phone: "998971225552",
                gender: true,
                classId: classBlue.id,
                gradeId: grade11.id
            },
            {
                fullName: "Gafurova Sayyora Ikrom qizi",
                birthDate: new Date("2008-06-02"),
                phone: "998917001412",
                gender: false,
                classId: classGreen.id,
                gradeId: grade11.id
            },
            {
                fullName: "Mannonov Zafar Ulug`bekovich",
                birthDate: new Date("2009-02-14"),
                phone: "998906035529",
                gender: true,
                classId: classBlue.id,
                gradeId: grade11.id
            },
            {
                fullName: "Umarov Sharofiddin Kaxramonovich",
                birthDate: new Date("2008-06-14"),
                phone: "998933537101",
                gender: true,
                classId: classBlue.id,
                gradeId: grade11.id
            },
            {
                fullName: "Toshturdiyev Ulug`bek Eldor o`g`li",
                birthDate: new Date("2008-09-29"),
                phone: "998979262184",
                gender: true,
                classId: classBlue.id,
                gradeId: grade11.id
            },
            {
                fullName: "Muxiddinov Sarvarbek Olmos o`g`li",
                birthDate: new Date("2008-07-31"),
                phone: "998932207121",
                gender: true,
                classId: classBlue.id,
                gradeId: grade11.id
            },
            {
                fullName: "Sultanov Sobirjon Djamshedovich",
                birthDate: new Date("2008-06-03"),
                phone: "998973903345",
                gender: true,
                classId: classBlue.id,
                gradeId: grade11.id
            },
            {
                fullName: "Pardaev Mirjalol Sherzod o`g`li",
                birthDate: new Date("2008-06-25"),
                phone: "998996064311",
                gender: false,
                classId: classGreen.id,
                gradeId: grade11.id
            },
            {
                fullName: "Mamatillayeva Sarvinoz Shodiyor qizi",
                birthDate: new Date("2008-09-08"),
                phone: "998978930081",
                gender: true,
                classId: classBlue.id,
                gradeId: grade11.id
            },
            {
                fullName: "Norbayev Kattabek Shuhrat o`g`li",
                birthDate: new Date("2009-08-24"),
                phone: "998995265280",
                gender: true,
                classId: classBlue.id,
                gradeId: grade11.id
            },
            {
                fullName: "Ismagilov Daniel Nailyevich",
                birthDate: new Date("2008-02-10"),
                phone: "998933412445",
                gender: true,
                classId: classBlue.id,
                gradeId: grade11.id
            },
            {
                fullName: "Ro'zimurodov Ikromjon Baxtiyor o`g`li",
                birthDate: new Date("2008-03-19"),
                phone: "998942575705",
                gender: true,
                classId: classBlue.id,
                gradeId: grade11.id
            },
            {
                fullName: "Xo'jaqulov Bexro`z Azizjon o`g`li",
                birthDate: new Date("2008-08-12"),
                phone: "998906032238",
                gender: true,
                classId: classBlue.id,
                gradeId: grade11.id
            },
            {
                fullName: "Sag`dullayev Anvar Samariddin o`g`li",
                birthDate: new Date("2008-03-01"),
                phone: "998944861711",
                gender: true,
                classId: classBlue.id,
                gradeId: grade11.id
            }



        ]
    })


    await prisma.homeRoomTeacher.upsert({
        where: { email: "teacher2@samps.uz" },
        update: {},
        create: {
            fullName: "Teacher Teacher",
            email: "teacher2@samps.uz",
            phone: "123456789",
            phone: "98955985",
        }
    })
    await prisma.homeRoomTeacher.upsert({
        where: { email: "teacher3@samps.uz" },
        update: {},
        create: {
            fullName: "Teacher Teacher",
            email: "teacher3@samps.uz",
            phone: "123456789",
            phone: "98955985",
        }
    })
    await prisma.homeRoomTeacher.upsert({
        where: { email: "teacher4@samps.uz" },
        update: {},
        create: {
            fullName: "Teacher Teacher",
            email: "teacher4@samps.uz",
            phone: "123456789",
            phone: "98955985",

        }
    })

}

main()
    .then(() => console.log("✅ Seed complete!"))
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect())