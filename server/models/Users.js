'use strict ';
var userSchema, User,
    mongoose 	= require('mongoose'),
    Schema      = mongoose.Schema,
    ObjectId    = Schema.Types.ObjectId,
    encrypt		= require('../utilities/encryption'),
    roles  = {
        values: 'admin'.split(' ')
    };

userSchema = new Schema({
    name: {type:String, required: '{PATH} is required!'},
    username: {
        type:String,
        required: '{PATH} is required!',
        unique:true
    },
    email: {type: String, required: '{PATH} is required'},
    salt: {type:String, required: '{PATH} is required!'},
    hashed_pwd: {type:String, required: '{PATH} is required!'},
    role: [{
        type: String,
        required:'{PATH} is required!',
        default: 'admin',
        enum: roles}],
    created_by: {type: ObjectId, ref: 'Users'},
    creation_date: {type: Date, default:Date.now}
});

userSchema.methods = {
    authenticate: function(passwordToMatch) {
        return encrypt.hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        return true;
    },
    hasRole: function(role) {
        return this.role.indexOf(role) > -1;
    }
};

User = mongoose.model('User', userSchema);

function createDefaultUsers() {
    User.find({}).count().exec(function(err, user_count) {
        if(user_count === 0) {
            var salt, hash;
            salt = encrypt.createSalt();
            hash = encrypt.hashPwd(salt, 'admin');
            User.create({
                name: 'Person',
                username: 'person',
                email: 'person@example.com',
                salt:salt,
                hashed_pwd: 'admin',
                role: 'admin'});
            User.find({}).count().exec(function(err, user_count) {
                console.log(String(user_count), 'users created...')
            });
        } else {
            console.log(String(user_count), 'users exist...')
        }
    })
};

exports.createDefaultUsers = createDefaultUsers;