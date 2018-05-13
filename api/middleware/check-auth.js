/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


const jwt = require('jsonwebtoken');
const multer = require('multer');
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, "secrets");
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            //messagetoken: token,
            message: 'Auth failed'
        });
    }
};