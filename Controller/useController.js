const users = require("../Models/userSchema");
const projects = require("../Models/projectschema")
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
    console.log("inside registration function!!");
    const { username, password, email } = req.body;
    console.log(`username: ${username}, password: ${password}, email: ${email}`);
    try {
        const existingUser = await users.findOne({ email });
        console.log("Already existing user!!", existingUser);
        if (existingUser) {
            res.status(406).json("Already existing user!!  please try different email!!");
        } else {
            const newUser = new users({ username, password, email, image: "", github: "", linkedin: "" });
            await newUser.save();
            res.status(200).json(newUser);
        }
    } catch (err) {
        res.status(401).json("Something Want Wrong," + err);
    }
};

exports.login = async (req, res) => {
    console.log("Inside Login Function!");
    const { email, password } = req.body;
    try {
        const existingUser = await users.findOne({ email, password });
        if (existingUser) {
            const token = jwt.sign({ userId: existingUser._id }, "SuperSecretKey");
            res.status(200).json({
                existingUser,
                role: "user",
                token,
            });
        } else {
            res.status(406).json("Invalid Email or Password");
        }
    } catch (err) {
        res.status(500).json("Somthing Want Wrong!!" + err);
    }
};

exports.userProjects=async (req,res)=>{
    console.log("Inside userprojects");
    console.log(req.payload);
    try{
        const data=await projects.find({userId:req.payload})
        console.log(data);
        res.status(200).json(data)
    }
    catch(err){
        res.status(401).json(err)
    }
}

exports.homeProjects=async(req,res)=>{
    console.log("inside homeProject");
    try{
        const data = await projects.find().limit(4)
        console.log(data);
        res.status(200).json(data)
    }
    catch(err){
        res.status(401).json(err)
    }
}

exports.allProjects=async(req,res)=>{
    console.log("inside allProject");
    const searchKey=req.query.search
    console.log(req.query);
    const query={
        languages:{$regex:searchKey,$options:"i"}
    }
    try{
        const data = await projects.find(query)
        console.log(data);
        res.status(200).json(data)
    }
    catch(err){
        res.status(401).json(err)
    }
}

exports.editProject = async(req,res)=>{
    const userId=req.payload
    const {title,overview,languages,github,demo}=req.body
    const uploadedFile=req.file?req.file.filename:req.body.project_image
    const {id}=req.params
    // res.send(`${title},${overview},${uploadedFile},${id}`)
    try{
        console.log("inside edit");
        const result= await projects.findByIdAndUpdate({_id:id},{title,overview,languages,demo,project_image:uploadedFile,userId})
        console.log(result);
        res.status(200).json(result)
    }
    catch(err){
        console.log(err);
        res.status(401).json(err)
    }
}

exports.deleteProject= async(req,res)=>{
    const {id} = req.params
    try{
        const result = await projects.findByIdAndDelete({ _id:id})
        console.log(result);
        res.status(200).json(result)
    }
    catch(err){
        res.status(404).json(err)
    }
}

exports.profileUpdate=async(req,res)=>{
    
    const {username,password,email,github,linkedin}=req.body
    const image=req.file?req.file.filename:req.body.image
    const {id}=req.params
    // console.log(id);
    try{
        console.log("Inside Edit Profile");
        const result =await users.findByIdAndUpdate({_id:id},{username,password,email,github,linkedin,image})
        res.status(200).json(result)
        console.log(result);
    }
    catch(err){
        res.status(401).json(err)
    }
}