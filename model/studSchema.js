const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const schema = new mongoose.Schema({
    admissionno: {
        type: String,
        required: true
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String
    },
    fathername: {
        type: String,
        required: true
    },
    mothername: {
        type: String,
        required: true
    },
    grade: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    dob: {
        type: String
    },
    session: {
        type: String,
        required: true
    },
    adharcardno: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    mobileno: {
        type: String,
        required: true
    },
    fee: {
        type: String
    }
}, {
    timestamps: true
}
);

const adminSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
});

const teacherSchema = new mongoose.Schema({
    idno: {
        type: String
    },
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    fathername: {
        type: String
    },
    mothername: {
        type: String
    },
    gender: {
        type: String
    },
    dob: {
        type: String,
        default: Date
    },
    salary: {
        type: String,
        required: true
    },
    adharcardno: {
        type: String,
        required: true
    },
    address: {
        type: String,
    },
    mobileno: {
        type: String,
        required: true
    }
}
    , {
        timestamps: true
    })

const studemtMarksSchema = new mongoose.Schema({
    admissionno: {
        type: String,
        required: true
    },
    firstSem: {
        type: Object
    },
    secSem: {
        type: Object
    },
    thirdSem: {
        type: Object

    }

}) 
const firstTerm = new mongoose.Schema({
     admissionno :{
        type : String
     },
     firstsem : {
        type : Object
     }
})

const secondTerm = new mongoose.Schema({
    admissionno :{
       type : String
    },
    secsem : {
       type : Object
    }
})

const thirdTerm = new mongoose.Schema({
    admissionno :{
       type : String
    },
    thirdsem : {
       type : Object
    }
})



const subjectSchema = new mongoose.Schema({

    grade: {
        type: String
    },
    subject: {
        type: String
    },
    smarks: {
        type: String
    }

});

const expenditure = new mongoose.Schema({
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    date: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})



// adminSchema.methods.genrateAuthToken = async function () {
//     try {
//         let token = jwt.sign({ "62cd8cccef0f119b05ac24f0": this._id }, process.env.SCRET_KEY);
//         this.tokens = this.tokens.concat({ token: token });
//         await this.save();
//         return token;
//     }
//     catch (err) {
//         console.log(err);
//     }
// }

const Admin = mongoose.model('ADMINDATA', adminSchema);

const Student = mongoose.model('SCHOOLDATA', schema);

const Teacher = mongoose.model('TEACHERDATA', teacherSchema);

const Marks = mongoose.model('MARKSDATA', studemtMarksSchema);

const Subject = mongoose.model('SUBJECTDATA', subjectSchema);

const Expenditure = mongoose.model('EXPENDITUREDATA', expenditure);

const FirstSem = mongoose.model('FIRSTSEMDATA' ,firstTerm )

const SecondSem = mongoose.model('SECONDSEM',secondTerm)

const ThirdSem = mongoose.model('THIRDSEM',thirdTerm);

module.exports = {
    Student: Student,
    Admin: Admin,
    Teacher: Teacher,
    Marks: Marks,
    Subject: Subject,
    Expenditure: Expenditure,
    FirstSem : FirstSem,
    SecondSem : SecondSem,
    ThirdSem : ThirdSem
};