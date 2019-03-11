const index = (req, res) => {
    res.render('index', {
        title: 'Animal Social xd'
    })
};

const signupGet = (req, res) => {
    res.render('signup', {
        title: 'Signup'
    })
};

const signupPost = (req, res) => {
    console.log(req.body);
};

const signinGet = (req, res) => {
    
};

const signinPost = (req, res) => {
    
};

module.exports = {
    index,
    signupGet,
    signupPost,
    signinGet,
    signinPost
}