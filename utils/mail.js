const nodemailer=require('nodemailer')

  const generateOTP=()=>{
    var otp='';
    for (var i=0;i<=3;i++){
const randValue=Math.round(Math.random()*9)
otp=otp+randValue
    }
    return otp
}
  const gmailTemplate=(URL,name) =>{
    return (`<!DOCTYPE html>
<html lang="en" >
<head>
<meta charset="UTF-8">
<title>ISEEA forgot-password</title>
<!-- HTML !-->
 
 
<style>
button {
  background-color: #FCC200;
  border: 0 solid #14213D;
  box-sizing: border-box;
  color: #000000;
  display: flex;
  font-family: ui-sans-serif,system-ui,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-size: 1rem;
  font-weight: 700;
  justify-content: center;
  line-height: 1.75rem;
  padding: .75rem 1.65rem;
  position: relative;
  text-align: center;
  text-decoration: none #000000 solid;
  text-decoration-thickness: auto;
  width: 300px;
  max-width: 460px;
  position: relative;
  cursor: pointer;
  transform: rotate(-2deg);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

button:focus {
  outline: 0;
}

button:after {
  content: '';
  position: absolute;
  border: 1px solid #000000;
  bottom: 4px;
  left: 4px;
  width: calc(100% - 1px);
  height: calc(100% - 1px);
}

button:hover:after {
  bottom: 2px;
  left: 2px;
}

@media (min-width: 768px) {
  button {
    padding: .75rem 3rem;
    font-size: 1.25rem;
  }
}
a{
  text-decoration: none;
  text-color:black
}
</style>

</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:100%px;overflow:auto;line-height:2">
<div style="margin:3px auto;width:90%;padding:5px 0">
  <div style="border-bottom:1px solid #eee">
    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">I.S.E.E.A</a>
  </div>
  <p style="font-size:1.1em">Hi ${name},</p>
  <p>You are about to reset your password for I.S.E.E.A. Admin. Use the following URL to complete your Password Recovery Procedure.</p>
  <a  href=${URL}> <button>Reset Password</button></a>

  <p style="font-size:0.9em;">Alternatively, you can directly paste this link in your browser</p><br>
  <p>${URL}</p>
  <p style="font-size:0.9em;">Regards,<br />I.S.E.E.A</p>
  <hr style="border:none;border-top:1px solid #eee" />
  <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
    <p>I.S.E.E.A</p>
    <p>initiativeforselfesteem@gmail.com</p>
    <p>+234 802 093 0258</p>
  </div>
</div>
</div>
<!-- partial -->

</body>
</html>`)}
  const gmailPlainTemplate=(URL,name) =>{
    return (`<!DOCTYPE html>
<html lang="en" >
<head>
<meta charset="UTF-8">
<title>password reset successful</title>
<!-- HTML !-->
 
 
<style>
button {
  background-color: #FCC200;
  border: 0 solid #14213D;
  box-sizing: border-box;
  color: #000000;
  display: flex;
  font-family: ui-sans-serif,system-ui,-apple-system,system-ui,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";
  font-size: 1rem;
  font-weight: 700;
  justify-content: center;
  line-height: 1.75rem;
  padding: .75rem 1.65rem;
  position: relative;
  text-align: center;
  text-decoration: none #000000 solid;
  text-decoration-thickness: auto;
  width: 300px;
  max-width: 460px;
  position: relative;
  cursor: pointer;
  transform: rotate(-2deg);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

button:focus {
  outline: 0;
}

button:after {
  content: '';
  position: absolute;
  border: 1px solid #000000;
  bottom: 4px;
  left: 4px;
  width: calc(100% - 1px);
  height: calc(100% - 1px);
}

button:hover:after {
  bottom: 2px;
  left: 2px;
}

@media (min-width: 768px) {
  button {
    padding: .75rem 3rem;
    font-size: 1.25rem;
  }
}
a{
  text-decoration: none;
  text-color:black
}
</style>

</head>
<body>
<!-- partial:index.partial.html -->
<div style="font-family: Helvetica,Arial,sans-serif;min-width:100%;overflow:auto;line-height:2">
<div style="margin:3px auto;width:90%;padding:5px 0">
  <div style="border-bottom:1px solid #eee">
    <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">I.S.E.E.A</a>
  </div>
  <p style="font-size:1.1em">Hi ${name},</p>
  <p>Congratulations! you have successfully reset your password</p>
  <p>click the button below to return to I.S.E.E.A</p>
  <a  href=${URL}> <button>Reset Password</button></a>
  <p style="font-size:0.9em;">Regards,<br />I.S.E.E.A</p>
  <hr style="border:none;border-top:1px solid #eee" />
  <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
    <p>I.S.E.E.A </p>
    <p>initiativeforselfesteem@gmail.com</p>
    <p>+234 802 093 0258</p>
  </div>
</div>
</div>
<!-- partial -->

</body>
</html>`)}
  const mailTransport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.MY_EMAIL,
          pass: process.env.MY_PASSWORD,
        },
      });
module.exports={mailTransport,gmailTemplate,generateOTP,gmailPlainTemplate}