const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const authenication = require("../middleware/authenication");
const cookieParser = require("cookie-parser");
router.use(cookieParser());


const { Student, Expenditure, FirstSem, SecondSem ,ThirdSem} = require('../model/studSchema');
const { Admin } = require('../model/studSchema');
const { Marks } = require('../model/studSchema');
const { Subject } = require('../model/studSchema');
const { Teacher } = require('../model/studSchema');



/* ------------------- ADMISSION ROUTERS ------------------------*/
router.post('/admission', async (req, res) => {
    const { admissionno, firstname, lastname, fathername, mothername, grade, gender, dob, session, adharcardno, address, mobileno } = req.body;
    if (!firstname || !lastname || !fathername || !mothername || !grade || !gender || !admissionno || !dob || !session || !adharcardno ) {
        console.log("l");
        console.log(req.body);
        return res.status(422).json({ "error": "*please fill all fields" });
    }

    try {
        const studentExist = await Student.findOne({ admissionno })
        if (studentExist) {
            res.status(422).json({ "error": "*student is already exists !! " });
        }

        else {
            const student = await Student({ admissionno, firstname, lastname, fathername, mothername, grade, gender, dob, session, adharcardno, address, mobileno })
            const studentadd = await student.save();


            if (studentadd) {
                res.status(202).json({ "message": " Student add sucessfullly !!" });
            }

            res.status(422).json({ "error": " *failed to add!!" });

        }
    }
    catch (err) {
        console.log(err);
    }
})
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password)
        res.status(422).json({ error: " please enter credentials" });

    try {
        const adminExist = await Admin.findOne({ email })
        console.log(adminExist);
        console.log("hellp");
        console.log(process.env.SCRET_KEY);
        if (adminExist) {
            const adminPassword = await Admin.findOne({ password })
            if (adminPassword) {
                console.log("entered into state");
                jwt.sign({adminExist},process.env.SCRET_KEY,(err, token)=>{
                    if(err){
                        console.log(err);
                        console.log("entered into error");
                    }
                    res.status(202).json({message: token ,adminExist});
                    console.log(token);
                    console.log("entered into token state");
                })
            }
           res.status(422).json({ error: "Invalid credentails" });
        }
        else{
        res.status(422).json({ error: "Invalid credentails" });
        }
    }
    catch (err) {
        console.log(err);
    }


    // try{
    //     const admin = new Admin({email , password});
    //     const adminsave = await admin.save();

    //     if(adminsave)
    //     res.status(200).json({message:"add successfully"});
    // }
    // catch(err){
    //     console.log(err);
    // }
})


const verify=(req, res, next)=>{
    var token = req.headers['authorization'];
    console.log(token);
    if(token != 'undefined'){
        jwt.verify(token, process.env.SCRET_KEY, (err, valid)=>{
            if(err){
               res.status(201).json({message :"please provide valid token"});
               console.log(err);
            }else{
             next();
            }
        })
    }
    else{
        res.status(422).json({message:"please add valid token to headers"});
    }

}
router.get('/student/:admissionno',verify, async (req, res) => {
    try {
        const admissionno = req.params.admissionno;
        const studentInfo = await Student.find({ admissionno })
        if (studentInfo) {
            res.status(201).json(studentInfo);
        }
        else{
            res.status(422).json({ "error": "no data found !!" })
        }
    }
    catch (err) {
        console.log(err);
    }

})
router.get('/student',verify, async (req, res) => {
    const totalStudent = await Student.find();
    res.status(201).json(totalStudent);
})

router.get('/student/edit/:id',verify, async (req, res) => {
    const id = req.params.id;

    const studentExist = await Student.find({ _id: id });
    if (studentExist)
    res.status(201).json(studentExist);
})

router.delete('/student/deleteStudent/:id',verify, async (req, res) => {
    const id = req.params.id;
    const delstudent = await Student.deleteOne({ _id: id });
    if (delstudent)
        res.status(201).json(delstudent);

    else
        res.status(404).json("error");
})

router.patch('/student/update/:id', verify,async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const resultfound = await Student.findByIdAndUpdate(id, data, {
        new: true
    })
    if (resultfound) {
        res.status(201).json(resultfound);
    }

    else
        res.status(422).json({"error": "Failed to update" });
})

/* ================================= Marks router =======================*/
router.post('/marks', async (req, res) => {
    try {
        const admissionno = req.body.admissionno;
        const studentExist = await Marks.findOneAndUpdate({ admissionno: admissionno }, { $set: req.body }, { new: true });
        console.log(studentExist);

    }
    catch (err) {
        console.log(err);
    }
})


/* =========================FirstSem =============================*/
router.post('/firstsem', async (req, res) => {
    try {
        const admissionno = req.body.admissionno;

        const studentExist = await FirstSem.findOneAndUpdate({ admissionno: admissionno }, { $set: req.body }, { new: true });

        if (studentExist) {
            res.status(201).json({ "auth": " already Exist and updated" })
            res.status(201).json(studentExist);
           
        }

        else {
            const addmarks = await FirstSem.insertMany([req.body]);
            if (addmarks) {
                res.status(201).json(addmarks);   
            }
        }
        res.status(422).json({"error":"not found"});

    }
    catch (err) {
        console.log(err);
    }
})

router.get('/firstsem/:admissionno', async(req,res)=>{
    try{
        const admissionno = req.params.admissionno;
        const studentExist = await FirstSem.findOne({admissionno});
        if(studentExist){
            res.status(201).json(studentExist);
            
        }
        res.status(422).json({"message":"not found"});

    }
    catch(err){
        console.log(err);
    }
})



router.post('/secondsem', async (req, res) => {
    try {
        const admissionno = req.body.admissionno;
        const studentExist = await SecondSem.findOneAndUpdate({ admissionno: admissionno }, { $set: req.body }, { new: true });

        if (studentExist) {
            res.status(201).json({ "message": " already Exist and updated" })
            res.status(201).json(studentExist); 
        }
        else {
            const addmarks = await SecondSem.insertMany([req.body]);
            if (addmarks) {
                res.status(201).json(addmarks);
               
            }
        }
    }
    catch (err) {
        console.log(err);
    }
})

router.get('/secondsem/:admissionno', async(req,res)=>{
    try{
        const admissionno = req.params.admissionno;
        const studentExist = await SecondSem.findOne({admissionno});
        if(studentExist){
            res.status(201).json(studentExist);   
        }
        res.status(422).json({"message":"not found"});
    }
    catch(err){
        console.log(err);
    }
})

router.post('/thirdsem', async (req, res) => {
    try {
        const admissionno = req.body.admissionno;
        const studentExist = await ThirdSem.findOneAndUpdate({ admissionno: admissionno }, { $set: req.body }, { new: true });

        if (studentExist) {
            res.status(201).json({ "message": " already Exist and updated" })
            res.status(201).json(studentExist);
           
        }
        else {
            const addmarks = await ThirdSem.insertMany([req.body]);
            if (addmarks) {
                res.status(201).json(addmarks);  
            }
        }
    }
    catch (err) {
        console.log(err);
    }
})


router.get('/thirdsem/:admissionno', async(req,res)=>{
    try{
        const admissionno = req.params.admissionno;
        const studentExist = await ThirdSem.findOne({admissionno});
        if(studentExist){
            res.status(201).json(studentExist);   
        }
        res.status(422).json({"message":"not found"});
    }
    catch(err){
        console.log(err);
    }
})




/*============   Subject related routers   ============*/

router.post('/subject', async (req, res) => {
    const { grade, subject, smarks } = req.body;

    if (!grade || !subject)
        res.status(400).json({ "error": "PLease fill fields" });

    try {
        const subjectExist = await Subject.findOne({
            $and: [
                {
                    grade: grade
                },
                {
                    subject: subject
                }
            ]
        })

        if (subjectExist) {
            res.status(409).json({ "message": "Already Exist" });
        }

        else {
            const subjectAdd = await Subject({ grade, subject, smarks });
            const subjectAddDone = await subjectAdd.save();
            if (subjectAddDone) {
                res.status(201).json({ "message": "Add successfully" });
            }
            res.status(422).json({ "error": " Failed to add!!" });
        }
    }
    catch (err) {
        console.log(err);
    }
})


router.get('/subject/:grade', async (req, res) => {
    try {
        const grade = req.params.grade;
        const subject = await Subject.find({ grade: grade });
        res.status(201).json(subject);
    }
    catch (err) {
        console.log(err);
    }
})

router.delete('/subject/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const subDel = await Subject.deleteOne({ _id: id });
        if (subDel) {
            res.status(201).json(subDel);
        }
        res.status(422).json({ "error": "already deleted" });
    }
    catch (err) {
        console.log(err);
    }
})


/*---------------------------------Staff Router--------------------*/
router.post('/staff', async (req, res) => {
    const { idno, firstname, lastname, fathername, mothername, gender, dob, salary, adharcardno, address, mobileno } = req.body;


    if (!idno || !firstname || !lastname || !fathername || !mothername || !gender || !dob || !salary || !adharcardno || !address || !mobileno) {
        res.status(422).json({ "error": "*please fill all field" });
    }

    try {
        const teacherExist = await Teacher.findOne({ adharcardno });
        if (teacherExist) {
            res.status(422).json({ "error": "Already Exist" });
        }
        else {
            const teacher = await Teacher({ idno, firstname, lastname, fathername, mothername, gender, dob, salary, adharcardno, address, mobileno });
            const teacherAdd = await teacher.save();
            console.log(teacher);

            if (teacherAdd) {
                res.status(201).json({ "message": "add succesfully" });
            }
            res.status(422).json({ "error": "failed to add" });
        }
    }
    catch (err) {
        console.log(err);
    }
})


router.get('/staffinfo/:idno', async (req, res) => {
    try {
        const idno = req.params.idno;
        const teacher = await Teacher.find({ idno });

        if (teacher) {
            res.status(201).json(teacher);
            console.log(res);
        }
        res.status(422).json({ "error": "Not Found" });
    }
    catch (err) {
        console.log(err);
    }
})


router.get('/staff', async (req, res) => {
    try {
        const Staff = await Teacher.find();

        if (Staff) {
            res.status(201).json(Staff);
        }
        res.status(422).json({ "error": " not found" });
    }
    catch (err) {
        console.log(err);
    }
})

router.delete('/staff/deletestaff/:id', async (req, res) => {
    const id = req.params.id;
    const delstudent = await Teacher.deleteOne({ _id: id });
    if (delstudent){
        res.status(201).json(delstudent);
        console.log("gy");
    }

    else
        res.status(404).json({"error":"not found"});
})

router.patch('/staff/update/:id', async (req, res) => {
    const id = req.params.id;
    const data = req.body;
    const resultfound = await Teacher.findByIdAndUpdate(id, data, {
        new: true
    })
    if (resultfound) {
        res.status(201).json(resultfound);
    }

    else
        res.status(422).json({"error": "Failed to update" });
})
router.get('/staff/edit/:id', async (req, res) => {
    const id = req.params.id;

    const studentExist = await Teacher.find({ _id: id });
    if (studentExist)
    res.status(201).json(studentExist);
})


/*---------------------------------Expenditue-------------------------------------*/
router.post('/expenditure', async (req, res) => {

    try {
        const { date, amount, description } = req.body;
        if (!amount || !description || !date) {
            res.status(422).json({ "error": "please fill all fields" });
        }
        else {
            const expData = await Expenditure({ date, amount, description });
            const saveExp = await expData.save();

            if (saveExp) {
                res.status(201).json({ "message": "Sucessfully Save" });
            }
            res.status(422).json({ "error": " failed to add" });
        }
    }
    catch (err) {
        console.log(err);
    }
})


router.get('/expenditure', async (req, res) => {
    try {
        const expData = await Expenditure.find();
        if (expData) {
            res.status(201).json(expData);
        }
        res.status(422).json({ "error": "not found" });
    }
    catch (err) {
        console.log(err);
    }
})

router.delete('/expenditure/:id', async (req, res) => {
    try {
        const _id = req.params.id;
        const delExp = await Expenditure.deleteOne({ _id: _id });

        if (delExp) {
            res.status(201).json({ "message": "deleted succesfully" });
            console.log(delExp);
        }

        res.status(422).json({ "error": "ot deleted" });
    }

    catch (err) {
        console.log(err);
    }
})


module.exports = router;



