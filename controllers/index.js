const index = (req, res) => {
    res.render('index', {
        title: 'Animal Social xd'
    })
};

module.exports = {
    index
}