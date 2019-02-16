const mongoose = require("Mongoose");
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        unique: true
    },
    
    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    }
});

userSchema.pre("save", async function(next){
    try{
        if(!this.isModified("password")){
            return next();
        }
        let hashedPassword = await bcrypt.hash(this.password, 10);
        this.password = hashedPassword;
        return next();
    }catch(err){
        return next(err);
    }
});

userSchema.methods.comparePassword = async function(candidatePassword, next){
    try{
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    }catch(err){
        return next(err);
    }
}

const User = mongoose.model("User", userSchema);

mongoose.set("debug", true);
mongoose.Promise = Promise;

mongoose.connect("mongodb://localhost:27017/practice", {
    keepAlive: true,
    useNewUrlParser: true
});

module.exports = User;